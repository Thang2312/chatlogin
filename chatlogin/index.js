var express = require('express');
var app = express();
app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views','./views');
var server = require('http').Server(app);
/*setup socketio*/
var io = require('socket.io')(server);
server.listen(2312);

var mangUSer = [];

io.on("connection",function(socket) {
  console.log("Co nguoi ket noi" + socket.id);
  socket.on("client-send-User",function(data) {
    // var socket.Username;
    if(mangUSer.indexOf(data) >= 0) {
      socket.emit("server-send-dangki-thatbai");
    }else {
      mangUSer.push(data);
      socket.Username = data;
      socket.emit("server-send-dangki-thanhcong",data);
      io.sockets.emit('server-send-danhsach-User',mangUSer);
    }
  });
  socket.on("logout",function() {
      mangUSer.splice(mangUSer.indexOf(socket.Username),1
    );
  socket.broadcast.emit("server-send-danhsach-User",mangUSer);
  });
  socket.on("user-send-message",function(data) {
    stringdata = socket.Username + " : " + data;
    io.sockets.emit("server-send-message",stringdata);
  });
  socket.on("start-data",function() {
    var s = socket.Username + " dang go chu...";
    socket.broadcast.emit("dang-go-chu",s);
  });
  socket.on("stop-data",function() {
    socket.broadcast.emit("stop-go-chu");
  });
});

app.get('/',function(req,res) {
  res.render('trangchu');
});
