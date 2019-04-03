import ClientIdCollector from './collectors/ClientIdCollector';
import Collector from './core/Collector';
import EVENT_TYPE from './core/constants';
import ErrorCollector from './collectors/ErrorCollector';
import EventActionCollector from './collectors/EventActionCollector';
import EventTypeCollector from './collectors/EventTypeCollector';
import IdCollector from './collectors/IdCollector';
import Transport from './core/Transport';
import UriWithCustomCategoryCollector from './collectors/UriWithCustomCategoryCollector';
import UriWithPageTitleCategoryCollector from './collectors/UriWithPageTitleCategoryCollector';


const collectors = {
  ClientIdCollector,
  ErrorCollector,
  EventActionCollector,
  EventTypeCollector,
  UriWithCustomCategoryCollector,
  UriWithPageTitleCategoryCollector,
  IdCollector,
};

export {
  Collector,
  EVENT_TYPE,
  collectors,
  Transport,
};
