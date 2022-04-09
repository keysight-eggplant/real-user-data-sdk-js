import express from 'express';
import cors from 'cors';
import fs from 'fs';
import webpack from 'webpack';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { WebpackWrapper } from '../config/webpack.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
      console.log(req.params.tenancyId);
      res.send('Hello World!');
    });

    app.get('/*', async (req, res) => {
      const path = resolve(__dirname, `..${req.path}`);
      console.log(`Requested: ${req.path} Served: ${path} Exists: ${fs.existsSync(path)}`);
      res.sendFile(path);
    });

    const server = app.listen(config.port, () => {

      const host = server.address().address;
      const { port } = server.address();

      console.log(`Starting! Listening at : http://${host}:${port}`);
      console.log(`Started at : ${new Date().toUTCString()}`);

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
