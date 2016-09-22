module.exports.routes = {
  'get /': 'PageController.showPage',
  'post /checkout': 'CheckoutController.create',
  'get /success': 'PageController.success',
  'post /success': 'CheckoutController.success',
  'get /fail': 'PageController.fail',
  'post /fail': 'CheckoutController.fail',
  'get /orders': 'PageController.orders'
};
