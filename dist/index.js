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
            envPath,
            version,
            buildNumber,
            androidVersionCode,
            iosVersionCode,
            appVersion,
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
                        _parseArguments = parseArguments.apply(undefined, _args), _parseArguments2 = (0, _slicedToArray3.default)(_parseArguments, 4), configPath = _parseArguments2[0], envPath = _parseArguments2[1], version = _parseArguments2[2], buildNumber = _parseArguments2[3];


                        configPath = configPath || DefaultConfigPath;
                        version = version || null;
                        buildNumber = buildNumber || null;
                        envPath = envPath || null;

                        androidVersionCode = null;
                        iosVersionCode = null;
                        appVersion = null;

                        if (!(typeof configPath !== 'string')) {
                            _context.next = 10;
                            break;
                        }

                        throw TypeError('"configPath" argument must be a string');

                    case 10:
                        if (!(version && typeof version !== 'string')) {
                            _context.next = 12;
                            break;
                        }

                        throw TypeError('"version" argument must be a string');

                    case 12:
                        if (!(buildNumber && typeof buildNumber !== 'number')) {
                            _context.next = 14;
                            break;
                        }

                        throw TypeError('"buildNumber" argument must be an integer');

                    case 14:
                        if (!(buildNumber && buildNumber !== parseInt(buildNumber, 10))) {
                            _context.next = 16;
                            break;
                        }

                        throw TypeError('"buildNumber" argument must be an integer');

                    case 16:
                        _context.next = 18;
                        return readFile(configPath, 'UTF-8');

                    case 18:
                        configFile = _context.sent;
                        _context.next = 21;
                        return (0, _xml2jsEs6Promise2.default)(configFile);

                    case 21:
                        xml = _context.sent;

                        if (!(!version && !buildNumber)) {
                            _context.next = 31;
                            break;
                        }

                        _context.next = 25;
                        return readFile('./package.json', 'UTF-8');

                    case 25:
                        packageFile = _context.sent;
                        pkg = JSON.parse(packageFile);
                        version = pkg.version;
                        appVersion = pkg.appVersion;
                        androidVersionCode = pkg.androidVersionCode;
                        iosVersionCode = pkg.iosVersionCode;

                    case 31:

                        if (version) {
                            xml.widget.$.version = version;
                        }

                        if (appVersion) {
                            xml.widget.$.version = appVersion;
                            if (envPath) {
                                updateEnvironmentsVersions(envPath, appVersion);
                            }
                        }

                        if (buildNumber) {
                            xml.widget.$['android-versionCode'] = buildNumber;
                            xml.widget.$['ios-CFBundleVersion'] = buildNumber;
                            xml.widget.$['osx-CFBundleVersion'] = buildNumber;
                        }

                        if (androidVersionCode) {
                            xml.widget.$['android-versionCode'] = androidVersionCode;
                        }

                        if (iosVersionCode) {
                            xml.widget.$['ios-CFBundleVersion'] = iosVersionCode;
                        }

                        newData = xmlBuilder.buildObject(xml);
                        _context.next = 39;
                        return writeFile(configPath, newData, { encoding: 'UTF-8' });

                    case 39:
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

var updateEnvrionmentFile = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(file, basePath, appVersion) {
        var filePath, exists, envFile, lines, hasChanges, i, line;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        filePath = basePath + file;
                        _context2.prev = 1;
                        exists = _fs2.default.existsSync(filePath);

                        if (exists) {
                            _context2.next = 6;
                            break;
                        }

                        console.log('File ' + filePath + ' does not exists!');
                        return _context2.abrupt('return');

                    case 6:
                        _context2.next = 8;
                        return readFile(filePath, 'UTF-8');

                    case 8:
                        envFile = _context2.sent;

                        if (envFile) {
                            _context2.next = 11;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 11:
                        lines = envFile.split(/\r?\n/);

                        if (!(lines && lines.length > 0)) {
                            _context2.next = 19;
                            break;
                        }

                        hasChanges = false;

                        for (i = 0; i < lines.length; i++) {
                            line = lines[i];

                            if (line.indexOf('appVersion:') !== -1) {
                                line = "appVersion: '" + appVersion + "',";
                                lines[i] = line;
                                hasChanges = true;
                            }
                        }

                        if (!hasChanges) {
                            _context2.next = 19;
                            break;
                        }

                        _context2.next = 18;
                        return writeFile(filePath, lines.join('\n'), { encoding: 'UTF-8' });

                    case 18:
                        console.log('Updated ' + filePath);

                    case 19:
                        _context2.next = 24;
                        break;

                    case 21:
                        _context2.prev = 21;
                        _context2.t0 = _context2['catch'](1);

                        console.log(_context2.t0);

                    case 24:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[1, 21]]);
    }));

    return function updateEnvrionmentFile(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
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
var DefaultEnvPath = './src/environments/';

function updateEnvironmentsVersions(envPath, appVersion) {
    try {
        var envStats = _fs2.default.statSync(envPath);
        if (!envStats.isDirectory()) {
            console.log('Can not found environments directory!');
            return;
        }

        console.log('Environments directory exists!');

        _fs2.default.readdir(envPath, function (err, files) {
            files.forEach(function (file) {
                updateEnvrionmentFile(file, envPath, appVersion);
            });
        });
    } catch (exception) {
        console.log(exception);
    }
}

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