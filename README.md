# Real User Data SDK
SDK for generating and publishing events that capture user, application and technical data

### TODO list

- [ ] update NPM packge in installation and npm badge
- [ ] update uglified file size in badges
- [ ] update link to CDN in installation section
- [ ] Update the browser support list
- [ ] Verify all links

<p align="center"><img src="https://static1.squarespace.com/static/5a123416bce176a964daebe5/t/5aa18123c83025fedf718a51/1554300899717/?format=1500w"></p>

[![](https://flat.badgen.net/npm/v/@editorjs/editorjs?icon=npm)](https://www.npmjs.com/package/@editorjs/editorjs)
[![](https://flat.badgen.net/bundlephobia/min/@editorjs/editorjs?color=cyan)](https://www.npmjs.com/package/@editorjs/editorjs)
[![](https://flat.badgen.net/bundlephobia/minzip/@editorjs/editorjs?color=green)](https://www.npmjs.com/package/@editorjs/editorjs)
[![](https://flat.badgen.net/npm/license/@editorjs/editorjs)](https://www.npmjs.com/package/@editorjs/editorjs)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/TestPlant/real-user-data-sdk-js/pulls)

## Version 1.0 is here!

We are glad to introduce the first version of **RCI - Real User Data SDK**.

### Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge 14+ | Firefox 54+ | Chrome 58+ | Safari 10+ | Safari ?? | Opera 55+

## Documentation

While we develop the new Documentation Site with all stuff, you can check some available docs here in this page and [Api Documentation](https://docs.real-user-data.eggplant.cloud/open-api/index.html).

---

# So how to use *Real User Data SDK*
Add the `dist/rci.min.js` script to your website via *local javascript file*, *CDN*, *NPM package* or *GTM* and you are ready to go.

You can always checkout this repository and look at the [example directory](example/)

## Ecommerce with coversion

- [Link to example](examples/Vanilla/Conversion/) Use this example as starting point if you are going to collect data for converting currency *A* to currency *B*

## Custom collector

- [Link to example](examples/Vanilla/CustomCollector/) Use this example as starting point if you are going to collect custome data.

## Error collector

- [Link to example](examples/Vanilla/Error/) Use this example as starting point if you are going to collect data when an error accure in you website and you are going to collect it.

## DOM content collector

- [Link to example](examples/Vanilla/DOMContentLoaded/) Use this example as starting point if you are going to collect data when DOM content loaded.


# Installation Guide

### Node.js

Install the package via NPM or Yarn

```shell
npm i rci-real-data-xxx
```

Include module in your application

```javascript
const RCI- = require('rci-xxx');
```

### Use from CDN

You can load specific version of package from [AWS CDN](https://link-to-cdn).

`https://link-to-cdn`

Then require this script.

```html
<script src="..."></script>
```

### Save sources to project

Copy [dist/rci.min.js](dist/rci.min.js) file to your project and load it.

```html
<script src="rci.min.js"></script>
```

## Contributing

The main purpose of this repository is to continue to evolve *rci event collector*, making it faster and easier to use. Development of this SDK happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

### Code of Conduct

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Contributors

- [Artur Chamier](https://github.com/yghern)
- [Ash Vincent](https://github.com/ashvince)
- [MoHo Khaleqi](https://github.com/mohokh67)
- [Malcolm Smith](https://github.com/MalcolmSmithUK)
- [Robert Dumitrescu](https://github.com/robertdumitrescu)


## Questions

For questions and support please use [the official contact us page](https://eggplant.io/about/contact-us).

## Issues

Please make sure to read the [bug_report.md](bug_report.md) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/TestPlant/real-user-data-sdk-js/releases).

## License

Real User Data SDK is open source software and [MIT](http://opensource.org/licenses/MIT) licensed.
