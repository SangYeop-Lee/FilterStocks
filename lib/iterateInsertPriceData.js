const insertPriceData = require('./insertPriceData');
const StockPrice = require('../model/stockPrice');
const getStockPrice = require("./getStockPrice")

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

StockPrice.find({}, (err, docs) => {
	if (err) return console.log(err);
	
	let updateCount = 0;
	
	docs.forEach(doc => {
		Promise.all(iteratePages({
			stockCode: doc.stockCode,
			iterateNum: 10,
			startPage: 1
		})).then(values => {
			insertPriceData(doc.corpName, values);
			if (++updateCount === docs.length) mongoose.disconnect();
		})
	})
})
