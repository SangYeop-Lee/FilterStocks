const mongoose = require('mongoose');
const StockPrice = require('../model/stockPrice');

function resetDocuments () {
	mongoose.connect('mongodb://localhost/test', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	StockPrice.find({}, (err, docs) => {
		if (err) return console.log(err);
		
		docs.forEach(doc => {
			if (doc.data.length) {
				console.log(doc.data);
			}
		})
		
		// process.nextTick(mongoose.disconnect);
	})
}

resetDocuments();