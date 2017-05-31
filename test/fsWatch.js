var fs = require('fs');
/*console.log(__dirname + '/test.txt')
fs.watchFile(__dirname + '/test.txt', {interval: 20}, function (curr, prev) {
  if(Date.parse(prev.ctime) == 0) {
    console.log('文件被创建!');
  } else if(Date.parse(curr.ctime) == 0) {
    console.log('文件被删除!')
  } else if(Date.parse(curr.mtime) != Date.parse(prev.mtime)) {
  	// console.log(curr)
  	console.log(prev)
    console.log('文件有修改');
  }
});*/


/*var fsWatcher = fs.watch(__dirname + '/test.txt', function (event, filename) {
  console.log('event='+event);
  console.log(filename);
});

fsWatcher.on('change', function (event, filename) {
  console.log(filename + ' 发生变化')
  console.log(event)
});*/

var Tail = require('tail').Tail;
var fileToTail = __dirname + '/test.txt';
var tail = new Tail(fileToTail);

console.log('file to tail');
console.log(fileToTail)

tail.on("line", function(data) {
	console.log(data);
});

tail.on("error", function(error) {
	console.log('ERROR: ', error);
});