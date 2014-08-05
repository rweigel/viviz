/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);/**
 * jQuery.query - Query String Modification and Creation for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/02/08
 *
 * @author Blair Mitchelmore
 * @version 2.1.3
 *
 **/
new function(settings) { 
  // Various Settings
  var $separator = settings.separator || '&';
  var $spaces = settings.spaces === false ? false : true;
  var $suffix = settings.suffix === false ? '' : '[]';
  var $prefix = settings.prefix === false ? false : true;
  var $hash = $prefix ? settings.hash === true ? "#" : "?" : "";
  var $numbers = settings.numbers === false ? false : true;
  
  jQuery.query = new function() {
    var is = function(o, t) {
      return o != undefined && o !== null && (!!t ? o.constructor == t : true);
    };
    var parse = function(path) {
      var m, rx = /\[([^[]*)\]/g, match = /^(\S+?)(\[\S*\])?$/.exec(path), base = match[1], tokens = [];
      while (m = rx.exec(match[2])) tokens.push(m[1]);
      return [base, tokens];
    };
    var set = function(target, tokens, value) {
      var o, token = tokens.shift();
      if (typeof target != 'object') target = null;
      if (token === "") {
        if (!target) target = [];
        if (is(target, Array)) {
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        } else if (is(target, Object)) {
          var i = 0;
          while (target[i++] != null);
          target[--i] = tokens.length == 0 ? value : set(target[i], tokens.slice(0), value);
        } else {
          target = [];
          target.push(tokens.length == 0 ? value : set(null, tokens.slice(0), value));
        }
      } else if (token && token.match(/^\s*[0-9]+\s*$/)) {
        var index = parseInt(token, 10);
        if (!target) target = [];
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else if (token) {
        var index = token.replace(/^\s*|\s*$/g, "");
        if (!target) target = {};
        if (is(target, Array)) {
          var temp = {};
          for (var i = 0; i < target.length; ++i) {
            temp[i] = target[i];
          }
          target = temp;
        }
        target[index] = tokens.length == 0 ? value : set(target[index], tokens.slice(0), value);
      } else {
        return value;
      }
      return target;
    };
    
    var queryObject = function(a) {
      var self = this;
      self.keys = {};
      
      if (a.queryObject) {
        jQuery.each(a.get(), function(key, val) {
          self.SET(key, val);
        });
      } else {
        jQuery.each(arguments, function() {
          var q = "" + this;
					q = decodeURIComponent(q);
          q = q.replace(/^[?#]/,''); // remove any leading ? || #
          q = q.replace(/[;&]$/,''); // remove any trailing & || ;
          if ($spaces) q = q.replace(/[+]/g,' '); // replace +'s with spaces
          
          jQuery.each(q.split(/[&;]/), function(){
            var key = this.split('=')[0];
            var val = this.split('=')[1];
            
            if (!key) return;
            
            if ($numbers) {
              if (/^[+-]?[0-9]+\.[0-9]*$/.test(val)) // simple float regex
                val = parseFloat(val);
              else if (/^[+-]?[0-9]+$/.test(val)) // simple int regex
                val = parseInt(val, 10);
            }
            
            val = (!val && val !== 0) ? true : val;
            
            if (val !== false && val !== true && typeof val != 'number')
              val = val;
            
            self.SET(key, val);
          });
        });
      }
      return self;
    };
    
    queryObject.prototype = {
      queryObject: true,
      has: function(key, type) {
        var value = this.get(key);
        return is(value, type);
      },
      GET: function(key) {
        if (!is(key)) return this.keys;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        while (target != null && tokens.length != 0) {
          target = target[tokens.shift()];
        }
        return typeof target == 'number' ? target : target || "";
      },
      get: function(key) {
        var target = this.GET(key);
        if (is(target, Object))
          return jQuery.extend(true, {}, target);
        else if (is(target, Array))
          return target.slice(0);
        return target;
      },
      SET: function(key, val) {
        var value = !is(val) ? null : val;
        var parsed = parse(key), base = parsed[0], tokens = parsed[1];
        var target = this.keys[base];
        this.keys[base] = set(target, tokens.slice(0), value);
        return this;
      },
      set: function(key, val) {
        return this.copy().SET(key, val);
      },
      REMOVE: function(key) {
        return this.SET(key, null).COMPACT();
      },
      remove: function(key) {
        return this.copy().REMOVE(key);
      },
      EMPTY: function() {
        var self = this;
        jQuery.each(self.keys, function(key, value) {
          delete self.keys[key];
        });
        return self;
      },
      load: function(url) {
        var hash = url.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
        var search = url.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
        return new queryObject(url.length == search.length ? '' : search, url.length == hash.length ? '' : hash);
      },
      empty: function() {
        return this.copy().EMPTY();
      },
      copy: function() {
        return new queryObject(this);
      },
      COMPACT: function() {
        function build(orig) {
          var obj = typeof orig == "object" ? is(orig, Array) ? [] : {} : orig;
          if (typeof orig == 'object') {
            function add(o, key, value) {
              if (is(o, Array))
                o.push(value);
              else
                o[key] = value;
            }
            jQuery.each(orig, function(key, value) {
              if (!is(value)) return true;
              add(obj, key, build(value));
            });
          }
          return obj;
        }
        this.keys = build(this.keys);
        return this;
      },
      compact: function() {
        return this.copy().COMPACT();
      },
      toString: function() {
        var i = 0, queryString = [], chunks = [], self = this;
        var addFields = function(arr, key, value) {
          if (!is(value) || value === false) return;
          var o = [encodeURIComponent(key)];
          if (value !== true) {
            o.push("=");
            o.push(encodeURIComponent(value));
          }
          arr.push(o.join(""));
        };
        var build = function(obj, base) {
          var newKey = function(key) {
            return !base || base == "" ? [key].join("") : [base, "[", key, "]"].join("");
          };
          jQuery.each(obj, function(key, value) {
            if (typeof value == 'object') 
              build(value, newKey(key));
            else
              addFields(chunks, newKey(key), value);
          });
        };
        
        build(this.keys);
        
        if (chunks.length > 0) queryString.push($hash);
        queryString.push(chunks.join($separator));
        
        return queryString.join("");
      }
    };
    
    return new queryObject(location.search, location.hash);
  };
}(jQuery.query || {}); // Pass in jQuery.query as settings object
/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 9/11/2008
 * @author Ariel Flesler
 * @version 1.4
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(h){var m=h.scrollTo=function(b,c,g){h(window).scrollTo(b,c,g)};m.defaults={axis:'y',duration:1};m.window=function(b){return h(window).scrollable()};h.fn.scrollable=function(){return this.map(function(){var b=this.parentWindow||this.defaultView,c=this.nodeName=='#document'?b.frameElement||b:this,g=c.contentDocument||(c.contentWindow||c).document,i=c.setInterval;return c.nodeName=='IFRAME'||i&&h.browser.safari?g.body:i?g.documentElement:this})};h.fn.scrollTo=function(r,j,a){if(typeof j=='object'){a=j;j=0}if(typeof a=='function')a={onAfter:a};a=h.extend({},m.defaults,a);j=j||a.speed||a.duration;a.queue=a.queue&&a.axis.length>1;if(a.queue)j/=2;a.offset=n(a.offset);a.over=n(a.over);return this.scrollable().each(function(){var k=this,o=h(k),d=r,l,e={},p=o.is('html,body');switch(typeof d){case'number':case'string':if(/^([+-]=)?\d+(px)?$/.test(d)){d=n(d);break}d=h(d,this);case'object':if(d.is||d.style)l=(d=h(d)).offset()}h.each(a.axis.split(''),function(b,c){var g=c=='x'?'Left':'Top',i=g.toLowerCase(),f='scroll'+g,s=k[f],t=c=='x'?'Width':'Height',v=t.toLowerCase();if(l){e[f]=l[i]+(p?0:s-o.offset()[i]);if(a.margin){e[f]-=parseInt(d.css('margin'+g))||0;e[f]-=parseInt(d.css('border'+g+'Width'))||0}e[f]+=a.offset[i]||0;if(a.over[i])e[f]+=d[v]()*a.over[i]}else e[f]=d[i];if(/^\d+$/.test(e[f]))e[f]=e[f]<=0?0:Math.min(e[f],u(t));if(!b&&a.queue){if(s!=e[f])q(a.onAfterFirst);delete e[f]}});q(a.onAfter);function q(b){o.animate(e,j,a.easing,b&&function(){b.call(this,r,a)})};function u(b){var c='scroll'+b,g=k.ownerDocument;return p?Math.max(g.documentElement[c],g.body[c]):k[c]}}).end()};function n(b){return typeof b=='object'?b:{top:b,left:b}}})(jQuery);/*
 strftime for Javascript
 Copyright (c) 2008, Philip S Tellis <philip@bluesmoon.info>
 All rights reserved.
 
 This code is distributed under the terms of the BSD licence
 
 Redistribution and use of this software in source and binary forms, with or without modification,
 are permitted provided that the following conditions are met:

   * Redistributions of source code must retain the above copyright notice, this list of conditions
     and the following disclaimer.
   * Redistributions in binary form must reproduce the above copyright notice, this list of
     conditions and the following disclaimer in the documentation and/or other materials provided
     with the distribution.
   * The names of the contributors to this file may not be used to endorse or promote products
     derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * \file strftime.js
 * \author Philip S Tellis \<philip@bluesmoon.info\>
 * \version 1.3
 * \date 2008/06
 * \brief Javascript implementation of strftime
 * 
 * Implements strftime for the Date object in javascript based on the PHP implementation described at
 * http://www.php.net/strftime  This is in turn based on the Open Group specification defined
 * at http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html This implementation does not
 * include modified conversion specifiers (i.e., Ex and Ox)
 *
 * The following format specifiers are supported:
 *
 * \copydoc formats
 *
 * \%a, \%A, \%b and \%B should be localised for non-English locales.
 *
 * \par Usage:
 * This library may be used as follows:
 * \code
 *     var d = new Date();
 *
 *     var ymd = d.strftime('%Y/%m/%d');
 *     var iso = d.strftime('%Y-%m-%dT%H:%M:%S%z');
 *
 * \endcode
 *
 * \sa \link Date.prototype.strftime Date.strftime \endlink for a description of each of the supported format specifiers
 * \sa Date.ext.locales for localisation information
 * \sa http://www.php.net/strftime for the PHP implementation which is the basis for this
 * \sa http://tech.bluesmoon.info/2008/04/strftime-in-javascript.html for feedback
 */

//! Date extension object - all supporting objects go in here.
Date.ext = {};

//! Utility methods
Date.ext.util = {};

/**
\brief Left pad a number with something
\details Takes a number and pads it to the left with the passed in pad character
\param x	The number to pad
\param pad	The string to pad with
\param r	[optional] Upper limit for pad.  A value of 10 pads to 2 digits, a value of 100 pads to 3 digits.
		Default is 10.

\return The number left padded with the pad character.  This function returns a string and not a number.
*/
Date.ext.util.xPad=function(x, pad, r)
{
	if(typeof(r) == 'undefined')
	{
		r=10;
	}
	for( ; parseInt(x, 10)<r && r>1; r/=10)
		x = pad.toString() + x;
	return x.toString();
};

/**
\brief Currently selected locale.
\details
The locale for a specific date object may be changed using \code Date.locale = "new-locale"; \endcode
The default will be based on the lang attribute of the HTML tag of your document
*/
Date.prototype.locale = 'en-GB';
//! \cond FALSE
if(document.getElementsByTagName('html') && document.getElementsByTagName('html')[0].lang)
{
	Date.prototype.locale = document.getElementsByTagName('html')[0].lang;
}
//! \endcond

/**
\brief Localised strings for days of the week and months of the year.
\details
To create your own local strings, add a locale object to the locales object.
The key of your object should be the same as your locale name.  For example:
   en-US,
   fr,
   fr-CH,
   de-DE
Names are case sensitive and are described at http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
Your locale object must contain the following keys:
\param a	Short names of days of week starting with Sunday
\param A	Long names days of week starting with Sunday
\param b	Short names of months of the year starting with January
\param B	Long names of months of the year starting with February
\param c	The preferred date and time representation in your locale
\param p	AM or PM in your locale
\param P	am or pm in your locale
\param x	The  preferred date representation for the current locale without the time.
\param X	The preferred time representation for the current locale without the date.

\sa Date.ext.locales.en for a sample implementation
\sa \ref localisation for detailed documentation on localising strftime for your own locale
*/
Date.ext.locales = { };

/**
 * \brief Localised strings for English (British).
 * \details
 * This will be used for any of the English dialects unless overridden by a country specific one.
 * This is the default locale if none specified
 */
Date.ext.locales.en = {
	a: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	A: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	b: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	B: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	c: '%a %d %b %Y %T %Z',
	p: ['AM', 'PM'],
	P: ['am', 'pm'],
	x: '%d/%m/%y',
	X: '%T'
};

//! \cond FALSE
// Localised strings for US English
Date.ext.locales['en-US'] = Date.ext.locales.en;
Date.ext.locales['en-US'].c = '%a %d %b %Y %r %Z';
Date.ext.locales['en-US'].x = '%D';
Date.ext.locales['en-US'].X = '%r';

// Localised strings for British English
Date.ext.locales['en-GB'] = Date.ext.locales.en;

// Localised strings for Australian English
Date.ext.locales['en-AU'] = Date.ext.locales['en-GB'];
//! \endcond

//! \brief List of supported format specifiers.
/**
 * \details
 * \arg \%a - abbreviated weekday name according to the current locale
 * \arg \%A - full weekday name according to the current locale
 * \arg \%b - abbreviated month name according to the current locale
 * \arg \%B - full month name according to the current locale
 * \arg \%c - preferred date and time representation for the current locale
 * \arg \%C - century number (the year divided by 100 and truncated to an integer, range 00 to 99)
 * \arg \%d - day of the month as a decimal number (range 01 to 31)
 * \arg \%D - same as %m/%d/%y
 * \arg \%e - day of the month as a decimal number, a single digit is preceded by a space (range ' 1' to '31')
 * \arg \%g - like %G, but without the century
 * \arg \%G - The 4-digit year corresponding to the ISO week number
 * \arg \%h - same as %b
 * \arg \%H - hour as a decimal number using a 24-hour clock (range 00 to 23)
 * \arg \%I - hour as a decimal number using a 12-hour clock (range 01 to 12)
 * \arg \%j - day of the year as a decimal number (range 001 to 366)
 * \arg \%m - month as a decimal number (range 01 to 12)
 * \arg \%M - minute as a decimal number
 * \arg \%n - newline character
 * \arg \%p - either `AM' or `PM' according to the given time value, or the corresponding strings for the current locale
 * \arg \%P - like %p, but lower case
 * \arg \%r - time in a.m. and p.m. notation equal to %I:%M:%S %p
 * \arg \%R - time in 24 hour notation equal to %H:%M
 * \arg \%S - second as a decimal number
 * \arg \%t - tab character
 * \arg \%T - current time, equal to %H:%M:%S
 * \arg \%u - weekday as a decimal number [1,7], with 1 representing Monday
 * \arg \%U - week number of the current year as a decimal number, starting with
 *            the first Sunday as the first day of the first week
 * \arg \%V - The ISO 8601:1988 week number of the current year as a decimal number,
 *            range 01 to 53, where week 1 is the first week that has at least 4 days
 *            in the current year, and with Monday as the first day of the week.
 * \arg \%w - day of the week as a decimal, Sunday being 0
 * \arg \%W - week number of the current year as a decimal number, starting with the
 *            first Monday as the first day of the first week
 * \arg \%x - preferred date representation for the current locale without the time
 * \arg \%X - preferred time representation for the current locale without the date
 * \arg \%y - year as a decimal number without a century (range 00 to 99)
 * \arg \%Y - year as a decimal number including the century
 * \arg \%z - numerical time zone representation
 * \arg \%Z - time zone name or abbreviation
 * \arg \%% - a literal `\%' character
 */
Date.ext.formats = {
	a: function(d) { return Date.ext.locales[d.locale].a[d.getDay()]; },
	A: function(d) { return Date.ext.locales[d.locale].A[d.getDay()]; },
	b: function(d) { return Date.ext.locales[d.locale].b[d.getMonth()]; },
	B: function(d) { return Date.ext.locales[d.locale].B[d.getMonth()]; },
	c: 'toLocaleString',
	C: function(d) { return Date.ext.util.xPad(parseInt(d.getFullYear()/100, 10), 0); },
	d: ['getDate', '0'],
	e: ['getDate', ' '],
	g: function(d) { return Date.ext.util.xPad(parseInt(Date.ext.util.G(d)/100, 10), 0); },
	G: function(d) {
			var y = d.getFullYear();
			var V = parseInt(Date.ext.formats.V(d), 10);
			var W = parseInt(Date.ext.formats.W(d), 10);

			if(W > V) {
				y++;
			} else if(W===0 && V>=52) {
				y--;
			}

			return y;
		},
	H: ['getHours', '0'],
	I: function(d) { var I=d.getHours()%12; return Date.ext.util.xPad(I===0?12:I, 0); },
	j: function(d) {
			var ms = d - new Date('' + d.getFullYear() + '/1/1 GMT');
			ms += d.getTimezoneOffset()*60000;
			var doy = parseInt(ms/60000/60/24, 10)+1;
			return Date.ext.util.xPad(doy, 0, 100);
		},
	m: function(d) { return Date.ext.util.xPad(d.getMonth()+1, 0); },
	M: ['getMinutes', '0'],
	p: function(d) { return Date.ext.locales[d.locale].p[d.getHours() >= 12 ? 1 : 0 ]; },
	P: function(d) { return Date.ext.locales[d.locale].P[d.getHours() >= 12 ? 1 : 0 ]; },
	S: ['getSeconds', '0'],
	u: function(d) { var dow = d.getDay(); return dow===0?7:dow; },
	U: function(d) {
			var doy = parseInt(Date.ext.formats.j(d), 10);
			var rdow = 6-d.getDay();
			var woy = parseInt((doy+rdow)/7, 10);
			return Date.ext.util.xPad(woy, 0);
		},
	V: function(d) {
			var woy = parseInt(Date.ext.formats.W(d), 10);
			var dow1_1 = (new Date('' + d.getFullYear() + '/1/1')).getDay();
			// First week is 01 and not 00 as in the case of %U and %W,
			// so we add 1 to the final result except if day 1 of the year
			// is a Monday (then %W returns 01).
			// We also need to subtract 1 if the day 1 of the year is 
			// Friday-Sunday, so the resulting equation becomes:
			var idow = woy + (dow1_1 > 4 || dow1_1 <= 1 ? 0 : 1);
			if(idow == 53 && (new Date('' + d.getFullYear() + '/12/31')).getDay() < 4)
			{
				idow = 1;
			}
			else if(idow === 0)
			{
				idow = Date.ext.formats.V(new Date('' + (d.getFullYear()-1) + '/12/31'));
			}

			return Date.ext.util.xPad(idow, 0);
		},
	w: 'getDay',
	W: function(d) {
			var doy = parseInt(Date.ext.formats.j(d), 10);
			var rdow = 7-Date.ext.formats.u(d);
			var woy = parseInt((doy+rdow)/7, 10);
			return Date.ext.util.xPad(woy, 0, 10);
		},
	y: function(d) { return Date.ext.util.xPad(d.getFullYear()%100, 0); },
	Y: 'getFullYear',
	z: function(d) {
			var o = d.getTimezoneOffset();
			var H = Date.ext.util.xPad(parseInt(Math.abs(o/60), 10), 0);
			var M = Date.ext.util.xPad(o%60, 0);
			return (o>0?'-':'+') + H + M;
		},
	Z: function(d) { return d.toString().replace(/^.*\(([^)]+)\)$/, '$1'); },
	'%': function(d) { return '%'; }
};

/**
\brief List of aggregate format specifiers.
\details
Aggregate format specifiers map to a combination of basic format specifiers.
These are implemented in terms of Date.ext.formats.

A format specifier that maps to 'locale' is read from Date.ext.locales[current-locale].

\sa Date.ext.formats
*/
Date.ext.aggregates = {
	c: 'locale',
	D: '%m/%d/%y',
	h: '%b',
	n: '\n',
	r: '%I:%M:%S %p',
	R: '%H:%M',
	t: '\t',
	T: '%H:%M:%S',
	x: 'locale',
	X: 'locale'
};

//! \cond FALSE
// Cache timezone values because they will never change for a given JS instance
Date.ext.aggregates.z = Date.ext.formats.z(new Date());
Date.ext.aggregates.Z = Date.ext.formats.Z(new Date());
//! \endcond

//! List of unsupported format specifiers.
/**
 * \details
 * All format specifiers supported by the PHP implementation are supported by
 * this javascript implementation.
 */
Date.ext.unsupported = { };


/**
 * \brief Formats the date according to the specified format.
 * \param fmt	The format to format the date in.  This may be a combination of the following:
 * \copydoc formats
 *
 * \return	A string representation of the date formatted based on the passed in parameter
 * \sa http://www.php.net/strftime for documentation on format specifiers
*/
Date.prototype.strftime=function(fmt)
{
	// Fix locale if declared locale hasn't been defined
	// After the first call this condition should never be entered unless someone changes the locale
	if(!(this.locale in Date.ext.locales))
	{
		if(this.locale.replace(/-[a-zA-Z]+$/, '') in Date.ext.locales)
		{
			this.locale = this.locale.replace(/-[a-zA-Z]+$/, '');
		}
		else
		{
			this.locale = 'en-GB';
		}
	}

	var d = this;
	// First replace aggregates
	while(fmt.match(/%[cDhnrRtTxXzZ]/))
	{
		fmt = fmt.replace(/%([cDhnrRtTxXzZ])/g, function(m0, m1)
				{
					var f = Date.ext.aggregates[m1];
					return (f == 'locale' ? Date.ext.locales[d.locale][m1] : f);
				});
	}


	// Now replace formats - we need a closure so that the date object gets passed through
	var str = fmt.replace(/%([aAbBCdegGHIjmMpPSuUVwWyY%])/g, function(m0, m1) 
			{
				var f = Date.ext.formats[m1];
				if(typeof(f) == 'string') {
					return d[f]();
				} else if(typeof(f) == 'function') {
					return f.call(d, d);
				} else if(typeof(f) == 'object' && typeof(f[0]) == 'string') {
					return Date.ext.util.xPad(d[f[0]](), f[1]);
				} else {
					return m1;
				}
			});
	d=null;
	return str;
};

/**
 * \mainpage strftime for Javascript
 *
 * \section toc Table of Contents
 * - \ref intro_sec
 * - <a class="el" href="strftime.js">Download full source</a> / <a class="el" href="strftime-min.js">minified</a>
 * - \subpage usage
 * - \subpage format_specifiers
 * - \subpage localisation
 * - \link strftime.js API Documentation \endlink
 * - \subpage demo
 * - \subpage changelog
 * - \subpage faq
 * - <a class="el" href="http://tech.bluesmoon.info/2008/04/strftime-in-javascript.html">Feedback</a>
 * - \subpage copyright_licence
 *
 * \section intro_sec Introduction
 *
 * C and PHP developers have had access to a built in strftime function for a long time.
 * This function is an easy way to format dates and times for various display needs.
 *
 * This library brings the flexibility of strftime to the javascript Date object
 *
 * Use this library if you frequently need to format dates in javascript in a variety of ways.  For example,
 * if you have PHP code that writes out formatted dates, and want to mimic the functionality using
 * progressively enhanced javascript, then this library can do exactly what you want.
 *
 *
 *
 *
 * \page usage Example usage
 *
 * \section usage_sec Usage
 * This library may be used as follows:
 * \code
 *     var d = new Date();
 *
 *     var ymd = d.strftime('%Y/%m/%d');
 *     var iso = d.strftime('%Y-%m-%dT%H:%M:%S%z');
 *
 * \endcode
 *
 * \subsection examples Examples
 * 
 * To get the current time in hours and minutes:
 * \code
 * 	var d = new Date();
 * 	d.strftime("%H:%M");
 * \endcode
 *
 * To get the current time with seconds in AM/PM notation:
 * \code
 * 	var d = new Date();
 * 	d.strftime("%r");
 * \endcode
 *
 * To get the year and day of the year for August 23, 2009:
 * \code
 * 	var d = new Date('2009/8/23');
 * 	d.strftime("%Y-%j");
 * \endcode
 *
 * \section demo_sec Demo
 *
 * Try your own examples on the \subpage demo page.  You can use any of the supported
 * \subpage format_specifiers.
 *
 *
 *
 *
 * \page localisation Localisation
 * You can localise strftime by implementing the short and long forms for days of the
 * week and months of the year, and the localised aggregates for the preferred date
 * and time representation for your locale.  You need to add your locale to the
 * Date.ext.locales object.
 *
 * \section localising_fr Localising for french
 *
 * For example, this is how we'd add French language strings to the locales object:
 * \dontinclude index.html
 * \skip Generic french
 * \until };
 * The % format specifiers are all defined in \ref formats.  You can use any of those.
 *
 * This locale definition may be included in your own source file, or in the HTML file
 * including \c strftime.js, however it must be defined \em after including \c strftime.js
 *
 * The above definition includes generic french strings and formats that are used in France.
 * Other french speaking countries may have other representations for dates and times, so we
 * need to override this for them.  For example, Canadian french uses a Y-m-d date format,
 * while French french uses d.m.Y.  We fix this by defining Canadian french to be the same
 * as generic french, and then override the format specifiers for \c x for the \c fr-CA locale:
 * \until End french
 *
 * You can now use any of the French locales at any time by setting \link Date.prototype.locale Date.locale \endlink
 * to \c "fr", \c "fr-FR", \c "fr-CA", or any other french dialect:
 * \code
 *     var d = new Date("2008/04/22");
 *     d.locale = "fr";
 *
 *     d.strftime("%A, %d %B == %x");
 * \endcode
 * will return:
 * \code
 *     mardi, 22 avril == 22.04.2008
 * \endcode
 * While changing the locale to "fr-CA":
 * \code
 *     d.locale = "fr-CA";
 *
 *     d.strftime("%A, %d %B == %x");
 * \endcode
 * will return:
 * \code
 *     mardi, 22 avril == 2008-04-22
 * \endcode
 *
 * You can use any of the format specifiers defined at \ref formats
 *
 * The locale for all dates defaults to the value of the \c lang attribute of your HTML document if
 * it is set, or to \c "en" otherwise.
 * \note
 * Your locale definitions \b MUST be added to the locale object before calling
 * \link Date.prototype.strftime Date.strftime \endlink.
 *
 * \sa \ref formats for a list of format specifiers that can be used in your definitions
 * for c, x and X.
 *
 * \section locale_names Locale names
 *
 * Locale names are defined in RFC 1766. Typically, a locale would be a two letter ISO639
 * defined language code and an optional ISO3166 defined country code separated by a -
 * 
 * eg: fr-FR, de-DE, hi-IN
 *
 * \sa http://www.ietf.org/rfc/rfc1766.txt
 * \sa http://www.loc.gov/standards/iso639-2/php/code_list.php
 * \sa http://www.iso.org/iso/country_codes/iso_3166_code_lists/english_country_names_and_code_elements.htm
 * 
 * \section locale_fallback Locale fallbacks
 *
 * If a locale object corresponding to the fully specified locale isn't found, an attempt will be made
 * to fall back to the two letter language code.  If a locale object corresponding to that isn't found
 * either, then the locale will fall back to \c "en".  No warning will be issued.
 *
 * For example, if we define a locale for de:
 * \until };
 * Then set the locale to \c "de-DE":
 * \code
 *     d.locale = "de-DE";
 *
 *     d.strftime("%a, %d %b");
 * \endcode
 * In this case, the \c "de" locale will be used since \c "de-DE" has not been defined:
 * \code
 *     Di, 22 Apr
 * \endcode
 *
 * Swiss german will return the same since it will also fall back to \c "de":
 * \code
 *     d.locale = "de-CH";
 *
 *     d.strftime("%a, %d %b");
 * \endcode
 * \code
 *     Di, 22 Apr
 * \endcode
 *
 * We need to override the \c a specifier for Swiss german, since it's different from German german:
 * \until End german
 * We now get the correct results:
 * \code
 *     d.locale = "de-CH";
 *
 *     d.strftime("%a, %d %b");
 * \endcode
 * \code
 *     Die, 22 Apr
 * \endcode
 *
 * \section builtin_locales Built in locales
 *
 * This library comes with pre-defined locales for en, en-GB, en-US and en-AU.
 *
 * 
 *
 *
 * \page format_specifiers Format specifiers
 * 
 * \section specifiers Format specifiers
 * strftime has several format specifiers defined by the Open group at 
 * http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html
 *
 * PHP added a few of its own, defined at http://www.php.net/strftime
 *
 * This javascript implementation supports all the PHP specifiers
 *
 * \subsection supp Supported format specifiers:
 * \copydoc formats
 * 
 * \subsection unsupportedformats Unsupported format specifiers:
 * \copydoc unsupported
 *
 *
 *
 *
 * \page demo strftime demo
 * <div style="float:right;width:45%;">
 * \copydoc formats
 * </div>
 * \htmlinclude index.html
 *
 *
 *
 *
 * \page faq FAQ
 * 
 * \section how_tos Usage
 *
 * \subsection howtouse Is there a manual on how to use this library?
 *
 * Yes, see \ref usage
 *
 * \subsection wheretoget Where can I get a minified version of this library?
 *
 * The minified version is available <a href="strftime-min.js" title="Minified strftime.js">here</a>.
 *
 * \subsection which_specifiers Which format specifiers are supported?
 *
 * See \ref format_specifiers
 *
 * \section whys Why?
 *
 * \subsection why_lib Why this library?
 *
 * I've used the strftime function in C, PHP and the Unix shell, and found it very useful
 * to do date formatting.  When I needed to do date formatting in javascript, I decided
 * that it made the most sense to just reuse what I'm already familiar with.
 *
 * \subsection why_another Why another strftime implementation for Javascript?
 *
 * Yes, there are other strftime implementations for Javascript, but I saw problems with
 * all of them that meant I couldn't use them directly.  Some implementations had bad
 * designs.  For example, iterating through all possible specifiers and scanning the string
 * for them.  Others were tied to specific libraries like prototype.
 *
 * Trying to extend any of the existing implementations would have required only slightly
 * less effort than writing this from scratch.  In the end it took me just about 3 hours
 * to write the code and about 6 hours battling with doxygen to write these docs.
 *
 * I also had an idea of how I wanted to implement this, so decided to try it.
 *
 * \subsection why_extend_date Why extend the Date class rather than subclass it?
 *
 * I tried subclassing Date and failed.  I didn't want to waste time on figuring
 * out if there was a problem in my code or if it just wasn't possible.  Adding to the
 * Date.prototype worked well, so I stuck with it.
 *
 * I did have some worries because of the way for..in loops got messed up after json.js added
 * to the Object.prototype, but that isn't an issue here since {} is not a subclass of Date.
 *
 * My last doubt was about the Date.ext namespace that I created.  I still don't like this,
 * but I felt that \c ext at least makes clear that this is external or an extension.
 *
 * It's quite possible that some future version of javascript will add an \c ext or a \c locale
 * or a \c strftime property/method to the Date class, but this library should probably
 * check for capabilities before doing what it does.
 *
 * \section curiosity Curiosity
 *
 * \subsection how_big How big is the code?
 *
 * \arg 26K bytes with documentation
 * \arg 4242 bytes minified using <a href="http://developer.yahoo.com/yui/compressor/">YUI Compressor</a>
 * \arg 1477 bytes minified and gzipped
 *
 * \subsection how_long How long did it take to write this?
 *
 * 15 minutes for the idea while I was composing this blog post:
 * http://tech.bluesmoon.info/2008/04/javascript-date-functions.html
 *
 * 3 hours in one evening to write v1.0 of the code and 6 hours the same
 * night to write the docs and this manual.  As you can tell, I'm fairly
 * sleepy.
 *
 * Versions 1.1 and 1.2 were done in a couple of hours each, and version 1.3
 * in under one hour.
 *
 * \section contributing Contributing
 *
 * \subsection how_to_rfe How can I request features or make suggestions?
 *
 * You can leave a comment on my blog post about this library here:
 * http://tech.bluesmoon.info/2008/04/strftime-in-javascript.html
 *
 * \subsection how_to_contribute Can I/How can I contribute code to this library?
 *
 * Yes, that would be very nice, thank you.  You can do various things.  You can make changes
 * to the library, and make a diff against the current file and mail me that diff at
 * philip@bluesmoon.info, or you could just host the new file on your own servers and add
 * your name to the copyright list at the top stating which parts you've added.
 *
 * If you do mail me a diff, let me know how you'd like to be listed in the copyright section.
 *
 * \subsection copyright_signover Who owns the copyright on contributed code?
 *
 * The contributor retains copyright on contributed code.
 *
 * In some cases I may use contributed code as a template and write the code myself.  In this
 * case I'll give the contributor credit for the idea, but will not add their name to the
 * copyright holders list.
 *
 *
 *
 *
 * \page copyright_licence Copyright & Licence
 *
 * \section copyright Copyright
 * \dontinclude strftime.js
 * \skip Copyright
 * \until rights
 *
 * \section licence Licence
 * \skip This code
 * \until SUCH DAMAGE.
 *
 *
 *
 * \page changelog ChangeLog
 *
 * \par 1.3 - 2008/06/17:
 * - Fixed padding issue with negative timezone offsets in %r
 *   reported and fixed by Mikko <mikko.heimola@iki.fi>
 * - Added support for %P
 * - Internationalised %r, %p and %P
 *
 * \par 1.2 - 2008/04/27:
 * - Fixed support for c (previously it just returned toLocaleString())
 * - Add support for c, x and X
 * - Add locales for en-GB, en-US and en-AU
 * - Make en-GB the default locale (previous was en)
 * - Added more localisation docs
 *
 * \par 1.1 - 2008/04/27:
 * - Fix bug in xPad which wasn't padding more than a single digit
 * - Fix bug in j which had an off by one error for days after March 10th because of daylight savings
 * - Add support for g, G, U, V and W
 *
 * \par 1.0 - 2008/04/22:
 * - Initial release with support for a, A, b, B, c, C, d, D, e, H, I, j, m, M, p, r, R, S, t, T, u, w, y, Y, z, Z, and %
 */
/**
sprintf() for JavaScript 0.7-beta1
http://www.diveintojavascript.com/projects/javascript-sprintf

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of sprintf() for JavaScript nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


Changelog:
2010.09.06 - 0.7-beta1
  - features: vsprintf, support for named placeholders
  - enhancements: format cache, reduced global namespace pollution

2010.05.22 - 0.6:
 - reverted to 0.4 and fixed the bug regarding the sign of the number 0
 Note:
 Thanks to Raphael Pigulla <raph (at] n3rd [dot) org> (http://www.n3rd.org/)
 who warned me about a bug in 0.5, I discovered that the last update was
 a regress. I appologize for that.

2010.05.09 - 0.5:
 - bug fix: 0 is now preceeded with a + sign
 - bug fix: the sign was not at the right position on padded results (Kamal Abdali)
 - switched from GPL to BSD license

2007.10.21 - 0.4:
 - unit test and patch (David Baird)

2007.09.17 - 0.3:
 - bug fix: no longer throws exception on empty paramenters (Hans Pufal)

2007.09.11 - 0.2:
 - feature: added argument swapping

2007.04.03 - 0.1:
 - initial release
**/

var sprintf = (function() {
	function get_type(variable) {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}
	function str_repeat(input, multiplier) {
		for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
		return output.join('');
	}

	var str_format = function() {
		if (!str_format.cache.hasOwnProperty(arguments[0])) {
			str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
		}
		return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
	};

	str_format.format = function(parse_tree, argv) {
		var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
		for (i = 0; i < tree_length; i++) {
			node_type = get_type(parse_tree[i]);
			if (node_type === 'string') {
				output.push(parse_tree[i]);
			}
			else if (node_type === 'array') {
				match = parse_tree[i]; // convenience purposes only
				if (match[2]) { // keyword argument
					arg = argv[cursor];
					for (k = 0; k < match[2].length; k++) {
						if (!arg.hasOwnProperty(match[2][k])) {
							throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
						}
						arg = arg[match[2][k]];
					}
				}
				else if (match[1]) { // positional argument (explicit)
					arg = argv[match[1]];
				}
				else { // positional argument (implicit)
					arg = argv[cursor++];
				}

				if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
					throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
				}
				switch (match[8]) {
					case 'b': arg = arg.toString(2); break;
					case 'c': arg = String.fromCharCode(arg); break;
					case 'd': arg = parseInt(arg, 10); break;
					case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
					case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
					case 'o': arg = arg.toString(8); break;
					case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
					case 'u': arg = Math.abs(arg); break;
					case 'x': arg = arg.toString(16); break;
					case 'X': arg = arg.toString(16).toUpperCase(); break;
				}
				arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
				pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
				pad_length = match[6] - String(arg).length;
				pad = match[6] ? str_repeat(pad_character, pad_length) : '';
				output.push(match[5] ? arg + pad : pad + arg);
			}
		}
		return output.join('');
	};

	str_format.cache = {};

	str_format.parse = function(fmt) {
		var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
		while (_fmt) {
			if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
				parse_tree.push(match[0]);
			}
			else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
				parse_tree.push('%');
			}
			else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
				if (match[2]) {
					arg_names |= 1;
					var field_list = [], replacement_field = match[2], field_match = [];
					if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
						field_list.push(field_match[1]);
						while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
							if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else {
								throw('[sprintf] huh?');
							}
						}
					}
					else {
						throw('[sprintf] huh?');
					}
					match[2] = field_list;
				}
				else {
					arg_names |= 2;
				}
				if (arg_names === 3) {
					throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
				}
				parse_tree.push(match);
			}
			else {
				throw('[sprintf] huh?');
			}
			_fmt = _fmt.substring(match[0].length);
		}
		return parse_tree;
	};

	return str_format;
})();

var vsprintf = function(fmt, argv) {
	argv.unshift(fmt);
	return sprintf.apply(null, argv);
};
/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-05-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * @website: http://www.datejs.com/
 */
Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|aft(er)?|from|hence)/i,subtract:/^(\-|bef(ore)?|ago)/i,yesterday:/^yes(terday)?/i,today:/^t(od(ay)?)?/i,tomorrow:/^tom(orrow)?/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^mn|min(ute)?s?/i,hour:/^h(our)?s?/i,week:/^w(eek)?s?/i,month:/^m(onth)?s?/i,day:/^d(ay)?s?/i,year:/^y(ear)?s?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a(?!u|p)|p)/i},timezones:[{name:"UTC",offset:"-000"},{name:"GMT",offset:"-000"},{name:"EST",offset:"-0500"},{name:"EDT",offset:"-0400"},{name:"CST",offset:"-0600"},{name:"CDT",offset:"-0500"},{name:"MST",offset:"-0700"},{name:"MDT",offset:"-0600"},{name:"PST",offset:"-0800"},{name:"PDT",offset:"-0700"}]};
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,p=function(s,l){if(!l){l=2;}
return("000"+s).slice(l*-1);};$P.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};$P.setTimeToNow=function(){var n=new Date();this.setHours(n.getHours());this.setMinutes(n.getMinutes());this.setSeconds(n.getSeconds());this.setMilliseconds(n.getMilliseconds());return this;};$D.today=function(){return new Date().clearTime();};$D.compare=function(date1,date2){if(isNaN(date1)||isNaN(date2)){throw new Error(date1+" - "+date2);}else if(date1 instanceof Date&&date2 instanceof Date){return(date1<date2)?-1:(date1>date2)?1:0;}else{throw new TypeError(date1+" - "+date2);}};$D.equals=function(date1,date2){return(date1.compareTo(date2)===0);};$D.getDayNumberFromName=function(name){var n=$C.dayNames,m=$C.abbreviatedDayNames,o=$C.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s||o[i].toLowerCase()==s){return i;}}
return-1;};$D.getMonthNumberFromName=function(name){var n=$C.monthNames,m=$C.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};$D.isLeapYear=function(year){return((year%4===0&&year%100!==0)||year%400===0);};$D.getDaysInMonth=function(year,month){return[31,($D.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};$D.getTimezoneAbbreviation=function(offset){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].offset===offset){return z[i].name;}}
return null;};$D.getTimezoneOffset=function(name){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].name===name.toUpperCase()){return z[i].offset;}}
return null;};$P.clone=function(){return new Date(this.getTime());};$P.compareTo=function(date){return Date.compare(this,date);};$P.equals=function(date){return Date.equals(this,date||new Date());};$P.between=function(start,end){return this.getTime()>=start.getTime()&&this.getTime()<=end.getTime();};$P.isAfter=function(date){return this.compareTo(date||new Date())===1;};$P.isBefore=function(date){return(this.compareTo(date||new Date())===-1);};$P.isToday=function(){return this.isSameDay(new Date());};$P.isSameDay=function(date){return this.clone().clearTime().equals(date.clone().clearTime());};$P.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};$P.addSeconds=function(value){return this.addMilliseconds(value*1000);};$P.addMinutes=function(value){return this.addMilliseconds(value*60000);};$P.addHours=function(value){return this.addMilliseconds(value*3600000);};$P.addDays=function(value){this.setDate(this.getDate()+value);return this;};$P.addWeeks=function(value){return this.addDays(value*7);};$P.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,$D.getDaysInMonth(this.getFullYear(),this.getMonth())));return this;};$P.addYears=function(value){return this.addMonths(value*12);};$P.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.milliseconds){this.addMilliseconds(x.milliseconds);}
if(x.seconds){this.addSeconds(x.seconds);}
if(x.minutes){this.addMinutes(x.minutes);}
if(x.hours){this.addHours(x.hours);}
if(x.weeks){this.addWeeks(x.weeks);}
if(x.months){this.addMonths(x.months);}
if(x.years){this.addYears(x.years);}
if(x.days){this.addDays(x.days);}
return this;};var $y,$m,$d;$P.getWeek=function(){var a,b,c,d,e,f,g,n,s,w;$y=(!$y)?this.getFullYear():$y;$m=(!$m)?this.getMonth()+1:$m;$d=(!$d)?this.getDate():$d;if($m<=2){a=$y-1;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=0;f=$d-1+(31*($m-1));}else{a=$y;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=s+1;f=$d+((153*($m-3)+2)/5)+58+s;}
g=(a+b)%7;d=(f+g-e)%7;n=(f+3-d)|0;if(n<0){w=53-((g-s)/5|0);}else if(n>364+s){w=1;}else{w=(n/7|0)+1;}
$y=$m=$d=null;return w;};$P.getISOWeek=function(){$y=this.getUTCFullYear();$m=this.getUTCMonth()+1;$d=this.getUTCDate();return p(this.getWeek());};$P.setWeek=function(n){return this.moveToDayOfWeek(1).addWeeks(n-this.getWeek());};$D._validate=function(n,min,max,name){if(typeof n=="undefined"){return false;}else if(typeof n!="number"){throw new TypeError(n+" is not a Number.");}else if(n<min||n>max){throw new RangeError(n+" is not a valid value for "+name+".");}
return true;};$D.validateMillisecond=function(value){return $D._validate(value,0,999,"millisecond");};$D.validateSecond=function(value){return $D._validate(value,0,59,"second");};$D.validateMinute=function(value){return $D._validate(value,0,59,"minute");};$D.validateHour=function(value){return $D._validate(value,0,23,"hour");};$D.validateDay=function(value,year,month){return $D._validate(value,1,$D.getDaysInMonth(year,month),"day");};$D.validateMonth=function(value){return $D._validate(value,0,11,"month");};$D.validateYear=function(value){return $D._validate(value,0,9999,"year");};$P.set=function(config){if($D.validateMillisecond(config.millisecond)){this.addMilliseconds(config.millisecond-this.getMilliseconds());}
if($D.validateSecond(config.second)){this.addSeconds(config.second-this.getSeconds());}
if($D.validateMinute(config.minute)){this.addMinutes(config.minute-this.getMinutes());}
if($D.validateHour(config.hour)){this.addHours(config.hour-this.getHours());}
if($D.validateMonth(config.month)){this.addMonths(config.month-this.getMonth());}
if($D.validateYear(config.year)){this.addYears(config.year-this.getFullYear());}
if($D.validateDay(config.day,this.getFullYear(),this.getMonth())){this.addDays(config.day-this.getDate());}
if(config.timezone){this.setTimezone(config.timezone);}
if(config.timezoneOffset){this.setTimezoneOffset(config.timezoneOffset);}
if(config.week&&$D._validate(config.week,0,53,"week")){this.setWeek(config.week);}
return this;};$P.moveToFirstDayOfMonth=function(){return this.set({day:1});};$P.moveToLastDayOfMonth=function(){return this.set({day:$D.getDaysInMonth(this.getFullYear(),this.getMonth())});};$P.moveToNthOccurrence=function(dayOfWeek,occurrence){var shift=0;if(occurrence>0){shift=occurrence-1;}
else if(occurrence===-1){this.moveToLastDayOfMonth();if(this.getDay()!==dayOfWeek){this.moveToDayOfWeek(dayOfWeek,-1);}
return this;}
return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek,+1).addWeeks(shift);};$P.moveToDayOfWeek=function(dayOfWeek,orient){var diff=(dayOfWeek-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};$P.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};$P.getOrdinalNumber=function(){return Math.ceil((this.clone().clearTime()-new Date(this.getFullYear(),0,1))/86400000)+1;};$P.getTimezone=function(){return $D.getTimezoneAbbreviation(this.getUTCOffset());};$P.setTimezoneOffset=function(offset){var here=this.getTimezoneOffset(),there=Number(offset)*-6/10;return this.addMinutes(there-here);};$P.setTimezone=function(offset){return this.setTimezoneOffset($D.getTimezoneOffset(offset));};$P.hasDaylightSavingTime=function(){return(Date.today().set({month:0,day:1}).getTimezoneOffset()!==Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.isDaylightSavingTime=function(){return(this.hasDaylightSavingTime()&&new Date().getTimezoneOffset()===Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r.charAt(0)+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};$P.getElapsed=function(date){return(date||new Date())-this;};if(!$P.toISOString){$P.toISOString=function(){function f(n){return n<10?'0'+n:n;}
return'"'+this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z"';};}
$P._toString=$P.toString;$P.toString=function(format){var x=this;if(format&&format.length==1){var c=$C.formatPatterns;x.t=x.toString;switch(format){case"d":return x.t(c.shortDate);case"D":return x.t(c.longDate);case"F":return x.t(c.fullDateTime);case"m":return x.t(c.monthDay);case"r":return x.t(c.rfc1123);case"s":return x.t(c.sortableDateTime);case"t":return x.t(c.shortTime);case"T":return x.t(c.longTime);case"u":return x.t(c.universalSortableDateTime);case"y":return x.t(c.yearMonth);}}
var ord=function(n){switch(n*1){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};return format?format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g,function(m){if(m.charAt(0)==="\\"){return m.replace("\\","");}
x.h=x.getHours;switch(m){case"hh":return p(x.h()<13?(x.h()===0?12:x.h()):(x.h()-12));case"h":return x.h()<13?(x.h()===0?12:x.h()):(x.h()-12);case"HH":return p(x.h());case"H":return x.h();case"mm":return p(x.getMinutes());case"m":return x.getMinutes();case"ss":return p(x.getSeconds());case"s":return x.getSeconds();case"yyyy":return p(x.getFullYear(),4);case"yy":return p(x.getFullYear());case"dddd":return $C.dayNames[x.getDay()];case"ddd":return $C.abbreviatedDayNames[x.getDay()];case"dd":return p(x.getDate());case"d":return x.getDate();case"MMMM":return $C.monthNames[x.getMonth()];case"MMM":return $C.abbreviatedMonthNames[x.getMonth()];case"MM":return p((x.getMonth()+1));case"M":return x.getMonth()+1;case"t":return x.h()<12?$C.amDesignator.substring(0,1):$C.pmDesignator.substring(0,1);case"tt":return x.h()<12?$C.amDesignator:$C.pmDesignator;case"S":return ord(x.getDate());default:return m;}}):this._toString();};}());
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,$N=Number.prototype;$P._orient=+1;$P._nth=null;$P._is=false;$P._same=false;$P._isSecond=false;$N._dateElement="day";$P.next=function(){this._orient=+1;return this;};$D.next=function(){return $D.today().next();};$P.last=$P.prev=$P.previous=function(){this._orient=-1;return this;};$D.last=$D.prev=$D.previous=function(){return $D.today().last();};$P.is=function(){this._is=true;return this;};$P.same=function(){this._same=true;this._isSecond=false;return this;};$P.today=function(){return this.same().day();};$P.weekday=function(){if(this._is){this._is=false;return(!this.is().sat()&&!this.is().sun());}
return false;};$P.at=function(time){return(typeof time==="string")?$D.parse(this.toString("d")+" "+time):this.set(time);};$N.fromNow=$N.after=function(date){var c={};c[this._dateElement]=this;return((!date)?new Date():date.clone()).add(c);};$N.ago=$N.before=function(date){var c={};c[this._dateElement]=this*-1;return((!date)?new Date():date.clone()).add(c);};var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),pxf=("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/),nth=("final first second third fourth fifth").split(/\s/),de;$P.toObject=function(){var o={};for(var i=0;i<px.length;i++){o[px[i].toLowerCase()]=this["get"+pxf[i]]();}
return o;};$D.fromObject=function(config){config.week=null;return Date.today().set(config);};var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
if(this._nth!==null){if(this._isSecond){this.addSeconds(this._orient*-1);}
this._isSecond=false;var ntemp=this._nth;this._nth=null;var temp=this.clone().moveToLastDayOfMonth();this.moveToNthOccurrence(n,ntemp);if(this>temp){throw new RangeError($D.getDayName(n)+" does not occur "+ntemp+" times in the month of "+$D.getMonthName(temp.getMonth())+" "+temp.getFullYear()+".");}
return this;}
return this.moveToDayOfWeek(n,this._orient);};};var sdf=function(n){return function(){var t=$D.today(),shift=n-t.getDay();if(n===0&&$C.firstDayOfWeek===1&&t.getDay()!==0){shift=shift+7;}
return t.addDays(shift);};};for(var i=0;i<dx.length;i++){$D[dx[i].toUpperCase()]=$D[dx[i].toUpperCase().substring(0,3)]=i;$D[dx[i]]=$D[dx[i].substring(0,3)]=sdf(i);$P[dx[i]]=$P[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};var smf=function(n){return function(){return $D.today().set({month:n,day:1});};};for(var j=0;j<mx.length;j++){$D[mx[j].toUpperCase()]=$D[mx[j].toUpperCase().substring(0,3)]=j;$D[mx[j]]=$D[mx[j].substring(0,3)]=smf(j);$P[mx[j]]=$P[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(this._isSecond){this._isSecond=false;return this;}
if(this._same){this._same=this._is=false;var o1=this.toObject(),o2=(arguments[0]||new Date()).toObject(),v="",k=j.toLowerCase();for(var m=(px.length-1);m>-1;m--){v=px[m].toLowerCase();if(o1[v]!=o2[v]){return false;}
if(k==v){break;}}
return true;}
if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$P[de]=$P[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}
$P._ss=ef("Second");var nthfn=function(n){return function(dayOfWeek){if(this._same){return this._ss(arguments[0]);}
if(dayOfWeek||dayOfWeek===0){return this.moveToNthOccurrence(dayOfWeek,n);}
this._nth=n;if(n===2&&(dayOfWeek===undefined||dayOfWeek===null)){this._isSecond=true;return this.addSeconds(this._orient);}
return this;};};for(var l=0;l<nth.length;l++){$P[nth[l]]=(l===0)?nthfn(-1):nthfn(l);}}());
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo;var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};$D.Grammar={};$D.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=(s.length==3)?"jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s)/4:Number(s)-1;};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<$C.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
var now=new Date();if((this.hour||this.minute)&&(!this.month&&!this.year&&!this.day)){this.day=now.getDate();}
if(!this.year){this.year=now.getFullYear();}
if(!this.month&&this.month!==0){this.month=now.getMonth();}
if(!this.day){this.day=1;}
if(!this.hour){this.hour=0;}
if(!this.minute){this.minute=0;}
if(!this.second){this.second=0;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.day>$D.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
var today=$D.today();if(this.now&&!this.unit&&!this.operator){return new Date();}else if(this.now){today=new Date();}
var expression=!!(this.days&&this.days!==null||this.orient||this.operator);var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(!this.now&&"hour minute second".indexOf(this.unit)!=-1){today.setTimeToNow();}
if(this.month||this.month===0){if("year day hour minute second".indexOf(this.unit)!=-1){this.value=this.month+1;this.month=null;expression=true;}}
if(!expression&&this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(!this.month){this.month=temp.getMonth();}
this.year=temp.getFullYear();}
if(expression&&this.weekday&&this.unit!="month"){this.unit="day";gap=($D.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month&&this.unit=="day"&&this.operator){this.value=(this.month+1);this.month=null;}
if(this.value!=null&&this.month!=null&&this.year!=null){this.day=this.value*1;}
if(this.month&&!this.day&&this.value){today.set({day:this.value*1});if(!expression){this.day=this.value*1;}}
if(!this.month&&this.value&&this.unit=="month"&&!this.now){this.month=this.value;expression=true;}
if(expression&&(this.month||this.month===0)&&this.unit!="year"){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(!this.value&&this.operator&&this.operator!==null&&this[this.unit+"s"]&&this[this.unit+"s"]!==null){this[this.unit+"s"]=this[this.unit+"s"]+((this.operator=="add")?1:-1)+(this.value||0)*orient;}else if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
this[this.unit+"s"]=this.value*orient;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(temp.getMonth()!==today.getMonth()){this.month=temp.getMonth();}}
if((this.month||this.month===0)&&!this.day){this.day=1;}
if(!this.orient&&!this.operator&&this.unit=="week"&&this.value&&!this.day&&!this.month){return Date.today().setWeek(this.value);}
if(expression&&this.timezone&&this.day&&this.days){this.day=this.days;}
return(expression)?today.add(this):today.set(this);}};var _=$D.Parsing.Operators,g=$D.Grammar,t=$D.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|@|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=$C.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken($C.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.m,g.s],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("second minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[$C.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw $D.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"","yyyy-MM-ddTHH:mm:ssZ","yyyy-MM-ddTHH:mm:ssz","yyyy-MM-ddTHH:mm:ss","yyyy-MM-ddTHH:mmZ","yyyy-MM-ddTHH:mmz","yyyy-MM-ddTHH:mm","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","MMddyyyy","ddMMyyyy","Mddyyyy","ddMyyyy","Mdyyyy","dMyyyy","yyyy","Mdyy","dMyy","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};$D._parse=$D.parse;$D.parse=function(s){var r=null;if(!s){return null;}
if(s instanceof Date){return s;}
try{r=$D.Grammar.start.call({},s.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1"));}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};$D.getParseFunction=function(fx){var fn=$D.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};$D.parseExact=function(s,fx){return $D.getParseFunction(fx)(s);};}());
/*!
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.3, Last updated: 7/21/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (0.8kb gzipped)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// document.domain - http://benalman.com/code/projects/jquery-hashchange/examples/document_domain/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.2.6, 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-4, Chrome 5-6, Safari 3.2-5,
//                   Opera 9.6-10.60, iPhone 3.1, Android 1.6-2.2, BlackBerry 4.6-5.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and
// robust, there are a few unfortunate browser bugs surrounding expected
// hashchange event-based behaviors, independent of any JavaScript
// window.onhashchange abstraction. See the following examples for more
// information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// Also note that should a browser natively support the window.onhashchange 
// event, but not report that it does, the fallback polling loop will be used.
// 
// About: Release History
// 
// 1.3   - (7/21/2010) Reorganized IE6/7 Iframe code to make it more
//         "removable" for mobile-only development. Added IE6/7 document.title
//         support. Attempted to make Iframe as hidden as possible by using
//         techniques from http://www.paciellogroup.com/blog/?p=604. Added 
//         support for the "shortcut" format $(window).hashchange( fn ) and
//         $(window).hashchange() like jQuery provides for built-in events.
//         Renamed jQuery.hashchangeDelay to <jQuery.fn.hashchange.delay> and
//         lowered its default value to 50. Added <jQuery.fn.hashchange.domain>
//         and <jQuery.fn.hashchange.src> properties plus document-domain.html
//         file to address access denied issues when setting document.domain in
//         IE6/7.
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Reused string.
  var str_hashchange = 'hashchange',
    
    // Method / object references.
    doc = document,
    fake_onhashchange,
    special = $.event.special,
    
    // Does the browser support window.onhashchange? Note that IE8 running in
    // IE7 compatibility mode reports true for 'onhashchange' in window, even
    // though the event isn't supported, so also test document.documentMode.
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && ( doc_mode === undefined || doc_mode > 7 );
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || location.href;
    return '#' + url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Method: jQuery.fn.hashchange
  // 
  // Bind a handler to the window.onhashchange event or trigger all bound
  // window.onhashchange event handlers. This behavior is consistent with
  // jQuery's built-in event handlers.
  // 
  // Usage:
  // 
  // > jQuery(window).hashchange( [ handler ] );
  // 
  // Arguments:
  // 
  //  handler - (Function) Optional handler to be bound to the hashchange
  //    event. This is a "shortcut" for the more verbose form:
  //    jQuery(window).bind( 'hashchange', handler ). If handler is omitted,
  //    all bound window.onhashchange event handlers will be triggered. This
  //    is a shortcut for the more verbose
  //    jQuery(window).trigger( 'hashchange' ). These forms are described in
  //    the <hashchange event> section.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements.
  
  // Allow the "shortcut" format $(elem).hashchange( fn ) for binding and
  // $(elem).hashchange() for triggering, like jQuery does for built-in events.
  $.fn[ str_hashchange ] = function( fn ) {
    return fn ? this.bind( str_hashchange, fn ) : this.trigger( str_hashchange );
  };
  
  // Property: jQuery.fn.hashchange.delay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 50.
  
  // Property: jQuery.fn.hashchange.domain
  // 
  // If you're setting document.domain in your JavaScript, and you want hash
  // history to work in IE6/7, not only must this property be set, but you must
  // also set document.domain BEFORE jQuery is loaded into the page. This
  // property is only applicable if you are supporting IE6/7 (or IE8 operating
  // in "IE7 compatibility" mode).
  // 
  // In addition, the <jQuery.fn.hashchange.src> property must be set to the
  // path of the included "document-domain.html" file, which can be renamed or
  // modified if necessary (note that the document.domain specified must be the
  // same in both your main JavaScript as well as in this file).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.domain = document.domain;
  
  // Property: jQuery.fn.hashchange.src
  // 
  // If, for some reason, you need to specify an Iframe src file (for example,
  // when setting document.domain as in <jQuery.fn.hashchange.domain>), you can
  // do so using this property. Note that when using this property, history
  // won't be recorded in IE6/7 until the Iframe src file loads. This property
  // is only applicable if you are supporting IE6/7 (or IE8 operating in "IE7
  // compatibility" mode).
  // 
  // Usage:
  // 
  // jQuery.fn.hashchange.src = 'path/to/file.html';
  
  $.fn[ str_hashchange ].delay = 50;
  /*
  $.fn[ str_hashchange ].domain = null;
  $.fn[ str_hashchange ].src = null;
  */
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // HTML5 window.onhashchange event is used, otherwise a polling loop is
  // initialized, running every <jQuery.fn.hashchange.delay> milliseconds to
  // see if the hash has changed. In IE6/7 (and IE8 operating in "IE7
  // compatibility" mode), a hidden Iframe is created to allow the back button
  // and hash-based history to work.
  // 
  // Usage as described in <jQuery.fn.hashchange>:
  // 
  // > // Bind an event handler.
  // > jQuery(window).hashchange( function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).hashchange();
  // 
  // A more verbose usage that allows for event namespacing:
  // 
  // > // Bind an event handler.
  // > jQuery(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // > 
  // > // Manually trigger the event handler.
  // > jQuery(window).trigger( 'hashchange' );
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one handler
  //   is actually bound to the 'hashchange' event.
  // * If you need the bound handler(s) to execute immediately, in cases where
  //   a location.hash exists on page load, via bookmark or page refresh for
  //   example, use jQuery(window).hashchange() or the more verbose 
  //   jQuery(window).trigger( 'hashchange' ).
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a DOM ready handler.
  
  // Override existing $.event.special.hashchange methods (allowing this plugin
  // to be defined after jQuery BBQ in BBQ's source code).
  special[ str_hashchange ] = $.extend( special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,
      
      // Remember the initial hash so it doesn't get triggered immediately.
      last_hash = get_fragment(),
      
      fn_retval = function(val){ return val; },
      history_set = fn_retval,
      history_get = fn_retval;
    
    // Start the polling loop.
    self.start = function() {
      timeout_id || poll();
    };
    
    // Stop the polling loop.
    self.stop = function() {
      timeout_id && clearTimeout( timeout_id );
      timeout_id = undefined;
    };
    
    // This polling loop checks every $.fn.hashchange.delay milliseconds to see
    // if location.hash has changed, and triggers the 'hashchange' event on
    // window when necessary.
    function poll() {
      var hash = get_fragment(),
        history_hash = history_get( last_hash );
      
      if ( hash !== last_hash ) {
        history_set( last_hash = hash, history_hash );
        
        $(window).trigger( str_hashchange );
        
      } else if ( history_hash !== last_hash ) {
        location.href = location.href.replace( /#.*/, '' ) + history_hash;
      }
      
      timeout_id = setTimeout( poll, $.fn[ str_hashchange ].delay );
    };
    
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvv REMOVE IF NOT SUPPORTING IE6/7/8 vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    $.browser.msie && !supports_onhashchange && (function(){
      // Not only do IE6/7 need the "magical" Iframe treatment, but so does IE8
      // when running in "IE7 compatibility" mode.
      
      var iframe,
        iframe_src;
      
      // When the event is bound and polling starts in IE 6/7, create a hidden
      // Iframe for history handling.
      self.start = function(){
        if ( !iframe ) {
          iframe_src = $.fn[ str_hashchange ].src;
          iframe_src = iframe_src && iframe_src + get_fragment();
          
          // Create hidden Iframe. Attempt to make Iframe as hidden as possible
          // by using techniques from http://www.paciellogroup.com/blog/?p=604.
          iframe = $('<iframe tabindex="-1" title="empty"/>').hide()
            
            // When Iframe has completely loaded, initialize the history and
            // start polling.
            .one( 'load', function(){
              iframe_src || history_set( get_fragment() );
              poll();
            })
            
            // Load Iframe src if specified, otherwise nothing.
            .attr( 'src', iframe_src || 'javascript:0' )
            
            // Append Iframe after the end of the body to prevent unnecessary
            // initial page scrolling (yes, this works).
            .insertAfter( 'body' )[0].contentWindow;
          
          // Whenever `document.title` changes, update the Iframe's title to
          // prettify the back/next history menu entries. Since IE sometimes
          // errors with "Unspecified error" the very first time this is set
          // (yes, very useful) wrap this with a try/catch block.
          doc.onpropertychange = function(){
            try {
              if ( event.propertyName === 'title' ) {
                iframe.document.title = doc.title;
              }
            } catch(e) {}
          };
          
        }
      };
      
      // Override the "stop" method since an IE6/7 Iframe was created. Even
      // if there are no longer any bound event handlers, the polling loop
      // is still necessary for back/next to work at all!
      self.stop = fn_retval;
      
      // Get history by looking at the hidden Iframe's location.hash.
      history_get = function() {
        return get_fragment( iframe.location.href );
      };
      
      // Set a new history item by opening and then closing the Iframe
      // document, *then* setting its location.hash. If document.domain has
      // been set, update that as well.
      history_set = function( hash, history_hash ) {
        var iframe_doc = iframe.document,
          domain = $.fn[ str_hashchange ].domain;
        
        if ( hash !== history_hash ) {
          // Update Iframe with any initial `document.title` that might be set.
          iframe_doc.title = doc.title;
          
          // Opening the Iframe's document after it has been closed is what
          // actually adds a history entry.
          iframe_doc.open();
          
          // Set document.domain for the Iframe document as well, if necessary.
          domain && iframe_doc.write( '<script>document.domain="' + domain + '"</script>' );
          
          iframe_doc.close();
          
          // Update the Iframe's hash, for great justice.
          iframe.location.hash = hash;
        }
      };
      
    })();
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^ REMOVE IF NOT SUPPORTING IE6/7/8 ^^^^^^^^^^^^^^^^^^^
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    return self;
  })();
  
})(jQuery,this);function expandtemplate(options,callback) {
	
	var template   = options.template;
	var timeRange  = options.timeRange;
	var indexRange = options.indexRange;
	var type       = options.type;
	var check      = options.check;
	var debug      = options.debug;
	var proxy      = options.proxy;
	var side       = "client";
	
	//debug = true;

	if (options.timeRange) {
		timeRange = expandISO8601Duration(timeRange);
		var Start = timeRange.split("/")[0];
		var Stop  = timeRange.split("/")[1];
	}
	if (options.indexRange && type == "sprintf") {
		var Start = indexRange.split("/")[0];
		var Stop  = indexRange.split("/")[1];
		var Step  = indexRange.split("/")[2];
	}

	if (debug) console.log("Start: " + Start);
	if (debug) console.log("Stop:  " + Stop);
	if (debug) console.log("Step:  " + Step);

	if (Start.length == 13) {Start = Start + ":00:00";}
	if (Stop.length == 13) {Stop = Stop + ":00:00";}
	if (Start.length == 16) {Start = Start + ":00";}
	if (Stop.length == 16) {Stop = Stop + ":00";}

	if (debug) console.log("Start: " + Start);
	if (debug) console.log("Stop:  " + Stop);

	var tic = new Date().getTime();
	var files   = [];
	var headers = [];

	if (!options.template.match(/\$|\%/)) {
		files[0] = options.template;
		if (debug) console.log("expandtemplate.js: No wildcards")
		return finished();
	}
	
	if (type == "sprintf") {

		// Allow identifiers to be a $.  Internally use %.
		template = template.replace(/\$/g,'%');

		if (typeof(Start) === "string") Start = parseInt(Start);	
		if (typeof(Stop) === "string") Stop = parseInt(Stop);
		if (typeof(Step) === "string") {Step = parseInt(Step);} else {Step = 1;}
			
		var k = Start;
		for (i = Start; i < Stop + 1; i = i + Step) {
			var tmps = template;
			files[k-Start] = sprintf(tmps,i);
			k = k+1;
		}
	
		if (check) return head(files,proxy,headcomplete);
		if (!check) return finished();
	}

	if (type == "strftime") {
			
		// Allow identifiers to be a %.  Internally use $.
		template = template.replace(/\%/g,'$');

		if (debug) console.log("template      = " + template);

		// Remove time zone with substr(0,25).		
		var START_dateinc  = new Date(new Date(Start).toUTCString().substr(0, 25));
		var START_dateoff  = new Date(new Date(Start).toUTCString().substr(0, 25));
		var STOP_date      = new Date(new Date(Stop).toUTCString().substr(0, 25));

		var addinc = {};
		var addoff = {};

		var keys  = ["microseconds","seconds","minutes","hours","days","days","months","years"];
		var codes = ["f",           "S",      "M",      "H",    "j",   "d",   "m",     "Y"];

		// Extract deltas (assumes 1 delta only!)
		for (i = 0; i < codes.length;i++)
			addinc[keys[i]] = parseInt(template.replace(new RegExp(".*\\${"+ codes[i] +";delta=([0-9].*)}.*"),"$1")) || 0;
		
		// Extract offsets (assumes 1 offset only!)
		for (i = 0; i < codes.length;i++)
			addoff[keys[i]] = parseInt(template.replace(new RegExp(".*\\${"+ codes[i] +";offset=([0-9].*)}.*"),"$1")) || 0;

		// Remove delta argument and replace $ with special character % for delta arguments. 
		while (template.match("{.*delta.*}"))
			template = template.replace(new RegExp("(.*)\\${([a-z]);delta=[0-9].*}(.*)","gi"),"$1%$2$3");	
		
		// Replace $ with % for all codes (will be for all except those with offset arguments).
		template = template.replace(new RegExp("\\$([a-z])","gi"),"%$1");
		
		// Remove offset argument but keep $.
		while (template.match("{.*offset.*}"))
			template = template.replace(new RegExp("(.*)\\${([a-z]);offset=[0-9].*}(.*)","ig"),"$1$$$2$3");

		// If there were no increments given, make increment equal to 1 for any code given.
		// Increment codes are marked with special character %.
		for (i = 0; i < codes.length;i++)
		 	if (template.match("%"+codes[i]) && allzero(addinc)) addinc[keys[i]] = 1;

		// If there were no offsets given, make offset equal to 1 for any code given.
		for (i = 0; i < codes.length;i++)
		 	if (template.match("$"+codes[i]) && allzero(addoff)) addoff[keys[i]] = 1;
						
		if (debug) {console.log("addoff");console.log(addoff);}
		if (debug) {console.log("addinc");console.log(addinc);}

		if (debug) console.log(template);
		if (debug) console.log(START_dateinc);
		
		var i = 0;
		
		START_dateoff.add(addoff);

		if (allzero(addinc)) {
			files[0] = template;
		} else {
			while (START_dateinc.isBefore(STOP_date)) {				
				files[i] = START_dateinc.strftime(template);
				START_dateinc.add(addinc);
				START_dateoff.add(addoff);
				files[i] = START_dateoff.strftime(files[i].replace(/\$/g,"%"));
				i = i+1;
			}
			if (Stop.substring(11).match(/[1-9]/)) {
				
				if (debug) console.log("Stop date has non-zero in time component.  Creating one more file");
				// If stop date has time component, grab extra file.
				files[i] = START_dateinc.strftime(template);
				START_dateinc.add(addinc);
				START_dateoff.add(addoff);
				files[i] = START_dateoff.strftime(files[i].replace(/\$/g,"%"));
		
								
			}

		}	
		if (!callback) return files;
		if (check) return head(files,proxy,headcomplete);
		if (!check) return finished();
		
	}

	function allzero(obj) {for (var prop in obj) {if (obj[prop] > 0) return false} return true}

	function finished() {
		var elapsed = new Date().getTime() - tic;
		if (debug) {
			if (check) {
				console.log("Generated and checked " + files.length + " URLs in " + elapsed + " ms (" + Math.round(elapsed/files.length) + " ms per)");
			} else {
				console.log("Generated " + files.length + " URLs in " + elapsed + " ms (" + Math.round(files.length/elapsed) + " per ms)");
			}
		}
		
		if (callback) {
			callback(files,headers,options);
		} else {
			return files;
		}
	}
	
	function headcomplete(data,i) {
		var Nf = files.length;	
		if (!headcomplete.N) {headcomplete.N = 0;}
		headcomplete.N = headcomplete.N + 1; 
		headers[i] = data;
		if (Nf == headcomplete.N) {
			if (debug) console.log("All head requests complete.");
			return finished();
		}
	}
		
}


function expandISO8601Duration(timeRange,options) {

	function s2b(str) {if (str === "true") {return true} else {return false}}
	function s2i(str) {return parseInt(str)}

	if (!timeRange.match(/^P|\/P|^\-P|\/\-P/)) {return timeRange;}

	now = new Date().toISOString();
	if (options) { 
		var debug = options.debug;
		if (options.now) {
			now = options.now;
		}
	}

	if (timeRange.split("/").length > 1) {
		var options = {};
		if (timeRange.split("/")[0].match(/P/) && !timeRange.split("/")[1].match(/P/)) {
			options.now = timeRange.split("/")[1];
		} else {
			options.now = new Date().toISOString();
		}
		var a = expandISO8601Duration(timeRange.split("/")[0],options);
		var b = expandISO8601Duration(timeRange.split("/")[1],options);
		return a + "/" + b;
	} else {
		Duration = timeRange;
	}
	var Durationo = Duration;
	if (debug) console.log("expandISO8601Duration: Input: " + Duration);
	if (!Duration.match(/P|T/)) return Duration;
	var Durationo = Duration;
	var years = 0;
	var months = 0;
	var days = 0;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	if (Duration.match("P")) {
		var sign    = parseInt(Duration.replace(/(.*)P.*/,"$11"));
		var years   = sign*parseInt(Duration.replace(/.*?([0-9]*)Y.*/,"$1"));
		var months  = sign*parseInt(Duration.replace(/.*?([0-9]*)M.*/,"$1"));
		var days    = sign*parseInt(Duration.replace(/.*?([0-9]*)D.*/,"$1"));
	}
	if (Durationo.match("T")) {
		var hours   = sign*parseInt(Durationo.replace(/.*?([0-9]*)H.*/,"$1"));
		var minutes = sign*parseInt(Durationo.replace(/.*?([0-9]*)M.*/,"$1"));
		var seconds = sign*parseInt(Durationo.replace(/.*?([0-9]*)S.*/,"$1"));
	}

	
	if (debug) console.log("expandISO8601Duration: Now: " + now )
	if (debug) console.log("expandISO8601Duration: Offset: ");
	if (debug) console.log({years:years,months:months,days:days,hours:hours,minutes:minutes,seconds:seconds});
	Duration = new Date(now).add({years:years,months:months,days:days,hours:hours,minutes:minutes,seconds:seconds});
	if (debug) console.log("expandISO8601Duration: Now+"+Durationo+" = " + Duration.toISOString())
	
	return Duration.toISOString();
}

// node.js
if (typeof(exports) !== "undefined" && require){

	var fs = require("fs");

	if (fs.existsSync(__dirname + "/deps")) {
		require(__dirname+"/deps/strftime");
		require(__dirname+"/deps/date");
		var sp = require(__dirname+"/deps/sprintf-0.7-beta1");
	} else {
		require(__dirname+"/../deps/strftime");
		require(__dirname+"/../deps/date");
		var sp = require(__dirname+"/../deps/sprintf-0.7-beta1");
	}	

	sprintf = sp.sprintf;
	vsprintf = sp.vsprintf;

	exports.expandtemplate = expandtemplate;
	exports.expandISO8601Duration = expandISO8601Duration;
	
}function dropdown(ID, list, after){
	if (arguments.length < 3) {
		after = "#controls";
	}
	////console.log("dropdown.js: Called with second argument");
	////console.log(list);
	////console.log("dropdown.js: Existing: ");
	////console.log($(ID).html());
	if (typeof(list) != "object") {
		//console.log('dropdown.js: List is not an object.')
		return;
	}
	//$(after + " #" + ID).remove();
	$(after + " #" + ID).remove();
	if (Object.keys(list).length === 0) {
		return;
	}
    $(after).append('<select id="' + ID + '" title="' + list.Title + '" class="' + list.Class + '"></select>');
    for (var k = 0; k < list["Values"].length; k++) {
        VALUE = list["Values"][k]["Value"];
        TITLE = list["Values"][k]["Title"];
        if (k == 0) {
        	////console.log(after + ' #' + ID);
            $(after + ' #' + ID).append('<option value="' + VALUE + '" class="def">' + list.Titleshort + '</option>');
            $(after + ' #' + ID).append('<option value="' + VALUE + '" selected="true">' + TITLE + '</option>');
//            $(after + ' #' + ID).append('<option value="' + VALUE + '" selected>' + TITLE + '</option>');
        }
        else {
            $(after + ' #' + ID).append('<option value="' + VALUE + '">' + TITLE + '</option>');
        }
    }
}
function setWH(el,galleryid,GALLERYINFO) {
	var ar = el.naturalWidth/el.naturalHeight;

	if (VIVIZ[type+"Width"]) {
		VIVIZ[galleryid][type+"Width"] = VIVIZ[type+"Width"];
	}
	if (VIVIZ[type+"Height"]) {
		VIVIZ[galleryid][type+"Height"] = VIVIZ[type+"Height"];
	}

	if (!VIVIZ[galleryid][type+"Width"] && !VIVIZ[galleryid][type+"Height"]) {
		VIVIZ[galleryid][type+"Width"] = 1.0;
		VIVIZ[galleryid][type+"Height"] = 1.0;
		if ((GALLERYINFO["fulldir"] === GALLERYINFO["thumbdir"]) || (GALLERYINFO["thumbdir"] === "")) {
			VIVIZ[galleryid][type+"Width"] = 0.25;
			VIVIZ[galleryid][type+"Height"] = 0.25;
			console.log("gallery.firstimage(): Setting thumbnail ratio to be 25% of natural width and height because fulldir = thumbdir or thumbdir was not specified.")
		}
	}

	// Compute pixels if given fractions.
	if (VIVIZ[galleryid][type+"Width"]) {
		if (VIVIZ[galleryid][type+"Width"] > 1.0) {
			VIVIZ[galleryid][type+"Width"] = VIVIZ[galleryid][type+"Width"];
		} else {
			VIVIZ[galleryid][type+"Width"] = el.naturalWidth*VIVIZ[galleryid][type+"Width"];
		}
	}
	if (VIVIZ[galleryid][type+"Height"]) {
		if (VIVIZ[galleryid][type+"Height"] > 1.0) {
			VIVIZ[galleryid][type+"Height"] = VIVIZ[type+"Height"];
		} else {
			VIVIZ[galleryid][type+"Height"] = el.naturalHeight*VIVIZ[galleryid][type+"Height"];
		}
	}

	// Compute un-specified width or height.
	if (VIVIZ[galleryid][type+"Width"] && !VIVIZ[galleryid][type+"Height"]) {
		VIVIZ[galleryid][type+"Height"] = VIVIZ[galleryid][type+"Width"]/ar;
	}
	if (VIVIZ[galleryid][type+"Height"] && !VIVIZ[galleryid][type+"Width"]) {
		VIVIZ[galleryid][type+"Width"] = VIVIZ[galleryid][type+"Height"]*ar;
	}

	if (!VIVIZ[galleryid][type+"Height"]) {
		VIVIZ[galleryid][type+"Height"] = el.naturalHeight;
	}
	if (!VIVIZ[galleryid][type+"Width"]) {
		VIVIZ[galleryid][type+"Width"] = el.naturalWidth;
	}
	VIVIZ[galleryid][type+"NaturalHeight"] = el.naturalHeight;
	VIVIZ[galleryid][type+"NaturalWidth"] = el.naturalWidth;

	return true;
}
// http://stackoverflow.com/questions/986937/how-can-i-get-the-browsers-scrollbar-sizes
$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};
function error (wrapper,msg,clear) {
	$(wrapper + ' #error').show();
	if (clear) {
		$(wrapper + ' #error').html(msg);
	} else {
		$(wrapper + ' #error').append(msg)
	};
}

function warning (wrapper,msg,clear,totime) {
	$(wrapper + ' #warning').show();
	if (clear) {
		$(wrapper + ' #warning').html(msg);
	} else {
		spacer="";
		if ($(wrapper + ' #warning').text().length > 0) {
			spacer=" | ";
		};
		$(wrapper + ' #warning').append(spacer + msg);
	}

	if (totime != Infinity)
		setTimeout(function () {$(wrapper + ' #warning').html('').hide();},totime || 3000);
}function gallery(wrapper) {
	
	console.log("gallery.js: Called.");

	resetdom();
	
	$(window).unbind('hashchange.gallery');
	$(window).bind( 'hashchange.gallery',function() {
		console.log('gallery.js: Hash has changed to ' + location.hash);
		gallery(wrapper);
	});

	var GALLERIES = cataloginfo();

	if (GALLERIES === "") {
		console.log("gallery.js: Call to cataloginfo() failed.");
		$(wrapper + " #workingfullframe").hide();
		return;
	}

	if (location.hash != "") {
		var hash = location.hash;
		console.log("gallery.js: Hash is not empty.  Updating catalog if hash was URL.")
		var galleryid = hash.replace(/^#/,'').replace(/^\//,"");
		cataloginfo(galleryid); 	// Updates catalog to include one auto-generated by URL.
		GALLERIES = cataloginfo();  // Get list with new URL.
	} else {
		// Default gallery to show is first in list.
		var galleryid = GALLERIES["Values"][0]["Id"];
	}

	VIVIZ[galleryid] = {};

	var GALLERYINFO = galleryinfo(galleryid);

	// If call to GALLERYINFO fails, something went wrong.
	if (typeof(GALLERYINFO) === "boolean") {
		console.log("gallery.js: Call to galleryinfo() failed.");	
		$(wrapper + ' #workingfullframe').css('visibility','hidden');
		error(wrapper,"Problem with gallery configuration.");
		//$(wrapper + ' #catalogxmlopen').click();
		return;
	}

	setheader();
	setdropdowns();
	setthumbs();
	
	function resetdom() {
		$(wrapper + " #fullframe").html('').css('height','');
		$(wrapper).css('margin-top','0');
		$(wrapper + " #gallerythumbframe").html('');
		$(wrapper).attr('nowvisible', '').attr('lastvisible', '').attr('totalvisible', '').attr('totalingallery', '');
		$(wrapper + " #stats").html('').css('width','').css('height','');
		$(wrapper + " #error").html('').hide();
		$(wrapper + " #warning").html('').hide();
		$(wrapper + " #connectionerror").html('');
		$(wrapper + " #catalogxml").html('');
		$(wrapper + " #gallerythumbframe").css('width','').css('height','');
	}

	function setheader() {
		var HEADER = cataloginfo(galleryid);
		if (HEADER === "") {
			error(wrapper,"Gallery ID " + galleryid + " not found. Redirecting in 5 seconds.");
			console.log("Gallery ID " + galleryid + " not found. Redirecting in 5 seconds.");
			//alert("Gallery ID " + galleryid + " not found. Redirecting in 5 seconds.")
			$(wrapper + ' #workingfullframe').css('visibility','hidden');
			setTimeout(function () {window.location = "/";$(wrapper + ' #error').hide();},5000);
			return;
		}
		
		$("head title").html(HEADER["title"]+ ": " + HEADER["about"]);
		$(wrapper + " #about").attr('title',HEADER["about"]);
		$(wrapper + " #abouttext").html(HEADER["title"]+ ": " + HEADER["about"]);
		if (VIVIZ["showAboutText"]) {
			$(wrapper + " #abouttextwrapper").show();
		}

		if ((HEADER["aboutlink"]) && (!HEADER["about"])) {
			$(wrapper + " #about").attr("onclick","window.location='" + HEADER["Aboutlink"]+"'");
		}	
		if ((!HEADER["aboutlink"]) && (HEADER["about"])) {
			//$(wrapper + " #about").attr("onclick","window.location='" + HEADER["Fulldir"]+"'");
			$(wrapper + " #aboutbuttonwrapper").show();
			if (HEADER["about"].match(/^http/)) {
				//$(wrapper + " #about").html('<a style="color:white"	>About this gallery</a>');
				$(wrapper + " #aboutbuttonwrapper").attr('onclick',"window.location='" + HEADER["about"] + "'");
			} else {
				$(wrapper + " #aboutbuttonwrapper").attr('title',HEADER["about"] + ". Click to show or hide title line.");
				// Set click to show or hide about text.
				$(wrapper + " #aboutbuttonwrapper").on("click",
					function () {
						if ($(wrapper + " #abouttextwrapper").is(":visible")) {
							$(wrapper + " #abouttextwrapper").hide(); 
						} else {
							$(wrapper + " #abouttextwrapper").show(); 
						}
					});
			}
		}

		if (!VIVIZ["showFileName"]) $(wrapper + " #filename").hide();

		if (VIVIZ["showCatalog"] && typeof(CodeMirror) !== "undefined") {
			$(wrapper + ' #catalogxmlopen').show();
			$(wrapper + ' #catalogxmlclose').hide();
			$(wrapper + " #catalogxmlopen").unbind('click');
			$(wrapper + " #catalogxmlopen").click(
					function () {
						CodeMirror($(wrapper+' #catalogxml')[0], {lineNumbers:true,"mode":"xml", "value":HEADER["xml"]});
						$(wrapper + ' #catalogxmlopen').hide();
						$(wrapper + ' #catalogxmlclose').show();
					});
			$(wrapper + " #catalogxmlclose").unbind('click');
			$(wrapper + " #catalogxmlclose").click(
					function () {
						$(wrapper + " #catalogxml").html('');
						$(wrapper + ' #catalogxmlopen').show();
						$(wrapper + ' #catalogxmlclose').hide();
					}
				);

			if (!VIVIZ["showCatalog"]) $(wrapper + " #catalog").hide();
			if (!VIVIZ["showControls"]) $(wrapper + " #controls").hide()
			if (!VIVIZ["showAttributes"]) $(wrapper + " #attributes").hide()
			if (!VIVIZ["showDropdowns"]) $(wrapper + " #dropdowns").hide()
		} else {
			if (VIVIZ["showCatalog"]) {
				console.log("gallery.setheader(): showCatalog set to true, but codemirror is not available.")
			}
			$(wrapper + ' #catalog').hide();
		}
	}

	function setthumbs() {
	
		console.log('gallery.setthumbs(): Setting thumbs.');
		
		INFOjs = thumblist(wrapper);  // Global variable.

		// Set attributes used by lazy loader
		$(wrapper).attr('totalvisible', INFOjs.length);
		$(wrapper).attr('totalingallery',GALLERYINFO["totalingallery"]);

		var thumbframe = $(wrapper + ' #gallerythumbframe');

		$(wrapper + " #fullframe").html('')
		thumbframe.html(''); // Clear thumbframe
		
		// Clear any previous scroll binding.  (Lazy load uses this.)
		thumbframe.unbind('scroll');

		$(wrapper + ' #stats').html('');
		if (INFOjs.length == 0) {
			$(wrapper + ' #stats').html('No images in subset.');
			return;
		}
		
		s = setthumb(INFOjs,0,true);
	}
	
	function setthumb(INFOjs,i,allbad) {

		var firstclicked = false;
		if (i == 0) firstimage(i); 

		// TODO: Detect bad images:
		// https://github.com/desandro/imagesloaded
		// http://stackoverflow.com/questions/821516/browser-independent-way-to-detect-when-image-has-been-loaded
		// http://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached

		function firstimage(f) {

			console.log("gallery.firstimage(): Called.");
			if (f == 0) setcontrolbindings();
			
			$('<img class="gallerythumbbrowse firstimage"/>')
				.appendTo($(wrapper + ' #gallerythumbframe'))
				.attr("id",f+1)
				.error(function () {
					// First image is bad.
					console.log("gallery.firstimage(): Image " + f + " is bad.");
					//warning("Image " + f + " not found.",true);
					$(this).remove();

					if (f > 0) {
						if (f == 1) {
							warning(wrapper,"The first image could not be loaded.",true,Infinity);
						} else {
							warning(wrapper,"Image " + f + " could not be loaded.",true,Infinity);
						}
					}
					
					if (f == INFOjs.length-1) {
						warning(wrapper,"No images could be loaded.",true,Infinity);
						console.log("No images could be loaded.");
						$(wrapper + " #workingfullframe").css('visibility','hidden');
						return;
					}
					//findfirstimage(f+1,allbad);
					firstimage(f+1,allbad);
				})
				//.bind('click',setthumbbindings)
				.attr("src", INFOjs[f].ThumbFile)
				.load(function () {
					
					if (f > 0) {
						if (f == 1) {
							warning(wrapper,"The first image in this subset could not be loaded.",true);
						} else {
							warning(wrapper,"The first " + f + " images" + " in this subset could not be loaded.",true);
						}
					}
					
					// Trigger load of the first image.
					if (!firstclicked) {
						console.log("gallery.firstimage(): Clicking first image.");
						$(wrapper).attr('nowvisible',f+1)
						$(this).bind('click',setthumbbindings).click();
					}
					firstclicked = true;

					// Scroll to top.
					$(wrapper + " #gallerythumbframe").scrollTo(0);

					// Set title attribute on thumbnail
					$(this).attr("title",imgtitle(INFOjs[f]));

						type = 'thumb'
						el = this;

						var tmp = setWH(this,galleryid,GALLERYINFO);

					// Set height of thumbnail image.
					$(this).css("height",VIVIZ[galleryid]["thumbHeight"]);
					$(this).css("width",VIVIZ[galleryid]["thumbWidth"]);


					console.log('gallery.firstimage(): First thumbnail loaded with natural dimensions = '+this.naturalWidth+'x'+this.naturalHeight+ '.');
					console.log('gallery.firstimage(): First thumbnail set to have dimensions = '+VIVIZ[galleryid]["thumbWidth"]+'x'+VIVIZ[galleryid]["thumbHeight"]+ '.');

					//settabledims();
					
					// Lazy Load images.
					$('#gallerythumbframe').attr('data-thumb-length', INFOjs.length);
					var maxLength = INFOjs.length;
					if (INFOjs.length > VIVIZ["lazyLoadMax"]) {
						maxLength = VIVIZ["lazyLoadMax"];
					}
					if (maxLength + f > INFOjs.length) {
						maxLength = INFOjs.length-f;
					}

					// Set attribute that indicates which thumbnail is active.
					$('#gallerythumbframe').attr('data-thumb-displayed', f);
					
					setscrollbinding();

					// Set next batch of thumbnails.
					var tic = new Date().getTime();
					var slowwarn = false;
					console.log("gallery.firstimage(): Setting thumbnails "+(f+1)+"-"+(f+maxLength-1));
					for (var j = f+1; j < f+maxLength; j++) {
						if ($(wrapper + " #"+(j+1)).length == 0) { // Was not already loaded by findfirstimage
							$('<img class="gallerythumbbrowse"/>')
								.appendTo($(wrapper + ' #gallerythumbframe'))
								.attr("id",j+1)
								.attr("src", INFOjs[j].ThumbFile)
								.bind('click',setthumbbindings)
								.attr("title",imgtitle(INFOjs[j]))
								.css("height",VIVIZ[galleryid]["thumbHeight"])
								.css("width",VIVIZ[galleryid]["thumbWidth"])
								.load(function () {
									if ((slowwarn == false) && (new Date().getTime() - tic > 3000)) {
										warning(wrapper,"Slow-loading gallery.  See <a href='http://viviz.org/#Performace'>performace tips</a> for improving performance.");
										slowwarn = true;	
									}	
								});
						}
					}
			});     
		}

		function setscrollbinding() {

			console.log("gallery.setscrollbinding: Called.");

			$('#gallerythumbframe').scroll(function(e){
				console.log("gallery.setscrollbinding(): Scroll event.")
				var elem = $(this);
				console.log("scrollHeight: " + elem[0].scrollHeight);
				console.log("scrollHeight: " + elem[0].scrollTop);
				console.log("scrollHeight: " + elem[0].clientHeight);
				console.log(elem[0].scrollHeight - elem[0].scrollTop - elem[0].clientHeight)
				if (elem[0].scrollHeight - elem[0].scrollTop - elem[0].clientHeight <= 0) {
					console.log("Calling loadmore().")
					loadmore();
				}
			});
		}
	}

	function settabledims(el,callback) {

		console.log("gallery.settabledims(): Called.")
		console.log("gallery.settabledims(): Full img natural width = " + VIVIZ[galleryid]["fullNaturalWidth"]);
		console.log("gallery.settabledims(): Full img natural height = " + VIVIZ[galleryid]["fullNaturalHeight"]);
		console.log("gallery.settabledims(): Full img scaled width = " + VIVIZ[galleryid]["fullWidth"]);
		console.log("gallery.settabledims(): Full img scaled height = " + VIVIZ[galleryid]["fullHeight"]);
		
		//if (galleryid.match(/ACE/)) {return;}

		if (el) {
			// Don't get border-width by querying DOM for first thumbnail, because it may not be in 
			// DOM already.  Instead, get it from function parameter.
			var bw = 2*parseFloat($(el).css('border-width').replace("px",''));
			if (isNaN(bw)) {
				bw = $(wrapper + ' #gallerythumbframe img:first').outerWidth() - VIVIZ[galleryid]["thumbWidth"];
			}
			if  (isNaN(bw)) {
				bw = 2;
			}
			var w = VIVIZ[galleryid]["thumbWidth"] + $.scrollbarWidth() + bw + 8; // Why 8?
			console.log("gallery.firstimage(): Setting #gallerythumbframe width to = "+w);
			$(wrapper + ' #gallerythumbframe').width(w);
		}

		// Set heights of thumbframe and fullframe. When first image is loaded, fullNaturalHeight is set.
		if (VIVIZ[galleryid]["fullHeight"] > 0) {
			
			// Aspect ratio;
			var ar = VIVIZ[galleryid]["fullWidth"]/VIVIZ[galleryid]["fullHeight"];
			console.log("gallery.settabledims(): Aspect ratio = "+ar);

			// Force outer frame to stay the same size after image is removed and before new image is inserted.
			//$(wrapper + " #fullframe").width($(wrapper + " #fullframe").width())
			
			// Set height of thumb strip to be full height of image.
			$(wrapper + ' #gallerythumbframe').height(VIVIZ[galleryid]["fullHeight"]);
			//return;
			enclosure = $(wrapper).parents().filter('body')[0];
			enclosure = "body";
			console.log("gallery.settabledims(): Window height: "+ $(window).height());
			console.log("gallery.settabledims(): Client height: "+ document.documentElement.clientHeight);
			console.log("gallery.settabledims(): Document height: "+ $(document).height());
			console.log("gallery.settabledims(): Enclosing body height: " + $(enclosure).height());
			// Amount height needs to shrink so that no scrollbar appears.
			dh = $(enclosure).height() - $(window).height();
			console.log("gallery.settabledims(): dh = "+dh);

			if (dh > 0) {
				console.log("gallery.settabledims(): Shrinking height of #fullframe img.")
				$(wrapper + ' #fullframe img').height(VIVIZ[galleryid]["fullHeight"]-dh)
				console.log("gallery.settabledims(): Shrinking height of #gallerythumbframe to "+(VIVIZ[galleryid]["fullHeight"]-dh));
				$(wrapper + ' #gallerythumbframe').height(VIVIZ[galleryid]["fullHeight"]-dh);
				VIVIZ[galleryid]['fullHeight'] = VIVIZ[galleryid]["fullHeight"]-dh;
				VIVIZ[galleryid]['fullWidth']  = $(wrapper + ' #gallerythumbframe img:first').width()	        	
			} else {
				console.log("gallery.settabledims(): Full image height known and dh <= 0.  Setting #gallerythumbframe height to be height of full image = " + VIVIZ[galleryid]["fullHeight"] + ".");
				console.log("gallery.settabledims(): Setting #gallerythumbframe height to "+VIVIZ[galleryid]["fullHeight"])
				$(wrapper + " #gallerythumbframe").height(VIVIZ[galleryid]["fullHeight"]);
			}

			console.log("gallery.settabledims(): Window height: "+ $(window).height());
			console.log("gallery.settabledims(): Client height: "+ document.documentElement.clientHeight);
			console.log("gallery.settabledims(): Document height: "+ $(document).height());
			console.log("gallery.settabledims(): Enclosing body height: " + $(enclosure).height());

			console.log("gallery.settabledims(): Window width: "+ $(window).width());
			console.log("gallery.settabledims(): Document width: "+ $(document).width());
			console.log("gallery.settabledims(): Enclosing body width: " + $(enclosure).width());

			dw = $(document).width()-$(enclosure).width();
			console.log("gallery.settabledims(): dw = "+dw);
			//return

			if (dw > 0) {
				if (dh > 0) {
					newh = VIVIZ[galleryid]["fullNaturalHeight"]-dh-dw/ar;
				} else {
					newh = VIVIZ[galleryid]["fullNaturalHeight"]-dw/ar;
				}
				newh = newh - 1;
				console.log("gallery.settabledims(): Shrinking height of #fullframe img again because of overlap in width.  New height: "+newh)
				$(wrapper + ' #fullframe img').height(newh)
				console.log("gallery.settabledims(): Shrinking height of #gallerythumbframe again because of overlap in width.  New height: "+newh);
				$(wrapper + ' #gallerythumbframe').height(newh);
				VIVIZ[galleryid]['fullHeight'] = newh;
				VIVIZ[galleryid]['fullWidth']  = $(wrapper + ' #gallerythumbframe img:first').width();      		        	
			} 


			dh = $(enclosure).height() - $(window).height();
			if (dh < 0) {
				console.log("gallery.settabledims(): Setting top margin for " + wrapper);
				$(wrapper).css('margin-top',-dh/2);
			}	
		} else {
			console.log("gallery.settabledims(): Full image height unknown but thumb height known.");
			var a = 4*VIVIZ[galleryid]["thumbHeight"];
			console.log("gallery.settabledims(): Setting thumb frame height to be 4*(first thumb outer height) = "+a);
			console.log("gallery.settabledims(): First thumbnail height = " + $('#gallerythumbframe img').eq(0).height());
			$(wrapper + ' #gallerythumbframe').height("" + a);
		}

		if (callback) {
			callback();
		}
	}
	
	function loadfull(jq) {

		console.log("gallery.loadfull(): Called.");

		var id = $(jq).attr('id');
		var lastvisible = parseInt($(wrapper).attr('lastvisible'));
		$(wrapper + " #fullframe img[id=" + lastvisible + "]").hide();
		
		if (id > INFOjs.length) {return;}
		
		if ($(wrapper + " #fullframe img[id="+id+"]").length == 1) {
			console.log('gallery.loadfull(): Found hidden full image in DOM.  Showing.');
			$(wrapper + " #fullframe img[id=" + id + "]").show();
			prepnext();
			setfilename(id);
			return;
		}

		// Show loading indicator
		$(wrapper + ' #workingfullframe').css('visibility','visible');

		// Place empty image element in DOM.
		$(wrapper + " #fullframe").prepend('<img id="'+id+'" class="full"/>');

		// Does not work.
		var title = $(jq).attr("title"); 
		$(wrapper + " #fullframe img[id="+id+"]").attr("title",title)
		
		$(wrapper + " #fullframe img[id="+id+"]")
				.unbind('load')
				.error(function () {
					$(wrapper + ' #workingfullframe').css('visibility','hidden');
					//$(wrapper + ' #error').html('Could not load <a href="'+$(this).attr('src')+'">'+$(this).attr('src')+'</a>')
					$(this).width(VIVIZ[galleryid]["fullWidth"]);
					$(this).height(VIVIZ[galleryid]["fullHeight"]);
				})
				.load(function(){

					console.log("gallery.loadfull(): Load event.")

					// Hide loading indicator
					$(wrapper + ' #workingfullframe').css('visibility','hidden');

					setfilename($(this).attr('id'));

					if ($(jq).hasClass('firstimage')) {
						console.log('gallery.loadfull(): First full image loaded with dimensions '+this.naturalWidth+'x'+this.naturalHeight+'.  Setting table dimensions.');


						//Enlil code
						if (VIVIZ["alternativeFrame"]) {
							$("#" + VIVIZ["alternativeFrame"] + " img").attr('src',$(wrapper + " #fullframe img[id=1]").attr('src'))
						}

						el = this;
						type = 'full';
						var ar = el.naturalWidth/el.naturalHeight;

						// Compute pixels if given fractions.
						if (VIVIZ[type+"Width"]) {
							if (VIVIZ[type+"Width"] > 1.0) {
								VIVIZ[galleryid][type+"Width"] = VIVIZ[type+"Width"];
							} else {
								VIVIZ[galleryid][type+"Width"] = el.naturalWidth*VIVIZ[type+"Width"];
							}
						}
						if (VIVIZ[type+"Height"]) {
							if (VIVIZ[type+"Height"] > 1.0) {
								VIVIZ[galleryid][type+"Height"] = VIVIZ[type+"Height"];
							} else {
								VIVIZ[galleryid][type+"Height"] = el.naturalHeight*VIVIZ[type+"Height"];
							}
						}

						// Compute un-specified width or height.
						if (VIVIZ[galleryid][type+"Width"] && !VIVIZ[galleryid][type+"Height"]) {
							VIVIZ[galleryid][type+"Height"] = VIVIZ[galleryid][type+"Width"]/ar;
						}
						if (VIVIZ[galleryid][type+"Height"] && !VIVIZ[galleryid][type+"Width"]) {
							VIVIZ[galleryid][type+"Width"] = VIVIZ[galleryid][type+"Height"]*ar;
						}

						if (!VIVIZ[galleryid][type+"Height"]) {
							VIVIZ[galleryid][type+"Height"] = el.naturalHeight;
						}
						if (!VIVIZ[galleryid][type+"Width"]) {
							VIVIZ[galleryid][type+"Width"] = el.naturalWidth;
						}

						VIVIZ[galleryid][type+"NaturalHeight"] = el.naturalHeight;
						VIVIZ[galleryid][type+"NaturalWidth"] = el.naturalWidth;

						// Set height of full image.
						$(this).css("height",VIVIZ[galleryid]["fullHeight"]);
						//$(this).css("width",VIVIZ[galleryid]["fullWidth"]);

						var enclosure = "body"
						console.log("gallery.loadfull(): Window height: "+ $(window).height());
						console.log("gallery.loadfull(): Document height: "+ $(document).height());
						console.log("gallery.loadfull(): Enclosing body height: " + $(enclosure).height());
						
						// After this function sets VIVIZ[gallerid] dimensions, then call prepnext(), which uses
						// these dimensions.
						settabledims(this, function () {prepnext()});

					} else {
						prepnext();
					}


				})
				.attr('src', INFOjs[parseInt(id-1)]["FullFile"]);

		function setfilename(id) {
			$(wrapper + " #filename").html('');
			$(wrapper + " #filename").append("<a>");
			$(wrapper + " #filename a").
			attr('href',INFOjs[parseInt(id-1)]["FullFile"]).
			text(INFOjs[parseInt(id-1)]["FullFile"]);
		}

		function prepnext() {
			
			// If next frame not in DOM, place it.
			var idn = parseInt(id) + 1;
			
			if (idn > INFOjs.length) {return;}

			if ($(wrapper + " #fullframe img[id="+idn+"]").length == 0) {
				$(wrapper + " #fullframe").prepend('<img id="'+idn+'" class="full" style="display:none"/>');
				$(wrapper + " #fullframe img[id="+idn+"]")
					.error(function () {
						$(wrapper + ' #workingfullframe').css('visibility','hidden');
						$(this).height(VIVIZ[galleryid]["fullHeight"]);
						$(this).width(VIVIZ[galleryid]["fullWidth"]);
					})
					.load (function () {
					})
					.css('height',VIVIZ[galleryid]['fullHeight'])
					.attr('src',INFOjs[idn-1]["FullFile"])
			}
		}
	}

	function loadmore() {

		var length = parseInt($('#gallerythumbframe').attr('data-thumb-length'));
		var shown = parseInt($("#gallerythumbframe > img").last().attr("id"));
		if (shown < length) {
			var maxLength = length;
			if (length > (shown+VIVIZ["lazyLoadMax"]))
				maxLength = shown+VIVIZ["lazyLoadMax"];
			
			//$(wrapper).attr('totalvisible', maxLength);
			//elem.attr('data-thumb-displayed', maxLength);
			//console.log(shown)
			var tic = new Date().getTime();
			var slowwarn = false;
			for (j=shown; j < shown+maxLength; j++) {
				//console.log("j="+j)
				if (j > INFOjs.length-1) break;
				$('<img class="gallerythumbbrowse lazyload"/>')
					.appendTo($(wrapper + ' #gallerythumbframe'))
					.attr("id",j+1)
					.attr("src", INFOjs[j].ThumbFile)
					.bind('click',setthumbbindings)
					.attr("title",imgtitle(INFOjs[j]))
					//.css("height",thumbheight)
					.css("height",$("#gallerythumbframe > img").first().height())
					.css("width",$("#gallerythumbframe > img").first().width())
					//.error(function () {$(this).remove())
					.load(function () {
						//$(wrapper).attr('totalvisible', parseInt($(wrapper).attr('totalvisible'))+1);
						if ((slowwarn == false) && (new Date().getTime() - tic > 3000)) {
							warning(wrapper,"Slow-loading gallery.  See <a href='http://viviz.org/#Performace'>performace tips</a> for improving performance.",true);
							slowwarn = true;	
							setTimeout(function () {$('#connectionerror').html('')},5000);
						}

						// The following will sometimes hide spinner before thumbnails are rendered on screen, because load
						// is triggered when image has been downloaded and before it is rendered.  This is the reason
						// for the 2*Nthumb ms delay (a guess).
						////console.log('Thumb '+parseInt($(this).attr('id'))+' loaded.');
														
					});
			}
		}
	}
	
	function setthumbbindings() {

		// Actions to take when a thumbnail is clicked.
		
		console.log("gallery.setthumbbindings(): Called.")

		var nowvisible  = parseInt($(wrapper).attr('nowvisible'));
		if (isNaN(nowvisible)) {
			nowvisible = 1;
			$(wrapper).attr('nowvisible', '1');
		} else {
			nowvisible = $(this).attr('id');
			//console.log('Setting nowvisible to ' + nowvisible);
			$(wrapper).attr('nowvisible', nowvisible);
		}
		var lastvisible = parseInt($(wrapper).attr('lastvisible'));
		if (isNaN(lastvisible)) {
			lastvisible = 1;
			$(wrapper).attr('lastvisible', '1');
		}
		
		$(wrapper + " #gallerythumbframe #" + lastvisible).removeClass('active').addClass('inactive');

		$(wrapper + " #gallerythumbframe #" + nowvisible).removeClass('inactive').addClass('active');
		
		// TODO: Duplicate calls can be avoided by giving each stat string an id and then showing hidden
		// 		 stat string if it already exists in DOM.
		INFOjs = thumblist(wrapper); 

		var statstr = "Attributes for #" + (nowvisible) + "/" + (INFOjs.length) + " in subset: ";
		statstr = statstr + " | Image #" + (1+INFOjs[nowvisible-1].ImageNumber) + "/" + $(wrapper).attr('totalingallery') + " in gallery | ";
		
		for (var z = 1;z < GALLERYINFO['attributes']["Values"].length;z++) {
			statstr = statstr + GALLERYINFO['attributes']["Values"][z].Title + " = ";
			if (GALLERYINFO['attributes']["Values"][z].Format) {
				statstr = statstr + sprintf(GALLERYINFO['attributes']["Values"][z].Format,parseFloat(INFOjs[nowvisible-1][GALLERYINFO['attributes']["Values"][z].Value]));
			} else {
				statstr = statstr + INFOjs[nowvisible-1][GALLERYINFO['attributes']["Values"][z].Value];            		
			}
			if (GALLERYINFO['attributes']["Values"][z].Unit) {
				statstr = statstr + " [" + GALLERYINFO['attributes']["Values"][z].Unit + "] " +  " | ";
			} else {
				statstr = statstr + " | ";
			}
		}

		$(wrapper + ' #stats').html(statstr);

		// Load full image.
		loadfull(this); 
		
		$(wrapper).attr("lastvisible",nowvisible);

		// Scroll thumbnail list
		$(wrapper + " #gallerythumbframe").scrollTo(this, 0, {
		   duration: 80, offset: 0
		});
	}

	function imgtitle(obj) {
		//http://stackoverflow.com/questions/5612787/converting-javascript-object-to-string
		var str = '';
		var k = 0;
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				if (isNaN(parseInt(p)))
					str += p + ':' + obj[p] + '\n';
				}
				k = k+1;
			}
			return str;
	}
	
	function setcontrolbindings() {
		
		// Show/Hide thumb button
		$(wrapper + " #showhidethumb").unbind();
		$(wrapper + " #showhidethumb").toggle(function(){
				$(wrapper + " #gallerythumbframe").hide();
				//$(wrapper + " #gallerythumbframe").css('visibility','hidden');
				//$(wrapper + " #gallerythumbframe").css('width','0px');
				setcontrolbindings.marginleft = $("#fullframe").css('margin-left');
				$("#fullframe").css('margin-left','0');
				$(wrapper + ' #showhidethumb').text('+');
			}, function(){
				console.log("gallery.setcontrolbindings: Showing gallerythumbframe.");
				$(wrapper + " #gallerythumbframe").css('visibility','visible')
				$(wrapper + " #gallerythumbframe").show();
				console.log("gallery.setcontrolbindings: Setting margin-left to " + setcontrolbindings.marginleft);
				$("#fullframe").css('margin-left',setcontrolbindings.marginleft)
				$(wrapper + ' #showhidethumb').text('x');
		});

		if (!VIVIZ["showThumbstrip"]) {$("#showhidethumb").click();}
		
		// Time step buttons
		$(wrapper + " #next").unbind('click');
		$(wrapper + ' #next').click(function(){
			lastvisible = parseInt($(wrapper).attr('lastvisible'));
			if (lastvisible == parseInt($(wrapper).attr('totalvisible'))) {				
				nowvisible = parseInt($(wrapper + " #gallerythumbframe img.firstimage").attr('id'));
			} else {
				nowvisible = lastvisible + 1;        	
			}
			console.log("gallery.setcontrolbindings: Next button clicked.  Clicking on thumbnail "+nowvisible)
			$(wrapper + " #gallerythumbframe #" + nowvisible).click();

			//Enlil code
			if (VIVIZ["alternativeFrame"]) {
				$("#" + VIVIZ["alternativeFrame"] + " img").attr('src',$(wrapper + " #fullframe img[id="+nowvisible+"]").attr('src'));
			}

			var length = parseInt($('#gallerythumbframe').attr('data-thumb-length'));
			var shown = parseInt($("#gallerythumbframe > img").last().attr("id"));
			var f = Math.ceil(nowvisible/VIVIZ["lazyLoadMax"]) - nowvisible/VIVIZ["lazyLoadMax"];
			if (f < 0.5) loadmore();
		});
		
		$(wrapper + " #previous").unbind('click');
		$(wrapper + ' #previous').click(function(){
			lastvisible = parseInt($(wrapper).attr('lastvisible'));
			if (lastvisible == 1) {
				nowvisible = parseInt($(wrapper).attr('totalvisible'));
			} else {
				nowvisible = lastvisible - 1;
			}
			$(wrapper + " #" + nowvisible).click();

			//Enlil code
			if (VIVIZ["alternativeFrame"]) {
				("#" + VIVIZ["alternativeFrame"] + " img").attr('src',$(wrapper + " #fullframe img[id="+nowvisible+"]").attr('src'))
			}

		});
		
		$(wrapper + " #last").unbind('click');
		$(wrapper + ' #last').click(function(){
			nowvisible = parseInt($(wrapper + " #gallerythumbframe > img").last().attr("id"));
			$(wrapper + " #" + nowvisible).click();
		});

		$(wrapper + " #first").unbind('click');    
		$(wrapper + ' #first').click(function(){
			nowvisible = parseInt($(wrapper + " #gallerythumbframe > img").first().attr("id"));
			$(wrapper + " #" + nowvisible).click();
		});  
	}
	
	function setdropdowns() {

		$(wrapper + " #dropdownswrapper").empty();
		dropdown("gallery", GALLERIES, wrapper + " #dropdownswrapper");
		$(wrapper + " #gallery option[value='" + galleryid + "']").attr('selected','selected');
		
		$(wrapper + ' #dropdownswrapper #gallery').unbind('change');
		$(wrapper + ' #dropdownswrapper #gallery').change(function (){
			console.log('gallery.js: Gallery changed.  galleryid = ' + galleryid);
			var galleryid = $(wrapper + " #gallery option:selected").val();
			$(wrapper + " #error").html("");
			console.log("gallery.js: Setting hash.")
			location.hash = "/" + galleryid;
		});

		// Does not work anymore with lazy load.
		dropdown("order", GALLERYINFO['orders'], wrapper + " #dropdownswrapper");

		//console.log(GALLERYINFO);
		//dropdown("output", GALLERYINFO['outputs'], wrapper + " #dropdowns");
		

		$(wrapper + ' #dropdownswrapper #order').change(function(){
			setthumbs();
		});
		$(wrapper + ' #dropdowns #download').change(function(){
			console.log("---- Download option not implemented.");
			// TODO: If imgconvert link works and VIVIZ["showDownloads"] is true, show this.
			// If imgconvert link does not work, make download drop-down text red and change tool tip to indicate problem.
		});

		if (GALLERYINFO['attributes']["Values"].length > 0) {
			dropdown("sortby", GALLERYINFO['attributes'], wrapper + " #dropdownswrapper");
			$(wrapper + ' #dropdownswrapper #sortby').change(function(){
				setregexps();
				setthumbs();
			});
			setregexps();	
		} else {
			console.log("gallery.setdropdowns(): No sort attributes.  Not displaying drop-downs for attributes.")
		}

		return true;

		function setregexps() {
			var REGEXPS            = new Object();			
			var n                  = $(wrapper + " #dropdownswrapper #sortby option:selected").val();
			REGEXPS["Title"]       = "View only images with an attribute that matches the selected constraint."
			REGEXPS["Titleshort"]  = "-Constraints-"
			REGEXPS["Values"]      = new Array();
			////console.log(GALLERYINFO['attributes'])
			for (i = 0; i < GALLERYINFO['attributes']["Values"][n]["Filters"].length; i++) {
				REGEXPS["Values"][i]          = new Object();
				REGEXPS["Values"][i]["Title"] = GALLERYINFO['attributes']["Values"][n]["Filters"][i]["Title"];
				REGEXPS["Values"][i]["Value"] = GALLERYINFO['attributes']["Values"][n]["Filters"][i]["Value"];
			}

			if (GALLERYINFO['attributes']["Values"][n]["Filters"].length > 1) {
				dropdown("regexp",REGEXPS,wrapper + " #dropdownswrapper");
			} else {
				console.log("gallery.setdropdowns(): No regexp filters.  Not displaying drop-down.")
				//$("#thumb1 #dropdownswrapper #regexp").remove();				
			}

			$(wrapper + ' #dropdownswrapper #regexp').change(function(){
				$(wrapper + " #fullframe").empty();
				setthumbs();
			})
		}
	}

}
function thumb(wrapper) {

	console.log("thumb.js: Called.")

	var GALLERIES = cataloginfo();
    if (GALLERIES === "") {
    	console.log("thumb.js: Aborting because of problem with gallery.");
    	$(wrapper).hide();
    	return;
    }

	$(window).unbind('hashchange.thumb');
	$(window).bind( 'hashchange.thumb',function() {
		console.log('thumb.js: Hash has changed to ' + location.hash);
        $(wrapper + " #thumbbrowseframe").html('');
        thumb(wrapper);
	});

	var neww = $(window).width()-$.scrollbarWidth();
	$("#t-container").css('width',neww);

	// Thumb only
	$('#t-container').css('max-width', $(document).width()-$.scrollbarWidth());
	$(window).resize(function(){
		$('#t-container').css('max-width', $(document).width()-$.scrollbarWidth());
	});

	$(wrapper + " #error").html();
	$(wrapper + " #instructions").html("Scroll down to load more images");

	if (location.hash !== "") {
		var hash = location.hash;
		var galleryid = hash.replace(/^#/,'').replace(/^\//,"");
	} else {
		var galleryid = GALLERIES["Values"][0]["Id"];
	}

	VIVIZ[galleryid] = {};

	var GALLERYINFO = galleryinfo(galleryid);
  	var THUMBDIR = GALLERYINFO['thumbdir'];
	var FULLDIR  = GALLERYINFO['fulldir'];
	var SORTBYS  = GALLERYINFO['attributes'];
	var ORDERS   = GALLERYINFO['orders'];
    //console.log(GALLERYINFO);
    //return;
    var HEADER = cataloginfo(galleryid);   
    $(wrapper + " #about").attr('title',HEADER["about"]).show();

	if ((HEADER["aboutlink"]) && (!HEADER["about"])) {
		$(wrapper + " #about").attr("onclick","window.location='" + HEADER["aboutlink"]+"'");
	}	
	if ((!HEADER["aboutlink"]) && (HEADER["about"])) {
		//$(wrapper + " #about").attr("onclick","window.location='" + HEADER["Fulldir"]+"'");
		$(wrapper + " #about").show();
		if (HEADER["about"].match(/^http/)) {
			//$(wrapper + " #about").html('<a style="color:white"	>About this gallery</a>');
			$(wrapper + " #about").attr('onclick',"window.location='" + HEADER["about"] + "'");
		} else {
			$(wrapper + " #about").attr('title',HEADER["about"]);
		}
	}

	$(wrapper + ' #catalogxmlopen').show();
	$(wrapper + ' #catalogxmlclose').hide();
	$(wrapper + " #catalogxmlopen").unbind('click');
	$(wrapper + " #catalogxmlopen").click(
			function () {
				CodeMirror($('#thumb1 #catalogxml')[0], {lineNumbers:true,"mode":"xml", "value":HEADER["xml"]});
				$(wrapper + ' #catalogxmlopen').hide();
				$(wrapper + ' #catalogxmlclose').show();
			});
	$(wrapper + " #catalogxmlclose").unbind('click');
	$(wrapper + " #catalogxmlclose").click(
			function () {
				$(wrapper + " #catalogxml").html('');
				$(wrapper + ' #catalogxmlopen').show();
				$(wrapper + ' #catalogxmlclose').hide();
			}
		);
    	
	//$(wrapper + " #thumbbrowsemode").css('display', 'inline-block;');
	//console.log('thumb.js: galleryid = ' + galleryid);
	
	if ( (typeof(dom) == "function") && ($(wrapper).text() == "") ) {
		//console.log('thumb.js: Inserting DOM from file.');
		$('body').append(dom());
	} else {
		//console.log('thumb.js: Using existing DOM in HTML file.')
	}

	if (THUMBDIR == FULLDIR) {
		$('#pngdirs').html('Images: <a href="'+FULLDIR+'">Full-size</a>');
	} else {
		$('#pngdirs').html('Images: <a href="'+THUMBDIR+'">Thumbnails</a>, <a href="'+FULLDIR+'">Full-size</a>');		
	}
	
	$(wrapper + ' #thumbbrowsemode').unbind('change');
	$(wrapper + ' #thumbbrowsemode').change(function () {
		$(wrapper + " #instructions").html("Scroll down to load more images");
		var galleryid = $(wrapper + " #gallery option:selected").val();
		setthumbbindings(galleryid);
	});

	$(wrapper + " #dropdowns").empty();

	dropdown("gallery", GALLERIES, wrapper + " #dropdowns");
	$(wrapper + " #gallery option[value='" + galleryid + "']").attr('selected','selected');

	$(wrapper + ' #dropdowns #gallery').unbind('change');
	$(wrapper + ' #dropdowns #gallery').change(function (){
		var galleryid = $(wrapper + " #gallery option:selected").val();
		$(wrapper + " #instructions").html("Scroll down to load more images");
		
	    console.log('thumb.js: Gallery changed.  galleryid = ' + galleryid);
		$(wrapper + ' #thumbframe').html('');
		$(wrapper + ' #thumbframe').children().remove();
		console.log("thumb.js: Changing hash.")
		location.hash = "/" + galleryid;
	});
		

	setdropdowns();
	setthumbs();
	
	function setthumbbindings() {
		console.log('thumb.setthumbbindings(): Setting bindings.');
			
		if (!setthumbbindings.active) setthumbbindings.active = {};

		var mode = parseInt($(wrapper + " #thumbbrowsemode :selected").attr("value"));
		
		$(wrapper + ' .thumbbrowse').unbind('click');
		$(wrapper + ' .thumbbrowse').unbind('hover');
		$(wrapper + ' .thumbbrowseoverlay').unbind('click');
		$(wrapper + ' .thumbbrowseoverlay').unbind('hover');

		function setfilename(jq) {
	        $(wrapper + " #filename").html('');
	        $(wrapper + " #filename").append("<a>");
			$(wrapper + " #filename a").attr('href',jq.src.replace(THUMBDIR,FULLDIR)).text(jq.src.replace(THUMBDIR,""));
		}
		
		if (mode == 0) {
			// Needs work
			$(wrapper + ' .thumbbrowse').hover(function(){
				this.src = this.src.replace(THUMBDIR,FULLDIR);
				$(this).css('position', 'absolute');
				setfilename(this);
			}, function(){
				this.src = this.src.replace(FULLDIR,THUMBDIR);
				$(this).css('position', 'relative');
			});
		}
	
		if (mode == 1) {
			// Needs work.
			$(wrapper + ' .thumbbrowse').toggle(function(){
				this.src = this.src.replace(THUMBDIR,FULLDIR);
			}, function(){
				this.src = this.src.replace(FULLDIR,THUMBDIR);
			});
		}
	
		$(wrapper + ' .thumbbrowse').unbind('click');
		$(wrapper + ' .thumbbrowseoverlay').unbind('click');
		$(wrapper + ' .thumbbrowseoverlay').unbind('hover');
		if (mode == 2) {

			deltaleft = $("#thumbbrowseoverlay").position().left - $("#thumbbrowseframe").position().left;
			deltatop = $("#thumbbrowseoverlay").position().top;

			$(wrapper + ' .thumbbrowse').click(function(){
				var src = $(this).attr("srcfull");
				//console.log(src);
				// Where does this 30 pixels come from?
				$(wrapper + ' #thumbbrowseoverlay').unbind('load');
				$(wrapper + ' #thumbbrowseoverlay')
					.show()
					.attr("src", src)
					.css("left", $(this).offset().left+30)
					.css("top", $(this).position().top+30)
					.load(function () {
						setthumbbindings.active = this;

						console.log("active.offset().left: " + $(setthumbbindings.active).offset().left);
						console.log("$('#thumbbrowseoverlay').width(): "+$(wrapper + ' #thumbbrowseoverlay').width())
						console.log("$('#thumbbrowseoverlay').offset().left: "+$('#thumbbrowseoverlay').offset().left)
						console.log('$(window).width(): '+$(window).width());

						if ($(wrapper + ' #thumbbrowseoverlay').width() > $(window).width()) {
							$(wrapper + " #thumbbrowseoverlay").css("left", $(window).width()/2);
						}
						$(wrapper + " #thumbbrowseoverlay").css("left", $(window).width()/2 - $(wrapper + ' #thumbbrowseoverlay').width()/2)
						return;
						var expandright = $(setthumbbindings.active).offset().left + $(wrapper + ' #thumbbrowseoverlay').width() > $(window).width();
						console.log("Full image too wide to expand right? "+ expandright);

						var expandleft = $(setthumbbindings.active).offset().left - $(wrapper + ' #thumbbrowseoverlay').width() < 0;
						console.log("Full image too wide to expand left? "+ expandleft);


						if (!expandright && expandleft) {
							// Flip left
						}
						if (!expandright && !expandleft) {
							// See if it fits when centered.  If not, scale to fit width.
						}

						deltaleft = $(wrapper + " #thumbbrowseoverlay").position().left - $(wrapper + " #thumbbrowseframe").position().left;
						deltatop  = $(wrapper + " #thumbbrowseoverlay").position().top;
						if ($(setthumbbindings.active).offset().left + $(wrapper + ' #thumbbrowseoverlay').width() > $(window).width()) {
							console.log("Flipping to left")
							$(wrapper + " #thumbbrowseoverlay").css("left", 
									$(setthumbbindings.active).offset().left + $(setthumbbindings.active).width()-$(wrapper + ' #thumbbrowseoverlay').width()+30);
						}
					})


			});
	
			$(wrapper + ' #thumbbrowseoverlay').click(function(){
				$(wrapper + ' #thumbbrowseoverlay').hide();
				$(setthumbbindings.active).css("border", "solid white 3px");
			});
			
			$(wrapper + ' #thumbbrowseoverlay').hover(function(){
	
			}, function(){
				$(wrapper + ' #thumbbrowseoverlay').hide();
				$(setthumbbindings.active).css("border", "solid white 3px");
			});
		}
	
		$(wrapper + ' .thumbbrowseoverlay').unbind('hover');
		$(wrapper + ' .thumbbrowse').unbind('hover');
		if (mode == 3) {

			$(wrapper + ' .thumbbrowse').hover(function(){

				$(setthumbbindings.active).css("border", "solid white 3px");
				setthumbbindings.active = this;
				$(wrapper + ' .thumbbrowseoverlay').unbind('hover');
				$(wrapper + ' #thumbbrowseoverlay').hover(function(){
					// Should be hovered in by default.
				}, function(){
					$(wrapper + '#thumbbrowseoverlay').hide();
					$(setthumbbindings.active).css("border", "solid white 3px");
				});

				$(wrapper + ' #thumbbrowseoverlay').show().attr("src", this.src.replace(THUMBDIR,FULLDIR)).css("left", $(this).offset().left - deltaleft).css("top", deltatop+$(this).position().top);
				$(this).css("border", "solid blue 3px");
				
				$(wrapper + ' #thumbbrowseoverlay').load(function () {
					console.log($(setthumbbindings.active).offset().left + $(this).width() > $("#thumbbrowseframe").width());
					if ($(setthumbbindings.active).offset().left + $(this).width() > $("#thumbbrowseframe").width()) {
						$(this).css("left", $(setthumbbindings.active).offset().left+$(setthumbbindings.active).width()+6-$(this).width()-deltaleft);
					}
				})
			}, function(){});                        
	
		}
	}

	function setthumbs() {
		
		//console.log('thumbbrowse.js: setthumbs(): Setting thumbs.');		
		//$(wrapper + " #working").show();
		
		var THUMBDIR = GALLERYINFO['thumbdir'];
		var FULLDIR = GALLERYINFO['fulldir'];

		var thumbwidth = "";
		if ( (FULLDIR === THUMBDIR) || (THUMBDIR === "")) {
			console.log('----thumbbrowse.js: No thumbnails detected.');
			var thumbwidth = "50%";
		}

		if (0) {
			$(window).resize(function () {
				$.doTimeout('resize', 250, function(){
					console.log('thumb.setthumbs(): Resize event.');
					setTimeout(loadmore,1000);
				})
			});
   		}

		window.onresize = function onresize() {console.log("thumb.setthumbs(): Zoom or resize event.");}

        thumb.Nloaded = 0;
		var newWidth = false;
		var newHeight = false;

		var seterrorheight = false;
		
		var th = 100;
		if (VIVIZ["thumbHeight"]) {
			var th = VIVIZ["thumbHeight"]
		}
		var tw = 100;
		if (VIVIZ["thumbWidth"]) {
			var tw = VIVIZ["thumbWidth"]
		}
		var thset = false;

		INFOjs = thumblist(wrapper); 	
		$(wrapper + " #thumbbrowseframe").empty();
		
		var maxLength = Math.min(INFOjs.length,VIVIZ["lazyLoadMax"]);
		
		//for (var j = 0; j < maxLength; j++) {s = loadone(INFOjs,j)}

		setthumbbindings();        

        console.log("thumb.setthumbs(): maxLength = "+maxLength);
        console.log("thumb.setthumbs(): VIVIZ['lazyLoadMax'] = "+VIVIZ["lazyLoadMax"]);

		loadmore();

		//http://stackoverflow.com/questions/5612787/converting-javascript-object-to-string
		function objToString (obj) {
			var str = '';
			var k = 0;
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {str += p + ':' + obj[p] + '\n'}
				k = k+1;
			}
			return str;
		}

		function setslider() {
			if (typeof($().slider) !== "function") {
				console.log("thumb.setthumbs.setslider(): No slider extension available.");
				return;
			}
			$( "#slider" ).slider({
				max: 4,
				min: 1,
				step: 1,
				value: 4,
				slide: function(event, ui) {
					console.log("thumb.setthumbs.setslider(): Slide event.")
					newWidth = tw*ui.value/4;
					newHeight = th*ui.value/4
					$('.thumbbrowse').css('width', newWidth);
					$('.thumbbrowse').css('height', newHeight);
					$(this).attr('data-curr-img-width', newWidth);
					setpadding();
					loadmore();
				}
			});
		}

		function setpadding() {

       		$("#thumbbrowseframe").css('padding',0);	
			
			x = $(wrapper + " #thumbbrowseframe img:first").outerWidth();
			console.log("thumb.setpadding(): First image outer width = " + x);

			a = $("#thumbbrowseframe").innerWidth()/x;				

			// innerWidth() is not always correct.
       		console.log("thumb.setpadding(): Inner width of thumbbrowseframe = " + $("#thumbbrowseframe").innerWidth());

			console.log("thumb.setpadding(): # images per row = " + a);
      		b = (a - Math.floor(a))*x;

      		// Only one row of images.
      		if (INFOjs.length < Math.floor(a)) {
      			b = $("#thumbbrowseframe").innerWidth() - x*INFOjs.length;
      		}

      		console.log("thumb.setpadding(): Fraction of image spacing left over = " + (a - Math.floor(a)));
      		console.log("thumb.setpadding(): Total extra space = " + b);
      		console.log("thumb.setpadding(): Setting left padding to " + b/2);
      		$("#thumbbrowseframe").css('padding-left',b/2);

		}
		
		function loadone(INFOjs,i) {

			var fixed = false;
			if (i > INFOjs.length-1) return;
			thumb.Nloaded = thumb.Nloaded+1;
			if (thumb.Nloaded == INFOjs.length-1) {
				$("#instructions").html("All images requested.");
				$("#instructions2").html("All images requested.");
			}

			var src = INFOjs[i]['ThumbFile'];
			var srcfull = INFOjs[i]['FullFile'];

			$('<img class="thumbbrowse" "src=http://viviz.org/gallery/css/transparent.png"/>')
				.width(newWidth || tw || 100)
				.attr("src", src)
				.attr("srcfull", srcfull)
				.attr("id",i)
				.css("height",newHeight || th || 100)
				.attr("title",objToString(INFOjs[i]))
				.error(function () {
					$(this).addClass("loaderror");
					$(this).attr("src","http://viviz.org/gallery/css/transparent.png");
					$(this).css("border","3px solid red");
					$(this).width(newWidth || tw || 100);
					$(this).height(newHeight || th || 100);
					if (th) {
						$('.loaderror').css('height',th);
					}
					if (tw > 0 && !fixed) {fixed = true;$(".loaderror").width(tw)}
				})
				.load(function () {
					if (!loadone.first) {
						console.log("thumb.setthumbs.loadone(): First thumbnail loaded.");

						type = 'thumb'
						el = this;

						var tmp = setWH(this,galleryid,GALLERYINFO);


						loadone.first = true;
						
						// If thumbnails exist.
						tw = VIVIZ[galleryid]["thumbWidth"];
						th = VIVIZ[galleryid]["thumbHeight"];

						$(this).width(newWidth || tw);
						$(this).height(newHeight || th);
						setpadding();
						fillrow();
						setslider();

					}			
					if (!thset) {
						// Re-set height for images that may have been placed before first image loaded.
						th = tw*this.naturalHeight/this.naturalWidth;
						$(wrapper+" #thumbbrowseframe img").css('height',th);
						thset = true;
					}

					$(this).width(newWidth || tw);
					$(this).height(newHeight || th);
				})
				.appendTo($(wrapper + ' #thumbbrowseframe'));			
		}
		
		function fillrow () {

				var delta = 0;
				if (loadone.first) {
					console.log("thumb.setthumbs.fillrow(): #thumbbrowseframe innerWidth:" + $("#thumbbrowseframe").innerWidth());
					console.log("thumb.setthumbs.fillrow(): #thumbbrowseframe img:first outerWidth:" + $(wrapper + " #thumbbrowseframe img:first").outerWidth());

					var a = Math.floor($("#thumbbrowseframe").innerWidth()/$(wrapper + " #thumbbrowseframe img:first").outerWidth());				

					console.log("thumb.setthumbs.fillrow(): Images per row = " + a);

					var delta = a - (thumb.Nloaded % a);
					console.log("thumb.setthumbs.fillrow(): Modifying number to load based on row width.  Room for "+delta+" extra.")
				}	

				Nl = thumb.Nloaded;
				for (var j = Nl; j < Nl+delta; j++) {
					loadone(INFOjs,j);
				}

		}
		function loadmore () {

        	console.log("thumb.loadmore(): Called. Nloaded = "+thumb.Nloaded);


			if (($(wrapper).height() < $(window).height())) {
				console.log("thumb.loadmore(): Loading more images due to resize event or because more space is available.");
				Nl = thumb.Nloaded;
				for (var j = Nl; j < Nl+maxLength; j++) {
					loadone(INFOjs,j);
				}

				fillrow();
				setpadding();

				setthumbbindings();        
				if (j < INFOjs.length) {
					// Put this in a timeout to allow height to be set.
					setTimeout(function () {loadmore()},100);
				} else {
				    console.log("thumb.loadmore(): No more images to load: j = "+j+", Nl = "+Nl+" INFOjs.length = "+INFOjs.length);
				}
			} else {
				console.log("thumb.loadmore(): Setting scroll trigger.");
				setscrolltrigger();
			}

		}

        function setscrolltrigger() {
			$(window).unbind('scroll');
			$(window).scroll(function (e) {
				Nl = thumb.Nloaded;
				console.log("thumb.setthumbs.setscrolltrigger(): Nl+VIVIZ['lazyLoadMax']="+Nl)
				maxLength = VIVIZ["lazyLoadMax"];
				if (Nl + VIVIZ["lazyLoadMax"] > INFOjs.length-1) {
					maxLength = INFOjs.length-Nl;
					$(window).unbind('scroll');
				}
				console.log("thumb.setthumbs.setscrolltrigger(): maxLength="+maxLength+", th="+th)
				console.log("thumb.setthumbs.setscrolltrigger(): $(window).scrollTop() + $(window).height() + 2*th = "+(2*th+$(window).scrollTop() + $(window).height()))
				console.log("thumb.setthumbs.setscrolltrigger(): $(document).height() = " + ($(document).height()))
				if ($(window).scrollTop() + $(window).height() + 2*th >= $(document).height()) {
					for (var j = Nl; j < Nl+maxLength; j++) {
						loadone(INFOjs,j);
					}
					setthumbbindings();
				} else {
					console.log("thumb.setthumbs.setscrolltrigger(): Scroll triggered, but no more loading.");
				}
			})
        }
	
	}

	function setdropdowns() {

		dropdown("order", ORDERS, wrapper + " #dropdowns");
		
		// TODO: Set this based on available space.
		$(wrapper + " #gallery").css('width','15em');

		$(wrapper + ' #dropdowns #order').change(function(){
			setthumbs();
			setthumbbindings();
		});

		if (GALLERYINFO['attributes']["Values"].length > 0) {
		    dropdown("sortby", GALLERYINFO['attributes'], wrapper + " #dropdowns");
			$(wrapper + ' #dropdowns #sortby').change(function(){
				setregexps();
				setthumbs();
			});
			setregexps();	
		} else {
			console.log("thumb.setdropdowns(): No sort attributes.  Not displaying drop-downs for attributes.")
		}

		return true;

		function setregexps() {
			var REGEXPS            = new Object();			
			var n                  = $(wrapper + " #dropdowns #sortby option:selected").val();
			REGEXPS["Title"]       = "Attribute constraints"
			REGEXPS["Titleshort"]  = "-Constraints-"
			REGEXPS["Values"]      = new Array();

			for (i = 0; i < SORTBYS["Values"][n]["Filters"].length; i++) {
				REGEXPS["Values"][i]          = new Object();
				REGEXPS["Values"][i]["Title"] = SORTBYS["Values"][n]["Filters"][i]["Title"];
				REGEXPS["Values"][i]["Value"] = SORTBYS["Values"][n]["Filters"][i]["Value"];
			}

			if (SORTBYS["Values"][n]["Filters"].length > 0) {
				dropdown("regexp",REGEXPS,wrapper + " #dropdowns");
			} else {
				$("#thumb1 #dropdowns #regexp").remove();				
			}

			$(wrapper + ' #dropdowns #regexp').change(function(){
				$(wrapper + " #instructions").html("Scroll down to load more images");
				setthumbs();
			    setthumbbindings();				
			})

		}
	}

}
function thumblist(wrapper){

	var galleryid = $(wrapper + " #gallery").val();
	var SORTBY    = $(wrapper + " #sortby").val();
	var ORDER     = $(wrapper + " #order").val();
	var regexp    = $(wrapper + " #regexp :selected").attr('value');

	var INFOG    = galleryinfo(galleryid);
	var SORTBYS  = INFOG['attributes'];
	var ORDERS   = INFOG['orders'];
	var THUMBDIR = INFOG['thumbdir'];
	var FULLDIR  = INFOG['fulldir'];
	
	// http://stackoverflow.com/questions/962802/is-it-correct-to-use-javascript-array-sort-method-for-shuffling
	function shuffle(array) { 
	    var tmp, current, top = array.length;

	    if(top) while(--top) {
	        current = Math.floor(Math.random() * (top + 1));
	        tmp = array[current];
	        array[current] = array[top];
	        array[top] = tmp;
	    }

	    return array;
	}

	// http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
	function clone(obj){       
        if (obj == null || typeof(obj) != 'object') 
            return obj;
        
        var temp = new obj.constructor(); // changed (twice)
        for (var key in obj) 
            temp[key] = clone(obj[key]);
        
        return temp;
    }

    var INFOjs = new Array();
    for (j = 0; j < INFOG["fullfiles"].length; j++) {
		INFOjs[j] = new Object();
		INFOjs[j]["FileName"] = INFOG["fullfiles"][j][0];
		INFOjs[j]["FullFile"] = INFOG["fullfiles"][j][0];
		if (typeof(INFOG["thumbfiles"]) !== "undefined") {
			INFOjs[j]["ThumbFile"] = INFOG["thumbfiles"][j][0];
        } else {
            INFOjs[j]["ThumbFile"] = INFOG["fullfiles"][j][0];
        }
		
		if (Object.keys(SORTBYS).length > 0) {
			for (z = 0;z < SORTBYS["Values"].length;z++) {
				INFOjs[j][z] = INFOG["fullfiles"][j][z];
			}
		}
		INFOjs[j]["ImageNumber"] = j;
	}
    
 	state = galleryid+SORTBY+ORDER+regexp;
	if (typeof(thumblist.cache) != 'object') {
		thumblist.cache = new Object();
	}
	if ( thumblist.cache[state] ) {
		//console.log('thumblist.js: Using cached thumblist.');
		return thumblist.cache[state];
	}  
	//console.log('thumblist.js: No cached thumblist for state = gallery + sortby + order + regexp = ' + state);
    ////console.log(SORTBY);
        
    I = new Array();
    if (regexp) {
        var REGEXP = new RegExp(regexp);
    	if (typeof(INFOjs[0][SORTBY]) == "string") {
    		var k = 0;
    		for (var i = 0; i < INFOjs.length; i++) {
    			if (INFOjs[i][SORTBY].match(REGEXP)) {
    				I[i] = k;
    				k = k+1;
    			}
    		}
    		console.log("thumblist.js: Regexp " + REGEXP + " removed " + (INFOjs.length-k) + "/" + INFOjs.length + " images in subset.");
        	//console.log('thumblist.js: First image is now ');
        	//console.log(INFOjs[I[0]]);       	
    	} else {
    		if (!regexp.match(regexp,'true')) {
    			regexp = regexp.replace('gt','>').replace('ge','<=').replace('lt','<').replace('le','<=');
    			regexp = regexp.replace('and','&').replace('&amp;','&');
    			regexp = regexp.replace('&lt;','<');
    			regexp = regexp.replace('&gt;','>');
    			var k = 0;
    			for (var i = 0; i < INFOjs.length; i++) {
    				var test = regexp.replace(/this/g,INFOjs[i][SORTBY]);
    				//var test = regexp.replace('this',INFOjs[i][SORTBY]);
    				//console.log('thumblist.js: Testing ' + test);
    				if (eval(test)) {
    					I[i] = k;
    					k = k+1;
    				}
    			}
    			//console.log("thumblist.js: Expression " + REGEXP + " removed " + (INFOjs.length-k) + "/" + INFOjs.length + " elements.");
    			//console.log('thumblist.js: First image is now ');
    			//console.log(INFOjs[I[0]]);
    		} else {
    	    	var INFOrs = clone(INFOjs);
    			//console.log("thumblist.js: Expression true removed zero elements elements.");
    			//console.log('thumblist.js: First image is now ');
    			//console.log(INFOjs);
    		}
    	}
    	if (I.length > 0) {
    		var INFOr = new Array();
        	for (i = 0; i < I.length; i++) {
        		INFOr[I[i]] = INFOjs[i];
        	}
        	var INFOrs = clone(INFOr);
    	} else {
    		return [];
    	}
    } else {
    	var INFOrs = clone(INFOjs);
    }
    //console.log(INFOrs)

    if (ORDER.match("ascending")) {
        //console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in ascending order.");
        
        if (typeof(INFOrs[0][SORTBY]) == "string") {
            //console.log('thumblist.js: Sorting attribute ' + SORTBY + " as string.");
            INFOrs.sort(function(a,b) {
            	return a[SORTBY].localeCompare(b[SORTBY]);
            });
        } else {
            //console.log('thumblist.js: Sorting attribute ' + SORTBY + " as number.");
        	INFOrs.sort(function(a, b){
        		return a[SORTBY] - b[SORTBY];
        	});
        }
    	//console.log('thumblist.js: First image is now ' + INFOrs[0].FileName);

    }

    if (ORDER.match("descending")){
        //console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in descending order.");
        if (typeof(INFOrs[0][SORTBY]) == "string") {
            //console.log('thumblist.js: Sorting attribute ' + SORTBY + " as string.");
            INFOrs.sort(function(a,b) {
            	return b[SORTBY].localeCompare(a[SORTBY]);
            });
        } else {
            //console.log('thumblist.js: Sorting attribute ' + SORTBY + " as number.");
        	INFOrs.sort(function(a, b){
        		return b[SORTBY] - a[SORTBY];
        	});
        }
    	//console.log('thumblist.js: First image is now ' + INFOrs[0]);
    }
    if (ORDER.match("random")){
        //console.log('thumblist.js: Sorting by attribute ' + SORTBY + " in random order.");
    	var idx = new Array();
    	for (i = 0;i<INFOr.length;i++) {
    		idx[i] = i;
    	}
    	var idx2 = shuffle(idx);
    	for (i = 0;i<INFOr.length;i++) {
        	INFOrs[idx2[i]] = INFOr[i];
    	}
    	//console.log('thumblist.js: First image is now ' + INFOrs[0].FileName);
    }
  
	if ((!ORDER.match("random")) & (typeof(thumblist.cache[state]) != 'object')) {
		thumblist.cache[state] = new Object();
		thumblist.cache[state] = INFOrs;
	}

    return INFOrs;
 
}function gallery(wrapper) {
	
	console.log("gallery.js: Called.");

	resetdom();
	
	$(window).unbind('hashchange.gallery');
	$(window).bind( 'hashchange.gallery',function() {
		console.log('gallery.js: Hash has changed to ' + location.hash);
		gallery(wrapper);
	});

	var GALLERIES = cataloginfo();

	if (GALLERIES === "") {
		console.log("gallery.js: Call to cataloginfo() failed.");
		$(wrapper + " #workingfullframe").hide();
		return;
	}

	if (location.hash != "") {
		var hash = location.hash;
		console.log("gallery.js: Hash is not empty.  Updating catalog if hash was URL.")
		var galleryid = hash.replace(/^#/,'').replace(/^\//,"");
		cataloginfo(galleryid); 	// Updates catalog to include one auto-generated by URL.
		GALLERIES = cataloginfo();  // Get list with new URL.
	} else {
		// Default gallery to show is first in list.
		var galleryid = GALLERIES["Values"][0]["Id"];
	}

	VIVIZ[galleryid] = {};

	var GALLERYINFO = galleryinfo(galleryid);

	// If call to GALLERYINFO fails, something went wrong.
	if (typeof(GALLERYINFO) === "boolean") {
		console.log("gallery.js: Call to galleryinfo() failed.");	
		$(wrapper + ' #workingfullframe').css('visibility','hidden');
		error(wrapper,"Problem with gallery configuration.");
		//$(wrapper + ' #catalogxmlopen').click();
		return;
	}

	setheader();
	setdropdowns();
	setthumbs();
	
	function resetdom() {
		$(wrapper + " #fullframe").html('').css('height','');
		$(wrapper).css('margin-top','0');
		$(wrapper + " #gallerythumbframe").html('');
		$(wrapper).attr('nowvisible', '').attr('lastvisible', '').attr('totalvisible', '').attr('totalingallery', '');
		$(wrapper + " #stats").html('').css('width','').css('height','');
		$(wrapper + " #error").html('').hide();
		$(wrapper + " #warning").html('').hide();
		$(wrapper + " #connectionerror").html('');
		$(wrapper + " #catalogxml").html('');
		$(wrapper + " #gallerythumbframe").css('width','').css('height','');
	}

	function setheader() {
		var HEADER = cataloginfo(galleryid);
		if (HEADER === "") {
			error(wrapper,"Gallery ID " + galleryid + " not found. Redirecting in 5 seconds.");
			console.log("Gallery ID " + galleryid + " not found. Redirecting in 5 seconds.");
			//alert("Gallery ID " + galleryid + " not found. Redirecting in 5 seconds.")
			$(wrapper + ' #workingfullframe').css('visibility','hidden');
			setTimeout(function () {window.location = "/";$(wrapper + ' #error').hide();},5000);
			return;
		}
		
		$("head title").html(HEADER["title"]+ ": " + HEADER["about"]);
		$(wrapper + " #about").attr('title',HEADER["about"]);
		$(wrapper + " #abouttext").html(HEADER["title"]+ ": " + HEADER["about"]);
		if (VIVIZ["showAboutText"]) {
			$(wrapper + " #abouttextwrapper").show();
		}

		if ((HEADER["aboutlink"]) && (!HEADER["about"])) {
			$(wrapper + " #about").attr("onclick","window.location='" + HEADER["Aboutlink"]+"'");
		}	
		if ((!HEADER["aboutlink"]) && (HEADER["about"])) {
			//$(wrapper + " #about").attr("onclick","window.location='" + HEADER["Fulldir"]+"'");
			$(wrapper + " #aboutbuttonwrapper").show();
			if (HEADER["about"].match(/^http/)) {
				//$(wrapper + " #about").html('<a style="color:white"	>About this gallery</a>');
				$(wrapper + " #aboutbuttonwrapper").attr('onclick',"window.location='" + HEADER["about"] + "'");
			} else {
				$(wrapper + " #aboutbuttonwrapper").attr('title',HEADER["about"] + ". Click to show or hide title line.");
				// Set click to show or hide about text.
				$(wrapper + " #aboutbuttonwrapper").on("click",
					function () {
						if ($(wrapper + " #abouttextwrapper").is(":visible")) {
							$(wrapper + " #abouttextwrapper").hide(); 
						} else {
							$(wrapper + " #abouttextwrapper").show(); 
						}
					});
			}
		}

		if (!VIVIZ["showFileName"]) $(wrapper + " #filename").hide();

		if (VIVIZ["showCatalog"] && typeof(CodeMirror) !== "undefined") {
			$(wrapper + ' #catalogxmlopen').show();
			$(wrapper + ' #catalogxmlclose').hide();
			$(wrapper + " #catalogxmlopen").unbind('click');
			$(wrapper + " #catalogxmlopen").click(
					function () {
						CodeMirror($(wrapper+' #catalogxml')[0], {lineNumbers:true,"mode":"xml", "value":HEADER["xml"]});
						$(wrapper + ' #catalogxmlopen').hide();
						$(wrapper + ' #catalogxmlclose').show();
					});
			$(wrapper + " #catalogxmlclose").unbind('click');
			$(wrapper + " #catalogxmlclose").click(
					function () {
						$(wrapper + " #catalogxml").html('');
						$(wrapper + ' #catalogxmlopen').show();
						$(wrapper + ' #catalogxmlclose').hide();
					}
				);

			if (!VIVIZ["showCatalog"]) $(wrapper + " #catalog").hide();
			if (!VIVIZ["showControls"]) $(wrapper + " #controls").hide()
			if (!VIVIZ["showAttributes"]) $(wrapper + " #attributes").hide()
			if (!VIVIZ["showDropdowns"]) $(wrapper + " #dropdowns").hide()
		} else {
			if (VIVIZ["showCatalog"]) {
				console.log("gallery.setheader(): showCatalog set to true, but codemirror is not available.")
			}
			$(wrapper + ' #catalog').hide();
		}
	}

	function setthumbs() {
	
		console.log('gallery.setthumbs(): Setting thumbs.');
		
		INFOjs = thumblist(wrapper);  // Global variable.

		// Set attributes used by lazy loader
		$(wrapper).attr('totalvisible', INFOjs.length);
		$(wrapper).attr('totalingallery',GALLERYINFO["totalingallery"]);

		var thumbframe = $(wrapper + ' #gallerythumbframe');

		$(wrapper + " #fullframe").html('')
		thumbframe.html(''); // Clear thumbframe
		
		// Clear any previous scroll binding.  (Lazy load uses this.)
		thumbframe.unbind('scroll');

		$(wrapper + ' #stats').html('');
		if (INFOjs.length == 0) {
			$(wrapper + ' #stats').html('No images in subset.');
			return;
		}
		
		s = setthumb(INFOjs,0,true);
	}
	
	function setthumb(INFOjs,i,allbad) {

		var firstclicked = false;
		if (i == 0) firstimage(i); 

		// TODO: Detect bad images:
		// https://github.com/desandro/imagesloaded
		// http://stackoverflow.com/questions/821516/browser-independent-way-to-detect-when-image-has-been-loaded
		// http://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached

		function firstimage(f) {

			console.log("gallery.firstimage(): Called.");
			if (f == 0) setcontrolbindings();
			
			$('<img class="gallerythumbbrowse firstimage"/>')
				.appendTo($(wrapper + ' #gallerythumbframe'))
				.attr("id",f+1)
				.error(function () {
					// First image is bad.
					console.log("gallery.firstimage(): Image " + f + " is bad.");
					//warning("Image " + f + " not found.",true);
					$(this).remove();

					if (f > 0) {
						if (f == 1) {
							warning(wrapper,"The first image could not be loaded.",true,Infinity);
						} else {
							warning(wrapper,"Image " + f + " could not be loaded.",true,Infinity);
						}
					}
					
					if (f == INFOjs.length-1) {
						warning(wrapper,"No images could be loaded.",true,Infinity);
						console.log("No images could be loaded.");
						$(wrapper + " #workingfullframe").css('visibility','hidden');
						return;
					}
					//findfirstimage(f+1,allbad);
					firstimage(f+1,allbad);
				})
				//.bind('click',setthumbbindings)
				.attr("src", INFOjs[f].ThumbFile)
				.load(function () {
					
					if (f > 0) {
						if (f == 1) {
							warning(wrapper,"The first image in this subset could not be loaded.",true);
						} else {
							warning(wrapper,"The first " + f + " images" + " in this subset could not be loaded.",true);
						}
					}
					
					// Trigger load of the first image.
					if (!firstclicked) {
						console.log("gallery.firstimage(): Clicking first image.");
						$(wrapper).attr('nowvisible',f+1)
						$(this).bind('click',setthumbbindings).click();
					}
					firstclicked = true;

					// Scroll to top.
					$(wrapper + " #gallerythumbframe").scrollTo(0);

					// Set title attribute on thumbnail
					$(this).attr("title",imgtitle(INFOjs[f]));

						type = 'thumb'
						el = this;

						var tmp = setWH(this,galleryid,GALLERYINFO);

					// Set height of thumbnail image.
					$(this).css("height",VIVIZ[galleryid]["thumbHeight"]);
					$(this).css("width",VIVIZ[galleryid]["thumbWidth"]);


					console.log('gallery.firstimage(): First thumbnail loaded with natural dimensions = '+this.naturalWidth+'x'+this.naturalHeight+ '.');
					console.log('gallery.firstimage(): First thumbnail set to have dimensions = '+VIVIZ[galleryid]["thumbWidth"]+'x'+VIVIZ[galleryid]["thumbHeight"]+ '.');

					//settabledims();
					
					// Lazy Load images.
					$('#gallerythumbframe').attr('data-thumb-length', INFOjs.length);
					var maxLength = INFOjs.length;
					if (INFOjs.length > VIVIZ["lazyLoadMax"]) {
						maxLength = VIVIZ["lazyLoadMax"];
					}
					if (maxLength + f > INFOjs.length) {
						maxLength = INFOjs.length-f;
					}

					// Set attribute that indicates which thumbnail is active.
					$('#gallerythumbframe').attr('data-thumb-displayed', f);
					
					setscrollbinding();

					// Set next batch of thumbnails.
					var tic = new Date().getTime();
					var slowwarn = false;
					console.log("gallery.firstimage(): Setting thumbnails "+(f+1)+"-"+(f+maxLength-1));
					for (var j = f+1; j < f+maxLength; j++) {
						if ($(wrapper + " #"+(j+1)).length == 0) { // Was not already loaded by findfirstimage
							$('<img class="gallerythumbbrowse"/>')
								.appendTo($(wrapper + ' #gallerythumbframe'))
								.attr("id",j+1)
								.attr("src", INFOjs[j].ThumbFile)
								.bind('click',setthumbbindings)
								.attr("title",imgtitle(INFOjs[j]))
								.css("height",VIVIZ[galleryid]["thumbHeight"])
								.css("width",VIVIZ[galleryid]["thumbWidth"])
								.load(function () {
									if ((slowwarn == false) && (new Date().getTime() - tic > 3000)) {
										warning(wrapper,"Slow-loading gallery.  See <a href='http://viviz.org/#Performace'>performace tips</a> for improving performance.");
										slowwarn = true;	
									}	
								});
						}
					}
			});     
		}

		function setscrollbinding() {

			console.log("gallery.setscrollbinding: Called.");

			$('#gallerythumbframe').scroll(function(e){
				console.log("gallery.setscrollbinding(): Scroll event.")
				var elem = $(this);
				console.log("scrollHeight: " + elem[0].scrollHeight);
				console.log("scrollHeight: " + elem[0].scrollTop);
				console.log("scrollHeight: " + elem[0].clientHeight);
				console.log(elem[0].scrollHeight - elem[0].scrollTop - elem[0].clientHeight)
				if (elem[0].scrollHeight - elem[0].scrollTop - elem[0].clientHeight <= 0) {
					console.log("Calling loadmore().")
					loadmore();
				}
			});
		}
	}

	function settabledims(el,callback) {

		console.log("gallery.settabledims(): Called.")
		console.log("gallery.settabledims(): Full img natural width = " + VIVIZ[galleryid]["fullNaturalWidth"]);
		console.log("gallery.settabledims(): Full img natural height = " + VIVIZ[galleryid]["fullNaturalHeight"]);
		console.log("gallery.settabledims(): Full img scaled width = " + VIVIZ[galleryid]["fullWidth"]);
		console.log("gallery.settabledims(): Full img scaled height = " + VIVIZ[galleryid]["fullHeight"]);
		
		//if (galleryid.match(/ACE/)) {return;}

		if (el) {
			// Don't get border-width by querying DOM for first thumbnail, because it may not be in 
			// DOM already.  Instead, get it from function parameter.
			var bw = 2*parseFloat($(el).css('border-width').replace("px",''));
			if (isNaN(bw)) {
				bw = $(wrapper + ' #gallerythumbframe img:first').outerWidth() - VIVIZ[galleryid]["thumbWidth"];
			}
			if  (isNaN(bw)) {
				bw = 2;
			}
			var w = VIVIZ[galleryid]["thumbWidth"] + $.scrollbarWidth() + bw + 8; // Why 8?
			console.log("gallery.firstimage(): Setting #gallerythumbframe width to = "+w);
			$(wrapper + ' #gallerythumbframe').width(w);
		}

		// Set heights of thumbframe and fullframe. When first image is loaded, fullNaturalHeight is set.
		if (VIVIZ[galleryid]["fullHeight"] > 0) {
			
			// Aspect ratio;
			var ar = VIVIZ[galleryid]["fullWidth"]/VIVIZ[galleryid]["fullHeight"];
			console.log("gallery.settabledims(): Aspect ratio = "+ar);

			// Force outer frame to stay the same size after image is removed and before new image is inserted.
			//$(wrapper + " #fullframe").width($(wrapper + " #fullframe").width())
			
			// Set height of thumb strip to be full height of image.
			$(wrapper + ' #gallerythumbframe').height(VIVIZ[galleryid]["fullHeight"]);
			//return;
			enclosure = $(wrapper).parents().filter('body')[0];
			enclosure = "body";
			console.log("gallery.settabledims(): Window height: "+ $(window).height());
			console.log("gallery.settabledims(): Client height: "+ document.documentElement.clientHeight);
			console.log("gallery.settabledims(): Document height: "+ $(document).height());
			console.log("gallery.settabledims(): Enclosing body height: " + $(enclosure).height());
			// Amount height needs to shrink so that no scrollbar appears.
			dh = $(enclosure).height() - $(window).height();
			console.log("gallery.settabledims(): dh = "+dh);

			if (dh > 0) {
				console.log("gallery.settabledims(): Shrinking height of #fullframe img.")
				$(wrapper + ' #fullframe img').height(VIVIZ[galleryid]["fullHeight"]-dh)
				console.log("gallery.settabledims(): Shrinking height of #gallerythumbframe to "+(VIVIZ[galleryid]["fullHeight"]-dh));
				$(wrapper + ' #gallerythumbframe').height(VIVIZ[galleryid]["fullHeight"]-dh);
				VIVIZ[galleryid]['fullHeight'] = VIVIZ[galleryid]["fullHeight"]-dh;
				VIVIZ[galleryid]['fullWidth']  = $(wrapper + ' #gallerythumbframe img:first').width()	        	
			} else {
				console.log("gallery.settabledims(): Full image height known and dh <= 0.  Setting #gallerythumbframe height to be height of full image = " + VIVIZ[galleryid]["fullHeight"] + ".");
				console.log("gallery.settabledims(): Setting #gallerythumbframe height to "+VIVIZ[galleryid]["fullHeight"])
				$(wrapper + " #gallerythumbframe").height(VIVIZ[galleryid]["fullHeight"]);
			}

			console.log("gallery.settabledims(): Window height: "+ $(window).height());
			console.log("gallery.settabledims(): Client height: "+ document.documentElement.clientHeight);
			console.log("gallery.settabledims(): Document height: "+ $(document).height());
			console.log("gallery.settabledims(): Enclosing body height: " + $(enclosure).height());

			console.log("gallery.settabledims(): Window width: "+ $(window).width());
			console.log("gallery.settabledims(): Document width: "+ $(document).width());
			console.log("gallery.settabledims(): Enclosing body width: " + $(enclosure).width());

			dw = $(document).width()-$(enclosure).width();
			console.log("gallery.settabledims(): dw = "+dw);
			//return

			if (dw > 0) {
				if (dh > 0) {
					newh = VIVIZ[galleryid]["fullNaturalHeight"]-dh-dw/ar;
				} else {
					newh = VIVIZ[galleryid]["fullNaturalHeight"]-dw/ar;
				}
				newh = newh - 1;
				console.log("gallery.settabledims(): Shrinking height of #fullframe img again because of overlap in width.  New height: "+newh)
				$(wrapper + ' #fullframe img').height(newh)
				console.log("gallery.settabledims(): Shrinking height of #gallerythumbframe again because of overlap in width.  New height: "+newh);
				$(wrapper + ' #gallerythumbframe').height(newh);
				VIVIZ[galleryid]['fullHeight'] = newh;
				VIVIZ[galleryid]['fullWidth']  = $(wrapper + ' #gallerythumbframe img:first').width();      		        	
			} 


			dh = $(enclosure).height() - $(window).height();
			if (dh < 0) {
				console.log("gallery.settabledims(): Setting top margin for " + wrapper);
				$(wrapper).css('margin-top',-dh/2);
			}	
		} else {
			console.log("gallery.settabledims(): Full image height unknown but thumb height known.");
			var a = 4*VIVIZ[galleryid]["thumbHeight"];
			console.log("gallery.settabledims(): Setting thumb frame height to be 4*(first thumb outer height) = "+a);
			console.log("gallery.settabledims(): First thumbnail height = " + $('#gallerythumbframe img').eq(0).height());
			$(wrapper + ' #gallerythumbframe').height("" + a);
		}

		if (callback) {
			callback();
		}
	}
	
	function loadfull(jq) {

		console.log("gallery.loadfull(): Called.");

		var id = $(jq).attr('id');
		var lastvisible = parseInt($(wrapper).attr('lastvisible'));
		$(wrapper + " #fullframe img[id=" + lastvisible + "]").hide();
		
		if (id > INFOjs.length) {return;}
		
		if ($(wrapper + " #fullframe img[id="+id+"]").length == 1) {
			console.log('gallery.loadfull(): Found hidden full image in DOM.  Showing.');
			$(wrapper + " #fullframe img[id=" + id + "]").show();
			prepnext();
			setfilename(id);
			return;
		}

		// Show loading indicator
		$(wrapper + ' #workingfullframe').css('visibility','visible');

		// Place empty image element in DOM.
		$(wrapper + " #fullframe").prepend('<img id="'+id+'" class="full"/>');

		// Does not work.
		var title = $(jq).attr("title"); 
		$(wrapper + " #fullframe img[id="+id+"]").attr("title",title)
		
		$(wrapper + " #fullframe img[id="+id+"]")
				.unbind('load')
				.error(function () {
					$(wrapper + ' #workingfullframe').css('visibility','hidden');
					//$(wrapper + ' #error').html('Could not load <a href="'+$(this).attr('src')+'">'+$(this).attr('src')+'</a>')
					$(this).width(VIVIZ[galleryid]["fullWidth"]);
					$(this).height(VIVIZ[galleryid]["fullHeight"]);
				})
				.load(function(){

					console.log("gallery.loadfull(): Load event.")

					// Hide loading indicator
					$(wrapper + ' #workingfullframe').css('visibility','hidden');

					setfilename($(this).attr('id'));

					if ($(jq).hasClass('firstimage')) {
						console.log('gallery.loadfull(): First full image loaded with dimensions '+this.naturalWidth+'x'+this.naturalHeight+'.  Setting table dimensions.');


						//Enlil code
						if (VIVIZ["alternativeFrame"]) {
							$("#" + VIVIZ["alternativeFrame"] + " img").attr('src',$(wrapper + " #fullframe img[id=1]").attr('src'))
						}

						el = this;
						type = 'full';
						var ar = el.naturalWidth/el.naturalHeight;

						// Compute pixels if given fractions.
						if (VIVIZ[type+"Width"]) {
							if (VIVIZ[type+"Width"] > 1.0) {
								VIVIZ[galleryid][type+"Width"] = VIVIZ[type+"Width"];
							} else {
								VIVIZ[galleryid][type+"Width"] = el.naturalWidth*VIVIZ[type+"Width"];
							}
						}
						if (VIVIZ[type+"Height"]) {
							if (VIVIZ[type+"Height"] > 1.0) {
								VIVIZ[galleryid][type+"Height"] = VIVIZ[type+"Height"];
							} else {
								VIVIZ[galleryid][type+"Height"] = el.naturalHeight*VIVIZ[type+"Height"];
							}
						}

						// Compute un-specified width or height.
						if (VIVIZ[galleryid][type+"Width"] && !VIVIZ[galleryid][type+"Height"]) {
							VIVIZ[galleryid][type+"Height"] = VIVIZ[galleryid][type+"Width"]/ar;
						}
						if (VIVIZ[galleryid][type+"Height"] && !VIVIZ[galleryid][type+"Width"]) {
							VIVIZ[galleryid][type+"Width"] = VIVIZ[galleryid][type+"Height"]*ar;
						}

						if (!VIVIZ[galleryid][type+"Height"]) {
							VIVIZ[galleryid][type+"Height"] = el.naturalHeight;
						}
						if (!VIVIZ[galleryid][type+"Width"]) {
							VIVIZ[galleryid][type+"Width"] = el.naturalWidth;
						}

						VIVIZ[galleryid][type+"NaturalHeight"] = el.naturalHeight;
						VIVIZ[galleryid][type+"NaturalWidth"] = el.naturalWidth;

						// Set height of full image.
						$(this).css("height",VIVIZ[galleryid]["fullHeight"]);
						//$(this).css("width",VIVIZ[galleryid]["fullWidth"]);

						var enclosure = "body"
						console.log("gallery.loadfull(): Window height: "+ $(window).height());
						console.log("gallery.loadfull(): Document height: "+ $(document).height());
						console.log("gallery.loadfull(): Enclosing body height: " + $(enclosure).height());
						
						// After this function sets VIVIZ[gallerid] dimensions, then call prepnext(), which uses
						// these dimensions.
						settabledims(this, function () {prepnext()});

					} else {
						prepnext();
					}


				})
				.attr('src', INFOjs[parseInt(id-1)]["FullFile"]);

		function setfilename(id) {
			$(wrapper + " #filename").html('');
			$(wrapper + " #filename").append("<a>");
			$(wrapper + " #filename a").
			attr('href',INFOjs[parseInt(id-1)]["FullFile"]).
			text(INFOjs[parseInt(id-1)]["FullFile"]);
		}

		function prepnext() {
			
			// If next frame not in DOM, place it.
			var idn = parseInt(id) + 1;
			
			if (idn > INFOjs.length) {return;}

			if ($(wrapper + " #fullframe img[id="+idn+"]").length == 0) {
				$(wrapper + " #fullframe").prepend('<img id="'+idn+'" class="full" style="display:none"/>');
				$(wrapper + " #fullframe img[id="+idn+"]")
					.error(function () {
						$(wrapper + ' #workingfullframe').css('visibility','hidden');
						$(this).height(VIVIZ[galleryid]["fullHeight"]);
						$(this).width(VIVIZ[galleryid]["fullWidth"]);
					})
					.load (function () {
					})
					.css('height',VIVIZ[galleryid]['fullHeight'])
					.attr('src',INFOjs[idn-1]["FullFile"])
			}
		}
	}

	function loadmore() {

		var length = parseInt($('#gallerythumbframe').attr('data-thumb-length'));
		var shown = parseInt($("#gallerythumbframe > img").last().attr("id"));
		if (shown < length) {
			var maxLength = length;
			if (length > (shown+VIVIZ["lazyLoadMax"]))
				maxLength = shown+VIVIZ["lazyLoadMax"];
			
			//$(wrapper).attr('totalvisible', maxLength);
			//elem.attr('data-thumb-displayed', maxLength);
			//console.log(shown)
			var tic = new Date().getTime();
			var slowwarn = false;
			for (j=shown; j < shown+maxLength; j++) {
				//console.log("j="+j)
				if (j > INFOjs.length-1) break;
				$('<img class="gallerythumbbrowse lazyload"/>')
					.appendTo($(wrapper + ' #gallerythumbframe'))
					.attr("id",j+1)
					.attr("src", INFOjs[j].ThumbFile)
					.bind('click',setthumbbindings)
					.attr("title",imgtitle(INFOjs[j]))
					//.css("height",thumbheight)
					.css("height",$("#gallerythumbframe > img").first().height())
					.css("width",$("#gallerythumbframe > img").first().width())
					//.error(function () {$(this).remove())
					.load(function () {
						//$(wrapper).attr('totalvisible', parseInt($(wrapper).attr('totalvisible'))+1);
						if ((slowwarn == false) && (new Date().getTime() - tic > 3000)) {
							warning(wrapper,"Slow-loading gallery.  See <a href='http://viviz.org/#Performace'>performace tips</a> for improving performance.",true);
							slowwarn = true;	
							setTimeout(function () {$('#connectionerror').html('')},5000);
						}

						// The following will sometimes hide spinner before thumbnails are rendered on screen, because load
						// is triggered when image has been downloaded and before it is rendered.  This is the reason
						// for the 2*Nthumb ms delay (a guess).
						////console.log('Thumb '+parseInt($(this).attr('id'))+' loaded.');
														
					});
			}
		}
	}
	
	function setthumbbindings() {

		// Actions to take when a thumbnail is clicked.
		
		console.log("gallery.setthumbbindings(): Called.")

		var nowvisible  = parseInt($(wrapper).attr('nowvisible'));
		if (isNaN(nowvisible)) {
			nowvisible = 1;
			$(wrapper).attr('nowvisible', '1');
		} else {
			nowvisible = $(this).attr('id');
			//console.log('Setting nowvisible to ' + nowvisible);
			$(wrapper).attr('nowvisible', nowvisible);
		}
		var lastvisible = parseInt($(wrapper).attr('lastvisible'));
		if (isNaN(lastvisible)) {
			lastvisible = 1;
			$(wrapper).attr('lastvisible', '1');
		}
		
		$(wrapper + " #gallerythumbframe #" + lastvisible).removeClass('active').addClass('inactive');

		$(wrapper + " #gallerythumbframe #" + nowvisible).removeClass('inactive').addClass('active');
		
		// TODO: Duplicate calls can be avoided by giving each stat string an id and then showing hidden
		// 		 stat string if it already exists in DOM.
		INFOjs = thumblist(wrapper); 

		var statstr = "Attributes for #" + (nowvisible) + "/" + (INFOjs.length) + " in subset: ";
		statstr = statstr + " | Image #" + (1+INFOjs[nowvisible-1].ImageNumber) + "/" + $(wrapper).attr('totalingallery') + " in gallery | ";
		
		for (var z = 1;z < GALLERYINFO['attributes']["Values"].length;z++) {
			statstr = statstr + GALLERYINFO['attributes']["Values"][z].Title + " = ";
			if (GALLERYINFO['attributes']["Values"][z].Format) {
				statstr = statstr + sprintf(GALLERYINFO['attributes']["Values"][z].Format,parseFloat(INFOjs[nowvisible-1][GALLERYINFO['attributes']["Values"][z].Value]));
			} else {
				statstr = statstr + INFOjs[nowvisible-1][GALLERYINFO['attributes']["Values"][z].Value];            		
			}
			if (GALLERYINFO['attributes']["Values"][z].Unit) {
				statstr = statstr + " [" + GALLERYINFO['attributes']["Values"][z].Unit + "] " +  " | ";
			} else {
				statstr = statstr + " | ";
			}
		}

		$(wrapper + ' #stats').html(statstr);

		// Load full image.
		loadfull(this); 
		
		$(wrapper).attr("lastvisible",nowvisible);

		// Scroll thumbnail list
		$(wrapper + " #gallerythumbframe").scrollTo(this, 0, {
		   duration: 80, offset: 0
		});
	}

	function imgtitle(obj) {
		//http://stackoverflow.com/questions/5612787/converting-javascript-object-to-string
		var str = '';
		var k = 0;
		for (var p in obj) {
			if (obj.hasOwnProperty(p)) {
				if (isNaN(parseInt(p)))
					str += p + ':' + obj[p] + '\n';
				}
				k = k+1;
			}
			return str;
	}
	
	function setcontrolbindings() {
		
		// Show/Hide thumb button
		$(wrapper + " #showhidethumb").unbind();
		$(wrapper + " #showhidethumb").toggle(function(){
				$(wrapper + " #gallerythumbframe").hide();
				//$(wrapper + " #gallerythumbframe").css('visibility','hidden');
				//$(wrapper + " #gallerythumbframe").css('width','0px');
				setcontrolbindings.marginleft = $("#fullframe").css('margin-left');
				$("#fullframe").css('margin-left','0');
				$(wrapper + ' #showhidethumb').text('+');
			}, function(){
				console.log("gallery.setcontrolbindings: Showing gallerythumbframe.");
				$(wrapper + " #gallerythumbframe").css('visibility','visible')
				$(wrapper + " #gallerythumbframe").show();
				console.log("gallery.setcontrolbindings: Setting margin-left to " + setcontrolbindings.marginleft);
				$("#fullframe").css('margin-left',setcontrolbindings.marginleft)
				$(wrapper + ' #showhidethumb').text('x');
		});

		if (!VIVIZ["showThumbstrip"]) {$("#showhidethumb").click();}
		
		// Time step buttons
		$(wrapper + " #next").unbind('click');
		$(wrapper + ' #next').click(function(){
			lastvisible = parseInt($(wrapper).attr('lastvisible'));
			if (lastvisible == parseInt($(wrapper).attr('totalvisible'))) {				
				nowvisible = parseInt($(wrapper + " #gallerythumbframe img.firstimage").attr('id'));
			} else {
				nowvisible = lastvisible + 1;        	
			}
			console.log("gallery.setcontrolbindings: Next button clicked.  Clicking on thumbnail "+nowvisible)
			$(wrapper + " #gallerythumbframe #" + nowvisible).click();

			//Enlil code
			if (VIVIZ["alternativeFrame"]) {
				$("#" + VIVIZ["alternativeFrame"] + " img").attr('src',$(wrapper + " #fullframe img[id="+nowvisible+"]").attr('src'));
			}

			var length = parseInt($('#gallerythumbframe').attr('data-thumb-length'));
			var shown = parseInt($("#gallerythumbframe > img").last().attr("id"));
			var f = Math.ceil(nowvisible/VIVIZ["lazyLoadMax"]) - nowvisible/VIVIZ["lazyLoadMax"];
			if (f < 0.5) loadmore();
		});
		
		$(wrapper + " #previous").unbind('click');
		$(wrapper + ' #previous').click(function(){
			lastvisible = parseInt($(wrapper).attr('lastvisible'));
			if (lastvisible == 1) {
				nowvisible = parseInt($(wrapper).attr('totalvisible'));
			} else {
				nowvisible = lastvisible - 1;
			}
			$(wrapper + " #" + nowvisible).click();

			//Enlil code
			if (VIVIZ["alternativeFrame"]) {
				("#" + VIVIZ["alternativeFrame"] + " img").attr('src',$(wrapper + " #fullframe img[id="+nowvisible+"]").attr('src'))
			}

		});
		
		$(wrapper + " #last").unbind('click');
		$(wrapper + ' #last').click(function(){
			nowvisible = parseInt($(wrapper + " #gallerythumbframe > img").last().attr("id"));
			$(wrapper + " #" + nowvisible).click();
		});

		$(wrapper + " #first").unbind('click');    
		$(wrapper + ' #first').click(function(){
			nowvisible = parseInt($(wrapper + " #gallerythumbframe > img").first().attr("id"));
			$(wrapper + " #" + nowvisible).click();
		});  
	}
	
	function setdropdowns() {

		$(wrapper + " #dropdownswrapper").empty();
		dropdown("gallery", GALLERIES, wrapper + " #dropdownswrapper");
		$(wrapper + " #gallery option[value='" + galleryid + "']").attr('selected','selected');
		
		$(wrapper + ' #dropdownswrapper #gallery').unbind('change');
		$(wrapper + ' #dropdownswrapper #gallery').change(function (){
			console.log('gallery.js: Gallery changed.  galleryid = ' + galleryid);
			var galleryid = $(wrapper + " #gallery option:selected").val();
			$(wrapper + " #error").html("");
			console.log("gallery.js: Setting hash.")
			location.hash = "/" + galleryid;
		});

		// Does not work anymore with lazy load.
		dropdown("order", GALLERYINFO['orders'], wrapper + " #dropdownswrapper");

		//console.log(GALLERYINFO);
		//dropdown("output", GALLERYINFO['outputs'], wrapper + " #dropdowns");
		

		$(wrapper + ' #dropdownswrapper #order').change(function(){
			setthumbs();
		});
		$(wrapper + ' #dropdowns #download').change(function(){
			console.log("---- Download option not implemented.");
			// TODO: If imgconvert link works and VIVIZ["showDownloads"] is true, show this.
			// If imgconvert link does not work, make download drop-down text red and change tool tip to indicate problem.
		});

		if (GALLERYINFO['attributes']["Values"].length > 0) {
			dropdown("sortby", GALLERYINFO['attributes'], wrapper + " #dropdownswrapper");
			$(wrapper + ' #dropdownswrapper #sortby').change(function(){
				setregexps();
				setthumbs();
			});
			setregexps();	
		} else {
			console.log("gallery.setdropdowns(): No sort attributes.  Not displaying drop-downs for attributes.")
		}

		return true;

		function setregexps() {
			var REGEXPS            = new Object();			
			var n                  = $(wrapper + " #dropdownswrapper #sortby option:selected").val();
			REGEXPS["Title"]       = "View only images with an attribute that matches the selected constraint."
			REGEXPS["Titleshort"]  = "-Constraints-"
			REGEXPS["Values"]      = new Array();
			////console.log(GALLERYINFO['attributes'])
			for (i = 0; i < GALLERYINFO['attributes']["Values"][n]["Filters"].length; i++) {
				REGEXPS["Values"][i]          = new Object();
				REGEXPS["Values"][i]["Title"] = GALLERYINFO['attributes']["Values"][n]["Filters"][i]["Title"];
				REGEXPS["Values"][i]["Value"] = GALLERYINFO['attributes']["Values"][n]["Filters"][i]["Value"];
			}

			if (GALLERYINFO['attributes']["Values"][n]["Filters"].length > 1) {
				dropdown("regexp",REGEXPS,wrapper + " #dropdownswrapper");
			} else {
				console.log("gallery.setdropdowns(): No regexp filters.  Not displaying drop-down.")
				//$("#thumb1 #dropdownswrapper #regexp").remove();				
			}

			$(wrapper + ' #dropdownswrapper #regexp').change(function(){
				$(wrapper + " #fullframe").empty();
				setthumbs();
			})
		}
	}

}
function attributemap(URL,keycolumn,delimiter,skip) {

	if (arguments.length < 4)
		var skip = 0;
	if (arguments.length < 3)
		var delimiter = " ";
	if (arguments.length < 2)
		var keycolumn = -1;
	
	if (keycolumn == -1) {
		//console.log('attributemap.js: No key specified.  Using row number as key.');
	}
	//console.log('attributemap.js: Delimiter is "' + delimiter + '"');

	var lines;
	$.ajax({
			type: "GET",
			url: URL,
			async: false,
			dataType: "text",
			error: function () {
						//console.log("attributemap.js: Error reading " + URL)
					},
			success: function (data) {
						//console.log('attributemap.js: Extracting files from ' + URL);
						lines = data.split(/\n/);
					}
		});

	//console.log(lines);
	MAP = new Object();
	var splitlines;
	for (j = skip; j < lines.length; j++) {
		splitlines = lines[j].split(delimiter);
		if (keycolumn > 0) {
			MAP[splitlines[keycolumn-1]] = splitlines;
			if (j == skip) {
				//console.log('attributemap.js: First line is ' + lines[j]);
				//console.log('attributemap.js: First key is ' + splitlines[keycolumn-1]);
			}
			if (j == lines.length - 1) {
				//console.log('attributemap.js: Last line is ' + lines[j]);
				//console.log('attributemap.js: Last key is ' + splitlines[keycolumn-1]);
			}
		} else {
			MAP[j+1] = splitlines;
			if (j == skip) {
				//console.log('attributemap.js: First line is ' + lines[j]);
				//console.log('attributemap.js: First key is ' + (j+1));
			}
			if (j == lines.length - 1) {
				//console.log('attributemap.js: Last line is ' + lines[j]);
				//console.log('attributemap.js: Last key is ' + (j+1));
			}
		}
	}
	//console.log('attributemap.js: Attributes extracted from ' + URL + ":");
	//console.log(MAP);
	
	return MAP;
}function reporterror(URL) {
	$('#connectionerror').html('');
	if (location.protocol.match("file")) {
		error("galleryinfo.js: Error reading " + URL + ".<br>When the URL in the browser address bar starts with <b>file:/</b>, special configuration is needed.  See http://viviz.org/");
	} else {
		error("galleryinfo.js: Error reading " + URL + ".<br>The domain name of this URL must match the domain name in your address bar " + window.location.host);
	}		
}

function extractorders() {
	var ORDERS = {
		    "Title": "Sort order",
		    "Titleshort": "-Sort order-",
		    "Class": "updatelocal",
		    "Values": [{"Title": "No sort", "Value": "none"},
						{"Title": "Ascending", "Value": "ascending"},
		               	{"Title": "Descending","Value": "descending"},
		               	{"Title": "Random","Value": "random"}]
	}
	return ORDERS;
}

function extractattributes(galleryid) {

	ATTRIBUTES = new Object();
	
	ATTRIBUTES["Title"]      = "Sort attributes";
	ATTRIBUTES["Titleshort"] = "-Sort by-";
	ATTRIBUTES["Class"]      = "updatelocal";

	ATTRIBUTES["Values"]             = new Array();
	ATTRIBUTES["Values"][0]          = new Object();
	ATTRIBUTES["Values"][0]["Title"] = "Filename";
	ATTRIBUTES["Values"][0]["Value"] = "0";

	ATTRIBUTES["Values"][0]["Filters"]    = new Array();
	ATTRIBUTES["Values"][0]["Filters"][0] = new Object();
	ATTRIBUTES["Values"][0]["Filters"][0]["Title"] = "All";
	ATTRIBUTES["Values"][0]["Filters"][0]["Value"] = ".*";

	xml = cataloginfo.xml;

	var j = 0;
	$(xml).find("catalog gallery[id='" + galleryid + "'] attributes attribute").each(
			function (i) {
					ATTRIBUTES["Values"][i] = new Object();
					ATTRIBUTES["Values"][i]["Title"] = $(this).find('name').text();
					ATTRIBUTES["Values"][i]["Value"] = i;
					ATTRIBUTES["Values"][i]["Filters"] = new Array();
					j = j+1;
					$(this).find('filters filter').each(
							function(j) {
								ATTRIBUTES["Values"][i]["Filters"][j] = new Object();
								ATTRIBUTES["Values"][i]["Filters"][j]["Title"] = $(this).find('title').text();
								ATTRIBUTES["Values"][i]["Filters"][j]["Value"] = $(this).find('value').text();
								//console.log($(this).text());
							})
	});


	for (i = 0;i<cataloginfo.json.length;i++) {
		if (cataloginfo.json[i]["id"] === galleryid) break;
	}

	if (i < cataloginfo.json.length) {
	if (typeof(cataloginfo.json[i]["attributes"]) !== "undefined") {
		cataloginfo.json[i]["attributes"].forEach(
				function (el,i) {
					ATTRIBUTES["Values"][i] = new Object();
					ATTRIBUTES["Values"][i]["Title"] = el.name;
					ATTRIBUTES["Values"][i]["Value"] = i;
					ATTRIBUTES["Values"][i]["Filters"] = new Array();
	
					el.filters.forEach(
							function (el,j) {
								ATTRIBUTES["Values"][i]["Filters"][j] = new Object();
								ATTRIBUTES["Values"][i]["Filters"][j]["Title"] = el.title;
								ATTRIBUTES["Values"][i]["Filters"][j]["Value"] = el.value;
							});
	
					
				});
	}
	}
	//console.log(ATTRIBUTES)
	if (ATTRIBUTES["Values"].length > 1) {
		//console.log("galleryinfo.js: Attributes found in " + URLCommon);
		//console.log(ATTRIBUTES);
	} else {
		//console.log("galleryinfo.js: No attributes found in " + URLCommon);
	}

	return ATTRIBUTES;
}

function extractfiles(URLFiles) {
	
	//extractfiles.cache = {};
	//if (extractfiles.cache[URLFiles])
	//	return extractfiles.cache[URLFiles];
		
	var FILES = new Array();
	//var Proxy = "proxy.php?url=";
	var Proxy = "";
	URLFiles = Proxy + URLFiles;
	$("#status").text("Retrieving list of files");
	console.log("galleryinfo.extractfiles(): Getting file list from " + URLFiles)
	if (URLFiles.match(/\.txt$/)) {
		$.ajax({
			type: "GET",
			url: URLFiles,
			async: false,
			dataType: "text",
			error: function () {error("catalog.js: Error reading " + URLFiles,true)},
			success: function (data) {
						//console.log('galleryinfo.js: Extracting files from ' + URLFiles);
						FILES = CSVToArray(data.replace(/\n$/,''));
						//FILES = data.split(/\n/); Use this instead.
					}
		});
		$("#status").text("");
	} else if (URLFiles.match(/\.xml$/)) {
		$.ajax({
			type: "GET",
			url: URLFiles,
			async: false,
			dataType: "xml",
			error: function (xhr, textStatus, errorThrown) {
						error("catalog.js: Error reading " + URLFiles,true);
						//console.log(textStatus);
					},
			success: function (xml) {
				
						console.log('galleryinfo.js: Extracting files from ' + URLFiles);
						if ($(xml).find("gallery images data").length > 0) {
							eval("FILES = " + $(xml).find("gallery images data").text());
							console.log("galleryinfo.extractfiles(): Found " + FILES.length + " files in " + URLFiles);
						}
						if ($(xml).find("gallery images script").length > 0) {
							//eval($(xml).find("gallery images script").text());
							////console.log(files);
						}
						return FILES;
					}
		});
	} else {

		// A service request that returns a JSON array of files.
		$.ajax({
			type: "GET",
			url: URLFiles,
			async: false,
			dataType: "json",
			error: function () {error("galleryinfo.js: Error reading " + URLFiles,true)},
			success: function (data) {
						console.log('galleryinfo.js: Extracting files from ' + URLFiles);
						
						if (typeof(data[0]) === "string") {
							for (var k=0;k<data.length;k++) {
								FILES[k] = [];
								FILES[k][0] = data[k];
							}
						} else {
							FILES = data;
						}
						
					}
		});
	}

	$("#status").text("");
	//extractfiles.cache[URLFiles] = FILES;
	return FILES;

}

function menulist(StartYear,StopYear,TEMPLATE_YEAR) {

	// menulist(FILES,TEMPLATE)
	if (arguments.length == 2) {

		TEMPLATEp = TEMPLATE.replace('%Y','([0-9][0-9][0-9][0-9])');
		TEMPLATEp = TEMPLATEp.replace('%m','([0-9][0-9])');
		TEMPLATEp = TEMPLATEp.replace('%d','([0-9][0-9])');

		var patt = new RegExp(TEMPLATEp);
		StartYear  = files[0][3].replace(patt,'$1');
		//StartMonth = files[0][3].replace(patt,'$2');
		//StartDay   = files[0][3].replace(patt,'$3');
		StopYear   = files[files.length-1][3].replace(patt,'$1');
		//StopMonth  = files[1][3].replace(patt,'$2');
		//StopDay    = files[1][3].replace(patt,'$3');

		TEMPLATEp = TEMPLATE.replace('%Y','[0-9][0-9][0-9][0-9]');
		TEMPLATEp = TEMPLATEp.replace(/\./gi,'');
		TEMPLATEp = TEMPLATEp.replace(/%[a-z]/gi,'.*');
		
		//console.log("menulist.js: No start/stop year given.  Computing from template " + TEMPLATEp);
		//console.log("menulist.js: StartYear = " + StartYear + ", EndYear = " + StopYear);	
		//console.log("menulist.js: Pattern to match for year = " + TEMPLATEp);

		return menulist(StartYear,StopYear,TEMPLATEp);			
	}

	StartYear = parseInt(StartYear.substring(0,4));
	StopYear  = parseInt(StopYear.substring(0,4));

	FILTERS = new Array();
	for (var j=0;j<(StopYear-StartYear+1);j++) {
		var patt = new RegExp(TEMPLATE_YEAR);
		year = ""+(j+StartYear);
		var PATTERN_YEAR = TEMPLATE_YEAR.replace(TEMPLATE_YEAR,year);
		FILTERS[j] = {"Title":year,"Value":PATTERN_YEAR};
	}

	return FILTERS;
}

function isimage(href) {
	if (href.match(/\.png$/)) {
		return true;
	} else {
		//console.log("galleryinfo.js: isimage: Rejected " + href);
		return false;
	}
}

function galleryinfo(galleryid) {

	if (typeof(galleryinfo.GALLERYINFO) != 'object') {
		galleryinfo.GALLERYINFO = new Object();
	}
	
	if (galleryinfo.GALLERYINFO[galleryid]) {
		//console.log('galleryinfo: Using cached gallery information for ' + galleryid);
		return galleryinfo.GALLERYINFO[galleryid]
	}

	_GALLERYINFO = new Object();
	var fullfiles = [];
	var thumbfiles = [];

	var CATALOGINFO = cataloginfo(galleryid);

	if (CATALOGINFO["fulllistscript"]) {
		fullfiles = eval(CATALOGINFO["fulllistscript"])(); 
	}

	if (CATALOGINFO["thumblistscript"]) {
		thumbfiles = eval(CATALOGINFO["thumblistscript"])(); 
	}

	if (CATALOGINFO["fullfilelist"]) {
		fullfiles  = extractfiles(CATALOGINFO["fullfilelist"]);
	}		

	if (CATALOGINFO["thumbfilelist"]) {
		thumbfiles  = extractfiles(CATALOGINFO["thumbfilelist"]);
	}

	if (CATALOGINFO["fullfiles"]) {
		eval('fullfiles = ' + CATALOGINFO["fullfiles"])
	}

	if (CATALOGINFO["thumbfiles"]) {
		eval('thumbfiles = ' + CATALOGINFO["thumbfiles"])
	}
	
	if (CATALOGINFO["strftime"]) {
		_GALLERYINFO["strftime"]      = CATALOGINFO["strftime"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["strftimestart"] = CATALOGINFO["strftimestart"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["strftimestop"]  = CATALOGINFO["strftimestop"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		
		// Create regexps based on time information
		_GALLERYINFO["autoattributes"]  = menulist(CATALOGINFO["strftimestart"],CATALOGINFO["strftimestop"],CATALOGINFO["strftime"]);

		var options = {};
		options.template = _GALLERYINFO["strftime"];
		options.timeRange = _GALLERYINFO["strftimestart"] + "/" + _GALLERYINFO["strftimestop"];
		options.debug = true;
		options.type = "strftime";
		console.log(options)
		var fullfiles = [];
		var xfiles = expandtemplate(options);
		console.log(xfiles);

		for (var i =0;i<xfiles.length;i++) {
			fullfiles[i] = [xfiles[i]];
		}
		//console.log(fullfiles)
		if (false) {
			// Generate list of files based on template, start, and stop.
			// TODO: Generalize to handle hours, minutes, seconds.
			
			if (CATALOGINFO["strftimestart"].match(/^[0-9]{4}-[0-9]{3}$/)) {
				// YYYY-DOY
				var START_year = CATALOGINFO["strftimestart"].substr(0,4);
				var START_day  = CATALOGINFO["strftimestart"].substr(5,3);
				var START_date = new Date(Date.parse(START_year+"-01-01").add({days:parseInt(START_day)-1}).toString('yyyy-MM-dd'));
				var START_ms   = new Date(Date.parse(START_year+"-01-01").add({days:parseInt(START_day)-1}));
			} else {
				var START_ms   = new Date(Date.parse(CATALOGINFO["strftimestart"]));
				var START_date = new Date(Date.parse(CATALOGINFO["strftimestart"]));
				var STOP_date = new Date(Date.parse(CATALOGINFO["strftimestop"]));
				//console.log(START_ms)
			}
				
			if (CATALOGINFO["strftimestop"].match(/^[0-9]{4}-[0-9]{3}$/)) {
				// YYY-DOY
				var STOP_year = CATALOGINFO["strftimestop"].substr(0,4);
				var STOP_day  = CATALOGINFO["strftimestop"].substr(5,3);
				var STOP_ms   = new Date(Date.parse(STOP_year+"-01-01").add({days:parseInt(STOP_day)-1}));
			} else {
				var STOP_ms    = new Date(Date.parse(CATALOGINFO["strftimestop"]));
			}

			if (CATALOGINFO["strftimestop"].match(/^[0-9]{4}-[0-9]{3}$/) || CATALOGINFO["strftimestop"].match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)) {
				var Ndays = 1 + Math.round((STOP_ms.valueOf()-START_ms.valueOf())/(1000*24*60*60));
			}

			// YYYY-MM
			var incr = false;
			if (CATALOGINFO["strftimestop"].match(/^[0-9]{4}-[0-9]{2}$/)) {
				incr = {months:1};			
			}
			if (CATALOGINFO["strftimestop"].match(/^[0-9]{4}$/)) {
				incr = {years:1};			
			}
			//console.log("Number of days: " + Ndays)
			fullfiles = new Array();
			var tic = new Date().getTime();
			var i = 0;
			// Remove time zone 
			//console.log(CATALOGINFO["StrftimeStart"]);
			//console.log("--")
			//console.log(START_date);
			//START_date = new Date(new Date(START_date).toUTCString().substr(0, 25));
			//console.log(Date.compare(START_date,STOP_date));
			//console.log(incr);
			if (incr) {
				while (Date.compare(START_date,STOP_date) <= 0) {
					fname = START_date.strftime(CATALOGINFO["strftime"]);
					//console.log(Date.compare(START_date,STOP_date));
					//console.log(fname);
					fullfiles[i] = [fname];
					START_date.add(incr);
					i = i+1;		
				}
			} else {	
				// Faster to not use Date.compare().
				while (i < Ndays) {
					fname = START_date.strftime(CATALOGINFO["strftime"]);
					//console.log(Date.compare(START_date,STOP_date));
					//console.log(fname);
					fullfiles[i] = [fname];
					START_date.addDays(1);
					i = i + 1;
				}
			}
			var elapsed = new Date().getTime() - tic;
		}
		console.log(fullfiles)
	} 

	if (CATALOGINFO["sprintf"]) {
		_GALLERYINFO["sprintfstart"] = CATALOGINFO["sprintfstart"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["sprintfstop"]  = CATALOGINFO["sprintfstop"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');
		_GALLERYINFO["sprintf"]      = CATALOGINFO["sprintf"].replace(/\n/,'').replace(/^\s+|\s+$/g,'');

		_GALLERYINFO["sprintfdelta"] = parseInt(CATALOGINFO["sprintfdelta"].replace(/\n/,'').replace(/^\s+|\s+$/g,''));
		
		if (isNaN(_GALLERYINFO["sprintfdelta"])) {
			_GALLERYINFO["sprintfdelta"] = 1;
			console.log("galleryinfo.js: sprintfdelta is not defined or is NaN.  Using value of 1.")
		}
		var fullfiles = new Array();
		io = parseInt(_GALLERYINFO["sprintfstart"]);
		i = io;
		z = io;
		while (i < parseInt(_GALLERYINFO["sprintfstop"]) + 1) {			
			var tmps = _GALLERYINFO["sprintf"];
			fullfiles[z-io] = [sprintf(tmps,i)];
			z = z+1;
			i = i + _GALLERYINFO["sprintfdelta"];
		}
	}
	    
	if (CATALOGINFO["fulldir"]) {
		_GALLERYINFO["fulldir"] = CATALOGINFO["fulldir"];
		if (VIVIZ["useCachedImages"]) {
			_GALLERYINFO["fulldir"] = "http://imgconvert.org/convert.cgi?in="+_GALLERYINFO["fulldir"];
		}
		_GALLERYINFO["fullfiles"] = [];
		for (var j = 0;j < fullfiles.length;j++) {
			_GALLERYINFO["fullfiles"][j] = [];
			if (!fullfiles[0][0].match(/^http|^ftp|^file/)) {
				_GALLERYINFO["fullfiles"][j][0] = _GALLERYINFO["fulldir"] + fullfiles[j][0];
			} else {
				_GALLERYINFO["fullfiles"][j][0] = fullfiles[j][0];
			}
			for (var i = 1;i<fullfiles[j].length;i++) {
				_GALLERYINFO["fullfiles"][j][i] = fullfiles[j][i];
			}
		}
	} else {
		_GALLERYINFO["fulldir"] = "";			
	}

	if (thumbfiles.length == 0) {
		thumbfiles = fullfiles;
	}
	if (CATALOGINFO["thumbdir"]) {
		_GALLERYINFO["thumbdir"] = CATALOGINFO["thumbdir"];
		if (VIVIZ["useCachedImages"]) {
			_GALLERYINFO["thumbdir"] = "http://imgconvert.org/convert.cgi?in="+_GALLERYINFO["thumbdir"];
		}
		_GALLERYINFO["thumbfiles"] = [];
		for (var j = 0;j < thumbfiles.length;j++) {
			_GALLERYINFO["thumbfiles"][j] = [];
			if (!thumbfiles[0][0].match(/^http|^ftp|^file/)) {
				_GALLERYINFO["thumbfiles"][j][0] = _GALLERYINFO["thumbdir"] + thumbfiles[j][0];
			} else {
				_GALLERYINFO["thumbfiles"][j][0] = thumbfiles[j][0];
			}
			for (var i = 1;i<thumbfiles[j].length;i++) {
				_GALLERYINFO["thumbfiles"][j][i] = thumbfiles[j][i];
			}
		}
	} else {
		_GALLERYINFO["thumbdir"] = "";			
	}

	_GALLERYINFO["totalingallery"] = _GALLERYINFO["fullfiles"].length;	
	_GALLERYINFO["orders"]         = extractorders();
	_GALLERYINFO["attributes"]     = extractattributes(galleryid);
	//_GALLERYINFO["outputs"]		   = extractoutputs();
	
	//console.log(extractattributes(galleryid));

	if (_GALLERYINFO["autoattributes"]) {		
		if (VIVIZ["useAutoAttributes"]) {
			// When useAutoAttributes is true, ignore attributes specified in file.
			_GALLERYINFO["attributes"]["Values"][0]["Filters"] = _GALLERYINFO["autoattributes"];

			// Add an All attribute at the end.
			var na = _GALLERYINFO["autoattributes"].length;
			_GALLERYINFO["attributes"]["Values"][0]["Filters"][na] = {};
			_GALLERYINFO["attributes"]["Values"][0]["Filters"][na].Title = "All";
			_GALLERYINFO["attributes"]["Values"][0]["Filters"][na].Value = ".*";	

			// TODO: Add options useAutoAttributesOnly (current meaning of useAutoAttributes) 
			// and useAutoAttributesAlso (Append auto attributes to existing)?	
		}
	}

	galleryinfo.GALLERYINFO[galleryid] = _GALLERYINFO;
	
	console.log("galleryinfo.js: _GALLERYINFO = ");
	console.log(_GALLERYINFO);

	return _GALLERYINFO;

		
}
function cataloginfo(galleryid) {

	function setsource(v,source) {
		for (i = 0;i<v.length;i++) {
			v[i]["source"] = source;
		}
		return v
	}
	
	if (typeof(cataloginfo.json) != 'object') {
		console.log("cataloginfo.js: No client-side cache of catalog information.");
		cataloginfo.json = new Object();
		if (typeof(catalogjsonuploads) !== "undefined" && typeof(catalogjsonbase) !== "undefined") {
			console.log("cataloginfo.js: Variables catalogjsonbase and catalogjsonuploads both are defined.  Using both.");
			catalogjsonuploads = setsource(catalogjsonuploads,"uploads");
			catalogjsonbase    = setsource(catalogjsonbase,"xml/catalog.json");
			cataloginfo.json   = catalogjsonbase.concat(catalogjsonuploads);
		} else if (typeof(catalogjsonuploads) === "undefined" && typeof(catalogjsonbase) !== "undefined") {
			console.log("cataloginfo.js: Variable catalogjsonbase is defined.");
			catalogjsonbase    = setsource(catalogjsonbase,"xml/catalog.json");
			cataloginfo.json   = catalogjsonbase;
		} else if (typeof(catalogjsonuploads) !== "undefined" && typeof(catalogjsonbase) === "undefined") {
			console.log("cataloginfo.js: Variable catalogjsonuploads is defined.");
			catalogjsonuploads = setsource(catalogjsonuploads,"uploads");
			cataloginfo.json   = catalogjsonuploads;
		} else {
			console.log("cataloginfo.js: Variables catalogjsonbase and catalogjsonuploads both are not defined.");
		}
	}

	// Read XML catalog file.
	if (typeof(cataloginfo.xml) != 'object') {
		console.log("cataloginfo.js: No cached cataloginfo.xml");
		cataloginfo.xml = new Object();
		cataloginfo.jqXHR = new Object();

		var text = $("#xml").text();
		if (text.match("catalog")) { 
			console.log("cataloginfo.js: Found xml catalog node in index.html. Using it and ignoring xml/catalog.xml.")
			var text2 = $((new DOMParser).parseFromString(text, "text/xml"));
			cataloginfo.xml = text2;
			cataloginfo.jqXHR.responseText = $("#xml").text();
			return cataloginfo();
		} else {
			console.log("cataloginfo.js: Did not find xml catalog information in index.html.")
		}

		if (typeof(VIVIZ.CATALOGXML) === "undefined") {
			VIVIZ.CATALOGXML = "xml/catalog.xml";
			console.log("cataloginfo.js: Variable VIVIZ.CATALOGXML is not defined.  Using xml/catalog.xml.")
		}

		$.ajax({
			type: "GET",
			url: VIVIZ.CATALOGXML,
			async: false,
			dataType: "xml",
			success: function (data,textStatus, jqXHR) {
				cataloginfo.jqXHR = jqXHR;
				cataloginfo.xml = data;
				console.log("cataloginfo.js: Finished reading " + VIVIZ.CATALOGXML)
			},
			error: function (xhr, textStatus, errorThrown) {
				console.log("cataloginfo.js: Could not read " + VIVIZ.CATALOGXML + " " + errorThrown.message.split(":")[0])
			}
		});
	}

	// If no arguments, return list of galleries.
	if (arguments.length == 0) {

		if (typeof(cataloginfo.GALLERIES) != 'object') {
			cataloginfo.GALLERIES = new Object();
		} else {
			console.log('cataloginfo.js: Using cached gallery list');
			return cataloginfo.GALLERIES;
		}

		var GALLERIES           = new Object();
		GALLERIES["Title"]      = "Galleries";
		GALLERIES["Titleshort"] = "-Galleries-";
		GALLERIES["Class"]      = "updatelglobal";
		GALLERIES["Values"]     = new Array();
		
		var j = 0;
		var cat = [];
		
		if (cataloginfo.xml) {
			$(cataloginfo.xml).find("catalog > gallery").each(
					function (i) {
						GALLERIES["Values"][i]          = new Object();
						GALLERIES["Values"][i]["Title"] = $(this).children("title").text();
						GALLERIES["Values"][i]["Value"] = $(this).attr("id");
						GALLERIES["Values"][i]["Id"]    = $(this).attr('id');
						j = j+1;
					});
		}
		if (cataloginfo.json.length > 0) {
			cataloginfo.json.forEach(
					function (el,i) {
						GALLERIES["Values"][i+j]          = new Object();
						GALLERIES["Values"][i+j]["Title"] = el.title;
						GALLERIES["Values"][i+j]["Value"] = el.id;
						GALLERIES["Values"][i+j]["Id"]    = el.id;					
					});
		}		

		cataloginfo.GALLERIES = GALLERIES;
		
		// Use to write catalog.xml as JSON (without attributes node).
		if (0) {
			for (i = 0;i < GALLERIES["Values"].length;i++) {
				//console.log(GALLERIES["Values"][i]["Id"])
				//$("#cat").append(GALLERIES["Values"][i]["Id"] + "\n")
				$("#cat").append(JSON.stringify(cataloginfo(GALLERIES["Values"][i]["Id"])) + ",\n")
			}
			$("#cat").show();
		}
		
		if (GALLERIES.Values.length == 0) {
			$("#connectionerror").html("Problem reading gallery information.  See below for errors.");
			console.log("cataloginfo.js: Problem reading gallery information.");
			$("body").append("<a href='"+VIVIZ.CATALOGXML+"'>"+VIVIZ.CATALOGXML+"</a>").append("<iframe width='100%' src='"+VIVIZ.CATALOGXML+"'/>")
			return "";
		}
		console.log("cataloginfo.js: Returning list of "+GALLERIES.Values.length+" galleries.");

		return GALLERIES;
	}

	// If catalog id given, return gallery information.
	if (arguments.length == 1) {

		if (typeof(cataloginfo.CATALOGINFO) != 'object') {
			cataloginfo.CATALOGINFO = new Object();
		}

		if (cataloginfo.CATALOGINFO[galleryid]) {
			//console.log('cataloginfo: Using cached catalog information for ' + galleryid);
			return cataloginfo.CATALOGINFO[galleryid]
		}

		var _CATALOGINFO = new Object();
		
		if ( galleryid.match(/^ftp\:\//) || galleryid.match(/^http\:\//) || galleryid.match(/^https\:\//) || galleryid.match(/^file\:\//) ) {
			// Auto-generate catalog information from URL
			
			console.log(galleryid)
			console.log('cataloginfo.js: URL-based galleryid found URL.  Parsing query parameters to create catalog information.')

			_CATALOGINFO["source"] = "URL";

			if (galleryid.match("&")) {
				var querystr = galleryid;
				var queryarr = querystr.split("&");
				if (!queryarr[0].match("=")) {  // First argument is assumed to be fulldir
					queryarr[0] = "fulldir=" + queryarr[0];
				}  
				for (i = 0; i < queryarr.length; i++) {
					var paramarr = queryarr[i].split('=');
					var key = paramarr[0].charAt(0).toUpperCase() + paramarr[0].slice(1);
					_CATALOGINFO[key] = paramarr[1];
				}
				if (_CATALOGINFO["fulldir"])					
					galleryid = _CATALOGINFO["fulldir"];
			}

			if (_CATALOGINFO["strftime"])
				_CATALOGINFO["strftime"] = _CATALOGINFO["strftime"].replace(/\$/g,"%");
			if (_CATALOGINFO["sprintf"])
				_CATALOGINFO["sprintf"] = _CATALOGINFO["sprintf"].replace(/\$/g,"%");
		
			if (_CATALOGINFO["strftime"] && _CATALOGINFO["stop"]) {
				_CATALOGINFO["strftimestop"] = _CATALOGINFO["stop"];
			}
			if (_CATALOGINFO["strftime"] && _CATALOGINFO["start"]) {
				_CATALOGINFO["strftimestart"] = _CATALOGINFO["start"];
			}
			if (_CATALOGINFO["sprintf"] && _CATALOGINFO["stop"]) {
				_CATALOGINFO["sprintfStop"] = _CATALOGINFO["stop"];
			}
			if (_CATALOGINFO["sprintf"] && _CATALOGINFO["start"]) {
				_CATALOGINFO["sprintfstart"] = _CATALOGINFO["start"];
			}

			if (!_CATALOGINFO["galleryid"])
				_CATALOGINFO["galleryid"] = galleryid;

			if (!_CATALOGINFO["fullfilelist"] && !_CATALOGINFO["sprintf"] && !_CATALOGINFO["strftime"])
				_CATALOGINFO["fullfilelist"] = galleryid;
			
			if (!_CATALOGINFO["fulldir"])
				_CATALOGINFO["fulldir"] = galleryid;
			
			if (!_CATALOGINFO["thumbdir"])
				_CATALOGINFO["thumbdir"]  = galleryid;

			_CATALOGINFO["title"]     = galleryid;
			_CATALOGINFO["about"]     = "Gallery auto-generated based on URL."
			_CATALOGINFO["aboutlink"] = galleryid;

			// Place auto-generated information at front of gallery list
			//console.log('cataloginfo.js: Adding ' + galleryid + ' to front of gallery list cache.');
			cataloginfo.GALLERIES["Values"].splice(0,0,new Object());
			cataloginfo.GALLERIES["Values"][0]["Title"] = galleryid;
			cataloginfo.GALLERIES["Values"][0]["Value"] = galleryid;
			cataloginfo.GALLERIES["Values"][0]["Id"]    = galleryid;

		} else {
			// Extract gallery information from from catalog.xml

			var text = $("#xml").text();
			if (text.length > 0) { 
				_CATALOGINFO["source"] = "index.html";
			} else {
				_CATALOGINFO["source"] = "xml/catalog.xml";
			}

			console.log("cataloginfo.js: Returning info for galleryid = " + galleryid);
			var query = "catalog > gallery[id='" + galleryid + "']";
	
			//console.log('cataloginfo.js: Evaluating ' + query);

			_CATALOGINFO["galleryid"]  = $(cataloginfo.xml).find(query).attr('id');
			if (!_CATALOGINFO["galleryid"]) {
				//warning("Error: Gallery with id " + galleryid + " not found in <a href='xml/catalog.xml'>catalog.xml</a>. Redirecting.");
				console.log("Error: Gallery with id " + galleryid + " not found in <a href='xml/catalog.xml'>catalog.xml</a>.");
				//setTimeout(function () {location.hash = "#"},1000);
				return "";
				//$("#error").html("");
			}
			_CATALOGINFO["title"]      = $(cataloginfo.xml).find(query).siblings('title').text();
			if (_CATALOGINFO["title"] == "")
				_CATALOGINFO["title"] = _CATALOGINFO["galleryid"]
			
			_CATALOGINFO["titleshort"] = $(cataloginfo.xml).find(query).siblings('titleshort').text();
			if (_CATALOGINFO["titleshort"] == "")
				_CATALOGINFO["titleshort"] = _CATALOGINFO["title"]
	
			_CATALOGINFO["files"]         = $(cataloginfo.xml).find(query).children('files').text();
			
			// TODO: change this because this will match "aboutlink" too. Syntax is ":children['about']" ? 
			_CATALOGINFO["about"]            = $(cataloginfo.xml).find(query).children('about').text();	
			_CATALOGINFO["aboutlink"]        = $(cataloginfo.xml).find(query).children('aboutlink').text();
			_CATALOGINFO["strftime"]         = $(cataloginfo.xml).find(query).children('strftime').text();
			_CATALOGINFO["strftimestart"]    = $(cataloginfo.xml).find(query).children('strftimestart').text();
			_CATALOGINFO["strftimestop"]     = $(cataloginfo.xml).find(query).children('strftimestop').text();
			_CATALOGINFO["sprintf"]          = $(cataloginfo.xml).find(query).children('sprintf').text();
			_CATALOGINFO["sprintfstart"]     = $(cataloginfo.xml).find(query).children('sprintfstart').text();
			_CATALOGINFO["sprintfstop"]      = $(cataloginfo.xml).find(query).children('sprintfstop').text();
			_CATALOGINFO["sprintfdelta"]     = $(cataloginfo.xml).find(query).children('sprintfdelta').text();

			_CATALOGINFO["fullpreprocess"]   = $(cataloginfo.xml).find(query).children('fullpreprocess').text();			
			_CATALOGINFO["fullpostprocess"]  = $(cataloginfo.xml).find(query).children('fullpostprocess').text();
			_CATALOGINFO["fullfilelist"]     = $(cataloginfo.xml).find(query).children('fullfilelist').text();
			_CATALOGINFO["fulllistscript"]   = $(cataloginfo.xml).find(query).children('fulllistscript').text();
			_CATALOGINFO["fullfiles"]        = $(cataloginfo.xml).find(query).children('fullfiles').text();
			_CATALOGINFO["fulldir"]          = $(cataloginfo.xml).find(query).children('fulldir').text();

			_CATALOGINFO["thumbpreprocess"]  = $(cataloginfo.xml).find(query).children('thumbpreprocess').text();
			_CATALOGINFO["thumbpostprocess"] = $(cataloginfo.xml).find(query).children('thumbpostprocess').text();
			_CATALOGINFO["thumbfilelist"]    = $(cataloginfo.xml).find(query).children('thumbfilelist').text();
			_CATALOGINFO["thumblistscript"]  = $(cataloginfo.xml).find(query).children('thumblistscript').text();
			_CATALOGINFO["thumbfiles"]       = $(cataloginfo.xml).find(query).children('thumbfiles').text();
			_CATALOGINFO["thumbdir"]         = $(cataloginfo.xml).find(query).children('thumbdir').text();


			// Find catalog with matching id in json array.
			for (i = 0;i<cataloginfo.json.length;i++) {
				if (cataloginfo.json[i]["id"] === galleryid) break;
			}

			if (typeof(cataloginfo.json[i]) !== "undefined") {
				_CATALOGINFO["galleryid"] = cataloginfo.json[i]["id"]
				for (key in cataloginfo.json[i]) {
					_CATALOGINFO[key] = cataloginfo.json[i][key];
				}
			}

		}
		
		// There must be a better way of doing this
		re = new RegExp('[\\S\\s]*(<gallery id="' + galleryid + '">[\\S\\s]*?<\/gallery>)[\\S\\s]*');
		if (typeof(cataloginfo.jqXHR.responseText) === "string") {
			_CATALOGINFO["xml"] = cataloginfo.jqXHR.responseText.replace(re,"$1"); 
			_CATALOGINFO["xml"] = _CATALOGINFO["xml"].replace(/\n\t/g,'\n');
		}
		cataloginfo.CATALOGINFO[galleryid] = _CATALOGINFO;

		// TODO: Validate all catalogs and strip bad ones.
		
		//console.log(_CATALOGINFO)
		return _CATALOGINFO;
		
	}
		
}VIVIZ = {
	"CATALOGXML":"enlil.xml",
	"lazyLoadMax":12,	            // How many images to load initially.
	"alternativeFrame":"ss_img_div" // Image that show up in $('#g-container fullframe') are copied here.
};

$(document).ready(function(){

	if (location.hash === "") {
		return;
	} else {
		// Initiate the creation of the gallery and downloading of lazyLoadMax images for selected model.
		gallery("#gallery1");  

		// Initiate the enlil controls.
		enlil();

		// Hide the main div if hash has value.
		$("#enlilmain").hide();  
	}

})

function enlil() {

	var enlildiv = "#enlil";

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		console.log("Mobile Device Detected.");
		var enlildiv = "enlilmobile";
	}

	// Mobile IDs always have trailing 0.
	if (location.hash.match(/0$/)) {
		var enlildiv = "#enlilmobile";
	}

	// Show the appropriate div.
	$(enlildiv).show();

	// Change colors on click.
	$(enlildiv + ' td.input a').on("click",function () {
		$(enlildiv + " td.input").attr('bgcolor','#4488cc');$(this).parent().attr("bgcolor","#224488");
	});
	$(enlildiv + ' td.output a').on("click",function () {
		$(enlildiv + " td.output").attr('bgcolor','#4488cc');$(this).parent().attr("bgcolor","#224488");
	});

	// When an output option is clicked, update the hash in the URL.
	$(enlildiv + ' td.output a').on("click",updatehash);
	$(enlildiv + ' td.input a').on("click",updatehash);
	$(enlildiv + ' #jmap_controls').on("change",jmap_change)
	$(enlildiv + ' #evo_controls').on("change",evo_change)

	// On first page load, set about link.
	setabout();

	// Set controls.
	var si;
	$(enlildiv + ' #ss_next').click(function () {$("#next").click();})
	$(enlildiv + ' #ss_prev').click(function () {$("#previous").click();})
	$(enlildiv + ' #ss_stop').click(function () {clearInterval(si); $(enlildiv + ' #ss_start').on();})
	$(enlildiv + ' #ss_start').click(
			function () {
				$("#next").click();
				si = setInterval(
						function () {
							$("#next").click();
						},'200');
						$(enlildiv + ' #ss_start').off
			}
			
	)

	// If in mobile mode, this option is not available.
	$(window).hashchange(function() {

		console.log("enlil.js: Hash has changed.  location.hash = "+location.hash);

		if (location.hash.match(/\/IPSBD-ENLIL\//)) {
			// This model does not have shock output.
			$("#shock").hide();
		} else {
			$("#shock").show();
		}

		if (!location.hash.match(/Evolution|JMap/)) {
			$(enlildiv + ' #ss_controls').show();
			$(enlildiv + ' #ss_select').show();
			$(enlildiv + ' #dl_select').show();
			$(enlildiv + ' #evo_controls').hide();
			$(enlildiv + ' #jmap_controls').hide();
		} else {
			console.log("enlil.js: Hiding image controls.")
			$(enlildiv + ' #ss_controls').hide();
			$(enlildiv + ' #ss_select').hide();
			$(enlildiv + ' #dl_select').hide();
			if (location.hash.match(/Evolution/)) {
				console.log("enlil.js: Showing evolution drop-down.")
				$(enlildiv + ' #evo_controls').show();
				$(enlildiv + ' #jmap_controls').hide();										
			}
			if (location.hash.match(/JMap/)) {
				console.log("enlil.js: Showing JMap drop-down.")
				$(enlildiv + ' #jmap_controls').show();									
				$(enlildiv + ' #evo_controls').hide();									
			}
		}

		// When hash changes, update about link.
		setabout();

	});

	function setabout() {
			var galleryid = location.hash.replace("#/",'');
			CATALOGINFO = cataloginfo(galleryid);
			$(enlildiv + " #infolink").attr('href',CATALOGINFO["aboutlink"])
	}
	function jmap_change() {
		console.log("jmap changed to "+$("#jmap_controls option:selected").val());
		location.hash = '/' + location.hash.split('/')[1] + '/JMap/' + $("#jmap_controls option:selected").val();
	}

	function evo_change() {
		console.log("evo changed to "+$("#evo_controls option:selected").val());
		location.hash = '/' + location.hash.split('/')[1] + '/Evolution/' + $("#evo_controls option:selected").val();
	}

	function updatehash() {

		console.log("enlil.js: updatehash() called.")
		var output = $(this).children('font').attr('id');
		var title = $(this).children('font').attr('id');
		var myoutput = $('#sitetitle').text().split('Solar Wind Prediction');

		if(title.indexOf('/') === -1){ //NOT A MATCH ITS A MODEL
			$('#sitetitle').text(title + ' \u2013 ' + 'Solar Wind Prediction' + myoutput[1]);
		}
		else { //IT IS A MATCH ITS A VARIABLE
			var newtitle = title.split('/');
			$('#sitetitle').text(myoutput[0] + 'Solar Wind Prediction' + ' \u2013 ' + newtitle[0] + ' ' + newtitle[1]);
		}

		location.hash = '/' + location.hash.split('/')[1] + '/' + output;
	}

}

