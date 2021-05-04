var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Vehiculo_schema = new Schema({
    num_movil:String,
    turno:String,
    chasis:String,
    placa:{
        type: String,
        unique:true,
        required:true
    },
    modelo:String,
    marca:String,
    color:String,
    videos:[{
        cam:Number,
        time:Number,
        name:String,
    }],
    aud1:String,
    vid1:String,
    aud2:String,
    vid2:String,
});
module.exports= mongoose.model("Vehiculo",Vehiculo_schema);
