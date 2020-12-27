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

// iterate Pages (using Promise)
function iteratePages (stockCode, callback) {
	let url = `https://finance.naver.com/item/sise_day.nhn?code=${stockCode}&page=`;
	
	const tasks = []
	for (let i=0; i<3; i++)
		tasks.push(extractDataFromURL.bind(null, url+(i+1)));
	
	(new TaskQueue(tasks, callback)).next();
}

iteratePages('098660', console.log); // test
