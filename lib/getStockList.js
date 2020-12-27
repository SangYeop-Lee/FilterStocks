const https = require('https');
const DOMParser = require('dom-parser');
const parser = new DOMParser();
const iconv = require('iconv-lite');
const TaskQueue = require('./TaskQueue');

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
	return DOMParsedHTMLfromURL(url, 'euc-kr').
		then( doc => {
			const filteredElements = doc.getElementsByClassName('ctg');
			return filteredElements.map( el => {
				const ret = {};
				ret.corpName = el.textContent;
				ret.stockCode = el.getElementsByTagName('a')[0].getAttribute('href').
												match(/(?<=code\=)[0-9]*/)[0];
				return ret;
			})
		})
}

// iterate Pages (needs callback)
function iteratePages (callback) {
	let url = 'https://finance.naver.com/sise/entryJongmok.nhn?&page=';
	
	const tasks = []
	for (let i=0; i<1; i++)
		tasks.push(extractDataFromURL.bind(null, url+(i+1)));
	
	(new TaskQueue(tasks, callback)).next();
}

// iteratePages(console.log) (test)
