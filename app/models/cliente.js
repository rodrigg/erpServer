var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClienteSchema   = new Schema({
    nombre:String, 
    direccion:String, 
    telefono:String,
    estado: String
});

module.exports = mongoose.model('Cliente', ClienteSchema);