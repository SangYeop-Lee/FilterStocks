const mongoose = require('mongoose');

const stockPriceSchema = new mongoose.Schema({
	corpName: String,
	stockCode: String,
	data: [{date: Date, price: Number}]
});

// https://mongoosejs.com/docs/subdocs.html
// https://mongoosejs.com/docs/api.html#mongoosearray_MongooseArray-addToSet
module.exports = mongoose.model('StockPrice', stockPriceSchema);