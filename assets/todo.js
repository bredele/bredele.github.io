function require(a,b,c){var d=require.resolve(a);if(null==d){c=c||a,b=b||"root";var e=new Error('Failed to require "'+c+'" from "'+b+'"');throw e.path=c,e.parent=b,e.require=!0,e}var f=require.modules[d];if(!f._resolving&&!f.exports){var g={};g.exports={},g.client=g.component=!0,f._resolving=!0,f.call(this,g.exports,require.relative(d),g),delete f._resolving,f.exports=g.exports}return f.exports}require.modules={},require.aliases={},require.resolve=function(a){"/"===a.charAt(0)&&(a=a.slice(1));for(var b=[a,a+".js",a+".json",a+"/index.js",a+"/index.json"],c=0;c<b.length;c++){var a=b[c];if(require.modules.hasOwnProperty(a))return a;if(require.aliases.hasOwnProperty(a))return require.aliases[a]}},require.normalize=function(a,b){var c=[];if("."!=b.charAt(0))return b;a=a.split("/"),b=b.split("/");for(var d=0;d<b.length;++d)".."==b[d]?a.pop():"."!=b[d]&&""!=b[d]&&c.push(b[d]);return a.concat(c).join("/")},require.register=function(a,b){require.modules[a]=b},require.alias=function(a,b){if(!require.modules.hasOwnProperty(a))throw new Error('Failed to alias "'+a+'", it does not exist');require.aliases[b]=a},require.relative=function(a){function c(a,b){for(var c=a.length;c--;)if(a[c]===b)return c;return-1}function d(b){var c=d.resolve(b);return require(c,a,b)}var b=require.normalize(a,"..");return d.resolve=function(d){var e=d.charAt(0);if("/"==e)return d.slice(1);if("."==e)return require.normalize(b,d);var f=a.split("/"),g=c(f,"deps")+1;return g||(g=0),d=f.slice(0,g+1).join("/")+"/deps/"+d},d.exists=function(a){return require.modules.hasOwnProperty(d.resolve(a))},d},require.register("bredele-trim/index.js",function(a,b,c){c.exports=function(a){return a.trim?a.trim():a.replace(/^\s*|\s*$/g,"")}}),require.register("bredele-supplant/index.js",function(a,b,c){function h(a){var b=f(a,"model.");return new Function("model","return "+b)}var d=b("indexof"),e=b("trim"),f=b("props"),g={};c.exports=function(a,b){return a.replace(/\{([^}]+)\}/g,function(a,c){if(/[.'[+(]/.test(c)){var d=g[c]=g[c]||h(c);return d(b)||""}return b[e(c)]||""})},c.exports.attrs=function(a){var b=[];return a.replace(/\{([^}]+)\}/g,function(a,c){var f=e(c);~d(b,f)||b.push(f)}),b}}),require.register("bredele-plugin-parser/index.js",function(a,b,c){c.exports=function(a){a=a.replace(/ /g,"");for(var b=a?a.split(";"):["default"],c=[],d=0,e=b.length;e>d;d++){var f=b[d].split(":"),g=[],h=f[0];f[1]?g=f[1].split(","):h="default",c.push({method:f[0],params:g})}return c}}),require.register("component-indexof/index.js",function(a,b,c){c.exports=function(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0;c<a.length;++c)if(a[c]===b)return c;return-1}}),require.register("component-props/index.js",function(a,b,c){function e(a){return a.replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g,"").replace(d,"").match(/[a-zA-Z_]\w*/g)||[]}function f(a,b,c){var d=/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;return a.replace(d,function(a){return"("==a[a.length-1]?c(a):~b.indexOf(a)?c(a):a})}function g(a){for(var b=[],c=0;c<a.length;c++)~b.indexOf(a[c])||b.push(a[c]);return b}function h(a){return function(b){return a+b}}var d=/\b(Array|Date|Object|Math|JSON)\b/g;c.exports=function(a,b){var c=g(e(a));return b&&"string"==typeof b&&(b=h(b)),b?f(a,c,b):c}}),require.register("bredele-binding/index.js",function(a,b,c){function f(a){return this instanceof f?(this.model=a,this.plugins={},void 0):new f(a)}function g(a){return function(b,c){for(var d=e(c),f=0,g=d.length;g>f;f++){var h=d[f];h.params.splice(0,0,b),a[h.method].apply(a,h.params)}}}var d=b("./lib/attr"),e=b("plugin-parser");c.exports=f,f.prototype.add=function(a,b){return"object"==typeof b&&(b=g(b)),this.plugins[a]=b,this},f.prototype.bindAttrs=function(a){for(var b=a.attributes,c=0,e=b.length;e>c;c++){var f=b[c],g=this.plugins[f.nodeName];g?g.call(this.model,a,f.nodeValue):d(f,this.model)}},f.prototype.bind=function(a){var b=a.nodeType;return 1===b?this.bindAttrs(a):(3===b&&d(a,this.model),void 0)},f.prototype.apply=function(a){var b=a.childNodes;this.bind(a);for(var c=0,d=b.length;d>c;c++)this.apply(b[c])}}),require.register("bredele-binding/lib/attr.js",function(a,b,c){function g(a){var b=[];return a.replace(/\{([^}]+)\}/g,function(a,c){~e(b,c)||(b=b.concat(f(c)))}),b}var d=b("supplant"),e=b("indexof"),f=b("props");c.exports=function(a,b){var c=a.nodeValue;if(~e(c,"{")){for(var f=g(c),h=function(){a.nodeValue=d(c,b.data)},i=f.length;i--;)b.on("change "+f[i],h);h()}}}),require.register("bredele-view/index.js",function(a,b,c){function f(){this.dom=null,this.store=null,this.binding=new d}function g(a){if(a instanceof HTMLElement)return a;var b=document.createElement("div");return b.innerHTML=a,b.firstChild}var d=b("binding"),e=b("store");c.exports=f,f.prototype.html=function(a,b){return"function"==typeof a?this.dom=a.apply(null,[].slice.call(arguments,1)):(this.store=new e(b),this.binding.model=this.store,this.dom=g(a)),this},f.prototype.attr=function(a,b){return this.binding.add(a,b),this},f.prototype.data=function(a,b){return this.attr("data-"+a,b)},f.prototype.insert=function(a){this.alive(),a.appendChild(this.dom)},f.prototype.alive=function(a){a&&(this.dom=a),this.binding.apply(this.dom)},f.prototype.destroy=function(){var a=this.binding.plugins,b=this.dom.parentNode;for(var c in a){var d=a[c];d.destroy&&d.destroy()}b&&b.removeChild(this.dom)}}),require.register("component-emitter/index.js",function(a,b,c){function d(a){return a?e(a):void 0}function e(a){for(var b in d.prototype)a[b]=d.prototype[b];return a}c.exports=d,d.prototype.on=d.prototype.addEventListener=function(a,b){return this._callbacks=this._callbacks||{},(this._callbacks[a]=this._callbacks[a]||[]).push(b),this},d.prototype.once=function(a,b){function d(){c.off(a,d),b.apply(this,arguments)}var c=this;return this._callbacks=this._callbacks||{},d.fn=b,this.on(a,d),this},d.prototype.off=d.prototype.removeListener=d.prototype.removeAllListeners=d.prototype.removeEventListener=function(a,b){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var c=this._callbacks[a];if(!c)return this;if(1==arguments.length)return delete this._callbacks[a],this;for(var d,e=0;e<c.length;e++)if(d=c[e],d===b||d.fn===b){c.splice(e,1);break}return this},d.prototype.emit=function(a){this._callbacks=this._callbacks||{};var b=[].slice.call(arguments,1),c=this._callbacks[a];if(c){c=c.slice(0);for(var d=0,e=c.length;e>d;++d)c[d].apply(this,b)}return this},d.prototype.listeners=function(a){return this._callbacks=this._callbacks||{},this._callbacks[a]||[]},d.prototype.hasListeners=function(a){return!!this.listeners(a).length}}),require.register("bredele-each/index.js",function(a,b,c){function d(a,b,c){for(var d in a)a.hasOwnProperty(d)&&b.call(c,d,a[d])}function e(a,b,c){for(var d=0,e=a.length;e>d;d++)b.call(c,d,a[d])}c.exports=function(a,b,c){a instanceof Array?e(a,b,c):"object"==typeof a&&d(a,b,c)}}),require.register("bredele-clone/index.js",function(a,b,c){function d(a){if("object"==typeof a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=d(a[c]));return b}return a}c.exports=function(a){return a instanceof Array?a.slice(0):d(a)}}),require.register("bredele-store/index.js",function(a,b,c){function h(a){return a instanceof h?a:(this.data=a||{},this.formatters={},void 0)}var d=b("emitter"),e=b("clone"),f=b("each"),g=window.localStorage;c.exports=h,d(h.prototype),h.prototype.set=function(a,b){var d=this.data[a];d!==b&&(this.data[a]=b,this.emit("change",a,b,d),this.emit("change "+a,b,d))},h.prototype.get=function(a){var b=this.formatters[a],c=this.data[a];return b&&(c=b[0].call(b[1],c)),c},h.prototype.has=function(a){return this.data.hasOwnProperty(a)},h.prototype.del=function(a){this.has(a)&&(this.data instanceof Array?this.data.splice(a,1):delete this.data[a],this.emit("deleted",a,a),this.emit("deleted "+a,a))},h.prototype.format=function(a,b,c){return this.formatters[a]=[b,c],this},h.prototype.compute=function(a,b){var c=b.toString(),d=c.match(/this.[a-zA-Z0-9]*/g);this.set(a,b.call(this.data));for(var e=d.length;e--;)this.on("change "+d[e].slice(5),function(){this.set(a,b.call(this.data))})},h.prototype.reset=function(a){var b=e(this.data),c=a.length;this.data=a,f(b,function(b){"undefined"==typeof a[b]&&(this.emit("deleted",b,c),this.emit("deleted "+b,c))},this),f(a,function(a,c){var d=b[a];d!==c&&(this.emit("change",a,c,d),this.emit("change "+a,c,d))},this)},h.prototype.loop=function(a,b){f(this.data,a,b||this)},h.prototype.local=function(a,b){b?this.reset(JSON.parse(g.getItem(a))):g.setItem(a,this.toJSON())},h.prototype.use=function(a){return a(this),this},h.prototype.toJSON=function(){return JSON.stringify(this.data)}}),require.register("component-event/index.js",function(a){var d=window.addEventListener?"addEventListener":"attachEvent",e=window.removeEventListener?"removeEventListener":"detachEvent",f="addEventListener"!==d?"on":"";a.bind=function(a,b,c,e){return a[d](f+b,c,e||!1),c},a.unbind=function(a,b,c,d){return a[e](f+b,c,d||!1),c}}),require.register("component-query/index.js",function(a,b,c){function d(a,b){return b.querySelector(a)}a=c.exports=function(a,b){return b=b||document,d(a,b)},a.all=function(a,b){return b=b||document,b.querySelectorAll(a)},a.engine=function(b){if(!b.one)throw new Error(".one callback required");if(!b.all)throw new Error(".all callback required");return d=b.one,a.all=b.all,a}}),require.register("component-matches-selector/index.js",function(a,b,c){function g(a,b){if(f)return f.call(a,b);for(var c=d.all(b,a.parentNode),e=0;e<c.length;++e)if(c[e]==a)return!0;return!1}var d=b("query"),e=Element.prototype,f=e.matches||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector;c.exports=g}),require.register("discore-closest/index.js",function(a,b,c){var d=b("matches-selector");c.exports=function(a,b,c,e){for(a=c?{parentNode:a}:a,e=e||document;(a=a.parentNode)&&a!==document;){if(d(a,b))return a;if(a===e)return}}}),require.register("component-delegate/index.js",function(a,b){var d=b("closest"),e=b("event");a.bind=function(a,b,c,f,g){return e.bind(a,c,function(c){var e=c.target||c.srcElement;c.delegateTarget=d(e,b,!0,a),c.delegateTarget&&f.call(a,c)},g)},a.unbind=function(a,b,c,d){e.unbind(a,b,c,d)}}),require.register("bredele-event-plugin/index.js",function(a,b,c){function g(a,b){this.view=a,this.listeners=[],this.isTouch=b||void 0!==window.ontouchstart}var d=b("event"),e=b("delegate"),f={click:"touchend",mousedown:"touchstart",mouseup:"touchend",mousemove:"touchmove"};c.exports=g,g.prototype.on=function(a,b,c,e){var f=this,g="true"===e,h=function(b){f.view[c].call(f.view,b,a)};d.bind(a,this.map(b),h,g),this.listeners.push([a,this.map(b),h,g])},g.prototype.delegate=function(a,b,c,d,f){var g=this,h="true"===f,i=e.bind(a,b,this.map(c),function(b){g.view[d].call(g.view,b,a)},h);this.listeners.push([a,this.map(c),i,h])},g.prototype.map=function(a){return this.isTouch?f[a]||a:a},g.prototype.destroy=function(){for(var a=this.listeners.length;a--;){var b=this.listeners[a];d.unbind(b[0],b[1],b[2],b[3])}this.listeners=[]}}),require.register("bredele-list/index.js",function(a,b,c){function h(a){this.store=new e(a),this.items=[]}function i(a,b){this.dom=a.cloneNode(!0),this.store=new e(b),this.binding=new d(this.store),this.binding.apply(this.dom)}var d=b("binding"),e=b("store"),f=b("each"),g=b("indexof");c.exports=h,h.prototype.default=h.prototype.list=function(a){var b=a.children[0],c=this;this.node=a,this.clone=b.cloneNode(!0),a.removeChild(b),this.store.on("change",function(a,b){var d=c.items[a];d?d.reset(b):c.addItem(a,b)}),this.store.on("deleted",function(a,b){c.delItem(b)}),this.store.loop(this.addItem,this)},h.prototype.indexOf=function(a){var b=[].slice.call(this.node.children);return g(b,a)},h.prototype.loop=function(a,b){f(this.items,function(c,d){a.call(b,d.store)})},h.prototype.add=function(a){this.store.set(this.store.data.length,a)},h.prototype.set=function(a,b){a instanceof HTMLElement&&(a=this.indexOf(a));var c=this.items[a].store;f(b,function(a,b){c.set(a,b)})},h.prototype.del=function(a,b){if(void 0===a)return this.store.reset([]);if("function"==typeof a)for(var c=this.store.data.length;c--;)a.call(b,this.items[c].store)&&this.store.del(c);this.store.del(a instanceof HTMLElement?this.indexOf(a):a)},h.prototype.addItem=function(a,b){var c=new i(this.clone,b);this.items[a]=c,this.node.appendChild(c.dom)},h.prototype.delItem=function(a){var b=this.items[a];b.unbind(this.node),this.items.splice(a,1),b=null},i.prototype.unbind=function(a){this.store.off(),a.removeChild(this.dom)},i.prototype.reset=function(a){this.store.reset(a)}}),require.register("component-classes/index.js",function(a,b,c){function g(a){if(!a)throw new Error("A DOM element reference is required");this.el=a,this.list=a.classList}var d=b("indexof"),e=/\s+/,f=Object.prototype.toString;c.exports=function(a){return new g(a)},g.prototype.add=function(a){if(this.list)return this.list.add(a),this;var b=this.array(),c=d(b,a);return~c||b.push(a),this.el.className=b.join(" "),this},g.prototype.remove=function(a){if("[object RegExp]"==f.call(a))return this.removeMatching(a);if(this.list)return this.list.remove(a),this;var b=this.array(),c=d(b,a);return~c&&b.splice(c,1),this.el.className=b.join(" "),this},g.prototype.removeMatching=function(a){for(var b=this.array(),c=0;c<b.length;c++)a.test(b[c])&&this.remove(b[c]);return this},g.prototype.toggle=function(a){return this.list?(this.list.toggle(a),this):(this.has(a)?this.remove(a):this.add(a),this)},g.prototype.array=function(){var a=this.el.className.replace(/^\s+|\s+$/g,""),b=a.split(e);return""===b[0]&&b.shift(),b},g.prototype.has=g.prototype.contains=function(a){return this.list?this.list.contains(a):!!~d(this.array(),a)}}),require.register("bredele-hidden-plugin/index.js",function(a,b,c){var d=b("classes");c.exports=function(a,b){this.on("change "+b,function(b){b?d(a).remove("hidden"):d(a).add("hidden")})}}),require.register("todo/index.js",function(a,b){function l(a){return function(b){var c=0;a.call(null,b.target.parentElement,b),j.loop(function(a){"pending"===a.get("status")&&c++}),k.set("items",j.store.data.length),k.set("pending",c)}}var d=b("view"),e=b("store"),f=b("event-plugin"),g=b("list"),h=b("./todo.html"),i=new d,j=new g([]),k=new e({items:0,pending:0});k.compute("completed",function(){return this.items-this.pending});var m={add:l(function(a,b){var c=b.target;13===b.keyCode&&c.value&&(j.add({status:"pending",label:c.value}),c.value="")}),edit:function(a){var b=a.target;b.contentEditable=!0},toggle:l(function(a,b){j.set(a,{status:b.target.checked?"completed":"pending"})}),toggleAll:l(function(a,b){var c=b.target.checked?"completed":"pending";j.loop(function(a){a.set("status",c)})}),delAll:l(function(){j.del(function(a){return"completed"===a.get("status")})}),del:l(function(a){j.del(a)}),benchmark:l(function(){for(var a=(new Date).getTime(),b=200;b--;)j.add({status:"pending",label:"foo"});var c=(new Date).getTime();k.set("result",c-a+"ms")})};i.html(h,k),i.attr("todos",j),i.attr("events",new f(m)),i.attr("visible",b("hidden-plugin")),i.insert(document.querySelector(".todo-container"))}),require.register("todo/todo.html",function(a,b,c){c.exports='<section id="todoapp">\n  <button class="benchmark" events="on:click,benchmark">benchmark 200</button>\n  <span>{result}</span>\n  <header id="header">\n    <h1>todos</h1>\n    <input id="new-todo" placeholder="What needs to be done?" events="on:keypress,add" autofocus>\n  </header>\n  <section id="main">\n    <input id="toggle-all" type="checkbox" events="on:click,toggleAll">\n    <label for="toggle-all">Mark all as complete</label>\n    <ul id="todo-list" events="delegate:.toggle,click,toggle;delegate:.destroy,click,del;delegate:.label,dblclick,edit" todos>\n      <li class="{status}">\n        <input class="toggle" type="checkbox">\n        <label class="label">{label}</label>\n        <button class="destroy"></button>\n      </li>\n    </ul>\n  </section>\n  <footer id="footer" class="hidden" visible="items">\n    <span id="todo-count">\n      <strong>{ \'\' + pending }</strong> \n      item{ pending !== 1 ? \'s\' : \'\' } left\n    </span>\n    <button id="clear-completed" events="on:click,delAll" class="{completed ? \'\' : \'hidden\'}">\n      Clear completed ({ completed })\n    </button>\n  </footer>\n</section>'}),require.alias("bredele-view/index.js","todo/deps/view/index.js"),require.alias("bredele-view/index.js","todo/deps/view/index.js"),require.alias("bredele-view/index.js","view/index.js"),require.alias("bredele-binding/index.js","bredele-view/deps/binding/index.js"),require.alias("bredele-binding/lib/attr.js","bredele-view/deps/binding/lib/attr.js"),require.alias("bredele-binding/index.js","bredele-view/deps/binding/index.js"),require.alias("bredele-supplant/index.js","bredele-binding/deps/supplant/index.js"),require.alias("bredele-supplant/index.js","bredele-binding/deps/supplant/index.js"),require.alias("component-indexof/index.js","bredele-supplant/deps/indexof/index.js"),require.alias("bredele-trim/index.js","bredele-supplant/deps/trim/index.js"),require.alias("bredele-trim/index.js","bredele-supplant/deps/trim/index.js"),require.alias("bredele-trim/index.js","bredele-trim/index.js"),require.alias("component-props/index.js","bredele-supplant/deps/props/index.js"),require.alias("component-props/index.js","bredele-supplant/deps/props/index.js"),require.alias("component-props/index.js","component-props/index.js"),require.alias("bredele-supplant/index.js","bredele-supplant/index.js"),require.alias("bredele-plugin-parser/index.js","bredele-binding/deps/plugin-parser/index.js"),require.alias("bredele-plugin-parser/index.js","bredele-binding/deps/plugin-parser/index.js"),require.alias("bredele-plugin-parser/index.js","bredele-plugin-parser/index.js"),require.alias("component-indexof/index.js","bredele-binding/deps/indexof/index.js"),require.alias("component-props/index.js","bredele-binding/deps/props/index.js"),require.alias("component-props/index.js","bredele-binding/deps/props/index.js"),require.alias("component-props/index.js","component-props/index.js"),require.alias("bredele-binding/index.js","bredele-binding/index.js"),require.alias("bredele-store/index.js","bredele-view/deps/store/index.js"),require.alias("bredele-store/index.js","bredele-view/deps/store/index.js"),require.alias("component-emitter/index.js","bredele-store/deps/emitter/index.js"),require.alias("bredele-each/index.js","bredele-store/deps/each/index.js"),require.alias("bredele-each/index.js","bredele-store/deps/each/index.js"),require.alias("bredele-each/index.js","bredele-each/index.js"),require.alias("bredele-clone/index.js","bredele-store/deps/clone/index.js"),require.alias("bredele-clone/index.js","bredele-store/deps/clone/index.js"),require.alias("bredele-clone/index.js","bredele-clone/index.js"),require.alias("bredele-store/index.js","bredele-store/index.js"),require.alias("bredele-view/index.js","bredele-view/index.js"),require.alias("bredele-store/index.js","todo/deps/store/index.js"),require.alias("bredele-store/index.js","todo/deps/store/index.js"),require.alias("bredele-store/index.js","store/index.js"),require.alias("component-emitter/index.js","bredele-store/deps/emitter/index.js"),require.alias("bredele-each/index.js","bredele-store/deps/each/index.js"),require.alias("bredele-each/index.js","bredele-store/deps/each/index.js"),require.alias("bredele-each/index.js","bredele-each/index.js"),require.alias("bredele-clone/index.js","bredele-store/deps/clone/index.js"),require.alias("bredele-clone/index.js","bredele-store/deps/clone/index.js"),require.alias("bredele-clone/index.js","bredele-clone/index.js"),require.alias("bredele-store/index.js","bredele-store/index.js"),require.alias("component-event/index.js","todo/deps/event/index.js"),require.alias("component-event/index.js","event/index.js"),require.alias("bredele-event-plugin/index.js","todo/deps/event-plugin/index.js"),require.alias("bredele-event-plugin/index.js","todo/deps/event-plugin/index.js"),require.alias("bredele-event-plugin/index.js","event-plugin/index.js"),require.alias("component-event/index.js","bredele-event-plugin/deps/event/index.js"),require.alias("component-delegate/index.js","bredele-event-plugin/deps/delegate/index.js"),require.alias("discore-closest/index.js","component-delegate/deps/closest/index.js"),require.alias("discore-closest/index.js","component-delegate/deps/closest/index.js"),require.alias("component-matches-selector/index.js","discore-closest/deps/matches-selector/index.js"),require.alias("component-query/index.js","component-matches-selector/deps/query/index.js"),require.alias("discore-closest/index.js","discore-closest/index.js"),require.alias("component-event/index.js","component-delegate/deps/event/index.js"),require.alias("bredele-event-plugin/index.js","bredele-event-plugin/index.js"),require.alias("bredele-list/index.js","todo/deps/list/index.js"),require.alias("bredele-list/index.js","todo/deps/list/index.js"),require.alias("bredele-list/index.js","list/index.js"),require.alias("bredele-binding/index.js","bredele-list/deps/binding/index.js"),require.alias("bredele-binding/lib/attr.js","bredele-list/deps/binding/lib/attr.js"),require.alias("bredele-binding/index.js","bredele-list/deps/binding/index.js"),require.alias("bredele-supplant/index.js","bredele-binding/deps/supplant/index.js"),require.alias("bredele-supplant/index.js","bredele-binding/deps/supplant/index.js"),require.alias("component-indexof/index.js","bredele-supplant/deps/indexof/index.js"),require.alias("bredele-trim/index.js","bredele-supplant/deps/trim/index.js"),require.alias("bredele-trim/index.js","bredele-supplant/deps/trim/index.js"),require.alias("bredele-trim/index.js","bredele-trim/index.js"),require.alias("component-props/index.js","bredele-supplant/deps/props/index.js"),require.alias("component-props/index.js","bredele-supplant/deps/props/index.js"),require.alias("component-props/index.js","component-props/index.js"),require.alias("bredele-supplant/index.js","bredele-supplant/index.js"),require.alias("bredele-plugin-parser/index.js","bredele-binding/deps/plugin-parser/index.js"),require.alias("bredele-plugin-parser/index.js","bredele-binding/deps/plugin-parser/index.js"),require.alias("bredele-plugin-parser/index.js","bredele-plugin-parser/index.js"),require.alias("component-indexof/index.js","bredele-binding/deps/indexof/index.js"),require.alias("component-props/index.js","bredele-binding/deps/props/index.js"),require.alias("component-props/index.js","bredele-binding/deps/props/index.js"),require.alias("component-props/index.js","component-props/index.js"),require.alias("bredele-binding/index.js","bredele-binding/index.js"),require.alias("bredele-store/index.js","bredele-list/deps/store/index.js"),require.alias("bredele-store/index.js","bredele-list/deps/store/index.js"),require.alias("component-emitter/index.js","bredele-store/deps/emitter/index.js"),require.alias("bredele-each/index.js","bredele-store/deps/each/index.js"),require.alias("bredele-each/index.js","bredele-store/deps/each/index.js"),require.alias("bredele-each/index.js","bredele-each/index.js"),require.alias("bredele-clone/index.js","bredele-store/deps/clone/index.js"),require.alias("bredele-clone/index.js","bredele-store/deps/clone/index.js"),require.alias("bredele-clone/index.js","bredele-clone/index.js"),require.alias("bredele-store/index.js","bredele-store/index.js"),require.alias("component-indexof/index.js","bredele-list/deps/indexof/index.js"),require.alias("bredele-each/index.js","bredele-list/deps/each/index.js"),require.alias("bredele-each/index.js","bredele-list/deps/each/index.js"),require.alias("bredele-each/index.js","bredele-each/index.js"),require.alias("bredele-list/index.js","bredele-list/index.js"),require.alias("bredele-hidden-plugin/index.js","todo/deps/hidden-plugin/index.js"),require.alias("bredele-hidden-plugin/index.js","todo/deps/hidden-plugin/index.js"),require.alias("bredele-hidden-plugin/index.js","hidden-plugin/index.js"),require.alias("component-classes/index.js","bredele-hidden-plugin/deps/classes/index.js"),require.alias("component-indexof/index.js","component-classes/deps/indexof/index.js"),require.alias("bredele-hidden-plugin/index.js","bredele-hidden-plugin/index.js"),require.alias("todo/index.js","todo/index.js");