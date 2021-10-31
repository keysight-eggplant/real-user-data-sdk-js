import Producer from './core/Producer';
import ConfigurationService from './core/ConfigurationService';
import Transport from './core/Transport';
import TriggerHelper from './core/Trigger.helper';
import NormalizationHelper from './core/Normalization.helper';
import {
  EVENT_TYPE,
  EVENT_ACTION,
  JOURNEY_ACTION
} from './core/constants';
import VERSION from './core/version.constant';
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
import InstrumentationVersionCollector from './collector/InstrumentationVersionCollector';
import UserAgentCollector from './collector/UserAgentCollector';

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
  ConfigurationService,
  Transport,
  EVENT_TYPE,
  EVENT_ACTION,
  JOURNEY_ACTION,
  VERSION,
  collector,
  TriggerHelper,
  NormalizationHelper
};

/** Trigger an custom event to signal that the CORE was loaded successfully */
/** Registering the new event constructor */
const eventName = 'RCICoreReady';
const RCICoreReadyEvent = new Event(eventName);

// Setting a timeout for the library to be ready and available within window
setTimeout(() => {
  /** Dispatch the event and assign the event as a property for non event driven approach */
  window.dispatchEvent(RCICoreReadyEvent);
  window[eventName] = true;
}, 10);
