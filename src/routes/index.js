import homeRouter from './homeRouter';
import roomRouter from './roomRouter';
import loginRouter from './loginRouter';
import errRouter from './errRouter';

function route(app) {
  app.use('/', homeRouter);
  app.use('/error', errRouter);
  app.use('/rooms', roomRouter);
  app.use('/login', loginRouter);
}

module.exports = route;
