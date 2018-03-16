#!/usr/bin/env node
'use strict';

var _meow = require('meow');

var _meow2 = _interopRequireDefault(_meow);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var help = `
    Usage
      $ cordova-set-version [-v|--version <version>] [-b|--build-number <build-number>] [config.xml]
    
    Options
      -v, --version Version to set
      -b, --build-number Build number to set
      
    Examples
      $ cordova-set-version -v 2.4.9
      $ cordova-set-version -b 86
      $ cordova-set-version -v 2.4.9 -b 86
`;

var options = {
    flags: {
        version: {
            type: 'string',
            alias: 'v'
        },
        buildNumber: {
            type: 'number',
            alias: 'b'
        }
    },
    help,
    autoVersion: false
};

var cli = (0, _meow2.default)(options);

var filename = cli.input[0] || null;
var version = cli.flags.version || null;
var buildNumber = +cli.flags.buildNumber || null;

(0, _2.default)(filename, version, buildNumber);