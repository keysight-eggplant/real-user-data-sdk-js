import {
  EVENT_TYPE,
  EVENT_ACTION,
  JOURNEY_ACTION
} from './core/constants';
import ClientIdCollector from './collectors/ClientIdCollector';
import CheckoutCollector from './collectors/CheckoutCollector';
import defaultCollection from './collections/defaultCollection';
import DeviceTypeCollector from './collectors/DeviceTypeCollector';
import Collector from './core/Collector';
import ErrorCollector from './collectors/ErrorCollector';
import EventActionCollector from './collectors/EventActionCollector';
import EventTypeCollector from './collectors/EventTypeCollector';
import IdCollector from './collectors/IdCollector';
import TimingCollector from './collectors/TimingCollector';
import Transport from './core/Transport';
import UriWithCustomCategoryCollector from './collectors/UriWithCustomCategoryCollector';
import UriWithPageTitleCategoryCollector from './collectors/UriWithPageTitleCategoryCollector';


const collectors = {
  ClientIdCollector,
  CheckoutCollector,
  DeviceTypeCollector,
  ErrorCollector,
  EventActionCollector,
  EventTypeCollector,
  IdCollector,
  TimingCollector,
  UriWithCustomCategoryCollector,
  UriWithPageTitleCategoryCollector,
};
const collections = {
  defaultCollection
};

export {
  Collector,
  EVENT_TYPE,
  EVENT_ACTION,
  JOURNEY_ACTION,
  collectors,
  Transport,
  collections
};
