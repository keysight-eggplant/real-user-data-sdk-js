const { Console } = require('console');
const fs = require('fs');

const bundleLocation = '/dist/';

const bundlesNames = [
  'rci.min.js',
  'rci-legacy.min.js'
];

const exampleLocation = '/examples/';
const examplesPaths = [
  'Dojo/',
  'ReactNative/',
  'Vanilla/Conversion/',
  'Vanilla/CustomCollector/',
  'Vanilla/Error/',
  'Vanilla/InstrumentationVersionCollector/',
  'Vanilla/OnLoad/',
  'Vanilla/WebBasedCollectors/',
  'Vanilla/WebBasedCollectorsCollection/',
  'with-react/public/'
];

let source; let
  destination;
console.log(__dirname);

for (let i = 0; i < examplesPaths.length; i++) {
  for (let j = 0; j < bundlesNames.length; j++) {
    source = `${__dirname}${bundleLocation}${bundlesNames[j]}`;
    destination = `${__dirname}${exampleLocation}${examplesPaths[i]}${bundlesNames[j]}`;

    try {
      fs.copyFileSync(source, destination);
      console.log(`Copying ${source} to ${destination} completed successfully`);
    } catch (e) {
      console.log(`Copying failed on ${source} -> ${destination}`);
    }
  }
}
