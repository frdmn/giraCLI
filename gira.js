#!/usr/bin/env node

var fs = require('fs');
var prettyjson = require('prettyjson');
var path = require('path');

if (!fs.existsSync(path.join(process.env.HOME, '.gira.json'))) {
  console.log('Error')
}

var config = require(path.join(process.env.HOME, '.gira.json'));

var yargs = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('config', 'Print configuration')
  .command('on [outlet]', 'Power on outlets')
  .command('off [outlet]', 'Power off outlets')
  .demandCommand(1, 'No argument given. Make sure to provide a valid sub-command!'),
  argv = yargs.argv,
  command = argv._[0];

if (command === 'config') {
  yargs.reset()
    .usage('$0 config')
    .help('h')
    .example('$0 config', 'Print loaded configuration')
    .argv;

  console.log(prettyjson.render(config));
} else if (command === 'on') {
  yargs.reset()
    .usage('$0 on')
    .help('h')
    .example('$0 on', 'Turn on all the configured outlets')
    .example('$0 on 13', 'Turn on only outlet #13')
    .argv;
} else if (command === 'off'){
  yargs.reset()
    .usage('$0 world')
    .help('h')
    .example('$0 off', 'Turn off all the configured outlets')
    .example('$0 off 13', 'Turn off only outlet #13')
    .argv;
} else {
  yargs.showHelp();
}
