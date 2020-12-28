const mongoose = require('mongoose');
const StockPrice = require('../model/stockPrice');

function insertCorpData (data) {
	mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

	// array of data
	StockPrice.insertMany(data, (err, res) => {
		if (err) return console.log(err);
		console.log(res);
		return mongoose.disconnect();
	})	
}

module.exports = insertCorpData;

// StockPrice: {
// 	corpName: corpName,
// 	stockCode: String,
// 	data: [{date: Date, price: Number}]
// }