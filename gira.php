#!/usr/bin/env php
<?php

// Load configuration
$config = @json_decode(@file_get_contents($_SERVER['HOME'].'/.gira.json'));
$error = null;
$argvv = $argv;

function printAndExit($msg){
  echo '[Error] '.$msg;
  exit(1);
}

function sendStateToHomeserver($outlet, $state){
  global $argv, $config;
  // Read desired state from argv
  $state = (strtolower($argv[1]) == 'on' ? 'ein' : 'aus');

  // Announce state change
  echo "Trigger outlet '".$config->office.":0".$outlet." (".$state.")'...\n";

  // Control outlet using HTTP/curl
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $config->server.'/'.$config->office.'licht0'.$outlet.$state);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  $output = curl_exec($ch);
  curl_close($ch);
}

// Make sure configuration file exists
if (!$config) {
  printAndExit('No configuration file ~/.gira.json found');
}

// Make sure argv exists
if (!isset($argv[1])) {
  printAndExit("No argument given");
}

// Check if config should be printed
if ($argv[1] == "config") {
  echo 'Server: '.$config->server."\n";
  echo 'Office: '.$config->office."\n";
  echo 'Outlets:'."\n";
  foreach ($config->outlets as $outlet) {
    echo ' - '.$config->office.':0'.$outlet."\n";
  }
  exit(0);
}

// Check if special outlet is triggered
if (isset($argv[2])) {
  $outlet = $argv[2];
  exit(0);
}

// Otherwise toggle any outlet, configured in config file
foreach ($config->outlets as $outlet) {
  sendStateToHomeserver($outlet, $argv[1]);
}

// Exit without errors
exit(0);
