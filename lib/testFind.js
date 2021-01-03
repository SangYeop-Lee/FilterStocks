const mongoose = require('mongoose');
const StockPrice = require('../model/stockPrice');
const fs = require("fs");

mongoose.connect('mongodb://localhost/test', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

StockPrice.find({}, (err, res) => {
	if (err) return console.log(err);
	mongoose.disconnect();
	fs.writeFileSync("./log", JSON.stringify(res.map(el => el.stockCode)));
})

// StockPrice: {
// 	corpName: corpName,
// 	stockCode: String,
// 	data: [{date: Date, price: Number}]
// }