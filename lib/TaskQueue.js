module.exports = class TaskQueue {
	constructor(queue, callback) {
		this.queue = queue;
		this.callback = callback;
		this.result = [];
	}
	
	next() {
		if (!this.queue.length) {
			return this.callback(this.result);
		}
		this.queue.pop()().
			then(res => {
				this.result = this.result.concat(res);
				// problem:
				// 	context of this is destroyed after the execution of next
				// 	https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#The_this_problem
				// solution1:
				// 	use bind.
				// 		setTimeout(this.next.bind(this), 100); // 10 requests per second
				// solution2:
				// 	use arrow function
				setTimeout(() => this.next(), 100); // 10 requests per second
			})
	}
}