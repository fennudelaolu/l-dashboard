console.log('begin threed!')
self.onmessage = function(event) {
  console.log(event.data);

};
setInterval(function () {
  postMessage('向父线程发送1');
},1000)
postMessage('向父线程发送');
