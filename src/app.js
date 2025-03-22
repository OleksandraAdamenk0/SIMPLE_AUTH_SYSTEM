// может конфликтовать с некоторыми расширениями хрома,
// например Coupert - Automatic Coupon Finder & Cashback
//
// использует
// express,
// jwt,
// bcrypt,
// redis,
// HTTP-only Cookie,
// куки парсер
// переменные окружения
// openssl rand -hex 32 консольная команда
// body-parser



const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const path = require('path');

require("dotenv").config();

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/api/', router);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('title', 'Game');

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});