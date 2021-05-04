
var express = require('express');
var router = express.Router();
// var vehiculoController = require('../controllers/vehiculoControllers');
const Conductor = require('../models/conductores');

router.get('/',async function(req,res){
	let condu = await Conductor.find();
	res.render('show/conductores', { title: 'Lista de conductores', lista: condu });
})
// adicionar conductor
router.route('/add')
	.get(function(req, res){
		res.render('registro_conductores');
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
			var conductor = new Conductor(datos);
			await conductor.save();
			console.log('guardado exitosamente')
			res.send('guardado exitosamente');
	})

router.get('/show', async function (req, res) {
	let consulta = await Conductor.find();
	console.log(consulta);
	res.send(consulta)
});
module.exports = router;