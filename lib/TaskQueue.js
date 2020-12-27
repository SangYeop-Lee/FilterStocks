module.exports = class TaskQueue {
	constructor(queue, callback) {
		this.queue = queue;
		this.callback = callback;
		this.result = [];
		this.cease = false;
	}
	
	next() {
		if (!this.queue.length&&!this.cease) return this.callback(this.result);
		this.queue.pop()().
			then(res => {
				this.result = this.result.concat(res);
				this.next();
			})
	}
}