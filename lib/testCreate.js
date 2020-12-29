const mongoose = require('mongoose');
const insertCorpData = require('./insertCorpData');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

insertCorpData([{corpName:'test', stockCode:'987654321'}]);

// TestModel: {
// 	corpName: corpName,
// 	stockCode: String,
// 	data: [{date: Date, price: Number}]
// }