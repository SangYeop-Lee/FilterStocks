const mongoose = require('mongoose');
const TestModel = require('../model/test');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

new TestModel({
	corpName: corpName,
	stockCode: String,
	data: [{date: Date, price: Number}]
	
})