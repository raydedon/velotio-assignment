const File = require('../model/file');

exports = module.exports = {};

exports.readAll = (req, res) => {
	console.log('req.param.name: ' + req.params.name);
	File.find({name: {'$regex' : req.params.name, '$options' : 'i'}})
		.then(files => {
			res.send(files);
		})
		.catch(err => {
			res.status(500).send({message: err.message || 'Some error occurred while retrieving Files.'});
		});
};

exports.findAll = (req, res) => {
	File.find()
		.then(files => {
			res.send(files);
		})
		.catch(err => {
			res.status(500).send({message: err.message || 'Some error occurred while retrieving Files.'});
		});
};

exports.create = (req, res) => {
	// Create a User
	let {
		name = '',
		type = ''
	} = req.body;
	const file = new File({name, type});
	
	// Save User in the database
	file.save()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the File.'
			});
		});
};
