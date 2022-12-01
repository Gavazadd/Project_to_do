const express = require('express')
const mongoose = require('mongoose')
const expressHandlebars = require('express-handlebars')
const config = require('config')
const todoRoutes = require('./routes/todos')
const path = require ('path')

const PORT = config.get('port') || 3000

const app = express()

const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)


async function start (){
  try{
    await mongoose.connect(config.get('mongoUri'),{
      useNewUrlParser: true
    })
    app.listen(PORT, () =>{
      console.log('Server has been started ...')
    })
  }catch (e){
    console.log(e)
  }
}

start()