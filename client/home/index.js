var k = require('k')(window);
var flatcolors = ['#e67e22','#3498db','#34495e','#16a085','#c0392b'];
var index = 0;
var style = document.createElement('style');


document.head.appendChild(style);

k('super + shift + right', function(){
  console.log('youhouu');
  var inline = 'body {background:' + flatcolors[++index]+ '}';
  style.innerHTML = inline;
  if(index === 4) index = -1;
});