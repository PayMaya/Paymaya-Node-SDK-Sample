module.exports = {
  create: function(req, res) {
    OrderService.create(req.body).then((order) => {
      return CheckoutService.create(order.id, req.body).then((checkout) => {
        return { order: order, checkout: checkout };
      });
    }).then((result) => {
      return OrderService.saveCheckoutId(result.order.id, result.checkout.checkoutId).then(() => {
        res.json(200, result.checkout);
      });
    }).catch((err) => {
      sails.log.error("Checkout controller:", err);
      res.json(500, err);
    })
  },

  success: function(req, res) {
    OrderService.setSuccess(req.body.id).then(() => {
      res.ok();
    });
  },

  fail: function(req, res) {
    OrderService.setFailed(req.body.id).then(() => {
      res.ok();
    });
  }
};
