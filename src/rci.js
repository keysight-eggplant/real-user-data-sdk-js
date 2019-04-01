import {Collector} from './core/Collector.js';
import {Transport} from './core/Transport.js';
import {EVENT_TYPE} from './core/constants.js';
import {ClientIdCollector} from "./collectors/ClientIdCollector";
import {errorCollector} from "./collectors/errorCollector";
import {eventActionCollector} from "./collectors/eventActionCollector";
import {eventTypeCollector} from "./collectors/eventTypeCollector";
import {default as UriWithCustomCategoryCollector} from "./collectors/UriWithCustomCategoryCollector"
import {default as UriWithPathCategoryCollector} from "./collectors/UriWithPageTitleCategoryCollector"

const collectors = {
  ClientIdCollector: ClientIdCollector,
  errorCollector: errorCollector,
  eventActionCollector: eventActionCollector,
  eventTypeCollector: eventTypeCollector,
  UriWithCustomCategoryCollector: UriWithCustomCategoryCollector,
  UriWithPathCategoryCollector: UriWithPathCategoryCollector
};

export {
  Collector,
  EVENT_TYPE,
  collectors,
  Transport
};