var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// coleccion de datos de operador
var Operador_schema=new Schema({
    nombre:String,
    apellido:String,
    telefono:Number,
    genero:String,
    direccion:String,
    ci:Number,
    estado:Number,
    created_at:String
});
module.exports= mongoose.model("Operador",Operador_schema);
