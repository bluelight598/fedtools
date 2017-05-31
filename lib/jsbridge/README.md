
## 常规约定
* 登录token约定：客户端需要将最新的token推送至``BrBridge.token``字段，未登录状态``BrBridge.token = false``。
* 禁用下拉刷新
    * 说明：请在html <header>标签中加入:
            
            “<meta name="no-refresh" content="yes"/>”
        
        用于禁用下拉刷新功能。
    * 备注：安卓下此功能还在调研中。
* 一次性消费接口回调onSuccess、onFailure
* 非一次性消费接口回调BrBridge.onNativeCall

## 客户端 调用 前端回调函数 约定
* BrBridge.onSuccess(id,object);
    * 描述: 执行成功回调；
    * 形参:
        * id <string> : 前端事件ID（*required）
        * object <object> : Native返回值对象 （*required）
        
                object : {
                    code : 200 // 成功状态码为200 （*required）
                    data : {} // 数据对象（根据不同接口返回不同）（*required）
                }

* BrBridge.onFailure(id,object);
    * 描述: 执行失败回调；
    * 形参:
        * id <string> : 前端事件ID（*required）
        * object <object> : Native返回值对象 （*required）
        
                object : {
                    code: 403, // 错误状态码 （*required）
                    msg: '您的权限不足', // 前端展示错误提示 （*required）
                    error: { // 错误详情独享 （*required）
                        
                    }
                }

* BrBridge.onNativeCall(id,object);
    * 描述: Native自定义绑定事件回调；
    * 形参:
        * id <string> : 前端事件ID（*required）
        * object <object> : Native返回值对象 （*required）
        
                object : {
                    code : 200 // 成功状态码为200 （*required）
                    data : {} // 根据不同约定返回（*required）
                }
                
    * 说明: 当用户触发Native事件时，如果该事件的操作通过前端自定义，请调用本函数执行自定义Callback。

* 状态吗一览表

| 状态码 | 说明 | 用户提示 |
| -----|-----|:----:|
| 200|调用成功| |
| 403|Session失效| 抱歉，登录过期咯 |
| ... | ... | ... |
| 请客户端同学约定后补全状态码 | 及说明； | 请产品同学根据状态码提供友善文案 |

## BrBridge API 约定

### SYSTEM->系统级别API

*  检测登录 
    * 说明:
        * 登录token更新后，需要由客户端将新的token更新至``BrBridge.token``字段。
        * 未登录状态``BrBridge.token = false``。

* login 
    * 说明:唤起Native登录
    * 前端调用函数：BrBridge.call('System', 'login', @params, success, failure, failureTimeout, onlyIframe);
    * 前端提供参数
        * @params {}
        * success(data): 成功回调函数
        * failure(data): 失败回调函数
        * failureTimeout: <int>指定失败超时毫秒时间（*optional）
        * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
    * 前端调用demo

                BrBridge.call('System', 'login', {}, function(data) {
                    console.log('success');
                    console.log(data);
                }, function(error) {
                    console.log('failure');
                    console.log(error);
                });
                
    * 客户端回调函数 BrBridge.onSuccess/onFailure
        * 参见 客户端 调用 前端回调函数 约定
        * 成功@param.data: 
                
                data : {
                
                }
    * 备注
        * 首次打开app 先展示native登录

* modifyPass
    * 说明:唤起Native修改密码
    * 前端提供参数
       * @params null 无
    * 前端调用demo

                BrBridge.call('System', 'modifyPass', {}, function(data) {
                    console.log('success');
                    console.log(data);
                }, function(error) {
                    console.log('failure');
                    console.log(error);
                });
                
    * 客户端回调函数 BrBridge.onSuccess/onFailure
        * 参见 客户端 调用 前端回调函数 约定
        * 成功@param.data: 
        
                data : {
                
                }
    * 备注

* brPay 
    * 说明:唤起支付界面
    * 前端调用函数：BrBridge.call('System', 'brPay', @params, success, failure, failureTimeout, onlyIframe);
    * 前端提供参数
       * @params 
                
                {
                    type <string>（*required）: 'wechat'/'alipay', // 支付类型'wechat':微信，'alipay':支付宝
                    cost <string>（*required）: '100' // 支付金额
                }

        * success(data): 成功回调函数
        * failure(data): 失败回调函数
        * failureTimeout: <int>指定失败超时毫秒时间（*optional）
        * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
    * 前端调用demo

                BrBridge.call('System', 'brPay', {
                    type: 'alipay',
                    cost: '230'
                }, function(data) {
                    console.log('success');
                    console.log(data);
                }, function(error) {
                    console.log('failure');
                    console.log(error);
                });
                
    * 客户端回调函数 BrBridge.onSuccess/onFailure
        * 参见 客户端 调用 前端回调函数 约定
        * 成功@param.data: 
                
                data : {
                
                }
    * 备注

* brIo 
    * 说明:通过Native调用后端接口
    * 前端调用函数：BrBridge.call('System', 'brIo', @params, success, failure, failureTimeout, onlyIframe);
    * 前端提供参数
       * @params 
            
                {
                    url <string>（*required） : '接口地址url', // 接口地址
                    params <JSON.Stringify(object)>（*required） : '{key:value,}' // 接口约定的参数JSON字符串
                }

        * success(data): 成功回调函数
        * failure(data): 失败回调函数
        * failureTimeout: <int>指定失败超时毫秒时间（*optional）
        * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
    * 前端调用demo

                BrBridge.call('System', 'brIo', {
                    url: 'http://xxxxx.com/api/getUserNick',
                    params: '{userid:"0213213"}'
                }, function(data) {
                    console.log('success');
                    console.log(data);
                }, function(error) {
                    console.log('failure');
                    console.log(error);
                });
            
    * 客户端回调函数 BrBridge.onSuccess/onFailure
        * 参见 客户端 调用 前端回调函数 约定
        * 成功@param.data: 
            
                data : {
                    // 后端接口约定返回的数据data
                }
    * 备注:
        * Session的存储方式：
            * 服务端会在登录成功后，将session存放在请求头的cookie中，前端无需处理，而客户端需要单独存储cookie。
        * Session、token失效处理逻辑：

                如果session失效，则native自动登录
                if(两次登录为同一个用户){
                    再次执行io，在调用 前端成功/失败回调，并将新的token更新至``BrBridge.token``字段。
                }else{
                    由Native直接刷新前端webView，将新的token更新至``BrBridge.token``字段。
                }


### COMMON->通用事件API

* 前端请求示例：
    * br_minions://Common:1578041/openWindow?{"url":"http://zxy.io/AXFJZ"}

* openWindow（安卓待调研，ios ok）
    * 说明:通过Native打开新的WebView窗口
    * 前端调用函数：BrBridge.call('Common', 'openWindow', @params, success, failure, failureTimeout, onlyIframe);
    * 前端提供参数
       * @params 
       
                {
                    url <string>（*required） : '新窗口的url地址', // 新窗口的url地址
                    reload <boolean>（*optional） : '默认为false:在新窗口打开页面，true:本地刷新重载页面（并重置当前webview一切自定义native组件）' // 是否本地刷新
                }

        * success(data): 成功回调函数
        * failure(data): 失败回调函数
        * failureTimeout: <int>指定失败超时毫秒时间（*optional）
        * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
    * 前端调用demo

                BrBridge.call('Common', 'openWindow', {
                    url: 'http://xxxxx.com/list.html',
                    reload: false
                }, function(data) {
                    console.log('success');
                    console.log(data);
                }, function(error) {
                    console.log('failure');
                    console.log(error);
                });
                
    * 客户端回调函数 BrBridge.onSuccess/onFailure
        * 参见 客户端 调用 前端回调函数 约定
        * 成功@param.data: 
                
                data : {
                }
    * 备注

* openRootWindow（安卓待调研，ios ok）
    * 说明:通过Native回到指定url的Webview``根``页面
    * 前端调用函数：BrBridge.call('Common', 'openRootWindow', @params, success, failure, failureTimeout, onlyIframe);
    * 前端提供参数
       * @params 
                
                {
                    url <string>（*required） : '新窗口的url地址', // 新窗口的url地址
                    refresh : false // 是否刷新
                }

        * success(data): 成功回调函数
        * failure(data): 失败回调函数
        * failureTimeout: <int>指定失败超时毫秒时间（*optional）
        * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
    * 前端调用demo

                BrBridge.call('Common', 'openRootWindow', {
                    url: 'http://xxxxx.com/home.html',
                    refresh: true
                }, function(data) {
                    console.log('success');
                    console.log(data);
                }, function(error) {
                    console.log('failure');
                    console.log(error);
                });
                
    * 客户端回调函数 BrBridge.onSuccess/onFailure
        * 参见 客户端 调用 前端回调函数 约定
        * 成功@param.data: 
                
                data : {
                }
    * 备注

* setNativeTitle
    * 说明:手动设置Native Webview标题
    * 前端调用函数：BrBridge.call('Common', 'setNativeTitle', @params, success, failure, failureTimeout, onlyIframe);
    * 前端提供参数
        * @params 
            
                {
                    title <string>（*required）: '标题名称'
                }

        * success(data): 成功回调函数
        * failure(data): 失败回调函数
        * failureTimeout: <int>指定失败超时毫秒时间（*optional）
        * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
    * 前端调用demo

                BrBridge.call('Common', 'setNativeTitle', {
                    title: '我的红包'
                }, function(data) {
                    console.log('success');
                    console.log(data);
                }, function(error) {
                    console.log('failure');
                    console.log(error);
                });

    * 客户端回调函数 BrBridge.onSuccess/onFailure
        * 参见 客户端 调用 前端回调函数 约定
        * 成功@param.data: 
                
                data : {
                }
    * 备注

* toast 
    * 说明:浮动提示框
    * 前端调用函数：BrBridge.call('Common', 'toast', @params, success, failure, failureTimeout, onlyIframe);
    * 前端提供参数
        * @params 
            
                {
                    content <string>（*required）: 'toast正文', // toast正文内容
                    time <string>（*optional）: '1000' // 消失时间（毫秒）
                }

        * success(data): 成功回调函数
        * failure(data): 失败回调函数
        * failureTimeout: <int>指定失败超时毫秒时间（*optional）
        * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
    * 前端调用demo

                BrBridge.call('Common', 'toast', {
                    content: '您已经成功关注！',
                    time: '2000'
                }, function(data) {
                    console.log('success');
                    console.log(data);
                }, function(error) {
                    console.log('failure');
                    console.log(error);
                });
                
    * 客户端回调函数 BrBridge.onSuccess/onFailure
        * 参见 客户端 调用 前端回调函数 约定
        * 成功@param.data: 
        
                data : {
                }
    * 备注

* dialog
    * 说明:弹出提示对话框
    * 前端调用函数：BrBridge.call('Common', 'dialog', @params, success, failure, failureTimeout, onlyIframe);
    * 前端提供参数
        * @params 
        
                {
                    title <string>（*optional）: '弹出框标题',
                    content <string>（*required）: '弹出框正文',
                    leftBtn <object>（*required）: {
                        content: '确认' // 左侧按钮文字内容
                    },
                    rightBtn<object>（*optional）: {
                        content: '取消', // 右侧按钮文字内容
                    }
                }

        * success(data): 成功回调函数
        * failure(data): 失败回调函数
        * failureTimeout: <int>指定失败超时毫秒时间（*optional）
        * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
    * 前端调用demo

                BrBridge.call('Common', 'dialog', {
                    title: '一大波红包向您袭来',
                    content: '你有一个红包可以领取，过期不候哦！',
                    leftBtn: {
                        content: '立即领取'
                    },
                    rightBtn: {
                        content: '取消'
                    }
                }, function(data) {
                    console.log('success');
                    console.log(data);
                }, function(error) {
                    console.log('failure');
                    console.log(error);
                });

    * 客户端回调函数 BrBridge.onSuccess/onFailure
        * 参见 客户端 调用 前端回调函数 约定
        * 成功@param.data: 
        
                data : {
                }
                
    * 备注
        * 点击leftBtn按钮，客户端调用 BrBridge.onSuccess；
        * 点击rightBtn按钮，客户端调用 BrBridge.onFailure；
        * 如果rightBtn参数为false，则只显示leftBtn按钮。

* copy 
    * 说明:文字复制到剪贴板
    * 前端调用函数：BrBridge.call('Common', 'copy', @params, success, failure, failureTimeout, onlyIframe);
    * 前端提供参数
        * @params 
                
                {
                    title <string>（*required）: '需要复制的内容' // 需要复制的内容
                }

        * success(data): 成功回调函数
        * failure(data): 失败回调函数
        * failureTimeout: <int>指定失败超时毫秒时间（*optional）
        * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
    * 前端调用demo

                BrBridge.call('Common', 'copy', {
                    title: '复制我复制我~~'
                }, function(data) {
                    console.log('success');
                    console.log(data);
                }, function(error) {
                    console.log('failure');
                    console.log(error);
                });
                
    * 客户端回调函数 BrBridge.onSuccess/onFailure
        * 参见 客户端 调用 前端回调函数 约定
        * 成功@param.data: 
        
                data : {
                }
                
    * 备注

* // camera 
    * 说明:使用相机
    * 备注:本期暂不提供

* // directory 
    * 说明:通讯录
    * 备注:本期暂不提供

* // share 
    * 说明:分享
    * 备注:本期暂不提供

### Bind Native绑定调用 API：

* 前端请求示例：
    * "br_minions://Bind:1228875/historyBack?{}"
    * "br_minions://Bind:1228875/nativeBack?{}"

* 说明: Native自定义绑定事件回调API，非即时事件；大部分事件的前端回调需要使用 BrBridge.onNativeCall(id,object) 函数。

* API约定：

    * historyBack -> 安卓/ios后退 js可选控制 左上角后退
        * 说明:Native顶部虚拟后退按钮功能自定义（Native左上角后退功能事件绑定）,自动阻止默认事件
        * 前端调用函数：BrBridge.call('Bind', 'historyBack', @params, success, failure, failureTimeout, onlyIframe);
        * 前端提供参数
            * @params 
                
                {
                    url <string>（*required） : '新窗口的url地址' // 新窗口的url地址
                }

            * success(data): 成功回调函数
            * failure(data): 失败回调函数
            * failureTimeout: <int>指定失败超时毫秒时间（*optional）
            * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
        * 前端调用demo

                BrBridge.call('Bind', 'historyBack', {}, function(data) { window.localcation.href = 'http://m.baidu.com'; }, function(error) { console.log(error); });

        * 客户端回调函数 BrBridge.onNativeCall(id,object)
            * 参见 客户端 调用 前端回调函数 约定
            * 成功@param.data: 
                
                    data : {
                    }
                    
        * 备注：请通过BrBridge.onNativeCall(id,object)调用前端callback。
        
    * nativeBack -> 安卓返回按键
        * 说明:安卓Native实体后退按钮 功能自定义（仅IOS）,自动阻止默认事件
        * 前端调用函数：BrBridge.call('Bind', 'nativeBack', @params, success, failure, failureTimeout, onlyIframe);
        * 前端提供参数
            * @params {}
            * success(data): 成功回调函数
            * failure(data): 失败回调函数
            * failureTimeout: <int>指定失败超时毫秒时间（*optional）
            * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
        * 前端调用demo

                BrBridge.call('Bind', 'nativeBack', {}, function(data) { window.localcation.href = 'http://m.baidu.com'; }, function(error) { console.log(error); });

        * 客户端回调函数 BrBridge.onNativeCall(id,object)
            * 参见 客户端 调用 前端回调函数 约定
            * 成功@param.data: 
                
                    data : {
                    }
                    
        * 备注：请通过BrBridge.onNativeCall(id,object)调用前端callback。
    
    * topRightMenu 
        * 说明:右侧顶部自定义菜单
        * 前端调用函数：BrBridge.bindMuti('Bind', 'topRightMenu', @params, success, failure, failureTimeout, onlyIframe);
        * 前端提供参数
           * @params 
                
                {
                    menus <array>（*required） : [menu<object>...] // 菜单项
                        @menu<object> : {
                            icon : '&xxxx', // icon图标
                            title : '标题', // 标题
                            callback : function() {

                            }
                        }
                    stopMerge : true // 不合并右侧顶部菜单（默认false，自动合并;ture 完全覆盖）
                }
            
            * success(data): 成功回调函数
            * failure(data): 失败回调函数
            * failureTimeout: <int>指定失败超时毫秒时间（*optional）
            * onlyIframe: <boolean>安卓下也使用iframe。默认为false : 仅在IOS下使用iframe，而安卓默认使用prompt（*optional）
        * 前端调用demo

                BrBridge.bindMuti('Bind', 'topRightMenu', {
                    menus : [
                        {
                            icon: 'home.icon',
                            title: '首页',
                            callback: function(){
                                window.localcation.href = '/';
                            }
                        },{
                            icon: 'some.icon',
                            title: '其他',
                            callback: function(){
                                // doSomething...
                            }
                        }
                    ],
                    stopMerge: false
                }, function(data) {
                    console.log('success');
                    console.log(data);
                }, function(error) {
                    console.log('failure');
                    console.log(error);
                });
        
        * 客户端接收参数 
                * @params 
                
                    {
                        menus <array>（*required） : [menu<object>...] // 菜单项
                            @menu<object> : {
                                icon : '&xxxx', // icon图标
                                title : '标题', // 标题
                                eventId : '123023' // 事件ID
                            }
                        stopMerge : true // 不合并右侧顶部菜单（默认false，自动合并;ture 完全覆盖）
                    }

        * 客户端回调函数 BrBridge.onSuccess/onFailure
            * 参见 客户端 调用 前端回调函数 约定
            * 成功@param.data:
             
                    data : {
                    }
                    
        * 备注:
            * menus中的每个事件通过BrBridge.onNativeCall进行调用。
       
## 前端常用信息

* BrBridge.env 环境信息可以直接通过window.BrBridge.env拿到下列信息
    
    *   示例：

            {
                "isAndroid": false,
                "isIOS": false,
                "osVersion": null,
                "isApp": false,
                "appInfo": {
                    "appVersion": null,
                    "appName": null
                }
            }
    
    *   说明：
        *   isAndroid:<boolean> 是否是安卓环境
        *   isIOS:<boolean> 是否是IOS环境
        *   osVersion:<string> os系统信息
        *   isApp:<boolean> 是否是brapp
        *   appInfo:<object>
            *   appVersion:<string> app版本号
            *   appName:<string> app名称

