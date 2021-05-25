const login = require('./login');
const delay = require('mocker-api/lib/delay');
const noProxy = process.env.NO_PROXY === 'true';
const proxy = {
  ...login
}
module.exports = (noProxy ? {} : delay(proxy, 1000));