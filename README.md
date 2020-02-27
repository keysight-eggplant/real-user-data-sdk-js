# Real User Data SDK

SDK for generating and publishing events that capture user, application and technical data

<p align="center"><img src="https://static1.squarespace.com/static/5a123416bce176a964daebe5/t/5aa18123c83025fedf718a51/1554300899717/?format=1500w"></p>

[![](https://flat.badgen.net/npm/v/@eggplantio/real-user-data-sdk-js?icon=npm)](https://www.npmjs.com/package/@eggplantio/real-user-data-sdk-js)
[![](https://flat.badgen.net/bundlephobia/min/@eggplantio/real-user-data-sdk-js?color=cyan)](https://bundlephobia.com/result?p=@eggplantio/real-user-data-sdk-js)
[![](https://flat.badgen.net/bundlephobia/minzip/@eggplantio/real-user-data-sdk-js?color=green)](https://bundlephobia.com/result?p=@eggplantio/real-user-data-sdk-js)
[![](https://flat.badgen.net/badge/license/MIT/blue)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/TestPlant/real-user-data-sdk-js/pulls)

## New version is here!

We are glad to introduce the newest version of **RCI - Real User Data SDK**.

### Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung Internet" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge 16+                                                                                                                                                                                                        | Firefox 60+ / Firefox Mobile 57+                                                                                                                                                                                  | Chrome 61+ / Chrome Mobile 61+                                                                                                                                                                                | Safari 10+                                                                                                                                                                                                    | Safari 9+                                                                                                                                                                                                                     | Opera 48+ / Opera Mobile 46+                                                                                                                                                                              | Samsung Internet 7.2+                                                                                                                                                                              |

The browsers stated in the table above are the ones that we tested on but is not an exhaustive representation of our SDK browser compatibility.

## Documentation

Please see the SDK documentation and examples below. You can also see the [REST Api Documentation](https://docs.real-user-data.eggplant.cloud/open-api/index.html) for more details about what can be captured.

---

# So how to use _Real User Data SDK_

Add the `dist/rci.min.js` script to your website via _local javascript file_, _CDN_, _NPM package_ or _GTM_ and you are ready to go.

You can always checkout this repository and look at the [examples directory](examples/).

## E-Commerce with conversion

- Use [this example](examples/Vanilla/Conversion/) as starting point if you are going to collect data about converting User Journeys.

## Custom collector

- Use [this example](examples/Vanilla/CustomCollector/) as starting point if you are going to collect custom data.

## Error collector

- Use [this example](examples/Vanilla/Error/) as starting point if you are going to collect data when an error occurs in your website.

## DOM content collector

- Use [this example](examples/Vanilla/DOMContentLoaded/) as starting point if you are going to collect data when DOM content is loaded.

## OnLoad collector

- Use [this example](examples/Vanilla/OnLoad/) as starting point if you are going to collect data after page loads.

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

#### defaultCollectors

The default collection (`array`) of `Collectors` provided by the SDK. New `Collectors` can be merged with the default `Collectors` to compose unique sequences of collection.

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

This needs to be handled internally by the implementor and no further mechanisms are provided. Some of those are detailed in Examples/Vanilla and Examples/React folders.


## Support IE 11 and older phones
At the moment we don't support IE 11 as the file size will be 3x time bigger. However the solution is as follows:

Add `@babel/polyfill`
```bash
npm i @babel/polyfill
```

and add the following line in the first line of `./src/rci.js` file
```javascript
import '@babel/polyfill';
```

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
