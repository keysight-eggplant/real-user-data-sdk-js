export class Collector {
	constructor(transport, collectors) {
		this.transport = transport;
		this.collectors = Array.isArray(collectors) ? [].concat(collectors) : [];
	}

	add(collectorRule) {
		this.collectors.push(collectorRule);

		return this;
	}

	clone() {
		return new Collector(this.transport, this.collectors);
	}

	async collect() {
		let i = 0;
		let event = {};

		do {
			let collectorRule = this.collectors[i];
			event = await collectorRule(event);

			if (!event) {
				throw new Error("Invalid event returned by collector " + collectorRule.name);
			}
		} while (i++ < this.collectors.length - 1);

		await this.transport.execute(event);
	}
}