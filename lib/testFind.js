const mongoose = require('mongoose');
const StockPrice = require('../model/stockPrice');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

StockPrice.find({}, (err, res) => {
	if (err) return console.log(err);
	mongoose.disconnect();
	return console.log(res);
})

// StockPrice: {
// 	corpName: corpName,
// 	stockCode: String,
// 	data: [{date: Date, price: Number}]
// }