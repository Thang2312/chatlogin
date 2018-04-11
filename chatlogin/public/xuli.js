var socket = io("http://localhost:2312");
socket.on("server-send-dangki-thatbai",function() {
  alert('Dang ki khong thanh cong');
});
socket.on("server-send-dangki-thanhcong",function(data) {
  $('#currenUser').html(data);
  $('#logginform').hide(2000);
  $('#chatform').show(1000);
});

socket.on("server-send-danhsach-User",function(data) {
  $("#boxContent").html("");
  data.forEach(function(i){
    $("#boxContent").append("<div class='useronLine'>" + i + "<span></span></div>")
  });
});

socket.on("server-send-message",function(data) {
  $("#lisMessage").append(data + '<br>');
});

socket.on("dang-go-chu",function(data) {
  $("#thongbao").html(data);
});

socket.on("stop-go-chu",function(data) {
  $("#thongbao").html("");
});

$(document).ready(function() {
  $("#logginform").show();
  $("#chatform").hide();
  $("#btnRegister").click(function() {
    socket.emit("client-send-User",$("#user").val());
  });
  $("#btnLogout").click(function() {
    socket.emit("logout");
    $("#chatform").hide(2);
    $("#logginform").show(1);
  });
  $("#btnSendMessage").click(function() {
    socket.emit("user-send-message",$("#textMessage").val());
  });
  $("#textMessage").focusin(function() {
    socket.emit('start-data');
  });
  $("#textMessage").focusout(function() {
    socket.emit('stop-data');
  });
});
