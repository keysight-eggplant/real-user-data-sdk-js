import Producer from './core/Producer.js';
import Bootstrapper from './core/Bootstrapper.js';
import Transport from './core/Transport.js';
import TriggerHelper from './core/Trigger.helper.js';
import NormalizationHelper from './core/Normalization.helper.js';
import {
  EVENT_TYPE,
  EVENT_ACTION,
  JOURNEY_ACTION,
  TARGETED_DATA,
  TARGET_SEARCH_MODES
} from './core/constants.js';
import VERSION from './core/version.constant.js';
import defaultCollectors from './collector/defaultCollectors.js';
import webFocusedCollectors from './collector/webFocusedCollectors.js';
import ClientIdCollector from './collector/ClientIdCollector.js';
import ConversionCollector from './collector/ConversionCollector.js';
import DeviceTypeCollector from './collector/DeviceTypeCollector.js';
import ErrorCollector from './collector/ErrorCollector.js';
import EventActionCollector from './collector/EventActionCollector.js';
import EventTypeCollector from './collector/EventTypeCollector.js';
import IdCollector from './collector/IdCollector.js';
import StopJourneyActionCollector from './collector/StopJourneyActionCollector.js';
import NavigationTimingCollector from './collector/NavigationTimingCollector.js';
import SpaTimingCollector from './collector/SpaTimingCollector.js';
import UriWithCustomCategoryCollector from './collector/UriWithCustomCategoryCollector.js';
import UriWithPageTitleCategoryCollector from './collector/UriWithPageTitleCategoryCollector.js';
import SoftwareCollector from './collector/SoftwareCollector.js';
import HardwareCollector from './collector/HardwareCollector.js';
import WebBackEndCollector from './collector/WebBackEndCollector.js';
import WebPageLoadTimesCollector from './collector/WebPageLoadTimesCollector.js';
import WebPaintTimesCollector from './collector/WebPaintTimesCollector.js';
import WebVitalsCollector from './collector/WebVitalsCollector.js';
import InstrumentationVersionCollector from './collector/InstrumentationVersionCollector.js';
import UserAgentCollector from './collector/UserAgentCollector.js';

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
  WebVitalsCollector,
  InstrumentationVersionCollector,
  UserAgentCollector
};

export {
  Producer,
  Bootstrapper,
  Transport,
  EVENT_TYPE,
  EVENT_ACTION,
  JOURNEY_ACTION,
  TARGETED_DATA,
  TARGET_SEARCH_MODES,
  VERSION,
  collector,
  TriggerHelper,
  NormalizationHelper
};

/** Trigger an custom event to signal that the CORE was loaded successfully */
/** Registering the new event constructor */
const eventName = 'RCICoreReady';
const RCICoreReadyEvent = new Event(eventName);

/** Dispatch the event and assign the event as a property for non event driven approach */
window.dispatchEvent(RCICoreReadyEvent);
window[eventName] = true;
