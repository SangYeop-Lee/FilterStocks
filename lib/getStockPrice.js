// import this file to get daily price of 1 stock.

const https = require('https');
const DOMParser = require('dom-parser');
const parser = new DOMParser();
const iconv = require('iconv-lite');

// url to DOMParsed HTML (Promise)
function DOMParsedHTMLfromURL (url, decode='euc-kr') {
	return new Promise((resolve, reject) => {
		https.get(url, {
			headers: { 'User-Agent': 'Mozilla/5.0' }
		}, (res) => {
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
// TODO
//  example url: https://finance.naver.com/item/sise_day.nhn?code=272210&page=31
// 	if data is invalid, propagate error.
function extractDataFromURL (url) {
	return DOMParsedHTMLfromURL(url)
		.then( doc => {
			const filteredElements = doc.getElementsByTagName('tr').filter( tr => tr.attributes[0])
			return filteredElements
				.filter( el => +el.childNodes[3].textContent.replace(',', '') )
				.map( el => {
					const ret = {};
					ret.date = new Date(el.childNodes[1].textContent);
					ret.price = +el.childNodes[3].textContent.replace(',', '');
					return ret;
				})
		})
}

function getStockPrice (options) {
	let i = 0;
	let result = [];

	let promiseHead = new Promise((resolve, reject) => {
			console.log(`get data of stockCode: ${options.stockCode}`);
			resolve();
	});

	const url = `https://finance.naver.com/item/sise_day.nhn?code=${options.stockCode}&page=`;
	
	for (let i=0; i<options.iterateNum; i++) {
		promiseHead = promiseHead
			.then(function delay() {
				return new Promise (resolve => {
					setTimeout(resolve, 1000);
				})
			})
			.then(() => extractDataFromURL(url+(options.startPage+i++)))
			.then(data => {
				if (data.length < 10) {
					i = options.iterateNum
				}
				result = [...result, ...data]
				if (i >= options.iterateNum) {
					return result;
				}
			})
	}
	return promiseHead;
}

module.exports = getStockPrice

// const options = {
// 	stockCode: '098660',
// 	iterateNum: 1,
// 	startPage: 1 // 1 index
// }

// getStockPrice(options)
// 	.then(console.log)