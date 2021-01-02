const insertPriceData = require('./insertPriceData');
const StockPrice = require('../model/stockPrice');
const getStockPrice = require("./getStockPrice")
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

StockPrice.find({})
	.limit(5)
	.exec((err, docs) => {
	if (err) return console.log(err);
	
	let updateCount = 0;
	
	docs.forEach(doc => {
		
		Promise.all(getStockPrice({
			stockCode: doc.stockCode,
			iterateNum: 1,
			startPage: 21
		})).then(values => {
			// insertPriceData(doc.corpName, values);
			console.log(values);
			if (++updateCount === docs.length) mongoose.disconnect();
		})
	})
})
