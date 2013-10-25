
/**
 * Dependencies
 */

var page = require('page');


//define routes

page('/', require('home'));
page('/blog/:post', require('blog'));
//page('/blog/:repo/:post', edit);
//page('*', notfound);
page();
