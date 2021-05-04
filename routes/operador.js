
var express = require('express');
var router = express.Router();
const Operador = require('../models/operador')

router.get('/',async function(req,res){
  let datos = await Operador.find();
  res.render('show/operadores', { title: 'Lista de operadores', lista: datos });
})
// adicionar operador
router.route('/add')
  .get(function(req, res){
    res.render('registro_operador');
  })
  .post(async function(req, res){
      let datos = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        genero: req.body.genero,
        direccion: req.body.direccion,
        ci: req.body.ci,
        estado: req.body.estado,
        created_at: new Date().toString()
      }
      var operador = new Operador(datos);
      await operador.save();
      console.log('guardado exitosamente')
      res.send('guardado exitosamente');
  })

router.get('/show', async function (req, res) {
  let consulta = await Operador.find();
  console.log(consulta);
  res.send(consulta)
});
module.exports = router;