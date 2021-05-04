var socket = io.connect("http://localhost:3000");
//var socket = io.connect("http://192.168.1.12:3000");
//var socket = io.connect("http://192.168.100.164:3000");

socket.on('connect', function () {
    console.log('connected');
    socket.emit('status');

});

socket.on('disconnect', function () {
    console.log('disconnect');

});

socket.on('status', function (data) {
    console.log('data--allListar', data, allLista);
    allLista.forEach(activos => {
        document.getElementById('st' + activos.placa).innerHTML = "nn";
    });
    data.transmiters.forEach(element => {
        document.getElementById('st' + element.channel).innerHTML = "<a href='"+"/vehiculo/visualizarRealTime/" + element.channel +"'"+ " >traRT</a>";
    });
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
