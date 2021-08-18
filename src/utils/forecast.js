const request = require('request')

const forecast=(longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a14c7d795df7370ff94bdbd75825d1a2&query='+ latitude +','+ longitude +'&units=f'
 request({ url,json:true},(error,{body} ={}) =>{
     if(error) {
         callback('unable to connect to internet',undefined)
     } else if(body.error) {
         callback('check the values again and  try!',undefined)
     } else {
         callback(undefined,'weather is '+body.current.weather_descriptions[0] + ' .It is currently '+ body.current.temperature +' degrees out. It feels like '+body.current.feelslike+ ' degrees out')
     }
 })
}

module.exports = forecast
