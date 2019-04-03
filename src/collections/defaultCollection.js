import ClientIdCollector from '../collectors/ClientIdCollector';
import DeviceTypeCollector from '../collectors/DeviceTypeCollector';
import EventActionCollector from '../collectors/EventActionCollector';
import EventTypeCollector from '../collectors/EventTypeCollector';
import IdCollector from '../collectors/IdCollector';
import TimingCollector from '../collectors/TimingCollector';
import UriWithPageTitleCategoryCollector from '../collectors/UriWithPageTitleCategoryCollector';
import {EVENT_TYPE, EVENT_ACTION} from '../core/constants';

export default [
  new IdCollector(),
  new ClientIdCollector(localStorage),
  new DeviceTypeCollector(),
  new EventActionCollector(EVENT_ACTION.STATE_TRANSITION_FULL),
  new EventTypeCollector(EVENT_TYPE.STATE),
  new TimingCollector(),
  new UriWithPageTitleCategoryCollector()
];
