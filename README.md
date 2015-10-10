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
git clone http://git.frd.mn/iWelt/gira-helper.git
cp gira-helper/gira /usr/local/bin/
cp gira-helper/.gira.conf ~/
```

Last but not least, adjust the configuration file with:

```shell
editor ~/.gira.conf
```

## Screenshots

#### Command line interface

![cli](http://static.yeahwh.at/plugins/GiraHelper/1_cli.png)

#### Configuration

![conf](http://static.yeahwh.at/plugins/GiraHelper/2_conf.png)
