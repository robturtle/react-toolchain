import { fs } from 'mz';
import path from 'path';
import glob from 'glob';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

export const readFile = fs.readFile;
export const writeFile = fs.writeFile;

export const rename = fs.rename;

export const copyFile = (src, dst) => new Promise((resolve, reject) => {
  let callbackCalled = false;
  function done(err) {
    if (!callbackCalled) {
      callbackCalled = true;
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    }
  }

  const ins = fs.createReadStream(src);
  ins.on('error', done);
  const outs = fs.createWriteStream(dst);
  outs.on('error', done);
  outs.on('close', done);
  ins.pipe(outs);
});

export const readdir = async (pattern, options) => new Promise((resolve, reject) => 
  glob(pattern, options, (err, result) => (err ? reject(err) : resolve(result)))
);

export const mkdir = name => new Promise((resolve, reject) => 
  mkdirp(name, err => (err ? reject(err) : resolve()))
);

export const movedir = async (src, dst) => {
  const nodes = await readdir('**/*.*', {
    cwd: src,
    nosort: true,
    dot: true
  });
  await Promise.all(nodes.map(async (node) => {
    const from = path.resolve(src, node);
    const to = path.resolve(dst, node);
    await mkdir(path.dirname(to));
    await rename(from, to);
  }))
};

export const copydir = async (src, dst) => {
  const nodes = await readdir('**/*.*', {
    cwd: src,
    nosort: true,
    dot: true
  });
  await Promise.all(nodes.map(async node => {
    const from = path.resolve(src, node);
    const to = path.resolve(dst, node);
    await mkdir(path.dirname(to));
    await copyFile(from, to);
  }));
}

export const cleandir = (pattern, options) => new Promise((resolve, reject) => {
  rimraf(pattern, { glob: options }, (err, result) => (err ? reject(err) : resolve(result)));
});

export default {
  readFile,
  writeFile,
  rename,
  copyFile,
  readdir,
  mkdir,
  movedir,
  copydir,
  movedir,
  cleandir,
};