export class Collector {
	constructor(transport, collectors) {
		this.transport = transport;
		this.collectors = Array.isArray(collectors) ? [].concat(collectors) : [];
	}

	async collect() {
		let event = {};

		this.collectors.map(async collectorRule => {

			event = await collectorRule.prepare(event);

			if (!event) {
				throw new Error("Invalid event returned by collector " + collectorRule.name);
			}
		})

		await this.transport.execute(event);
	}
}