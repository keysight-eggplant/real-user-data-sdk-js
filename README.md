# Real User Data SDK
## Overview
The Real User Data SDK facilitates the collection of non-PII (Personally Identifiable Information) such as customer behaviour, device specifications, performance timing, software release versions, and business impact (revenue, conversion). This data is processed by our cloud-based platform to generate a modern class of aggregated data insights. In particular, these insights drive decision making and test automation within Eggplant's suite of AI-assisted end-to-end user testing known as Eggplant DAI. We refer to this process as CXO (Customer Experience Optimisation).

In order to instrument an application with this SDK you need to be aware of two components:
- Definition, - this SDK (this repository) which describes and consists of all the capabilities and ways to use/capture/collect/send data from web applications. See the "Installation Guide" below.
- Implementation - a different piece of code created by you that describes how the SDK should behave, collect and where to send the collected data. 

In order for the SDK to succesfully collect data, it is mandatory to have both components. Once you have both scripts and those are ready to be deployed, you can simply add them to your website, either in the **< head >** tag, at the end of the **< body >** tag or within a tag manager like [Google Tag manager](https://tagmanager.google.com/), [Tealium](https://tealium.com/) etc.

If you are not using a tag manager, someone technical need to manually deploy the tags into your web application. If you don't want to monitor certain pages, simply do not deploy the tags on those pages. Deploying this SDK is similar in nature with deploying any other monitoring SDK on the market such as Google Analytics, Pingdom etc.

Once the tags are deployed, the SDK will start monitoring, collecting and sending data according to your implementation.

<p align="center"><img src="https://static1.squarespace.com/static/5a123416bce176a964daebe5/t/5aa18123c83025fedf718a51/1554300899717/?format=1500w"></p>

[![](https://flat.badgen.net/npm/v/@eggplantio/real-user-data-sdk-js?icon=npm)](https://www.npmjs.com/package/@eggplantio/real-user-data-sdk-js)
[![](https://flat.badgen.net/bundlephobia/min/@eggplantio/real-user-data-sdk-js?color=cyan)](https://bundlephobia.com/result?p=@eggplantio/real-user-data-sdk-js)
[![](https://flat.badgen.net/bundlephobia/minzip/@eggplantio/real-user-data-sdk-js?color=green)](https://bundlephobia.com/result?p=@eggplantio/real-user-data-sdk-js)
[![](https://flat.badgen.net/badge/license/MIT/blue)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/TestPlant/real-user-data-sdk-js/pulls)

## New version is here!

We are glad to introduce the newest version of **RCI - Real User Data SDK**.

### Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

The browsers stated in the table above are the ones that we tested on but is not an exhaustive representation of our SDK browser compatibility.

Generally speaking, we are supporting the last 2 versions for all the popular browsers for the current bundle (the default artefact) and IE 11 and everything since then till present via the legacy bundle.

## Documentation

Please see the SDK documentation and examples below. You can also see the [REST Api Documentation](https://docs.real-user-data.eggplant.cloud/open-api/index.html) for more details about what can be captured.

---

# So how to use _Real User Data SDK_

Compile the source code using webpack
```
webpack --config=config/webpack.js --env=scope=core --env=rulesTarget=current --env=mode=production
```

Add the `dist/rci.min.js` script to your website via _local javascript file_, _CDN_, _NPM package_ or _GTM_ and you are ready to go.

You can always checkout this repository and look at the [examples directory](examples/).

## E-Commerce with conversion

- Use [this example](examples/Vanilla/Conversion/) as starting point if you are going to collect data about converting User Journeys.

## Custom collector

- Use [this example](examples/Vanilla/CustomCollector/) as starting point if you are going to collect custom data.

## Error collector

- Use [this example](examples/Vanilla/Error/) as starting point if you are going to collect data when an error occurs in your website.

## OnLoad collector

- Use [this example](examples/Vanilla/OnLoad/) as starting point if you are going to collect data after page loads.

## Web-based collector

- Use [this example](examples/Vanilla/WebBasedCollectors/) as starting point if you are going to collect data from webpages

## Example with React

- Use [this example](examples/with-react/) as starting point if you are going to collect data when you have a react.js project.

# Installation Guide

### npm package

Install the package via NPM or Yarn

```shell
npm i @eggplantio/real-user-data-sdk-js
```

Include module in your application as ES6 module

```javascript
import * as rciSdk from '@eggplantio/real-user-data-sdk-js';
```

### Use from CDN

You can load specific version of package from [AWS CDN](https://aws.amazon.com/cloudfront/).
Then include this script in your page code.

You can use our latest tag to be always up to date with our last version of real-user-data-sdk library.

```html
<script src="https://sdk.real-user-data.eggplant.cloud/latest/rci.min.js"></script>
```

Or if you want to stick with a certain version you can bind to a specific version by using the following code:

```html
<script src="https://sdk.real-user-data.eggplant.cloud/v1.0.8/rci.min.js"></script>
```

Where ```v1.0.8``` is the version of your choosing.

### Save sources to project

Copy [dist/rci.min.js](dist/rci.min.js) file to your project and load it.

```html
<script src="rci.min.js"></script>
```

# JS SDK

## Producer

A producer is a `class` which executes all the `Collectors` provided. It expects a `Transport` and collection of `Collectors`. When `collect` is called, the event is prepared and then sent using the `Transport`.

## Collectors

A `function`, `object` or `class` with an `async` prepare method. The prepare method is given an `event` and is expected to return an augmented `event`.

#### Default Collectors

The default collection (`array`) of `Collectors` provided by the SDK. New `Collectors` can be merged with the default `Collectors` to compose unique sequences of collection.

#### Web Based Collectors

You can use the web focused collectors in 2 manners:

- either one by one 
- either using the web focused collectors collection

##### Using it one by one
This is particularly useful if you want to choose only certain collectors that you might need for your custom implementation.

So to achieve the integration with the web collectors you can do something like this before calling the RCI SDK bootstrap method with the collectors array.

```javascript
  // Step 1: Capture your default collectors
  const defaults = rciSdk.collector.defaultCollectors;

  // Step 2: Capture WebFocusedCollectors
  const webFocusedCollectors =
      [
        new rciSdk.collector.WebBackEndCollector(),
        new rciSdk.collector.WebPageLoadTimesCollector(),
        new rciSdk.collector.WebVitalsCollector()
      ];

  // Step 3: Create the final collectors collection
  const finalCollectorCollection = defaults.concat(webFocusedCollectors);
```

Note that the ```WebPaintTimesCollector``` was left out on purpose to exemplify the flexibility of this method of adding the web focused collectors.


##### Using the web collectors collection

If you want to just get the full web focused package you can just the use the pre-existing collectors collection prepared within the framework. Keep in mind that is mainly for convenience but is sacrificing the flexibility factor.

To do so you can have this code before injecting the array of collectors into the bootstrapper.

```javascript
  // Step 1: Capture your default collectors
  const defaults = rciSdk.collector.defaultCollectors;

  // Step 2: Capture WebFocusedCollectors
  const {webFocusedCollectors} = rciSdk.collector;

  // Step 3: Create the final collectors collection
  const finalCollectorCollection = defaults.concat(webFocusedCollectors);
```

## Normalization Helper
### Normalizing currency values
A goal value normalized is offered via our Normalization Helper. Be aware that this will only work if your goal type is of the type "purchase".
If the value you want to send to the cloud is directly in the main currency unit like EUR, GBP, USD and so on, you can normalize it by calling the method like this:

```javascript
NormalizationHelper.normalizeGoalValue(948.34);
// output: 94834
```

If your value is directly in pence, cents and so on, you can set the fullUnit flag on false and the value will be left as is and the denominations will be cut

```javascript
NormalizationHelper.normalizeGoalValue(948.34, false);
// output: 948
```

## Transport

A `class` which knows how to send the event to the target destination when the `async` method `execute` is called.

## Triggering mechanism
There are 2 ways in which you can trigger events which should be judged case by case.

### Data based case

The first case is when your event is dependant on some data being populated. For this particular case we prepared a TriggerHelper class which will check your required data till it gets populated and then when it has everything it will trigger an event. It is basically a glorified for loop with timeouts.

The use of this is detailed in ```/examples/Vanilla/OnLoad/conversion.js```. It basically accepts the following

- interval (How often it should check for changes in data)
- timeout (When it should timeout. E.g If you have interval set to 10 and timeout set to 1000, the condition will be checked 100 times and then the event will be sent anyway with whatever data has in place)
- producer - the class instance that has the "collect" meethod ready to be triggered
- event (Optional) - this is in case you want to collect any data from a particular event (If it is triggered from an event)
- condition - Reference of the function that checks for the data
- action - Reference of the function that performs the sending of event action

### Event based case

When the core is loaded successfully, an event is triggered on the ```window``` object that the implementer or the instrumentation can bind on when the instrumentation is bootstrapped. 
Also an additional property with the name of the same event is set on the ```window``` object in order for the instrumentation to not wait for the core to emit if the core is already present on the page

This can be used in the following manner:

```javascript
if (window.hasOwnProperty('RCICoreReady')) {
    // Trigger the RCI instrumentation bootstrap process straight away
} else {
    // Bind on event and wait for dispatch 
    window.addEventListener("RCICoreReady", function(e) {
         // Trigger the RCI instrumentation when the event is emitted
    });
}
```


## Support IE 11 and older phones
To support IE11 you need to compile source in legacy mode.
```
webpack --config=config/webpack.js --env=scope=core --env=rulesTarget=legacy --env=mode=production
```
`current` build supports last 2 most recent versions of browsers, while `legacy` aim to support all browsers up to IE11 while maintaining same functionality. The difference in result files are 25kB (current) vs 50kB (legacy).

## Contributing

The main purpose of this repository is to continue to evolve _rci event collector_, making it faster and easier to use. Development of this SDK happens in the open on GitHub, and we are grateful to the community for [contributing bugfixes and improvements](.github/pull_request.md), [raising issues](.github/ISSUE_TEMPLATE/bug_report.md) and [suggesting new features](.github/ISSUE_TEMPLATE/feature_request.md). Read below to learn how you can take part in it.

#### Code of Conduct

This SDK has adopted a [Code of Conduct](CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the the full text so that you can understand what actions will and will not be tolerated.

## Contributors

- [Artur Chamier](https://github.com/yghern)
- [Ash Vincent](https://github.com/ashvince)
- [Ian Highet](https://github.com/Ian-Hi)
- [Malcolm Smith](https://github.com/MalcolmSmithUK)
- [MoHo Khaleqi](https://github.com/mohokh67)
- [Robert Dumitrescu](https://github.com/robertdumitrescu)

## Questions

For questions and support please use the official [contact us](https://eggplant.io/about/contact-us) page.

## Issues

Please make sure to read the [existing issues](https://github.com/TestPlant/real-user-data-sdk-js/issues) and [new issue template](.github/ISSUE_TEMPLATE/bug_report.md) before opening one. Issues not conforming to the guidelines may be closed immediately.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/TestPlant/real-user-data-sdk-js/releases).

## License

Real User Data SDK is open source software and licensed under the [MIT license](LICENSE)
