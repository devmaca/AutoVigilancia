var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// coleccion de datos de conductores
var Conductor_schema=new Schema({
    nombre:{type:String},
    apellido:{type:String},
    telefono:{type:Number},
    genero:String,
    direccion:String,
    ci:Number,	
    estado:Number,
    created_at:String
});
module.exports= mongoose.model("Conductor",Conductor_schema);
