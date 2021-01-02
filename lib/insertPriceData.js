const mongoose = require('mongoose');
const StockPrice = require('../model/stockPrice');
const getStockPrice = require('./getStockPrice');

function insertPriceData (targetCorpName, targetData) {
	mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

	StockPrice.findOne({corpName: targetCorpName}, (err, doc) => {
		if (err) return console.log(err);

		for (const datum of targetData) {
			if (doc.data.find(el => el.date.toString()===datum.date.toString())) {
				console.log("already exist.");
				continue;
			}
			doc.data.push(datum);	
		}

		doc.save((err, res) => {
			if (err) return console.log(err);
			console.log(res);
			return mongoose.disconnect();
		})
	})
}

module.exports = insertPriceData;

// StockPrice: {
// 	corpName: corpName,
// 	stockCode: String,
// 	data: [{date: Date, price: Number}]
// }