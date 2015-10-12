GiraHelper
==========

Bash script to control a Gira home server

## Features

* Turn on/off array of Gira power outlets
* Configurable

## Requirements

* [terminal-notifier](https://github.com/alloy/terminal-notifier):

```shell
brew install terminal-notifier
```

## Installation

```shell
git clone https://github.com/frdmn/GiraHelper.git
cp GiraHelper/gira /usr/local/bin/
cp GiraHelper/gira.conf ~/.gira.conf
```

Last but not least, adjust the configuration file with:

```shell
editor ~/.gira.conf
```

## Screenshots

### Command line interface

![cli](http://static.yeahwh.at/plugins/GiraHelper/1_cli.png)
