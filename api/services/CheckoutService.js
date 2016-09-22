var PaymayaSDK = require("paymaya-node-sdk");
var Checkout = PaymayaSDK.Checkout;

module.exports = {
  create: function(id, data) {
    return new Promise((resolve, reject) => {
      var checkout = new Checkout();
      checkout.buyer = data.buyer;
      checkout.totalAmount = data.totalAmount;
      checkout.items = data.items;
      checkout.requestReferenceNumber = data.requestReferenceNumber;
      checkout.redirectUrl = {
        success: sails.config.forwarding + "/success?id=" + id,
        failure: sails.config.forwarding + "/fail?id=" + id
      };

      checkout.execute((err, result) => {
        (err) ? reject(err) : resolve(result);
      });
    });
  }
};
