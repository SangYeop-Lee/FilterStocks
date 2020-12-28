module.exports = class TaskQueue {
	constructor(queue, callback) {
		this.queue = queue;
		this.callback = callback;
		this.result = [];
		// this.stop = false;
		// TODO
		// stop spidering under certain condition 
	}
	
	next() {
		if (!this.queue.length) return this.callback(this.result);
		this.queue.pop()().
			then(res => {
				this.result = this.result.concat(res);
				this.next();
			})
	}
}