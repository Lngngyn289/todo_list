const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const route = require('./routes')
const db = require('./config/db') 
const methodOverride = require('method-override')
const multer  = require('multer')


// db.connect(); for local db
require('dotenv').config() 
db.connect()

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'/public')))
app.use(methodOverride('_method'))

// logger
app.use(morgan('combined'))

//hbs
app.engine('hbs',handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum : (a, b) => a + b
  }
}))

app.set('view engine','hbs')
app.set('views', path.join(__dirname,'resource','/views'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

route(app)



