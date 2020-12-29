const mongoose = require('mongoose');
const StockPrice = require('../model/stockPrice');
const getStockPrice = require('./getStockPrice');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

StockPrice.findOne({corpName: "test"}, (err, doc) => {
	if (err) return console.log(err);
	
	// TODO
	// 	upsert object.
	doc.data.push({date: new Date("2020.12.21"), price:1234});
	doc.save( (err, res) => {
		if (err) {
			console.log(err);
			return mongoose.disconnect();
		}
		console.log(res);
		return mongoose.disconnect();
	})
})

// StockPrice: {
// 	corpName: corpName,
// 	stockCode: String,
// 	data: [{date: Date, price: Number}]
// }