# Real User Data SDK

SDK for generating and publishing events that capture user, application and technical data

### TODO list

- [ ] update NPM package in installation and npm badge
- [ ] update uglified file size in badges
- [ ] update link to CDN in installation section
- [ ] update the browser support list
- [ ] prepare release note for 1.0.0
- [ ] verify all links

<p align="center"><img src="https://static1.squarespace.com/static/5a123416bce176a964daebe5/t/5aa18123c83025fedf718a51/1554300899717/?format=1500w"></p>

[![](https://flat.badgen.net/npm/v/@editorjs/editorjs?icon=npm)](https://www.npmjs.com/package/@editorjs/editorjs)
[![](https://flat.badgen.net/bundlephobia/min/@editorjs/editorjs?color=cyan)](https://www.npmjs.com/package/@editorjs/editorjs)
[![](https://flat.badgen.net/bundlephobia/minzip/@editorjs/editorjs?color=green)](https://www.npmjs.com/package/@editorjs/editorjs)
[![](https://flat.badgen.net/badge/license/MIT/blue)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/TestPlant/real-user-data-sdk-js/pulls)

## Version 1.0.0 is here!

We are glad to introduce the first version of **RCI - Real User Data SDK**.

### Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge 14+                                                                                                                                                                                                        | Firefox 54+                                                                                                                                                                                                       | Chrome 58+                                                                                                                                                                                                    | Safari 10+                                                                                                                                                                                                    | Safari ??                                                                                                                                                                                                                     | Opera 55+                                                                                                                                                                                                 |

## Documentation

Please see the SDK documentation and examples below. You can also see the [REST Api Documentation](https://docs.real-user-data.eggplant.cloud/open-api/index.html) for more details about what can be captured.

---

# So how to use _Real User Data SDK_

Add the `dist/rci.min.js` script to your website via _local javascript file_, _CDN_, _NPM package_ or _GTM_ and you are ready to go.

You can always checkout this repository and look at the [example directory](example/)

## E-Commerce with conversion

- Use [this example](examples/Vanilla/Conversion/) as starting point if you are going to collect data about converting User Journeys.

## Custom collector

- Use [this example](examples/Vanilla/CustomCollector/) as starting point if you are going to collect custom data.

## Error collector

- Use [this example](examples/Vanilla/Error/) as starting point if you are going to collect data when an error occurs in your website.

## DOM content collector

- Use [this example](examples/Vanilla/DOMContentLoaded/) as starting point if you are going to collect data when DOM content is loaded.

# Installation Guide

### Node.js

Install the package via NPM or Yarn

```shell
npm install rci-real-user-data-sdk-js
```

Include module in your application

```javascript
const RCI = require("rci-real-user-data-sdk-js");
```

### Use from CDN

You can load specific version of package from [AWS CDN](https://aws.amazon.com/cloudfront/).
Then include this script in your page code.

```html
<script src="https://aws.link-to-cdn.com/rci.min.js"></script>
```

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

## Transport

A `class` which knows how to send the event to the target destination when the `async` method `execute` is called.

## defaultCollection

The default collection (`array`) of `Collectors` provided by the SDK. New `Collectors` can be merged with the default `Collectors` to compose unique sequences.

## Contributing

The main purpose of this repository is to continue to evolve _rci event collector_, making it faster and easier to use. Development of this SDK happens in the open on GitHub, and we are grateful to the community for [contributing bugfixes and improvements](TEMPLATE_PULL_REQUEST.md), [raising issues](TEMPLATE_BUG_REPORT.md) and [suggesting new features](TEMPLATE_FEATURE_REQUEST.md). Read below to learn how you can take part in it.

### Code of Conduct

This SDK has adopted a [Code of Conduct](CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the the full text so that you can understand what actions will and will not be tolerated.

## Contributors

- [Artur Chamier](https://github.com/yghern)
- [Ash Vincent](https://github.com/ashvince)
- [Malcolm Smith](https://github.com/MalcolmSmithUK)
- [MoHo Khaleqi](https://github.com/mohokh67)
- [Robert Dumitrescu](https://github.com/robertdumitrescu)

## Questions

For questions and support please use the official [contact us](https://eggplant.io/about/contact-us) page.

## Issues

Please make sure to read the [existing issues](https://github.com/TestPlant/real-user-data-sdk-js/issues) and [issue template](TEMPLATE_BUG_REPORT.md) before opening a new one. Issues not conforming to the guidelines may be closed immediately.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/TestPlant/real-user-data-sdk-js/releases).

## License

Real User Data SDK is open source software and [MIT](http://opensource.org/licenses/MIT) licensed.
