# Overview

`rest-mochad` is a simple REST API for [mochad](http://sourceforge.net/projects/mochad/). Mochad is a command-line utility for interfacing with X10 controllers like the CM15A/CM15Pro and CM19A to control X10 modules.

# Installation

These instructions are written for a Raspberry Pi but the process should be more or less the same for any UNIX based operating system.

1. Install [mochad](http://sourceforge.net/projects/mochad/)
    
    $ sudo apt-get install libusb-1.0-0-dev
    $ wget -O mochad.tgz http://sourceforge.net/projects/mochad/files/latest/download
    $ tar xf mochad.tgz
    $ cd mochad*
    $ ./configure
    $ make
    $ sudo make install

2. Install node dependencies

    $ npm install

# Usage

This spawns a server running on port 3000.

    $ node app.js
