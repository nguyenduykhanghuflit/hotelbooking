import homeRouter from './homeRouter';
import roomRouter from './roomRouter';
import loginRouter from './loginRouter';

function route(app) {
  app.use('/', homeRouter);
  app.use('/rooms', roomRouter);
  app.use('/login', loginRouter);
}

module.exports = route;
