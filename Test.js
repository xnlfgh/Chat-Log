
var fs = require('fs');
var intelLoc = "H:/Users/xnlfgh/Documents/EVE/logs/Chatlogs/Intel NREM_20170730_162059.txt";


function get_line(filename, line_no, callback) {
    fs.readFile(filename, function (err, data) {
      if (err) throw err;

      // Data is a buffer that we need to convert to a string
      // Improvement: loop over the buffer and stop when the line is reached
      var lines = data.toString('utf-8').split("\n");

      if(+line_no > lines.length){
        return callback('File end reached without finding line', null);
      }

      callback(null, lines[+line_no]);
    });
}

get_line(intelLoc, 13, function(err, line){
  console.log('The line: ' + line);
  })
  get_line(intelLoc, 14, function(err, line){
  console.log('The line: ' + line);
})

