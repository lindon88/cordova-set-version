'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Set Version and/or Build Number of Cordova config.xml.
 * @param {string} [configPath]
 * @param {string} [version]
 * @param {number} [buildNumber]
 */
var cordovaSetVersion = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _parseArguments,
            _parseArguments2,
            configPath,
            version,
            buildNumber,
            androidVersionCode,
            configFile,
            xml,
            packageFile,
            pkg,
            newData,
            _args = arguments;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _parseArguments = parseArguments.apply(undefined, _args), _parseArguments2 = (0, _slicedToArray3.default)(_parseArguments, 3), configPath = _parseArguments2[0], version = _parseArguments2[1], buildNumber = _parseArguments2[2];


                        configPath = configPath || DefaultConfigPath;
                        version = version || null;
                        buildNumber = buildNumber || null;

                        androidVersionCode = null;

                        if (!(typeof configPath !== 'string')) {
                            _context.next = 7;
                            break;
                        }

                        throw TypeError('"configPath" argument must be a string');

                    case 7:
                        if (!(version && typeof version !== 'string')) {
                            _context.next = 9;
                            break;
                        }

                        throw TypeError('"version" argument must be a string');

                    case 9:
                        if (!(buildNumber && typeof buildNumber !== 'number')) {
                            _context.next = 11;
                            break;
                        }

                        throw TypeError('"buildNumber" argument must be an integer');

                    case 11:
                        if (!(buildNumber && buildNumber !== parseInt(buildNumber, 10))) {
                            _context.next = 13;
                            break;
                        }

                        throw TypeError('"buildNumber" argument must be an integer');

                    case 13:
                        _context.next = 15;
                        return readFile(configPath, 'UTF-8');

                    case 15:
                        configFile = _context.sent;
                        _context.next = 18;
                        return (0, _xml2jsEs6Promise2.default)(configFile);

                    case 18:
                        xml = _context.sent;

                        if (!(!version && !buildNumber)) {
                            _context.next = 26;
                            break;
                        }

                        _context.next = 22;
                        return readFile('./package.json', 'UTF-8');

                    case 22:
                        packageFile = _context.sent;
                        pkg = JSON.parse(packageFile);
                        version = pkg.version;
                        androidVersionCode = pkg.androidVersionCode;
                        androidVersionCode = pkg.iosVersionCode;

                    case 26:

                        if (version) {
                            xml.widget.$.version = version;
                        }

                        if (buildNumber) {
                            xml.widget.$['android-versionCode'] = buildNumber;
                            xml.widget.$['ios-CFBundleVersion'] = buildNumber;
                            xml.widget.$['osx-CFBundleVersion'] = buildNumber;
                        }

                        if (androidVersionCode) {
                            xml.widget.$['android-versionCode'] = androidVersionCode;
                        }

                        newData = xmlBuilder.buildObject(xml);
                        _context.next = 32;
                        return writeFile(configPath, newData, { encoding: 'UTF-8' });

                    case 32:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function cordovaSetVersion() {
        return _ref.apply(this, arguments);
    };
}();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utilPromisify = require('util-promisify');

var _utilPromisify2 = _interopRequireDefault(_utilPromisify);

var _xml2jsEs6Promise = require('xml2js-es6-promise');

var _xml2jsEs6Promise2 = _interopRequireDefault(_xml2jsEs6Promise);

var _xml2js = require('xml2js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFile = (0, _utilPromisify2.default)(_fs2.default.readFile);
var writeFile = (0, _utilPromisify2.default)(_fs2.default.writeFile);

var xmlBuilder = new _xml2js.Builder();
var DefaultConfigPath = './config.xml';

function parseArguments() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (args.length === 0) {
        return [null, null, null];
    }

    if (args.length === 1) {
        if (typeof args[0] === 'string' && args[0].indexOf('.xml') < 0) {
            return [null, args[0], null];
        } else if (typeof args[0] === 'number') {
            return [null, null].concat(args);
        }

        return [].concat(args, [null, null]);
    }

    if (args.length === 2) {
        if (typeof args[0] === 'string') {
            if (args[0].indexOf('.xml') >= 0) {
                if (typeof args[1] === 'number') {
                    return [args[0], null, args[1]];
                }

                return [].concat(args, [null]);
            }

            return [null].concat(args);
        } else if (typeof args[1] === 'number') {
            return [args[0], null, args[1]];
        }

        return [].concat(args, [null]);
    }

    return args;
}

exports.default = cordovaSetVersion;
module.exports = exports['default'];