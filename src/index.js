import fs from 'fs';
import promisify from 'util-promisify';
import xml2js from 'xml2js-es6-promise';
import {Builder} from 'xml2js';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const xmlBuilder = new Builder();
const DefaultConfigPath = './config.xml';
const DefaultEnvPath = './src/environments/';

/**
 * Set Version and/or Build Number of Cordova config.xml.
 * @param {string} [configPath]
 * @param {string} [version]
 * @param {number} [buildNumber]
 */
async function cordovaSetVersion(...args) {
    let [configPath, envPath, version, buildNumber] = parseArguments(...args);

    configPath = configPath || DefaultConfigPath;
    version = version || null;
    buildNumber = buildNumber || null;
    envPath = envPath || null;

    let androidVersionCode = null;
    let iosVersionCode = null;
    let appVersion = null;

    if (typeof configPath !== 'string') {
        throw TypeError('"configPath" argument must be a string');
    }

    if (version && typeof version !== 'string') {
        throw TypeError('"version" argument must be a string');
    }

    if (buildNumber && typeof buildNumber !== 'number') {
        throw TypeError('"buildNumber" argument must be an integer');
    }

    if (buildNumber && buildNumber !== parseInt(buildNumber, 10)) {
        throw TypeError('"buildNumber" argument must be an integer');
    }

    const configFile = await readFile(configPath, 'UTF-8');
    const xml = await xml2js(configFile);

    if (!version && !buildNumber) {
        const packageFile = await readFile('./package.json', 'UTF-8');
        const pkg = JSON.parse(packageFile);
        ({version} = pkg);
        ({appVersion} = pkg);
        ({androidVersionCode} = pkg);
        ({iosVersionCode} = pkg);
    }

    if (version) {
        xml.widget.$.version = version;
    }

    if (appVersion) {
        xml.widget.$.version = appVersion;
        if(envPath){
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

    const newData = xmlBuilder.buildObject(xml);

    await writeFile(configPath, newData, {encoding: 'UTF-8'});
}

function updateEnvironmentsVersions(envPath, appVersion){
    try{
        const envStats = fs.statSync(envPath);
        if(!envStats.isDirectory()){
            console.log('Can not found environments directory!');
            return;
        }

        console.log('Environments directory exists!');

        fs.readdir(envPath, (err, files) => {
            files.forEach(file => {
                updateEnvrionmentFile(file, envPath, appVersion);
            });
        });

    }catch(exception){
        console.log(exception);
    }
}

async function updateEnvrionmentFile(file, basePath, appVersion){
    const filePath = basePath + file;
    try{
        const exists = fs.existsSync(filePath);
        if(!exists){
            console.log('File ' + filePath + ' does not exists!');
            return;
        }

        const envFile = await readFile(filePath, 'UTF-8');
        if(!envFile){
            return;
        }

        const lines = envFile.split(/\r?\n/);
        if(lines && lines.length > 0){
            let hasChanges = false;
            for(var i = 0; i < lines.length; i++){
                let line = lines[i];
                if(line.indexOf('appVersion:') !== -1){
                    line = "\tappVersion: '" + appVersion + "',";
                    lines[i] = line;
                    hasChanges = true;
                }
            }

            if(hasChanges){
                await writeFile(filePath, lines.join('\n'), {encoding: 'UTF-8'});
                console.log('Updated ' + filePath);
            }

        }

    }catch(exception){
        console.log(exception);
    }
}

function parseArguments(...args) {
    if (args.length === 0) {
        return [null, null, null];
    }

    if (args.length === 1) {
        if (typeof args[0] === 'string' && args[0].indexOf('.xml') < 0) {
            return [null, args[0], null];
        } else if (typeof args[0] === 'number') {
            return [null, null, ...args];
        }

        return [...args, null, null];
    }

    if (args.length === 2) {
        if (typeof args[0] === 'string') {
            if (args[0].indexOf('.xml') >= 0) {
                if (typeof args[1] === 'number') {
                    return [args[0], null, args[1]];
                }

                return [...args, null];
            }

            return [null, ...args];
        } else if (typeof args[1] === 'number') {
            return [args[0], null, args[1]];
        }

        return [...args, null];
    }

    return args;
}

export default cordovaSetVersion;
