
/**
 * Dependencies
 */

var tmpl = require('./template.html'),
		posts = require('./lib/posts'),
		once = require('once'),
		View = require('view'),
		Store = require('store'),
		EachPlugin = require('each-plugin');


/**
 * Expose 'home'
 */

module.exports = once(home);


/**
 * home middleware.
 * @api public
 */

function home() {
  var view = new View(),
  		store = new Store(posts);

  view.template(tmpl);
  view.plugin('each', new EachPlugin(store));
  view.insert(document.querySelector('.container'));
}
