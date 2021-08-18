const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partiralsPath = path.join(__dirname,'../templates/partials')


//set up handle bars engine ans views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partiralsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('' , (req,res) =>{
    res.render('index',{
        title: 'weather app',
        name:'Surya GB'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title:"ANIME CHARACTER",
        name:"SAITAMA"
    })
})

app.get('/help',(req,res) =>{
    res.render('help', {
        title:"welcome to help page",
        name:"SuryaGB"
    })
})

 app.get('', (req,res) => {
    res.send('<h1>weather</h1>')
 })

app.get('/weather',(req,res) => {
   if(!req.query.address) {
       return res.send( {
           error: 'you must provide an address'
       })
   }

   geocode(req.query.address,(error,{latitude,longitude,location} = {}) =>{
        if(error) {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) =>{
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
   })
})

app.get('/product',(req,res) => {
    if(!req.query.search) {
       return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query);
    res.send( {
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404' ,{
        title:'404',
        name: 'suryagb',
        errorMessage:'help not found'
    })
})
app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'suryagb',
        errorMessage: "page not found"
    })
})

app.listen(80,() => {
    console.log('server is running on port 80')
})
