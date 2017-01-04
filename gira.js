#!/usr/bin/env node

var yargs = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('on [outlet]', 'Power on outlets')
  .command('off [outlet]', 'Power off outlets')
  .demandCommand(1, 'No argument given. Make sure to provide a valid sub-command!'),
  argv = yargs.argv,
  command = argv._[0];

if (command === 'on') {
  yargs.reset()
    .usage('$0 on')
    .help('h')
    .example('$0 on', 'Turn on all the configured outlets')
    .example('$0 on 13', 'Turn on only outlet "13"')
    .argv;
} else if (command === 'off'){
  yargs.reset()
    .usage('$0 world')
    .help('h')
    .example('$0 off', 'Turn off all the configured outlets')
    .example('$0 off 13', 'Turn off only outlet "13"')
    .argv;
} else {
  yargs.showHelp();
}
