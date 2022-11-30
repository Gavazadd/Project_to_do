const express = require('express')
const mongoose = require('mongoose')
const expressHandlebars = require('express-handlebars')
const config = require('config')

const PORT = config.get('port') || 3000

const app = express()

const hbs = expressHandlebars.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', hbs)
app.set('views', 'views')

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