! function(win) {
	win.BrBridge = window.BrBridge ? window.BrBridge : {};
	var doc = win.document,
		ua = win.navigator.userAgent,
		isIOS = /iPhone|iPad|iPod/i.test(ua),
		isAndroid = /Android/i.test(ua),
		osVersion = ua.match(/(?:OS|Android)[\/\s](\d+[._]\d+(?:[._]\d+)?)/i),
		callbackMap = {},
		inc = 1,
		iframePool = [],
		iframeLimit = 3,
		LOCAL_PROTOCOL = "brminions",
		WV_PROTOCOL = "wvbrminions",
		IFRAME_PREFIX = "iframe_",
		SUCCESS_PREFIX = "suc_",
		FAILURE_PREFIX = "err_",
		PARAM_PREFIX = "param_";

	var regAppUa = /\@brapp[\w\:\d\.]+\@$/;
	var appInfo = ua.match(regAppUa) && ua.match(regAppUa)[0] ? ua.match(regAppUa)[0].replace(/\@/g,'').split(':') : [];

	function callback(fn, info) {
		if (fn) {
			if (isAndroid) {
				setTimeout(function() {
					fn(info.value || info)
				}, 1);
			} else {
				fn(info.value || info);
			}
		}
	}

	var BRG_Core = {
		env: {
			isAndroid: isAndroid,
			isIOS: isIOS,
			osVersion: osVersion,
			isApp: regAppUa.test(ua),
			appInfo: {
				appVersion: appInfo.length ? appInfo[2] : null,
				appName: appInfo.length ? appInfo[1] : null
			}
		},
		call: function(model, method, params, success, failure, timeoutSecond, onlyIframe) {
			var timeout;
			timeout = timeoutSecond > 0 ? setTimeout(function() {
				BRG_Core.onFailure(timeout, {
					ret: "TIMEOUT"
				})
			}, timeoutSecond) : BRG_Private.getSid();
			BRG_Private.registerCall(timeout, success, failure);
			if (onlyIframe) { // 如果是客户端，则全部使用iframe
				if (isAndroid || isIOS) {
					BRG_Private.callMethodByIframe(model, method, BRG_Private.buildParam(params), timeout + "");
				}
			} else {
				if (isAndroid) {
					BRG_Private.callMethodByPrompt(model, method, BRG_Private.buildParam(params), timeout + "");
				} else {
					if (isIOS) {
						BRG_Private.callMethodByIframe(model, method, BRG_Private.buildParam(params), timeout + "");
					}
				}
			}
		},
		bindMuti: function(model, method, params, success, failure, timeoutSecond, onlyIframe) {
			var timeout = BRG_Private.getSid();
			// BRG_Private.registerCall(timeout, success, failure);
			if (params.menus && params.menus.length) {
				params.menus.forEach(function(menu, index) {
					var eventId = BRG_Private.getSid();
					menu.eventId = eventId;
					BRG_Private.registerCall(timeout, menu.callback, false);
				});
			}
			if (onlyIframe) { // 客户全部使用iframe
				if (isAndroid || isIOS) {
					BRG_Private.callMethodByIframe(model, method, BRG_Private.buildParam(params), timeout + "");
				}
			} else {
				if (isAndroid) {
					BRG_Private.callMethodByPrompt(model, method, BRG_Private.buildParam(params), timeout + "");
				} else {
					if (isIOS) {
						BRG_Private.callMethodByIframe(model, method, BRG_Private.buildParam(params), timeout + "");
					}
				}
			}
		},
		getParam: function(a) {
			return BRG_Private.params[PARAM_PREFIX + a] || ""
		},
		onNativeCall: function(timeout, params) {
			clearTimeout(timeout);
			var isNativeCall = true;
			var successFn = BRG_Private.unregisterCall(timeout, isNativeCall).success,
				successInfo = BRG_Private.parseParam(params);
			callback(successFn, successInfo);
			BRG_Private.onComplete(timeout);
		},
		onSuccess: function(timeout, params) {
			clearTimeout(timeout);
			var successFn = BRG_Private.unregisterCall(timeout).success,
				successInfo = BRG_Private.parseParam(params);
			callback(successFn, successInfo);
			BRG_Private.onComplete(timeout);
		},
		onFailure: function(timeout, params) {
			clearTimeout(timeout);
			var failureFn = BRG_Private.unregisterCall(timeout).failure,
				failureInfo = BRG_Private.parseParam(params);
			callback(failureFn, failureInfo);
			BRG_Private.onComplete(timeout);
		}
	};

	var BRG_Private = {
		params: {},
		buildParam: function(a) {
			return a && "object" == typeof a ? JSON.stringify(a) : a || "";
		},
		parseParam: function(str) {
			var obj = null;
			if (str && "string" == typeof str) {
				try {
					obj = JSON.parse(str);
				} catch (e) {
					obj = eval("(" + str + ")");
				}
			} else {
				obj = str || {};
			}
			return obj
		},
		registerCall: function(timeout, success, failure) {
			success && (callbackMap[SUCCESS_PREFIX + timeout] = success);
			failure && (callbackMap[FAILURE_PREFIX + timeout] = failure);
		},
		unregisterCall: function(timeout, isNativeCall) {
			var successP = SUCCESS_PREFIX + timeout,
				failureP = FAILURE_PREFIX + timeout,
				obj = {
					success: callbackMap[successP],
					failure: callbackMap[failureP]
				};
			if (!isNativeCall) {
				delete callbackMap[successP];
				delete callbackMap[failureP];
			}
			return obj
		},
		getSid: function() {
			return Math.floor(Math.random() * (1 << 50)) + "" + inc++
		},
		useIframe: function(timeout, url) {
			var ifmId = IFRAME_PREFIX + timeout,
				$iframe = iframePool.pop();
			/*$iframe || ($iframe = doc.createElement("iframe"), $iframe.setAttribute("frameborder", "0"), $iframe.style.cssText = "width:0;height:0;border:0;display:none;"), $iframe.setAttribute("id", ifmId), $iframe.setAttribute("src", url), $iframe.parentNode || setTimeout(function() {
				doc.body.appendChild($iframe);
			}, 5);*/
			if (!$iframe) {
				$iframe = doc.createElement("iframe");
				$iframe.setAttribute("frameborder", "0");
				$iframe.style.cssText = "width:0;height:0;border:0;display:none;";
			}
			$iframe.setAttribute("id", ifmId);
			$iframe.setAttribute("src", url);
			$iframe.parentNode || setTimeout(function() {
				doc.body.appendChild($iframe);
			}, 5);
		},
		retrieveIframe: function(timeout) {
			var ifmPrefix = IFRAME_PREFIX + timeout,
				$iframe = doc.querySelector("#" + ifmPrefix);
			// iframePool.length >= iframeLimit ? doc.body.removeChild($iframe) : iframePool.push($iframe);
			if ($iframe) {
				iframePool.length >= iframeLimit ? doc.body.removeChild($iframe) : iframePool.push($iframe);
			}
		},
		callMethodByIframe: function(model, method, paramString, timeout) {
			var url = LOCAL_PROTOCOL + "://" + model + ":" + timeout + "/" + method + "?" + paramString;
			this.params[PARAM_PREFIX + timeout] = paramString, this.useIframe(timeout, url)
			console.log(url);
		},
		callMethodByPrompt: function(model, method, paramString, timeout) {
			var url = LOCAL_PROTOCOL + "://" + model + ":" + timeout + "/" + method + "?" + paramString,
				uValue = WV_PROTOCOL + ":";
			this.params[PARAM_PREFIX + timeout] = paramString;
			window.prompt(url, uValue);
			console.log(url);
		},
		onComplete: function(timeout) {
			if (isIOS) {
				this.retrieveIframe(timeout);
			}
			delete this.params[PARAM_PREFIX + timeout];
		}
	};
	for (var key in BRG_Core) {
		Object.prototype.hasOwnProperty.call(win.BrBridge, key) || (win.BrBridge[key] = BRG_Core[key]);
	}
}(window);

/*BrBridge.call('Sys', 'copy', {
	name: 'yy',
	age: 18
}, function(data) {
	console.log('success');
	console.log(data);
}, function(error) {
	console.log('fail');
	console.log(error);
});*/

/*
BrBridge.onSuccess('2558131',{name:'gg'});
*/