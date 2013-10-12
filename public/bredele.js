
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("yields-keycode/index.js", Function("exports, require, module",
"\n\
/**\n\
 * map\n\
 */\n\
\n\
var map = {\n\
    backspace: 8\n\
  , command: 91\n\
  , tab: 9\n\
  , clear: 12\n\
  , enter: 13\n\
  , shift: 16\n\
  , ctrl: 17\n\
  , alt: 18\n\
  , capslock: 20\n\
  , escape: 27\n\
  , esc: 27\n\
  , space: 32\n\
  , left: 37\n\
  , up: 38\n\
  , right: 39\n\
  , down: 40\n\
  , del: 46\n\
  , comma: 188\n\
  , ',': 188\n\
  , '.': 190\n\
  , '/': 191\n\
  , '`': 192\n\
  , '-': 189\n\
  , '=': 187\n\
  , ';': 186\n\
  , '[': 219\n\
  , '\\\\': 220\n\
  , ']': 221\n\
  , '\\'': 222\n\
};\n\
\n\
/**\n\
 * find a keycode.\n\
 *\n\
 * @param {String} name\n\
 * @return {Number}\n\
 */\n\
\n\
module.exports = function(name){\n\
  return map[name] || name.toUpperCase().charCodeAt(0);\n\
};\n\
//@ sourceURL=yields-keycode/index.js"
));
require.register("component-event/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Bind `el` event `type` to `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.bind = function(el, type, fn, capture){\n\
  if (el.addEventListener) {\n\
    el.addEventListener(type, fn, capture || false);\n\
  } else {\n\
    el.attachEvent('on' + type, fn);\n\
  }\n\
  return fn;\n\
};\n\
\n\
/**\n\
 * Unbind `el` event `type`'s callback `fn`.\n\
 *\n\
 * @param {Element} el\n\
 * @param {String} type\n\
 * @param {Function} fn\n\
 * @param {Boolean} capture\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
exports.unbind = function(el, type, fn, capture){\n\
  if (el.removeEventListener) {\n\
    el.removeEventListener(type, fn, capture || false);\n\
  } else {\n\
    el.detachEvent('on' + type, fn);\n\
  }\n\
  return fn;\n\
};\n\
//@ sourceURL=component-event/index.js"
));
require.register("component-bind/index.js", Function("exports, require, module",
"\n\
/**\n\
 * Slice reference.\n\
 */\n\
\n\
var slice = [].slice;\n\
\n\
/**\n\
 * Bind `obj` to `fn`.\n\
 *\n\
 * @param {Object} obj\n\
 * @param {Function|String} fn or string\n\
 * @return {Function}\n\
 * @api public\n\
 */\n\
\n\
module.exports = function(obj, fn){\n\
  if ('string' == typeof fn) fn = obj[fn];\n\
  if ('function' != typeof fn) throw new Error('bind() requires a function');\n\
  var args = [].slice.call(arguments, 2);\n\
  return function(){\n\
    return fn.apply(obj, args.concat(slice.call(arguments)));\n\
  }\n\
};\n\
//@ sourceURL=component-bind/index.js"
));
require.register("component-os/index.js", Function("exports, require, module",
"\n\
\n\
module.exports = os();\n\
\n\
function os() {\n\
  var ua = navigator.userAgent;\n\
  if (/mac/i.test(ua)) return 'mac';\n\
  if (/win/i.test(ua)) return 'windows';\n\
  if (/linux/i.test(ua)) return 'linux';\n\
}\n\
//@ sourceURL=component-os/index.js"
));
require.register("yields-k/index.js", Function("exports, require, module",
"\n\
/**\n\
 * dependencies.\n\
 */\n\
\n\
var event = require('event')\n\
  , proto = require('./proto')\n\
  , bind = require('bind');\n\
\n\
/**\n\
 * create a new dispatcher with `el`.\n\
 *\n\
 * example:\n\
 *\n\
 *      var k = require('k')(window);\n\
 *      k('shift + tab', function(){});\n\
 *\n\
 * @param {Element} el\n\
 * @return {Function}\n\
 */\n\
\n\
module.exports = function(el){\n\
  function k(e, fn){ k.handle(e, fn) };\n\
  k._handle = bind(k, proto.handle);\n\
  k._clear = bind(k, proto.clear);\n\
  event.bind(el, 'keydown', k._handle, false);\n\
  event.bind(el, 'keyup', k._clear, false);\n\
  event.bind(el, 'focus', k._clear, false);\n\
  for (var p in proto) k[p] = proto[p];\n\
  k.listeners = {};\n\
  k.el = el;\n\
  return k;\n\
};\n\
//@ sourceURL=yields-k/index.js"
));
require.register("yields-k/proto.js", Function("exports, require, module",
"\n\
/**\n\
 * dependencies\n\
 */\n\
\n\
var keycode = require('keycode')\n\
  , event = require('event')\n\
  , os = require('os');\n\
\n\
/**\n\
 * modifiers.\n\
 */\n\
\n\
var modifiers = {\n\
  91: 'command',\n\
  93: 'command',\n\
  16: 'shift',\n\
  17: 'ctrl',\n\
  18: 'alt'\n\
};\n\
\n\
/**\n\
 * Super key.\n\
 */\n\
\n\
exports.super = 'mac' == os\n\
  ? 'command'\n\
  : 'ctrl';\n\
\n\
/**\n\
 * handle the given `KeyboardEvent` or bind\n\
 * a new `keys` handler.\n\
 *\n\
 * @param {String|KeyboardEvent} e\n\
 * @param {Function} fn\n\
 */\n\
\n\
exports.handle = function(e, fn){\n\
  var all = this.listeners[e.which]\n\
    , len = all && all.length\n\
    , ignore = this.ignore\n\
    , invoke = true\n\
    , handle\n\
    , mods\n\
    , mlen;\n\
\n\
  // bind\n\
  if (fn) return this.bind(e, fn);\n\
\n\
  // modifiers\n\
  if (modifiers[e.which]) {\n\
    this.super = exports.super == modifiers[e.which];\n\
    this[modifiers[e.which]] = true;\n\
    this.modifiers = true;\n\
    return;\n\
  }\n\
\n\
  // ignore\n\
  if (ignore && ignore(e)) return;\n\
\n\
  // match\n\
  for (var i = 0; i < len; ++i) {\n\
    invoke = true;\n\
    handle = all[i];\n\
    mods = handle.mods;\n\
    mlen = mods.length;\n\
\n\
    for (var j = 0; j < mlen; ++j) {\n\
      if (!this[mods[j]]) {\n\
        invoke = null;\n\
        break;\n\
      }\n\
    }\n\
\n\
    invoke && handle.fn(e);\n\
  }\n\
};\n\
\n\
/**\n\
 * destroy this `k` dispatcher instance.\n\
 */\n\
\n\
exports.destroy = function(){\n\
  event.unbind(this.el, 'keydown', this._handle);\n\
  event.unbind(this.el, 'keyup', this._clear);\n\
  event.unbind(this.el, 'focus', this._clear);\n\
  this.listeners = {};\n\
};\n\
\n\
/**\n\
 * unbind the given `keys` with optional `fn`.\n\
 *\n\
 * example:\n\
 *\n\
 *      k.unbind('enter, tab', myListener); // unbind `myListener` from `enter, tab` keys\n\
 *      k.unbind('enter, tab'); // unbind all `enter, tab` listeners\n\
 *      k.unbind(); // unbind all listeners\n\
 *\n\
 * @param {String} keys\n\
 * @param {Function} fn\n\
 * @return {self}\n\
 */\n\
\n\
exports.unbind = function(keys, fn){\n\
  var fns = this.listeners\n\
    , all;\n\
\n\
  // unbind all\n\
  if (0 == arguments.length) {\n\
    this.listeners = {};\n\
    return this;\n\
  }\n\
\n\
  // parse\n\
  all = parseKeys(keys);\n\
\n\
  // unbind `fn`\n\
  for (var i = 0; i < all.length; ++i) {\n\
    fns = fns[all[i].key];\n\
    if (!fns) continue;\n\
    for (var j = 0; j < fns.length; ++j) {\n\
      if (fn && fn != fns[j].fn) continue;\n\
      if (!matches(fns[j], all[i])) continue;\n\
\n\
      if (!fn && !all[i].mods.length) {\n\
        this.listeners[all[i].key] = [];\n\
      } else {\n\
        fns.splice(j, 1);\n\
      }\n\
    }\n\
  }\n\
\n\
  return this;\n\
};\n\
/**\n\
 * bind the given `keys` to `fn`.\n\
 *\n\
 * example:\n\
 *\n\
 *      k.bind('shift + tab, ctrl + a', function(e){});\n\
 *\n\
 * @param {String} keys\n\
 * @param {Function} fn\n\
 * @return {self}\n\
 */\n\
\n\
exports.bind = function(keys, fn){\n\
  var all = parseKeys(keys)\n\
    , fns = this.listeners;\n\
\n\
  for (var i = 0; i < all.length; ++i) {\n\
    (fns[all[i].key] = fns[all[i].key] || []).push(all[i]);\n\
    all[i].fn = fn;\n\
  }\n\
\n\
  return this;\n\
};\n\
\n\
/**\n\
 * clear all modifiers on `keyup`.\n\
 */\n\
\n\
exports.clear = function(e){\n\
  var code = e.keyCode;\n\
  if (!(code in modifiers)) return;\n\
  this[modifiers[code]] = null;\n\
  this.modifiers = this.command\n\
    || this.shift\n\
    || this.ctrl\n\
    || this.alt;\n\
};\n\
\n\
/**\n\
 * Ignore all input elements by default.\n\
 *\n\
 * @param {Event} e\n\
 * @return {Boolean}\n\
 */\n\
\n\
exports.ignore = function(e){\n\
  var el = e.target || e.srcElement;\n\
  var name = el.tagName.toLowerCase();\n\
  return 'textarea' == name\n\
    || 'select' == name\n\
    || 'input' == name;\n\
};\n\
\n\
/**\n\
 * Parse the given `keys`.\n\
 *\n\
 * @param {String} keys\n\
 * @return {Array}\n\
 * @api private\n\
 */\n\
\n\
function parseKeys(keys){\n\
  keys = keys.replace('super', exports.super);\n\
\n\
  var all = ',' != keys\n\
    ? keys.split(/ *, */)\n\
    : [','];\n\
\n\
  var ret = [];\n\
  for (var i = 0; i < all.length; ++i) {\n\
    if ('' == all[i]) continue;\n\
    var mods = all[i].split(/ *\\+ */);\n\
    var key = keycode(mods.pop() || ',');\n\
    ret.push({ mods: mods, key: key });\n\
  }\n\
\n\
  return ret;\n\
}\n\
\n\
/**\n\
 * Check if the given `a` matches `b`.\n\
 *\n\
 * @param {Object} a\n\
 * @param {Object} b\n\
 * @return {Boolean}\n\
 */\n\
\n\
function matches(a, b){\n\
  return 0 == b.mods.length || eql(a, b);\n\
}\n\
\n\
/**\n\
 * shallow eql util.\n\
 *\n\
 * TODO: move to yields/eql\n\
 *\n\
 * @param {Array} a\n\
 * @param {Array} b\n\
 * @return {Boolean}\n\
 * @api private\n\
 */\n\
\n\
function eql(a, b){\n\
  a = a.mods.sort().toString();\n\
  b = b.mods.sort().toString();\n\
  return a == b;\n\
}\n\
//@ sourceURL=yields-k/proto.js"
));
require.register("home/index.js", Function("exports, require, module",
"var k = require('k')(window);\n\
var flatcolors = ['#e67e22','#3498db','#34495e','#16a085','#c0392b'];\n\
var index = 0;\n\
var style = document.createElement('style');\n\
\n\
\n\
document.head.appendChild(style);\n\
\n\
k('super + shift + right', function(){\n\
  console.log('youhouu');\n\
  var inline = 'body {background:' + flatcolors[++index]+ '}';\n\
  style.innerHTML = inline;\n\
  if(index === 4) index = -1;\n\
});//@ sourceURL=home/index.js"
));




require.alias("home/index.js", "bredele.github.io/deps/home/index.js");
require.alias("home/index.js", "bredele.github.io/deps/home/index.js");
require.alias("home/index.js", "home/index.js");
require.alias("yields-k/index.js", "home/deps/k/index.js");
require.alias("yields-k/proto.js", "home/deps/k/proto.js");
require.alias("yields-keycode/index.js", "yields-k/deps/keycode/index.js");

require.alias("component-event/index.js", "yields-k/deps/event/index.js");

require.alias("component-bind/index.js", "yields-k/deps/bind/index.js");

require.alias("component-os/index.js", "yields-k/deps/os/index.js");

require.alias("home/index.js", "home/index.js");