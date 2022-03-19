import express from 'express';
require('dotenv').config();
import router from './routes';
import configViewEngine from './configs/viewEngine';
import connectDB from './configs/connectDB';
const app = express();
const port = process.env.PORT || 3000;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//view engine
configViewEngine(app);

//routes
router(app);

//Connect DB
connectDB();

app.listen(port, () => {
  console.log(`Đã chạy thành công ở http://localhost:${port}`);
});
