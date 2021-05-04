

/*
Muy bien, creo que he encontrado el origen del problema, debería estar relacionado con esto .

Chrome deshabilita funciones como getUserMediacuando proviene de un origen no seguro. http://localhostse considera un origen seguro de forma predeterminada, sin embargo, si utiliza un origen que no tiene un certificado SSL / TLS, Chrome considerará el origen como no seguro y deshabilitado getUserMedia.

Lo que puedes hacer es:

Configurar un certificado SSL / TLS.
O vaya a chrome://flags, busque la bandera unsafely-treat-insecure-origin-as-secure, ingrese el origen que desea tratar como seguro, como http://{YOUR HOST IP}:1337habilitar la función y reiniciar el navegador.
Avísame si eso funciona.

1 entramos en chrome y ponemos   chrome://flags,
2 buscamos la opcion  unsafely-treat-insecure-origin-as-secure
3 anotamos http://{YOUR HOST IP}:1337  //donde el 1337 es el puerto de tu server
4 habilita la funcion y reinicia el navegador
*/

var loggerVid = document.getElementById('areaVid');
function logVid(message) {
    loggerVid.innerHTML = loggerVid.innerHTML + message + "<br/>";
};

var loggerAud = document.getElementById('areaAud');
function logAud(message) {
    loggerAud.innerHTML = loggerAud.innerHTML + message + "<br/>";
};

try {
    navigator.mediaDevices
    navigator.mediaDevices.enumerateDevices
} catch (error) {
    console.log(error);
}
if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
} else {
    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
            devices.forEach(function (device) {
                if (device.deviceId.length > 16) {
                    if (device.kind == 'audioinput') {
                        logAud("#" + device.kind + ": " + device.label +
                            " id = " + device.deviceId);
                    }
                    if (device.kind == 'videoinput') {
                        logVid("#" + device.kind + ": " + device.label +
                            " id = " + device.deviceId);
                    }
                }
                //mostrando cada video
            });
        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
        });
}

