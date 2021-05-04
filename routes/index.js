var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nombre del sistema' });
});
router.get('/transmitir', function(req, res, next) {
  res.render('transmitir', { placa: '3669tdl'});
});
router.get('/grabar', function(req, res, next) {
});
router.get('/visualizar', function(req, res, next) {
  res.render('visualizar', { title: 'Lista de videos/Streaming Tambien'});
});

module.exports = router;