module.exports = {
  showPage: function(req, res) {
    res.locals.layout = 'layout';
    res.view('homepage', {
      buyer: sails.config.buyer,
    });
  },

  success: function(req, res) {
    res.locals.layout = 'layout';
    OrderService.retrieve(req.query.id).then((order) => {
      if(!order) {
        return res.notFound();
      }
      res.view('success', order);
    });
  },

  fail: function(req, res) {
    res.locals.layout = 'layout';
    OrderService.retrieve(req.query.id).then((order) => {
      if(!order) {
        return res.notFound();
      }
      res.view('fail', order);
    });
  },

  orders: function(req, res) {
    res.locals.layout = 'layout';
    OrderService.retrieveAll().then((orders) => {
      res.view('orders', { orders: orders });
    });
  }
};
