// const testRouter = require('./testRouter');
// import studentRouter from './studentRouter';
// import classRouter from './classRouter';
// import admissionsRouter from './admissionsRouter';
// import studyRouter from './studyRouter';
// import teacherRouter from './teacherRouter';
import homeRouter from './homeRouter';

function route(app) {
  // app.use('/teacher', teacherRouter);
  // app.use('/admissions', admissionsRouter);
  // app.use('/study', studyRouter);
  // app.use('/class', classRouter);
  // app.use('/student', studentRouter);
  // app.use('/testdb', testRouter);
  app.use('/', homeRouter);
}

module.exports = route;
