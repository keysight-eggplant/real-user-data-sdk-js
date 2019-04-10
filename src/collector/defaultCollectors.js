import ClientIdCollector from './ClientIdCollector';
import DeviceTypeCollector from './DeviceTypeCollector';
import EventActionCollector from './EventActionCollector';
import EventTypeCollector from './EventTypeCollector';
import IdCollector from './IdCollector';
import NavigationTimingCollector from './NavigationTimingCollector';
import UriWithPageTitleCategoryCollector from './UriWithPageTitleCategoryCollector';
import {EVENT_TYPE, EVENT_ACTION} from '../core/constants';

export default [
  new IdCollector(),
  new ClientIdCollector(localStorage),
  new DeviceTypeCollector(),
  new EventActionCollector(EVENT_ACTION.STATE_TRANSITION_FULL),
  new EventTypeCollector(EVENT_TYPE.STATE),
  new NavigationTimingCollector(),
  new UriWithPageTitleCategoryCollector()
];
