import {Collector} from './core/Collector.js';
import {Transport} from './core/Transport.js';
import {EVENT_TYPE} from './core/constants.js';
import {ClientIdCollector} from "./collectors/ClientIdCollector";
import {errorCollector} from "./collectors/errorCollector";
import {eventActionCollector} from "./collectors/eventActionCollector";
import {eventTypeCollector} from "./collectors/eventTypeCollector";

const collectors = {
  ClientIdCollector: ClientIdCollector,
  errorCollector: errorCollector,
  eventActionCollector: eventActionCollector,
  eventTypeCollector: eventTypeCollector
};

export {
  Collector,
  EVENT_TYPE,
  collectors,
  Transport
};