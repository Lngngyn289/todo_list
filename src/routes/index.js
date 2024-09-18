const newsRouter = require('./news')
const siteRouter = require('./site')
const coursesRouter = require('./courses')
const meRouter = require('./me')

function route(app){
  app.use('/courses', coursesRouter);

  app.use('/me', meRouter);

  app.use('/news', newsRouter);
  
  app.get('/search', siteRouter);

  app.get('/', siteRouter);
  
}

module.exports = route;
