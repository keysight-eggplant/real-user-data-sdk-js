import ClientIdCollector from './ClientIdCollector.js';
import DeviceTypeCollector from './DeviceTypeCollector.js';
import EventActionCollector from './EventActionCollector.js';
import EventTypeCollector from './EventTypeCollector.js';
import SoftwareCollector from './SoftwareCollector.js';
import HardwareCollector from './HardwareCollector.js';
import IdCollector from './IdCollector.js';
import NavigationTimingCollector from './NavigationTimingCollector.js';
import UriWithPageTitleCategoryCollector from './UriWithPageTitleCategoryCollector.js';
import UserAgentCollector from './UserAgentCollector.js';
import {EVENT_TYPE, EVENT_ACTION} from '../core/constants.js';

export default [
  new IdCollector(),
  new ClientIdCollector(localStorage),
  new DeviceTypeCollector(),
  new EventActionCollector(EVENT_ACTION.STATE_TRANSITION_FULL),
  new EventTypeCollector(EVENT_TYPE.STATE),
  new NavigationTimingCollector(),
  new UriWithPageTitleCategoryCollector(),
  new SoftwareCollector(),
  new HardwareCollector(),
  new UserAgentCollector()
];
