import path from 'path';
import { spawn } from 'child_process';
import webpackConfig from '../webpack.config';

const SERVER_STARTED = /Server started on https?:\/\/(.*?)\//;

const debug = require('debug')('tools:server');

let server;
let pending = true;
const { output } = webpackConfig.find(c => c.target === 'node');
const serverPath = path.resolve(output.path, output.filename);

async function startServer() {
  return new Promise(resolve => {
    function onStdOut(data) {
      const msg = data.toString('utf8');
      debug(msg);
      const match = msg.match(SERVER_STARTED);
      if (match) {
        server.host = match[1];
        server.stdout.removeListener('data', onStdOut);
        server.stdout.on('data', d => debug(d.toString('utf8')));
        pending = false;
        resolve(server);
      }
    }

    if (server) {
      server.kill('SIGTERM');
    }

    server = spawn('node', [serverPath], {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false
    });

    if (pending) {
      server.once('exit', (code, signal) => {
        if (pending) {
          throw new Error(
            `Server terminated unexpectedly` +
            ` with code: ${code} signal: ${signal}`);
        }
      })
    }

    server.stdout.on('data', onStdOut);
    //server.stderr.on('data', process.stderr.write);

    return server;
  });
}

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

export default startServer;