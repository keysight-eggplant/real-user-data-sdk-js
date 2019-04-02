import {Collector} from './core/Collector';
import {Transport} from './core/Transport';
import {
  EVENT_TYPE,
  EVENT_ACTION,
  JOURNEY_ACTION
} from './core/constants';
import defaultCollection from './collections/defaultCollection';
import ClientIdCollector from './collectors/ClientIdCollector';
import CheckoutCollector from './collectors/CheckoutCollector';
import DeviceTypeCollector from './collectors/DeviceTypeCollector';
import ErrorCollector from './collectors/ErrorCollector';
import EventActionCollector from './collectors/EventActionCollector';
import EventTypeCollector from './collectors/EventTypeCollector';
import IdCollector from './collectors/IdCollector';
import TimingCollector from './collectors/TimingCollector';
import UriWithCustomCategoryCollector from './collectors/UriWithCustomCategoryCollector';
import UriWithPageTitleCategoryCollector from './collectors/UriWithPageTitleCategoryCollector';

const collectors = {
  ClientIdCollector: ClientIdCollector,
  CheckoutCollector: CheckoutCollector,
  DeviceTypeCollector: DeviceTypeCollector,
  ErrorCollector: ErrorCollector,
  EventActionCollector: EventActionCollector,
  EventTypeCollector: EventTypeCollector,
  IdCollector: IdCollector,
  TimingCollector: TimingCollector,
  UriWithCustomCategoryCollector: UriWithCustomCategoryCollector,
  UriWithPageTitleCategoryCollector: UriWithPageTitleCategoryCollector,
};
const collections = {
  defaultCollection: defaultCollection
};

export {
  Collector,
  Transport,
  EVENT_TYPE,
  EVENT_ACTION,
  JOURNEY_ACTION,
  collectors,
  collections
};