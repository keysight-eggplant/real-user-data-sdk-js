import Producer from './core/Producer';
import Transport from './core/Transport';
import TriggerHelper from './core/Trigger.helper';
import {
  EVENT_TYPE,
  EVENT_ACTION,
  JOURNEY_ACTION,
  VERSION
} from './core/constants';
import defaultCollectors from './collector/defaultCollectors';
import webFocusedCollectors from './collector/webFocusedCollectors';
import ClientIdCollector from './collector/ClientIdCollector';
import ConversionCollector from './collector/ConversionCollector';
import DeviceTypeCollector from './collector/DeviceTypeCollector';
import ErrorCollector from './collector/ErrorCollector';
import EventActionCollector from './collector/EventActionCollector';
import EventTypeCollector from './collector/EventTypeCollector';
import IdCollector from './collector/IdCollector';
import StopJourneyActionCollector from './collector/StopJourneyActionCollector';
import NavigationTimingCollector from './collector/NavigationTimingCollector';
import SpaTimingCollector from './collector/SpaTimingCollector';
import UriWithCustomCategoryCollector from './collector/UriWithCustomCategoryCollector';
import UriWithPageTitleCategoryCollector from './collector/UriWithPageTitleCategoryCollector';
import SoftwareCollector from './collector/SoftwareCollector';
import HardwareCollector from './collector/HardwareCollector';
import WebBackEndCollector from './collector/WebBackEndCollector';
import WebPageLoadTimesCollector from './collector/WebPageLoadTimesCollector';
import WebPaintTimesCollector from './collector/WebPaintTimesCollector';
import WebVitalsCollector from './collector/WebVitalsCollector';

const collector = {
  defaultCollectors,
  webFocusedCollectors,
  ClientIdCollector,
  ConversionCollector,
  DeviceTypeCollector,
  ErrorCollector,
  EventActionCollector,
  EventTypeCollector,
  IdCollector,
  StopJourneyActionCollector,
  NavigationTimingCollector,
  SpaTimingCollector,
  UriWithCustomCategoryCollector,
  UriWithPageTitleCategoryCollector,
  SoftwareCollector,
  HardwareCollector,
  WebBackEndCollector,
  WebPageLoadTimesCollector,
  WebPaintTimesCollector,
  WebVitalsCollector
};

export {
  Producer,
  Transport,
  EVENT_TYPE,
  EVENT_ACTION,
  JOURNEY_ACTION,
  collector,
  TriggerHelper,
  VERSION
};
