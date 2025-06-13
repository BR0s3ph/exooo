import express from 'express';
import { websiteRouter } from './routes/website.route.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('assets'));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(websiteRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});