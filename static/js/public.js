const Util = {};
/**
 * HTML编码
 * @param {String} text
 */
Util.encodeHTML = function (text) {
    return String(text).replace(/["<>&`'/]/g, function (all) {
        return "&" + {
            '"': 'quot',
            '<': 'lt',
            '>': 'gt',
            '&': 'amp',
            // ' ': 'nbsp',
            '`': '#x60',
            '\'': '#x27',
            '/': '#x2F'
        }[all] + ";";
    });
};

/**
 * 解析url或search字符串。
 * @method queryUrl
 * @static
 * @param {String} s url或search字符串
 * @param {String} key (Optional) 参数名。
 * @return {Json|String|Array|undefined} 如果key为空，则返回解析整个字符串得到的Json对象；否则返回参数值。有多个参数，或参数名带[]的，参数值为Array。
 */
Util.queryUrl = function (url, key) {
    url = url.replace(/^[^?=]*\?/ig, '').split('#')[0];	//去除网址与hash信息
    var json = {};

    //考虑到key中可能有特殊符号如“[].”等，而[]却有是否被编码的可能，所以，牺牲效率以求严谨，就算传了key参数，也是全部解析url。
    url.replace(/(^|&)([^&=]+)=([^&]*)/g, function (a, b, key, value) {
        // 对url这样不可信的内容进行decode，可能会抛异常，try一下；另外为了得到最合适的结果，这里要分别try
        try {
            key = decodeURIComponent(key);
        } catch (ex) {
        }
        try {
            value = decodeURIComponent(value);
        } catch (ex) {
        }

        if (!(key in json)) {
            json[key] = /\[\]$/.test(key) ? [value] : value; //如果参数名以[]结尾，则当作数组
        } else if (json[key] instanceof Array) {
            json[key].push(value);
        } else {
            json[key] = [json[key], value];
        }
    });

    return key ? json[key] : json;
};

Util.formatDate = function (timestamp) {
    if (timestamp.toString().length === 10) {
        timestamp *= 1000;
    }

    var d = new Date(timestamp);

    function getTime(d) {
        return d.getFullYear() + '.' + fixLen(d.getMonth() + 1) + '.' + fixLen(d.getDate()) + ' ' + fixLen(d.getHours()) + ':' + fixLen(d.getMinutes());
    }

    function fixLen(s) {
        if ((s + '').length === 1) {
            return '0' + s;
        }
        return s;
    }

    return getTime(d);
}


/**
 * 获取字符串字节长度，中文算作两个字符
 */
Util.byteLen = function (s) {
    return s.replace(/[^\x00-\xff]/g, "--").length;
}


/**
 * 截取指定字节长度的子字符串
 */
Util.subByte = function (s, len, tail) {
    var byteLen = Util.byteLen;
    if (byteLen(s) <= len) {
        return s;
    }
    tail = tail || "";
    len -= byteLen(tail);
    return s.substr(0, len).replace(/([^\x00-\xff])/g, "$1 ").substr(0, len).replace(/[^\x00-\xff]$/, "").replace(/([^\x00-\xff]) /g, "$1") + tail;
}

Util.fixLen = function (s) {
    if ((s + '').length == 1) {
        return '0' + s;
    }

    return s;
}


// const CONFIG = {
//     teacherLevelMap: {
//         1: '优秀名师',
//         2: '金牌名师',
//     },
//     statusMap: {
//         UNPAID: {
//             cls: 'unpaid',
//             str: '待支付'
//         },
//         PAID: {
//             cls: 'paid',
//             str: '已支付'
//         },
//         CANCEL: {
//             cls: 'cancel',
//             str: '已取消'
//         },
//         DEPOSIT_UNPAID: {
//             cls: 'unpaid',
//             str: '定金待支付'
//         },
//         RETAINAGE_UNPAID: {
//             cls: 'unpaid',
//             str: '尾款待支付'
//         },
//         INSTALLMENT_DEPOSIT_UNPAID: {
//             cls: 'unpaid',
//             str: '首付款待支付'
//         },
//         INSTALLMENT_UNPAID: {
//             cls: 'unpaid',
//             str: '分期待支付'
//         },
//         INSTALLMENT_PROCESSING: {
//             cls: 'unpaid',
//             str: '贷款审核中'
//         },
//         INSTALLMENT_FAIL: {
//             cls: 'unpaid',
//             str: '分期失败'
//         },
//         INSTALLMENT_EXPIRED: {
//             cls: 'unpaid',
//             str: '分期失效'
//         }
//     },
//     gradeMap: {
//         7: '初一',
//         8: '初二',
//         9: '初三',
//         10: '小学',
//         11: '高一',
//         12: '高二',
//         13: '高三',
//         101: '一年级',
//         102: '二年级',
//         103: '三年级',
//         104: '四年级',
//         105: '五年级',
//         115: '五四制五年级',
//         106: '六年级',
//     },
//     subjectMap: {
//         1: '语文',
//         2: '数学',
//         3: '英语',
//         4: '科学',
//         5: '物理',
//         6: '化学',
//         7: '地理',
//         8: '历史',
//         9: '生物',
//         10: '政治',
//         11: '心理'
//     }
// };


function tabBox(trigger, panel, callback) {
    trigger.on({
        click: function () {
            var that = $(this);
            var index = that.index();

            trigger.eq(index).addClass('selected').siblings().removeClass('selected');
            panel.eq(index).show().siblings().hide();
            callback && callback(index);
        }
    })
}


// 取jwt token
(function () {
    var authTokenFromQuery = Util.queryUrl(window.location.href, 'auth_token') || '';
    if (authTokenFromQuery) {
        localStorage.setItem('jwtToken', decodeURIComponent(authTokenFromQuery));
    }

    $.ajaxSetup({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        },
        dataType: 'json'
    });
})();


// for debug
(function () {
    if (window.location.hostname.indexOf('lejent.cn') === -1) {
        return;
    }
    var html = '<div id="widget" onclick="window.location.reload(true);"></div>' +
        '<style>' +
        '#widget{ position: fixed;top: 0;right: 0;width: 20px;height: 20px;background-color: rgba(0,0,0,.7); }' +
        '</style>'
    document.write(html);
})();

function fixFloat(n) {
    return parseFloat(Math.round((n) * 100)) / 100;
}

// order-constants
const Enums = {
    ORDER_STATUS: {
        UNPAID: '待支付',
        PAID: '已支付',
        CANCEL: '已取消',
        PARTIAL: '部分支付'
    },
    ORDER_TYPE: {
        FULL: '全款支付',
        MULTI: '定金尾款'
    },
    ORDER_PAY_STATUS: {
        INIT: '未支付', // 立即支付
        SUCCESS: '已支付', // 显示时间
        FAIL: '支付失败', // 重新申请
        PENDING: '处理中', // 立即支付 disabled
        /**
      * 专门为爱海米增加的字段
      * 
      * PRE_PEND: '申请未完成',
      * 当用户填写 银行卡号 强制返回的时候，形成的状态。
      * 需要禁用其他选择方式，直接进入爱海米分期
      */
        PRE_PEND: '申请未完成',
        EXPIRED: '已过期' // 重新申请
    },
    ORDER_PAY_CATEGORY: {
        NORMAL: '普通支付',
        INSTALL: '分期支付',
        B2B: '对公转账'
    },
    SERVER_CHARGE_TYPE: {
        1: {
            id: 'wechat',
            desc: '微信支付'
        },
        2: {
            id: 'alipay',
            desc: '支付宝支付'
        },
        8: {
            id: 'cmb',
            desc: '招行支付'
        },
        11: {
            id: 'alipay',
            desc: '支付宝支付'
        },
        12: {
            id: 'alipay',
            desc: '支付宝支付'
        },
        13: {
            id: 'wechat',
            desc: '微信支付'
        },
        14: {
            id: 'wechat',
            desc: '微信支付'
        },
        15: {
            id: 'baidu',
            desc: '有钱花'
        },
        16: {
            id: 'guangfa',
            desc: '广发信用卡分期'
        },
        17: {
            id: 'huabei',
            desc: '蚂蚁花呗分期'
        },

        18: {
            id: 'huawei',
            desc: '华为支付'
        },
        20: {
            id: 'haier',
            desc: '海米管家',
        },
        21: {
            id: 'yeepay',
            desc: '易宝支付',
        },
        22:{
            id:'jdpay',
            desc:'京东支付'
        },
        100: {
            id: 'b2b',
            desc: '对公转账'
        }
    },
    TEACHER_LEVEL: {
        1: '优秀老师',
        2: '专家老师'
    },
    GRADES: {
        7: '七年级',
        8: '八年级',
        9: '九年级',
        11: '高一',
        12: '高二',
        13: '高三',
        101: '一年级',
        102: '二年级',
        103: '三年级',
        104: '四年级',
        105: '五年级',
        115: '五四制五年级',
        106: '六年级',
        121: '小学奥数'
    },
    SUBJECTS: {
        0: '未知',
        1: '语文',
        2: '数学',
        3: '英语',
        4: '科学',
        5: '物理',
        6: '化学',
        7: '地理',
        8: '历史',
        9: '生物',
        10: '政治',
        11: '心理'
    }
};

// common popup confirm
var PopupConfirm = (function () {
    let popupMask = $('#popup-confirm-mask');
    let popupConfirm = $('#popup-confirm');
    let confirmCallback = null;

    function show(title, message, callback) {
        confirmCallback = callback;
        if (popupMask) {
            popupMask.show();
        }
        if (popupConfirm) {
            popupConfirm.find('.content .title').text(title);
            popupConfirm.find('.content .message').text(message);
            popupConfirm.show();
        }
    }

    function hide() {
        if (popupConfirm) {
            popupConfirm.hide();
        }
        if (popupMask) {
            popupMask.hide();
        }
    }

    function init() {
        return Promise
            .resolve()
            .then(function () {
                $('body').append(html);
                popupMask = $('#popup-mask');
                popupConfirm = $('#popup-confirm');
            });

    }

    // bind events
    {
        popupConfirm.find('.btns .btn-cancel').on({
            click: function () {
                hide();
            }
        });
        popupConfirm.find('.btns .btn-confirm').on({
            click: function () {
                if (confirmCallback) {
                    confirmCallback();
                }
            }
        });
    }

    return {
        show: show,
        hide: hide
    }
})();

const ProgressBar = (function () {
    const container = $('.g-mum-loading');

    function show() {
        container.show();
    }

    function hide() {
        container.hide();
    }

    return {
        show, hide
    };
})();

const OrderJumpManager = (function () {
    const orderId = Util.queryUrl(window.location.href, 'orderId');
    const paymentId = Util.queryUrl(window.location.href, 'paymentId');

    function jump(targetUrl, params) {
        targetUrl = targetUrl + '?orderId=' + orderId
            + (paymentId ? '&paymentId=' + paymentId : '');
        if (params) {
            params.forEach(function (param) {
                targetUrl += '&' + param.key + '=' + param.val;
            });
        }
        window.location.href = targetUrl;
    }

    return {
        jump
    };
})();