module.exports = {
  create: function(data) {
    return Order.create({
      buyer: data.buyer,
      totalAmount: data.totalAmount,
      items: data.items,
      status: "incomplete"
    });
  },

  saveCheckoutId: function(id, checkoutId) {
    return Order.update({id: id}, {checkoutId: checkoutId});
  },

  retrieve: function(id) {
    return Order.findOne({id: Order.mongo.objectId(id)});
  },

  setSuccess: function(checkoutId) {
    return Order.update({checkoutId: checkoutId}, {status: "success"});
  },

  setFailed: function(checkoutId) {
    return Order.update({checkoutId: checkoutId}, {status: "failed"});
  },

  retrieveAll: function() {
    return Order.find();
  }
};
