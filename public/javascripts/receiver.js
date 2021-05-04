
var logger = document.getElementById('logger');
var img = document.getElementById("frame");
var img2 = document.getElementById("frame2");	
function log(message) {
    logger.innerHTML = logger.innerHTML + message + "<br/>";
};


////////////////////////
//todo lo referente a sockets
var socket = io.connect("http://localhost:3000");
//var socket = io.connect("http://192.168.3.103:3000");
//var socket = io.connect("http://192.168.1.12:3000");

var channel = ve.placa;
//console.log("datos>",ve);


socket.on('connect', function () {
    log('connected');
    subscribeReceiver();
});

socket.on('disconnect', function () {
    log('disconnected');
});

socket.on('channel', function (data) {
    log('channel' + data);
});
socket.on('videoReceive', function (data) {
    if(data.camNum==1){
        img.src=data.video
    }
    if(data.camNum==2){
        img2.src=data.video
    }
    
});

//////////////////////////////////////////////////////////////////
/////funciones que usaran los receptores
function subscribeReceiver() {
    let data = {
        op: "IN_R",
        channel: channel
    }
    socket.emit('channel', data);
}
