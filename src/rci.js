import Collector from './core/Collector';
import Transport from './core/Transport';
import {
  EVENT_TYPE,
  EVENT_ACTION,
  JOURNEY_ACTION
} from './core/constants';
import defaultCollection from './collections/defaultCollection';
import ClientIdCollector from './collectors/ClientIdCollector';
import ConversionCollector from './collectors/ConversionCollector';
import DeviceTypeCollector from './collectors/DeviceTypeCollector';
import ErrorCollector from './collectors/ErrorCollector';
import EventActionCollector from './collectors/EventActionCollector';
import EventTypeCollector from './collectors/EventTypeCollector';
import IdCollector from './collectors/IdCollector';
import StopJourneyActionCollector from './collectors/StopJourneyActionCollector';
import TimingCollector from './collectors/TimingCollector';
import UriWithCustomCategoryCollector from './collectors/UriWithCustomCategoryCollector';
import UriWithPageTitleCategoryCollector from './collectors/UriWithPageTitleCategoryCollector';

const collectors = {
  ClientIdCollector,
  ConversionCollector,
  DeviceTypeCollector,
  ErrorCollector,
  EventActionCollector,
  EventTypeCollector,
  IdCollector,
  StopJourneyActionCollector,
  TimingCollector,
  UriWithCustomCategoryCollector,
  UriWithPageTitleCategoryCollector,
};
const collections = {
  defaultCollection
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
