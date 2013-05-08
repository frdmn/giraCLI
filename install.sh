#!/bin/bash
# GiraHelper v1 installation
# Copyright (C) 2013 Jonas Friedmann

# Check for ~/.gira.cfg
echo "Check for '/Applications/terminal-notifier.app ...'"
if [ -d /Applications/terminal-notifier.app ]
then
    echo "... It appears that /Applications/terminal-notifier.app is already installed."
else
	echo "... '/Applications/terminal-notifier.app' successfully installed."
	cp -R ./deps/terminal-notifier.app /Applications/
fi

# Check for ~/.gira.cfg
echo "Check for '$HOME/.gira.cfg ...'"
if [ -f $HOME/.gira.cfg ]
then
    echo "... It appears that '$HOME/.gira.cfg' is already moved."
else
	echo "... '/Applications/terminal-notifier.app' successfully installed."
	cp -R ./gira.cfg $HOME/.gira.cfg
fi

# Move actuall shell script
echo "Check for '$HOME/.bin/gira ...'"
if [ -f $HOME/.bin/gira ]
then
    echo "... It appears that '$HOME/.bin/gira' is already moved."
else
	echo "... '$HOME/.bin/gira' successfully installed."
	mkdir -p $HOME/.bin
	cp -R ./gira $HOME/.bin/gira
fi

# Add alias to preferd shell rc file
echo "Check type of used shell ...'"
if [ -f $HOME/.zshrc ]
then
    echo "... It appears that you use the like and love 'zsh'."
    echo "Check if '.zshrc' already contains alias for gira binary ..."
    if [[ -n $(grep gira $HOME/.zshrc) ]]
    then
    	echo "... already installed"
    else
    	echo "alias gira=\"$HOME/.bin/gira\"" >> $HOME/.zshrc
    	echo "... successfully installed"
    fi
else
	echo "... It appears that you use the default 'bash'."
	if [[ -n $(grep gira $HOME/.bashrc) ]]
    then
    	echo "... already installed"
    else
    	echo "alias gira=\"$HOME/.bin/gira\"" >> $HOME/.bashrc
    	echo "... successfully installed"
    fi
fi

# Move binary helper executables to Desktop
echo "Check for '$HOME/Desktop/on.app' ..."
if [ -d $HOME/Desktop/on.app ]
then
    echo "... It appears that '$HOME/Desktop/on.app' is already moved."
else
    echo "... '$HOME/Desktop/on.app' and '$HOME/Desktop/off.app' successfully installed."
    cp -R ./bin/*.app $HOME/Desktop/
fi