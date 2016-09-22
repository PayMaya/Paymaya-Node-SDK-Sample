/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var PaymayaSDK = require("paymaya-node-sdk").PaymayaSDK;

module.exports.bootstrap = function(cb) {
  PaymayaSDK.initCheckout(sails.config.credentials.publicKey, sails.config.credentials.secretKey,
    PaymayaSDK.ENVIRONMENT.SANDBOX);
  cb();
};
