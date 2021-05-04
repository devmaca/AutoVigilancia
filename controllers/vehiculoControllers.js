
var Vehiculo = require('../models/vehiculo');
var VehiculoCont = {}
VehiculoCont.add = function (data, callback) {
	var vehiculo = new Vehiculo({
		num_movil: data.num_movil,
		turno: data.turno,
		chasis: data.chasis,
		placa: data.placa,
		modelo: data.modelo,
		marca: data.marca,
		color: data.color,
		videos: [],
		aud1:data.aud1,
		vid1:data.vid1,
		aud2:data.aud2,
		vid2:data.vid2,
	});

	vehiculo.save(function (err, doc) {
		console.log(err, doc);

		if (doc) {
			return callback(null, doc);
		} else {
			console.log(err);
			return callback('errDb_add', null);
		}
	});

}
VehiculoCont.listar = function (callback) {
	var query = {};
	Vehiculo.find(query, function (err, doc) {
		if (doc) {
			return callback(null, doc);
		} else {
			console.log(err);

			return callback('errDb_add', null);
		}
	});
}
VehiculoCont.findById = function (id, callback) {
	Vehiculo.findById({ _id: id }, function (err, doc) {
		console.log('viendoErr',err, doc);
		if (doc) {
			return callback(null, doc);
		} else {
			console.log(err);
			return callback('errDb', null);
		}
	});
}
VehiculoCont.findByPlaca = function (placa, callback) {
	Vehiculo.findOne({ placa: placa }, function (err, doc) {
		console.log('viendoErr',err, doc);
		if (doc) {
			return callback(null, doc);
		} else {
			console.log(err);
			return callback('errDb', null);
		}
	});
}
VehiculoCont.addVideo = function (data,callback) {
	Vehiculo.findOneAndUpdate(
		{
			placa: data.placa
		},
		{
			$push: {
				videos: data
			}
		}, {
		new: true
	},
		function (err, doc) {
			if (doc) {
				return callback(null, doc);
			} else {
				console.log(err);
				return callback('errDb', null);
			}
		}
	);
}

module.exports = VehiculoCont;