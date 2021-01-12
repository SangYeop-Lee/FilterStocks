const insertPriceData = require('./insertPriceData');
const StockPrice = require('../model/stockPrice');
const getStockPrice = require("./getStockPrice")
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

StockPrice.find({})
	// .limit(3)
	.exec((err, docs) => {
	if (err) return console.log(err);
	console.log(`${docs.length} doc(s) found`);
	
	let promiseHead = new Promise((resolve, reject) => {
			resolve();
	});
	const iterateNum = 1;
	const startPage = 31;

	docs.forEach(({stockCode, corpName}) => {
		promiseHead = promiseHead
			.then(() => {
				return getStockPrice({
					stockCode,
					iterateNum,
					startPage
				})
			})
			.then( data => {
				return new Promise( resolve => {
					insertPriceData(corpName, data, resolve);	
				})
			})
	})

	promiseHead.then(() => {
		mongoose.disconnect();
	})

})
