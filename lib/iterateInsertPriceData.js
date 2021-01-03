const insertPriceData = require('./insertPriceData');
const StockPrice = require('../model/stockPrice');
const getStockPrice = require("./getStockPrice")
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

StockPrice.find({})
	.limit(1)
	.exec((err, docs) => {
	if (err) return console.log(err);
	console.log(`${docs.length} doc(s) found`);
	
	{
		// TODO
		//	need to fix mongoose connection problem.
		let saveCount = 0;
		const iterateNum = 1;
		const startPage = 31;
		docs.forEach((doc, i) => {
			setTimeout(() => {
				const {stockCode, corpName} = doc;
				Promise.all(getStockPrice({
					stockCode: stockCode,
					iterateNum: iterateNum,
					startPage: startPage
				})).then(values => {
					const savedData = [].concat.apply([], values);
					insertPriceData(corpName, savedData);
					
					if (++saveCount === docs.length) mongoose.disconnect();
				})
			}, i*iterateNum*100)
		})
		
	}
})
