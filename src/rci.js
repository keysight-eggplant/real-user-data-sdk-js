import Collector from './core/Collector';
import Transport from './core/Transport';
import EVENT_TYPE from './core/constants';

import ClientIdCollector from './collectors/ClientIdCollector';
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
  DeviceTypeCollector,
  ErrorCollector,
  EventActionCollector,
  EventTypeCollector,
  IdCollector,
  StopJourneyActionCollector,
  TimingCollector,
  UriWithCustomCategoryCollector,
  UriWithPageTitleCategoryCollector
};

export {
  Collector,
  EVENT_TYPE,
  collectors,
  Transport
};
