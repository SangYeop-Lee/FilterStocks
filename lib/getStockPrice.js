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
	return new Promise((resolve) => {
		let i = 0;
		let result = [];
		const url = `https://finance.naver.com/item/sise_day.nhn?code=${options.stockCode}&page=`;
		const interval = setInterval(() => {
			console.log(`getting data from ${url+(options.startPage+i)}...`);
			extractDataFromURL(url+(options.startPage+i++))
				.then(res => {
					result = [...result, ...res];
					if (i >= options.iterateNum) {
						clearInterval(interval);
						resolve(result);
					}
			})
		}, 1000);
	})
}

// const options = {
// 	stockCode: '098660',
// 	iterateNum: 1,
// 	startPage: 1 // 1 index
// }

// iteratePages(options, console.log); // test
