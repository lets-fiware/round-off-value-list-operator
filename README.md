# Round Off Value List operator

[![](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/visualization.svg)](https://www.fiware.org/developers/catalogue/)
[![License: MIT](https://img.shields.io/github/license/lets-fiware/round-off-value-list-operator.svg)](https://opensource.org/licenses/MIT)<br/>
[![Build Status](https://travis-ci.com/lets-fiware/round-off-value-list-operator.svg?branch=master)](https://travis-ci.com/lets-fiware/round-off-value-operator)
[![Coverage Status](https://coveralls.io/repos/github/lets-fiware/round-off-value-list-operator/badge.svg)](https://coveralls.io/github/lets-fiware/round-off-value-operator)

The Round Off Value List operator is a WireCloud operator that provides a simple mechanism of rounding off value list, produced by an output endpoint.

## Build dependencies

Be sure to have installed [Node.js](https://nodejs.org/) in your system. For example, you can install it on Ubuntu and Debian running the following commands:

```bash
sudo apt update; sudo apt install curl gnupg
curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
sudo apt install nodejs npm 
```

You also have to install the [Grunt](https://gruntjs.com/)'s command line interface (CLI):

```sudo npm install -g grunt-cli
```

The remaining dependencies are installed using npm (you have to run this command
inside the folder where you downloaded this repository):

```bash
npm install
```


## Build

Once installed all the build dependencies you can build this operator by using grunt:

```bash
grunt
```

If everything goes well, you will find a wgt file in the `dist` folder.


## Documentation

Documentation about how to use this operator is available on the
[User Guide](src/doc/userguide.md). Anyway, you can find general information
about how to use operators on the
[WireCloud's User Guide](https://wirecloud.readthedocs.io/en/stable/user_guide/)
available on Read the Docs.

## Copyright and License

Copyright (c) 2019 Kazuhito Suda
Licensed under the MIT license.
