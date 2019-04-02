import {Collector} from './core/Collector.js';
import {Transport} from './core/Transport.js';
import {EVENT_TYPE} from './core/constants.js';
import ClientIdCollector from "./collectors/ClientIdCollector";
import {errorCollector} from "./collectors/errorCollector";
import EventActionCollector from "./collectors/EventActionCollector";
import EventTypeCollector from "./collectors/EventTypeCollector";
import UriWithCustomCategoryCollector from "./collectors/UriWithCustomCategoryCollector"
import UriWithPageTitleCategoryCollector from "./collectors/UriWithPageTitleCategoryCollector"
import IdCollector from './collectors/IdCollector';

const collectors = {
  ClientIdCollector: ClientIdCollector,
  errorCollector: errorCollector,
  EventActionCollector: EventActionCollector,
  EventTypeCollector: EventTypeCollector,
  UriWithCustomCategoryCollector: UriWithCustomCategoryCollector,
  UriWithPageTitleCategoryCollector: UriWithPageTitleCategoryCollector
  IdCollector: IdCollector
};

export {
  Collector,
  EVENT_TYPE,
  collectors,
  Transport
};