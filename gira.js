#!/usr/bin/env node

var fs = require('fs')
    , notifier = require('node-notifier')
    , path = require('path')
    , prettyjson = require('prettyjson')
    , request = require('request');

/**
 * Function to decide if all outlets
 * or a specific one should be triggered
 * @param  {Array} config
 * @param  {String} command
 * @param  {Outlet} outlet  (optional)
 * @return {Bool}
 */
function controlHomeServer(config, command, outlet){
  // If outlet exists, only control a single one
  if (outlet) {
    sendStateToHomeServer(config, command, outlet);
  } else {
    // Otherwise, control all configured
    for(var outlet in config.outlets){
      outlet = config.outlets[outlet];
      sendStateToHomeServer(config, command, outlet);
    }
  }

  return true;
}

/**
 * Function to send a specifc state to a
 * specific outlet
 * @param  {Array} config
 * @param  {String} command
 * @param  {Outlet} outlet  (optional)
 * @return {Bool}
 */
function sendStateToHomeServer(config, command, outlet){
  // Translate state into "mother tounge" of home server
  var state = (command == 'on' ? 'ein' : 'aus');
  // Construct URL
  var url = config.server + '/' + config.office + 'licht0' + outlet + state;

  // Fire actual request
  request
    .get(url)
    .on('error', function(err) {
      var notifierObject = {
        'title': 'giraCLI'
      };

      // Make sure to ignore the "socket hang up" messages, since their HTTP implemention sucks
      if (err.code === 'ECONNRESET') {
        notifierObject.message = 'Successfully trigger outlet "' + config.office + ':' + outlet + '"';
        notifier.notify(notifierObject);
        console.log(notifierObject.message);
        return true;
      } else {
        notifierObject.message = 'Failed to trigger outlet "' + config.office + ':' + outlet + '"';
        notifier.notify(notifierObject);
        console.log(notifierObject.message);
        return false;
      }
    });
}

// Check if configuration file exists
if (!fs.existsSync(path.join(process.env.HOME, '.gira.json'))) {
  console.log('Error')
} else {
  // Load configuration into variable
  var config = require(path.join(process.env.HOME, '.gira.json'));
}

// Initiate argument parser
var yargs = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('config', 'Print configuration')
  .command('on [outlet]', 'Power on outlets')
  .command('off [outlet]', 'Power off outlets')
  .demandCommand(1, 'No argument given. Make sure to provide a valid sub-command!')
  .alias('v', 'version')
  .version(function() { return require('./package').version; })
  .describe('v', 'show version information'),
  argv = yargs.argv,
  command = argv._[0];

// Process sub commands
if (command === 'config') {
  yargs.reset()
    .usage('$0 config')
    .help('h')
    .example('$0 config', 'Print loaded configuration')
    .argv;

  // Print current configuration
  console.log(prettyjson.render(config));
} else if (command === 'on') {
  yargs.reset()
    .usage('$0 on')
    .help('h')
    .example('$0 on', 'Turn on all the configured outlets')
    .example('$0 on 13', 'Turn on only outlet #13')
    .argv;

    // Store possible outlet in variable
    var outlet = yargs.argv._[1];
    // Call function to control the home server
    controlHomeServer(config, command, outlet);
} else if (command === 'off'){
  yargs.reset()
    .usage('$0 world')
    .help('h')
    .example('$0 off', 'Turn off all the configured outlets')
    .example('$0 off 13', 'Turn off only outlet #13')
    .argv;

    // Store possible outlet in variable
    var outlet = yargs.argv._[1];
    // Call function to control the home server
    controlHomeServer(config, command, outlet);
} else {
  yargs.showHelp();
}
