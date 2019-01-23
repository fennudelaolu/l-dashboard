console.log('begin threed!')


self.onmessage = (event) => {
  let method = event.data.method
  let args = event.data.args

  Methods[method](args)
};

/*[
{"folder_name":"folder","table_name":"table","up_data":[]},
]*/
const Methods = {
  repeat_send:5,
  up_split_size: 2000,
  up_data:[],
  //上传
  readyUpload({url, method, token, json_data }){

    this.up_data = []
    //准备数据
    for(let i in json_data){
      let table = json_data[i]
      let rows = table.up_data;
      let row_length = rows.length;
      let split_group = Math.ceil( row_length / this.up_split_size );

      let data = []
      for(let start=0; start<split_group; start++){
        let s = start*this.up_split_size
        let e = s+this.up_split_size
        data.push(rows.slice(s,e));
      }
      this.up_data.push({
        folder_name:table.folder_name,
        table_name:table.table_name,
        count:row_length,
        send_count: 0,
        data,
      })

    }

    //上传
    for(let i in this.up_data){
      let table = this.up_data[i];
      for(let j in table.data){

        let r = this.upload(
          {url, method, token,
            json_data:{folder_name:table.folder_name,table_name:table.table_name,up_data:JSON.stringify(table.data[j])},
          },0)

        if(r){//分片上传成功，告诉父线程当前进度
          table.send_count += table.data[j].length;
          table.status = table.send_count>=table.count? 'success' : 'uploading';
          let message = this.up_data.map(item => {
            return {
              folder_name:item.folder_name,
              table_name:item.table_name,
              count:item.count,
              status:item.status,
              send_count: item.send_count
            }
          })
          postMessage({status:'working',message});
        }else{//分片上传失败直接跳到下一个表
          table.status = 'error'
          break;
        }
      }
    }

    let message = this.up_data.map(item => {
      return {
        folder_name:item.folder_name,
        table_name:item.table_name,
        count:item.count,
        status:item.status,
        send_count: item.send_count
      }
    })
    postMessage({status:'end',message});
  },
  async upload({url, method, token, json_data },repeat_send){

    /*let s = new Date().Format("yyyy-M-d h:m:s.S")
    console.log('s:'+s)*/
    let result = await new Promise(function (resolve, reject){
      let xmlHttp = new XMLHttpRequest();
      xmlHttp.open(method,url,false);
      xmlHttp.setRequestHeader('user-token', token);
      xmlHttp.setRequestHeader('content-type', 'application/json');
      xmlHttp.onload = () =>{
        if(xmlHttp.status === 200) {
          resolve(xmlHttp.response)
        } else {
          reject('Unable to load RSS');
        }
      }
      xmlHttp.onerror = () => {
        reject('Unable to load RSS');
      }

      xmlHttp.send(JSON.stringify(json_data));
    }).then(res => {
      /*console.log('e:'+ new Date().Format("yyyy-M-d h:m:s.S"))*/
      return true
    }).catch(error => {
      console.log(error)
      return false
    });

    ++repeat_send;
    if(result ){
      return result
    } else if((repeat_send > this.repeat_send)) {
      return result
    } else {
      console.log('重传第'+repeat_send+'次')
      this.upload({url, method, token, json_data },repeat_send)
    }
  },
}


