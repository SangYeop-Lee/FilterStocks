const insertPriceData = require('./insertPriceData');
const StockPrice = require('../model/stockPrice');
const getStockPrice = require("./getStockPrice")

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

StockPrice.find({}, (err, docs) => {
	if (err) return console.log(err);
	
	
	// TODO
	//	may have concurrency problem.
	//	use TaskQueue
	
	// docs.forEach( doc => {
	// 	getStockPrice({
	// 		stockCode: doc.stockCode,
	// 		iterateNum: 10,
	// 		startPage: 1
	// 	}, insertPriceData.bind(null, doc.corpName));
	// 	doc.save();
	// })
})