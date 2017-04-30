import path from 'path';
import chokidar from 'chokidar';
import { writeFile, copyFile, mkdir, copydir, cleandir } from './lib/fs';
import pkg from '../package.json';

const root = path.resolve(__dirname, '..');

async function copy() {
  await mkdir(path.resolve(root, 'dist'));
  await Promise.all([
    writeFile(path.resolve(root, 'dist/package.json'), JSON.stringify({
      private: true,
      engines: pkg.engines || {},
      dependencies: pkg.dependencies,
      scripts: {
        start: 'node server.js'
      }
    }, null, 2)),
    copydir(path.resolve(root, 'public'), path.resolve(root, 'dist/public'))
  ]);

  if (process.argv.includes('--watch')) {
    const watcher = chokidar.watch([
      path.resolve(root, 'public/**/*')
    ], { ignoreInitial: true });

    watcher.on('all', async (event, path) => {
      const name = `${event} ${path}`;
      console.time(name);
      const dir = path.dirname(path);
      const dst = path.resolve(root, 'dist', dir);
      switch (event) {
        case 'add':
        case 'change':
          await mkdir(path.dirname(dst));
          await copyFile(path, dst);
          break;
        case 'unlink':
        case 'unlinkDir':
          cleandir(dst, { nosort: true, dot: true });
          break;
        default:
          return;
      }
      console.timeEnd(name);
    });
  }
}

export default copy;
