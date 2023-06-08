const express = require('express')
const app = express()

//for local
//const port = 3000

//for local and cloud both
const port=process.env.PORT || 3000;
//for token
const cookieParser = require('cookie-parser');

const web =require('./routes/web.js')
const connectDB = require('./db/connect_db.js');
var bodyParser = require('body-parser')

var session = require('express-session')
var flash = require('connect-flash');

app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
  
}));
app.use(flash());

connectDB()
// ejs setup
app.set('view engine','ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//cookie-parser
app.use(cookieParser())
// static files
app.use(express.static('public'))
// route load 
app.use('/',web)



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })