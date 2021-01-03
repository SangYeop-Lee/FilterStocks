const mongoose = require('mongoose');
const StockPrice = require('../model/stockPrice');

// function deleteDocument (corpName) {
// 	mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

// 	StockPrice.deleteOne({corpName: corpName}, (err, res) => {
// 		if (err) return console.log(err);
// 		console.log(res);
// 		return mongoose.disconnect();
// 	})
// }

// deleteDocument('test');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

StockPrice.deleteMany({}, (err, res) => {
	if (err) return console.log(err);
	console.log(res);
	return mongoose.disconnect();
})