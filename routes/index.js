/*
 * GET home page.
 */

function index(req, res, next) {
  res.locals.title = 'Places Demo';
  res.render('index');
}

module.exports = function (app) {
  app.get('/', index);
}
