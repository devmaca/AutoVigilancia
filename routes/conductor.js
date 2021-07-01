
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
		res.render('persona/registro_conductores');
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
router.route('/api/add')
	.get(function(req, res){
		res.send('recibido');
	})
	.post(function (req, res) {
		console.log('datos validados recibidos!!!')

		console.log('apiREST params', req.params);
    	console.log('apiREST query', req.query);
    	console.log('apiREST body', req.body.nombre);
		try{
		var cond = new Conductor({ nombre: req.body.nombre,
				apellido: req.body.apellido,
				telefono: req.body.telefono,
				genero: req.body.genero,
				direccion: req.body.direccion,
				ci: req.body.ci,
				estado: req.body.estado,
				created_at: new Date().toString()});
		console.log('datos de conductor.....:',cond);

		res.status(200).send({
			finalizado: true,
			msg:'todo ok!!!!'
		})}catch(e){
			console.log('error', e);
			res.status(501).send({
      		finalizado: true,
      		mensaje: 'post Error',
    });
		}
	})
router.get('/show', async function (req, res) {
	let consulta = await Conductor.find();
	console.log(consulta);
	res.send(consulta)
});
module.exports = router;