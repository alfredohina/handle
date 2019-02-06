const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;


// const WooCommerce = require('woocommerce');

// var wooCommerce = new WooCommerce(process.env.CK, process.env.SC, {
//   url: 'https://www.sunectar.es',
//   consumerKey: process.env.CK,
//   secret: process.env.CS,
//   ssl: true
// });

// wooCommerce.get('/products?filter[limit]=100', function(err, data, res) {
//   console.log(data.products[29].title);
// });

