# cordova-set-version

[![NPM](https://nodei.co/npm/cordova-set-version.png?downloads=true&stars=true)](https://nodei.co/npm/cordova-set-version/)

[![ISC License](https://img.shields.io/npm/l/cordova-set-version.svg)](http://opensource.org/licenses/ISC)
[![npm version](https://img.shields.io/npm/v/cordova-set-version.svg)](http://npm.im/cordova-set-version)
[![npm downloads](https://img.shields.io/npm/dt/cordova-set-version.svg)](http://npm-stat.com/charts.html?package=cordova-set-version&from=2017-02-08)
[![travis](https://img.shields.io/travis/gligoran/cordova-set-version.svg)](https://travis-ci.org/gligoran/cordova-set-version)
[![codecov](https://img.shields.io/codecov/c/github/gligoran/cordova-set-version.svg)](https://codecov.io/gh/gligoran/cordova-set-version)
[![dependencies](https://img.shields.io/david/gligoran/cordova-set-version.svg)](https://david-dm.org/gligoran/cordova-set-version)
[![dependency status](https://dependencyci.com/github/gligoran/cordova-set-version/badge)](https://dependencyci.com/github/gligoran/cordova-set-version)
[![devDependencies](https://img.shields.io/david/dev/gligoran/cordova-set-version.svg)](https://david-dm.org/gligoran/cordova-set-version?type=dev)
[![greenkeeper](https://badges.greenkeeper.io/gligoran/cordova-set-version.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Features

- Writes `version` and `buildNumber` to Cordova `config.xml`
- Can read `version` from local `package.json`
- Has CLI

## Install

```sh
$ npm install cordova-set-version
```

## Usage

```js
const cordovaSetVersion = require('cordova-set-version');

cordovaSetVersion(); // reads version from package.json
cordovaSetVersion('2.4.9');
cordovaSetVersion('./config.alt.xml', '2.4.9');
cordovaSetVersion('./config.alt.xml', 86);
cordovaSetVersion('./config.alt.xml', '2.4.9', 86)
    .catch(error => { ... });
```

## API

### cordovaSetVersion([configPath], [version], [buildNumber]): Promise

- `configPath` *(string)* - path to your `config.xml`
- `version` *(string)* - version to be written
- `buildNumber` *(number)* - build number to be written

## CLI

### cordova-set-version [-v|--version <version>] [-b|--build-number <build-number>] [config.xml]

Options:

- `-v`/`--version` - version to set
- `-b`/`--build-number` - build number to set
- `--help` - display help
    
Examples

```
$ cordova-set-version
$ cordova-set-version -v 2.4.9
$ cordova-set-version -b 86
$ cordova-set-version -v 2.4.9 -b 86
```
