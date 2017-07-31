const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json")
const fs = require("fs")
var b = config.lastText;
var NOTIFY_CHANNEL;
var buf = new Buffer(200000);

var startText = config.lastText;

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
  

client.login(config.token);

client.on("ready", () => {
    console.log("I am ready!");
    NOTIFY_CHANNEL = client.channels.find('id', '341328441616105472'); // Channel to send notification

         config.lastByte = "1430";
         fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

  });

setInterval(function() {
    var d = new Date();
    //NOTIFY_CHANNEL.send('The chests refresh in ' + d.getMinutes() + ' minutes!');
    fs.open('H:/Users/xnlfgh/Documents/EVE/logs/Chatlogs/Intel NREM_20170730_162059.txt', 'r+', function(err, fd) {
   if (err) {
      return console.error(err);
   }
     fs.read(fd, buf, 0, buf.length, config.lastByte, function(err, bytes){
      if (err){
         console.log(err);
      }
      console.log(bytes + " bytes read");
      b =""+(bytes);
      // Print only read bytes to avoid junk.
      if(bytes-config.lastByte > 0){
         NOTIFY_CHANNEL.send(buf.slice(config.lastByte, bytes).toString());
          //bString = b.ToString();
         config.lastByte = b;

          // Now we have to save the file.
          fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

      }
   });
});
}, 10 * 1000); // Check every 10 sec


client.on("message", (message) => {
    // Our new check
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
      
  if (message.content.startsWith(config.prefix + "ping")) {
    message.channel.send("pong!");
  } else

  if (message.content.startsWith(config.prefix + "foo")){
    message.channel.send("test");
  }

   if (message.author.id !== config.ownerID) return;
   
   if (message.content.startsWith(config.prefix + "test")){
    console.log("Going to open an existing file");
fs.open('H:/Users/xnlfgh/Documents/EVE/logs/Chatlogs/Intel NREM_20170730_162059.txt', 'r+', function(err, fd) {
   if (err) {
      return console.error(err);
   }
   console.log("File opened successfully!");
   console.log("Going to read the file");
   fs.read(fd, buf, 0, buf.length, config.lastByte, function(err, bytes){
      if (err){
         console.log(err);
      }
      console.log(bytes + " bytes read");
      b =""+(bytes);
      console.log(b);
      // Print only read bytes to avoid junk.
      if(bytes-config.lastByte > 0){
         message.channel.send(buf.slice(config.lastByte, bytes).toString());
          //bString = b.ToString();
         config.lastByte = b;

          // Now we have to save the file.
          fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

      }
   });
});
}

if(message.content.startsWith("anythign bishskkei jd")) {
  // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
  let newTeext = message.content.split(" ").slice(1, 2)[0];
  let newText = message.content;
  // change the configuration in memory
  config.lastText = newText;

  // Now we have to save the file.
  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
}
});

