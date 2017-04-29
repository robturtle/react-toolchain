const debug = require('debug')('tools:runner');

async function run(task, options) {
  debug(`Starting ${task.name}`);
  console.time(task.name);
  try {
    await task(options);
  } catch (err) {
    console.error(err);
  }
  debug(`Finished ${task.name}`);
  console.timeEnd(task.name);
}

if (process.mainModule.children.length === 0 && process.argv.length > 2) {
  delete require.cache[__filename];
  const module = require(`./${process.argv[2]}.js`).default;
  run(module).catch(err => console.error(err.stack));
}
