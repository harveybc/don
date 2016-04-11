var express = require('express');
var router = express.Router();
// Las 4 Requests y el homepage
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Singularity' });
});
/* GET OptimumFound */
router.get('/OptimumFound', function(req, res, next) {
  res.render('OptimumFound', { title: 'OptimumFound' });
});
/* GET GetCapabilities */
router.get('/GetCapabilities', function(req, res, next) {
  res.render('GetCapabilities', { title: 'GetCapabilities' });
});
/* GET StartOptimization. */
router.get('/StartOptimization', function(req, res, next) {
  res.render('StartOptimization', { title: 'StartOptimization' });
});
/* GET StopOptimization. */
router.get('/StopOptimization', function(req, res, next) {
  res.render('StopOptimization', { title: 'StopOptimization' });
});
module.exports = router;
