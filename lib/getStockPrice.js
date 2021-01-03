// import this file to get daily price of 1 stock.

const https = require('https');
const DOMParser = require('dom-parser');
const parser = new DOMParser();
const iconv = require('iconv-lite');

// url to DOMParsed HTML (Promise)
function DOMParsedHTMLfromURL (url, decode='utf8') {
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
		let chunks = [];
		res.
			on('data', chunk => chunks.push(chunk)).
			on('end', () => {
				let decodedData = iconv.decode(Buffer.concat(chunks), decode);
				decodedData = decodedData.replace(/\s+/g, ' ');
				let res;
				try {
					res = parser.parseFromString(decodedData);
				} catch (e) {
					reject(e);
				}
				resolve(res);
			}).
			on('error', err => reject(error));
		})
	})
}

// get data from url (returns Promise)
function extractDataFromURL (url) {
	return DOMParsedHTMLfromURL(url).
		then( doc => {
			const filteredElements = doc.getElementsByTagName('tr').filter( tr => tr.attributes[0])
			return filteredElements.map( el => {
				const ret = {};
				ret.date = new Date(el.childNodes[1].textContent);
				ret.cost = +el.childNodes[3].textContent.replace(',', '');
				return ret;
			})
		})
}

// return lists of promises. use Promise.all
module.exports = function getStockPrice(options) {
	let url = `https://finance.naver.com/item/sise_day.nhn?code=${options.stockCode}&page=`;
	const tasks = [];
	for (let i=0; i<options.iterateNum; i++){
		const start = new Date();
		while (new Date()-start<100) {};
		tasks.push(extractDataFromURL.call(null, url+(i+options.startPage)));
	}
	return tasks;
}

// const options = {
// 	stockCode: '098660',
// 	iterateNum: 1,
// 	startPage: 1 // 1 index
// }

// iteratePages(options, console.log); // test
