
var express = require('express');
var router = express.Router();
var vehiculoController = require('../controllers/vehiculoControllers');

router.get('/registrar', function (req, res, next) {
  res.render('registro');
});
router.post('/registrar', function (req, res, next) {
  console.log('regVehiculo', req.body);
  if (req.body._id) {
    //debe editar el documnetos
    res.send('aqui va tu codigo para editar este doucmento ');
  } else {
    console.log('entrando');

    //debemos registrar el documento
    vehiculoController.add(req.body, function (err, doc) {
      if (doc) {
        res.redirect('/vehiculo/ver/' + doc._id);
      } else {
        res.send('errRegistro');
      }
    });
  }

});
router.get('/ver/:id', function (req, res, next) {
  var id = req.params.id;
  vehiculoController.findById(id, function (err, doc) {
    if (doc) {
      res.render('registro', { registro: doc });
    } else {
      res.send('errDb');
    }
  })
});
router.get('/videos/:id', function (req, res, next) {
  var id = req.params.id;
  vehiculoController.findById(id, function (err, doc) {
    if (doc) {
      res.render('calendario', { vehiculo: doc });
    } else {
      res.send('errDb');
    }
  })
});
router.get('/visualizar', function (req, res, next) {
  vehiculoController.listar(function (err, doc) {
    if (doc) {
      res.render('visualizar', { title: 'Lista de Streaming/videos Tambien', lista: doc });
    } else {
      res.send('errDb');
    }
  });

});
router.get('/visualizarRealTime/:placa', function (req, res, next) {
  var placa = req.params.placa;
  vehiculoController.findByPlaca(placa, function (err, doc) {
    if (doc) {
      res.render('videoStreaming', { vehiculo: doc });
    } else {
      res.send('errDb');
    }
  })

  
});
router.post('/transmitir', function (req, res, next) { 
  var placa = req.body.placa;
  console.log(placa);
  
  vehiculoController.findByPlaca(placa, function (err, doc) {
    if (doc) {
      res.render('transmitir', { vehiculo: doc });
    } else {
      res.send('errDb');
    }
  })
});
module.exports = router;