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
		let event = {};

		this.collectors.map(async collectorRule => {

			event = await collectorRule(event);

			if (!event) {
				throw new Error("Invalid event returned by collector " + collectorRule.name);
			}
		})

		await this.transport.execute(event);
	}
}