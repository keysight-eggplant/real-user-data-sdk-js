import ClientIdCollector from './ClientIdCollector';
import DeviceTypeCollector from './DeviceTypeCollector';
import EventActionCollector from './EventActionCollector';
import EventTypeCollector from './EventTypeCollector';
import SoftwareCollector from './SoftwareCollector';
import HardwareCollector from './HardwareCollector';
import IdCollector from './IdCollector';
import NavigationTimingCollector from './NavigationTimingCollector';
import UriWithPageTitleCategoryCollector from './UriWithPageTitleCategoryCollector';
import UserAgentCollector from './UserAgentCollector';
import {EVENT_TYPE, EVENT_ACTION} from '../core/constants';

export default [
  new IdCollector(),
  // new ClientIdCollector(localStorage),
  new DeviceTypeCollector(),
  new EventActionCollector(EVENT_ACTION.STATE_TRANSITION_FULL),
  new EventTypeCollector(EVENT_TYPE.STATE),
  // new NavigationTimingCollector(),
  // new UriWithPageTitleCategoryCollector(),
  // new SoftwareCollector(),
  // new HardwareCollector(),
  new UserAgentCollector()
];
