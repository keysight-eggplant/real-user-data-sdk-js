import express from 'express';
import cors from 'cors';
import fs from 'fs';
import webpack from 'webpack';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import yargs from 'yargs';
import { WebpackWrapper } from '../config/webpack.js';

const currentDirname = dirname(fileURLToPath(import.meta.url));

class GenericTestHelper {

  static async waitUntil(f, timeout, frequency) {

    return new Promise((promiseResolve, promiseReject) => {
      const timeWas = new Date();
      const wait = setInterval(() => {
        if (f()) {
          console.log('resolved after', new Date() - timeWas, 'ms');
          clearInterval(wait);
          promiseResolve();
        } else if (new Date() - timeWas > timeout) { // Timeout
          console.log('rejected after', new Date() - timeWas, 'ms');
          clearInterval(wait);
          promiseReject();
        }
      }, frequency);
    });
  }

  /**
     *
     * @param {TestServerConfig} config
     * @returns
     */
  static async startServer(config) {
    const app = express();

    app.use(cors());

    app.post('/v1/:tenancyId/stream', (req, res) => {
      console.log(`Requested: ${req.path} - Method: ${req.method} - TenancyId: ${req.params.tenancyId}`);
      res.send('Hello World!');
    });

    app.get('/*', async (req, res) => {
      const path = resolve(currentDirname, `..${req.path}`);
      console.log(`Requested: ${req.path} Served: ${path} Exists: ${fs.existsSync(path)}`);
      res.sendFile(path);
    });

    const server = app.listen(config.port, () => {

      const host = server.address().address;
      const { port } = server.address();

      console.log(`Started at : ${new Date().toUTCString()}! Listening at: http://${host}:${port}`);

      app.emit('ready');
    });

    config.startedServers.push(server);

    return new Promise((promiseResolve) => {
      app.on('ready', () => {
        promiseResolve(server);
      });
    });

  }

  static async stopServers(serversArray) {
    for (let ssi = 0; ssi < serversArray.length; ssi++) {

      const host = serversArray[ssi].address().address;
      const { port } = serversArray[ssi].address();

      console.log(`Closing server at : http://${host}:${port}`);

      serversArray[ssi].close();
    }
  }

  /**
     * @param {RCIWebpackConfig} config
     */
  static webpack(config) {

    return new Promise((promiseResolve, promiseReject) => {

      const compiler = webpack(WebpackWrapper.provisionWebpack(config));

      compiler.run((err, stats) => { // [Stats Object](#stats-object)

        if (err || stats.hasErrors()) {
          console.log(err);
          promiseReject(err);
        } else {
          console.log(stats.stats.toString());
          promiseResolve(stats);
        }

      });
    });
  }

}

export default GenericTestHelper;

if (resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {

  // It is being run directly from CLI

  yargs(process.argv.slice(2))
    .usage('Usage: node $0 <command> [options]')
    .version(false)
    .example('node ./config/webpack.js help')
    .example('node tests/genericTest.Helper.js --port 3001')
    .example('node tests/genericTest.Helper.js')
    .option('port', {
      alias: 'p',
      default: 3000,
      type: 'number',
      description: 'The port to run the server on'
    })
    .command({
      command: '$0',
      handler: (cliArguments) => {
        GenericTestHelper.startServer({port: cliArguments.port, startedServers: []});
      }
    })
    .epilog('All rights reserved, RCI Team')
    .parse();

}
