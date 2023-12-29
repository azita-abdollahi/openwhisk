const openwhisk = require('openwhisk');
require('dotenv').config();
const options = {
    // ignore_certs: true,
    apihost: process.env.apihost,
    api_key: process.env.api_key
  };

  // Create an OpenWhisk client instance  
  const wsk = openwhisk(options);
  module.exports = wsk;
