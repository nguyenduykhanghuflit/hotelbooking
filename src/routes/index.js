import homeRouter from './homeRouter';
import roomRouter from './roomRouter';
import loginRouter from './loginRouter';
import errRouter from './errRouter';
import adminRouter from './admin/admin.homeRouter';

function route(app) {
  app.use('/', homeRouter);
  app.use('/admin', adminRouter);
  app.use('/error', errRouter);
  app.use('/rooms', roomRouter);
  app.use('/login', loginRouter);
}

module.exports = route;
