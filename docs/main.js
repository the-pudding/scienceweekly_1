parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"or4r":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3],e="Expected a function",n=NaN,r="[object Symbol]",i=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,f=/^0o[0-7]+$/i,c=parseInt,a="object"==typeof t&&t&&t.Object===Object&&t,s="object"==typeof self&&self&&self.Object===Object&&self,v=a||s||Function("return this")(),l=Object.prototype,p=l.toString,b=Math.max,m=Math.min,y=function(){return v.Date.now()};function d(t,n,r){var i,o,u,f,c,a,s=0,v=!1,l=!1,p=!0;if("function"!=typeof t)throw new TypeError(e);function d(e){var n=i,r=o;return i=o=void 0,s=e,f=t.apply(r,n)}function g(t){var e=t-a;return void 0===a||e>=n||e<0||l&&t-s>=u}function O(){var t=y();if(g(t))return x(t);c=setTimeout(O,function(t){var e=n-(t-a);return l?m(e,u-(t-s)):e}(t))}function x(t){return c=void 0,p&&i?d(t):(i=o=void 0,f)}function T(){var t=y(),e=g(t);if(i=arguments,o=this,a=t,e){if(void 0===c)return function(t){return s=t,c=setTimeout(O,n),v?d(t):f}(a);if(l)return c=setTimeout(O,n),d(a)}return void 0===c&&(c=setTimeout(O,n)),f}return n=h(n)||0,j(r)&&(v=!!r.leading,u=(l="maxWait"in r)?b(h(r.maxWait)||0,n):u,p="trailing"in r?!!r.trailing:p),T.cancel=function(){void 0!==c&&clearTimeout(c),s=0,i=a=o=c=void 0},T.flush=function(){return void 0===c?f:x(y())},T}function j(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function g(t){return!!t&&"object"==typeof t}function O(t){return"symbol"==typeof t||g(t)&&p.call(t)==r}function h(t){if("number"==typeof t)return t;if(O(t))return n;if(j(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=j(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var r=u.test(t);return r||f.test(t)?c(t.slice(2),r?2:8):o.test(t)?n:+t}module.exports=d;
},{}],"WEtf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r={android:function(){return navigator.userAgent.match(/Android/i)},blackberry:function(){return navigator.userAgent.match(/BlackBerry/i)},ios:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},opera:function(){return navigator.userAgent.match(/Opera Mini/i)},windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return r.android()||r.blackberry()||r.ios()||r.opera()||r.windows()}},e=r;exports.default=e;
},{}],"TAPd":[function(require,module,exports) {
"use strict";function e(e){for(var t=1;t<arguments.length;t++){var d=null!=arguments[t]?arguments[t]:{},c=Object.keys(d);"function"==typeof Object.getOwnPropertySymbols&&(c=c.concat(Object.getOwnPropertySymbols(d).filter(function(e){return Object.getOwnPropertyDescriptor(d,e).enumerable}))),c.forEach(function(t){s(e,t,d[t])})}return e}function s(e,s,t){return s in e?Object.defineProperty(e,s,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[s]=t,e}var t,d,c,i,n,a,l,r,o,h,u,f,p,g,b,y,v,m;Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var k,x,w,O,_,j,z,A,F,P,L,D,E=1,S=!1,M=[90,80,70,62.5],R=d3.select(".arrow"),T=d3.select(".cover-right"),q=d3.select(".cover-left"),B=d3.select(".btn-fwd"),C=d3.select(".chart-static"),G=d3.select(".story"),H=d3.select(".nav-bar"),I="6px",J=.8;function K(){S=!0,d3.select("section.story").classed("hidden",!1),H.classed("hidden",!1),T.classed("slide",!0),q.classed("slide",!0),d3.select(".intro").transition().delay(250).style("display","none")}function N(){d.selectAll(".prose-para").classed("hidden",!0),d.select("div.part-".concat(E)).classed("hidden",!1)}function Q(){_.text("".concat(E,"/10")),1===E&&(n.classed("hidden",!0),h.classed("hidden",!0),B.classed("is-disabled",!1),C.classed("is-chart",!1),G.classed("is-chart",!1),H.classed("is-chart",!1),u.st("line-height","1.65"),N()),2===E&&(n.classed("hidden",!1),h.classed("hidden",!0),B.classed("is-disabled",!1),C.classed("is-chart",!1),G.classed("is-chart",!1),H.classed("is-chart",!1),u.st("line-height","1.65"),N()),3===E&&(n.classed("hidden",!0),h.classed("hidden",!0),B.classed("is-disabled",!1),C.classed("is-chart",!1),G.classed("is-chart",!1),H.classed("is-chart",!1),u.st("line-height","1.65"),N()),4===E&&(n.classed("hidden",!0),h.classed("hidden",!0),B.classed("is-disabled",!1),C.classed("is-chart",!0),G.classed("is-chart",!0),H.classed("is-chart",!0),u.st("line-height","1.65"),N()),5===E&&(n.classed("hidden",!0),h.classed("hidden",!0),B.classed("is-disabled",!1),C.classed("is-chart",!1),G.classed("is-chart",!1),H.classed("is-chart",!1),u.st("line-height","1.65"),N()),6===E&&(n.classed("hidden",!0),h.classed("hidden",!1),B.classed("is-disabled",!1),C.classed("is-chart",!0),G.classed("is-chart",!0),H.classed("is-chart",!0),o.classed("is-visible",!1),u.st("line-height","0.8"),z.st("background-color","#FFFFFF").st("color","#282828"),g.classed("hidden",!1),b.classed("hidden",!1),y.classed("hidden",!1),v.classed("hidden",!1),m.classed("hidden",!1),N()),7===E&&(n.classed("hidden",!0),h.classed("hidden",!1),B.classed("is-disabled",!1),C.classed("is-chart",!0),G.classed("is-chart",!0),H.classed("is-chart",!0),o.classed("is-visible",!0),u.st("line-height","0.8"),console.log("font size original: ".concat(z.st("font-size"))),console.log("line height original: ".concat(z.st("line-height"))),z.transition(2e3).delay(function(e,s){return 5*s}).st("background-color",function(e){return F(A(e.yr))}).st("color",function(e){return F(A(e.yr))}).st("display","visible").st("font-size",L),z.classed("hidden",!1),P=d3.select(".sentence-box").st("height"),N()),8===E&&(n.classed("hidden",!0),h.classed("hidden",!1),B.classed("is-disabled",!1),C.classed("is-chart",!0),G.classed("is-chart",!0),H.classed("is-chart",!0),o.classed("is-visible",!0),z.transition().delay(function(e,s){return 15*s}).st("font-size",function(e){return e.yr>10?0:I}).st("line-height",function(e){return e.yr>10?0:J}),N(),d3.select("footer").classed("hidden",!0),d3.select(".sentence-box").st("height",P)),9===E&&(n.classed("hidden",!0),h.classed("hidden",!0),B.classed("is-disabled",!1),C.classed("is-chart",!1),G.classed("is-chart",!1),G.classed("is-methods",!1),H.classed("is-chart",!1),o.classed("is-visible",!1),N()),10===E&&(n.classed("hidden",!0),h.classed("hidden",!0),B.classed("is-disabled",!0),C.classed("is-chart",!1),G.classed("is-chart",!1),G.classed("is-methods",!0),H.classed("is-chart",!1),N())}function U(){1===E?(T.classed("slide",!1),q.classed("slide",!1),H.classed("hidden",!0),d3.select(".intro").transition().style("display","block"),S=!1):(E-=1,Q())}function V(){10===E||(E+=1,Q())}function W(s){return s.map(function(s){return e({},s,{yr:2013-+s.alt_year})})}function X(){A=d3.scaleThreshold().domain([0,2,4,6,8,10,12,14,16,18,20,22,100]).range([.625,.625,.739130434782609,.742424242424242,.742424242424242,.760869565217391,.813953488372093,.85,.85,.85,.923076923076923,.923076923076923,.923076923076923]),F=d3.scaleLinear().domain([.625,1]).range(["#ff533d","#ffddd8"])}function Y(){n=d3.select("div.chart-static-container"),h=d3.select("div.chart-dynamic"),r=d3.select("div.chart-dynamic-chart"),o=d3.select("div.chart-dynamic-legend"),l=d3.select("p.chart-static-title"),a=n.select("img"),d=d3.select("div.prose"),w=d3.select(".overlay__left"),O=d3.select(".overlay__right"),k=d3.select(".btn-back"),x=d3.select(".btn-fwd"),_=d3.select(".current-slide-num"),i=d3.select(".cover-container"),f=d3.select("section.story"),document.addEventListener("keydown",function(e){var s=e.key;"ArrowRight"===s?S?V():K():"ArrowLeft"===s&&U()},!1)}function Z(){u=r.append("p.sentence-box"),j=u.selectAll("span.sentence").data(t).enter(),(z=j.append("span.sentence")).text(function(e){return e.sentence}),L="6px",D=z.st("line-height"),console.log("font size is ".concat(L,", line height is ").concat(D)),R.on("click",K),k.on("click",U),x.on("click",V),w.on("click",U),O.on("click",V),g=o.append("p.legend-title"),p=o.append("div.legend"),y=p.append("p.legend-item-labels-container"),b=p.append("p.legend-item-container"),g.text("Likelihood of original data availability"),m=y.selectAll("span.legend-item-text").data(M).enter().append("span.legend-item-text"),v=b.selectAll("span.legend-item").data(M).enter().append("span.legend-item"),m.text(function(e){return">".concat(e,"%")}),v.st("background-color",function(e){return F(e/100)}).text(function(e){return">".concat(e,"%")}).st("color",function(e){return F(e/100)}),g.classed("hidden",!0),b.classed("hidden",!0),y.classed("hidden",!0),v.classed("hidden",!0),m.classed("hidden",!0)}function $(){return new Promise(function(e,s){var d,c=["assets/data/article_data.csv","assets/data/thesis_chunked.csv"];(d=d3).loadData.apply(d,c.concat([function(e,d){e?s(e):(t=W(d[0]),X(),Y(),Z())}]))})}var ee={init:$,resize:X};exports.default=ee;
},{}],"v9Q8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=[{image:"2018_02_stand-up",url:"2018/02/stand-up",hed:"The Structure of Stand-Up Comedy"},{image:"2018_04_birthday-paradox",url:"2018/04/birthday-paradox",hed:"The Birthday Paradox Experiment"},{image:"2018_11_boy-bands",url:"2018/11/boy-bands",hed:"Internet Boy Band Database"},{image:"2018_08_pockets",url:"2018/08/pockets",hed:"Women’s Pockets are Inferior"}],t=null;function n(e,t){var n=document.getElementsByTagName("script")[0],o=document.createElement("script");return o.src=e,o.async=!0,n.parentNode.insertBefore(o,n),t&&"function"==typeof t&&(o.onload=t),o}function o(t){var n=new XMLHttpRequest,o=Date.now(),r="https://pudding.cool/assets/data/stories.json?v=".concat(o);n.open("GET",r,!0),n.onload=function(){if(n.status>=200&&n.status<400){var o=JSON.parse(n.responseText);t(o)}else t(e)},n.onerror=function(){return t(e)},n.send()}function r(e){return"\n\t<a class='footer-recirc__article' href='https://pudding.cool/".concat(e.url,"' target='_blank'>\n\t\t<img class='article__img' src='https://pudding.cool/common/assets/thumbnails/640/").concat(e.image,".jpg' alt='").concat(e.hed,"'>\n\t\t<p class='article__headline'>").concat(e.hed,"</p>\n\t</a>\n\t")}function a(){var e=window.location.href,n=t.filter(function(t){return!e.includes(t.url)}).slice(0,4).map(r).join("");d3.select(".pudding-footer .footer-recirc__articles").html(n)}function s(){var e,t,o,r,a;e=document,t="script",o="facebook-jssdk",a=e.getElementsByTagName(t)[0],e.getElementById(o)||((r=e.createElement(t)).id=o,r.src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7",a.parentNode.insertBefore(r,a)),n("https://platform.twitter.com/widgets.js")}function c(){o(function(e){t=e,a(),s()})}var i={init:c};exports.default=i;
},{}],"epB2":[function(require,module,exports) {
"use strict";var e=l(require("lodash.debounce")),i=l(require("./utils/is-mobile")),s=l(require("./graphic")),t=l(require("./footer"));function l(e){return e&&e.__esModule?e:{default:e}}var d=d3.select("body"),r=0;function a(){var e=d.node().offsetWidth;r!==e&&(r=e,s.default.resize())}function n(){if(d.select("header").classed("is-sticky")){var e=d.select(".header__menu"),i=d.select(".header__toggle");i.on("click",function(){var s=e.classed("is-visible");e.classed("is-visible",!s),i.classed("is-visible",!s)})}}function u(){d.classed("is-mobile",i.default.any()),window.addEventListener("resize",(0,e.default)(a,150)),n(),s.default.init(),t.default.init()}u();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./graphic":"TAPd","./footer":"v9Q8"}]},{},["epB2"], null)