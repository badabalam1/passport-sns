const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const Strategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose')
const passportSaver = require('./routes/passport')
const morgan = require('morgan')

const index = require('./routes/index')

passportSaver()

const app = express()

mongoose.connect('mongodb://localhost/shopping')
const db = mongoose.connection
db.on('error', err => {
    console.error(err)
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
});

db.once('open', () => {
    console.log('✓ DB connection success.')
})

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(require('morgan')('combined'))
app.use(require('cookie-parser')())
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(passport.initialize())
app.use(passport.session())

app.listen(3000, () => {
    console.log('Connected, 3000 port!')
})

app.use('/', index)

