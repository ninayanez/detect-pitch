(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _pitchJs = require('../pitch.js');

var _pitchJs2 = _interopRequireDefault(_pitchJs);

var _paperCoreMinJs = require('./paper-core.min.js');

var _paperCoreMinJs2 = _interopRequireDefault(_paperCoreMinJs);

var NUM_SAMPLES = 4096;
var interval = 20;
var signal = new Float32Array(NUM_SAMPLES);
var ymax = window.innerHeight / 300;

// use https
window.addEventListener('load', function (e) {
  if (window.location.protocol != 'https:') window.location.protocol = 'https:';
}, false);

// setup canvas
var ctx = document.createElement('canvas');
document.body.style.padding = 0;
document.body.style.margin = 0;
document.body.appendChild(ctx);
ctx.style.backgroundColor = 'pink';
ctx.height = window.innerHeight;
ctx.width = window.innerWidth;

_paperCoreMinJs2['default'].setup(ctx);

// get mic input
navigator.webkitGetUserMedia({
  audio: true,
  video: false
}, function (stream) {
  var context = new AudioContext();
  var mic = context.createMediaStreamSource(stream);
  var analyser = context.createAnalyser();

  mic.connect(analyser);
  analyser.connect(context.destination);

  function process() {
    requestAnimationFrame(process);

    analyser.getFloatTimeDomainData(signal);

    var period = (0, _pitchJs2['default'])(signal, 0.8);
    var pitch = -1;

    if (period) {
      pitch = Math.round(44100.0 / period);
      var x = parseInt(peak.position.x + peak.bounds.width * 0.5) + interval;
      var y = window.innerHeight - pitch * ymax;
      peak.add(new _paperCoreMinJs2['default'].Segment([x, y], [-11, 0], [11, 0]));
      if (peak.position.x + peak.bounds.width * 0.5 > window.innerWidth) {
        peak.position.x = window.innerWidth - peak.position.x + (interval + 5);
        peak.removeSegments(0, 1);
      }
      _paperCoreMinJs2['default'].view.draw();
    }
  }

  process();
}, function (e) {
  if (e) console.error(e);
});

var peak = new _paperCoreMinJs2['default'].Path([0, window.innerHeight - 25], [0, window.innerHeight - 25]);
peak.strokeColor = '#333';
peak.strokeWidth = 2;

var graph = new _paperCoreMinJs2['default'].Group();

var drawGraph = function drawGraph() {
  for (var i = 0; i < 16; i++) {
    var y = window.innerHeight - i * 20 * ymax;
    graph.addChildren([new _paperCoreMinJs2['default'].PointText({
      point: [6, y + 11],
      content: i * 20 + 'hz',
      fontSize: 11,
      fontFamily: 'monospace',
      fillColor: 'rgba(0,0,255,0.6)'
    }), new _paperCoreMinJs2['default'].Path.Line({
      from: [0, y],
      to: [window.innerWidth, y],
      strokeColor: 'rgba(0,0,255,0.4)'
    })]);
  }
  graph.addChildren([new _paperCoreMinJs2['default'].Path.Line({
    from: [0, window.innerHeight - 185 * ymax],
    to: [window.innerWidth, window.innerHeight - 185 * ymax],
    strokeWidth: 2,
    strokeColor: 'rgba(197, 68, 192, 0.81)'
  })]);
  _paperCoreMinJs2['default'].view.draw();
};

drawGraph();

},{"../pitch.js":21,"./paper-core.min.js":2}],2:[function(require,module,exports){
/*!
 * Paper.js v0.9.25 - The Swiss Army Knife of Vector Graphics Scripting.
 * http://paperjs.org/
 *
 * Copyright (c) 2011 - 2014, Juerg Lehni & Jonathan Puckey
 * http://scratchdisk.com/ & http://jonathanpuckey.com/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 *
 * Date: Sun Oct 25 11:23:38 2015 +0100
 *
 ***
 *
 * Straps.js - Class inheritance library with support for bean-style accessors
 *
 * Copyright (c) 2006 - 2013 Juerg Lehni
 * http://scratchdisk.com/
 *
 * Distributed under the MIT license.
 *
 ***
 *
 * Acorn.js
 * http://marijnhaverbeke.nl/acorn/
 *
 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
 * created by Marijn Haverbeke and released under an MIT license.
 *
 */
var paper=new function(t){var e=new function(){function n(t,n,i,r,a){function o(s,o){o=o||(o=u(n,s))&&(o.get?o:o.value),"string"==typeof o&&"#"===o[0]&&(o=t[o.substring(1)]||o);var l,d="function"==typeof o,_=o,f=a||d&&!o.base?o&&o.get?s in t:t[s]:null;a&&f||(d&&f&&(o.base=f),d&&r!==!1&&(l=s.match(/^([gs]et|is)(([A-Z])(.*))$/))&&(h[l[3].toLowerCase()+l[4]]=l[2]),_&&!d&&_.get&&"function"==typeof _.get&&e.isPlainObject(_)||(_={value:_,writable:!0}),(u(t,s)||{configurable:!0}).configurable&&(_.configurable=!0,_.enumerable=i),c(t,s,_))}var h={};if(n){for(var l in n)n.hasOwnProperty(l)&&!s.test(l)&&o(l);for(var l in h){var d=h[l],_=t["set"+d],f=t["get"+d]||_&&t["is"+d];!f||r!==!0&&0!==f.length||o(l,{get:f,set:_})}}return t}function i(t,e,n){return t&&("length"in t&&!t.getLength&&"number"==typeof t.length?a:o).call(t,e,n=n||t),n}function r(t,e,n){for(var i in e)!e.hasOwnProperty(i)||n&&n[i]||(t[i]=e[i]);return t}var s=/^(statics|enumerable|beans|preserve)$/,a=[].forEach||function(t,e){for(var n=0,i=this.length;i>n;n++)t.call(e,this[n],n,this)},o=function(t,e){for(var n in this)this.hasOwnProperty(n)&&t.call(e,this[n],n,this)},h=Object.create||function(t){return{__proto__:t}},u=Object.getOwnPropertyDescriptor||function(t,e){var n=t.__lookupGetter__&&t.__lookupGetter__(e);return n?{get:n,set:t.__lookupSetter__(e),enumerable:!0,configurable:!0}:t.hasOwnProperty(e)?{value:t[e],enumerable:!0,configurable:!0,writable:!0}:null},l=Object.defineProperty||function(t,e,n){return(n.get||n.set)&&t.__defineGetter__?(n.get&&t.__defineGetter__(e,n.get),n.set&&t.__defineSetter__(e,n.set)):t[e]=n.value,t},c=function(t,e,n){return delete t[e],l(t,e,n)};return n(function(){for(var t=0,e=arguments.length;e>t;t++)r(this,arguments[t])},{inject:function(t){if(t){var e=t.statics===!0?t:t.statics,i=t.beans,r=t.preserve;e!==t&&n(this.prototype,t,t.enumerable,i,r),n(this,e,!0,i,r)}for(var s=1,a=arguments.length;a>s;s++)this.inject(arguments[s]);return this},extend:function(){for(var t,e,i=this,r=0,s=arguments.length;s>r&&!(t=arguments[r].initialize);r++);return t=t||function(){i.apply(this,arguments)},e=t.prototype=h(this.prototype),c(e,"constructor",{value:t,writable:!0,configurable:!0}),n(t,this,!0),arguments.length&&this.inject.apply(t,arguments),t.base=i,t}},!0).inject({inject:function(){for(var t=0,e=arguments.length;e>t;t++){var i=arguments[t];i&&n(this,i,i.enumerable,i.beans,i.preserve)}return this},extend:function(){var t=h(this);return t.inject.apply(t,arguments)},each:function(t,e){return i(this,t,e)},set:function(t){return r(this,t)},clone:function(){return new this.constructor(this)},statics:{each:i,create:h,define:c,describe:u,set:r,clone:function(t){return r(new t.constructor,t)},isPlainObject:function(t){var n=null!=t&&t.constructor;return n&&(n===Object||n===e||"Object"===n.name)},pick:function(e,n){return e!==t?e:n}}})};"undefined"!=typeof module&&(module.exports=e),e.inject({toString:function(){return null!=this._id?(this._class||"Object")+(this._name?" '"+this._name+"'":" @"+this._id):"{ "+e.each(this,function(t,e){if(!/^_/.test(e)){var n=typeof t;this.push(e+": "+("number"===n?s.instance.number(t):"string"===n?"'"+t+"'":t))}},[]).join(", ")+" }"},getClassName:function(){return this._class||""},exportJSON:function(t){return e.exportJSON(this,t)},toJSON:function(){return e.serialize(this)},_set:function(n,i,r){if(n&&(r||e.isPlainObject(n))){for(var s=Object.keys(n._filtering||n),a=0,o=s.length;o>a;a++){var h=s[a];if(!i||!i[h]){var u=n[h];u!==t&&(this[h]=u)}}return!0}},statics:{exports:{enumerable:!0},extend:function tt(){var t=tt.base.apply(this,arguments),n=t.prototype._class;return n&&!e.exports[n]&&(e.exports[n]=t),t},equals:function(t,n){if(t===n)return!0;if(t&&t.equals)return t.equals(n);if(n&&n.equals)return n.equals(t);if(t&&n&&"object"==typeof t&&"object"==typeof n){if(Array.isArray(t)&&Array.isArray(n)){var i=t.length;if(i!==n.length)return!1;for(;i--;)if(!e.equals(t[i],n[i]))return!1}else{var r=Object.keys(t),i=r.length;if(i!==Object.keys(n).length)return!1;for(;i--;){var s=r[i];if(!n.hasOwnProperty(s)||!e.equals(t[s],n[s]))return!1}}return!0}return!1},read:function(n,i,r,s){if(this===e){var a=this.peek(n,i);return n.__index++,a}var o=this.prototype,h=o._readIndex,u=i||h&&n.__index||0;s||(s=n.length-u);var l=n[u];return l instanceof this||r&&r.readNull&&null==l&&1>=s?(h&&(n.__index=u+1),l&&r&&r.clone?l.clone():l):(l=e.create(this.prototype),h&&(l.__read=!0),l=l.initialize.apply(l,u>0||s<n.length?Array.prototype.slice.call(n,u,u+s):n)||l,h&&(n.__index=u+l.__read,l.__read=t),l)},peek:function(t,e){return t[t.__index=e||t.__index||0]},remain:function(t){return t.length-(t.__index||0)},readAll:function(t,e,n){for(var i,r=[],s=e||0,a=t.length;a>s;s++)r.push(Array.isArray(i=t[s])?this.read(i,0,n):this.read(t,s,n,1));return r},readNamed:function(n,i,r,s,a){var o=this.getNamed(n,i),h=o!==t;if(h){var u=n._filtered;u||(u=n._filtered=e.create(n[0]),u._filtering=n[0]),u[i]=t}return this.read(h?[o]:n,r,s,a)},getNamed:function(n,i){var r=n[0];return n._hasObject===t&&(n._hasObject=1===n.length&&e.isPlainObject(r)),n._hasObject?i?r[i]:n._filtered||r:t},hasNamed:function(t,e){return!!this.getNamed(t,e)},isPlainValue:function(t,e){return this.isPlainObject(t)||Array.isArray(t)||e&&"string"==typeof t},serialize:function(t,n,i,r){n=n||{};var a,o=!r;if(o&&(n.formatter=new s(n.precision),r={length:0,definitions:{},references:{},add:function(t,e){var n="#"+t._id,i=this.references[n];if(!i){this.length++;var r=e.call(t),s=t._class;s&&r[0]!==s&&r.unshift(s),this.definitions[n]=r,i=this.references[n]=[n]}return i}}),t&&t._serialize){a=t._serialize(n,r);var h=t._class;!h||i||a._compact||a[0]===h||a.unshift(h)}else if(Array.isArray(t)){a=[];for(var u=0,l=t.length;l>u;u++)a[u]=e.serialize(t[u],n,i,r);i&&(a._compact=!0)}else if(e.isPlainObject(t)){a={};for(var c=Object.keys(t),u=0,l=c.length;l>u;u++){var d=c[u];a[d]=e.serialize(t[d],n,i,r)}}else a="number"==typeof t?n.formatter.number(t,n.precision):t;return o&&r.length>0?[["dictionary",r.definitions],a]:a},deserialize:function(t,n,i,r){var s=t,a=!i;if(i=i||{},Array.isArray(t)){var o=t[0],h="dictionary"===o;if(1==t.length&&/^#/.test(o))return i.dictionary[o];o=e.exports[o],s=[],r&&(i.dictionary=s);for(var u=o?1:0,l=t.length;l>u;u++)s.push(e.deserialize(t[u],n,i,h));if(o){var c=s;n?s=n(o,c):(s=e.create(o.prototype),o.apply(s,c))}}else if(e.isPlainObject(t)){s={},r&&(i.dictionary=s);for(var d in t)s[d]=e.deserialize(t[d],n,i)}return a&&t&&t.length&&"dictionary"===t[0][0]?s[1]:s},exportJSON:function(t,n){var i=e.serialize(t,n);return n&&n.asString===!1?i:JSON.stringify(i)},importJSON:function(t,n){return e.deserialize("string"==typeof t?JSON.parse(t):t,function(t,i){var r=n&&n.constructor===t?n:e.create(t.prototype),s=r===n;if(1===i.length&&r instanceof m&&(s||!(r instanceof w))){var a=i[0];e.isPlainObject(a)&&(a.insert=!1)}return t.apply(r,i),s&&(n=null),r})},splice:function(e,n,i,r){var s=n&&n.length,a=i===t;i=a?e.length:i,i>e.length&&(i=e.length);for(var o=0;s>o;o++)n[o]._index=i+o;if(a)return e.push.apply(e,n),[];var h=[i,r];n&&h.push.apply(h,n);for(var u=e.splice.apply(e,h),o=0,l=u.length;l>o;o++)u[o]._index=t;for(var o=i+s,l=e.length;l>o;o++)e[o]._index=o;return u},capitalize:function(t){return t.replace(/\b[a-z]/g,function(t){return t.toUpperCase()})},camelize:function(t){return t.replace(/-(.)/g,function(t,e){return e.toUpperCase()})},hyphenate:function(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}}});var n={on:function(t,n){if("string"!=typeof t)e.each(t,function(t,e){this.on(e,t)},this);else{var i=this._eventTypes,r=i&&i[t],s=this._callbacks=this._callbacks||{};s=s[t]=s[t]||[],-1===s.indexOf(n)&&(s.push(n),r&&r.install&&1===s.length&&r.install.call(this,t))}return this},off:function(n,i){if("string"!=typeof n)return e.each(n,function(t,e){this.off(e,t)},this),t;var r,s=this._eventTypes,a=s&&s[n],o=this._callbacks&&this._callbacks[n];return o&&(!i||-1!==(r=o.indexOf(i))&&1===o.length?(a&&a.uninstall&&a.uninstall.call(this,n),delete this._callbacks[n]):-1!==r&&o.splice(r,1)),this},once:function(t,e){return this.on(t,function(){e.apply(this,arguments),this.off(t,e)})},emit:function(t,e){var n=this._callbacks&&this._callbacks[t];if(!n)return!1;var i=[].slice.call(arguments,1);n=n.slice();for(var r=0,s=n.length;s>r;r++)if(n[r].apply(this,i)===!1){e&&e.stop&&e.stop();break}return!0},responds:function(t){return!(!this._callbacks||!this._callbacks[t])},attach:"#on",detach:"#off",fire:"#emit",_installEvents:function(t){var e=this._callbacks,n=t?"install":"uninstall";for(var i in e)if(e[i].length>0){var r=this._eventTypes,s=r&&r[i],a=s&&s[n];a&&a.call(this,i)}},statics:{inject:function et(t){var n=t._events;if(n){var i={};e.each(n,function(n,r){var s="string"==typeof n,a=s?n:r,o=e.capitalize(a),h=a.substring(2).toLowerCase();i[h]=s?{}:n,a="_"+a,t["get"+o]=function(){return this[a]},t["set"+o]=function(t){var e=this[a];e&&this.off(h,e),t&&this.on(h,t),this[a]=t}}),t._eventTypes=i}return et.base.apply(this,arguments)}}},i=e.extend({_class:"PaperScope",initialize:function nt(){paper=this,this.settings=new e({applyMatrix:!0,handleSize:4,hitTolerance:0}),this.project=null,this.projects=[],this.tools=[],this.palettes=[],this._id=nt._id++,nt._scopes[this._id]=this;var t=nt.prototype;if(!this.support){var n=Y.getContext(1,1);t.support={nativeDash:"setLineDash"in n||"mozDash"in n,nativeBlendModes:$.nativeModes},Y.release(n)}if(!this.browser){var i=navigator.userAgent.toLowerCase(),r=(/(win)/.exec(i)||/(mac)/.exec(i)||/(linux)/.exec(i)||[])[0],s=t.browser={platform:r};r&&(s[r]=!0),i.replace(/(opera|chrome|safari|webkit|firefox|msie|trident|atom)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:([.\d]+))?/g,function(t,e,n,i,r){if(!s.chrome){var a="opera"===e?i:n;"trident"===e&&(a=r,e="msie"),s.version=a,s.versionNumber=parseFloat(a),s.name=e,s[e]=!0}}),s.chrome&&delete s.webkit,s.atom&&delete s.chrome}},version:"0.9.25",getView:function(){return this.project&&this.project.getView()},getPaper:function(){return this},execute:function(t,e,n){paper.PaperScript.execute(t,this,e,n),V.updateFocus()},install:function(t){var n=this;e.each(["project","view","tool"],function(i){e.define(t,i,{configurable:!0,get:function(){return n[i]}})});for(var i in this)!/^_/.test(i)&&this[i]&&(t[i]=this[i])},setup:function(t){return paper=this,this.project=new v(t),this},activate:function(){paper=this},clear:function(){for(var t=this.projects.length-1;t>=0;t--)this.projects[t].remove();for(var t=this.tools.length-1;t>=0;t--)this.tools[t].remove();for(var t=this.palettes.length-1;t>=0;t--)this.palettes[t].remove()},remove:function(){this.clear(),delete i._scopes[this._id]},statics:new function(){function t(t){return t+="Attribute",function(e,n){return e[t](n)||e[t]("data-paper-"+n)}}return{_scopes:{},_id:0,get:function(t){return this._scopes[t]||null},getAttribute:t("get"),hasAttribute:t("has")}}}),r=e.extend(n,{initialize:function(t){this._scope=paper,this._index=this._scope[this._list].push(this)-1,(t||!this._scope[this._reference])&&this.activate()},activate:function(){if(!this._scope)return!1;var t=this._scope[this._reference];return t&&t!==this&&t.emit("deactivate"),this._scope[this._reference]=this,this.emit("activate",t),!0},isActive:function(){return this._scope[this._reference]===this},remove:function(){return null==this._index?!1:(e.splice(this._scope[this._list],null,this._index,1),this._scope[this._reference]==this&&(this._scope[this._reference]=null),this._scope=null,!0)}}),s=e.extend({initialize:function(t){this.precision=t||5,this.multiplier=Math.pow(10,this.precision)},number:function(t){return Math.round(t*this.multiplier)/this.multiplier},pair:function(t,e,n){return this.number(t)+(n||",")+this.number(e)},point:function(t,e){return this.number(t.x)+(e||",")+this.number(t.y)},size:function(t,e){return this.number(t.width)+(e||",")+this.number(t.height)},rectangle:function(t,e){return this.point(t,e)+(e||",")+this.size(t,e)}});s.instance=new s;var a=new function(){function t(t,e,n){return e>t?e:t>n?n:t}var e=[[.5773502691896257],[0,.7745966692414834],[.33998104358485626,.8611363115940526],[0,.5384693101056831,.906179845938664],[.2386191860831969,.6612093864662645,.932469514203152],[0,.4058451513773972,.7415311855993945,.9491079123427585],[.1834346424956498,.525532409916329,.7966664774136267,.9602898564975363],[0,.3242534234038089,.6133714327005904,.8360311073266358,.9681602395076261],[.14887433898163122,.4333953941292472,.6794095682990244,.8650633666889845,.9739065285171717],[0,.26954315595234496,.5190961292068118,.7301520055740494,.8870625997680953,.978228658146057],[.1252334085114689,.3678314989981802,.5873179542866175,.7699026741943047,.9041172563704749,.9815606342467192],[0,.2304583159551348,.44849275103644687,.6423493394403402,.8015780907333099,.9175983992229779,.9841830547185881],[.10805494870734367,.31911236892788974,.5152486363581541,.6872929048116855,.827201315069765,.9284348836635735,.9862838086968123],[0,.20119409399743451,.3941513470775634,.5709721726085388,.7244177313601701,.8482065834104272,.937273392400706,.9879925180204854],[.09501250983763744,.2816035507792589,.45801677765722737,.6178762444026438,.755404408355003,.8656312023878318,.9445750230732326,.9894009349916499]],n=[[1],[.8888888888888888,.5555555555555556],[.6521451548625461,.34785484513745385],[.5688888888888889,.47862867049936647,.23692688505618908],[.46791393457269104,.3607615730481386,.17132449237917036],[.4179591836734694,.3818300505051189,.27970539148927664,.1294849661688697],[.362683783378362,.31370664587788727,.22238103445337448,.10122853629037626],[.3302393550012598,.31234707704000286,.26061069640293544,.1806481606948574,.08127438836157441],[.29552422471475287,.26926671930999635,.21908636251598204,.1494513491505806,.06667134430868814],[.2729250867779006,.26280454451024665,.23319376459199048,.18629021092773426,.1255803694649046,.05566856711617366],[.24914704581340277,.2334925365383548,.20316742672306592,.16007832854334622,.10693932599531843,.04717533638651183],[.2325515532308739,.22628318026289723,.2078160475368885,.17814598076194574,.13887351021978725,.09212149983772845,.04048400476531588],[.2152638534631578,.2051984637212956,.18553839747793782,.15720316715819355,.12151857068790319,.08015808715976021,.03511946033175186],[.2025782419255613,.19843148532711158,.1861610000155622,.16626920581699392,.13957067792615432,.10715922046717194,.07036604748810812,.03075324199611727],[.1894506104550685,.18260341504492358,.16915651939500254,.14959598881657674,.12462897125553388,.09515851168249279,.062253523938647894,.027152459411754096]],i=Math.abs,r=Math.sqrt,s=Math.pow,o=1e-12,h=1.12e-16;return{TOLERANCE:1e-6,EPSILON:o,MACHINE_EPSILON:h,CURVETIME_EPSILON:4e-7,GEOMETRIC_EPSILON:2e-7,WINDING_EPSILON:2e-7,TRIGONOMETRIC_EPSILON:1e-7,CLIPPING_EPSILON:1e-7,KAPPA:4*(r(2)-1)/3,isZero:function(t){return t>=-o&&o>=t},integrate:function(t,i,r,s){for(var a=e[s-2],o=n[s-2],h=.5*(r-i),u=h+i,l=0,c=s+1>>1,d=1&s?o[l++]*t(u):0;c>l;){var _=h*a[l];d+=o[l++]*(t(u+_)+t(u-_))}return h*d},findRoot:function(t,e,n,r,s,a,o){for(var h=0;a>h;h++){var u=t(n),l=u/e(n),c=n-l;if(i(l)<o)return c;u>0?(s=n,n=r>=c?.5*(r+s):c):(r=n,n=c>=s?.5*(r+s):c)}return n},solveQuadratic:function(e,n,a,u,l,c){var d,_,f=0,g=l-o,v=c+o,p=1/0,m=n;if(n/=-2,_=n*n-e*a,0!==_&&i(_)<h){var y=s(i(e*n*a),1/3);if(1e-8>y){var w=s(10,i(Math.floor(Math.log(y)*Math.LOG10E)));isFinite(w)||(w=0),e*=w,n*=w,a*=w,_=n*n-e*a}}if(i(e)<o){if(i(m)<o)return i(a)<o?-1:0;d=-a/m}else if(_>=-h){var x=0>_?0:r(_),b=n+(0>n?-x:x);0===b?(d=a/e,p=-d):(d=b/e,p=a/b)}return isFinite(d)&&(null==l||d>g&&v>d)&&(u[f++]=null==l?d:t(d,l,c)),p!==d&&isFinite(p)&&(null==l||p>g&&v>p)&&(u[f++]=null==l?p:t(p,l,c)),f},solveCubic:function(e,n,u,l,c,d,_){var f,g,v,p=0;if(i(e)<o)e=n,g=u,v=l,f=1/0;else if(i(l)<o)g=n,v=u,f=0;else{var m,y,w,x,b,C,S,P=1+h;if(f=-(n/e)/3,S=e*f,g=S+n,v=g*f+u,w=(S+g)*f+v,y=v*f+l,x=y/e,b=s(i(x),1/3),C=0>x?-1:1,x=-w/e,b=x>0?1.3247179572*Math.max(b,r(x)):b,m=f-C*b,m!==f){do if(f=m,S=e*f,g=S+n,v=g*f+u,w=(S+g)*f+v,y=v*f+l,m=0===w?f:f-y/w/P,m===f){f=m;break}while(C*m>C*f);i(e)*f*f>i(l/f)&&(v=-l/f,g=(v-u)/f)}}var p=a.solveQuadratic(e,g,v,c,d,_);return isFinite(f)&&(0===p||f!==c[p-1])&&(null==d||f>d-o&&_+o>f)&&(c[p++]=null==d?f:t(f,d,_)),p}}},o={_id:1,_pools:{},get:function(t){if(t){var e=t._class,n=this._pools[e];return n||(n=this._pools[e]={_id:1}),n._id++}return this._id++}},h=e.extend({_class:"Point",_readIndex:!0,initialize:function(t,e){var n=typeof t;if("number"===n){var i="number"==typeof e;this.x=t,this.y=i?e:t,this.__read&&(this.__read=i?2:1)}else"undefined"===n||null===t?(this.x=this.y=0,this.__read&&(this.__read=null===t?1:0)):(Array.isArray(t)?(this.x=t[0],this.y=t.length>1?t[1]:t[0]):null!=t.x?(this.x=t.x,this.y=t.y):null!=t.width?(this.x=t.width,this.y=t.height):null!=t.angle?(this.x=t.length,this.y=0,this.setAngle(t.angle)):(this.x=this.y=0,this.__read&&(this.__read=0)),this.__read&&(this.__read=1))},set:function(t,e){return this.x=t,this.y=e,this},equals:function(t){return this===t||t&&(this.x===t.x&&this.y===t.y||Array.isArray(t)&&this.x===t[0]&&this.y===t[1])||!1},clone:function(){return new h(this.x,this.y)},toString:function(){var t=s.instance;return"{ x: "+t.number(this.x)+", y: "+t.number(this.y)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.x),e.number(this.y)]},getLength:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},setLength:function(t){if(this.isZero()){var e=this._angle||0;this.set(Math.cos(e)*t,Math.sin(e)*t)}else{var n=t/this.getLength();a.isZero(n)&&this.getAngle(),this.set(this.x*n,this.y*n)}},getAngle:function(){return 180*this.getAngleInRadians.apply(this,arguments)/Math.PI},setAngle:function(t){this.setAngleInRadians.call(this,t*Math.PI/180)},getAngleInDegrees:"#getAngle",setAngleInDegrees:"#setAngle",getAngleInRadians:function(){if(arguments.length){var t=h.read(arguments),e=this.getLength()*t.getLength();if(a.isZero(e))return NaN;var n=this.dot(t)/e;return Math.acos(-1>n?-1:n>1?1:n)}return this.isZero()?this._angle||0:this._angle=Math.atan2(this.y,this.x)},setAngleInRadians:function(t){if(this._angle=t,!this.isZero()){var e=this.getLength();this.set(Math.cos(t)*e,Math.sin(t)*e)}},getQuadrant:function(){return this.x>=0?this.y>=0?1:4:this.y>=0?2:3}},{beans:!1,getDirectedAngle:function(){var t=h.read(arguments);return 180*Math.atan2(this.cross(t),this.dot(t))/Math.PI},getDistance:function(){var t=h.read(arguments),n=t.x-this.x,i=t.y-this.y,r=n*n+i*i,s=e.read(arguments);return s?r:Math.sqrt(r)},normalize:function(e){e===t&&(e=1);var n=this.getLength(),i=0!==n?e/n:0,r=new h(this.x*i,this.y*i);return i>=0&&(r._angle=this._angle),r},rotate:function(t,e){if(0===t)return this.clone();t=t*Math.PI/180;var n=e?this.subtract(e):this,i=Math.sin(t),r=Math.cos(t);return n=new h(n.x*r-n.y*i,n.x*i+n.y*r),e?n.add(e):n},transform:function(t){return t?t._transformPoint(this):this},add:function(){var t=h.read(arguments);return new h(this.x+t.x,this.y+t.y)},subtract:function(){var t=h.read(arguments);return new h(this.x-t.x,this.y-t.y)},multiply:function(){var t=h.read(arguments);return new h(this.x*t.x,this.y*t.y)},divide:function(){var t=h.read(arguments);return new h(this.x/t.x,this.y/t.y)},modulo:function(){var t=h.read(arguments);return new h(this.x%t.x,this.y%t.y)},negate:function(){return new h(-this.x,-this.y)},isInside:function(){return d.read(arguments).contains(this)},isClose:function(){var t=h.read(arguments),n=e.read(arguments);return this.getDistance(t)<n},isCollinear:function(){var t=h.read(arguments);return h.isCollinear(this.x,this.y,t.x,t.y)},isColinear:"#isCollinear",isOrthogonal:function(){var t=h.read(arguments);return h.isOrthogonal(this.x,this.y,t.x,t.y)},isZero:function(){return a.isZero(this.x)&&a.isZero(this.y)},isNaN:function(){return isNaN(this.x)||isNaN(this.y)},dot:function(){var t=h.read(arguments);return this.x*t.x+this.y*t.y},cross:function(){var t=h.read(arguments);return this.x*t.y-this.y*t.x},project:function(){var t=h.read(arguments),e=t.isZero()?0:this.dot(t)/t.dot(t);return new h(t.x*e,t.y*e)},statics:{min:function(){var t=h.read(arguments),e=h.read(arguments);return new h(Math.min(t.x,e.x),Math.min(t.y,e.y))},max:function(){var t=h.read(arguments),e=h.read(arguments);return new h(Math.max(t.x,e.x),Math.max(t.y,e.y))},random:function(){return new h(Math.random(),Math.random())},isCollinear:function(t,e,n,i){return Math.abs(t*i-e*n)<=1e-7*Math.sqrt((t*t+e*e)*(n*n+i*i))},isOrthogonal:function(t,e,n,i){return Math.abs(t*n+e*i)<=1e-7*Math.sqrt((t*t+e*e)*(n*n+i*i))}}},e.each(["round","ceil","floor","abs"],function(t){var e=Math[t];this[t]=function(){return new h(e(this.x),e(this.y))}},{})),u=h.extend({initialize:function(t,e,n,i){this._x=t,this._y=e,this._owner=n,this._setter=i},set:function(t,e,n){return this._x=t,this._y=e,n||this._owner[this._setter](this),this},getX:function(){return this._x},setX:function(t){this._x=t,this._owner[this._setter](this)},getY:function(){return this._y},setY:function(t){this._y=t,this._owner[this._setter](this)}}),l=e.extend({_class:"Size",_readIndex:!0,initialize:function(t,e){var n=typeof t;if("number"===n){var i="number"==typeof e;this.width=t,this.height=i?e:t,this.__read&&(this.__read=i?2:1)}else"undefined"===n||null===t?(this.width=this.height=0,this.__read&&(this.__read=null===t?1:0)):(Array.isArray(t)?(this.width=t[0],this.height=t.length>1?t[1]:t[0]):null!=t.width?(this.width=t.width,this.height=t.height):null!=t.x?(this.width=t.x,this.height=t.y):(this.width=this.height=0,this.__read&&(this.__read=0)),this.__read&&(this.__read=1))},set:function(t,e){return this.width=t,this.height=e,this},equals:function(t){return t===this||t&&(this.width===t.width&&this.height===t.height||Array.isArray(t)&&this.width===t[0]&&this.height===t[1])||!1},clone:function(){return new l(this.width,this.height)},toString:function(){var t=s.instance;return"{ width: "+t.number(this.width)+", height: "+t.number(this.height)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.width),e.number(this.height)]},add:function(){var t=l.read(arguments);return new l(this.width+t.width,this.height+t.height)},subtract:function(){var t=l.read(arguments);return new l(this.width-t.width,this.height-t.height)},multiply:function(){var t=l.read(arguments);return new l(this.width*t.width,this.height*t.height)},divide:function(){var t=l.read(arguments);return new l(this.width/t.width,this.height/t.height)},modulo:function(){var t=l.read(arguments);return new l(this.width%t.width,this.height%t.height)},negate:function(){return new l(-this.width,-this.height)},isZero:function(){return a.isZero(this.width)&&a.isZero(this.height)},isNaN:function(){return isNaN(this.width)||isNaN(this.height)},statics:{min:function(t,e){return new l(Math.min(t.width,e.width),Math.min(t.height,e.height))},max:function(t,e){return new l(Math.max(t.width,e.width),Math.max(t.height,e.height))},random:function(){return new l(Math.random(),Math.random())}}},e.each(["round","ceil","floor","abs"],function(t){var e=Math[t];this[t]=function(){return new l(e(this.width),e(this.height))}},{})),c=l.extend({initialize:function(t,e,n,i){this._width=t,this._height=e,this._owner=n,this._setter=i},set:function(t,e,n){return this._width=t,this._height=e,n||this._owner[this._setter](this),this},getWidth:function(){return this._width},setWidth:function(t){this._width=t,this._owner[this._setter](this)},getHeight:function(){return this._height},setHeight:function(t){this._height=t,this._owner[this._setter](this)}}),d=e.extend({_class:"Rectangle",_readIndex:!0,beans:!0,initialize:function(n,i,r,s){var a=typeof n,o=0;if("number"===a?(this.x=n,this.y=i,this.width=r,this.height=s,o=4):"undefined"===a||null===n?(this.x=this.y=this.width=this.height=0,o=null===n?1:0):1===arguments.length&&(Array.isArray(n)?(this.x=n[0],this.y=n[1],this.width=n[2],this.height=n[3],o=1):n.x!==t||n.width!==t?(this.x=n.x||0,this.y=n.y||0,this.width=n.width||0,this.height=n.height||0,o=1):n.from===t&&n.to===t&&(this.x=this.y=this.width=this.height=0,this._set(n),o=1)),!o){var u=h.readNamed(arguments,"from"),c=e.peek(arguments);if(this.x=u.x,this.y=u.y,c&&c.x!==t||e.hasNamed(arguments,"to")){var d=h.readNamed(arguments,"to");this.width=d.x-u.x,this.height=d.y-u.y,this.width<0&&(this.x=d.x,this.width=-this.width),this.height<0&&(this.y=d.y,this.height=-this.height)}else{var _=l.read(arguments);this.width=_.width,this.height=_.height}o=arguments.__index}this.__read&&(this.__read=o)},set:function(t,e,n,i){return this.x=t,this.y=e,this.width=n,this.height=i,this},clone:function(){return new d(this.x,this.y,this.width,this.height)},equals:function(t){var n=e.isPlainValue(t)?d.read(arguments):t;return n===this||n&&this.x===n.x&&this.y===n.y&&this.width===n.width&&this.height===n.height||!1},toString:function(){var t=s.instance;return"{ x: "+t.number(this.x)+", y: "+t.number(this.y)+", width: "+t.number(this.width)+", height: "+t.number(this.height)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.x),e.number(this.y),e.number(this.width),e.number(this.height)]},getPoint:function(t){var e=t?h:u;return new e(this.x,this.y,this,"setPoint")},setPoint:function(){var t=h.read(arguments);this.x=t.x,this.y=t.y},getSize:function(t){var e=t?l:c;return new e(this.width,this.height,this,"setSize")},setSize:function(){var t=l.read(arguments);this._fixX&&(this.x+=(this.width-t.width)*this._fixX),this._fixY&&(this.y+=(this.height-t.height)*this._fixY),this.width=t.width,this.height=t.height,this._fixW=1,this._fixH=1},getLeft:function(){return this.x},setLeft:function(t){this._fixW||(this.width-=t-this.x),this.x=t,this._fixX=0},getTop:function(){return this.y},setTop:function(t){this._fixH||(this.height-=t-this.y),this.y=t,this._fixY=0},getRight:function(){return this.x+this.width},setRight:function(e){this._fixX!==t&&1!==this._fixX&&(this._fixW=0),this._fixW?this.x=e-this.width:this.width=e-this.x,this._fixX=1},getBottom:function(){return this.y+this.height},setBottom:function(e){this._fixY!==t&&1!==this._fixY&&(this._fixH=0),this._fixH?this.y=e-this.height:this.height=e-this.y,this._fixY=1},getCenterX:function(){return this.x+.5*this.width},setCenterX:function(t){this.x=t-.5*this.width,this._fixX=.5},getCenterY:function(){return this.y+.5*this.height},setCenterY:function(t){this.y=t-.5*this.height,this._fixY=.5},getCenter:function(t){var e=t?h:u;return new e(this.getCenterX(),this.getCenterY(),this,"setCenter")},setCenter:function(){var t=h.read(arguments);return this.setCenterX(t.x),this.setCenterY(t.y),this},getArea:function(){return this.width*this.height},isEmpty:function(){return 0===this.width||0===this.height},contains:function(e){return e&&e.width!==t||4==(Array.isArray(e)?e:arguments).length?this._containsRectangle(d.read(arguments)):this._containsPoint(h.read(arguments))},_containsPoint:function(t){var e=t.x,n=t.y;return e>=this.x&&n>=this.y&&e<=this.x+this.width&&n<=this.y+this.height},_containsRectangle:function(t){var e=t.x,n=t.y;return e>=this.x&&n>=this.y&&e+t.width<=this.x+this.width&&n+t.height<=this.y+this.height},intersects:function(){var t=d.read(arguments);return t.x+t.width>this.x&&t.y+t.height>this.y&&t.x<this.x+this.width&&t.y<this.y+this.height},touches:function(){var t=d.read(arguments);return t.x+t.width>=this.x&&t.y+t.height>=this.y&&t.x<=this.x+this.width&&t.y<=this.y+this.height},intersect:function(){var t=d.read(arguments),e=Math.max(this.x,t.x),n=Math.max(this.y,t.y),i=Math.min(this.x+this.width,t.x+t.width),r=Math.min(this.y+this.height,t.y+t.height);return new d(e,n,i-e,r-n)},unite:function(){var t=d.read(arguments),e=Math.min(this.x,t.x),n=Math.min(this.y,t.y),i=Math.max(this.x+this.width,t.x+t.width),r=Math.max(this.y+this.height,t.y+t.height);return new d(e,n,i-e,r-n)},include:function(){var t=h.read(arguments),e=Math.min(this.x,t.x),n=Math.min(this.y,t.y),i=Math.max(this.x+this.width,t.x),r=Math.max(this.y+this.height,t.y);return new d(e,n,i-e,r-n)},expand:function(){var t=l.read(arguments),e=t.width,n=t.height;return new d(this.x-e/2,this.y-n/2,this.width+e,this.height+n)},scale:function(e,n){return this.expand(this.width*e-this.width,this.height*(n===t?e:n)-this.height)}},e.each([["Top","Left"],["Top","Right"],["Bottom","Left"],["Bottom","Right"],["Left","Center"],["Top","Center"],["Right","Center"],["Bottom","Center"]],function(t,e){var n=t.join(""),i=/^[RL]/.test(n);e>=4&&(t[1]+=i?"Y":"X");var r=t[i?0:1],s=t[i?1:0],a="get"+r,o="get"+s,l="set"+r,c="set"+s,d="get"+n,_="set"+n;this[d]=function(t){var e=t?h:u;return new e(this[a](),this[o](),this,_)},this[_]=function(){var t=h.read(arguments);this[l](t.x),this[c](t.y)}},{beans:!0})),_=d.extend({initialize:function(t,e,n,i,r,s){this.set(t,e,n,i,!0),this._owner=r,this._setter=s},set:function(t,e,n,i,r){return this._x=t,this._y=e,this._width=n,this._height=i,r||this._owner[this._setter](this),this}},new function(){var t=d.prototype;return e.each(["x","y","width","height"],function(t){var n=e.capitalize(t),i="_"+t;this["get"+n]=function(){return this[i]},this["set"+n]=function(t){this[i]=t,this._dontNotify||this._owner[this._setter](this)}},e.each(["Point","Size","Center","Left","Top","Right","Bottom","CenterX","CenterY","TopLeft","TopRight","BottomLeft","BottomRight","LeftCenter","TopCenter","RightCenter","BottomCenter"],function(e){var n="set"+e;this[n]=function(){this._dontNotify=!0,t[n].apply(this,arguments),this._dontNotify=!1,this._owner[this._setter](this)}},{isSelected:function(){return this._owner._boundsSelected},setSelected:function(t){var e=this._owner;e.setSelected&&(e._boundsSelected=t,e.setSelected(t||e._selectedSegmentState>0))}}))}),f=e.extend({_class:"Matrix",initialize:function it(t){var e=arguments.length,n=!0;if(6===e?this.set.apply(this,arguments):1===e?t instanceof it?this.set(t._a,t._c,t._b,t._d,t._tx,t._ty):Array.isArray(t)?this.set.apply(this,t):n=!1:0===e?this.reset():n=!1,!n)throw Error("Unsupported matrix parameters")},set:function(t,e,n,i,r,s,a){return this._a=t,this._c=e,this._b=n,this._d=i,this._tx=r,this._ty=s,a||this._changed(),this},_serialize:function(t){return e.serialize(this.getValues(),t)},_changed:function(){var t=this._owner;t&&(t._applyMatrix?t.transform(null,!0):t._changed(9))},clone:function(){return new f(this._a,this._c,this._b,this._d,this._tx,this._ty)},equals:function(t){return t===this||t&&this._a===t._a&&this._b===t._b&&this._c===t._c&&this._d===t._d&&this._tx===t._tx&&this._ty===t._ty||!1},toString:function(){var t=s.instance;return"[["+[t.number(this._a),t.number(this._b),t.number(this._tx)].join(", ")+"], ["+[t.number(this._c),t.number(this._d),t.number(this._ty)].join(", ")+"]]"},reset:function(t){return this._a=this._d=1,this._c=this._b=this._tx=this._ty=0,t||this._changed(),this},apply:function(t,n){var i=this._owner;return i?(i.transform(null,!0,e.pick(t,!0),n),this.isIdentity()):!1},translate:function(){var t=h.read(arguments),e=t.x,n=t.y;return this._tx+=e*this._a+n*this._b,this._ty+=e*this._c+n*this._d,this._changed(),this},scale:function(){var t=h.read(arguments),e=h.read(arguments,0,{readNull:!0});return e&&this.translate(e),this._a*=t.x,this._c*=t.x,this._b*=t.y,this._d*=t.y,e&&this.translate(e.negate()),this._changed(),this},rotate:function(t){t*=Math.PI/180;var e=h.read(arguments,1),n=e.x,i=e.y,r=Math.cos(t),s=Math.sin(t),a=n-n*r+i*s,o=i-n*s-i*r,u=this._a,l=this._b,c=this._c,d=this._d;return this._a=r*u+s*l,this._b=-s*u+r*l,this._c=r*c+s*d,this._d=-s*c+r*d,this._tx+=a*u+o*l,this._ty+=a*c+o*d,this._changed(),this},shear:function(){var t=h.read(arguments),e=h.read(arguments,0,{readNull:!0});e&&this.translate(e);var n=this._a,i=this._c;return this._a+=t.y*this._b,this._c+=t.y*this._d,this._b+=t.x*n,this._d+=t.x*i,e&&this.translate(e.negate()),this._changed(),this},skew:function(){var t=h.read(arguments),e=h.read(arguments,0,{readNull:!0}),n=Math.PI/180,i=new h(Math.tan(t.x*n),Math.tan(t.y*n));return this.shear(i,e)},concatenate:function(t){var e=this._a,n=this._b,i=this._c,r=this._d,s=t._a,a=t._b,o=t._c,h=t._d,u=t._tx,l=t._ty;return this._a=s*e+o*n,
this._b=a*e+h*n,this._c=s*i+o*r,this._d=a*i+h*r,this._tx+=u*e+l*n,this._ty+=u*i+l*r,this._changed(),this},preConcatenate:function(t){var e=this._a,n=this._b,i=this._c,r=this._d,s=this._tx,a=this._ty,o=t._a,h=t._b,u=t._c,l=t._d,c=t._tx,d=t._ty;return this._a=o*e+h*i,this._b=o*n+h*r,this._c=u*e+l*i,this._d=u*n+l*r,this._tx=o*s+h*a+c,this._ty=u*s+l*a+d,this._changed(),this},chain:function(t){var e=this._a,n=this._b,i=this._c,r=this._d,s=this._tx,a=this._ty,o=t._a,h=t._b,u=t._c,l=t._d,c=t._tx,d=t._ty;return new f(o*e+u*n,o*i+u*r,h*e+l*n,h*i+l*r,s+c*e+d*n,a+c*i+d*r)},isIdentity:function(){return 1===this._a&&0===this._c&&0===this._b&&1===this._d&&0===this._tx&&0===this._ty},orNullIfIdentity:function(){return this.isIdentity()?null:this},isInvertible:function(){return!!this._getDeterminant()},isSingular:function(){return!this._getDeterminant()},transform:function(t,e,n){return arguments.length<3?this._transformPoint(h.read(arguments)):this._transformCoordinates(t,e,n)},_transformPoint:function(t,e,n){var i=t.x,r=t.y;return e||(e=new h),e.set(i*this._a+r*this._b+this._tx,i*this._c+r*this._d+this._ty,n)},_transformCoordinates:function(t,e,n){for(var i=0,r=0,s=2*n;s>i;){var a=t[i++],o=t[i++];e[r++]=a*this._a+o*this._b+this._tx,e[r++]=a*this._c+o*this._d+this._ty}return e},_transformCorners:function(t){var e=t.x,n=t.y,i=e+t.width,r=n+t.height,s=[e,n,i,n,i,r,e,r];return this._transformCoordinates(s,s,4)},_transformBounds:function(t,e,n){for(var i=this._transformCorners(t),r=i.slice(0,2),s=r.slice(),a=2;8>a;a++){var o=i[a],h=1&a;o<r[h]?r[h]=o:o>s[h]&&(s[h]=o)}return e||(e=new d),e.set(r[0],r[1],s[0]-r[0],s[1]-r[1],n)},inverseTransform:function(){return this._inverseTransform(h.read(arguments))},_getDeterminant:function(){var t=this._a*this._d-this._b*this._c;return isFinite(t)&&!a.isZero(t)&&isFinite(this._tx)&&isFinite(this._ty)?t:null},_inverseTransform:function(t,e,n){var i=this._getDeterminant();if(!i)return null;var r=t.x-this._tx,s=t.y-this._ty;return e||(e=new h),e.set((r*this._d-s*this._b)/i,(s*this._a-r*this._c)/i,n)},decompose:function(){var t=this._a,e=this._b,n=this._c,i=this._d;if(a.isZero(t*i-e*n))return null;var r=Math.sqrt(t*t+e*e);t/=r,e/=r;var s=t*n+e*i;n-=t*s,i-=e*s;var o=Math.sqrt(n*n+i*i);return n/=o,i/=o,s/=o,e*n>t*i&&(t=-t,e=-e,s=-s,r=-r),{scaling:new h(r,o),rotation:180*-Math.atan2(e,t)/Math.PI,shearing:s}},getValues:function(){return[this._a,this._c,this._b,this._d,this._tx,this._ty]},getTranslation:function(){return new h(this._tx,this._ty)},getScaling:function(){return(this.decompose()||{}).scaling},getRotation:function(){return(this.decompose()||{}).rotation},inverted:function(){var t=this._getDeterminant();return t&&new f(this._d/t,-this._c/t,-this._b/t,this._a/t,(this._b*this._ty-this._d*this._tx)/t,(this._c*this._tx-this._a*this._ty)/t)},shiftless:function(){return new f(this._a,this._c,this._b,this._d,0,0)},applyToContext:function(t){t.transform(this._a,this._c,this._b,this._d,this._tx,this._ty)}},e.each(["a","c","b","d","tx","ty"],function(t){var n=e.capitalize(t),i="_"+t;this["get"+n]=function(){return this[i]},this["set"+n]=function(t){this[i]=t,this._changed()}},{})),g=e.extend({_class:"Line",initialize:function(t,e,n,i,r){var s=!1;arguments.length>=4?(this._px=t,this._py=e,this._vx=n,this._vy=i,s=r):(this._px=t.x,this._py=t.y,this._vx=e.x,this._vy=e.y,s=n),s||(this._vx-=this._px,this._vy-=this._py)},getPoint:function(){return new h(this._px,this._py)},getVector:function(){return new h(this._vx,this._vy)},getLength:function(){return this.getVector().getLength()},intersect:function(t,e){return g.intersect(this._px,this._py,this._vx,this._vy,t._px,t._py,t._vx,t._vy,!0,e)},getSide:function(t,e){return g.getSide(this._px,this._py,this._vx,this._vy,t.x,t.y,!0,e)},getDistance:function(t){return Math.abs(g.getSignedDistance(this._px,this._py,this._vx,this._vy,t.x,t.y,!0))},isCollinear:function(t){return h.isCollinear(this._vx,this._vy,t._vx,t._vy)},isOrthogonal:function(t){return h.isOrthogonal(this._vx,this._vy,t._vx,t._vy)},statics:{intersect:function(t,e,n,i,r,s,o,u,l,c){l||(n-=t,i-=e,o-=r,u-=s);var d=n*u-i*o;if(!a.isZero(d)){var _=t-r,f=e-s,g=(o*f-u*_)/d,v=(n*f-i*_)/d,p=1e-12,m=-p,y=1+p;if(c||g>m&&y>g&&v>m&&y>v)return c||(g=0>=g?0:g>=1?1:g),new h(t+g*n,e+g*i)}},getSide:function(t,e,n,i,r,s,a,o){a||(n-=t,i-=e);var h=r-t,u=s-e,l=h*i-u*n;return 0!==l||o||(l=(h*n+h*n)/(n*n+i*i),l>=0&&1>=l&&(l=0)),0>l?-1:l>0?1:0},getSignedDistance:function(t,e,n,i,r,s,a){return a||(n-=t,i-=e),0===n?i>0?r-t:t-r:0===i?0>n?s-e:e-s:((r-t)*i-(s-e)*n)/Math.sqrt(n*n+i*i)}}}),v=r.extend({_class:"Project",_list:"projects",_reference:"project",initialize:function(t){r.call(this,!0),this.layers=[],this._activeLayer=null,this.symbols=[],this._currentStyle=new R(null,null,this),this._view=V.create(this,t||Y.getCanvas(1,1)),this._selectedItems={},this._selectedItemCount=0,this._updateVersion=0},_serialize:function(t,n){return e.serialize(this.layers,t,!0,n)},clear:function(){for(var t=this.layers.length-1;t>=0;t--)this.layers[t].remove();this.symbols=[]},isEmpty:function(){return 0===this.layers.length},remove:function rt(){return rt.base.call(this)?(this._view&&this._view.remove(),!0):!1},getView:function(){return this._view},getCurrentStyle:function(){return this._currentStyle},setCurrentStyle:function(t){this._currentStyle.initialize(t)},getIndex:function(){return this._index},getOptions:function(){return this._scope.settings},getActiveLayer:function(){return this._activeLayer||new w({project:this})},getSelectedItems:function(){var t=[];for(var e in this._selectedItems){var n=this._selectedItems[e];n.isInserted()&&t.push(n)}return t},insertChild:function(t,n,i){return n instanceof w?(n._remove(!1,!0),e.splice(this.layers,[n],t,0),n._setProject(this,!0),this._changes&&n._changed(5),this._activeLayer||(this._activeLayer=n)):n instanceof m?(this._activeLayer||this.insertChild(t,new w(m.NO_INSERT))).insertChild(t,n,i):n=null,n},addChild:function(e,n){return this.insertChild(t,e,n)},_updateSelection:function(t){var e=t._id,n=this._selectedItems;t._selected?n[e]!==t&&(this._selectedItemCount++,n[e]=t):n[e]===t&&(this._selectedItemCount--,delete n[e])},selectAll:function(){for(var t=this.layers,e=0,n=t.length;n>e;e++)t[e].setFullySelected(!0)},deselectAll:function(){var t=this._selectedItems;for(var e in t)t[e].setFullySelected(!1)},hitTest:function(){for(var t=h.read(arguments),n=S.getOptions(e.read(arguments)),i=this.layers.length-1;i>=0;i--){var r=this.layers[i]._hitTest(t,n);if(r)return r}return null},getItems:function(t){return m._getItems(this.layers,t)},getItem:function(t){return m._getItems(this.layers,t,null,null,!0)[0]||null},importJSON:function(t){this.activate();var n=this._activeLayer;return e.importJSON(t,n&&n.isEmpty()&&n)},draw:function(t,n,i){this._updateVersion++,t.save(),n.applyToContext(t);for(var r=new e({offset:new h(0,0),pixelRatio:i,viewMatrix:n.isIdentity()?null:n,matrices:[new f],updateMatrix:!0}),s=0,a=this.layers,o=a.length;o>s;s++)a[s].draw(t,r);if(t.restore(),this._selectedItemCount>0){t.save(),t.strokeWidth=1;var u=this._selectedItems,l=this._scope.settings.handleSize,c=this._updateVersion;for(var d in u)u[d]._drawSelection(t,n,l,u,c);t.restore()}}}),p=e.extend({_class:"Symbol",initialize:function(t,e){this._id=o.get(),this.project=paper.project,this.project.symbols.push(this),t&&this.setDefinition(t,e)},_serialize:function(t,n){return n.add(this,function(){return e.serialize([this._class,this._definition],t,!1,n)})},_changed:function(t){8&t&&m._clearBoundsCache(this),1&t&&(this.project._needsUpdate=!0)},getDefinition:function(){return this._definition},setDefinition:function(t,e){t._parentSymbol&&(t=t.clone()),this._definition&&(this._definition._parentSymbol=null),this._definition=t,t.remove(),t.setSelected(!1),e||t.setPosition(new h),t._parentSymbol=this,this._changed(9)},place:function(t){return new C(this,t)},clone:function(){return new p(this._definition.clone(!1))},equals:function(t){return t===this||t&&this.definition.equals(t.definition)||!1}}),m=e.extend(n,{statics:{extend:function st(t){return t._serializeFields&&(t._serializeFields=new e(this.prototype._serializeFields,t._serializeFields)),st.base.apply(this,arguments)},NO_INSERT:{insert:!1}},_class:"Item",_applyMatrix:!0,_canApplyMatrix:!0,_boundsSelected:!1,_selectChildren:!1,_serializeFields:{name:null,applyMatrix:null,matrix:new f,pivot:null,locked:!1,visible:!0,blendMode:"normal",opacity:1,guide:!1,selected:!1,clipMask:!1,data:{}},initialize:function(){},_initialize:function(t,n){var i=t&&e.isPlainObject(t),r=i&&t.internal===!0,s=this._matrix=new f,a=i&&t.project||paper.project;return r||(this._id=o.get()),this._applyMatrix=this._canApplyMatrix&&paper.settings.applyMatrix,n&&s.translate(n),s._owner=this,this._style=new R(a._currentStyle,this,a),this._project||(r||i&&t.insert===!1?this._setProject(a):i&&t.parent?this.setParent(t.parent):(a._activeLayer||new w).addChild(this)),i&&t!==m.NO_INSERT&&this._set(t,{insert:!0,project:!0,parent:!0},!0),i},_events:e.each(["onMouseDown","onMouseUp","onMouseDrag","onClick","onDoubleClick","onMouseMove","onMouseEnter","onMouseLeave"],function(t){this[t]={install:function(t){this.getView()._installEvent(t)},uninstall:function(t){this.getView()._uninstallEvent(t)}}},{onFrame:{install:function(){this.getView()._animateItem(this,!0)},uninstall:function(){this.getView()._animateItem(this,!1)}},onLoad:{}}),_serialize:function(t,n){function i(i){for(var a in i){var o=s[a];e.equals(o,"leading"===a?1.2*i.fontSize:i[a])||(r[a]=e.serialize(o,t,"data"!==a,n))}}var r={},s=this;return i(this._serializeFields),this instanceof y||i(this._style._defaults),[this._class,r]},_changed:function(e){var n=this._parentSymbol,i=this._parent||n,r=this._project;if(8&e&&(this._bounds=this._position=this._decomposed=this._globalMatrix=this._currentPath=t),i&&40&e&&m._clearBoundsCache(i),2&e&&m._clearBoundsCache(this),r&&(1&e&&(r._needsUpdate=!0),r._changes)){var s=r._changesById[this._id];s?s.flags|=e:(s={item:this,flags:e},r._changesById[this._id]=s,r._changes.push(s))}n&&n._changed(e)},set:function(t){return t&&this._set(t),this},getId:function(){return this._id},getName:function(){return this._name},setName:function(e,n){if(this._name&&this._removeNamed(),e===+e+"")throw Error("Names consisting only of numbers are not supported.");var i=this._parent;if(e&&i){for(var r=i._children,s=i._namedChildren,a=e,o=1;n&&r[e];)e=a+" "+o++;(s[e]=s[e]||[]).push(this),r[e]=this}this._name=e||t,this._changed(128)},getStyle:function(){return this._style},setStyle:function(t){this.getStyle().set(t)}},e.each(["locked","visible","blendMode","opacity","guide"],function(t){var n=e.capitalize(t),t="_"+t;this["get"+n]=function(){return this[t]},this["set"+n]=function(e){e!=this[t]&&(this[t]=e,this._changed("_locked"===t?128:129))}},{}),{beans:!0,_locked:!1,_visible:!0,_blendMode:"normal",_opacity:1,_guide:!1,isSelected:function(){if(this._selectChildren)for(var t=this._children,e=0,n=t.length;n>e;e++)if(t[e].isSelected())return!0;return this._selected},setSelected:function(t,e){if(!e&&this._selectChildren)for(var n=this._children,i=0,r=n.length;r>i;i++)n[i].setSelected(t);(t=!!t)^this._selected&&(this._selected=t,this._project._updateSelection(this),this._changed(129))},_selected:!1,isFullySelected:function(){var t=this._children;if(t&&this._selected){for(var e=0,n=t.length;n>e;e++)if(!t[e].isFullySelected())return!1;return!0}return this._selected},setFullySelected:function(t){var e=this._children;if(e)for(var n=0,i=e.length;i>n;n++)e[n].setFullySelected(t);this.setSelected(t,!0)},isClipMask:function(){return this._clipMask},setClipMask:function(t){this._clipMask!=(t=!!t)&&(this._clipMask=t,t&&(this.setFillColor(null),this.setStrokeColor(null)),this._changed(129),this._parent&&this._parent._changed(1024))},_clipMask:!1,getData:function(){return this._data||(this._data={}),this._data},setData:function(t){this._data=t},getPosition:function(t){var e=this._position,n=t?h:u;if(!e){var i=this._pivot;e=this._position=i?this._matrix._transformPoint(i):this.getBounds().getCenter(!0)}return new n(e.x,e.y,this,"setPosition")},setPosition:function(){this.translate(h.read(arguments).subtract(this.getPosition(!0)))},getPivot:function(t){var e=this._pivot;if(e){var n=t?h:u;e=new n(e.x,e.y,this,"setPivot")}return e},setPivot:function(){this._pivot=h.read(arguments,0,{clone:!0,readNull:!0}),this._position=t},_pivot:null},e.each(["bounds","strokeBounds","handleBounds","roughBounds","internalBounds","internalRoughBounds"],function(t){var n="get"+e.capitalize(t),i=t.match(/^internal(.*)$/),r=i?"get"+i[1]:null;this[n]=function(e){var i=this._boundsGetter,s=!r&&("string"==typeof i?i:i&&i[n])||n,a=this._getCachedBounds(s,e,this,r);return"bounds"===t?new _(a.x,a.y,a.width,a.height,this,"setBounds"):a}},{beans:!0,_getBounds:function(t,e,n){var i=this._children;if(!i||0==i.length)return new d;m._updateBoundsCache(this,n);for(var r=1/0,s=-r,a=r,o=s,h=0,u=i.length;u>h;h++){var l=i[h];if(l._visible&&!l.isEmpty()){var c=l._getCachedBounds(t,e&&e.chain(l._matrix),n);r=Math.min(c.x,r),a=Math.min(c.y,a),s=Math.max(c.x+c.width,s),o=Math.max(c.y+c.height,o)}}return isFinite(r)?new d(r,a,s-r,o-a):new d},setBounds:function(){var t=d.read(arguments),e=this.getBounds(),n=new f,i=t.getCenter();n.translate(i),(t.width!=e.width||t.height!=e.height)&&n.scale(0!=e.width?t.width/e.width:1,0!=e.height?t.height/e.height:1),i=e.getCenter(),n.translate(-i.x,-i.y),this.transform(n)},_getCachedBounds:function(t,e,n,i){e=e&&e.orNullIfIdentity();var r=i?null:this._matrix.orNullIfIdentity(),s=(!e||e.equals(r))&&t;if(m._updateBoundsCache(this._parent||this._parentSymbol,n),s&&this._bounds&&this._bounds[s])return this._bounds[s].clone();var a=this._getBounds(i||t,e||r,n);if(s){this._bounds||(this._bounds={});var o=this._bounds[s]=a.clone();o._internal=!!i}return a},statics:{_updateBoundsCache:function(t,e){if(t){var n=e._id,i=t._boundsCache=t._boundsCache||{ids:{},list:[]};i.ids[n]||(i.list.push(e),i.ids[n]=e)}},_clearBoundsCache:function(e){var n=e._boundsCache;if(n){e._bounds=e._position=e._boundsCache=t;for(var i=0,r=n.list,s=r.length;s>i;i++){var a=r[i];a!==e&&(a._bounds=a._position=t,a._boundsCache&&m._clearBoundsCache(a))}}}}}),{beans:!0,_decompose:function(){return this._decomposed=this._matrix.decompose()},getRotation:function(){var t=this._decomposed||this._decompose();return t&&t.rotation},setRotation:function(t){var e=this.getRotation();if(null!=e&&null!=t){var n=this._decomposed;this.rotate(t-e),n.rotation=t,this._decomposed=n}},getScaling:function(t){var e=this._decomposed||this._decompose(),n=e&&e.scaling,i=t?h:u;return n&&new i(n.x,n.y,this,"setScaling")},setScaling:function(){var t=this.getScaling();if(t){var e=h.read(arguments,0,{clone:!0}),n=this._decomposed;this.scale(e.x/t.x,e.y/t.y),n.scaling=e,this._decomposed=n}},getMatrix:function(){return this._matrix},setMatrix:function(){var t=this._matrix;t.initialize.apply(t,arguments),this._applyMatrix?this.transform(null,!0):this._changed(9)},getGlobalMatrix:function(t){var e=this._globalMatrix,n=this._project._updateVersion;if(e&&e._updateVersion!==n&&(e=null),!e){e=this._globalMatrix=this._matrix.clone();var i=this._parent;i&&e.preConcatenate(i.getGlobalMatrix(!0)),e._updateVersion=n}return t?e:e.clone()},getApplyMatrix:function(){return this._applyMatrix},setApplyMatrix:function(t){(this._applyMatrix=this._canApplyMatrix&&!!t)&&this.transform(null,!0)},getTransformContent:"#getApplyMatrix",setTransformContent:"#setApplyMatrix"},{getProject:function(){return this._project},_setProject:function(t,e){if(this._project!==t){this._project&&this._installEvents(!1),this._project=t;for(var n=this._children,i=0,r=n&&n.length;r>i;i++)n[i]._setProject(t);e=!0}e&&this._installEvents(!0)},getView:function(){return this._project.getView()},_installEvents:function at(t){at.base.call(this,t);for(var e=this._children,n=0,i=e&&e.length;i>n;n++)e[n]._installEvents(t)},getLayer:function(){for(var t=this;t=t._parent;)if(t instanceof w)return t;return null},getParent:function(){return this._parent},setParent:function(t){return t.addChild(this)},getChildren:function(){return this._children},setChildren:function(t){this.removeChildren(),this.addChildren(t)},getFirstChild:function(){return this._children&&this._children[0]||null},getLastChild:function(){return this._children&&this._children[this._children.length-1]||null},getNextSibling:function(){return this._parent&&this._parent._children[this._index+1]||null},getPreviousSibling:function(){return this._parent&&this._parent._children[this._index-1]||null},getIndex:function(){return this._index},equals:function(t){return t===this||t&&this._class===t._class&&this._style.equals(t._style)&&this._matrix.equals(t._matrix)&&this._locked===t._locked&&this._visible===t._visible&&this._blendMode===t._blendMode&&this._opacity===t._opacity&&this._clipMask===t._clipMask&&this._guide===t._guide&&this._equals(t)||!1},_equals:function(t){return e.equals(this._children,t._children)},clone:function(t){return this._clone(new this.constructor(m.NO_INSERT),t)},_clone:function(n,i,r){var s=["_locked","_visible","_blendMode","_opacity","_clipMask","_guide"],a=this._children;n.setStyle(this._style);for(var o=0,h=a&&a.length;h>o;o++)n.addChild(a[o].clone(!1),!0);for(var o=0,h=s.length;h>o;o++){var u=s[o];this.hasOwnProperty(u)&&(n[u]=this[u])}return r!==!1&&n._matrix.initialize(this._matrix),n.setApplyMatrix(this._applyMatrix),n.setPivot(this._pivot),n.setSelected(this._selected),n._data=this._data?e.clone(this._data):null,(i||i===t)&&n.insertAbove(this),this._name&&n.setName(this._name,!0),n},copyTo:function(t){return t.addChild(this.clone(!1))},rasterize:function(t){var n=this.getStrokeBounds(),i=(t||this.getView().getResolution())/72,r=n.getTopLeft().floor(),s=n.getBottomRight().ceil(),a=new l(s.subtract(r)),o=Y.getCanvas(a.multiply(i)),h=o.getContext("2d"),u=(new f).scale(i).translate(r.negate());h.save(),u.applyToContext(h),this.draw(h,new e({matrices:[u]})),h.restore();var c=new b(m.NO_INSERT);return c.setCanvas(o),c.transform((new f).translate(r.add(a.divide(2))).scale(1/i)),c.insertAbove(this),c},contains:function(){return!!this._contains(this._matrix._inverseTransform(h.read(arguments)))},_contains:function(t){if(this._children){for(var e=this._children.length-1;e>=0;e--)if(this._children[e].contains(t))return!0;return!1}return t.isInside(this.getInternalBounds())},isInside:function(){return d.read(arguments).contains(this.getBounds())},_asPathItem:function(){return new O.Rectangle({rectangle:this.getInternalBounds(),matrix:this._matrix,insert:!1})},intersects:function(t,e){return t instanceof m?this._asPathItem().getIntersections(t._asPathItem(),null,e||t._matrix,!0).length>0:!1},hitTest:function(){return this._hitTest(h.read(arguments),S.getOptions(e.read(arguments)))},_hitTest:function(n,i){function r(i,r){var s=f["get"+r]();return n.subtract(s).divide(u).length<=1?new S(i,_,{name:e.hyphenate(r),point:s}):t}if(this._locked||!this._visible||this._guide&&!i.guides||this.isEmpty())return null;var s=this._matrix,a=i._totalMatrix,o=this.getView(),h=i._totalMatrix=a?a.chain(s):this.getGlobalMatrix().preConcatenate(o._matrix),u=i._tolerancePadding=new l(O._getPenPadding(1,h.inverted())).multiply(Math.max(i.tolerance,1e-6));if(n=s._inverseTransform(n),!this._children&&!this.getInternalRoughBounds().expand(u.multiply(2))._containsPoint(n))return null;var c,d=!(i.guides&&!this._guide||i.selected&&!this._selected||i.type&&i.type!==e.hyphenate(this._class)||i["class"]&&!(this instanceof i["class"])),_=this;if(d&&(i.center||i.bounds)&&this._parent){var f=this.getInternalBounds();if(i.center&&(c=r("center","Center")),!c&&i.bounds)for(var g=["TopLeft","TopRight","BottomLeft","BottomRight","LeftCenter","TopCenter","RightCenter","BottomCenter"],v=0;8>v&&!c;v++)c=r("bounds",g[v])}var p=!c&&this._children;if(p)for(var m=this._getChildHitTestOptions(i),v=p.length-1;v>=0&&!c;v--)c=p[v]._hitTest(n,m);return!c&&d&&(c=this._hitTestSelf(n,i)),c&&c.point&&(c.point=s.transform(c.point)),i._totalMatrix=a,c},_getChildHitTestOptions:function(t){return t},_hitTestSelf:function(e,n){return n.fill&&this.hasFill()&&this._contains(e)?new S("fill",this):t},matches:function(t,n){function i(t,n){for(var r in t)if(t.hasOwnProperty(r)){var s=t[r],a=n[r];if(e.isPlainObject(s)&&e.isPlainObject(a)){if(!i(s,a))return!1}else if(!e.equals(s,a))return!1}return!0}var r=typeof t;if("object"===r){for(var s in t)if(t.hasOwnProperty(s)&&!this.matches(s,t[s]))return!1}else{if("function"===r)return t(this);var a=/^(empty|editable)$/.test(t)?this["is"+e.capitalize(t)]():"type"===t?e.hyphenate(this._class):this[t];if(/^(constructor|class)$/.test(t)){if(!(this instanceof n))return!1}else if(n instanceof RegExp){if(!n.test(a))return!1}else if("function"==typeof n){if(!n(a))return!1}else if(e.isPlainObject(n)){if(!i(n,a))return!1}else if(!e.equals(a,n))return!1}return!0},getItems:function(t){return m._getItems(this._children,t,this._matrix)},getItem:function(t){return m._getItems(this._children,t,this._matrix,null,!0)[0]||null},statics:{_getItems:function ot(t,n,i,r,s){if(!r&&"object"==typeof n){var a=n.overlapping,o=n.inside,h=a||o,u=h&&d.read([h]);r={items:[],inside:!!o,overlapping:!!a,rect:u,path:a&&new O.Rectangle({rectangle:u,insert:!1})},h&&(n=e.set({},n,{inside:!0,overlapping:!0}))}var l=r&&r.items,u=r&&r.rect;i=u&&(i||new f);for(var c=0,_=t&&t.length;_>c;c++){var g=t[c],v=i&&i.chain(g._matrix),p=!0;if(u){var h=g.getBounds(v);if(!u.intersects(h))continue;r.inside&&u.contains(h)||r.overlapping&&(h.contains(u)||r.path.intersects(g,v))||(p=!1)}if(p&&g.matches(n)&&(l.push(g),s))break;if(ot(g._children,n,v,r,s),s&&l.length>0)break}return l}}},{importJSON:function(t){var n=e.importJSON(t,this);return n!==this?this.addChild(n):n},addChild:function(e,n){return this.insertChild(t,e,n)},insertChild:function(t,e,n){var i=e?this.insertChildren(t,[e],n):null;return i&&i[0]},addChildren:function(t,e){return this.insertChildren(this._children.length,t,e)},insertChildren:function(t,n,i,r){var s=this._children;if(s&&n&&n.length>0){n=Array.prototype.slice.apply(n);for(var a=n.length-1;a>=0;a--){var o=n[a];if(!r||o instanceof r){var h=o._parent===this&&o._index<t;o._remove(!1,!0)&&h&&t--}else n.splice(a,1)}e.splice(s,n,t,0);for(var u=this._project,l=u&&u._changes,a=0,c=n.length;c>a;a++){var o=n[a];o._parent=this,o._setProject(this._project,!0),o._name&&o.setName(o._name),l&&this._changed(5)}this._changed(11)}else n=null;return n},_insertSibling:function(t,e,n){return this._parent?this._parent.insertChild(t,e,n):null},insertAbove:function(t,e){return t._insertSibling(t._index+1,this,e)},insertBelow:function(t,e){return t._insertSibling(t._index,this,e)},sendToBack:function(){return(this._parent||this instanceof w&&this._project).insertChild(0,this)},bringToFront:function(){return(this._parent||this instanceof w&&this._project).addChild(this)},appendTop:"#addChild",appendBottom:function(t){return this.insertChild(0,t)},moveAbove:"#insertAbove",moveBelow:"#insertBelow",reduce:function(){if(this._children&&1===this._children.length){var t=this._children[0].reduce();return t.insertAbove(this),t.setStyle(this._style),this.remove(),t}return this},_removeNamed:function(){var t=this._parent;if(t){var e=t._children,n=t._namedChildren,i=this._name,r=n[i],s=r?r.indexOf(this):-1;-1!==s&&(e[i]==this&&delete e[i],r.splice(s,1),r.length?e[i]=r[r.length-1]:delete n[i])}},_remove:function(t,n){var i=this._parent;if(i){if(this._name&&this._removeNamed(),null!=this._index&&e.splice(i._children,null,this._index,1),this._installEvents(!1),t){var r=this._project;r&&r._changes&&this._changed(5)}return n&&i._changed(11),this._parent=null,!0}return!1},remove:function(){return this._remove(!0,!0)},replaceWith:function(t){var e=t&&t.insertBelow(this);return e&&this.remove(),e},removeChildren:function(t,n){if(!this._children)return null;t=t||0,n=e.pick(n,this._children.length);for(var i=e.splice(this._children,null,t,n-t),r=i.length-1;r>=0;r--)i[r]._remove(!0,!1);return i.length>0&&this._changed(11),i},clear:"#removeChildren",reverseChildren:function(){if(this._children){this._children.reverse();for(var t=0,e=this._children.length;e>t;t++)this._children[t]._index=t;this._changed(11)}},isEmpty:function(){return!this._children||0===this._children.length},isEditable:function(){for(var t=this;t;){if(!t._visible||t._locked)return!1;t=t._parent}return!0},hasFill:function(){return this.getStyle().hasFill()},hasStroke:function(){return this.getStyle().hasStroke()},hasShadow:function(){return this.getStyle().hasShadow()},_getOrder:function(t){function e(t){var e=[];do e.unshift(t);while(t=t._parent);return e}for(var n=e(this),i=e(t),r=0,s=Math.min(n.length,i.length);s>r;r++)if(n[r]!=i[r])return n[r]._index<i[r]._index?1:-1;return 0},hasChildren:function(){return this._children&&this._children.length>0},isInserted:function(){return this._parent?this._parent.isInserted():!1},isAbove:function(t){return-1===this._getOrder(t)},isBelow:function(t){return 1===this._getOrder(t)},isParent:function(t){return this._parent===t},isChild:function(t){return t&&t._parent===this},isDescendant:function(t){for(var e=this;e=e._parent;)if(e==t)return!0;return!1},isAncestor:function(t){return t?t.isDescendant(this):!1},isSibling:function(t){return this._parent===t._parent},isGroupedWith:function(t){for(var e=this._parent;e;){if(e._parent&&/^(Group|Layer|CompoundPath)$/.test(e._class)&&t.isDescendant(e))return!0;e=e._parent}return!1},translate:function(){var t=new f;return this.transform(t.translate.apply(t,arguments))},rotate:function(t){return this.transform((new f).rotate(t,h.read(arguments,1,{readNull:!0})||this.getPosition(!0)))}},e.each(["scale","shear","skew"],function(t){this[t]=function(){var e=h.read(arguments),n=h.read(arguments,0,{readNull:!0});return this.transform((new f)[t](e,n||this.getPosition(!0)))}},{}),{transform:function(t,e,n,i){t&&t.isIdentity()&&(t=null);var r=this._matrix,s=(e||this._applyMatrix)&&(!r.isIdentity()||t||e&&n&&this._children);if(!t&&!s)return this;if(t&&r.preConcatenate(t),s=s&&this._transformContent(r,n,i)){var a=this._pivot,o=this._style,h=o.getFillColor(!0),u=o.getStrokeColor(!0);a&&r._transformPoint(a,a,!0),h&&h.transform(r),u&&u.transform(r),r.reset(!0),i&&this._canApplyMatrix&&(this._applyMatrix=!0)}var l=this._bounds,c=this._position;this._changed(9);var d=l&&t&&t.decompose();if(d&&!d.shearing&&d.rotation%90===0){for(var _ in l){var f=l[_];(s||!f._internal)&&t._transformBounds(f,f)}var g=this._boundsGetter,f=l[g&&g.getBounds||g||"getBounds"];f&&(this._position=f.getCenter(!0)),this._bounds=l}else t&&c&&(this._position=t._transformPoint(c,c));return this},_transformContent:function(t,e,n){var i=this._children;if(i){for(var r=0,s=i.length;s>r;r++)i[r].transform(t,!0,e,n);return!0}},globalToLocal:function(){return this.getGlobalMatrix(!0)._inverseTransform(h.read(arguments))},localToGlobal:function(){return this.getGlobalMatrix(!0)._transformPoint(h.read(arguments))},parentToLocal:function(){return this._matrix._inverseTransform(h.read(arguments))},localToParent:function(){return this._matrix._transformPoint(h.read(arguments))},fitBounds:function(t,e){t=d.read(arguments);var n=this.getBounds(),i=n.height/n.width,r=t.height/t.width,s=(e?i>r:r>i)?t.width/n.width:t.height/n.height,a=new d(new h,new l(n.width*s,n.height*s));a.setCenter(t.getCenter()),this.setBounds(a)},_setStyles:function(t){var e=this._style,n=e.getFillColor(),i=e.getStrokeColor(),r=e.getShadowColor();if(n&&(t.fillStyle=n.toCanvasStyle(t)),i){var s=e.getStrokeWidth();if(s>0){t.strokeStyle=i.toCanvasStyle(t),t.lineWidth=s;var a=e.getStrokeJoin(),o=e.getStrokeCap(),h=e.getMiterLimit();if(a&&(t.lineJoin=a),o&&(t.lineCap=o),h&&(t.miterLimit=h),paper.support.nativeDash){var u=e.getDashArray(),l=e.getDashOffset();u&&u.length&&("setLineDash"in t?(t.setLineDash(u),t.lineDashOffset=l):(t.mozDash=u,t.mozDashOffset=l))}}}if(r){var c=e.getShadowBlur();if(c>0){t.shadowColor=r.toCanvasStyle(t),t.shadowBlur=c;var d=this.getShadowOffset();t.shadowOffsetX=d.x,t.shadowOffsetY=d.y}}},draw:function(t,e,n){function i(t){return a?a.chain(t):t}var r=this._updateVersion=this._project._updateVersion;if(this._visible&&0!==this._opacity){var s=e.matrices,a=e.viewMatrix,o=this._matrix,h=s[s.length-1].chain(o);if(h.isInvertible()){s.push(h),e.updateMatrix&&(h._updateVersion=r,this._globalMatrix=h);var u,l,c,d=this._blendMode,_=this._opacity,f="normal"===d,g=$.nativeModes[d],v=f&&1===_||e.dontStart||e.clip||(g||f&&1>_)&&this._canComposite(),p=e.pixelRatio||1;if(!v){var m=this.getStrokeBounds(i(h));if(!m.width||!m.height)return;c=e.offset,l=e.offset=m.getTopLeft().floor(),u=t,t=Y.getContext(m.getSize().ceil().add(1).multiply(p)),1!==p&&t.scale(p,p)}t.save();var y=n?n.chain(o):!this.getStrokeScaling(!0)&&i(h),w=!v&&e.clipItem,x=!y||w;if(v?(t.globalAlpha=_,g&&(t.globalCompositeOperation=d)):x&&t.translate(-l.x,-l.y),x&&(v?o:i(h)).applyToContext(t),w&&e.clipItem.draw(t,e.extend({clip:!0})),y){t.setTransform(p,0,0,p,0,0);var b=e.offset;b&&t.translate(-b.x,-b.y)}this._draw(t,e,y),t.restore(),s.pop(),e.clip&&!e.dontFinish&&t.clip(),v||($.process(d,t,u,_,l.subtract(c).multiply(p)),Y.release(t),e.offset=c)}}},_isUpdated:function(t){var e=this._parent;if(e instanceof A)return e._isUpdated(t);var n=this._updateVersion===t;return!n&&e&&e._visible&&e._isUpdated(t)&&(this._updateVersion=t,n=!0),n},_drawSelection:function(t,e,n,i,r){if((this._drawSelected||this._boundsSelected)&&this._isUpdated(r)){var s=this.getSelectedColor(!0)||this.getLayer().getSelectedColor(!0),a=e.chain(this.getGlobalMatrix(!0));if(t.strokeStyle=t.fillStyle=s?s.toCanvasStyle(t):"#009dec",this._drawSelected&&this._drawSelected(t,a,i),this._boundsSelected){var o=n/2,h=a._transformCorners(this.getInternalBounds());t.beginPath();for(var u=0;8>u;u++)t[0===u?"moveTo":"lineTo"](h[u],h[++u]);t.closePath(),t.stroke();for(var u=0;8>u;u++)t.fillRect(h[u]-o,h[++u]-o,n,n)}}},_canComposite:function(){return!1}},e.each(["down","drag","up","move"],function(t){this["removeOn"+e.capitalize(t)]=function(){var e={};return e[t]=!0,this.removeOn(e)}},{removeOn:function(t){for(var e in t)if(t[e]){var n="mouse"+e,i=this._project,r=i._removeSets=i._removeSets||{};r[n]=r[n]||{},r[n][this._id]=this}return this}})),y=m.extend({_class:"Group",_selectChildren:!0,_serializeFields:{children:[]},initialize:function(t){this._children=[],this._namedChildren={},this._initialize(t)||this.addChildren(Array.isArray(t)?t:arguments)},_changed:function ht(e){ht.base.call(this,e),1026&e&&(this._clipItem=t)},_getClipItem:function(){var e=this._clipItem;if(e===t){e=null;for(var n=0,i=this._children.length;i>n;n++){var r=this._children[n];if(r._clipMask){e=r;break}}this._clipItem=e}return e},isClipped:function(){return!!this._getClipItem()},setClipped:function(t){var e=this.getFirstChild();e&&e.setClipMask(t)},_draw:function(t,e){var n=e.clip,i=!n&&this._getClipItem(),r=!0;if(e=e.extend({clipItem:i,clip:!1}),n?this._currentPath?(t.currentPath=this._currentPath,r=!1):(t.beginPath(),e.dontStart=e.dontFinish=!0):i&&i.draw(t,e.extend({clip:!0})),r)for(var s=0,a=this._children.length;a>s;s++){var o=this._children[s];o!==i&&o.draw(t,e)}n&&(this._currentPath=t.currentPath)}}),w=y.extend({_class:"Layer",initialize:function(n){var i=e.isPlainObject(n)?new e(n):{children:Array.isArray(n)?n:arguments},r=i.insert;i.insert=!1,y.call(this,i),(r||r===t)&&(this._project.addChild(this),this.activate())},_remove:function ut(t,n){if(this._parent)return ut.base.call(this,t,n);if(null!=this._index){var i=this._project;return i._activeLayer===this&&(i._activeLayer=this.getNextSibling()||this.getPreviousSibling()),e.splice(i.layers,null,this._index,1),this._installEvents(!1),t&&i._changes&&this._changed(5),n&&(i._needsUpdate=!0),!0}return!1},getNextSibling:function lt(){return this._parent?lt.base.call(this):this._project.layers[this._index+1]||null},getPreviousSibling:function ct(){return this._parent?ct.base.call(this):this._project.layers[this._index-1]||null;
},isInserted:function dt(){return this._parent?dt.base.call(this):null!=this._index},activate:function(){this._project._activeLayer=this},_insertSibling:function _t(t,e,n){return this._parent?_t.base.call(this,t,e,n):this._project.insertChild(t,e,n)}}),x=m.extend({_class:"Shape",_applyMatrix:!1,_canApplyMatrix:!1,_boundsSelected:!0,_serializeFields:{type:null,size:null,radius:null},initialize:function(t){this._initialize(t)},_equals:function(t){return this._type===t._type&&this._size.equals(t._size)&&e.equals(this._radius,t._radius)},clone:function(t){var e=new x(m.NO_INSERT);return e.setType(this._type),e.setSize(this._size),e.setRadius(this._radius),this._clone(e,t)},getType:function(){return this._type},setType:function(t){this._type=t},getShape:"#getType",setShape:"#setType",getSize:function(){var t=this._size;return new c(t.width,t.height,this,"setSize")},setSize:function(){var t=l.read(arguments);if(this._size){if(!this._size.equals(t)){var e=this._type,n=t.width,i=t.height;if("rectangle"===e){var r=l.min(this._radius,t.divide(2));this._radius.set(r.width,r.height)}else"circle"===e?(n=i=(n+i)/2,this._radius=n/2):"ellipse"===e&&this._radius.set(n/2,i/2);this._size.set(n,i),this._changed(9)}}else this._size=t.clone()},getRadius:function(){var t=this._radius;return"circle"===this._type?t:new c(t.width,t.height,this,"setRadius")},setRadius:function(t){var e=this._type;if("circle"===e){if(t===this._radius)return;var n=2*t;this._radius=t,this._size.set(n,n)}else if(t=l.read(arguments),this._radius){if(this._radius.equals(t))return;if(this._radius.set(t.width,t.height),"rectangle"===e){var n=l.max(this._size,t.multiply(2));this._size.set(n.width,n.height)}else"ellipse"===e&&this._size.set(2*t.width,2*t.height)}else this._radius=t.clone();this._changed(9)},isEmpty:function(){return!1},toPath:function(t){var n=this._clone(new(O[e.capitalize(this._type)])({center:new h,size:this._size,radius:this._radius,insert:!1}),t);return paper.settings.applyMatrix&&n.setApplyMatrix(!0),n},_draw:function(t,e,n){var i=this._style,r=i.hasFill(),s=i.hasStroke(),a=e.dontFinish||e.clip,o=!n;if(r||s||a){var h=this._type,u=this._radius,l="circle"===h;if(e.dontStart||t.beginPath(),o&&l)t.arc(0,0,u,0,2*Math.PI,!0);else{var c=l?u:u.width,d=l?u:u.height,_=this._size,f=_.width,g=_.height;if(o&&"rectangle"===h&&0===c&&0===d)t.rect(-f/2,-g/2,f,g);else{var v=f/2,p=g/2,m=.44771525016920644,y=c*m,w=d*m,x=[-v,-p+d,-v,-p+w,-v+y,-p,-v+c,-p,v-c,-p,v-y,-p,v,-p+w,v,-p+d,v,p-d,v,p-w,v-y,p,v-c,p,-v+c,p,-v+y,p,-v,p-w,-v,p-d];n&&n.transform(x,x,32),t.moveTo(x[0],x[1]),t.bezierCurveTo(x[2],x[3],x[4],x[5],x[6],x[7]),v!==c&&t.lineTo(x[8],x[9]),t.bezierCurveTo(x[10],x[11],x[12],x[13],x[14],x[15]),p!==d&&t.lineTo(x[16],x[17]),t.bezierCurveTo(x[18],x[19],x[20],x[21],x[22],x[23]),v!==c&&t.lineTo(x[24],x[25]),t.bezierCurveTo(x[26],x[27],x[28],x[29],x[30],x[31])}}t.closePath()}a||!r&&!s||(this._setStyles(t),r&&(t.fill(i.getWindingRule()),t.shadowColor="rgba(0,0,0,0)"),s&&t.stroke())},_canComposite:function(){return!(this.hasFill()&&this.hasStroke())},_getBounds:function(t,e){var n=new d(this._size).setCenter(0,0);return"getBounds"!==t&&this.hasStroke()&&(n=n.expand(this.getStrokeWidth())),e?e._transformBounds(n):n}},new function(){function t(t,e,n){var i=t._radius;if(!i.isZero())for(var r=t._size.divide(2),s=0;4>s;s++){var a=new h(1&s?1:-1,s>1?1:-1),o=a.multiply(r),u=o.subtract(a.multiply(i)),l=new d(o,u);if((n?l.expand(n):l).contains(e))return u}}function e(t,e){var n=t.getAngleInRadians(),i=2*e.width,r=2*e.height,s=i*Math.sin(n),a=r*Math.cos(n);return i*r/(2*Math.sqrt(s*s+a*a))}return{_contains:function n(e){if("rectangle"===this._type){var i=t(this,e);return i?e.subtract(i).divide(this._radius).getLength()<=1:n.base.call(this,e)}return e.divide(this.size).getLength()<=.5},_hitTestSelf:function i(n,r){var s=!1;if(this.hasStroke()){var a=this._type,o=this._radius,h=this.getStrokeWidth()+2*r.tolerance;if("rectangle"===a){var u=t(this,n,h);if(u){var l=n.subtract(u);s=2*Math.abs(l.getLength()-e(l,o))<=h}else{var c=new d(this._size).setCenter(0,0),_=c.expand(h),f=c.expand(-h);s=_._containsPoint(n)&&!f._containsPoint(n)}}else"ellipse"===a&&(o=e(n,o)),s=2*Math.abs(n.getLength()-o)<=h}return s?new S("stroke",this):i.base.apply(this,arguments)}}},{statics:new function(){function t(t,n,i,r,s){var a=new x(e.getNamed(s));return a._type=t,a._size=i,a._radius=r,a.translate(n)}return{Circle:function(){var n=h.readNamed(arguments,"center"),i=e.readNamed(arguments,"radius");return t("circle",n,new l(2*i),i,arguments)},Rectangle:function(){var e=d.readNamed(arguments,"rectangle"),n=l.min(l.readNamed(arguments,"radius"),e.getSize(!0).divide(2));return t("rectangle",e.getCenter(!0),e.getSize(!0),n,arguments)},Ellipse:function(){var e=x._readEllipse(arguments),n=e.radius;return t("ellipse",e.center,n.multiply(2),n,arguments)},_readEllipse:function(t){var n,i;if(e.hasNamed(t,"radius"))n=h.readNamed(t,"center"),i=l.readNamed(t,"radius");else{var r=d.readNamed(t,"rectangle");n=r.getCenter(!0),i=r.getSize(!0).divide(2)}return{center:n,radius:i}}}}}),b=m.extend({_class:"Raster",_applyMatrix:!1,_canApplyMatrix:!1,_boundsGetter:"getBounds",_boundsSelected:!0,_serializeFields:{crossOrigin:null,source:null},initialize:function(e,n){this._initialize(e,n!==t&&h.read(arguments,1))||("string"==typeof e?this.setSource(e):this.setImage(e)),this._size||(this._size=new l,this._loaded=!1)},_equals:function(t){return this.getSource()===t.getSource()},clone:function(t){var e=new b(m.NO_INSERT),n=this._image,i=this._canvas;if(n)e.setImage(n);else if(i){var r=Y.getCanvas(this._size);r.getContext("2d").drawImage(i,0,0),e.setImage(r)}return e._crossOrigin=this._crossOrigin,this._clone(e,t)},getSize:function(){var t=this._size;return new c(t?t.width:0,t?t.height:0,this,"setSize")},setSize:function(){var t=l.read(arguments);if(!t.equals(this._size))if(t.width>0&&t.height>0){var e=this.getElement();this.setImage(Y.getCanvas(t)),e&&this.getContext(!0).drawImage(e,0,0,t.width,t.height)}else this._canvas&&Y.release(this._canvas),this._size=t.clone()},getWidth:function(){return this._size?this._size.width:0},setWidth:function(t){this.setSize(t,this.getHeight())},getHeight:function(){return this._size?this._size.height:0},setHeight:function(t){this.setSize(this.getWidth(),t)},isEmpty:function(){var t=this._size;return!t||0===t.width&&0===t.height},getResolution:function(){var t=this._matrix,e=new h(0,0).transform(t),n=new h(1,0).transform(t).subtract(e),i=new h(0,1).transform(t).subtract(e);return new l(72/n.getLength(),72/i.getLength())},getPpi:"#getResolution",getImage:function(){return this._image},setImage:function(t){this._canvas&&Y.release(this._canvas),t&&t.getContext?(this._image=null,this._canvas=t,this._loaded=!0):(this._image=t,this._canvas=null,this._loaded=t&&t.complete),this._size=new l(t?t.naturalWidth||t.width:0,t?t.naturalHeight||t.height:0),this._context=null,this._changed(521)},getCanvas:function(){if(!this._canvas){var t=Y.getContext(this._size);try{this._image&&t.drawImage(this._image,0,0),this._canvas=t.canvas}catch(e){Y.release(t)}}return this._canvas},setCanvas:"#setImage",getContext:function(t){return this._context||(this._context=this.getCanvas().getContext("2d")),t&&(this._image=null,this._changed(513)),this._context},setContext:function(t){this._context=t},getSource:function(){return this._image&&this._image.src||this.toDataURL()},setSource:function(t){function e(){var t=i.getView();t&&(paper=t._scope,i.setImage(n),i.emit("load"),t.update())}var n,i=this,r=this._crossOrigin;n=document.getElementById(t)||new Image,r&&(n.crossOrigin=r),n.naturalWidth&&n.naturalHeight?setTimeout(e,0):(q.add(n,{load:e}),n.src||(n.src=t)),this.setImage(n)},getCrossOrigin:function(){return this._image&&this._image.crossOrigin||this._crossOrigin||""},setCrossOrigin:function(t){this._crossOrigin=t,this._image&&(this._image.crossOrigin=t)},getElement:function(){return this._canvas||this._loaded&&this._image}},{beans:!1,getSubCanvas:function(){var t=d.read(arguments),e=Y.getContext(t.getSize());return e.drawImage(this.getCanvas(),t.x,t.y,t.width,t.height,0,0,t.width,t.height),e.canvas},getSubRaster:function(){var t=d.read(arguments),e=new b(m.NO_INSERT);return e.setImage(this.getSubCanvas(t)),e.translate(t.getCenter().subtract(this.getSize().divide(2))),e._matrix.preConcatenate(this._matrix),e.insertAbove(this),e},toDataURL:function(){var t=this._image&&this._image.src;if(/^data:/.test(t))return t;var e=this.getCanvas();return e?e.toDataURL.apply(e,arguments):null},drawImage:function(t){var e=h.read(arguments,1);this.getContext(!0).drawImage(t,e.x,e.y)},getAverageColor:function(t){var n,i;t?t instanceof k?(i=t,n=t.getBounds()):t.width?n=new d(t):t.x&&(n=new d(t.x-.5,t.y-.5,1,1)):n=this.getBounds();var r=32,s=Math.min(n.width,r),a=Math.min(n.height,r),o=b._sampleContext;o?o.clearRect(0,0,r+1,r+1):o=b._sampleContext=Y.getContext(new l(r)),o.save();var h=(new f).scale(s/n.width,a/n.height).translate(-n.x,-n.y);h.applyToContext(o),i&&i.draw(o,new e({clip:!0,matrices:[h]})),this._matrix.applyToContext(o);var u=this.getElement(),c=this._size;u&&o.drawImage(u,-c.width/2,-c.height/2),o.restore();for(var _=o.getImageData(.5,.5,Math.ceil(s),Math.ceil(a)).data,g=[0,0,0],v=0,p=0,m=_.length;m>p;p+=4){var y=_[p+3];v+=y,y/=255,g[0]+=_[p]*y,g[1]+=_[p+1]*y,g[2]+=_[p+2]*y}for(var p=0;3>p;p++)g[p]/=v;return v?B.read(g):null},getPixel:function(){var t=h.read(arguments),e=this.getContext().getImageData(t.x,t.y,1,1).data;return new B("rgb",[e[0]/255,e[1]/255,e[2]/255],e[3]/255)},setPixel:function(){var t=h.read(arguments),e=B.read(arguments),n=e._convert("rgb"),i=e._alpha,r=this.getContext(!0),s=r.createImageData(1,1),a=s.data;a[0]=255*n[0],a[1]=255*n[1],a[2]=255*n[2],a[3]=null!=i?255*i:255,r.putImageData(s,t.x,t.y)},createImageData:function(){var t=l.read(arguments);return this.getContext().createImageData(t.width,t.height)},getImageData:function(){var t=d.read(arguments);return t.isEmpty()&&(t=new d(this._size)),this.getContext().getImageData(t.x,t.y,t.width,t.height)},setImageData:function(t){var e=h.read(arguments,1);this.getContext(!0).putImageData(t,e.x,e.y)},_getBounds:function(t,e){var n=new d(this._size).setCenter(0,0);return e?e._transformBounds(n):n},_hitTestSelf:function(t){if(this._contains(t)){var e=this;return new S("pixel",e,{offset:t.add(e._size.divide(2)).round(),color:{get:function(){return e.getPixel(this.offset)}}})}},_draw:function(t){var e=this.getElement();e&&(t.globalAlpha=this._opacity,t.drawImage(e,-this._size.width/2,-this._size.height/2))},_canComposite:function(){return!0}}),C=m.extend({_class:"PlacedSymbol",_applyMatrix:!1,_canApplyMatrix:!1,_boundsGetter:{getBounds:"getStrokeBounds"},_boundsSelected:!0,_serializeFields:{symbol:null},initialize:function(e,n){this._initialize(e,n!==t&&h.read(arguments,1))||this.setSymbol(e instanceof p?e:new p(e))},_equals:function(t){return this._symbol===t._symbol},getSymbol:function(){return this._symbol},setSymbol:function(t){this._symbol=t,this._changed(9)},clone:function(t){var e=new C(m.NO_INSERT);return e.setSymbol(this._symbol),this._clone(e,t)},isEmpty:function(){return this._symbol._definition.isEmpty()},_getBounds:function(t,e,n){var i=this.symbol._definition;return i._getCachedBounds(t,e&&e.chain(i._matrix),n)},_hitTestSelf:function(t,e){var n=this._symbol._definition._hitTest(t,e);return n&&(n.item=this),n},_draw:function(t,e){this.symbol._definition.draw(t,e)}}),S=e.extend({_class:"HitResult",initialize:function(t,e,n){this.type=t,this.item=e,n&&(n.enumerable=!0,this.inject(n))},statics:{getOptions:function(t){return new e({type:null,tolerance:paper.settings.hitTolerance,fill:!t,stroke:!t,segments:!t,handles:!1,ends:!1,center:!1,bounds:!1,guides:!1,selected:!1},t)}}}),P=e.extend({_class:"Segment",beans:!0,initialize:function(e,n,i,r,s,a){var o,h,u,l=arguments.length;0===l||(1===l?"point"in e?(o=e.point,h=e.handleIn,u=e.handleOut):o=e:2===l&&"number"==typeof e?o=arguments:3>=l?(o=e,h=n,u=i):(o=e!==t?[e,n]:null,h=i!==t?[i,r]:null,u=s!==t?[s,a]:null)),new M(o,this,"_point"),new M(h,this,"_handleIn"),new M(u,this,"_handleOut")},_serialize:function(t){return e.serialize(this.hasHandles()?[this._point,this._handleIn,this._handleOut]:this._point,t,!0)},_changed:function(t){var e=this._path;if(e){var n,i=e._curves,r=this._index;i&&(t&&t!==this._point&&t!==this._handleIn||!(n=r>0?i[r-1]:e._closed?i[i.length-1]:null)||n._changed(),t&&t!==this._point&&t!==this._handleOut||!(n=i[r])||n._changed()),e._changed(25)}},getPoint:function(){return this._point},setPoint:function(){var t=h.read(arguments);this._point.set(t.x,t.y)},getHandleIn:function(){return this._handleIn},setHandleIn:function(){var t=h.read(arguments);this._handleIn.set(t.x,t.y)},getHandleOut:function(){return this._handleOut},setHandleOut:function(){var t=h.read(arguments);this._handleOut.set(t.x,t.y)},hasHandles:function(){return!this._handleIn.isZero()||!this._handleOut.isZero()},clearHandles:function(){this._handleIn.set(0,0),this._handleOut.set(0,0)},_selectionState:0,isSelected:function(t){var e=this._selectionState;return t?t===this._point?!!(4&e):t===this._handleIn?!!(1&e):t===this._handleOut?!!(2&e):!1:!!(7&e)},setSelected:function(t,e){var n=this._path,t=!!t,i=this._selectionState,r=i,s=e?e===this._point?4:e===this._handleIn?1:e===this._handleOut?2:0:7;t?i|=s:i&=~s,this._selectionState=i,n&&i!==r&&(n._updateSelection(this,r,i),n._changed(129))},getIndex:function(){return this._index!==t?this._index:null},getPath:function(){return this._path||null},getCurve:function(){var t=this._path,e=this._index;return t?(e>0&&!t._closed&&e===t._segments.length-1&&e--,t.getCurves()[e]||null):null},getLocation:function(){var t=this.getCurve();return t?new z(t,this===t._segment1?0:1):null},getNext:function(){var t=this._path&&this._path._segments;return t&&(t[this._index+1]||this._path._closed&&t[0])||null},getPrevious:function(){var t=this._path&&this._path._segments;return t&&(t[this._index-1]||this._path._closed&&t[t.length-1])||null},isFirst:function(){return 0===this._index},isLast:function(){var t=this._path;return t&&this._index===t._segments.length-1||!1},reverse:function(){var t=this._handleIn,e=this._handleOut,n=t._x,i=t._y;t.set(e._x,e._y),e.set(n,i)},reversed:function(){return new P(this._point,this._handleOut,this._handleIn)},remove:function(){return this._path?!!this._path.removeSegment(this._index):!1},clone:function(){return new P(this._point,this._handleIn,this._handleOut)},equals:function(t){return t===this||t&&this._class===t._class&&this._point.equals(t._point)&&this._handleIn.equals(t._handleIn)&&this._handleOut.equals(t._handleOut)||!1},toString:function(){var t=["point: "+this._point];return this._handleIn.isZero()||t.push("handleIn: "+this._handleIn),this._handleOut.isZero()||t.push("handleOut: "+this._handleOut),"{ "+t.join(", ")+" }"},transform:function(t){this._transformCoordinates(t,Array(6),!0),this._changed()},_transformCoordinates:function(t,e,n){var i=this._point,r=n&&this._handleIn.isZero()?null:this._handleIn,s=n&&this._handleOut.isZero()?null:this._handleOut,a=i._x,o=i._y,h=2;return e[0]=a,e[1]=o,r&&(e[h++]=r._x+a,e[h++]=r._y+o),s&&(e[h++]=s._x+a,e[h++]=s._y+o),t&&(t._transformCoordinates(e,e,h/2),a=e[0],o=e[1],n?(i._x=a,i._y=o,h=2,r&&(r._x=e[h++]-a,r._y=e[h++]-o),s&&(s._x=e[h++]-a,s._y=e[h++]-o)):(r||(e[h++]=a,e[h++]=o),s||(e[h++]=a,e[h++]=o))),e}}),M=h.extend({initialize:function(e,n,i){var r,s,a;if(e)if((r=e[0])!==t)s=e[1];else{var o=e;(r=o.x)===t&&(o=h.read(arguments),r=o.x),s=o.y,a=o.selected}else r=s=0;this._x=r,this._y=s,this._owner=n,n[i]=this,a&&this.setSelected(!0)},set:function(t,e){return this._x=t,this._y=e,this._owner._changed(this),this},_serialize:function(t){var e=t.formatter,n=e.number(this._x),i=e.number(this._y);return this.isSelected()?{x:n,y:i,selected:!0}:[n,i]},getX:function(){return this._x},setX:function(t){this._x=t,this._owner._changed(this)},getY:function(){return this._y},setY:function(t){this._y=t,this._owner._changed(this)},isZero:function(){return a.isZero(this._x)&&a.isZero(this._y)},setSelected:function(t){this._owner.setSelected(t,this)},isSelected:function(){return this._owner.isSelected(this)}}),I=e.extend({_class:"Curve",initialize:function(t,e,n,i,r,s,a,o){var h,u,l,c,d,_,f=arguments.length;3===f?(this._path=t,h=e,u=n):0===f?(h=new P,u=new P):1===f?"segment1"in t?(h=new P(t.segment1),u=new P(t.segment2)):"point1"in t?(l=t.point1,d=t.handle1,_=t.handle2,c=t.point2):Array.isArray(t)&&(l=[t[0],t[1]],c=[t[6],t[7]],d=[t[2]-t[0],t[3]-t[1]],_=[t[4]-t[6],t[5]-t[7]]):2===f?(h=new P(t),u=new P(e)):4===f?(l=t,d=e,_=n,c=i):8===f&&(l=[t,e],c=[a,o],d=[n-t,i-e],_=[r-a,s-o]),this._segment1=h||new P(l,null,d),this._segment2=u||new P(c,_,null)},_serialize:function(t){return e.serialize(this.hasHandles()?[this.getPoint1(),this.getHandle1(),this.getHandle2(),this.getPoint2()]:[this.getPoint1(),this.getPoint2()],t,!0)},_changed:function(){this._length=this._bounds=t},clone:function(){return new I(this._segment1,this._segment2)},toString:function(){var t=["point1: "+this._segment1._point];return this._segment1._handleOut.isZero()||t.push("handle1: "+this._segment1._handleOut),this._segment2._handleIn.isZero()||t.push("handle2: "+this._segment2._handleIn),t.push("point2: "+this._segment2._point),"{ "+t.join(", ")+" }"},remove:function(){var t=!1;if(this._path){var e=this._segment2,n=e._handleOut;t=e.remove(),t&&this._segment1._handleOut.set(n.x,n.y)}return t},getPoint1:function(){return this._segment1._point},setPoint1:function(){var t=h.read(arguments);this._segment1._point.set(t.x,t.y)},getPoint2:function(){return this._segment2._point},setPoint2:function(){var t=h.read(arguments);this._segment2._point.set(t.x,t.y)},getHandle1:function(){return this._segment1._handleOut},setHandle1:function(){var t=h.read(arguments);this._segment1._handleOut.set(t.x,t.y)},getHandle2:function(){return this._segment2._handleIn},setHandle2:function(){var t=h.read(arguments);this._segment2._handleIn.set(t.x,t.y)},getSegment1:function(){return this._segment1},getSegment2:function(){return this._segment2},getPath:function(){return this._path},getIndex:function(){return this._segment1._index},getNext:function(){var t=this._path&&this._path._curves;return t&&(t[this._segment1._index+1]||this._path._closed&&t[0])||null},getPrevious:function(){var t=this._path&&this._path._curves;return t&&(t[this._segment1._index-1]||this._path._closed&&t[t.length-1])||null},isFirst:function(){return 0===this._segment1._index},isLast:function(){var t=this._path;return t&&this._segment1._index===t._curves.length-1||!1},isSelected:function(){return this.getPoint1().isSelected()&&this.getHandle2().isSelected()&&this.getHandle2().isSelected()&&this.getPoint2().isSelected()},setSelected:function(t){this.getPoint1().setSelected(t),this.getHandle1().setSelected(t),this.getHandle2().setSelected(t),this.getPoint2().setSelected(t)},getValues:function(t){return I.getValues(this._segment1,this._segment2,t)},getPoints:function(){for(var t=this.getValues(),e=[],n=0;8>n;n+=2)e.push(new h(t[n],t[n+1]));return e},getLength:function(){return null==this._length&&(this._length=I.getLength(this.getValues(),0,1)),this._length},getArea:function(){return I.getArea(this.getValues())},getLine:function(){return new g(this._segment1._point,this._segment2._point)},getPart:function(t,e){return new I(I.getPart(this.getValues(),t,e))},getPartLength:function(t,e){return I.getLength(this.getValues(),t,e)},getIntersections:function(t){return I._getIntersections(this.getValues(),t&&t!==this?t.getValues():null,this,t,[],{})},_getParameter:function(e,n){return n?e:e&&e.curve===this?e.parameter:e===t&&n===t?.5:this.getParameterAt(e,0)},divide:function(t,e,n){var i=this._getParameter(t,e),r=4e-7,s=1-r,a=null;if(i>=r&&s>=i){var o=I.subdivide(this.getValues(),i),u=o[0],l=o[1],c=n||this.hasHandles(),d=this._segment1,_=this._segment2,f=this._path;c&&(d._handleOut.set(u[2]-u[0],u[3]-u[1]),_._handleIn.set(l[4]-l[6],l[5]-l[7]));var g=u[6],v=u[7],p=new P(new h(g,v),c&&new h(u[4]-g,u[5]-v),c&&new h(l[2]-g,l[3]-v));f?(f.insert(d._index+1,p),a=this.getNext()):(this._segment2=p,a=new I(p,_))}return a},split:function(t,e){return this._path?this._path.split(this._segment1._index,this._getParameter(t,e)):null},reversed:function(){return new I(this._segment2.reversed(),this._segment1.reversed())},clearHandles:function(){this._segment1._handleOut.set(0,0),this._segment2._handleIn.set(0,0)},statics:{getValues:function(t,e,n){var i=t._point,r=t._handleOut,s=e._handleIn,a=e._point,o=[i._x,i._y,i._x+r._x,i._y+r._y,a._x+s._x,a._y+s._y,a._x,a._y];return n&&n._transformCoordinates(o,o,4),o},subdivide:function(e,n){var i=e[0],r=e[1],s=e[2],a=e[3],o=e[4],h=e[5],u=e[6],l=e[7];n===t&&(n=.5);var c=1-n,d=c*i+n*s,_=c*r+n*a,f=c*s+n*o,g=c*a+n*h,v=c*o+n*u,p=c*h+n*l,m=c*d+n*f,y=c*_+n*g,w=c*f+n*v,x=c*g+n*p,b=c*m+n*w,C=c*y+n*x;return[[i,r,d,_,m,y,b,C],[b,C,w,x,v,p,u,l]]},solveCubic:function(t,e,n,i,r,s){var o=t[e],h=t[e+2],u=t[e+4],l=t[e+6],c=3*(h-o),d=3*(u-h)-c,_=l-o-c-d;return a.solveCubic(_,d,c,o-n,i,r,s)},getParameterOf:function(t,e){var n=new h(t[0],t[1]),i=new h(t[6],t[7]),r=1e-12,s=e.isClose(n,r)?0:e.isClose(i,r)?1:null;if(null!==s)return s;for(var a=[e.x,e.y],o=[],u=2e-7,l=0;2>l;l++)for(var c=I.solveCubic(t,l,a[l],o,0,1),d=0;c>d;d++)if(s=o[d],e.isClose(I.getPoint(t,s),u))return s;return e.isClose(n,u)?0:e.isClose(i,u)?1:null},getNearestParameter:function(t,e){function n(n){if(n>=0&&1>=n){var i=e.getDistance(I.getPoint(t,n),!0);if(_>i)return _=i,f=n,!0}}if(I.isStraight(t)){var i=t[0],r=t[1],s=t[6],a=t[7],o=s-i,u=a-r,l=o*o+u*u;if(0===l)return 0;var c=((e.x-i)*o+(e.y-r)*u)/l;return 1e-12>c?0:c>.999999999999?1:I.getParameterOf(t,new h(i+c*o,r+c*u))}for(var d=100,_=1/0,f=0,g=0;d>=g;g++)n(g/d);for(var v=1/(2*d);v>4e-7;)n(f-v)||n(f+v)||(v/=2);return f},getPart:function(t,e,n){var i=e>n;if(i){var r=e;e=n,n=r}return e>0&&(t=I.subdivide(t,e)[1]),1>n&&(t=I.subdivide(t,(n-e)/(1-e))[0]),i?[t[6],t[7],t[4],t[5],t[2],t[3],t[0],t[1]]:t},hasHandles:function(t){var e=a.isZero;return!(e(t[0]-t[2])&&e(t[1]-t[3])&&e(t[4]-t[6])&&e(t[5]-t[7]))},isFlatEnough:function(t,e){var n=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],h=t[6],u=t[7],l=3*r-2*n-h,c=3*s-2*i-u,d=3*a-2*h-n,_=3*o-2*u-i;return Math.max(l*l,d*d)+Math.max(c*c,_*_)<10*e*e},getArea:function(t){var e=t[0],n=t[1],i=t[6],r=t[7],s=(t[2]+e)/2,a=(t[3]+n)/2,o=(t[4]+t[6])/2,h=(t[5]+t[7])/2;return 6*((e-s)*(a+n)+(s-o)*(h+a)+(o-i)*(r+h))/10},getBounds:function(t){for(var e=t.slice(0,2),n=e.slice(),i=[0,0],r=0;2>r;r++)I._addBounds(t[r],t[r+2],t[r+4],t[r+6],r,0,e,n,i);return new d(e[0],e[1],n[0]-e[0],n[1]-e[1])},_addBounds:function(t,e,n,i,r,s,o,h,u){function l(t,e){var n=t-e,i=t+e;n<o[r]&&(o[r]=n),i>h[r]&&(h[r]=i)}var c=3*(e-n)-t+i,d=2*(t+n)-4*e,_=e-t,f=a.solveQuadratic(c,d,_,u),g=4e-7,v=1-g;l(i,0);for(var p=0;f>p;p++){var m=u[p],y=1-m;m>g&&v>m&&l(y*y*y*t+3*y*y*m*e+3*y*m*m*n+m*m*m*i,s)}}}},e.each(["getBounds","getStrokeBounds","getHandleBounds","getRoughBounds"],function(t){this[t]=function(){this._bounds||(this._bounds={});var e=this._bounds[t];if(!e){var n=this._path;e=this._bounds[t]=O[t]([this._segment1,this._segment2],!1,n&&n.getStyle())}return e.clone()}},{}),e.each({isStraight:function(t,e,n){if(e.isZero()&&n.isZero())return!0;if(t.isZero())return!1;if(e.isCollinear(t)&&n.isCollinear(t)){var i=t.dot(t),r=t.dot(e)/i,s=t.dot(n)/i;return r>=0&&1>=r&&0>=s&&s>=-1}return!1},isLinear:function(t,e,n){var i=t.divide(3);return e.equals(i)&&n.negate().equals(i)}},function(t,e){this[e]=function(){var e=this._segment1,n=this._segment2;return t(n._point.subtract(e._point),e._handleOut,n._handleIn)},this.statics[e]=function(e){var n=e[0],i=e[1],r=e[6],s=e[7];return t(new h(r-n,s-i),new h(e[2]-n,e[3]-i),new h(e[4]-r,e[5]-s))}},{statics:{},hasHandles:function(){return!this._segment1._handleOut.isZero()||!this._segment2._handleIn.isZero()},isCollinear:function(t){return t&&this.isStraight()&&t.isStraight()&&this.getLine().isCollinear(t.getLine())},isHorizontal:function(){return this.isStraight()&&Math.abs(this.getTangentAt(.5,!0).y)<1e-7},isVertical:function(){return this.isStraight()&&Math.abs(this.getTangentAt(.5,!0).x)<1e-7}}),{beans:!1,getParameterAt:function(t,e){return I.getParameterAt(this.getValues(),t,e)},getParameterOf:function(){return I.getParameterOf(this.getValues(),h.read(arguments))},getLocationAt:function(t,e){var n=e?t:this.getParameterAt(t);return null!=n&&n>=0&&1>=n?new z(this,n):null},getLocationOf:function(){return this.getLocationAt(this.getParameterOf(h.read(arguments)),!0)},getOffsetOf:function(){var t=this.getLocationOf.apply(this,arguments);return t?t.getOffset():null},getNearestLocation:function(){var t=h.read(arguments),e=this.getValues(),n=I.getNearestParameter(e,t),i=I.getPoint(e,n);return new z(this,n,i,null,t.getDistance(i))},getNearestPoint:function(){return this.getNearestLocation.apply(this,arguments).getPoint()}},new function(){var t=["getPoint","getTangent","getNormal","getWeightedTangent","getWeightedNormal","getCurvature"];return e.each(t,function(t){this[t+"At"]=function(e,n){var i=this.getValues();return I[t](i,n?e:I.getParameterAt(i,e,0))}},{statics:{evaluateMethods:t}})},new function(){function e(t){var e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],o=t[6],h=t[7],u=9*(i-s)+3*(o-e),l=6*(e+s)-12*i,c=3*(i-e),d=9*(r-a)+3*(h-n),_=6*(n+a)-12*r,f=3*(r-n);return function(t){var e=(u*t+l)*t+c,n=(d*t+_)*t+f;return Math.sqrt(e*e+n*n)}}function n(t,e){return Math.max(2,Math.min(16,Math.ceil(32*Math.abs(e-t))))}function i(t,e,n,i){if(null==e||0>e||e>1)return null;var r,s,a=t[0],o=t[1],u=t[2],l=t[3],c=t[4],d=t[5],_=t[6],f=t[7],g=4e-7,v=1-g;if(0===n&&(g>e||e>v)){var p=g>e;r=p?a:_,s=p?o:f}else{var m=3*(u-a),y=3*(c-u)-m,w=_-a-m-y,x=3*(l-o),b=3*(d-l)-x,C=f-o-x-b;if(0===n)r=((w*e+y)*e+m)*e+a,s=((C*e+b)*e+x)*e+o;else{if(g>e?(r=m,s=x):e>v?(r=3*(_-c),s=3*(f-d)):(r=(3*w*e+2*y)*e+m,s=(3*C*e+2*b)*e+x),i){0===r&&0===s&&(g>e||e>v)&&(r=c-u,s=d-l);var S=Math.sqrt(r*r+s*s);S&&(r/=S,s/=S)}if(3===n){var P=6*w*e+2*y,M=6*C*e+2*b,I=Math.pow(r*r+s*s,1.5);r=0!==I?(r*M-s*P)/I:0,s=0}}}return 2===n?new h(s,-r):new h(r,s)}return{statics:{getLength:function(i,r,s){if(r===t&&(r=0),s===t&&(s=1),0===r&&1===s&&I.isStraight(i)){var o=i[6]-i[0],h=i[7]-i[1];return Math.sqrt(o*o+h*h)}var u=e(i);return a.integrate(u,r,s,n(r,s))},getParameterAt:function(i,r,s){function o(t){return g+=a.integrate(d,s,t,n(s,t)),s=t,g-r}if(s===t&&(s=0>r?1:0),0===r)return s;var h=Math.abs,u=r>0,l=u?s:0,c=u?1:s,d=e(i),_=a.integrate(d,l,c,n(l,c));if(h(r-_)<1e-12)return u?c:l;if(h(r)>_)return null;var f=r/_,g=0;return a.findRoot(o,d,s+f,l,c,32,1e-12)},getPoint:function(t,e){return i(t,e,0,!1)},getTangent:function(t,e){return i(t,e,1,!0)},getWeightedTangent:function(t,e){return i(t,e,1,!1)},getNormal:function(t,e){return i(t,e,2,!0)},getWeightedNormal:function(t,e){return i(t,e,2,!1)},getCurvature:function(t,e){return i(t,e,3,!1).x}}}},new function(){function t(t,e,n,i,r,s,a,o,h,u,l){var c=e.startConnected,d=e.endConnected,_=4e-7,f=1-_;if(null==r&&(r=I.getParameterOf(n,s)),null!==r&&r>=(c?_:0)&&(d?f:1)>=r&&(null==h&&(h=I.getParameterOf(a,u)),null!==h&&h>=(d?_:0)&&(c?f:1)>=h)){var g=e.renormalize;if(g){var v=g(r,h);r=v[0],h=v[1]}var p=new z(i,r,s||I.getPoint(n,r),l),m=new z(o,h,u||I.getPoint(a,h),l),y=p.getPath()===m.getPath()&&p.getIndex()>m.getIndex(),w=y?m:p,x=e.include;p._intersection=m,m._intersection=p,(!x||x(w))&&z.insert(t,w,!0)}}function e(r,s,a,o,h,u,l,c,d,_,f,v,p){if(!(++p>=24)){var m,y,w=s[0],x=s[1],b=s[6],C=s[7],S=g.getSignedDistance,P=S(w,x,b,C,s[2],s[3]),M=S(w,x,b,C,s[4],s[5]),z=P*M>0?.75:4/9,k=z*Math.min(0,P,M),O=z*Math.max(0,P,M),A=S(w,x,b,C,r[0],r[1]),T=S(w,x,b,C,r[2],r[3]),N=S(w,x,b,C,r[4],r[5]),L=S(w,x,b,C,r[6],r[7]),E=n(A,T,N,L),B=E[0],j=E[1];if(null!=(m=i(B,j,k,O))&&null!=(y=i(B.reverse(),j.reverse(),k,O))){r=I.getPart(r,m,y);var D=y-m,R=l+(c-l)*m,F=l+(c-l)*y;if(f>.5&&D>.5)if(F-R>_-d){var q=I.subdivide(r,.5),V=R+(F-R)/2;e(s,q[0],o,a,h,u,d,_,R,V,D,!v,p),e(s,q[1],o,a,h,u,d,_,V,F,D,!v,p)}else{var q=I.subdivide(s,.5),V=d+(_-d)/2;e(q[0],r,o,a,h,u,d,V,R,F,D,!v,p),e(q[1],r,o,a,h,u,V,_,R,F,D,!v,p)}else if(Math.max(_-d,F-R)<1e-7){var H=R+(F-R)/2,Z=d+(_-d)/2;r=a.getValues(),s=o.getValues(),t(h,u,v?s:r,v?o:a,v?Z:H,null,v?r:s,v?a:o,v?H:Z,null)}else D>1e-12&&e(s,r,o,a,h,u,d,_,R,F,D,!v,p)}}}function n(t,e,n,i){var r,s=[0,t],a=[1/3,e],o=[2/3,n],h=[1,i],u=e-(2*t+i)/3,l=n-(t+2*i)/3;if(0>u*l)r=[[s,a,h],[s,o,h]];else{var c=u/l;r=[c>=2?[s,a,h]:.5>=c?[s,o,h]:[s,a,o,h],[s,h]]}return 0>(u||l)?r.reverse():r}function i(t,e,n,i){return t[0][1]<n?r(t,!0,n):e[0][1]>i?r(e,!1,i):t[0][0]}function r(t,e,n){for(var i=t[0][0],r=t[0][1],s=1,a=t.length;a>s;s++){var o=t[s][0],h=t[s][1];if(e?h>=n:n>=h)return h===n?o:i+(n-r)*(o-i)/(h-r);i=o,r=h}return null}function s(e,n,i,r,s,o){for(var h=I.isStraight(e),u=h?n:e,l=h?e:n,c=l[0],d=l[1],_=l[6],f=l[7],g=_-c,v=f-d,p=Math.atan2(-v,g),m=Math.sin(p),y=Math.cos(p),w=[],x=0;8>x;x+=2){var b=u[x]-c,C=u[x+1]-d;w.push(b*y-C*m,b*m+C*y)}for(var S=[],P=I.solveCubic(w,1,0,S,0,1),x=0;P>x;x++){var M=S[x],z=I.getPoint(u,M),k=I.getParameterOf(l,z);if(null!==k){var O=I.getPoint(l,k),A=h?k:M,T=h?M:k;(!o.endConnected||T>a.CURVETIME_EPSILON)&&t(s,o,e,i,A,h?O:z,n,r,T,h?z:O)}}}function o(e,n,i,r,s,a){var o=g.intersect(e[0],e[1],e[6],e[7],n[0],n[1],n[6],n[7]);o&&t(s,a,e,i,null,o,n,r,null,o)}return{statics:{_getIntersections:function(n,i,r,a,u,l){if(!i)return I._getSelfIntersection(n,r,u,l);var c=n[0],d=n[1],_=n[6],f=n[7],g=i[0],v=i[1],p=i[6],m=i[7],y=(3*n[2]+c)/4,w=(3*n[3]+d)/4,x=(3*n[4]+_)/4,b=(3*n[5]+f)/4,C=(3*i[2]+g)/4,S=(3*i[3]+v)/4,P=(3*i[4]+p)/4,M=(3*i[5]+m)/4,z=Math.min,k=Math.max;if(!(k(c,y,x,_)>=z(g,C,P,p)&&z(c,y,x,_)<=k(g,C,P,p)&&k(d,w,b,f)>=z(v,S,M,m)&&z(d,w,b,f)<=k(v,S,M,m)))return u;if(!l.startConnected&&!l.endConnected){var O=I.getOverlaps(n,i);if(O){for(var A=0;2>A;A++){var T=O[A];t(u,l,n,r,T[0],null,i,a,T[1],null,!0)}return u}}var N=I.isStraight(n),L=I.isStraight(i),E=N&&L,B=1e-12,j=u.length;if((E?o:N||L?s:e)(n,i,r,a,u,l,0,1,0,1,0,!1,0),E&&u.length>j)return u;var D=new h(c,d),R=new h(_,f),F=new h(g,v),q=new h(p,m);return D.isClose(F,B)&&t(u,l,n,r,0,D,i,a,0,F),!l.startConnected&&D.isClose(q,B)&&t(u,l,n,r,0,D,i,a,1,q),!l.endConnected&&R.isClose(F,B)&&t(u,l,n,r,1,R,i,a,0,F),R.isClose(q,B)&&t(u,l,n,r,1,R,i,a,1,q),u},_getSelfIntersection:function(t,e,n,i){var r=t[0],s=t[1],o=t[2],u=t[3],l=t[4],c=t[5],d=t[6],_=t[7],f=new g(r,s,d,_,!1),v=f.getSide(new h(o,u),!0),p=f.getSide(new h(l,c),!0);if(v===p){var m=(r-l)*(u-_)+(o-d)*(c-s);if(m*v>0)return n}var y=d-3*l+3*o-r,w=l-2*o+r,x=o-r,b=_-3*c+3*u-s,C=c-2*u+s,S=u-s,P=b*x-y*S,M=b*w-y*C,z=C*x-w*S;if(0>P*P-4*M*z){var k,O=[],A=a.solveCubic(y*y+b*b,3*(y*w+b*C),2*(w*w+C*C)+y*x+b*S,w*x+C*S,O,0,1);if(A>0){for(var T=0,N=0;A>T;T++){var L=Math.abs(e.getCurvatureAt(O[T],!0));L>N&&(N=L,k=O[T])}var E=I.subdivide(t,k);i.endConnected=!0,i.renormalize=function(t,e){return[t*k,e*(1-k)+k]},I._getIntersections(E[0],E[1],e,e,n,i)}}return n},getOverlaps:function(t,e){function n(t){var e=t[6]-t[0],n=t[7]-t[1];return e*e+n*n}var i=Math.abs,r=4e-7,s=2e-7,a=I.isStraight(t),o=I.isStraight(e),u=a&&o;if(u){var l=n(t)<n(e),c=l?e:t,d=l?t:e,_=new g(c[0],c[1],c[6],c[7]);if(_.getDistance(new h(d[0],d[1]))>s||_.getDistance(new h(d[6],d[7]))>s)return null}else if(a^o)return null;for(var f=[t,e],v=[],p=0,m=0;2>p&&v.length<2;p+=0===m?0:1,m=1^m){var y=I.getParameterOf(f[1^p],new h(f[p][0===m?0:6],f[p][0===m?1:7]));if(null!=y){var w=0===p?[m,y]:[y,m];(0===v.length||i(w[0]-v[0][0])>r&&i(w[1]-v[0][1])>r)&&v.push(w)}if(1===p&&0===v.length)break}if(2!==v.length)v=null;else if(!u){var x=I.getPart(t,v[0][0],v[1][0]),b=I.getPart(e,v[0][1],v[1][1]);(i(b[2]-x[2])>s||i(b[3]-x[3])>s||i(b[4]-x[4])>s||i(b[5]-x[5])>s)&&(v=null)}return v}}}}),z=e.extend({_class:"CurveLocation",beans:!0,initialize:function ft(t,e,n,i,r){if(e>.9999996){var s=t.getNext();s&&(e=0,t=s)}this._id=o.get(ft),this._setCurve(t),this._parameter=e,this._point=n||t.getPointAt(e,!0),this._overlap=i,this._distance=r,this._intersection=this._next=this._prev=null},_setCurve:function(t){var e=t._path;
this._version=e?e._version:0,this._curve=t,this._segment=null,this._segment1=t._segment1,this._segment2=t._segment2},_setSegment:function(t){this._setCurve(t.getCurve()),this._segment=t,this._parameter=t===this._segment1?0:1,this._point=t._point.clone()},getSegment:function(){var t=this.getCurve(),e=this._segment;if(!e){var n=this.getParameter();0===n?e=t._segment1:1===n?e=t._segment2:null!=n&&(e=t.getPartLength(0,n)<t.getPartLength(n,1)?t._segment1:t._segment2),this._segment=e}return e},getCurve:function(){function e(e){var n=e&&e.getCurve();return n&&null!=(r._parameter=n.getParameterOf(r._point))?(r._setCurve(n),r._segment=e,n):t}var n=this._curve,i=n&&n._path,r=this;return i&&i._version!==this._version&&(n=this._parameter=this._curve=this._offset=null),n||e(this._segment)||e(this._segment1)||e(this._segment2.getPrevious())},getPath:function(){var t=this.getCurve();return t&&t._path},getIndex:function(){var t=this.getCurve();return t&&t.getIndex()},getParameter:function(){var t=this.getCurve(),e=this._parameter;return t&&null==e?this._parameter=t.getParameterOf(this._point):e},getPoint:function(){return this._point},getOffset:function(){var t=this._offset;if(null==t){t=0;var e=this.getPath(),n=this.getIndex();if(e&&null!=n)for(var i=e.getCurves(),r=0;n>r;r++)t+=i[r].getLength();this._offset=t+=this.getCurveOffset()}return t},getCurveOffset:function(){var t=this.getCurve(),e=this.getParameter();return null!=e&&t&&t.getPartLength(0,e)},getIntersection:function(){return this._intersection},getDistance:function(){return this._distance},divide:function(){var t=this.getCurve(),e=null;return t&&(e=t.divide(this.getParameter(),!0),e&&this._setSegment(e._segment1)),e},split:function(){var t=this.getCurve();return t?t.split(this.getParameter(),!0):null},equals:function(t,e){var n=this===t,i=2e-7;if(!n&&t instanceof z&&this.getPath()===t.getPath()&&this.getPoint().isClose(t.getPoint(),i)){var r=this.getCurve(),s=t.getCurve(),a=Math.abs,o=a((r.isLast()&&s.isFirst()?-1:r.getIndex())+this.getParameter()-((s.isLast()&&r.isFirst()?-1:s.getIndex())+t.getParameter()));n=(4e-7>o||(o=a(this.getOffset()-t.getOffset()))<i||a(this.getPath().getLength()-o)<i)&&(e||!this._intersection&&!t._intersection||this._intersection&&this._intersection.equals(t._intersection,!0))}return n},toString:function(){var t=[],e=this.getPoint(),n=s.instance;e&&t.push("point: "+e);var i=this.getIndex();null!=i&&t.push("index: "+i);var r=this.getParameter();return null!=r&&t.push("parameter: "+n.number(r)),null!=this._distance&&t.push("distance: "+n.number(this._distance)),"{ "+t.join(", ")+" }"},isTouching:function(){var t=this._intersection;if(t&&this.getTangent().isCollinear(t.getTangent())){var e=this.getCurve(),n=t.getCurve();return!(e.isStraight()&&n.isStraight()&&e.getLine().intersect(n.getLine()))}return!1},isCrossing:function(){function t(t,e,n){return n>e?t>e&&n>t:t>e&&l>=t||t>=-l&&n>t}var e=this._intersection;if(!e)return!1;var n=this.getParameter(),i=e.getParameter(),r=4e-7,s=1-r;if(n>=r&&s>=n||i>=r&&s>=i)return!this.isTouching();var a=this.getCurve(),o=a.getPrevious(),h=e.getCurve(),u=h.getPrevious(),l=Math.PI;if(!o||!u)return!1;var c=o.getTangentAt(s,!0).negate().getAngleInRadians(),d=a.getTangentAt(r,!0).getAngleInRadians(),_=u.getTangentAt(s,!0).negate().getAngleInRadians(),f=h.getTangentAt(r,!0).getAngleInRadians();return t(_,c,d)^t(f,c,d)&&t(_,d,c)^t(f,d,c)},isOverlap:function(){return!!this._overlap}},e.each(I.evaluateMethods,function(t){var e=t+"At";this[t]=function(){var t=this.getParameter(),n=this.getCurve();return null!=t&&n&&n[e](t,!0)}},{preserve:!0}),new function(){function t(t,e,n){function i(n,i){for(var s=n+i;s>=-1&&r>=s;s+=i){var a=t[(s%r+r)%r];if(!e.getPoint().isClose(a.getPoint(),2e-7))break;if(e.equals(a))return a}return null}for(var r=t.length,s=0,a=r-1;a>=s;){var o,h=s+a>>>1,u=t[h];if(n&&(o=e.equals(u)?u:i(h,-1)||i(h,1)))return e._overlap&&(o._overlap=o._intersection._overlap=!0),o;var l=e.getPath(),c=u.getPath(),d=l===c?e.getIndex()+e.getParameter()-(u.getIndex()+u.getParameter()):l._id-c._id;0>d?a=h-1:s=h+1}return t.splice(s,0,e),e}return{statics:{insert:t,expand:function(e){for(var n=e.slice(),i=0,r=e.length;r>i;i++)t(n,e[i]._intersection,!1);return n}}}}),k=m.extend({_class:"PathItem",initialize:function(){},getIntersections:function(t,e,n,i){var r=this===t||!t,s=this._matrix.orNullIfIdentity(),a=r?s:(n||t._matrix).orNullIfIdentity();if(!r&&!this.getBounds(s).touches(t.getBounds(a)))return[];for(var o,t,h=this.getCurves(),u=r?h:t.getCurves(),l=h.length,c=r?l:u.length,d=[],_=[],f=0;c>f;f++)d[f]=u[f].getValues(a);for(var f=0;l>f;f++){var g=h[f],v=r?d[f]:g.getValues(s),p=g.getPath();p!==t&&(t=p,o=[],_.push(o)),r&&I._getSelfIntersection(v,g,o,{include:e,startConnected:1===l&&g.getPoint1().equals(g.getPoint2())});for(var m=r?f+1:0;c>m;m++){if(i&&o.length)return o;var y=u[m];I._getIntersections(v,d[m],g,y,o,{include:e,startConnected:r&&g.getPrevious()===y,endConnected:r&&g.getNext()===y})}}o=[];for(var f=0,w=_.length;w>f;f++)o.push.apply(o,_[f]);return o},getCrossings:function(t){return this.getIntersections(t,function(t){return t.isCrossing()})},_asPathItem:function(){return this},setPathData:function(t){function e(t,e){var n=+i[t];return o&&(n+=u[e]),n}function n(t){return new h(e(t,"x"),e(t+1,"y"))}var i,r,s,a=t.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/gi),o=!1,u=new h,c=new h;this.clear();for(var d=0,_=a&&a.length;_>d;d++){var f=a[d],g=f[0],v=g.toLowerCase();i=f.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);var p=i&&i.length;switch(o=g===v,"z"!==r||/[mz]/.test(v)||this.moveTo(u=c),v){case"m":case"l":for(var m="m"===v,y=0;p>y;y+=2)this[0===y&&m?"moveTo":"lineTo"](u=n(y));s=u,m&&(c=u);break;case"h":case"v":for(var w="h"===v?"x":"y",y=0;p>y;y++)u[w]=e(y,w),this.lineTo(u);s=u;break;case"c":for(var y=0;p>y;y+=6)this.cubicCurveTo(n(y),s=n(y+2),u=n(y+4));break;case"s":for(var y=0;p>y;y+=4)this.cubicCurveTo(/[cs]/.test(r)?u.multiply(2).subtract(s):u,s=n(y),u=n(y+2)),r=v;break;case"q":for(var y=0;p>y;y+=4)this.quadraticCurveTo(s=n(y),u=n(y+2));break;case"t":for(var y=0;p>y;y+=2)this.quadraticCurveTo(s=/[qt]/.test(r)?u.multiply(2).subtract(s):u,u=n(y)),r=v;break;case"a":for(var y=0;p>y;y+=7)this.arcTo(u=n(y+5),new l(+i[y],+i[y+1]),+i[y+2],+i[y+4],+i[y+3]);break;case"z":this.closePath(!0)}r=v}},_canComposite:function(){return!(this.hasFill()&&this.hasStroke())},_contains:function(t){var e=this._getWinding(t,!1,!0);return!!("evenodd"===this.getWindingRule()?1&e:e)}}),O=k.extend({_class:"Path",_serializeFields:{segments:[],closed:!1},initialize:function(e){this._closed=!1,this._segments=[],this._version=0;var n=Array.isArray(e)?"object"==typeof e[0]?e:arguments:!e||e.size!==t||e.x===t&&e.point===t?null:arguments;n&&n.length>0?this.setSegments(n):(this._curves=t,this._selectedSegmentState=0,n||"string"!=typeof e||(this.setPathData(e),e=null)),this._initialize(!n&&e)},_equals:function(t){return this._closed===t._closed&&e.equals(this._segments,t._segments)},clone:function(e){var n=new O(m.NO_INSERT);return n.setSegments(this._segments),n._closed=this._closed,this._clockwise!==t&&(n._clockwise=this._clockwise),this._clone(n,e)},_changed:function gt(e){if(gt.base.call(this,e),8&e){var n=this._parent;if(n&&(n._currentPath=t),this._length=this._area=this._clockwise=this._monoCurves=t,16&e)this._version++;else if(this._curves)for(var i=0,r=this._curves.length;r>i;i++)this._curves[i]._changed()}else 32&e&&(this._bounds=t)},getStyle:function(){var t=this._parent;return(t instanceof A?t:this)._style},getSegments:function(){return this._segments},setSegments:function(e){var n=this.isFullySelected();this._segments.length=0,this._selectedSegmentState=0,this._curves=t,e&&e.length>0&&this._add(P.readAll(e)),n&&this.setFullySelected(!0)},getFirstSegment:function(){return this._segments[0]},getLastSegment:function(){return this._segments[this._segments.length-1]},getCurves:function(){var t=this._curves,e=this._segments;if(!t){var n=this._countCurves();t=this._curves=Array(n);for(var i=0;n>i;i++)t[i]=new I(this,e[i],e[i+1]||e[0])}return t},getFirstCurve:function(){return this.getCurves()[0]},getLastCurve:function(){var t=this.getCurves();return t[t.length-1]},isClosed:function(){return this._closed},setClosed:function(t){if(this._closed!=(t=!!t)){if(this._closed=t,this._curves){var e=this._curves.length=this._countCurves();t&&(this._curves[e-1]=new I(this,this._segments[e-1],this._segments[0]))}this._changed(25)}}},{beans:!0,getPathData:function(t,e){function n(e,n){e._transformCoordinates(t,g,!1),i=g[0],r=g[1],v?(p.push("M"+f.pair(i,r)),v=!1):(h=g[2],u=g[3],h===i&&u===r&&l===a&&c===o?n||p.push("l"+f.pair(i-a,r-o)):p.push("c"+f.pair(l-a,c-o)+" "+f.pair(h-a,u-o)+" "+f.pair(i-a,r-o))),a=i,o=r,l=g[4],c=g[5]}var i,r,a,o,h,u,l,c,d=this._segments,_=d.length,f=new s(e),g=Array(6),v=!0,p=[];if(0===_)return"";for(var m=0;_>m;m++)n(d[m]);return this._closed&&_>0&&(n(d[0],!0),p.push("z")),p.join("")}},{isEmpty:function(){return 0===this._segments.length},_transformContent:function(t){for(var e=Array(6),n=0,i=this._segments.length;i>n;n++)this._segments[n]._transformCoordinates(t,e,!0);return!0},_add:function(t,e){for(var n=this._segments,i=this._curves,r=t.length,s=null==e,e=s?n.length:e,a=0;r>a;a++){var o=t[a];o._path&&(o=t[a]=o.clone()),o._path=this,o._index=e+a,o._selectionState&&this._updateSelection(o,0,o._selectionState)}if(s)n.push.apply(n,t);else{n.splice.apply(n,[e,0].concat(t));for(var a=e+r,h=n.length;h>a;a++)n[a]._index=a}if(i){var u=this._countCurves(),l=e+r-1===u?e-1:e,c=l,d=Math.min(l+r,u);t._curves&&(i.splice.apply(i,[l,0].concat(t._curves)),c+=t._curves.length);for(var a=c;d>a;a++)i.splice(a,0,new I(this,null,null));this._adjustCurves(l,d)}return this._changed(25),t},_adjustCurves:function(t,e){for(var n,i=this._segments,r=this._curves,s=t;e>s;s++)n=r[s],n._path=this,n._segment1=i[s],n._segment2=i[s+1]||i[0],n._changed();(n=r[this._closed&&0===t?i.length-1:t-1])&&(n._segment2=i[t]||i[0],n._changed()),(n=r[e])&&(n._segment1=i[e],n._changed())},_countCurves:function(){var t=this._segments.length;return!this._closed&&t>0?t-1:t},add:function(t){return arguments.length>1&&"number"!=typeof t?this._add(P.readAll(arguments)):this._add([P.read(arguments)])[0]},insert:function(t,e){return arguments.length>2&&"number"!=typeof e?this._add(P.readAll(arguments,1),t):this._add([P.read(arguments,1)],t)[0]},addSegment:function(){return this._add([P.read(arguments)])[0]},insertSegment:function(t){return this._add([P.read(arguments,1)],t)[0]},addSegments:function(t){return this._add(P.readAll(t))},insertSegments:function(t,e){return this._add(P.readAll(e),t)},removeSegment:function(t){return this.removeSegments(t,t+1)[0]||null},removeSegments:function(t,n,i){t=t||0,n=e.pick(n,this._segments.length);var r=this._segments,s=this._curves,a=r.length,o=r.splice(t,n-t),h=o.length;if(!h)return o;for(var u=0;h>u;u++){var l=o[u];l._selectionState&&this._updateSelection(l,l._selectionState,0),l._index=l._path=null}for(var u=t,c=r.length;c>u;u++)r[u]._index=u;if(s){var d=t>0&&n===a+(this._closed?1:0)?t-1:t,s=s.splice(d,h);i&&(o._curves=s.slice(1)),this._adjustCurves(d,d)}return this._changed(25),o},clear:"#removeSegments",hasHandles:function(){for(var t=this._segments,e=0,n=t.length;n>e;e++)if(t[e].hasHandles())return!0;return!1},clearHandles:function(){for(var t=this._segments,e=0,n=t.length;n>e;e++)t[e].clearHandles()},getLength:function(){if(null==this._length){for(var t=this.getCurves(),e=0,n=0,i=t.length;i>n;n++)e+=t[n].getLength();this._length=e}return this._length},getArea:function(){if(null==this._area){for(var t=this._segments,e=t.length,n=e-1,i=0,r=0,s=this._closed?e:n;s>r;r++)i+=I.getArea(I.getValues(t[r],t[n>r?r+1:0]));this._area=i}return this._area},isClockwise:function(){return this._clockwise!==t?this._clockwise:this.getArea()>=0},setClockwise:function(t){this.isClockwise()!=(t=!!t)&&this.reverse(),this._clockwise=t},isFullySelected:function(){var t=this._segments.length;return this._selected&&t>0&&this._selectedSegmentState===7*t},setFullySelected:function(t){t&&this._selectSegments(!0),this.setSelected(t)},setSelected:function vt(t){t||this._selectSegments(!1),vt.base.call(this,t)},_selectSegments:function(t){var e=this._segments.length;this._selectedSegmentState=t?7*e:0;for(var n=0;e>n;n++)this._segments[n]._selectionState=t?7:0},_updateSelection:function(t,e,n){t._selectionState=n;var i=this._selectedSegmentState+=n-e;i>0&&this.setSelected(!0)},flatten:function(t){for(var e=new T(this,64,.1),n=0,i=e.length/Math.ceil(e.length/t),r=e.length+(this._closed?-i:i)/2,s=[];r>=n;)s.push(new P(e.getPointAt(n))),n+=i;this.setSegments(s)},reduce:function(){for(var t=this.getCurves(),e=t.length-1;e>=0;e--){var n=t[e];n.hasHandles()||0!==n.getLength()&&!n.isCollinear(n.getNext())||n.remove()}return this},simplify:function(t){if(this._segments.length>2){var e=new N(this,t||2.5);this.setSegments(e.fit())}},split:function(t,e){if(null===e)return null;if(1===arguments.length){var n=t;if("number"==typeof n&&(n=this.getLocationAt(n)),!n)return null;t=n.index,e=n.parameter}var i=4e-7,r=1-i;e>=r&&(t++,e--);var s=this.getCurves();if(t>=0&&t<s.length){e>=i&&s[t++].divide(e,!0);var a,o=this.removeSegments(t,this._segments.length,!0);return this._closed?(this.setClosed(!1),a=this):(a=new O(m.NO_INSERT),a.insertAbove(this,!0),this._clone(a)),a._add(o,0),this.addSegment(o[0]),a}return null},reverse:function(){this._segments.reverse();for(var e=0,n=this._segments.length;n>e;e++){var i=this._segments[e],r=i._handleIn;i._handleIn=i._handleOut,i._handleOut=r,i._index=e}this._curves=null,this._clockwise!==t&&(this._clockwise=!this._clockwise),this._changed(9)},join:function(t){if(t){var e=t._segments,n=this.getLastSegment(),i=t.getLastSegment();if(!i)return this;n&&n._point.equals(i._point)&&t.reverse();var r=t.getFirstSegment();if(n&&n._point.equals(r._point))n.setHandleOut(r._handleOut),this._add(e.slice(1));else{var s=this.getFirstSegment();s&&s._point.equals(r._point)&&t.reverse(),i=t.getLastSegment(),s&&s._point.equals(i._point)?(s.setHandleIn(i._handleIn),this._add(e.slice(0,e.length-1),0)):this._add(e.slice())}t._closed&&this._add([e[0]]),t.remove()}var a=this.getFirstSegment(),o=this.getLastSegment();return a!==o&&a._point.equals(o._point)&&(a.setHandleIn(o._handleIn),o.remove(),this.setClosed(!0)),this},toShape:function(t){function e(t,e){var n=c[t],i=n.getNext(),r=c[e],s=r.getNext();return n._handleOut.isZero()&&i._handleIn.isZero()&&r._handleOut.isZero()&&s._handleIn.isZero()&&i._point.subtract(n._point).isCollinear(s._point.subtract(r._point))}function n(t){var e=c[t],n=e.getPrevious(),i=e.getNext();return n._handleOut.isZero()&&e._handleIn.isZero()&&e._handleOut.isZero()&&i._handleIn.isZero()&&e._point.subtract(n._point).isOrthogonal(i._point.subtract(e._point))}function i(t){var e=c[t],n=e.getNext(),i=e._handleOut,r=n._handleIn,s=.5522847498307936;if(i.isOrthogonal(r)){var o=e._point,h=n._point,u=new g(o,i,!0).intersect(new g(h,r,!0),!0);return u&&a.isZero(i.getLength()/u.subtract(o).getLength()-s)&&a.isZero(r.getLength()/u.subtract(h).getLength()-s)}return!1}function r(t,e){return c[t]._point.getDistance(c[e]._point)}if(!this._closed)return null;var s,o,h,u,c=this._segments;if(!this.hasHandles()&&4===c.length&&e(0,2)&&e(1,3)&&n(1)?(s=x.Rectangle,o=new l(r(0,3),r(0,1)),u=c[1]._point.add(c[2]._point).divide(2)):8===c.length&&i(0)&&i(2)&&i(4)&&i(6)&&e(1,5)&&e(3,7)?(s=x.Rectangle,o=new l(r(1,6),r(0,3)),h=o.subtract(new l(r(0,7),r(1,2))).divide(2),u=c[3]._point.add(c[4]._point).divide(2)):4===c.length&&i(0)&&i(1)&&i(2)&&i(3)&&(a.isZero(r(0,2)-r(1,3))?(s=x.Circle,h=r(0,2)/2):(s=x.Ellipse,h=new l(r(2,0)/2,r(3,1)/2)),u=c[1]._point),s){var d=this.getPosition(!0),_=this._clone(new s({center:d,size:o,radius:h,insert:!1}),t,!1);return _.rotate(u.subtract(d).getAngle()+90),_}return null},_hitTestSelf:function(t,e){function n(e,n){return t.subtract(e).divide(n).length<=1}function i(t,i,r){if(!e.selected||i.isSelected()){var s=t._point;if(i!==s&&(i=i.add(s)),n(i,w))return new S(r,f,{segment:t,point:i})}}function r(t,n){return(n||e.segments)&&i(t,t._point,"segment")||!n&&e.handles&&(i(t,t._handleIn,"handle-in")||i(t,t._handleOut,"handle-out"))}function s(t){c.add(t)}function a(e){if(("round"!==o||"round"!==u)&&(c=new O({internal:!0,closed:!0}),m||e._index>0&&e._index<p-1?"round"!==o&&(e._handleIn.isZero()||e._handleOut.isZero())&&O._addBevelJoin(e,o,P,l,s,!0):"round"!==u&&O._addSquareCap(e,u,P,s,!0),!c.isEmpty())){var i;return c.contains(t)||(i=c.getNearestLocation(t))&&n(i.getPoint(),y)}return n(e._point,w)}var o,u,l,c,d,_,f=this,g=this.getStyle(),v=this._segments,p=v.length,m=this._closed,y=e._tolerancePadding,w=y,x=e.stroke&&g.hasStroke(),b=e.fill&&g.hasFill(),C=e.curves,P=x?g.getStrokeWidth()/2:b&&e.tolerance>0||C?0:null;if(null!==P&&(P>0?(o=g.getStrokeJoin(),u=g.getStrokeCap(),l=P*g.getMiterLimit(),w=y.add(new h(P,P))):o=u="round"),!e.ends||e.segments||m){if(e.segments||e.handles)for(var M=0;p>M;M++)if(_=r(v[M]))return _}else if(_=r(v[0],!0)||r(v[p-1],!0))return _;if(null!==P){if(d=this.getNearestLocation(t)){var I=d.getParameter();0===I||1===I&&p>1?a(d.getSegment())||(d=null):n(d.getPoint(),w)||(d=null)}if(!d&&"miter"===o&&p>1)for(var M=0;p>M;M++){var z=v[M];if(t.getDistance(z._point)<=l&&a(z)){d=z.getLocation();break}}}return!d&&b&&this._contains(t)||d&&!x&&!C?new S("fill",this):d?new S(x?"stroke":"curve",this,{location:d,point:d.getPoint()}):null}},e.each(I.evaluateMethods,function(t){this[t+"At"]=function(e,n){var i=this.getLocationAt(e,n);return i&&i[t]()}},{beans:!1,getLocationOf:function(){for(var t=h.read(arguments),e=this.getCurves(),n=0,i=e.length;i>n;n++){var r=e[n].getLocationOf(t);if(r)return r}return null},getOffsetOf:function(){var t=this.getLocationOf.apply(this,arguments);return t?t.getOffset():null},getLocationAt:function(t,e){var n=this.getCurves(),i=0;if(e){var r=~~t,s=n[r];return s?s.getLocationAt(t-r,!0):null}for(var a=0,o=n.length;o>a;a++){var h=i,s=n[a];if(i+=s.getLength(),i>t)return s.getLocationAt(t-h)}return n.length>0&&t<=this.getLength()?new z(n[n.length-1],1):null},getNearestLocation:function(){for(var t=h.read(arguments),e=this.getCurves(),n=1/0,i=null,r=0,s=e.length;s>r;r++){var a=e[r].getNearestLocation(t);a._distance<n&&(n=a._distance,i=a)}return i},getNearestPoint:function(){return this.getNearestLocation.apply(this,arguments).getPoint()}}),new function(){function t(t,e,n,i){function r(e){var n=a[e],i=a[e+1];(c!=n||d!=i)&&(t.beginPath(),t.moveTo(c,d),t.lineTo(n,i),t.stroke(),t.beginPath(),t.arc(n,i,s,0,2*Math.PI,!0),t.fill())}for(var s=i/2,a=Array(6),o=0,h=e.length;h>o;o++){var u=e[o];u._transformCoordinates(n,a,!1);var l=u._selectionState,c=a[0],d=a[1];if(1&l&&r(2),2&l&&r(4),t.fillRect(c-s,d-s,i,i),!(4&l)){var _=t.fillStyle;t.fillStyle="#ffffff",t.fillRect(c-s+1,d-s+1,i-2,i-2),t.fillStyle=_}}}function e(t,e,n){function i(e){if(n)e._transformCoordinates(n,f,!1),r=f[0],s=f[1];else{var i=e._point;r=i._x,s=i._y}if(g)t.moveTo(r,s),g=!1;else{if(n)h=f[2],u=f[3];else{var d=e._handleIn;h=r+d._x,u=s+d._y}h===r&&u===s&&l===a&&c===o?t.lineTo(r,s):t.bezierCurveTo(l,c,h,u,r,s)}if(a=r,o=s,n)l=f[4],c=f[5];else{var d=e._handleOut;l=a+d._x,c=o+d._y}}for(var r,s,a,o,h,u,l,c,d=e._segments,_=d.length,f=Array(6),g=!0,v=0;_>v;v++)i(d[v]);e._closed&&_>0&&i(d[0])}return{_draw:function(t,n,i){function r(t){return l[(t%c+c)%c]}var s=n.dontStart,a=n.dontFinish||n.clip,o=this.getStyle(),h=o.hasFill(),u=o.hasStroke(),l=o.getDashArray(),c=!paper.support.nativeDash&&u&&l&&l.length;if(s||t.beginPath(),!s&&this._currentPath?t.currentPath=this._currentPath:(h||u&&!c||a)&&(e(t,this,i),this._closed&&t.closePath(),s||(this._currentPath=t.currentPath)),!a&&(h||u)&&(this._setStyles(t),h&&(t.fill(o.getWindingRule()),t.shadowColor="rgba(0,0,0,0)"),u)){if(c){s||t.beginPath();var d,_=new T(this,32,.25,i),f=_.length,g=-o.getDashOffset(),v=0;for(g%=f;g>0;)g-=r(v--)+r(v--);for(;f>g;)d=g+r(v++),(g>0||d>0)&&_.drawPart(t,Math.max(g,0),Math.max(d,0)),g=d+r(v++)}t.stroke()}},_drawSelected:function(n,i){n.beginPath(),e(n,this,i),n.stroke(),t(n,this._segments,i,paper.settings.handleSize)}}},new function(){function t(t){var e=t.length,n=[],i=[],r=2;n[0]=t[0]/r;for(var s=1;e>s;s++)i[s]=1/r,r=(e-1>s?4:2)-i[s],n[s]=(t[s]-n[s-1])/r;for(var s=1;e>s;s++)n[e-s-1]-=i[e-s]*n[e-s];return n}return{smooth:function(){var e=this._segments,n=e.length,i=this._closed,r=n,s=0;if(!(2>=n)){i&&(s=Math.min(n,4),r+=2*Math.min(n,s));for(var a=[],o=0;n>o;o++)a[o+s]=e[o]._point;if(i)for(var o=0;s>o;o++)a[o]=e[o+n-s]._point,a[o+n+s]=e[o]._point;else r--;for(var u=[],o=1;r-1>o;o++)u[o]=4*a[o]._x+2*a[o+1]._x;u[0]=a[0]._x+2*a[1]._x,u[r-1]=3*a[r-1]._x;for(var l=t(u),o=1;r-1>o;o++)u[o]=4*a[o]._y+2*a[o+1]._y;u[0]=a[0]._y+2*a[1]._y,u[r-1]=3*a[r-1]._y;var c=t(u);if(i){for(var o=0,d=n;s>o;o++,d++){var _=o/s,f=1-_,g=o+s,v=d+s;l[d]=l[o]*_+l[d]*f,c[d]=c[o]*_+c[d]*f,l[v]=l[g]*f+l[v]*_,c[v]=c[g]*f+c[v]*_}r--}for(var p=null,o=s;r-s>=o;o++){var m=e[o-s];p&&m.setHandleIn(p.subtract(m._point)),r>o&&(m.setHandleOut(new h(l[o],c[o]).subtract(m._point)),p=r-1>o?new h(2*a[o+1]._x-l[o+1],2*a[o+1]._y-c[o+1]):new h((a[r]._x+l[r-1])/2,(a[r]._y+c[r-1])/2))}if(i&&p){var m=this._segments[0];m.setHandleIn(p.subtract(m._point))}}}}},new function(){function t(t){var e=t._segments;if(0===e.length)throw Error("Use a moveTo() command first");return e[e.length-1]}return{moveTo:function(){var t=this._segments;1===t.length&&this.removeSegment(0),t.length||this._add([new P(h.read(arguments))])},moveBy:function(){throw Error("moveBy() is unsupported on Path items.")},lineTo:function(){this._add([new P(h.read(arguments))])},cubicCurveTo:function(){var e=h.read(arguments),n=h.read(arguments),i=h.read(arguments),r=t(this);r.setHandleOut(e.subtract(r._point)),this._add([new P(i,n.subtract(i))])},quadraticCurveTo:function(){var e=h.read(arguments),n=h.read(arguments),i=t(this)._point;this.cubicCurveTo(e.add(i.subtract(e).multiply(1/3)),e.add(n.subtract(e).multiply(1/3)),n)},curveTo:function(){var n=h.read(arguments),i=h.read(arguments),r=e.pick(e.read(arguments),.5),s=1-r,a=t(this)._point,o=n.subtract(a.multiply(s*s)).subtract(i.multiply(r*r)).divide(2*r*s);if(o.isNaN())throw Error("Cannot put a curve through points with parameter = "+r);this.quadraticCurveTo(o,i)},arcTo:function(){var n,i,r,s,a,o=t(this),u=o._point,c=h.read(arguments),d=e.peek(arguments),_=e.pick(d,!0);if("boolean"==typeof _)var v=u.add(c).divide(2),n=v.add(v.subtract(u).rotate(_?-90:90));else if(e.remain(arguments)<=2)n=c,c=h.read(arguments);else{var p=l.read(arguments);if(p.isZero())return this.lineTo(c);var m=e.read(arguments),_=!!e.read(arguments),y=!!e.read(arguments),v=u.add(c).divide(2),w=u.subtract(v).rotate(-m),x=w.x,b=w.y,C=Math.abs,S=C(p.width),M=C(p.height),I=S*S,z=M*M,k=x*x,O=b*b,A=Math.sqrt(k/I+O/z);if(A>1&&(S*=A,M*=A,I=S*S,z=M*M),A=(I*z-I*O-z*k)/(I*O+z*k),C(A)<1e-12&&(A=0),0>A)throw Error("Cannot create an arc with the given arguments");i=new h(S*b/M,-M*x/S).multiply((y===_?-1:1)*Math.sqrt(A)).rotate(m).add(v),a=(new f).translate(i).rotate(m).scale(S,M),s=a._inverseTransform(u),r=s.getDirectedAngle(a._inverseTransform(c)),!_&&r>0?r-=360:_&&0>r&&(r+=360)}if(n){var T=new g(u.add(n).divide(2),n.subtract(u).rotate(90),!0),N=new g(n.add(c).divide(2),c.subtract(n).rotate(90),!0),L=new g(u,c),E=L.getSide(n);if(i=T.intersect(N,!0),!i){if(!E)return this.lineTo(c);throw Error("Cannot create an arc with the given arguments")}s=u.subtract(i),r=s.getDirectedAngle(c.subtract(i));var B=L.getSide(i);0===B?r=E*Math.abs(r):E===B&&(r+=0>r?360:-360)}for(var j=Math.abs(r),D=j>=360?4:Math.ceil(j/90),R=r/D,F=R*Math.PI/360,q=4/3*Math.sin(F)/(1+Math.cos(F)),V=[],H=0;D>=H;H++){var w=c,Z=null;if(D>H&&(Z=s.rotate(90).multiply(q),a?(w=a._transformPoint(s),Z=a._transformPoint(s.add(Z)).subtract(w)):w=i.add(s)),0===H)o.setHandleOut(Z);else{var W=s.rotate(-90).multiply(q);a&&(W=a._transformPoint(s.add(W)).subtract(w)),V.push(new P(w,W,Z))}s=s.rotate(R)}this._add(V)},lineBy:function(){var e=h.read(arguments),n=t(this)._point;this.lineTo(n.add(e))},curveBy:function(){var n=h.read(arguments),i=h.read(arguments),r=e.read(arguments),s=t(this)._point;this.curveTo(s.add(n),s.add(i),r)},cubicCurveBy:function(){var e=h.read(arguments),n=h.read(arguments),i=h.read(arguments),r=t(this)._point;this.cubicCurveTo(r.add(e),r.add(n),r.add(i))},quadraticCurveBy:function(){var e=h.read(arguments),n=h.read(arguments),i=t(this)._point;this.quadraticCurveTo(i.add(e),i.add(n))},arcBy:function(){var n=t(this)._point,i=n.add(h.read(arguments)),r=e.pick(e.peek(arguments),!0);"boolean"==typeof r?this.arcTo(i,r):this.arcTo(i,n.add(h.read(arguments)))},closePath:function(t){this.setClosed(!0),t&&this.join()}}},{_getBounds:function(t,e){return O[t](this._segments,this._closed,this.getStyle(),e)},statics:{getBounds:function(t,e,n,i,r){function s(t){t._transformCoordinates(i,o,!1);for(var e=0;2>e;e++)I._addBounds(h[e],h[e+4],o[e+2],o[e],e,r?r[e]:0,u,l,c);var n=h;h=o,o=n}var a=t[0];if(!a)return new d;for(var o=Array(6),h=a._transformCoordinates(i,Array(6),!1),u=h.slice(0,2),l=u.slice(),c=Array(2),_=1,f=t.length;f>_;_++)s(t[_]);return e&&s(a),new d(u[0],u[1],l[0]-u[0],l[1]-u[1])},getStrokeBounds:function(t,e,n,i){function r(t){_=_.include(i?i._transformPoint(t,t):t)}function s(t){_=_.unite(p.setCenter(i?i._transformPoint(t._point):t._point))}function a(t,e){var n=t._handleIn,i=t._handleOut;"round"===e||!n.isZero()&&!i.isZero()&&n.isCollinear(i)?s(t):O._addBevelJoin(t,e,u,v,r)}function o(t,e){"round"===e?s(t):O._addSquareCap(t,e,u,r)}if(!n.hasStroke())return O.getBounds(t,e,n,i);for(var h=t.length-(e?0:1),u=n.getStrokeWidth()/2,c=O._getPenPadding(u,i),_=O.getBounds(t,e,n,i,c),f=n.getStrokeJoin(),g=n.getStrokeCap(),v=u*n.getMiterLimit(),p=new d(new l(c).multiply(2)),m=1;h>m;m++)a(t[m],f);return e?a(t[0],f):h>0&&(o(t[0],g),o(t[t.length-1],g)),_},_getPenPadding:function(t,e){if(!e)return[t,t];var n=e.shiftless(),i=n.transform(new h(t,0)),r=n.transform(new h(0,t)),s=i.getAngleInRadians(),a=i.getLength(),o=r.getLength(),u=Math.sin(s),l=Math.cos(s),c=Math.tan(s),d=-Math.atan(o*c/a),_=Math.atan(o/(c*a));return[Math.abs(a*Math.cos(d)*l-o*Math.sin(d)*u),Math.abs(o*Math.sin(_)*l+a*Math.cos(_)*u)]},_addBevelJoin:function(t,e,n,i,r,s){var a=t.getCurve(),o=a.getPrevious(),u=a.getPointAt(0,!0),l=o.getNormalAt(1,!0),c=a.getNormalAt(0,!0),d=l.getDirectedAngle(c)<0?-n:n;if(l.setLength(d),c.setLength(d),s&&(r(u),r(u.add(l))),"miter"===e){var _=new g(u.add(l),new h(-l.y,l.x),!0).intersect(new g(u.add(c),new h(-c.y,c.x),!0),!0);if(_&&u.getDistance(_)<=i&&(r(_),!s))return}s||r(u.add(l)),r(u.add(c))},_addSquareCap:function(t,e,n,i,r){var s=t._point,a=t.getLocation(),o=a.getNormal().multiply(n);r&&(i(s.subtract(o)),i(s.add(o))),"square"===e&&(s=s.add(o.rotate(0===a.getParameter()?-90:90))),i(s.add(o)),i(s.subtract(o))},getHandleBounds:function(t,e,n,i,r,s){for(var a=Array(6),o=1/0,h=-o,u=o,l=h,c=0,_=t.length;_>c;c++){var f=t[c];f._transformCoordinates(i,a,!1);for(var g=0;6>g;g+=2){var v=0===g?s:r,p=v?v[0]:0,m=v?v[1]:0,y=a[g],w=a[g+1],x=y-p,b=y+p,C=w-m,S=w+m;o>x&&(o=x),b>h&&(h=b),u>C&&(u=C),S>l&&(l=S)}}return new d(o,u,h-o,l-u)},getRoughBounds:function(t,e,n,i){var r=n.hasStroke()?n.getStrokeWidth()/2:0,s=r;return r>0&&("miter"===n.getStrokeJoin()&&(s=r*n.getMiterLimit()),"square"===n.getStrokeCap()&&(s=Math.max(s,r*Math.sqrt(2)))),O.getHandleBounds(t,e,n,i,O._getPenPadding(r,i),O._getPenPadding(s,i))}}});O.inject({statics:new function(){function t(t,n,i){var r=e.getNamed(i),s=new O(r&&r.insert===!1&&m.NO_INSERT);return s._add(t),s._closed=n,s.set(r)}function n(e,n,i){for(var s=Array(4),a=0;4>a;a++){var o=r[a];s[a]=new P(o._point.multiply(n).add(e),o._handleIn.multiply(n),o._handleOut.multiply(n))}return t(s,!0,i)}var i=.5522847498307936,r=[new P([-1,0],[0,i],[0,-i]),new P([0,-1],[-i,0],[i,0]),new P([1,0],[0,-i],[0,i]),new P([0,1],[i,0],[-i,0])];return{Line:function(){return t([new P(h.readNamed(arguments,"from")),new P(h.readNamed(arguments,"to"))],!1,arguments)},Circle:function(){var t=h.readNamed(arguments,"center"),i=e.readNamed(arguments,"radius");return n(t,new l(i),arguments)},Rectangle:function(){var e,n=d.readNamed(arguments,"rectangle"),r=l.readNamed(arguments,"radius",0,{readNull:!0}),s=n.getBottomLeft(!0),a=n.getTopLeft(!0),o=n.getTopRight(!0),h=n.getBottomRight(!0);if(!r||r.isZero())e=[new P(s),new P(a),new P(o),new P(h)];else{r=l.min(r,n.getSize(!0).divide(2));var u=r.width,c=r.height,_=u*i,f=c*i;e=[new P(s.add(u,0),null,[-_,0]),new P(s.subtract(0,c),[0,f]),new P(a.add(0,c),null,[0,-f]),new P(a.add(u,0),[-_,0],null),new P(o.subtract(u,0),null,[_,0]),new P(o.add(0,c),[0,-f],null),new P(h.subtract(0,c),null,[0,f]),new P(h.subtract(u,0),[_,0])]}return t(e,!0,arguments)},RoundRectangle:"#Rectangle",Ellipse:function(){var t=x._readEllipse(arguments);return n(t.center,t.radius,arguments)},Oval:"#Ellipse",Arc:function(){var t=h.readNamed(arguments,"from"),n=h.readNamed(arguments,"through"),i=h.readNamed(arguments,"to"),r=e.getNamed(arguments),s=new O(r&&r.insert===!1&&m.NO_INSERT);return s.moveTo(t),s.arcTo(n,i),s.set(r)},RegularPolygon:function(){for(var n=h.readNamed(arguments,"center"),i=e.readNamed(arguments,"sides"),r=e.readNamed(arguments,"radius"),s=360/i,a=!(i%3),o=new h(0,a?-r:r),u=a?-1:.5,l=Array(i),c=0;i>c;c++)l[c]=new P(n.add(o.rotate((c+u)*s)));return t(l,!0,arguments)},Star:function(){for(var n=h.readNamed(arguments,"center"),i=2*e.readNamed(arguments,"points"),r=e.readNamed(arguments,"radius1"),s=e.readNamed(arguments,"radius2"),a=360/i,o=new h(0,-1),u=Array(i),l=0;i>l;l++)u[l]=new P(n.add(o.rotate(a*l).multiply(l%2?s:r)));return t(u,!0,arguments)}}}});var A=k.extend({_class:"CompoundPath",_serializeFields:{children:[]},initialize:function(t){this._children=[],this._namedChildren={},this._initialize(t)||("string"==typeof t?this.setPathData(t):this.addChildren(Array.isArray(t)?t:arguments))},insertChildren:function pt(e,n,i){for(var r=n.length-1;r>=0;r--){var s=n[r];s instanceof A&&(n.splice.apply(n,[r,1].concat(s.removeChildren())),s.remove())}n=pt.base.call(this,e,n,i,O);for(var r=0,a=!i&&n&&n.length;a>r;r++){var s=n[r];s._clockwise===t&&s.setClockwise(0===s._index)}return n},reverse:function(){for(var t=this._children,e=0,n=t.length;n>e;e++)t[e].reverse()},smooth:function(){for(var t=0,e=this._children.length;e>t;t++)this._children[t].smooth()},reduce:function mt(){for(var t=this._children,e=t.length-1;e>=0;e--){var n=t[e].reduce();n.isEmpty()&&t.splice(e,1)}if(0===t.length){var n=new O(m.NO_INSERT);return n.insertAbove(this),n.setStyle(this._style),this.remove(),n}return mt.base.call(this)},isClockwise:function(){var t=this.getFirstChild();return t&&t.isClockwise()},setClockwise:function(t){this.isClockwise()!==!!t&&this.reverse()},getFirstSegment:function(){var t=this.getFirstChild();return t&&t.getFirstSegment()},getLastSegment:function(){var t=this.getLastChild();return t&&t.getLastSegment()},getCurves:function(){for(var t=this._children,e=[],n=0,i=t.length;i>n;n++)e.push.apply(e,t[n].getCurves());return e},getFirstCurve:function(){var t=this.getFirstChild();return t&&t.getFirstCurve()},getLastCurve:function(){var t=this.getLastChild();return t&&t.getFirstCurve()},getArea:function(){for(var t=this._children,e=0,n=0,i=t.length;i>n;n++)e+=t[n].getArea();return e}},{beans:!0,getPathData:function(t,e){for(var n=this._children,i=[],r=0,s=n.length;s>r;r++){var a=n[r],o=a._matrix;i.push(a.getPathData(t&&!o.isIdentity()?t.chain(o):t,e))}return i.join(" ")}},{_getChildHitTestOptions:function(t){return t["class"]===O||"path"===t.type?t:new e(t,{fill:!1})},_draw:function(t,e,n){var i=this._children;if(0!==i.length){if(this._currentPath)t.currentPath=this._currentPath;else{e=e.extend({dontStart:!0,dontFinish:!0}),t.beginPath();for(var r=0,s=i.length;s>r;r++)i[r].draw(t,e,n);this._currentPath=t.currentPath}if(!e.clip){this._setStyles(t);var a=this._style;a.hasFill()&&(t.fill(a.getWindingRule()),t.shadowColor="rgba(0,0,0,0)"),a.hasStroke()&&t.stroke()}}},_drawSelected:function(t,e,n){for(var i=this._children,r=0,s=i.length;s>r;r++){
var a=i[r],o=a._matrix;n[a._id]||a._drawSelected(t,o.isIdentity()?e:e.chain(o))}}},new function(){function t(t,e){var n=t._children;if(e&&0===n.length)throw Error("Use a moveTo() command first");return n[n.length-1]}var n={moveTo:function(){var e=t(this),n=e&&e.isEmpty()?e:new O(m.NO_INSERT);n!==e&&this.addChild(n),n.moveTo.apply(n,arguments)},moveBy:function(){var e=t(this,!0),n=e&&e.getLastSegment(),i=h.read(arguments);this.moveTo(n?i.add(n._point):i)},closePath:function(e){t(this,!0).closePath(e)}};return e.each(["lineTo","cubicCurveTo","quadraticCurveTo","curveTo","arcTo","lineBy","cubicCurveBy","quadraticCurveBy","curveBy","arcBy"],function(e){n[e]=function(){var n=t(this,!0);n[e].apply(n,arguments)}}),n});k.inject(new function(){function e(t,e){var n=t.clone(!1).reduce().transform(null,!0,!0);return e?n.resolveCrossings().reorient():n}function n(t,e,n,i,r){var s=new t(m.NO_INSERT);return s.addChildren(e,!0),r&&(s=s.reduce()),s.insertAbove(i&&n.isSibling(i)&&n.getIndex()<i.getIndex()?i:n),s.setStyle(n._style),s}function i(t,i,s){function a(t){for(var e=0,n=t.length;n>e;e++){var i=t[e];_.push.apply(_,i._segments),f.push.apply(f,i._getMonoCurves())}}if(!t._children&&!t._closed)return r(t,i,s);var h=e(t,!0),u=i&&t!==i&&e(i,!0);u&&/^(subtract|exclude)$/.test(s)^u.isClockwise()!==h.isClockwise()&&u.reverse();var d=z.expand(h.getIntersections(u,function(t){return u&&t.isOverlap()||t.isCrossing()}));o(d);var _=[],f=[];a(h._children||[h]),u&&a(u._children||[u]);for(var g=0,v=d.length;v>g;g++)l(d[g]._segment,h,u,f,s);for(var g=0,v=_.length;v>g;g++){var p=_[g];null==p._winding&&l(p,h,u,f,s)}return n(A,c(_,s),t,i,!0)}function r(i,r,s){function a(e){return h.contains(e.getPointAt(e.getLength()/2))^l?(c.unshift(e),!0):t}if(!r||!r._children&&!r._closed||!/^(subtract|intersect)$/.test(s))return null;for(var o=e(i,!1),h=e(r,!1),u=o.getIntersections(h,function(t){return t.isOverlap()||t.isCrossing()}),l="subtract"===s,c=[],d=u.length-1;d>=0;d--){var _=u[d].split();_&&(a(_)&&_.getFirstSegment().setHandleIn(0,0),o.getLastSegment().setHandleOut(0,0))}return a(o),n(y,c,i,r)}function s(t,e){for(var n=t;n;){if(n===e)return;n=n._prev}for(;t._next&&t._next!==e;)t=t._next;if(!t._next){for(;e._prev;)e=e._prev;t._next=e,e._prev=t}}function o(t){for(var e,n,i=4e-7,r=1-i,a=!1,o=[],h=t.length-1;h>=0;h--){var u=t[h],l=u._curve,c=u._parameter,d=c;l!==e?a=!l.hasHandles():n>0&&(c/=n);var _;i>c?_=l._segment1:c>r?_=l._segment2:(_=l.divide(c,!0,!0)._segment1,a&&o.push(_)),u._setSegment(_);var f=_._intersection,g=u._intersection;if(f){s(f,g);for(var v=f;v;)s(v._intersection,f),v=v._next}else _._intersection=g;e=l,n=d}for(var h=0,p=o.length;p>h;h++)o[h].clearHandles()}function u(t,e,n,i){var r=2e-7,s=4e-7,o=1-s,l=t.x,c=t.y,d=0,_=0,f=[],g=Math.abs;if(n){for(var v=-(1/0),p=1/0,m=c-r,y=c+r,w=0,x=e.length;x>w;w++){var b=e[w].values;if(I.solveCubic(b,0,l,f,0,1)>0)for(var C=f.length-1;C>=0;C--){var S=I.getPoint(b,f[C]).y;m>S&&S>v?v=S:S>y&&p>S&&(p=S)}}v=(v+c)/2,p=(p+c)/2,v>-(1/0)&&(d=u(new h(l,v),e,!1,i)),1/0>p&&(_=u(new h(l,p),e,!1,i))}else for(var P,M,z=l-r,k=l+r,O=!1,w=0,x=e.length;x>w;w++){var A=e[w],b=A.values,T=A.winding;if(T&&(1===T&&c>=b[1]&&c<=b[7]||c>=b[7]&&c<=b[1])&&1===I.solveCubic(b,1,c,f,0,1)){var N=f[0];if(!(N>o&&O&&A.next!==e[w+1]||s>N&&M>o&&A.previous===P)){var L=I.getPoint(b,N).x,E=I.getTangent(b,N).y,B=!1;a.isZero(E)&&!I.isStraight(b)||s>N&&E*I.getTangent(A.previous.values,1).y<0||N>o&&E*I.getTangent(A.next.values,0).y<0?i&&L>=z&&k>=L&&(++d,++_,B=!0):z>=L?(d+=T,B=!0):L>=k&&(_+=T,B=!0),A.previous!==e[w-1]&&(O=s>N&&B)}P=A,M=N}}return Math.max(g(d),g(_))}function l(t,e,n,i,r){var s=2e-7,a=[],o=t,h=0,l=0;do{var c=t.getCurve(),d=c.getLength();a.push({segment:t,curve:c,length:d}),h+=d,t=t.getNext()}while(t&&!t._intersection&&t!==o);for(var _=0;3>_;_++)for(var d=h*(_+1)/4,f=0,g=a.length;g>f;f++){var v=a[f],p=v.length;if(p>=d){(s>d||s>p-d)&&(d=p/2);var c=v.curve,m=c._path,y=m._parent,w=c.getPointAt(d),x=c.isHorizontal();y instanceof A&&(m=y),l+="subtract"===r&&n&&(m===e&&n._getWinding(w,x)||m===n&&!e._getWinding(w,x))?0:u(w,i,x);break}d-=p}for(var b=Math.round(l/3),C=a.length-1;C>=0;C--)a[C].segment._winding=b}function c(t,e){function n(t,e){if(t._visited)return!1;if(!l)return!0;var n=t._winding,i=t._intersection;return i&&e&&c&&i.isOverlap()&&(n=c[n]||n),l(n)}function i(t){return t===o||t===h}function r(t,e){if(!t._next)return t;for(;t;){var r=t._segment,s=r.getNext(),a=s._intersection;if(i(s)||!r._visited&&!s._visited&&(!l||(!e||n(r))&&(!(e&&a&&a.isOverlap())&&n(s)||!e&&a&&n(a._segment))))return t;t=t._next}return null}function s(t,e){for(;t;){var n=t._segment;if(i(n))return n;t=t[e?"_next":"_prev"]}}for(var o,h,u=[],l=d[e],c={unite:{1:2},intersect:{2:1}}[e],_=0,f=t.length;f>_;_++){var g=t[_],v=null,p=!1;if(n(g,!0)){for(o=h=null;!p;){var y=g._intersection,w=v&&g._handleIn;y=y&&(r(y,!0)||r(y,!1))||y;var x=y&&y._segment;if(x&&n(x)&&(g=x),g._visited){if(p=i(g),!p&&y){var b=s(y,!0)||s(y,!1);b&&(g=b,p=!0)}break}v||(v=new O(m.NO_INSERT),o=g,h=x),v.add(new P(g._point,w,g._handleOut)),g._visited=!0,g=g.getNext(),p=i(g)}p?(v.firstSegment.setHandleIn(g._handleIn),v.setClosed(!0)):v&&(console.error("Boolean operation resulted in open path","segments =",v._segments.length,"length =",v.getLength()),v=null),v&&(v._segments.length>8||!a.isZero(v.getArea()))&&(u.push(v),v=null)}}return u}var d={unite:function(t){return 1===t||0===t},intersect:function(t){return 2===t},subtract:function(t){return 1===t},exclude:function(t){return 1===t}};return{_getWinding:function(t,e,n){return u(t,this._getMonoCurves(),e,n)},unite:function(t){return i(this,t,"unite")},intersect:function(t){return i(this,t,"intersect")},subtract:function(t){return i(this,t,"subtract")},exclude:function(t){return i(this,t,"exclude")},divide:function(t){return n(y,[this.subtract(t),this.intersect(t)],this,t,!0)},resolveCrossings:function(){var t=this.getCrossings();if(!t.length)return this;o(z.expand(t));for(var e=this._children||[this],i=[],r=0,s=e.length;s>r;r++)i.push.apply(i,e[r]._segments);return n(A,c(i),this,null,!1)}}}),O.inject({_getMonoCurves:function(){function t(t){var e=t[1],r=t[7],s={values:t,winding:e===r?0:e>r?-1:1,previous:n,next:null};n&&(n.next=s),i.push(s),n=s}function e(e){if(0!==I.getLength(e)){var n=e[1],i=e[3],r=e[5],s=e[7];if(I.isStraight(e))t(e);else{var o=3*(i-r)-n+s,h=2*(n+r)-4*i,u=i-n,l=4e-7,c=1-l,d=[],_=a.solveQuadratic(o,h,u,d,l,c);if(0===_)t(e);else{d.sort();var f=d[0],g=I.subdivide(e,f);t(g[0]),_>1&&(f=(d[1]-f)/(1-f),g=I.subdivide(g[1],f),t(g[0])),t(g[1])}}}}var n,i=this._monoCurves;if(!i){i=this._monoCurves=[];for(var r=this.getCurves(),s=this._segments,o=0,h=r.length;h>o;o++)e(r[o].getValues());if(!this._closed&&s.length>1){var u=s[s.length-1]._point,l=s[0]._point,c=u._x,d=u._y,_=l._x,f=l._y;e([c,d,c,d,_,f,_,f])}if(i.length>0){var g=i[0],v=i[i.length-1];g.previous=v,v.next=g}}return i},getInteriorPoint:function(){var t=this.getBounds(),e=t.getCenter(!0);if(!this.contains(e)){for(var n=this._getMonoCurves(),i=[],r=e.y,s=[],a=0,o=n.length;o>a;a++){var h=n[a].values;if((1===n[a].winding&&r>=h[1]&&r<=h[7]||r>=h[7]&&r<=h[1])&&I.solveCubic(h,1,r,i,0,1)>0)for(var u=i.length-1;u>=0;u--)s.push(I.getPoint(h,i[u]).x);if(s.length>1)break}e.x=(s[0]+s[1])/2}return e},reorient:function(){return this.setClockwise(!0),this}}),A.inject({_getMonoCurves:function(){for(var t=this._children,e=[],n=0,i=t.length;i>n;n++)e.push.apply(e,t[n]._getMonoCurves());return e},reorient:function(){var t=this.removeChildren().sort(function(t,e){return e.getBounds().getArea()-t.getBounds().getArea()});if(t.length>0){this.addChildren(t);for(var e=t[0].isClockwise(),n=1,i=t.length;i>n;n++){for(var r=t[n].getInteriorPoint(),s=0,a=n-1;a>=0;a--)t[a].contains(r)&&s++;t[n].setClockwise(s%2===0&&e)}}return this}});var T=e.extend({_class:"PathIterator",initialize:function(t,e,n,i){function r(t,e){var n=I.getValues(t,e,i);o.push(n),s(n,t._index,0,1)}function s(t,e,i,r){if(r-i>l&&!I.isFlatEnough(t,n||.25)){var a=I.subdivide(t,.5),o=(i+r)/2;s(a[0],e,i,o),s(a[1],e,o,r)}else{var c=t[6]-t[0],d=t[7]-t[1],_=Math.sqrt(c*c+d*d);_>1e-6&&(u+=_,h.push({offset:u,value:r,index:e}))}}for(var a,o=[],h=[],u=0,l=1/(e||32),c=t._segments,d=c[0],_=1,f=c.length;f>_;_++)a=c[_],r(d,a),d=a;t._closed&&r(a,c[0]),this.curves=o,this.parts=h,this.length=u,this.index=0},getParameterAt:function(t){for(var e,n=this.index;e=n,!(0==n||this.parts[--n].offset<t););for(var i=this.parts.length;i>e;e++){var r=this.parts[e];if(r.offset>=t){this.index=e;var s=this.parts[e-1],a=s&&s.index==r.index?s.value:0,o=s?s.offset:0;return{value:a+(r.value-a)*(t-o)/(r.offset-o),index:r.index}}}var r=this.parts[this.parts.length-1];return{value:1,index:r.index}},drawPart:function(t,e,n){e=this.getParameterAt(e),n=this.getParameterAt(n);for(var i=e.index;i<=n.index;i++){var r=I.getPart(this.curves[i],i==e.index?e.value:0,i==n.index?n.value:1);i==e.index&&t.moveTo(r[0],r[1]),t.bezierCurveTo.apply(t,r.slice(2))}}},e.each(I.evaluateMethods,function(t){this[t+"At"]=function(e,n){var i=this.getParameterAt(e);return I[t](this.curves[i.index],i.value,n)}},{})),N=e.extend({initialize:function(t,e){for(var n,i=this.points=[],r=t._segments,s=0,a=r.length;a>s;s++){var o=r[s].point.clone();n&&n.equals(o)||(i.push(o),n=o)}t._closed&&(this.closed=!0,i.unshift(i[i.length-1]),i.push(i[1])),this.error=e},fit:function(){var t=this.points,e=t.length,n=this.segments=e>0?[new P(t[0])]:[];return e>1&&this.fitCubic(0,e-1,t[1].subtract(t[0]).normalize(),t[e-2].subtract(t[e-1]).normalize()),this.closed&&(n.shift(),n.pop()),n},fitCubic:function(e,n,i,r){if(n-e==1){var s=this.points[e],a=this.points[n],o=s.getDistance(a)/3;return this.addCurve([s,s.add(i.normalize(o)),a.add(r.normalize(o)),a]),t}for(var h,u=this.chordLengthParameterize(e,n),l=Math.max(this.error,this.error*this.error),c=!0,d=0;4>=d;d++){var _=this.generateBezier(e,n,u,i,r),f=this.findMaxError(e,n,_,u);if(f.error<this.error&&c)return this.addCurve(_),t;if(h=f.index,f.error>=l)break;c=this.reparameterize(e,n,u,_),l=f.error}var g=this.points[h-1].subtract(this.points[h]),v=this.points[h].subtract(this.points[h+1]),p=g.add(v).divide(2).normalize();this.fitCubic(e,h,i,p),this.fitCubic(h,n,p.negate(),r)},addCurve:function(t){var e=this.segments[this.segments.length-1];e.setHandleOut(t[1].subtract(t[0])),this.segments.push(new P(t[3],t[2].subtract(t[3])))},generateBezier:function(t,e,n,i,r){for(var s=1e-12,a=this.points[t],o=this.points[e],h=[[0,0],[0,0]],u=[0,0],l=0,c=e-t+1;c>l;l++){var d=n[l],_=1-d,f=3*d*_,g=_*_*_,v=f*_,p=f*d,m=d*d*d,y=i.normalize(v),w=r.normalize(p),x=this.points[t+l].subtract(a.multiply(g+v)).subtract(o.multiply(p+m));h[0][0]+=y.dot(y),h[0][1]+=y.dot(w),h[1][0]=h[0][1],h[1][1]+=w.dot(w),u[0]+=y.dot(x),u[1]+=w.dot(x)}var b,C,S=h[0][0]*h[1][1]-h[1][0]*h[0][1];if(Math.abs(S)>s){var P=h[0][0]*u[1]-h[1][0]*u[0],M=u[0]*h[1][1]-u[1]*h[0][1];b=M/S,C=P/S}else{var I=h[0][0]+h[0][1],z=h[1][0]+h[1][1];b=C=Math.abs(I)>s?u[0]/I:Math.abs(z)>s?u[1]/z:0}var k,O,A=o.getDistance(a),T=s*A;if(T>b||T>C)b=C=A/3;else{var N=o.subtract(a);k=i.normalize(b),O=r.normalize(C),k.dot(N)-O.dot(N)>A*A&&(b=C=A/3,k=O=null)}return[a,a.add(k||i.normalize(b)),o.add(O||r.normalize(C)),o]},reparameterize:function(t,e,n,i){for(var r=t;e>=r;r++)n[r-t]=this.findRoot(i,this.points[r],n[r-t]);for(var r=1,s=n.length;s>r;r++)if(n[r]<=n[r-1])return!1;return!0},findRoot:function(t,e,n){for(var i=[],r=[],s=0;2>=s;s++)i[s]=t[s+1].subtract(t[s]).multiply(3);for(var s=0;1>=s;s++)r[s]=i[s+1].subtract(i[s]).multiply(2);var a=this.evaluate(3,t,n),o=this.evaluate(2,i,n),h=this.evaluate(1,r,n),u=a.subtract(e),l=o.dot(o)+u.dot(h);return Math.abs(l)<1e-6?n:n-u.dot(o)/l},evaluate:function(t,e,n){for(var i=e.slice(),r=1;t>=r;r++)for(var s=0;t-r>=s;s++)i[s]=i[s].multiply(1-n).add(i[s+1].multiply(n));return i[0]},chordLengthParameterize:function(t,e){for(var n=[0],i=t+1;e>=i;i++)n[i-t]=n[i-t-1]+this.points[i].getDistance(this.points[i-1]);for(var i=1,r=e-t;r>=i;i++)n[i]/=n[r];return n},findMaxError:function(t,e,n,i){for(var r=Math.floor((e-t+1)/2),s=0,a=t+1;e>a;a++){var o=this.evaluate(3,n,i[a-t]),h=o.subtract(this.points[a]),u=h.x*h.x+h.y*h.y;u>=s&&(s=u,r=a)}return{error:s,index:r}}}),L=m.extend({_class:"TextItem",_boundsSelected:!0,_applyMatrix:!1,_canApplyMatrix:!1,_serializeFields:{content:null},_boundsGetter:"getBounds",initialize:function(n){this._content="",this._lines=[];var i=n&&e.isPlainObject(n)&&n.x===t&&n.y===t;this._initialize(i&&n,!i&&h.read(arguments))},_equals:function(t){return this._content===t._content},_clone:function yt(t,e,n){return t.setContent(this._content),yt.base.call(this,t,e,n)},getContent:function(){return this._content},setContent:function(t){this._content=""+t,this._lines=this._content.split(/\r\n|\n|\r/gm),this._changed(265)},isEmpty:function(){return!this._content},getCharacterStyle:"#getStyle",setCharacterStyle:"#setStyle",getParagraphStyle:"#getStyle",setParagraphStyle:"#setStyle"}),E=L.extend({_class:"PointText",initialize:function(){L.apply(this,arguments)},clone:function(t){return this._clone(new E(m.NO_INSERT),t)},getPoint:function(){var t=this._matrix.getTranslation();return new u(t.x,t.y,this,"setPoint")},setPoint:function(){var t=h.read(arguments);this.translate(t.subtract(this._matrix.getTranslation()))},_draw:function(t){if(this._content){this._setStyles(t);var e=this._style,n=this._lines,i=e.getLeading(),r=t.shadowColor;t.font=e.getFontStyle(),t.textAlign=e.getJustification();for(var s=0,a=n.length;a>s;s++){t.shadowColor=r;var o=n[s];e.hasFill()&&(t.fillText(o,0,0),t.shadowColor="rgba(0,0,0,0)"),e.hasStroke()&&t.strokeText(o,0,0),t.translate(0,i)}}},_getBounds:function(t,e){var n=this._style,i=this._lines,r=i.length,s=n.getJustification(),a=n.getLeading(),o=this.getView().getTextWidth(n.getFontStyle(),i),h=0;"left"!==s&&(h-=o/("center"===s?2:1));var u=new d(h,r?-.75*a:0,o,r*a);return e?e._transformBounds(u,u):u}}),B=e.extend(new function(){function t(t){var e,i=t.match(/^#(\w{1,2})(\w{1,2})(\w{1,2})$/);if(i){e=[0,0,0];for(var r=0;3>r;r++){var s=i[r+1];e[r]=parseInt(1==s.length?s+s:s,16)/255}}else if(i=t.match(/^rgba?\((.*)\)$/)){e=i[1].split(",");for(var r=0,o=e.length;o>r;r++){var s=+e[r];e[r]=3>r?s/255:s}}else{var h=a[t];if(!h){n||(n=Y.getContext(1,1),n.globalCompositeOperation="copy"),n.fillStyle="rgba(0,0,0,0)",n.fillStyle=t,n.fillRect(0,0,1,1);var u=n.getImageData(0,0,1,1).data;h=a[t]=[u[0]/255,u[1]/255,u[2]/255]}e=h.slice()}return e}var n,i={gray:["gray"],rgb:["red","green","blue"],hsb:["hue","saturation","brightness"],hsl:["hue","saturation","lightness"],gradient:["gradient","origin","destination","highlight"]},r={},a={},u=[[0,3,1],[2,0,1],[1,0,3],[1,2,0],[3,1,0],[0,1,2]],l={"rgb-hsb":function(t,e,n){var i=Math.max(t,e,n),r=Math.min(t,e,n),s=i-r,a=0===s?0:60*(i==t?(e-n)/s+(n>e?6:0):i==e?(n-t)/s+2:(t-e)/s+4);return[a,0===i?0:s/i,i]},"hsb-rgb":function(t,e,n){t=(t/60%6+6)%6;var i=Math.floor(t),r=t-i,i=u[i],s=[n,n*(1-e),n*(1-e*r),n*(1-e*(1-r))];return[s[i[0]],s[i[1]],s[i[2]]]},"rgb-hsl":function(t,e,n){var i=Math.max(t,e,n),r=Math.min(t,e,n),s=i-r,a=0===s,o=a?0:60*(i==t?(e-n)/s+(n>e?6:0):i==e?(n-t)/s+2:(t-e)/s+4),h=(i+r)/2,u=a?0:.5>h?s/(i+r):s/(2-i-r);return[o,u,h]},"hsl-rgb":function(t,e,n){if(t=(t/360%1+1)%1,0===e)return[n,n,n];for(var i=[t+1/3,t,t-1/3],r=.5>n?n*(1+e):n+e-n*e,s=2*n-r,a=[],o=0;3>o;o++){var h=i[o];0>h&&(h+=1),h>1&&(h-=1),a[o]=1>6*h?s+6*(r-s)*h:1>2*h?r:2>3*h?s+(r-s)*(2/3-h)*6:s}return a},"rgb-gray":function(t,e,n){return[.2989*t+.587*e+.114*n]},"gray-rgb":function(t){return[t,t,t]},"gray-hsb":function(t){return[0,0,t]},"gray-hsl":function(t){return[0,0,t]},"gradient-rgb":function(){return[]},"rgb-gradient":function(){return[]}};return e.each(i,function(t,n){r[n]=[],e.each(t,function(t,s){var a=e.capitalize(t),o=/^(hue|saturation)$/.test(t),u=r[n][s]="gradient"===t?function(t){var e=this._components[0];return t=j.read(Array.isArray(t)?t:arguments,0,{readNull:!0}),e!==t&&(e&&e._removeOwner(this),t&&t._addOwner(this)),t}:"gradient"===n?function(){return h.read(arguments,0,{readNull:"highlight"===t,clone:!0})}:function(t){return null==t||isNaN(t)?0:t};this["get"+a]=function(){return this._type===n||o&&/^hs[bl]$/.test(this._type)?this._components[s]:this._convert(n)[s]},this["set"+a]=function(t){this._type===n||o&&/^hs[bl]$/.test(this._type)||(this._components=this._convert(n),this._properties=i[n],this._type=n),this._components[s]=u.call(this,t),this._changed()}},this)},{_class:"Color",_readIndex:!0,initialize:function c(e){var n,s,a,h,u=Array.prototype.slice,l=arguments,d=0;Array.isArray(e)&&(l=e,e=l[0]);var _=null!=e&&typeof e;if("string"===_&&e in i&&(n=e,e=l[1],Array.isArray(e)?(s=e,a=l[2]):(this.__read&&(d=1),l=u.call(l,1),_=typeof e)),!s){if(h="number"===_?l:"object"===_&&null!=e.length?e:null){n||(n=h.length>=3?"rgb":"gray");var f=i[n].length;a=h[f],this.__read&&(d+=h===arguments?f+(null!=a?1:0):1),h.length>f&&(h=u.call(h,0,f))}else if("string"===_)n="rgb",s=t(e),4===s.length&&(a=s[3],s.length--);else if("object"===_)if(e.constructor===c){if(n=e._type,s=e._components.slice(),a=e._alpha,"gradient"===n)for(var g=1,v=s.length;v>g;g++){var p=s[g];p&&(s[g]=p.clone())}}else if(e.constructor===j)n="gradient",h=l;else{n="hue"in e?"lightness"in e?"hsl":"hsb":"gradient"in e||"stops"in e||"radial"in e?"gradient":"gray"in e?"gray":"rgb";var m=i[n],y=r[n];this._components=s=[];for(var g=0,v=m.length;v>g;g++){var w=e[m[g]];null==w&&0===g&&"gradient"===n&&"stops"in e&&(w={stops:e.stops,radial:e.radial}),w=y[g].call(this,w),null!=w&&(s[g]=w)}a=e.alpha}this.__read&&n&&(d=1)}if(this._type=n||"rgb",this._id=o.get(c),!s){this._components=s=[];for(var y=r[this._type],g=0,v=y.length;v>g;g++){var w=y[g].call(this,h&&h[g]);null!=w&&(s[g]=w)}}this._components=s,this._properties=i[this._type],this._alpha=a,this.__read&&(this.__read=d)},_serialize:function(t,n){var i=this.getComponents();return e.serialize(/^(gray|rgb)$/.test(this._type)?i:[this._type].concat(i),t,!0,n)},_changed:function(){this._canvasStyle=null,this._owner&&this._owner._changed(65)},_convert:function(t){var e;return this._type===t?this._components.slice():(e=l[this._type+"-"+t])?e.apply(this,this._components):l["rgb-"+t].apply(this,l[this._type+"-rgb"].apply(this,this._components))},convert:function(t){return new B(t,this._convert(t),this._alpha)},getType:function(){return this._type},setType:function(t){this._components=this._convert(t),this._properties=i[t],this._type=t},getComponents:function(){var t=this._components.slice();return null!=this._alpha&&t.push(this._alpha),t},getAlpha:function(){return null!=this._alpha?this._alpha:1},setAlpha:function(t){this._alpha=null==t?null:Math.min(Math.max(t,0),1),this._changed()},hasAlpha:function(){return null!=this._alpha},equals:function(t){var n=e.isPlainValue(t,!0)?B.read(arguments):t;return n===this||n&&this._class===n._class&&this._type===n._type&&this._alpha===n._alpha&&e.equals(this._components,n._components)||!1},toString:function(){for(var t=this._properties,e=[],n="gradient"===this._type,i=s.instance,r=0,a=t.length;a>r;r++){var o=this._components[r];null!=o&&e.push(t[r]+": "+(n?o:i.number(o)))}return null!=this._alpha&&e.push("alpha: "+i.number(this._alpha)),"{ "+e.join(", ")+" }"},toCSS:function(t){function e(t){return Math.round(255*(0>t?0:t>1?1:t))}var n=this._convert("rgb"),i=t||null==this._alpha?1:this._alpha;return n=[e(n[0]),e(n[1]),e(n[2])],1>i&&n.push(0>i?0:i),t?"#"+((1<<24)+(n[0]<<16)+(n[1]<<8)+n[2]).toString(16).slice(1):(4==n.length?"rgba(":"rgb(")+n.join(",")+")"},toCanvasStyle:function(t){if(this._canvasStyle)return this._canvasStyle;if("gradient"!==this._type)return this._canvasStyle=this.toCSS();var e,n=this._components,i=n[0],r=i._stops,s=n[1],a=n[2];if(i._radial){var o=a.getDistance(s),h=n[3];if(h){var u=h.subtract(s);u.getLength()>o&&(h=s.add(u.normalize(o-.1)))}var l=h||s;e=t.createRadialGradient(l.x,l.y,0,s.x,s.y,o)}else e=t.createLinearGradient(s.x,s.y,a.x,a.y);for(var c=0,d=r.length;d>c;c++){var _=r[c];e.addColorStop(_._rampPoint,_._color.toCanvasStyle())}return this._canvasStyle=e},transform:function(t){if("gradient"===this._type){for(var e=this._components,n=1,i=e.length;i>n;n++){var r=e[n];t._transformPoint(r,r,!0)}this._changed()}},statics:{_types:i,random:function(){var t=Math.random;return new B(t(),t(),t())}}})},new function(){var t={add:function(t,e){return t+e},subtract:function(t,e){return t-e},multiply:function(t,e){return t*e},divide:function(t,e){return t/e}};return e.each(t,function(t,e){this[e]=function(e){e=B.read(arguments);for(var n=this._type,i=this._components,r=e._convert(n),s=0,a=i.length;a>s;s++)r[s]=t(i[s],r[s]);return new B(n,r,null!=this._alpha?t(this._alpha,e.getAlpha()):null)}},{})}),j=e.extend({_class:"Gradient",initialize:function(t,e){this._id=o.get(),t&&this._set(t)&&(t=e=null),this._stops||this.setStops(t||["white","black"]),null==this._radial&&this.setRadial("string"==typeof e&&"radial"===e||e||!1)},_serialize:function(t,n){return n.add(this,function(){return e.serialize([this._stops,this._radial],t,!0,n)})},_changed:function(){for(var t=0,e=this._owners&&this._owners.length;e>t;t++)this._owners[t]._changed()},_addOwner:function(t){this._owners||(this._owners=[]),this._owners.push(t)},_removeOwner:function(e){var n=this._owners?this._owners.indexOf(e):-1;-1!=n&&(this._owners.splice(n,1),0===this._owners.length&&(this._owners=t))},clone:function(){for(var t=[],e=0,n=this._stops.length;n>e;e++)t[e]=this._stops[e].clone();return new j(t,this._radial)},getStops:function(){return this._stops},setStops:function(e){if(this.stops)for(var n=0,i=this._stops.length;i>n;n++)this._stops[n]._owner=t;if(e.length<2)throw Error("Gradient stop list needs to contain at least two stops.");this._stops=D.readAll(e,0,{clone:!0});for(var n=0,i=this._stops.length;i>n;n++){var r=this._stops[n];r._owner=this,r._defaultRamp&&r.setRampPoint(n/(i-1))}this._changed()},getRadial:function(){return this._radial},setRadial:function(t){this._radial=t,this._changed()},equals:function(t){if(t===this)return!0;if(t&&this._class===t._class&&this._stops.length===t._stops.length){for(var e=0,n=this._stops.length;n>e;e++)if(!this._stops[e].equals(t._stops[e]))return!1;return!0}return!1}}),D=e.extend({_class:"GradientStop",initialize:function(e,n){if(e){var i,r;n===t&&Array.isArray(e)?(i=e[0],r=e[1]):e.color?(i=e.color,r=e.rampPoint):(i=e,r=n),this.setColor(i),this.setRampPoint(r)}},clone:function(){return new D(this._color.clone(),this._rampPoint)},_serialize:function(t,n){return e.serialize([this._color,this._rampPoint],t,!0,n)},_changed:function(){this._owner&&this._owner._changed(65)},getRampPoint:function(){return this._rampPoint},setRampPoint:function(t){this._defaultRamp=null==t,this._rampPoint=t||0,this._changed()},getColor:function(){return this._color},setColor:function(t){this._color=B.read(arguments),this._color===t&&(this._color=t.clone()),this._color._owner=this,this._changed()},equals:function(t){return t===this||t&&this._class===t._class&&this._color.equals(t._color)&&this._rampPoint==t._rampPoint||!1}}),R=e.extend(new function(){var n={fillColor:t,strokeColor:t,strokeWidth:1,strokeCap:"butt",strokeJoin:"miter",strokeScaling:!0,miterLimit:10,dashOffset:0,dashArray:[],windingRule:"nonzero",shadowColor:t,shadowBlur:0,shadowOffset:new h,selectedColor:t,fontFamily:"sans-serif",fontWeight:"normal",fontSize:12,font:"sans-serif",leading:null,justification:"left"},i={strokeWidth:97,strokeCap:97,strokeJoin:97,strokeScaling:105,miterLimit:97,fontFamily:9,fontWeight:9,fontSize:9,font:9,leading:9,justification:9},r={beans:!0},s={_defaults:n,_textDefaults:new e(n,{fillColor:new B}),beans:!0};return e.each(n,function(n,a){var o=/Color$/.test(a),u="shadowOffset"===a,l=e.capitalize(a),c=i[a],d="set"+l,_="get"+l;s[d]=function(e){var n=this._owner,i=n&&n._children;if(i&&i.length>0&&!(n instanceof A))for(var r=0,s=i.length;s>r;r++)i[r]._style[d](e);else{var h=this._values[a];h!==e&&(o&&(h&&(h._owner=t),e&&e.constructor===B&&(e._owner&&(e=e.clone()),e._owner=n)),this._values[a]=e,n&&n._changed(c||65))}},s[_]=function(n){var i,r=this._owner,s=r&&r._children;if(!s||0===s.length||n||r instanceof A){var i=this._values[a];if(i===t)i=this._defaults[a],i&&i.clone&&(i=i.clone());else{var l=o?B:u?h:null;!l||i&&i.constructor===l||(this._values[a]=i=l.read([i],0,{readNull:!0,clone:!0}),i&&o&&(i._owner=r))}return i}for(var c=0,d=s.length;d>c;c++){var f=s[c]._style[_]();if(0===c)i=f;else if(!e.equals(i,f))return t}return i},r[_]=function(t){return this._style[_](t)},r[d]=function(t){this._style[d](t)}}),m.inject(r),s},{_class:"Style",initialize:function(t,e,n){this._values={},this._owner=e,this._project=e&&e._project||n||paper.project,e instanceof L&&(this._defaults=this._textDefaults),t&&this.set(t)},set:function(t){var e=t instanceof R,n=e?t._values:t;if(n)for(var i in n)if(i in this._defaults){var r=n[i];this[i]=r&&e&&r.clone?r.clone():r}},equals:function(t){return t===this||t&&this._class===t._class&&e.equals(this._values,t._values)||!1},hasFill:function(){return!!this.getFillColor()},hasStroke:function(){return!!this.getStrokeColor()&&this.getStrokeWidth()>0},hasShadow:function(){return!!this.getShadowColor()&&this.getShadowBlur()>0},getView:function(){return this._project.getView()},getFontStyle:function(){var t=this.getFontSize();return this.getFontWeight()+" "+t+(/[a-z]/i.test(t+"")?" ":"px ")+this.getFontFamily()},getFont:"#getFontFamily",setFont:"#setFontFamily",getLeading:function wt(){var t=wt.base.call(this),e=this.getFontSize();return/pt|em|%|px/.test(e)&&(e=this.getView().getPixelSize(e)),null!=t?t:1.2*e}}),F=new function(){function t(t,e,n,i){for(var r=["","webkit","moz","Moz","ms","o"],s=e[0].toUpperCase()+e.substring(1),a=0;6>a;a++){var o=r[a],h=o?o+s:e;if(h in t){if(!n)return t[h];t[h]=i;break}}}return{getStyles:function(t){var e=t&&9!==t.nodeType?t.ownerDocument:t,n=e&&e.defaultView;return n&&n.getComputedStyle(t,"")},getBounds:function(t,e){var n,i=t.ownerDocument,r=i.body,s=i.documentElement;try{n=t.getBoundingClientRect()}catch(a){n={left:0,top:0,width:0,height:0}}var o=n.left-(s.clientLeft||r.clientLeft||0),h=n.top-(s.clientTop||r.clientTop||0);if(!e){var u=i.defaultView;o+=u.pageXOffset||s.scrollLeft||r.scrollLeft,h+=u.pageYOffset||s.scrollTop||r.scrollTop}return new d(o,h,n.width,n.height)},getViewportBounds:function(t){var e=t.ownerDocument,n=e.defaultView,i=e.documentElement;return new d(0,0,n.innerWidth||i.clientWidth,n.innerHeight||i.clientHeight)},getOffset:function(t,e){return F.getBounds(t,e).getPoint()},getSize:function(t){return F.getBounds(t,!0).getSize()},isInvisible:function(t){return F.getSize(t).equals(new l(0,0))},isInView:function(t){return!F.isInvisible(t)&&F.getViewportBounds(t).intersects(F.getBounds(t,!0))},getPrefixed:function(e,n){return t(e,n)},setPrefixed:function(e,n,i){if("object"==typeof n)for(var r in n)t(e,r,!0,n[r]);else t(e,n,!0,i)}}},q={add:function(t,e){for(var n in e)for(var i=e[n],r=n.split(/[\s,]+/g),s=0,a=r.length;a>s;s++)t.addEventListener(r[s],i,!1)},remove:function(t,e){for(var n in e)for(var i=e[n],r=n.split(/[\s,]+/g),s=0,a=r.length;a>s;s++)t.removeEventListener(r[s],i,!1)},getPoint:function(t){var e=t.targetTouches?t.targetTouches.length?t.targetTouches[0]:t.changedTouches[0]:t;return new h(e.pageX||e.clientX+document.documentElement.scrollLeft,e.pageY||e.clientY+document.documentElement.scrollTop)},getTarget:function(t){return t.target||t.srcElement},getRelatedTarget:function(t){return t.relatedTarget||t.toElement},getOffset:function(t,e){return q.getPoint(t).subtract(F.getOffset(e||q.getTarget(t)))},stop:function(t){t.stopPropagation(),t.preventDefault()}};q.requestAnimationFrame=new function(){function t(){for(var e=s.length-1;e>=0;e--){var o=s[e],h=o[0],u=o[1];(!u||("true"==i.getAttribute(u,"keepalive")||a)&&F.isInView(u))&&(s.splice(e,1),h())}n&&(s.length?n(t):r=!1)}var e,n=F.getPrefixed(window,"requestAnimationFrame"),r=!1,s=[],a=!0;return q.add(window,{focus:function(){a=!0},blur:function(){a=!1}}),function(i,a){s.push([i,a]),n?r||(n(t),r=!0):e||(e=setInterval(t,1e3/60))}};var V=e.extend(n,{_class:"View",initialize:function xt(t,e){function n(t){return e[t]||parseInt(e.getAttribute(t),10)}function r(){var t=F.getSize(e);return t.isNaN()||t.isZero()?new l(n("width"),n("height")):t}this._project=t,this._scope=t._scope,this._element=e;var s;this._pixelRatio||(this._pixelRatio=window.devicePixelRatio||1),this._id=e.getAttribute("id"),null==this._id&&e.setAttribute("id",this._id="view-"+xt._id++),q.add(e,this._viewEvents);var a="none";if(F.setPrefixed(e.style,{userSelect:a,touchAction:a,touchCallout:a,contentZooming:a,userDrag:a,tapHighlightColor:"rgba(0,0,0,0)"}),i.hasAttribute(e,"resize")){var o=this;q.add(window,this._windowEvents={resize:function(){o.setViewSize(r())}})}if(this._setViewSize(s=r()),i.hasAttribute(e,"stats")&&"undefined"!=typeof Stats){this._stats=new Stats;var h=this._stats.domElement,u=h.style,c=F.getOffset(e);u.position="absolute",u.left=c.x+"px",u.top=c.y+"px",document.body.appendChild(h)}xt._views.push(this),xt._viewsById[this._id]=this,this._viewSize=s,(this._matrix=new f)._owner=this,this._zoom=1,xt._focused||(xt._focused=this),this._frameItems={},this._frameItemCount=0},remove:function(){return this._project?(V._focused===this&&(V._focused=null),V._views.splice(V._views.indexOf(this),1),delete V._viewsById[this._id],this._project._view===this&&(this._project._view=null),q.remove(this._element,this._viewEvents),q.remove(window,this._windowEvents),this._element=this._project=null,this.off("frame"),this._animate=!1,this._frameItems={},!0):!1},_events:e.each(["onResize","onMouseDown","onMouseUp","onMouseMove"],function(t){this[t]={install:function(t){this._installEvent(t)},uninstall:function(t){this._uninstallEvent(t)}}},{onFrame:{install:function(){this.play()},uninstall:function(){this.pause()}}}),_animate:!1,_time:0,_count:0,_requestFrame:function(){var t=this;q.requestAnimationFrame(function(){t._requested=!1,t._animate&&(t._requestFrame(),t._handleFrame())},this._element),this._requested=!0},_handleFrame:function(){paper=this._scope;var t=Date.now()/1e3,n=this._before?t-this._before:0;this._before=t,this._handlingFrame=!0,this.emit("frame",new e({delta:n,time:this._time+=n,count:this._count++})),this._stats&&this._stats.update(),this._handlingFrame=!1,this.update()},_animateItem:function(t,e){var n=this._frameItems;e?(n[t._id]={item:t,time:0,count:0},1===++this._frameItemCount&&this.on("frame",this._handleFrameItems)):(delete n[t._id],0===--this._frameItemCount&&this.off("frame",this._handleFrameItems))},_handleFrameItems:function(t){for(var n in this._frameItems){var i=this._frameItems[n];i.item.emit("frame",new e(t,{time:i.time+=t.delta,count:i.count++}))}},_update:function(){this._project._needsUpdate=!0,this._handlingFrame||(this._animate?this._handleFrame():this.update())},_changed:function(t){1&t&&(this._project._needsUpdate=!0)},_transform:function(t){this._matrix.concatenate(t),this._bounds=null,this._update()},getElement:function(){return this._element},getPixelRatio:function(){return this._pixelRatio},getResolution:function(){return 72*this._pixelRatio},getViewSize:function(){var t=this._viewSize;return new c(t.width,t.height,this,"setViewSize")},setViewSize:function(){var t=l.read(arguments),e=t.subtract(this._viewSize);e.isZero()||(this._viewSize.set(t.width,t.height),this._setViewSize(t),this._bounds=null,this.emit("resize",{size:t,delta:e}),this._update())},_setViewSize:function(t){var e=this._element;e.width=t.width,e.height=t.height},getBounds:function(){return this._bounds||(this._bounds=this._matrix.inverted()._transformBounds(new d(new h,this._viewSize))),this._bounds},getSize:function(){return this.getBounds().getSize()},getCenter:function(){return this.getBounds().getCenter()},setCenter:function(){var t=h.read(arguments);this.scrollBy(t.subtract(this.getCenter()))},getZoom:function(){return this._zoom},setZoom:function(t){this._transform((new f).scale(t/this._zoom,this.getCenter())),this._zoom=t},isVisible:function(){return F.isInView(this._element)},scrollBy:function(){
this._transform((new f).translate(h.read(arguments).negate()))},play:function(){this._animate=!0,this._requested||this._requestFrame()},pause:function(){this._animate=!1},draw:function(){this.update()},projectToView:function(){return this._matrix._transformPoint(h.read(arguments))},viewToProject:function(){return this._matrix._inverseTransform(h.read(arguments))}},{statics:{_views:[],_viewsById:{},_id:0,create:function(t,e){return"string"==typeof e&&(e=document.getElementById(e)),new H(t,e)}}},new function(){function t(t){var e=q.getTarget(t);return e.getAttribute&&V._viewsById[e.getAttribute("id")]}function e(t,e){return t.viewToProject(q.getOffset(e,t._element))}function n(){if(!V._focused||!V._focused.isVisible())for(var t=0,e=V._views.length;e>t;t++){var n=V._views[t];if(n&&n.isVisible()){V._focused=a=n;break}}}function i(t,e,n){t._handleEvent("mousemove",e,n);var i=t._scope.tool;return i&&i._handleEvent(l&&i.responds("mousedrag")?"mousedrag":"mousemove",e,n),t.update(),i}var r,s,a,o,h,u,l=!1,c=window.navigator;c.pointerEnabled||c.msPointerEnabled?(o="pointerdown MSPointerDown",h="pointermove MSPointerMove",u="pointerup pointercancel MSPointerUp MSPointerCancel"):(o="touchstart",h="touchmove",u="touchend touchcancel","ontouchstart"in window&&c.userAgent.match(/mobile|tablet|ip(ad|hone|od)|android|silk/i)||(o+=" mousedown",h+=" mousemove",u+=" mouseup"));var d={"selectstart dragstart":function(t){l&&t.preventDefault()}},_={mouseout:function(t){var n=V._focused,r=q.getRelatedTarget(t);!n||r&&"HTML"!==r.nodeName||i(n,e(n,t),t)},scroll:n};d[o]=function(n){var i=V._focused=t(n),s=e(i,n);l=!0,i._handleEvent("mousedown",s,n),(r=i._scope.tool)&&r._handleEvent("mousedown",s,n),i.update()},_[h]=function(o){var h=V._focused;if(!l){var u=t(o);u?(h!==u&&i(h,e(h,o),o),s=h,h=V._focused=a=u):a&&a===h&&(h=V._focused=s,n())}if(h){var c=e(h,o);(l||h.getBounds().contains(c))&&(r=i(h,c,o))}},_[u]=function(t){var n=V._focused;if(n&&l){var i=e(n,t);l=!1,n._handleEvent("mouseup",i,t),r&&r._handleEvent("mouseup",i,t),n.update()}},q.add(document,_),q.add(window,{load:n});var f={mousedown:{mousedown:1,mousedrag:1,click:1,doubleclick:1},mouseup:{mouseup:1,mousedrag:1,click:1,doubleclick:1},mousemove:{mousedrag:1,mousemove:1,mouseenter:1,mouseleave:1}};return{_viewEvents:d,_handleEvent:function(){},_installEvent:function(t){var e=this._eventCounters;if(e)for(var n in f)e[n]=(e[n]||0)+(f[n][t]||0)},_uninstallEvent:function(t){var e=this._eventCounters;if(e)for(var n in f)e[n]-=f[n][t]||0},statics:{updateFocus:n}}}),H=V.extend({_class:"CanvasView",initialize:function(t,e){if(!(e instanceof HTMLCanvasElement)){var n=l.read(arguments,1);if(n.isZero())throw Error("Cannot create CanvasView with the provided argument: "+[].slice.call(arguments,1));e=Y.getCanvas(n)}if(this._context=e.getContext("2d"),this._eventCounters={},this._pixelRatio=1,!/^off|false$/.test(i.getAttribute(e,"hidpi"))){var r=window.devicePixelRatio||1,s=F.getPrefixed(this._context,"backingStorePixelRatio")||1;this._pixelRatio=r/s}V.call(this,t,e)},_setViewSize:function(t){var e=this._element,n=this._pixelRatio,r=t.width,s=t.height;if(e.width=r*n,e.height=s*n,1!==n){if(!i.hasAttribute(e,"resize")){var a=e.style;a.width=r+"px",a.height=s+"px"}this._context.scale(n,n)}},getPixelSize:function(t){var e,n=paper.browser;if(n&&n.firefox){var i=this._element.parentNode,r=document.createElement("div");r.style.fontSize=t,i.appendChild(r),e=parseFloat(F.getStyles(r).fontSize),i.removeChild(r)}else{var s=this._context,a=s.font;s.font=t+" serif",e=parseFloat(s.font),s.font=a}return e},getTextWidth:function(t,e){var n=this._context,i=n.font,r=0;n.font=t;for(var s=0,a=e.length;a>s;s++)r=Math.max(r,n.measureText(e[s]).width);return n.font=i,r},update:function(t){var e=this._project;if(!e||!t&&!e._needsUpdate)return!1;var n=this._context,i=this._viewSize;return n.clearRect(0,0,i.width+1,i.height+1),e.draw(n,this._matrix,this._pixelRatio),e._needsUpdate=!1,!0}},new function(){function e(e,n,i,r,s,a){function o(e){return e.responds(n)&&(h||(h=new U(n,i,r,s,a?r.subtract(a):null)),e.emit(n,h)&&h.isStopped)?(i.preventDefault(),!0):t}for(var h,u=s;u;){if(o(u))return!0;u=u.getParent()}return o(e)?!0:!1}var n,i,r,s,a,o,h,u,l;return{_handleEvent:function(t,c,d){if(this._eventCounters[t]){var _=this._project,f=_.hitTest(c,{tolerance:0,fill:!0,stroke:!0}),g=f&&f.item,v=!1;switch(t){case"mousedown":for(v=e(this,t,d,c,g),u=a==g&&Date.now()-l<300,s=a=g,n=i=r=c,h=!v&&g;h&&!h.responds("mousedrag");)h=h._parent;break;case"mouseup":v=e(this,t,d,c,g,n),h&&(i&&!i.equals(c)&&e(this,"mousedrag",d,c,h,i),g!==h&&(r=c,e(this,"mousemove",d,c,g,r))),!v&&g&&g===s&&(l=Date.now(),e(this,u&&s.responds("doubleclick")?"doubleclick":"click",d,n,g),u=!1),s=h=null;break;case"mousemove":h&&(v=e(this,"mousedrag",d,c,h,i)),v||(g!==o&&(r=c),v=e(this,t,d,c,g,r)),i=r=c,g!==o&&(e(this,"mouseleave",d,c,o),o=g,e(this,"mouseenter",d,c,g))}return v}}}}),Z=e.extend({_class:"Event",initialize:function(t){this.event=t},isPrevented:!1,isStopped:!1,preventDefault:function(){this.isPrevented=!0,this.event.preventDefault()},stopPropagation:function(){this.isStopped=!0,this.event.stopPropagation()},stop:function(){this.stopPropagation(),this.preventDefault()},getModifiers:function(){return G.modifiers}}),W=Z.extend({_class:"KeyEvent",initialize:function(t,e,n,i){Z.call(this,i),this.type=t?"keydown":"keyup",this.key=e,this.character=n},toString:function(){return"{ type: '"+this.type+"', key: '"+this.key+"', character: '"+this.character+"', modifiers: "+this.getModifiers()+" }"}}),G=new function(){function t(i,s,u,l){var c,d=u?String.fromCharCode(u):"",_=r[s],f=_||d.toLowerCase(),g=i?"keydown":"keyup",v=V._focused,p=v&&v.isVisible()&&v._scope,m=p&&p.tool;if(h[f]=i,i?o[s]=u:delete o[s],_&&(c=e.camelize(_))in a){a[c]=i;var y=paper.browser;if("command"===c&&y&&y.mac)if(i)n={};else{for(var w in n)w in o&&t(!1,w,n[w],l);n=null}}else i&&n&&(n[s]=u);m&&m.responds(g)&&(paper=p,m.emit(g,new W(i,f,d,l)),v&&v.update())}var n,i,r={8:"backspace",9:"tab",13:"enter",16:"shift",17:"control",18:"option",19:"pause",20:"caps-lock",27:"escape",32:"space",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",46:"delete",91:"command",93:"command",224:"command"},s={9:!0,13:!0,32:!0},a=new e({shift:!1,control:!1,option:!1,command:!1,capsLock:!1,space:!1}),o={},h={};return q.add(document,{keydown:function(e){var n=e.which||e.keyCode;n in r||a.command?t(!0,n,n in s||a.command?n:0,e):i=n},keypress:function(e){null!=i&&(t(!0,i,e.which||e.keyCode,e),i=null)},keyup:function(e){var n=e.which||e.keyCode;n in o&&t(!1,n,o[n],e)}}),q.add(window,{blur:function(e){for(var n in o)t(!1,n,o[n],e)}}),{modifiers:a,isDown:function(t){return!!h[t]}}},U=Z.extend({_class:"MouseEvent",initialize:function(t,e,n,i,r){Z.call(this,e),this.type=t,this.point=n,this.target=i,this.delta=r},toString:function(){return"{ type: '"+this.type+"', point: "+this.point+", target: "+this.target+(this.delta?", delta: "+this.delta:"")+", modifiers: "+this.getModifiers()+" }"}}),J=Z.extend({_class:"ToolEvent",_item:null,initialize:function(t,e,n){this.tool=t,this.type=e,this.event=n},_choosePoint:function(t,e){return t?t:e?e.clone():null},getPoint:function(){return this._choosePoint(this._point,this.tool._point)},setPoint:function(t){this._point=t},getLastPoint:function(){return this._choosePoint(this._lastPoint,this.tool._lastPoint)},setLastPoint:function(t){this._lastPoint=t},getDownPoint:function(){return this._choosePoint(this._downPoint,this.tool._downPoint)},setDownPoint:function(t){this._downPoint=t},getMiddlePoint:function(){return!this._middlePoint&&this.tool._lastPoint?this.tool._point.add(this.tool._lastPoint).divide(2):this._middlePoint},setMiddlePoint:function(t){this._middlePoint=t},getDelta:function(){return!this._delta&&this.tool._lastPoint?this.tool._point.subtract(this.tool._lastPoint):this._delta},setDelta:function(t){this._delta=t},getCount:function(){return/^mouse(down|up)$/.test(this.type)?this.tool._downCount:this.tool._count},setCount:function(t){this.tool[/^mouse(down|up)$/.test(this.type)?"downCount":"count"]=t},getItem:function(){if(!this._item){var t=this.tool._scope.project.hitTest(this.getPoint());if(t){for(var e=t.item,n=e._parent;/^(Group|CompoundPath)$/.test(n._class);)e=n,n=n._parent;this._item=e}}return this._item},setItem:function(t){this._item=t},toString:function(){return"{ type: "+this.type+", point: "+this.getPoint()+", count: "+this.getCount()+", modifiers: "+this.getModifiers()+" }"}}),X=(r.extend({_class:"Tool",_list:"tools",_reference:"tool",_events:["onActivate","onDeactivate","onEditOptions","onMouseDown","onMouseUp","onMouseDrag","onMouseMove","onKeyDown","onKeyUp"],initialize:function(t){r.call(this),this._firstMove=!0,this._count=0,this._downCount=0,this._set(t)},getMinDistance:function(){return this._minDistance},setMinDistance:function(t){this._minDistance=t,null!=t&&null!=this._maxDistance&&t>this._maxDistance&&(this._maxDistance=t)},getMaxDistance:function(){return this._maxDistance},setMaxDistance:function(t){this._maxDistance=t,null!=this._minDistance&&null!=t&&t<this._minDistance&&(this._minDistance=t)},getFixedDistance:function(){return this._minDistance==this._maxDistance?this._minDistance:null},setFixedDistance:function(t){this._minDistance=this._maxDistance=t},_updateEvent:function(t,e,n,i,r,s,a){if(!r){if(null!=n||null!=i){var o=null!=n?n:0,h=e.subtract(this._point),u=h.getLength();if(o>u)return!1;if(null!=i&&0!=i)if(u>i)e=this._point.add(h.normalize(i));else if(a)return!1}if(s&&e.equals(this._point))return!1}switch(this._lastPoint=r&&"mousemove"==t?e:this._point,this._point=e,t){case"mousedown":this._lastPoint=this._downPoint,this._downPoint=this._point,this._downCount++;break;case"mouseup":this._lastPoint=this._downPoint}return this._count=r?0:this._count+1,!0},_fireEvent:function(t,e){var n=paper.project._removeSets;if(n){"mouseup"===t&&(n.mousedrag=null);var i=n[t];if(i){for(var r in i){var s=i[r];for(var a in n){var o=n[a];o&&o!=i&&delete o[s._id]}s.remove()}n[t]=null}}return this.responds(t)&&this.emit(t,new J(this,t,e))},_handleEvent:function(t,e,n){paper=this._scope;var i=!1;switch(t){case"mousedown":this._updateEvent(t,e,null,null,!0,!1,!1),i=this._fireEvent(t,n);break;case"mousedrag":for(var r=!1,s=!1;this._updateEvent(t,e,this.minDistance,this.maxDistance,!1,r,s);)i=this._fireEvent(t,n)||i,r=!0,s=!0;break;case"mouseup":!e.equals(this._point)&&this._updateEvent("mousedrag",e,this.minDistance,this.maxDistance,!1,!1,!1)&&(i=this._fireEvent("mousedrag",n)),this._updateEvent(t,e,null,this.maxDistance,!1,!1,!1),i=this._fireEvent(t,n)||i,this._updateEvent(t,e,null,null,!0,!1,!1),this._firstMove=!0;break;case"mousemove":for(;this._updateEvent(t,e,this.minDistance,this.maxDistance,this._firstMove,!0,!1);)i=this._fireEvent(t,n)||i,this._firstMove=!1}return i&&n.preventDefault(),i}}),{request:function(e,n,i,r){r=r===t?!0:r;var s=new(window.ActiveXObject||XMLHttpRequest)("Microsoft.XMLHTTP");return s.open(e.toUpperCase(),n,r),"overrideMimeType"in s&&s.overrideMimeType("text/plain"),s.onreadystatechange=function(){if(4===s.readyState){var t=s.status;if(0!==t&&200!==t)throw Error("Could not load "+n+" (Error "+t+")");i.call(s,s.responseText)}},s.send(null)}}),Y={canvases:[],getCanvas:function(t,e){var n,i=!0;"object"==typeof t&&(e=t.height,t=t.width),n=this.canvases.length?this.canvases.pop():document.createElement("canvas");var r=n.getContext("2d");return n.width===t&&n.height===e?i&&r.clearRect(0,0,t+1,e+1):(n.width=t,n.height=e),r.save(),n},getContext:function(t,e){return this.getCanvas(t,e).getContext("2d")},release:function(t){var e=t.canvas?t.canvas:t;e.getContext("2d").restore(),this.canvases.push(e)}},$=new function(){function t(t,e,n){return.2989*t+.587*e+.114*n}function n(e,n,i,r){var s=r-t(e,n,i);_=e+s,f=n+s,g=i+s;var r=t(_,f,g),a=v(_,f,g),o=p(_,f,g);if(0>a){var h=r-a;_=r+(_-r)*r/h,f=r+(f-r)*r/h,g=r+(g-r)*r/h}if(o>255){var u=255-r,l=o-r;_=r+(_-r)*u/l,f=r+(f-r)*u/l,g=r+(g-r)*u/l}}function i(t,e,n){return p(t,e,n)-v(t,e,n)}function r(t,e,n,i){var r,s=[t,e,n],a=p(t,e,n),o=v(t,e,n);o=o===t?0:o===e?1:2,a=a===t?0:a===e?1:2,r=0===v(o,a)?1===p(o,a)?2:1:0,s[a]>s[o]?(s[r]=(s[r]-s[o])*i/(s[a]-s[o]),s[a]=i):s[r]=s[a]=0,s[o]=0,_=s[0],f=s[1],g=s[2]}var s,a,o,h,u,l,c,d,_,f,g,v=Math.min,p=Math.max,m=Math.abs,y={multiply:function(){_=u*s/255,f=l*a/255,g=c*o/255},screen:function(){_=u+s-u*s/255,f=l+a-l*a/255,g=c+o-c*o/255},overlay:function(){_=128>u?2*u*s/255:255-2*(255-u)*(255-s)/255,f=128>l?2*l*a/255:255-2*(255-l)*(255-a)/255,g=128>c?2*c*o/255:255-2*(255-c)*(255-o)/255},"soft-light":function(){var t=s*u/255;_=t+u*(255-(255-u)*(255-s)/255-t)/255,t=a*l/255,f=t+l*(255-(255-l)*(255-a)/255-t)/255,t=o*c/255,g=t+c*(255-(255-c)*(255-o)/255-t)/255},"hard-light":function(){_=128>s?2*s*u/255:255-2*(255-s)*(255-u)/255,f=128>a?2*a*l/255:255-2*(255-a)*(255-l)/255,g=128>o?2*o*c/255:255-2*(255-o)*(255-c)/255},"color-dodge":function(){_=0===u?0:255===s?255:v(255,255*u/(255-s)),f=0===l?0:255===a?255:v(255,255*l/(255-a)),g=0===c?0:255===o?255:v(255,255*c/(255-o))},"color-burn":function(){_=255===u?255:0===s?0:p(0,255-255*(255-u)/s),f=255===l?255:0===a?0:p(0,255-255*(255-l)/a),g=255===c?255:0===o?0:p(0,255-255*(255-c)/o)},darken:function(){_=s>u?u:s,f=a>l?l:a,g=o>c?c:o},lighten:function(){_=u>s?u:s,f=l>a?l:a,g=c>o?c:o},difference:function(){_=u-s,0>_&&(_=-_),f=l-a,0>f&&(f=-f),g=c-o,0>g&&(g=-g)},exclusion:function(){_=u+s*(255-u-u)/255,f=l+a*(255-l-l)/255,g=c+o*(255-c-c)/255},hue:function(){r(s,a,o,i(u,l,c)),n(_,f,g,t(u,l,c))},saturation:function(){r(u,l,c,i(s,a,o)),n(_,f,g,t(u,l,c))},luminosity:function(){n(u,l,c,t(s,a,o))},color:function(){n(s,a,o,t(u,l,c))},add:function(){_=v(u+s,255),f=v(l+a,255),g=v(c+o,255)},subtract:function(){_=p(u-s,0),f=p(l-a,0),g=p(c-o,0)},average:function(){_=(u+s)/2,f=(l+a)/2,g=(c+o)/2},negation:function(){_=255-m(255-s-u),f=255-m(255-a-l),g=255-m(255-o-c)}},w=this.nativeModes=e.each(["source-over","source-in","source-out","source-atop","destination-over","destination-in","destination-out","destination-atop","lighter","darker","copy","xor"],function(t){this[t]=!0},{}),x=Y.getContext(1,1);e.each(y,function(t,e){var n="darken"===e,i=!1;x.save();try{x.fillStyle=n?"#300":"#a00",x.fillRect(0,0,1,1),x.globalCompositeOperation=e,x.globalCompositeOperation===e&&(x.fillStyle=n?"#a00":"#300",x.fillRect(0,0,1,1),i=x.getImageData(0,0,1,1).data[0]!==n?170:51)}catch(r){}x.restore(),w[e]=i}),Y.release(x),this.process=function(t,e,n,i,r){var v=e.canvas,p="normal"===t;if(p||w[t])n.save(),n.setTransform(1,0,0,1,0,0),n.globalAlpha=i,p||(n.globalCompositeOperation=t),n.drawImage(v,r.x,r.y),n.restore();else{var m=y[t];if(!m)return;for(var x=n.getImageData(r.x,r.y,v.width,v.height),b=x.data,C=e.getImageData(0,0,v.width,v.height).data,S=0,P=b.length;P>S;S+=4){s=C[S],u=b[S],a=C[S+1],l=b[S+1],o=C[S+2],c=b[S+2],h=C[S+3],d=b[S+3],m();var M=h*i/255,I=1-M;b[S]=M*_+I*u,b[S+1]=M*f+I*l,b[S+2]=M*g+I*c,b[S+3]=h*i+I*d}n.putImageData(x,r.x,r.y)}}},K=e.each({fillColor:["fill","color"],strokeColor:["stroke","color"],strokeWidth:["stroke-width","number"],strokeCap:["stroke-linecap","string"],strokeJoin:["stroke-linejoin","string"],strokeScaling:["vector-effect","lookup",{"true":"none","false":"non-scaling-stroke"},function(t,e){return!e&&(t instanceof k||t instanceof x||t instanceof L)}],miterLimit:["stroke-miterlimit","number"],dashArray:["stroke-dasharray","array"],dashOffset:["stroke-dashoffset","number"],fontFamily:["font-family","string"],fontWeight:["font-weight","string"],fontSize:["font-size","number"],justification:["text-anchor","lookup",{left:"start",center:"middle",right:"end"}],opacity:["opacity","number"],blendMode:["mix-blend-mode","string"]},function(t,n){var i=e.capitalize(n),r=t[2];this[n]={type:t[1],property:n,attribute:t[0],toSVG:r,fromSVG:r&&e.each(r,function(t,e){this[t]=e},{}),exportFilter:t[3],get:"get"+i,set:"set"+i}},{}),Q={href:"http://www.w3.org/1999/xlink",xlink:"http://www.w3.org/2000/xmlns"};return new function(){function t(t,e){for(var n in e){var i=e[n],r=Q[n];"number"==typeof i&&(i=b.number(i)),r?t.setAttributeNS(r,n,i):t.setAttribute(n,i)}return t}function n(e,n){return t(document.createElementNS("http://www.w3.org/2000/svg",e),n)}function i(t,n,i){var r=new e,s=t.getTranslation();if(n){t=t.shiftless();var o=t._inverseTransform(s);r[i?"cx":"x"]=o.x,r[i?"cy":"y"]=o.y,s=null}if(!t.isIdentity()){var h=t.decompose();if(h&&!h.shearing){var u=[],l=h.rotation,c=h.scaling;s&&!s.isZero()&&u.push("translate("+b.point(s)+")"),a.isZero(c.x-1)&&a.isZero(c.y-1)||u.push("scale("+b.point(c)+")"),l&&u.push("rotate("+b.number(l)+")"),r.transform=u.join(" ")}else r.transform="matrix("+t.getValues().join(",")+")"}return r}function r(e,r){for(var s=i(e._matrix),a=e._children,o=n("g",s),h=0,u=a.length;u>h;h++){var l=a[h],c=w(l,r);if(c)if(l.isClipMask()){var d=n("clipPath");d.appendChild(c),p(l,d,"clip"),t(o,{"clip-path":"url(#"+d.id+")"})}else o.appendChild(c)}return o}function o(t,e){var r=i(t._matrix,!0),s=t.getSize(),a=t.getImage();return r.x-=s.width/2,r.y-=s.height/2,r.width=s.width,r.height=s.height,r.href=e.embedImages===!1&&a&&a.src||t.toDataURL(),n("image",r)}function h(t,e){var r=e.matchShapes;if(r){var s=t.toShape(!1);if(s)return u(s,e)}var a,o=t._segments,h=i(t._matrix);if(0===o.length)return null;if(r&&!t.hasHandles())if(o.length>=3){a=t._closed?"polygon":"polyline";for(var l=[],c=0,d=o.length;d>c;c++)l.push(b.point(o[c]._point));h.points=l.join(" ")}else{a="line";var _=o[0]._point,f=o[o.length-1]._point;h.set({x1:_.x,y1:_.y,x2:f.x,y2:f.y})}else a="path",h.d=t.getPathData(null,e.precision);return n(a,h)}function u(t){var e=t._type,r=t._radius,s=i(t._matrix,!0,"rectangle"!==e);if("rectangle"===e){e="rect";var a=t._size,o=a.width,h=a.height;s.x-=o/2,s.y-=h/2,s.width=o,s.height=h,r.isZero()&&(r=null)}return r&&("circle"===e?s.r=r:(s.rx=r.width,s.ry=r.height)),n(e,s)}function l(t,e){var r=i(t._matrix),s=t.getPathData(null,e.precision);return s&&(r.d=s),n("path",r)}function c(t,e){var r=i(t._matrix,!0),s=t.getSymbol(),a=g(s,"symbol"),o=s.getDefinition(),h=o.getBounds();return a||(a=n("symbol",{viewBox:b.rectangle(h)}),a.appendChild(w(o,e)),p(s,a,"symbol")),r.href="#"+a.id,r.x+=h.x,r.y+=h.y,r.width=b.number(h.width),r.height=b.number(h.height),r.overflow="visible",n("use",r)}function d(t){var e=g(t,"color");if(!e){var i,r=t.getGradient(),s=r._radial,a=t.getOrigin().transform(),o=t.getDestination().transform();if(s){i={cx:a.x,cy:a.y,r:a.getDistance(o)};var h=t.getHighlight();h&&(h=h.transform(),i.fx=h.x,i.fy=h.y)}else i={x1:a.x,y1:a.y,x2:o.x,y2:o.y};i.gradientUnits="userSpaceOnUse",e=n((s?"radial":"linear")+"Gradient",i);for(var u=r._stops,l=0,c=u.length;c>l;l++){var d=u[l],_=d._color,f=_.getAlpha();i={offset:d._rampPoint,"stop-color":_.toCSS(!0)},1>f&&(i["stop-opacity"]=f),e.appendChild(n("stop",i))}p(t,e,"color")}return"url(#"+e.id+")"}function _(t){var e=n("text",i(t._matrix,!0));return e.textContent=t._content,e}function f(n,i,r){var s={},a=!r&&n.getParent();return null!=n._name&&(s.id=n._name),e.each(K,function(t){var i=t.get,r=t.type,o=n[i]();if(t.exportFilter?t.exportFilter(n,o):!a||!e.equals(a[i](),o)){if("color"===r&&null!=o){var h=o.getAlpha();1>h&&(s[t.attribute+"-opacity"]=h)}s[t.attribute]=null==o?"none":"number"===r?b.number(o):"color"===r?o.gradient?d(o,n):o.toCSS(!0):"array"===r?o.join(","):"lookup"===r?t.toSVG[o]:o}}),1===s.opacity&&delete s.opacity,n._visible||(s.visibility="hidden"),t(i,s)}function g(t,e){return C||(C={ids:{},svgs:{}}),t&&C.svgs[e+"-"+t._id]}function p(t,e,n){C||g();var i=C.ids[n]=(C.ids[n]||0)+1;e.id=n+"-"+i,C.svgs[n+"-"+t._id]=e}function y(t,e){var i=t,r=null;if(C){i="svg"===t.nodeName.toLowerCase()&&t;for(var s in C.svgs)r||(i||(i=n("svg"),i.appendChild(t)),r=i.insertBefore(n("defs"),i.firstChild)),r.appendChild(C.svgs[s]);C=null}return e.asString?(new XMLSerializer).serializeToString(i):i}function w(t,e,n){var i=S[t._class],r=i&&i(t,e);if(r){var s=e.onExport;s&&(r=s(t,r,e)||r);var a=JSON.stringify(t._data);a&&"{}"!==a&&"null"!==a&&r.setAttribute("data-paper-data",a)}return r&&f(t,r,n)}function x(t){return t||(t={}),b=new s(t.precision),t}var b,C,S={Group:r,Layer:r,Raster:o,Path:h,Shape:u,CompoundPath:l,PlacedSymbol:c,PointText:_};m.inject({exportSVG:function(t){return t=x(t),y(w(this,t,!0),t)}}),v.inject({exportSVG:function(t){t=x(t);var e=this.layers,r=this.getView(),s=r.getViewSize(),a=n("svg",{x:0,y:0,width:s.width,height:s.height,version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),o=a,h=r._matrix;h.isIdentity()||(o=a.appendChild(n("g",i(h))));for(var u=0,l=e.length;l>u;u++)o.appendChild(w(e[u],t,!0));return y(a,t)}})},new function(){function n(t,e,n,i){var r=Q[e],s=r?t.getAttributeNS(r,e):t.getAttribute(e);return"null"===s&&(s=null),null==s?i?null:n?"":0:n?s:parseFloat(s)}function i(t,e,i,r){return e=n(t,e,!1,r),i=n(t,i,!1,r),!r||null!=e&&null!=i?new h(e,i):null}function r(t,e,i,r){return e=n(t,e,!1,r),i=n(t,i,!1,r),!r||null!=e&&null!=i?new l(e,i):null}function s(t,e,n){return"none"===t?null:"number"===e?parseFloat(t):"array"===e?t?t.split(/[\s,]+/g).map(parseFloat):[]:"color"===e?S(t)||t:"lookup"===e?n[t]:t}function a(t,e,n,i){var r=t.childNodes,s="clippath"===e,a=new y,o=a._project,h=o._currentStyle,u=[];if(s||(a=C(a,t,i),o._currentStyle=a._style.clone()),i)for(var l=t.querySelectorAll("defs"),c=0,d=l.length;d>c;c++)P(l[c],n,!1);for(var c=0,d=r.length;d>c;c++){var _,f=r[c];1!==f.nodeType||"defs"===f.nodeName.toLowerCase()||!(_=P(f,n,!1))||_ instanceof p||u.push(_)}return a.addChildren(u),s&&(a=C(a.reduce(),t,i)),o._currentStyle=h,(s||"defs"===e)&&(a.remove(),a=null),a}function o(t,e){for(var n=t.getAttribute("points").match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g),i=[],r=0,s=n.length;s>r;r+=2)i.push(new h(parseFloat(n[r]),parseFloat(n[r+1])));var a=new O(i);return"polygon"===e&&a.closePath(),a}function u(t){var e=t.getAttribute("d"),n={pathData:e};return(e.match(/m/gi)||[]).length>1||/z\S+/i.test(e)?new A(n):new O(n)}function c(t,e){var r,s=(n(t,"href",!0)||"").substring(1),a="radialgradient"===e;if(s)r=z[s].getGradient();else{for(var o=t.childNodes,h=[],u=0,l=o.length;l>u;u++){var c=o[u];1===c.nodeType&&h.push(C(new D,c))}r=new j(h,a)}var d,_,f;return a?(d=i(t,"cx","cy"),_=d.add(n(t,"r"),0),f=i(t,"fx","fy",!0)):(d=i(t,"x1","y1"),_=i(t,"x2","y2")),C(new B(r,d,_,f),t),null}function _(t,e,n,i){for(var r=(i.getAttribute(n)||"").split(/\)\s*/g),s=new f,a=0,o=r.length;o>a;a++){var h=r[a];if(!h)break;for(var u=h.split(/\(\s*/),l=u[0],c=u[1].split(/[\s,]+/g),d=0,_=c.length;_>d;d++)c[d]=parseFloat(c[d]);switch(l){case"matrix":s.concatenate(new f(c[0],c[1],c[2],c[3],c[4],c[5]));break;case"rotate":s.rotate(c[0],c[1],c[2]);break;case"translate":s.translate(c[0],c[1]);break;case"scale":s.scale(c);break;case"skewX":s.skew(c[0],0);break;case"skewY":s.skew(0,c[0])}}t.transform(s)}function g(t,e,n){var i=t["fill-opacity"===n?"getFillColor":"getStrokeColor"]();i&&i.setAlpha(parseFloat(e))}function w(n,i,r){var s=n.attributes[i],a=s&&s.value;if(!a){var o=e.camelize(i);a=n.style[o],a||r.node[o]===r.parent[o]||(a=r.node[o])}return a?"none"===a?null:a:t}function C(n,i,r){var s={node:F.getStyles(i)||{},parent:!r&&F.getStyles(i.parentNode)||{}};return e.each(I,function(r,a){var o=w(i,a,s);o!==t&&(n=e.pick(r(n,o,a,i,s),n))}),n}function S(t){var e=t&&t.match(/\((?:#|)([^)']+)/);return e&&z[e[1]]}function P(t,n,i){function r(t){paper=a;var e=P(t,n,i),r=n.onLoad,s=a.project&&a.getView();r&&r.call(this,e),s.update()}if(!t)return null;n?"function"==typeof n&&(n={onLoad:n}):n={};var s=t,a=paper;if(i)if("string"!=typeof t||/^.*</.test(t)){if("undefined"!=typeof File&&t instanceof File){var o=new FileReader;return o.onload=function(){r(o.result)},o.readAsText(t)}}else{if(s=document.getElementById(t),!s)return X.request("get",t,r);t=null}if("string"==typeof t&&(s=(new DOMParser).parseFromString(t,"image/svg+xml")),!s.nodeName)throw Error("Unsupported SVG source: "+t);var h,u=s.nodeName.toLowerCase(),l=M[u],c=s.getAttribute&&s.getAttribute("data-paper-data"),d=a.settings,_=d.applyMatrix;if(d.applyMatrix=!1,h=l&&l(s,u,n,i)||null,d.applyMatrix=_,h){"#document"===u||h instanceof y||(h=C(h,s,i));var f=n.onImport;f&&(h=f(s,h,n)||h),n.expandShapes&&h instanceof x&&(h.remove(),h=h.toPath()),c&&(h._data=JSON.parse(c))}return i&&(z={},h&&e.pick(n.applyMatrix,_)&&h.matrix.apply(!0,!0)),h}var M={"#document":function(t,e,n,i){for(var r=t.childNodes,s=0,a=r.length;a>s;s++){var o=r[s];if(1===o.nodeType){var h=o.nextSibling;document.body.appendChild(o);var u=P(o,n,i);return h?t.insertBefore(o,h):t.appendChild(o),u}}},g:a,svg:a,clippath:a,polygon:o,polyline:o,path:u,lineargradient:c,radialgradient:c,image:function(t){var e=new b(n(t,"href",!0));return e.on("load",function(){var e=r(t,"width","height");this.setSize(e);var n=this._matrix._transformPoint(i(t,"x","y").add(e.divide(2)));this.translate(n)}),e},symbol:function(t,e,n,i){return new p(a(t,e,n,i),!0)},defs:a,use:function(t){var e=(n(t,"href",!0)||"").substring(1),r=z[e],s=i(t,"x","y");return r?r instanceof p?r.place(s):r.clone().translate(s):null},circle:function(t){return new x.Circle(i(t,"cx","cy"),n(t,"r"))},ellipse:function(t){return new x.Ellipse({center:i(t,"cx","cy"),radius:r(t,"rx","ry")})},rect:function(t){var e=i(t,"x","y"),n=r(t,"width","height"),s=r(t,"rx","ry");return new x.Rectangle(new d(e,n),s)},line:function(t){return new O.Line(i(t,"x1","y1"),i(t,"x2","y2"))},text:function(t){var e=new E(i(t,"x","y").add(i(t,"dx","dy")));return e.setContent(t.textContent.trim()||""),e}},I=e.set(e.each(K,function(t){this[t.attribute]=function(e,n){if(e[t.set](s(n,t.type,t.fromSVG)),"color"===t.type&&e instanceof x){var i=e[t.get]();i&&i.transform((new f).translate(e.getPosition(!0).negate()))}}},{}),{id:function(t,e){z[e]=t,t.setName&&t.setName(e)},"clip-path":function(t,e){var n=S(e);if(n){if(n=n.clone(),n.setClipMask(!0),!(t instanceof y))return new y(n,t);t.insertChild(0,n)}},gradientTransform:_,transform:_,"fill-opacity":g,"stroke-opacity":g,visibility:function(t,e){t.setVisible("visible"===e)},display:function(t,e){t.setVisible(null!==e)},"stop-color":function(t,e){t.setColor&&t.setColor(e)},"stop-opacity":function(t,e){t._color&&t._color.setAlpha(parseFloat(e))},offset:function(t,e){var n=e.match(/(.*)%$/);t.setRampPoint(n?n[1]/100:parseFloat(e))},viewBox:function(t,e,n,i,a){var o=new d(s(e,"array")),h=r(i,"width","height",!0);if(t instanceof y){var u=h?o.getSize().divide(h):1,l=(new f).translate(o.getPoint()).scale(u);t.transform(l.inverted())}else if(t instanceof p){h&&o.setSize(h);var c="visible"!=w(i,"overflow",a),_=t._definition;c&&!o.contains(_.getBounds())&&(c=new x.Rectangle(o).transform(_._matrix),c.setClipMask(!0),_.addChild(c))}}}),z={};m.inject({importSVG:function(t,e){return this.addChild(P(t,e,!0))}}),v.inject({importSVG:function(t,e){return this.activate(),P(t,e,!0)}})},paper=new(i.inject(e.exports,{enumerable:!0,Base:e,Numerical:a,Key:G})),"function"==typeof define&&define.amd?define("paper",paper):"object"==typeof module&&module&&(module.exports=paper),paper};
},{}],3:[function(require,module,exports){
/**
 * Bit twiddling hacks for JavaScript.
 *
 * Author: Mikola Lysenko
 *
 * Ported from Stanford bit twiddling hack library:
 *    http://graphics.stanford.edu/~seander/bithacks.html
 */

"use strict"; "use restrict";

//Number of bits in an integer
var INT_BITS = 32;

//Constants
exports.INT_BITS  = INT_BITS;
exports.INT_MAX   =  0x7fffffff;
exports.INT_MIN   = -1<<(INT_BITS-1);

//Returns -1, 0, +1 depending on sign of x
exports.sign = function(v) {
  return (v > 0) - (v < 0);
}

//Computes absolute value of integer
exports.abs = function(v) {
  var mask = v >> (INT_BITS-1);
  return (v ^ mask) - mask;
}

//Computes minimum of integers x and y
exports.min = function(x, y) {
  return y ^ ((x ^ y) & -(x < y));
}

//Computes maximum of integers x and y
exports.max = function(x, y) {
  return x ^ ((x ^ y) & -(x < y));
}

//Checks if a number is a power of two
exports.isPow2 = function(v) {
  return !(v & (v-1)) && (!!v);
}

//Computes log base 2 of v
exports.log2 = function(v) {
  var r, shift;
  r =     (v > 0xFFFF) << 4; v >>>= r;
  shift = (v > 0xFF  ) << 3; v >>>= shift; r |= shift;
  shift = (v > 0xF   ) << 2; v >>>= shift; r |= shift;
  shift = (v > 0x3   ) << 1; v >>>= shift; r |= shift;
  return r | (v >> 1);
}

//Computes log base 10 of v
exports.log10 = function(v) {
  return  (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 :
          (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 :
          (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
}

//Counts number of bits
exports.popCount = function(v) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
}

//Counts number of trailing zeros
function countTrailingZeros(v) {
  var c = 32;
  v &= -v;
  if (v) c--;
  if (v & 0x0000FFFF) c -= 16;
  if (v & 0x00FF00FF) c -= 8;
  if (v & 0x0F0F0F0F) c -= 4;
  if (v & 0x33333333) c -= 2;
  if (v & 0x55555555) c -= 1;
  return c;
}
exports.countTrailingZeros = countTrailingZeros;

//Rounds to next power of 2
exports.nextPow2 = function(v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}

//Rounds down to previous power of 2
exports.prevPow2 = function(v) {
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v - (v>>>1);
}

//Computes parity of word
exports.parity = function(v) {
  v ^= v >>> 16;
  v ^= v >>> 8;
  v ^= v >>> 4;
  v &= 0xf;
  return (0x6996 >>> v) & 1;
}

var REVERSE_TABLE = new Array(256);

(function(tab) {
  for(var i=0; i<256; ++i) {
    var v = i, r = i, s = 7;
    for (v >>>= 1; v; v >>>= 1) {
      r <<= 1;
      r |= v & 1;
      --s;
    }
    tab[i] = (r << s) & 0xff;
  }
})(REVERSE_TABLE);

//Reverse bits in a 32 bit word
exports.reverse = function(v) {
  return  (REVERSE_TABLE[ v         & 0xff] << 24) |
          (REVERSE_TABLE[(v >>> 8)  & 0xff] << 16) |
          (REVERSE_TABLE[(v >>> 16) & 0xff] << 8)  |
           REVERSE_TABLE[(v >>> 24) & 0xff];
}

//Interleave bits of 2 coordinates with 16 bits.  Useful for fast quadtree codes
exports.interleave2 = function(x, y) {
  x &= 0xFFFF;
  x = (x | (x << 8)) & 0x00FF00FF;
  x = (x | (x << 4)) & 0x0F0F0F0F;
  x = (x | (x << 2)) & 0x33333333;
  x = (x | (x << 1)) & 0x55555555;

  y &= 0xFFFF;
  y = (y | (y << 8)) & 0x00FF00FF;
  y = (y | (y << 4)) & 0x0F0F0F0F;
  y = (y | (y << 2)) & 0x33333333;
  y = (y | (y << 1)) & 0x55555555;

  return x | (y << 1);
}

//Extracts the nth interleaved component
exports.deinterleave2 = function(v, n) {
  v = (v >>> n) & 0x55555555;
  v = (v | (v >>> 1))  & 0x33333333;
  v = (v | (v >>> 2))  & 0x0F0F0F0F;
  v = (v | (v >>> 4))  & 0x00FF00FF;
  v = (v | (v >>> 16)) & 0x000FFFF;
  return (v << 16) >> 16;
}


//Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes
exports.interleave3 = function(x, y, z) {
  x &= 0x3FF;
  x  = (x | (x<<16)) & 4278190335;
  x  = (x | (x<<8))  & 251719695;
  x  = (x | (x<<4))  & 3272356035;
  x  = (x | (x<<2))  & 1227133513;

  y &= 0x3FF;
  y  = (y | (y<<16)) & 4278190335;
  y  = (y | (y<<8))  & 251719695;
  y  = (y | (y<<4))  & 3272356035;
  y  = (y | (y<<2))  & 1227133513;
  x |= (y << 1);
  
  z &= 0x3FF;
  z  = (z | (z<<16)) & 4278190335;
  z  = (z | (z<<8))  & 251719695;
  z  = (z | (z<<4))  & 3272356035;
  z  = (z | (z<<2))  & 1227133513;
  
  return x | (z << 2);
}

//Extracts nth interleaved component of a 3-tuple
exports.deinterleave3 = function(v, n) {
  v = (v >>> n)       & 1227133513;
  v = (v | (v>>>2))   & 3272356035;
  v = (v | (v>>>4))   & 251719695;
  v = (v | (v>>>8))   & 4278190335;
  v = (v | (v>>>16))  & 0x3FF;
  return (v<<22)>>22;
}

//Computes next combination in colexicographic order (this is mistakenly called nextPermutation on the bit twiddling hacks page)
exports.nextCombination = function(v) {
  var t = v | (v - 1);
  return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1));
}


},{}],4:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    this.length = 0
    this.parent = undefined
  }

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(array)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
} else {
  // pre-set for values that may exist in the future
  Buffer.prototype.length = undefined
  Buffer.prototype.parent = undefined
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":5,"ieee754":6,"isarray":7}],5:[function(require,module,exports){
'use strict'

exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

function init () {
  var i
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var len = code.length

  for (i = 0; i < len; i++) {
    lookup[i] = code[i]
  }

  for (i = 0; i < len; ++i) {
    revLookup[code.charCodeAt(i)] = i
  }
  revLookup['-'.charCodeAt(0)] = 62
  revLookup['_'.charCodeAt(0)] = 63
}

init()

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp & 0xFF0000) >> 16
    arr[L++] = (tmp & 0xFF00) >> 8
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],6:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],7:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],8:[function(require,module,exports){
'use strict'

var ops = require('ndarray-ops')
var ndarray = require('ndarray')
var pool = require('typedarray-pool')
var fftm = require('./lib/fft-matrix.js')

function ndfft(dir, x, y) {
  var shape = x.shape
    , d = shape.length
    , size = 1
    , stride = new Array(d)
    , pad = 0
    , i, j
  for(i=d-1; i>=0; --i) {
    stride[i] = size
    size *= shape[i]
    pad = Math.max(pad, fftm.scratchMemory(shape[i]))
    if(x.shape[i] !== y.shape[i]) {
      throw new Error('Shape mismatch, real and imaginary arrays must have same size')
    }
  }
  var buf_size = 4 * size + pad
  var buffer
  if( x.dtype === 'array' ||
      x.dtype === 'float64' ||
      x.dtype === 'custom' ) {
    buffer = pool.mallocDouble(buf_size)
  } else {
    buffer = pool.mallocFloat(buf_size)
  }
  var x1 = ndarray(buffer, shape.slice(0), stride, 0)
    , y1 = ndarray(buffer, shape.slice(0), stride.slice(0), size)
    , x2 = ndarray(buffer, shape.slice(0), stride.slice(0), 2*size)
    , y2 = ndarray(buffer, shape.slice(0), stride.slice(0), 3*size)
    , tmp, n, s1, s2
    , scratch_ptr = 4 * size
  
  //Copy into x1/y1
  ops.assign(x1, x)
  ops.assign(y1, y)
  
  for(i=d-1; i>=0; --i) {
    fftm(dir, size/shape[i], shape[i], buffer, x1.offset, y1.offset, scratch_ptr)
    if(i === 0) {
      break
    }
    
    //Compute new stride for x2/y2
    n = 1
    s1 = x2.stride
    s2 = y2.stride
    for(j=i-1; j<d; ++j) {
      s2[j] = s1[j] = n
      n *= shape[j]
    }
    for(j=i-2; j>=0; --j) {
      s2[j] = s1[j] = n
      n *= shape[j]
    }
    
    //Transpose
    ops.assign(x2, x1)
    ops.assign(y2, y1)
    
    //Swap buffers
    tmp = x1
    x1 = x2
    x2 = tmp
    tmp = y1
    y1 = y2
    y2 = tmp
  }
  
  //Copy result back into x
  ops.assign(x, x1)
  ops.assign(y, y1)
  
  pool.free(buffer)
}

module.exports = ndfft
},{"./lib/fft-matrix.js":9,"ndarray":15,"ndarray-ops":10,"typedarray-pool":20}],9:[function(require,module,exports){
var bits = require('bit-twiddle')

function fft(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr) {
  dir |= 0
  nrows |= 0
  ncols |= 0
  x_ptr |= 0
  y_ptr |= 0
  if(bits.isPow2(ncols)) {
    fftRadix2(dir, nrows, ncols, buffer, x_ptr, y_ptr)
  } else {
    fftBluestein(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr)
  }
}
module.exports = fft

function scratchMemory(n) {
  if(bits.isPow2(n)) {
    return 0
  }
  return 2 * n + 4 * bits.nextPow2(2*n + 1)
}
module.exports.scratchMemory = scratchMemory


//Radix 2 FFT Adapted from Paul Bourke's C Implementation
function fftRadix2(dir, nrows, ncols, buffer, x_ptr, y_ptr) {
  dir |= 0
  nrows |= 0
  ncols |= 0
  x_ptr |= 0
  y_ptr |= 0
  var nn,m,i,i1,j,k,i2,l,l1,l2
  var c1,c2,t,t1,t2,u1,u2,z,row,a,b,c,d,k1,k2,k3
  
  // Calculate the number of points
  nn = ncols
  m = bits.log2(nn)
  
  for(row=0; row<nrows; ++row) {  
    // Do the bit reversal
    i2 = nn >> 1;
    j = 0;
    for(i=0;i<nn-1;i++) {
      if(i < j) {
        t = buffer[x_ptr+i]
        buffer[x_ptr+i] = buffer[x_ptr+j]
        buffer[x_ptr+j] = t
        t = buffer[y_ptr+i]
        buffer[y_ptr+i] = buffer[y_ptr+j]
        buffer[y_ptr+j] = t
      }
      k = i2
      while(k <= j) {
        j -= k
        k >>= 1
      }
      j += k
    }
    
    // Compute the FFT
    c1 = -1.0
    c2 = 0.0
    l2 = 1
    for(l=0;l<m;l++) {
      l1 = l2
      l2 <<= 1
      u1 = 1.0
      u2 = 0.0
      for(j=0;j<l1;j++) {
        for(i=j;i<nn;i+=l2) {
          i1 = i + l1
          a = buffer[x_ptr+i1]
          b = buffer[y_ptr+i1]
          c = buffer[x_ptr+i]
          d = buffer[y_ptr+i]
          k1 = u1 * (a + b)
          k2 = a * (u2 - u1)
          k3 = b * (u1 + u2)
          t1 = k1 - k3
          t2 = k1 + k2
          buffer[x_ptr+i1] = c - t1
          buffer[y_ptr+i1] = d - t2
          buffer[x_ptr+i] += t1
          buffer[y_ptr+i] += t2
        }
        k1 = c1 * (u1 + u2)
        k2 = u1 * (c2 - c1)
        k3 = u2 * (c1 + c2)
        u1 = k1 - k3
        u2 = k1 + k2
      }
      c2 = Math.sqrt((1.0 - c1) / 2.0)
      if(dir < 0) {
        c2 = -c2
      }
      c1 = Math.sqrt((1.0 + c1) / 2.0)
    }
    
    // Scaling for inverse transform
    if(dir < 0) {
      var scale_f = 1.0 / nn
      for(i=0;i<nn;i++) {
        buffer[x_ptr+i] *= scale_f
        buffer[y_ptr+i] *= scale_f
      }
    }
    
    // Advance pointers
    x_ptr += ncols
    y_ptr += ncols
  }
}

// Use Bluestein algorithm for npot FFTs
// Scratch memory required:  2 * ncols + 4 * bits.nextPow2(2*ncols + 1)
function fftBluestein(dir, nrows, ncols, buffer, x_ptr, y_ptr, scratch_ptr) {
  dir |= 0
  nrows |= 0
  ncols |= 0
  x_ptr |= 0
  y_ptr |= 0
  scratch_ptr |= 0

  // Initialize tables
  var m = bits.nextPow2(2 * ncols + 1)
    , cos_ptr = scratch_ptr
    , sin_ptr = cos_ptr + ncols
    , xs_ptr  = sin_ptr + ncols
    , ys_ptr  = xs_ptr  + m
    , cft_ptr = ys_ptr  + m
    , sft_ptr = cft_ptr + m
    , w = -dir * Math.PI / ncols
    , row, a, b, c, d, k1, k2, k3
    , i
  for(i=0; i<ncols; ++i) {
    a = w * ((i * i) % (ncols * 2))
    c = Math.cos(a)
    d = Math.sin(a)
    buffer[cft_ptr+(m-i)] = buffer[cft_ptr+i] = buffer[cos_ptr+i] = c
    buffer[sft_ptr+(m-i)] = buffer[sft_ptr+i] = buffer[sin_ptr+i] = d
  }
  for(i=ncols; i<=m-ncols; ++i) {
    buffer[cft_ptr+i] = 0.0
  }
  for(i=ncols; i<=m-ncols; ++i) {
    buffer[sft_ptr+i] = 0.0
  }

  fftRadix2(1, 1, m, buffer, cft_ptr, sft_ptr)
  
  //Compute scale factor
  if(dir < 0) {
    w = 1.0 / ncols
  } else {
    w = 1.0
  }
  
  //Handle direction
  for(row=0; row<nrows; ++row) {
  
    // Copy row into scratch memory, multiply weights
    for(i=0; i<ncols; ++i) {
      a = buffer[x_ptr+i]
      b = buffer[y_ptr+i]
      c = buffer[cos_ptr+i]
      d = -buffer[sin_ptr+i]
      k1 = c * (a + b)
      k2 = a * (d - c)
      k3 = b * (c + d)
      buffer[xs_ptr+i] = k1 - k3
      buffer[ys_ptr+i] = k1 + k2
    }
    //Zero out the rest
    for(i=ncols; i<m; ++i) {
      buffer[xs_ptr+i] = 0.0
    }
    for(i=ncols; i<m; ++i) {
      buffer[ys_ptr+i] = 0.0
    }
    
    // FFT buffer
    fftRadix2(1, 1, m, buffer, xs_ptr, ys_ptr)
    
    // Apply multiplier
    for(i=0; i<m; ++i) {
      a = buffer[xs_ptr+i]
      b = buffer[ys_ptr+i]
      c = buffer[cft_ptr+i]
      d = buffer[sft_ptr+i]
      k1 = c * (a + b)
      k2 = a * (d - c)
      k3 = b * (c + d)
      buffer[xs_ptr+i] = k1 - k3
      buffer[ys_ptr+i] = k1 + k2
    }
    
    // Inverse FFT buffer
    fftRadix2(-1, 1, m, buffer, xs_ptr, ys_ptr)
    
    // Copy result back into x/y
    for(i=0; i<ncols; ++i) {
      a = buffer[xs_ptr+i]
      b = buffer[ys_ptr+i]
      c = buffer[cos_ptr+i]
      d = -buffer[sin_ptr+i]
      k1 = c * (a + b)
      k2 = a * (d - c)
      k3 = b * (c + d)
      buffer[x_ptr+i] = w * (k1 - k3)
      buffer[y_ptr+i] = w * (k1 + k2)
    }
    
    x_ptr += ncols
    y_ptr += ncols
  }
}

},{"bit-twiddle":3}],10:[function(require,module,exports){
"use strict"

var compile = require("cwise-compiler")

var EmptyProc = {
  body: "",
  args: [],
  thisVars: [],
  localVars: []
}

function fixup(x) {
  if(!x) {
    return EmptyProc
  }
  for(var i=0; i<x.args.length; ++i) {
    var a = x.args[i]
    if(i === 0) {
      x.args[i] = {name: a, lvalue:true, rvalue: !!x.rvalue, count:x.count||1 }
    } else {
      x.args[i] = {name: a, lvalue:false, rvalue:true, count: 1}
    }
  }
  if(!x.thisVars) {
    x.thisVars = []
  }
  if(!x.localVars) {
    x.localVars = []
  }
  return x
}

function pcompile(user_args) {
  return compile({
    args:     user_args.args,
    pre:      fixup(user_args.pre),
    body:     fixup(user_args.body),
    post:     fixup(user_args.proc),
    funcName: user_args.funcName
  })
}

function makeOp(user_args) {
  var args = []
  for(var i=0; i<user_args.args.length; ++i) {
    args.push("a"+i)
  }
  var wrapper = new Function("P", [
    "return function ", user_args.funcName, "_ndarrayops(", args.join(","), ") {P(", args.join(","), ");return a0}"
  ].join(""))
  return wrapper(pcompile(user_args))
}

var assign_ops = {
  add:  "+",
  sub:  "-",
  mul:  "*",
  div:  "/",
  mod:  "%",
  band: "&",
  bor:  "|",
  bxor: "^",
  lshift: "<<",
  rshift: ">>",
  rrshift: ">>>"
}
;(function(){
  for(var id in assign_ops) {
    var op = assign_ops[id]
    exports[id] = makeOp({
      args: ["array","array","array"],
      body: {args:["a","b","c"],
             body: "a=b"+op+"c"},
      funcName: id
    })
    exports[id+"eq"] = makeOp({
      args: ["array","array"],
      body: {args:["a","b"],
             body:"a"+op+"=b"},
      rvalue: true,
      funcName: id+"eq"
    })
    exports[id+"s"] = makeOp({
      args: ["array", "array", "scalar"],
      body: {args:["a","b","s"],
             body:"a=b"+op+"s"},
      funcName: id+"s"
    })
    exports[id+"seq"] = makeOp({
      args: ["array","scalar"],
      body: {args:["a","s"],
             body:"a"+op+"=s"},
      rvalue: true,
      funcName: id+"seq"
    })
  }
})();

var unary_ops = {
  not: "!",
  bnot: "~",
  neg: "-",
  recip: "1.0/"
}
;(function(){
  for(var id in unary_ops) {
    var op = unary_ops[id]
    exports[id] = makeOp({
      args: ["array", "array"],
      body: {args:["a","b"],
             body:"a="+op+"b"},
      funcName: id
    })
    exports[id+"eq"] = makeOp({
      args: ["array"],
      body: {args:["a"],
             body:"a="+op+"a"},
      rvalue: true,
      count: 2,
      funcName: id+"eq"
    })
  }
})();

var binary_ops = {
  and: "&&",
  or: "||",
  eq: "===",
  neq: "!==",
  lt: "<",
  gt: ">",
  leq: "<=",
  geq: ">="
}
;(function() {
  for(var id in binary_ops) {
    var op = binary_ops[id]
    exports[id] = makeOp({
      args: ["array","array","array"],
      body: {args:["a", "b", "c"],
             body:"a=b"+op+"c"},
      funcName: id
    })
    exports[id+"s"] = makeOp({
      args: ["array","array","scalar"],
      body: {args:["a", "b", "s"],
             body:"a=b"+op+"s"},
      funcName: id+"s"
    })
    exports[id+"eq"] = makeOp({
      args: ["array", "array"],
      body: {args:["a", "b"],
             body:"a=a"+op+"b"},
      rvalue:true,
      count:2,
      funcName: id+"eq"
    })
    exports[id+"seq"] = makeOp({
      args: ["array", "scalar"],
      body: {args:["a","s"],
             body:"a=a"+op+"s"},
      rvalue:true,
      count:2,
      funcName: id+"seq"
    })
  }
})();

var math_unary = [
  "abs",
  "acos",
  "asin",
  "atan",
  "ceil",
  "cos",
  "exp",
  "floor",
  "log",
  "round",
  "sin",
  "sqrt",
  "tan"
]
;(function() {
  for(var i=0; i<math_unary.length; ++i) {
    var f = math_unary[i]
    exports[f] = makeOp({
                    args: ["array", "array"],
                    pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                    body: {args:["a","b"], body:"a=this_f(b)", thisVars:["this_f"]},
                    funcName: f
                  })
    exports[f+"eq"] = makeOp({
                      args: ["array"],
                      pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                      body: {args: ["a"], body:"a=this_f(a)", thisVars:["this_f"]},
                      rvalue: true,
                      count: 2,
                      funcName: f+"eq"
                    })
  }
})();

var math_comm = [
  "max",
  "min",
  "atan2",
  "pow"
]
;(function(){
  for(var i=0; i<math_comm.length; ++i) {
    var f= math_comm[i]
    exports[f] = makeOp({
                  args:["array", "array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(b,c)", thisVars:["this_f"]},
                  funcName: f
                })
    exports[f+"s"] = makeOp({
                  args:["array", "array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(b,c)", thisVars:["this_f"]},
                  funcName: f+"s"
                  })
    exports[f+"eq"] = makeOp({ args:["array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(a,b)", thisVars:["this_f"]},
                  rvalue: true,
                  count: 2,
                  funcName: f+"eq"
                  })
    exports[f+"seq"] = makeOp({ args:["array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(a,b)", thisVars:["this_f"]},
                  rvalue:true,
                  count:2,
                  funcName: f+"seq"
                  })
  }
})();

var math_noncomm = [
  "atan2",
  "pow"
]
;(function(){
  for(var i=0; i<math_noncomm.length; ++i) {
    var f= math_noncomm[i]
    exports[f+"op"] = makeOp({
                  args:["array", "array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(c,b)", thisVars:["this_f"]},
                  funcName: f+"op"
                })
    exports[f+"ops"] = makeOp({
                  args:["array", "array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(c,b)", thisVars:["this_f"]},
                  funcName: f+"ops"
                  })
    exports[f+"opeq"] = makeOp({ args:["array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(b,a)", thisVars:["this_f"]},
                  rvalue: true,
                  count: 2,
                  funcName: f+"opeq"
                  })
    exports[f+"opseq"] = makeOp({ args:["array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(b,a)", thisVars:["this_f"]},
                  rvalue:true,
                  count:2,
                  funcName: f+"opseq"
                  })
  }
})();

exports.any = compile({
  args:["array"],
  pre: EmptyProc,
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "if(a){return true}", localVars: [], thisVars: []},
  post: {args:[], localVars:[], thisVars:[], body:"return false"},
  funcName: "any"
})

exports.all = compile({
  args:["array"],
  pre: EmptyProc,
  body: {args:[{name:"x", lvalue:false, rvalue:true, count:1}], body: "if(!x){return false}", localVars: [], thisVars: []},
  post: {args:[], localVars:[], thisVars:[], body:"return true"},
  funcName: "all"
})

exports.sum = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "this_s+=a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "sum"
})

exports.prod = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=1"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "this_s*=a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "prod"
})

exports.norm2squared = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:2}], body: "this_s+=a*a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "norm2squared"
})
  
exports.norm2 = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:2}], body: "this_s+=a*a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return Math.sqrt(this_s)"},
  funcName: "norm2"
})
  

exports.norminf = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:4}], body:"if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "norminf"
})

exports.norm1 = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:3}], body: "this_s+=a<0?-a:a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "norm1"
})

exports.sup = compile({
  args: [ "array" ],
  pre:
   { body: "this_h=-Infinity",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] },
  body:
   { body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
     args: [{"name":"_inline_1_arg0_","lvalue":false,"rvalue":true,"count":2} ],
     thisVars: [ "this_h" ],
     localVars: [] },
  post:
   { body: "return this_h",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] }
 })

exports.inf = compile({
  args: [ "array" ],
  pre:
   { body: "this_h=Infinity",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] },
  body:
   { body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
     args: [{"name":"_inline_1_arg0_","lvalue":false,"rvalue":true,"count":2} ],
     thisVars: [ "this_h" ],
     localVars: [] },
  post:
   { body: "return this_h",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] }
 })

exports.argmin = compile({
  args:["index","array","shape"],
  pre:{
    body:"{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
    args:[
      {name:"_inline_0_arg0_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg1_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg2_",lvalue:false,rvalue:true,count:1}
      ],
    thisVars:["this_i","this_v"],
    localVars:[]},
  body:{
    body:"{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
    args:[
      {name:"_inline_1_arg0_",lvalue:false,rvalue:true,count:2},
      {name:"_inline_1_arg1_",lvalue:false,rvalue:true,count:2}],
    thisVars:["this_i","this_v"],
    localVars:["_inline_1_k"]},
  post:{
    body:"{return this_i}",
    args:[],
    thisVars:["this_i"],
    localVars:[]}
})

exports.argmax = compile({
  args:["index","array","shape"],
  pre:{
    body:"{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
    args:[
      {name:"_inline_0_arg0_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg1_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg2_",lvalue:false,rvalue:true,count:1}
      ],
    thisVars:["this_i","this_v"],
    localVars:[]},
  body:{
    body:"{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
    args:[
      {name:"_inline_1_arg0_",lvalue:false,rvalue:true,count:2},
      {name:"_inline_1_arg1_",lvalue:false,rvalue:true,count:2}],
    thisVars:["this_i","this_v"],
    localVars:["_inline_1_k"]},
  post:{
    body:"{return this_i}",
    args:[],
    thisVars:["this_i"],
    localVars:[]}
})  

exports.random = makeOp({
  args: ["array"],
  pre: {args:[], body:"this_f=Math.random", thisVars:["this_f"]},
  body: {args: ["a"], body:"a=this_f()", thisVars:["this_f"]},
  funcName: "random"
})

exports.assign = makeOp({
  args:["array", "array"],
  body: {args:["a", "b"], body:"a=b"},
  funcName: "assign" })

exports.assigns = makeOp({
  args:["array", "scalar"],
  body: {args:["a", "b"], body:"a=b"},
  funcName: "assigns" })


exports.equals = compile({
  args:["array", "array"],
  pre: EmptyProc,
  body: {args:[{name:"x", lvalue:false, rvalue:true, count:1},
               {name:"y", lvalue:false, rvalue:true, count:1}], 
        body: "if(x!==y){return false}", 
        localVars: [], 
        thisVars: []},
  post: {args:[], localVars:[], thisVars:[], body:"return true"},
  funcName: "equals"
})



},{"cwise-compiler":11}],11:[function(require,module,exports){
"use strict"

var createThunk = require("./lib/thunk.js")

function Procedure() {
  this.argTypes = []
  this.shimArgs = []
  this.arrayArgs = []
  this.arrayBlockIndices = []
  this.scalarArgs = []
  this.offsetArgs = []
  this.offsetArgIndex = []
  this.indexArgs = []
  this.shapeArgs = []
  this.funcName = ""
  this.pre = null
  this.body = null
  this.post = null
  this.debug = false
}

function compileCwise(user_args) {
  //Create procedure
  var proc = new Procedure()
  
  //Parse blocks
  proc.pre    = user_args.pre
  proc.body   = user_args.body
  proc.post   = user_args.post

  //Parse arguments
  var proc_args = user_args.args.slice(0)
  proc.argTypes = proc_args
  for(var i=0; i<proc_args.length; ++i) {
    var arg_type = proc_args[i]
    if(arg_type === "array" || (typeof arg_type === "object" && arg_type.blockIndices)) {
      proc.argTypes[i] = "array"
      proc.arrayArgs.push(i)
      proc.arrayBlockIndices.push(arg_type.blockIndices ? arg_type.blockIndices : 0)
      proc.shimArgs.push("array" + i)
      if(i < proc.pre.args.length && proc.pre.args[i].count>0) {
        throw new Error("cwise: pre() block may not reference array args")
      }
      if(i < proc.post.args.length && proc.post.args[i].count>0) {
        throw new Error("cwise: post() block may not reference array args")
      }
    } else if(arg_type === "scalar") {
      proc.scalarArgs.push(i)
      proc.shimArgs.push("scalar" + i)
    } else if(arg_type === "index") {
      proc.indexArgs.push(i)
      if(i < proc.pre.args.length && proc.pre.args[i].count > 0) {
        throw new Error("cwise: pre() block may not reference array index")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array index")
      }
      if(i < proc.post.args.length && proc.post.args[i].count > 0) {
        throw new Error("cwise: post() block may not reference array index")
      }
    } else if(arg_type === "shape") {
      proc.shapeArgs.push(i)
      if(i < proc.pre.args.length && proc.pre.args[i].lvalue) {
        throw new Error("cwise: pre() block may not write to array shape")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array shape")
      }
      if(i < proc.post.args.length && proc.post.args[i].lvalue) {
        throw new Error("cwise: post() block may not write to array shape")
      }
    } else if(typeof arg_type === "object" && arg_type.offset) {
      proc.argTypes[i] = "offset"
      proc.offsetArgs.push({ array: arg_type.array, offset:arg_type.offset })
      proc.offsetArgIndex.push(i)
    } else {
      throw new Error("cwise: Unknown argument type " + proc_args[i])
    }
  }
  
  //Make sure at least one array argument was specified
  if(proc.arrayArgs.length <= 0) {
    throw new Error("cwise: No array arguments specified")
  }
  
  //Make sure arguments are correct
  if(proc.pre.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in pre() block")
  }
  if(proc.body.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in body() block")
  }
  if(proc.post.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in post() block")
  }

  //Check debug flag
  proc.debug = !!user_args.printCode || !!user_args.debug
  
  //Retrieve name
  proc.funcName = user_args.funcName || "cwise"
  
  //Read in block size
  proc.blockSize = user_args.blockSize || 64

  return createThunk(proc)
}

module.exports = compileCwise

},{"./lib/thunk.js":13}],12:[function(require,module,exports){
"use strict"

var uniq = require("uniq")

// This function generates very simple loops analogous to how you typically traverse arrays (the outermost loop corresponds to the slowest changing index, the innermost loop to the fastest changing index)
// TODO: If two arrays have the same strides (and offsets) there is potential for decreasing the number of "pointers" and related variables. The drawback is that the type signature would become more specific and that there would thus be less potential for caching, but it might still be worth it, especially when dealing with large numbers of arguments.
function innerFill(order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , has_index = proc.indexArgs.length>0
    , code = []
    , vars = []
    , idx=0, pidx=0, i, j
  for(i=0; i<dimension; ++i) { // Iteration variables
    vars.push(["i",i,"=0"].join(""))
  }
  //Compute scan deltas
  for(j=0; j<nargs; ++j) {
    for(i=0; i<dimension; ++i) {
      pidx = idx
      idx = order[i]
      if(i === 0) { // The innermost/fastest dimension's delta is simply its stride
        vars.push(["d",j,"s",i,"=t",j,"p",idx].join(""))
      } else { // For other dimensions the delta is basically the stride minus something which essentially "rewinds" the previous (more inner) dimension
        vars.push(["d",j,"s",i,"=(t",j,"p",idx,"-s",pidx,"*t",j,"p",pidx,")"].join(""))
      }
    }
  }
  code.push("var " + vars.join(","))
  //Scan loop
  for(i=dimension-1; i>=0; --i) { // Start at largest stride and work your way inwards
    idx = order[i]
    code.push(["for(i",i,"=0;i",i,"<s",idx,";++i",i,"){"].join(""))
  }
  //Push body of inner loop
  code.push(body)
  //Advance scan pointers
  for(i=0; i<dimension; ++i) {
    pidx = idx
    idx = order[i]
    for(j=0; j<nargs; ++j) {
      code.push(["p",j,"+=d",j,"s",i].join(""))
    }
    if(has_index) {
      if(i > 0) {
        code.push(["index[",pidx,"]-=s",pidx].join(""))
      }
      code.push(["++index[",idx,"]"].join(""))
    }
    code.push("}")
  }
  return code.join("\n")
}

// Generate "outer" loops that loop over blocks of data, applying "inner" loops to the blocks by manipulating the local variables in such a way that the inner loop only "sees" the current block.
// TODO: If this is used, then the previous declaration (done by generateCwiseOp) of s* is essentially unnecessary.
//       I believe the s* are not used elsewhere (in particular, I don't think they're used in the pre/post parts and "shape" is defined independently), so it would be possible to make defining the s* dependent on what loop method is being used.
function outerFill(matched, order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , blockSize = proc.blockSize
    , has_index = proc.indexArgs.length > 0
    , code = []
  for(var i=0; i<nargs; ++i) {
    code.push(["var offset",i,"=p",i].join(""))
  }
  //Generate loops for unmatched dimensions
  // The order in which these dimensions are traversed is fairly arbitrary (from small stride to large stride, for the first argument)
  // TODO: It would be nice if the order in which these loops are placed would also be somehow "optimal" (at the very least we should check that it really doesn't hurt us if they're not).
  for(var i=matched; i<dimension; ++i) {
    code.push(["for(var j"+i+"=SS[", order[i], "]|0;j", i, ">0;){"].join("")) // Iterate back to front
    code.push(["if(j",i,"<",blockSize,"){"].join("")) // Either decrease j by blockSize (s = blockSize), or set it to zero (after setting s = j).
    code.push(["s",order[i],"=j",i].join(""))
    code.push(["j",i,"=0"].join(""))
    code.push(["}else{s",order[i],"=",blockSize].join(""))
    code.push(["j",i,"-=",blockSize,"}"].join(""))
    if(has_index) {
      code.push(["index[",order[i],"]=j",i].join(""))
    }
  }
  for(var i=0; i<nargs; ++i) {
    var indexStr = ["offset"+i]
    for(var j=matched; j<dimension; ++j) {
      indexStr.push(["j",j,"*t",i,"p",order[j]].join(""))
    }
    code.push(["p",i,"=(",indexStr.join("+"),")"].join(""))
  }
  code.push(innerFill(order, proc, body))
  for(var i=matched; i<dimension; ++i) {
    code.push("}")
  }
  return code.join("\n")
}

//Count the number of compatible inner orders
// This is the length of the longest common prefix of the arrays in orders.
// Each array in orders lists the dimensions of the correspond ndarray in order of increasing stride.
// This is thus the maximum number of dimensions that can be efficiently traversed by simple nested loops for all arrays.
function countMatches(orders) {
  var matched = 0, dimension = orders[0].length
  while(matched < dimension) {
    for(var j=1; j<orders.length; ++j) {
      if(orders[j][matched] !== orders[0][matched]) {
        return matched
      }
    }
    ++matched
  }
  return matched
}

//Processes a block according to the given data types
// Replaces variable names by different ones, either "local" ones (that are then ferried in and out of the given array) or ones matching the arguments that the function performing the ultimate loop will accept.
function processBlock(block, proc, dtypes) {
  var code = block.body
  var pre = []
  var post = []
  for(var i=0; i<block.args.length; ++i) {
    var carg = block.args[i]
    if(carg.count <= 0) {
      continue
    }
    var re = new RegExp(carg.name, "g")
    var ptrStr = ""
    var arrNum = proc.arrayArgs.indexOf(i)
    switch(proc.argTypes[i]) {
      case "offset":
        var offArgIndex = proc.offsetArgIndex.indexOf(i)
        var offArg = proc.offsetArgs[offArgIndex]
        arrNum = offArg.array
        ptrStr = "+q" + offArgIndex // Adds offset to the "pointer" in the array
      case "array":
        ptrStr = "p" + arrNum + ptrStr
        var localStr = "l" + i
        var arrStr = "a" + arrNum
        if (proc.arrayBlockIndices[arrNum] === 0) { // Argument to body is just a single value from this array
          if(carg.count === 1) { // Argument/array used only once(?)
            if(dtypes[arrNum] === "generic") {
              if(carg.lvalue) {
                pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
                code = code.replace(re, localStr)
                post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
              } else {
                code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
              }
            } else {
              code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""))
            }
          } else if(dtypes[arrNum] === "generic") {
            pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // TODO: Could we optimize by checking for carg.rvalue?
            code = code.replace(re, localStr)
            if(carg.lvalue) {
              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
            }
          } else {
            pre.push(["var ", localStr, "=", arrStr, "[", ptrStr, "]"].join("")) // TODO: Could we optimize by checking for carg.rvalue?
            code = code.replace(re, localStr)
            if(carg.lvalue) {
              post.push([arrStr, "[", ptrStr, "]=", localStr].join(""))
            }
          }
        } else { // Argument to body is a "block"
          var reStrArr = [carg.name], ptrStrArr = [ptrStr]
          for(var j=0; j<Math.abs(proc.arrayBlockIndices[arrNum]); j++) {
            reStrArr.push("\\s*\\[([^\\]]+)\\]")
            ptrStrArr.push("$" + (j+1) + "*t" + arrNum + "b" + j) // Matched index times stride
          }
          re = new RegExp(reStrArr.join(""), "g")
          ptrStr = ptrStrArr.join("+")
          if(dtypes[arrNum] === "generic") {
            /*if(carg.lvalue) {
              pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
              code = code.replace(re, localStr)
              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
            } else {
              code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
            }*/
            throw new Error("cwise: Generic arrays not supported in combination with blocks!")
          } else {
            // This does not produce any local variables, even if variables are used multiple times. It would be possible to do so, but it would complicate things quite a bit.
            code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""))
          }
        }
      break
      case "scalar":
        code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i))
      break
      case "index":
        code = code.replace(re, "index")
      break
      case "shape":
        code = code.replace(re, "shape")
      break
    }
  }
  return [pre.join("\n"), code, post.join("\n")].join("\n").trim()
}

function typeSummary(dtypes) {
  var summary = new Array(dtypes.length)
  var allEqual = true
  for(var i=0; i<dtypes.length; ++i) {
    var t = dtypes[i]
    var digits = t.match(/\d+/)
    if(!digits) {
      digits = ""
    } else {
      digits = digits[0]
    }
    if(t.charAt(0) === 0) {
      summary[i] = "u" + t.charAt(1) + digits
    } else {
      summary[i] = t.charAt(0) + digits
    }
    if(i > 0) {
      allEqual = allEqual && summary[i] === summary[i-1]
    }
  }
  if(allEqual) {
    return summary[0]
  }
  return summary.join("")
}

//Generates a cwise operator
function generateCWiseOp(proc, typesig) {

  //Compute dimension
  // Arrays get put first in typesig, and there are two entries per array (dtype and order), so this gets the number of dimensions in the first array arg.
  var dimension = (typesig[1].length - Math.abs(proc.arrayBlockIndices[0]))|0
  var orders = new Array(proc.arrayArgs.length)
  var dtypes = new Array(proc.arrayArgs.length)
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    dtypes[i] = typesig[2*i]
    orders[i] = typesig[2*i+1]
  }
  
  //Determine where block and loop indices start and end
  var blockBegin = [], blockEnd = [] // These indices are exposed as blocks
  var loopBegin = [], loopEnd = [] // These indices are iterated over
  var loopOrders = [] // orders restricted to the loop indices
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    if (proc.arrayBlockIndices[i]<0) {
      loopBegin.push(0)
      loopEnd.push(dimension)
      blockBegin.push(dimension)
      blockEnd.push(dimension+proc.arrayBlockIndices[i])
    } else {
      loopBegin.push(proc.arrayBlockIndices[i]) // Non-negative
      loopEnd.push(proc.arrayBlockIndices[i]+dimension)
      blockBegin.push(0)
      blockEnd.push(proc.arrayBlockIndices[i])
    }
    var newOrder = []
    for(var j=0; j<orders[i].length; j++) {
      if (loopBegin[i]<=orders[i][j] && orders[i][j]<loopEnd[i]) {
        newOrder.push(orders[i][j]-loopBegin[i]) // If this is a loop index, put it in newOrder, subtracting loopBegin, to make sure that all loopOrders are using a common set of indices.
      }
    }
    loopOrders.push(newOrder)
  }

  //First create arguments for procedure
  var arglist = ["SS"] // SS is the overall shape over which we iterate
  var code = ["'use strict'"]
  var vars = []
  
  for(var j=0; j<dimension; ++j) {
    vars.push(["s", j, "=SS[", j, "]"].join("")) // The limits for each dimension.
  }
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    arglist.push("a"+i) // Actual data array
    arglist.push("t"+i) // Strides
    arglist.push("p"+i) // Offset in the array at which the data starts (also used for iterating over the data)
    
    for(var j=0; j<dimension; ++j) { // Unpack the strides into vars for looping
      vars.push(["t",i,"p",j,"=t",i,"[",loopBegin[i]+j,"]"].join(""))
    }
    
    for(var j=0; j<Math.abs(proc.arrayBlockIndices[i]); ++j) { // Unpack the strides into vars for block iteration
      vars.push(["t",i,"b",j,"=t",i,"[",blockBegin[i]+j,"]"].join(""))
    }
  }
  for(var i=0; i<proc.scalarArgs.length; ++i) {
    arglist.push("Y" + i)
  }
  if(proc.shapeArgs.length > 0) {
    vars.push("shape=SS.slice(0)") // Makes the shape over which we iterate available to the user defined functions (so you can use width/height for example)
  }
  if(proc.indexArgs.length > 0) {
    // Prepare an array to keep track of the (logical) indices, initialized to dimension zeroes.
    var zeros = new Array(dimension)
    for(var i=0; i<dimension; ++i) {
      zeros[i] = "0"
    }
    vars.push(["index=[", zeros.join(","), "]"].join(""))
  }
  for(var i=0; i<proc.offsetArgs.length; ++i) { // Offset arguments used for stencil operations
    var off_arg = proc.offsetArgs[i]
    var init_string = []
    for(var j=0; j<off_arg.offset.length; ++j) {
      if(off_arg.offset[j] === 0) {
        continue
      } else if(off_arg.offset[j] === 1) {
        init_string.push(["t", off_arg.array, "p", j].join(""))      
      } else {
        init_string.push([off_arg.offset[j], "*t", off_arg.array, "p", j].join(""))
      }
    }
    if(init_string.length === 0) {
      vars.push("q" + i + "=0")
    } else {
      vars.push(["q", i, "=", init_string.join("+")].join(""))
    }
  }

  //Prepare this variables
  var thisVars = uniq([].concat(proc.pre.thisVars)
                      .concat(proc.body.thisVars)
                      .concat(proc.post.thisVars))
  vars = vars.concat(thisVars)
  code.push("var " + vars.join(","))
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    code.push("p"+i+"|=0")
  }
  
  //Inline prelude
  if(proc.pre.body.length > 3) {
    code.push(processBlock(proc.pre, proc, dtypes))
  }

  //Process body
  var body = processBlock(proc.body, proc, dtypes)
  var matched = countMatches(loopOrders)
  if(matched < dimension) {
    code.push(outerFill(matched, loopOrders[0], proc, body)) // TODO: Rather than passing loopOrders[0], it might be interesting to look at passing an order that represents the majority of the arguments for example.
  } else {
    code.push(innerFill(loopOrders[0], proc, body))
  }

  //Inline epilog
  if(proc.post.body.length > 3) {
    code.push(processBlock(proc.post, proc, dtypes))
  }
  
  if(proc.debug) {
    console.log("-----Generated cwise routine for ", typesig, ":\n" + code.join("\n") + "\n----------")
  }
  
  var loopName = [(proc.funcName||"unnamed"), "_cwise_loop_", orders[0].join("s"),"m",matched,typeSummary(dtypes)].join("")
  var f = new Function(["function ",loopName,"(", arglist.join(","),"){", code.join("\n"),"} return ", loopName].join(""))
  return f()
}
module.exports = generateCWiseOp

},{"uniq":14}],13:[function(require,module,exports){
"use strict"

// The function below is called when constructing a cwise function object, and does the following:
// A function object is constructed which accepts as argument a compilation function and returns another function.
// It is this other function that is eventually returned by createThunk, and this function is the one that actually
// checks whether a certain pattern of arguments has already been used before and compiles new loops as needed.
// The compilation passed to the first function object is used for compiling new functions.
// Once this function object is created, it is called with compile as argument, where the first argument of compile
// is bound to "proc" (essentially containing a preprocessed version of the user arguments to cwise).
// So createThunk roughly works like this:
// function createThunk(proc) {
//   var thunk = function(compileBound) {
//     var CACHED = {}
//     return function(arrays and scalars) {
//       if (dtype and order of arrays in CACHED) {
//         var func = CACHED[dtype and order of arrays]
//       } else {
//         var func = CACHED[dtype and order of arrays] = compileBound(dtype and order of arrays)
//       }
//       return func(arrays and scalars)
//     }
//   }
//   return thunk(compile.bind1(proc))
// }

var compile = require("./compile.js")

function createThunk(proc) {
  var code = ["'use strict'", "var CACHED={}"]
  var vars = []
  var thunkName = proc.funcName + "_cwise_thunk"
  
  //Build thunk
  code.push(["return function ", thunkName, "(", proc.shimArgs.join(","), "){"].join(""))
  var typesig = []
  var string_typesig = []
  var proc_args = [["array",proc.arrayArgs[0],".shape.slice(", // Slice shape so that we only retain the shape over which we iterate (which gets passed to the cwise operator as SS).
                    Math.max(0,proc.arrayBlockIndices[0]),proc.arrayBlockIndices[0]<0?(","+proc.arrayBlockIndices[0]+")"):")"].join("")]
  var shapeLengthConditions = [], shapeConditions = []
  // Process array arguments
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    var j = proc.arrayArgs[i]
    vars.push(["t", j, "=array", j, ".dtype,",
               "r", j, "=array", j, ".order"].join(""))
    typesig.push("t" + j)
    typesig.push("r" + j)
    string_typesig.push("t"+j)
    string_typesig.push("r"+j+".join()")
    proc_args.push("array" + j + ".data")
    proc_args.push("array" + j + ".stride")
    proc_args.push("array" + j + ".offset|0")
    if (i>0) { // Gather conditions to check for shape equality (ignoring block indices)
      shapeLengthConditions.push("array" + proc.arrayArgs[0] + ".shape.length===array" + j + ".shape.length+" + (Math.abs(proc.arrayBlockIndices[0])-Math.abs(proc.arrayBlockIndices[i])))
      shapeConditions.push("array" + proc.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0,proc.arrayBlockIndices[0]) + "]===array" + j + ".shape[shapeIndex+" + Math.max(0,proc.arrayBlockIndices[i]) + "]")
    }
  }
  // Check for shape equality
  if (proc.arrayArgs.length > 1) {
    code.push("if (!(" + shapeLengthConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')")
    code.push("for(var shapeIndex=array" + proc.arrayArgs[0] + ".shape.length-" + Math.abs(proc.arrayBlockIndices[0]) + "; shapeIndex-->0;) {")
    code.push("if (!(" + shapeConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')")
    code.push("}")
  }
  // Process scalar arguments
  for(var i=0; i<proc.scalarArgs.length; ++i) {
    proc_args.push("scalar" + proc.scalarArgs[i])
  }
  // Check for cached function (and if not present, generate it)
  vars.push(["type=[", string_typesig.join(","), "].join()"].join(""))
  vars.push("proc=CACHED[type]")
  code.push("var " + vars.join(","))
  
  code.push(["if(!proc){",
             "CACHED[type]=proc=compile([", typesig.join(","), "])}",
             "return proc(", proc_args.join(","), ")}"].join(""))

  if(proc.debug) {
    console.log("-----Generated thunk:\n" + code.join("\n") + "\n----------")
  }
  
  //Compile thunk
  var thunk = new Function("compile", code.join("\n"))
  return thunk(compile.bind(undefined, proc))
}

module.exports = createThunk

},{"./compile.js":12}],14:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}],15:[function(require,module,exports){
var iota = require("iota-array")
var isBuffer = require("is-buffer")

var hasTypedArrays  = ((typeof Float64Array) !== "undefined")

function compare1st(a, b) {
  return a[0] - b[0]
}

function order() {
  var stride = this.stride
  var terms = new Array(stride.length)
  var i
  for(i=0; i<terms.length; ++i) {
    terms[i] = [Math.abs(stride[i]), i]
  }
  terms.sort(compare1st)
  var result = new Array(terms.length)
  for(i=0; i<result.length; ++i) {
    result[i] = terms[i][1]
  }
  return result
}

function compileConstructor(dtype, dimension) {
  var className = ["View", dimension, "d", dtype].join("")
  if(dimension < 0) {
    className = "View_Nil" + dtype
  }
  var useGetters = (dtype === "generic")

  if(dimension === -1) {
    //Special case for trivial arrays
    var code =
      "function "+className+"(a){this.data=a;};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new "+className+"(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_"+className+"(a){return new "+className+"(a);}"
    var procedure = new Function(code)
    return procedure()
  } else if(dimension === 0) {
    //Special case for 0d arrays
    var code =
      "function "+className+"(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function "+className+"_copy() {\
return new "+className+"(this.data,this.offset)\
};\
proto.pick=function "+className+"_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function "+className+"_get(){\
return "+(useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]")+
"};\
proto.set=function "+className+"_set(v){\
return "+(useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v")+"\
};\
return function construct_"+className+"(a,b,c,d){return new "+className+"(a,d)}"
    var procedure = new Function("TrivialArray", code)
    return procedure(CACHED_CONSTRUCTORS[dtype][0])
  }

  var code = ["'use strict'"]

  //Create constructor for view
  var indices = iota(dimension)
  var args = indices.map(function(i) { return "i"+i })
  var index_str = "this.offset+" + indices.map(function(i) {
        return "this.stride[" + i + "]*i" + i
      }).join("+")
  var shapeArg = indices.map(function(i) {
      return "b"+i
    }).join(",")
  var strideArg = indices.map(function(i) {
      return "c"+i
    }).join(",")
  code.push(
    "function "+className+"(a," + shapeArg + "," + strideArg + ",d){this.data=a",
      "this.shape=[" + shapeArg + "]",
      "this.stride=[" + strideArg + "]",
      "this.offset=d|0}",
    "var proto="+className+".prototype",
    "proto.dtype='"+dtype+"'",
    "proto.dimension="+dimension)

  //view.size:
  code.push("Object.defineProperty(proto,'size',{get:function "+className+"_size(){\
return "+indices.map(function(i) { return "this.shape["+i+"]" }).join("*"),
"}})")

  //view.order:
  if(dimension === 1) {
    code.push("proto.order=[0]")
  } else {
    code.push("Object.defineProperty(proto,'order',{get:")
    if(dimension < 4) {
      code.push("function "+className+"_order(){")
      if(dimension === 2) {
        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})")
      } else if(dimension === 3) {
        code.push(
"var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})")
      }
    } else {
      code.push("ORDER})")
    }
  }

  //view.set(i0, ..., v):
  code.push(
"proto.set=function "+className+"_set("+args.join(",")+",v){")
  if(useGetters) {
    code.push("return this.data.set("+index_str+",v)}")
  } else {
    code.push("return this.data["+index_str+"]=v}")
  }

  //view.get(i0, ...):
  code.push("proto.get=function "+className+"_get("+args.join(",")+"){")
  if(useGetters) {
    code.push("return this.data.get("+index_str+")}")
  } else {
    code.push("return this.data["+index_str+"]}")
  }

  //view.index:
  code.push(
    "proto.index=function "+className+"_index(", args.join(), "){return "+index_str+"}")

  //view.hi():
  code.push("proto.hi=function "+className+"_hi("+args.join(",")+"){return new "+className+"(this.data,"+
    indices.map(function(i) {
      return ["(typeof i",i,"!=='number'||i",i,"<0)?this.shape[", i, "]:i", i,"|0"].join("")
    }).join(",")+","+
    indices.map(function(i) {
      return "this.stride["+i + "]"
    }).join(",")+",this.offset)}")

  //view.lo():
  var a_vars = indices.map(function(i) { return "a"+i+"=this.shape["+i+"]" })
  var c_vars = indices.map(function(i) { return "c"+i+"=this.stride["+i+"]" })
  code.push("proto.lo=function "+className+"_lo("+args.join(",")+"){var b=this.offset,d=0,"+a_vars.join(",")+","+c_vars.join(","))
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'&&i"+i+">=0){\
d=i"+i+"|0;\
b+=c"+i+"*d;\
a"+i+"-=d}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a"+i
    }).join(",")+","+
    indices.map(function(i) {
      return "c"+i
    }).join(",")+",b)}")

  //view.step():
  code.push("proto.step=function "+className+"_step("+args.join(",")+"){var "+
    indices.map(function(i) {
      return "a"+i+"=this.shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "b"+i+"=this.stride["+i+"]"
    }).join(",")+",c=this.offset,d=0,ceil=Math.ceil")
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'){\
d=i"+i+"|0;\
if(d<0){\
c+=b"+i+"*(a"+i+"-1);\
a"+i+"=ceil(-a"+i+"/d)\
}else{\
a"+i+"=ceil(a"+i+"/d)\
}\
b"+i+"*=d\
}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a" + i
    }).join(",")+","+
    indices.map(function(i) {
      return "b" + i
    }).join(",")+",c)}")

  //view.transpose():
  var tShape = new Array(dimension)
  var tStride = new Array(dimension)
  for(var i=0; i<dimension; ++i) {
    tShape[i] = "a[i"+i+"]"
    tStride[i] = "b[i"+i+"]"
  }
  code.push("proto.transpose=function "+className+"_transpose("+args+"){"+
    args.map(function(n,idx) { return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)"}).join(";"),
    "var a=this.shape,b=this.stride;return new "+className+"(this.data,"+tShape.join(",")+","+tStride.join(",")+",this.offset)}")

  //view.pick():
  code.push("proto.pick=function "+className+"_pick("+args+"){var a=[],b=[],c=this.offset")
  for(var i=0; i<dimension; ++i) {
    code.push("if(typeof i"+i+"==='number'&&i"+i+">=0){c=(c+this.stride["+i+"]*i"+i+")|0}else{a.push(this.shape["+i+"]);b.push(this.stride["+i+"])}")
  }
  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}")

  //Add return statement
  code.push("return function construct_"+className+"(data,shape,stride,offset){return new "+className+"(data,"+
    indices.map(function(i) {
      return "shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "stride["+i+"]"
    }).join(",")+",offset)}")

  //Compile procedure
  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"))
  return procedure(CACHED_CONSTRUCTORS[dtype], order)
}

function arrayDType(data) {
  if(isBuffer(data)) {
    return "buffer"
  }
  if(hasTypedArrays) {
    switch(Object.prototype.toString.call(data)) {
      case "[object Float64Array]":
        return "float64"
      case "[object Float32Array]":
        return "float32"
      case "[object Int8Array]":
        return "int8"
      case "[object Int16Array]":
        return "int16"
      case "[object Int32Array]":
        return "int32"
      case "[object Uint8Array]":
        return "uint8"
      case "[object Uint16Array]":
        return "uint16"
      case "[object Uint32Array]":
        return "uint32"
      case "[object Uint8ClampedArray]":
        return "uint8_clamped"
    }
  }
  if(Array.isArray(data)) {
    return "array"
  }
  return "generic"
}

var CACHED_CONSTRUCTORS = {
  "float32":[],
  "float64":[],
  "int8":[],
  "int16":[],
  "int32":[],
  "uint8":[],
  "uint16":[],
  "uint32":[],
  "array":[],
  "uint8_clamped":[],
  "buffer":[],
  "generic":[]
}

;(function() {
  for(var id in CACHED_CONSTRUCTORS) {
    CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1))
  }
});

function wrappedNDArrayCtor(data, shape, stride, offset) {
  if(data === undefined) {
    var ctor = CACHED_CONSTRUCTORS.array[0]
    return ctor([])
  } else if(typeof data === "number") {
    data = [data]
  }
  if(shape === undefined) {
    shape = [ data.length ]
  }
  var d = shape.length
  if(stride === undefined) {
    stride = new Array(d)
    for(var i=d-1, sz=1; i>=0; --i) {
      stride[i] = sz
      sz *= shape[i]
    }
  }
  if(offset === undefined) {
    offset = 0
    for(var i=0; i<d; ++i) {
      if(stride[i] < 0) {
        offset -= (shape[i]-1)*stride[i]
      }
    }
  }
  var dtype = arrayDType(data)
  var ctor_list = CACHED_CONSTRUCTORS[dtype]
  while(ctor_list.length <= d+1) {
    ctor_list.push(compileConstructor(dtype, ctor_list.length-1))
  }
  var ctor = ctor_list[d+1]
  return ctor(data, shape, stride, offset)
}

module.exports = wrappedNDArrayCtor

},{"iota-array":16,"is-buffer":17}],16:[function(require,module,exports){
"use strict"

function iota(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = i
  }
  return result
}

module.exports = iota
},{}],17:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}

},{}],18:[function(require,module,exports){
'use strict'

function hann (i,N) {
  return 0.5*(1 - Math.cos(6.283185307179586*i/(N-1)))
}

module.exports = hann

},{}],19:[function(require,module,exports){
"use strict"

function dupe_array(count, value, i) {
  var c = count[i]|0
  if(c <= 0) {
    return []
  }
  var result = new Array(c), j
  if(i === count.length-1) {
    for(j=0; j<c; ++j) {
      result[j] = value
    }
  } else {
    for(j=0; j<c; ++j) {
      result[j] = dupe_array(count, value, i+1)
    }
  }
  return result
}

function dupe_number(count, value) {
  var result, i
  result = new Array(count)
  for(i=0; i<count; ++i) {
    result[i] = value
  }
  return result
}

function dupe(count, value) {
  if(typeof value === "undefined") {
    value = 0
  }
  switch(typeof count) {
    case "number":
      if(count > 0) {
        return dupe_number(count|0, value)
      }
    break
    case "object":
      if(typeof (count.length) === "number") {
        return dupe_array(count, value, 0)
      }
    break
  }
  return []
}

module.exports = dupe
},{}],20:[function(require,module,exports){
(function (global,Buffer){
'use strict'

var bits = require('bit-twiddle')
var dup = require('dup')

//Legacy pool support
if(!global.__TYPEDARRAY_POOL) {
  global.__TYPEDARRAY_POOL = {
      UINT8   : dup([32, 0])
    , UINT16  : dup([32, 0])
    , UINT32  : dup([32, 0])
    , INT8    : dup([32, 0])
    , INT16   : dup([32, 0])
    , INT32   : dup([32, 0])
    , FLOAT   : dup([32, 0])
    , DOUBLE  : dup([32, 0])
    , DATA    : dup([32, 0])
    , UINT8C  : dup([32, 0])
    , BUFFER  : dup([32, 0])
  }
}

var hasUint8C = (typeof Uint8ClampedArray) !== 'undefined'
var POOL = global.__TYPEDARRAY_POOL

//Upgrade pool
if(!POOL.UINT8C) {
  POOL.UINT8C = dup([32, 0])
}
if(!POOL.BUFFER) {
  POOL.BUFFER = dup([32, 0])
}

//New technique: Only allocate from ArrayBufferView and Buffer
var DATA    = POOL.DATA
  , BUFFER  = POOL.BUFFER

exports.free = function free(array) {
  if(Buffer.isBuffer(array)) {
    BUFFER[bits.log2(array.length)].push(array)
  } else {
    if(Object.prototype.toString.call(array) !== '[object ArrayBuffer]') {
      array = array.buffer
    }
    if(!array) {
      return
    }
    var n = array.length || array.byteLength
    var log_n = bits.log2(n)|0
    DATA[log_n].push(array)
  }
}

function freeArrayBuffer(buffer) {
  if(!buffer) {
    return
  }
  var n = buffer.length || buffer.byteLength
  var log_n = bits.log2(n)
  DATA[log_n].push(buffer)
}

function freeTypedArray(array) {
  freeArrayBuffer(array.buffer)
}

exports.freeUint8 =
exports.freeUint16 =
exports.freeUint32 =
exports.freeInt8 =
exports.freeInt16 =
exports.freeInt32 =
exports.freeFloat32 = 
exports.freeFloat =
exports.freeFloat64 = 
exports.freeDouble = 
exports.freeUint8Clamped = 
exports.freeDataView = freeTypedArray

exports.freeArrayBuffer = freeArrayBuffer

exports.freeBuffer = function freeBuffer(array) {
  BUFFER[bits.log2(array.length)].push(array)
}

exports.malloc = function malloc(n, dtype) {
  if(dtype === undefined || dtype === 'arraybuffer') {
    return mallocArrayBuffer(n)
  } else {
    switch(dtype) {
      case 'uint8':
        return mallocUint8(n)
      case 'uint16':
        return mallocUint16(n)
      case 'uint32':
        return mallocUint32(n)
      case 'int8':
        return mallocInt8(n)
      case 'int16':
        return mallocInt16(n)
      case 'int32':
        return mallocInt32(n)
      case 'float':
      case 'float32':
        return mallocFloat(n)
      case 'double':
      case 'float64':
        return mallocDouble(n)
      case 'uint8_clamped':
        return mallocUint8Clamped(n)
      case 'buffer':
        return mallocBuffer(n)
      case 'data':
      case 'dataview':
        return mallocDataView(n)

      default:
        return null
    }
  }
  return null
}

function mallocArrayBuffer(n) {
  var n = bits.nextPow2(n)
  var log_n = bits.log2(n)
  var d = DATA[log_n]
  if(d.length > 0) {
    return d.pop()
  }
  return new ArrayBuffer(n)
}
exports.mallocArrayBuffer = mallocArrayBuffer

function mallocUint8(n) {
  return new Uint8Array(mallocArrayBuffer(n), 0, n)
}
exports.mallocUint8 = mallocUint8

function mallocUint16(n) {
  return new Uint16Array(mallocArrayBuffer(2*n), 0, n)
}
exports.mallocUint16 = mallocUint16

function mallocUint32(n) {
  return new Uint32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocUint32 = mallocUint32

function mallocInt8(n) {
  return new Int8Array(mallocArrayBuffer(n), 0, n)
}
exports.mallocInt8 = mallocInt8

function mallocInt16(n) {
  return new Int16Array(mallocArrayBuffer(2*n), 0, n)
}
exports.mallocInt16 = mallocInt16

function mallocInt32(n) {
  return new Int32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocInt32 = mallocInt32

function mallocFloat(n) {
  return new Float32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocFloat32 = exports.mallocFloat = mallocFloat

function mallocDouble(n) {
  return new Float64Array(mallocArrayBuffer(8*n), 0, n)
}
exports.mallocFloat64 = exports.mallocDouble = mallocDouble

function mallocUint8Clamped(n) {
  if(hasUint8C) {
    return new Uint8ClampedArray(mallocArrayBuffer(n), 0, n)
  } else {
    return mallocUint8(n)
  }
}
exports.mallocUint8Clamped = mallocUint8Clamped

function mallocDataView(n) {
  return new DataView(mallocArrayBuffer(n), 0, n)
}
exports.mallocDataView = mallocDataView

function mallocBuffer(n) {
  n = bits.nextPow2(n)
  var log_n = bits.log2(n)
  var cache = BUFFER[log_n]
  if(cache.length > 0) {
    return cache.pop()
  }
  return new Buffer(n)
}
exports.mallocBuffer = mallocBuffer

exports.clearCache = function clearCache() {
  for(var i=0; i<32; ++i) {
    POOL.UINT8[i].length = 0
    POOL.UINT16[i].length = 0
    POOL.UINT32[i].length = 0
    POOL.INT8[i].length = 0
    POOL.INT16[i].length = 0
    POOL.INT32[i].length = 0
    POOL.FLOAT[i].length = 0
    POOL.DOUBLE[i].length = 0
    POOL.UINT8C[i].length = 0
    DATA[i].length = 0
    BUFFER[i].length = 0
  }
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"bit-twiddle":3,"buffer":4,"dup":19}],21:[function(require,module,exports){
"use strict"

var bits = require('bit-twiddle')
var pool = require('typedarray-pool')
var ndarray = require('ndarray')
var ops = require('ndarray-ops')
var fft = require('ndarray-fft')
var hann = require('scijs-window-functions/hann')

function square(x, y) {
  var n = x.length
  for(var i=0; i<n; ++i) {
    var a = x[i], b = y[i]
    x[i] = a*a + b*b
    y[i] = 0.0
  }
}

function prefilter(x, xf, n) {
  x[0] = 1
  var s = 0
  for(var i=1; i<n; ++i) {
    var d = Math.max(xf - x[i], 0.0)
    s += d
    x[i] = d * i / s
  }
}

function aperiodic(x, n) {
  if(n<=3) {
    return true
  }
  var d = ((x + 0.5 * n) % n) - 0.5 * n
  return Math.abs(d) > 1
}

function findPeriod(x, lo, hi, threshold) {
  var smallest = 1.0
  var period = 0
  for(var i=lo; i+2<hi; ++i) {
    var y0 = x[i], y1 = x[i+1], y2 = x[i+2]
    var denom = y2 - 2.0 * y1 + y0
    if(Math.abs(denom) < 1e-6) {
      if(y1 < smallest && aperiodic(i+1, period)) {
        smallest = y1
        period = i+1
      }
    } else {
      var s = 0.5 * (y0 - y2) / denom
      if(Math.abs(s) > 1.0) {
        continue
      }
      var ymin = y1 + 0.25 * Math.pow(y0 - y2, 2) / denom
      if(ymin < smallest) {
        var f0 = i + s + 1
        if(aperiodic(f0, period)) {
          smallest = ymin
          period = f0
        }
      }
    }
  }
  if(smallest < 1.0 - threshold) {
    return period
  }
  return 0.0
}

function detectPitch(signal, threshold) {
  threshold = threshold || 0.0

  var xs
  if(signal.shape) {
    xs = signal.shape[0]
  } else {
    xs = signal.length
  }

  var n = bits.nextPow2(2*xs)

  var i, j, k
  var re_arr = pool.mallocFloat(n)
  var im_arr = pool.mallocFloat(n)
  var X = ndarray(re_arr, [n], [1], 0)
  var Y = ndarray(im_arr, [n], [1], 0)

  //Initialize array depending on if it is a typed array
  if(signal.shape) {
    ops.assign(X.hi(xs), signal)
  } else {
    re_arr.set(signal)
  }

  //Compute magnitude
  var magnitude = 0.0
  for(var i=0; i<xs; ++i) {
    var z = re_arr[i] *= hann(i, xs)
    magnitude += Math.pow(z, 2)
  }

  //Zero out arrays
  for(var i=xs; i<n; ++i) {
    re_arr[i] = 0.0
  }
  for(var i=0; i<n; ++i) {
    im_arr[i] = 0.0
  }

  //Autocorrelate
  fft(1, X, Y)
  square(re_arr, im_arr)
  fft(-1, X, Y)

  //Apply prefiltering
  prefilter(re_arr, magnitude, xs)

  //Detect pitch
  var period = findPeriod(re_arr, 0, xs>>>1, threshold)

  //Free temporary arrays
  pool.freeFloat(re_arr)
  pool.freeFloat(im_arr)

  return period
}
module.exports = detectPitch

},{"bit-twiddle":3,"ndarray":15,"ndarray-fft":8,"ndarray-ops":10,"scijs-window-functions/hann":18,"typedarray-pool":20}]},{},[1]);
