const insertPriceData = require('./insertPriceData');
const StockPrice = require('../model/stockPrice');
const getStockPrice = require("./getStockPrice")
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

StockPrice.find({})
	.exec((err, docs) => {
	if (err) return console.log(err);
	console.log(`${docs.length} doc(s) found`);
	
	{
		// TODO
		//	need to fix mongoose connection problem.
		let i = 0;
		let saveCount = 0;
		const iterateNum = 1;
		const startPage = 31;
		
		const interval = setInterval(() => {
			if (i===docs.length)
				return clearInterval(interval);
			
			const {stockCode, corpName} = docs[i++];
			getStockPrice({
				stockCode: stockCode,
				iterateNum: iterateNum,
				startPage: startPage
			}).then( res => {
				console.log(res);
				insertPriceData(corpName, res);
			})
		}, 1000*iterateNum)
	}
})
