var localConfig = require("./config/local");
var _paymayaSdk = require("paymaya-node-sdk");
var PaymayaSDK = _paymayaSdk.PaymayaSDK;
var Webhook = _paymayaSdk.Webhook;

function initialize() {
  PaymayaSDK.initCheckout(localConfig.credentials.publicKey, localConfig.credentials.secretKey,
    PaymayaSDK.ENVIRONMENT.SANDBOX);
}

function deleteWebhook(webhookObj) {
  return new Promise((resolve) => {
    var webhook = new Webhook();
    webhook.id = webhookObj.id;
    webhook.delete(() => {
      console.log("deleted ", webhookObj.name);
      resolve();
    });
  });
}

function deleteExistingWebhooks() {
  return new Promise((resolve, reject) => {
    var webhook = new Webhook();
    webhook.retrieve((err, result) => {
      if(err) {
        reject(err);
      }

      if(result.length === 0) {
        // skip
        resolve();
      }

      var promises = [];
      for(var i=0; i<result.length; i++) {
        promises.push(deleteWebhook(result[i]));
      }
      resolve(Promise.all(promises));
    });
  });
}

function registerWebhook(name, url) {
  return new Promise((resolve, reject) => {
    var webhook = new Webhook;
    webhook.name = name;
    webhook.callbackUrl = url;

    webhook.register((err) => {
      if(err) return reject(err);
      resolve(err);
    });
  });
}

function registerWebhooks() {
  return Promise.all([
    registerWebhook("CHECKOUT_SUCCESS", localConfig.forwarding + "/success"),
    registerWebhook("CHECKOUT_FAILURE", localConfig.forwarding + "/fail")
  ]);
}

function main() {
  var complete = false;

  initialize();

  deleteExistingWebhooks().then(() => {
    return registerWebhooks();
  }).then(() => {
    complete = true;
  }).catch((err) => {
    console.log("error:", err);
    process.exit();
  });

  (function wait () {
     if (!(complete)) setTimeout(wait, 1000);
  })();
}

main();
