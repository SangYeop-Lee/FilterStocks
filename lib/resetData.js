const mongoose = require('mongoose');
const TestModel = require('../model/test');

function resetDocuments () {
	mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

	TestModel.deleteMany({}, (err, res) => {
		if (err) return console.log(err);
		
		console.log(res);
		mongoose.disconnect();
	})
}

resetDocuments();