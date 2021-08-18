const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURI(address) +'.json?access_token=pk.eyJ1Ijoic3VyeWFnYjI1IiwiYSI6ImNrcmx4end4ajBoeXIyd25vZ2J1MThjdjQifQ.GGQO10HJagunm3P7pm7dWg'

    request({url,json: true},(error,{body} = {})  => {
        if(error){
            callback('unable to connect to location services!',undefined)
        } else if(body.features.length===0) {
            callback('unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[1].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
