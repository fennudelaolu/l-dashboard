export const setUSER_TOKEN = (token) => {
    document.getElementsByTagName('meta')['user-token'].setAttribute('content', token);
}
/**
 * dom操作
 * */
/*获取指定标签元素*/
export const getEL_ATTR = (tag,name,attr) => {
	let val = document.getElementsByTagName(tag)[name].getAttribute(attr) || '';
	return val;
}

/**
 * JSON处理
 * */
/*json格式化*/
export const formatJson = (json, options) => {
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
    if (typeof json !== 'string') {
        json = JSON.stringify(json);
    } else {
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }
    reg = /([\{\}])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');
    reg = /(\,)/g;
    json = json.replace(reg, '$1\r\n');
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');
    reg = /\r\n\,/g;
    json = json.replace(reg, ',');
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ':');
    }
    (json.split('\r\n')).forEach(function (node, index) {
            var i = 0,
                indent = 0,
                padding = '';

            if (node.match(/\{$/) || node.match(/\[$/)) {
                indent = 1;
            } else if (node.match(/\}/) || node.match(/\]/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else {
                indent = 0;
            }

            for (i = 0; i < pad; i++) {
                padding += PADDING;
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        }
    );
    return formatted;
};

/*JSON<=>Object 支持function*/
let JSON_SERIALIZE_FIX = {
    PREFIX: "[[JSON_FUN_PREFIX_",
    SUFFIX: "_JSON_FUN_SUFFIX]]"
};
export const ObjecttoJSON = (obj) => {
    let sobj = JSON.stringify(obj, function (key, value) {
        if (typeof value === 'function') {
            return JSON_SERIALIZE_FIX.PREFIX + value.toString() + JSON_SERIALIZE_FIX.SUFFIX;
        }
        return value;
    });
    return sobj;
};
export const JSONtoObject = (json) => {
    return JSON.parse(json, function (key, value) {
        if (typeof value === 'string' &&
            value.indexOf(JSON_SERIALIZE_FIX.SUFFIX) > 0 && value.indexOf(JSON_SERIALIZE_FIX.PREFIX) == 0) {
            return eval("(" + value.replace(JSON_SERIALIZE_FIX.PREFIX, "").replace(JSON_SERIALIZE_FIX.SUFFIX, "") + ")");
        }
        return value;
    }) || {};
};


/****************************** 日期 ***********************************/



/*计算距离当日时间*/
export const DateDiff = (sDate1) => {    //sDate1和sDate2是2002-12-18格式

    var now, oDate1, result

    oDate1 = new Date(sDate1);
    now = new Date()

    if (now.getFullYear() - oDate1.getFullYear() != 0) {
        result = Math.abs(now.getFullYear() - oDate1.getFullYear()) + '年'
    } else if (now.getMonth() - oDate1.getMonth() != 0) {
        result = Math.abs(now.getMonth() - oDate1.getMonth()) + '个月'
    } else if (now.getDate() - oDate1.getDate() != 0) {
        result = Math.abs(now.getDate() - oDate1.getDate()) + '天'
    } else if (now.getHours() - oDate1.getHours() != 0) {
        result = Math.abs(now.getHours() - oDate1.getHours()) + '小时'
    } else {
        result = Math.abs(now.getMinutes() - oDate1.getMinutes()) + '分钟'
    }

    return result
}
//计算某两个日期
export const DateDiff2 = (sDate1, sDate2) => {    //sDate1和sDate2是2002-12-18格式

    var oDate1, oDate2, result

    oDate1 = new Date(sDate1);
    oDate2 = new Date(sDate2)

    if (oDate2.getFullYear() - oDate1.getFullYear() != 0) {
        result = Math.abs(oDate2.getFullYear() - oDate1.getFullYear()) + '年'
    } else if (oDate2.getMonth() - oDate1.getMonth() != 0) {
        result = Math.abs(oDate2.getMonth() - oDate1.getMonth()) + '个月'
    } else if (oDate2.getDate() - oDate1.getDate() != 0) {
        result = Math.abs(oDate2.getDate() - oDate1.getDate()) + '天'
    } else if (oDate2.getHours() - oDate1.getHours() != 0) {
        result = Math.abs(oDate2.getHours() - oDate1.getHours()) + '小时'
    } else {
        result = Math.abs(oDate2.getMinutes() - oDate1.getMinutes()) + '分钟'
    }

    return result
}

/**
 * 计算某两个日期(精确到毫秒)
 * @param sign 分割符号
 * @param isEn 英文/中文后缀
 */
export const DateDiff3 = (start, end, sign, isEn) => {    //sDate1和sDate2是2002-12-18格式
    sign = sign || '';
    if (start && end) {
    } else {
        return '--'
    }

    var oDate1, oDate2, diff, result

    oDate1 = new Date(start);
    oDate2 = new Date(end);
    diff = Math.abs(oDate1 - oDate2)

    if (diff < 1000) {
        result = diff + sign + (isEn ? 'ms' : '毫秒')
    } else if (diff < 60000) {
        result = Math.round(diff / 1000) + sign + (isEn ? 's' : '秒')
    } else if (diff < 3600000) {
        result = Math.round(diff / 60000) + sign + (isEn ? 'm' : '分')
    } else if (diff < 86400000) {
        result = Math.round(diff / 3600000) + sign + (isEn ? 'h' : '小时')
    } else if (diff < 604800000) {
        result = Math.round(diff / 86400000) + sign + (isEn ? 'day' : '天')
    } else if (diff < 2505600000) {
        result = Math.round(diff / 604800000) + sign + (isEn ? 'week' : '周')
    } else if (diff < 31536000000) {
        result = Math.round(diff / 2505600000) + sign + (isEn ? 'month' : '月')
    } else {
        result = Math.round(diff / 31536000000) + sign + (isEn ? 'year' : '年')
    }
    return result
}

/**
 * 计算某两个日期(精确到毫秒)
 * 返回xx时xx分xx秒
 * */
export const DateDiff4 = (start, end, sign, isEn) => {    //sDate1和sDate2是2002-12-18格式
    sign = sign || '';
    if (start && end) {
    } else {
        return '--'
    }

    var oDate1, oDate2, diff, result

    oDate1 = new Date(start);
    oDate2 = new Date(end);
    diff = Math.abs(oDate1 - oDate2)

    result = '';

    if (diff >= 3600000) {
        result += parseInt(diff / 3600000) + '时';
        diff = diff % 3600000;
    }
    if (diff >= 60000) {
        result += parseInt(diff / 60000) + '分';
        diff = diff % 60000;
    }
    if (diff >= 1000) {
        result += parseInt(diff / 1000) + '秒';

    }

    return result
}

/* 字符串 */
//去除以’key‘开头的字符
export const trim = (str, key) => {
    let start = 0;
    let end = str.length;
    for (let i = 0; i < end; i++) {
        if (str[i] === key) {
            ++start;
            continue;
        } else {
            break
        }
    }
    for (let i = end - 1; i >= 0; i--) {
        if (str[i] === key) {
            --end;
            continue;
        } else {
            break
        }
    }
    str = end > start ? str.substring(start, end) : '';
    return str;
};
export const trim_left = (str, key) => {
    let start = 0;
    let end = str.length;
    for (let i = 0; i < end; i++) {
        if (str[i] === key) {
            ++start;
            continue;
        } else {
            break
        }
    }
    str = end > start ? str.substring(start, end) : '';
    return str;
};
export const trim_right = (str, key) => {
    let start = 0;
    let end = str.length;
    for (let i = end - 1; i >= 0; i--) {
        if (str[i] === key) {
            --end;
            continue;
        } else {
            break
        }
    }
    str = end > start ? str.substring(start, end) : '';
    return str;
};

/*数值单位转换*/
export const sizeFormat = (limit) => {
    let size = "";
    if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
    } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    var sizestr = size + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {//当小数点后为00时 去掉小数部分
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
}

/*计算所占百分比（不带单位）*/
export const getPercent = (num, total) => {
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
        return "-";
    }
    return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00);
}






