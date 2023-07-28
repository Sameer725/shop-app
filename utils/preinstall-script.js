/* eslint-disable no-console */

var fs = require('fs');
var path = require('path');

if (!process.env.npm_execpath || !process.env.npm_execpath.includes('yarn')) {
  console.error('You must use Yarn to install dependencies:');
  console.error('  $ yarn install');

  var npmLockFilePath = path.resolve(__dirname + '/../package-lock.json');
  var pnpmLockFilePath = path.resolve(__dirname + '/../pnpm-lock.yaml');

  // Delete lock files of other package managers
  try {
    fs.unlinkSync(npmLockFilePath);
  } catch (e) {}
  try {
    fs.unlinkSync(pnpmLockFilePath);
  } catch (e) {}

  process.exit(1);
}
