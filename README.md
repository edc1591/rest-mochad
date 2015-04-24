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

## API

    PUT /x10/{device}/power/{command}
    
Sets the power state of a device.

**Params:**

* `device` *(Required)* The house code and ID of the device. For example, `C2`.
* `command` *(Required)* The power command to send. Valid values are `on` and `off`.
* `protocol` *(Required)* The protocol with which to communicate with the module. Possible values are `rf` or `pl`. See the mochad documentation for more information.

-

    PUT /x10/{device}/brightness

Sets the brightness value of a device.

**Params:**

* `device` *(Required)* The house code and ID of the device. For example, `C2`.
* `value` *(Required)* The brightness value to send between 0 and 100.
* `protocol` *(Required)* The protocol with which to communicate with the module. Possible values are `rf` or `pl`. See the mochad documentation for more information. 