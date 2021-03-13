const chalk = require("chalk")
const request = require('postman-request')

const geocode = (location, callback)=>{
    if(!location){
        return console.log(chalk.redBright('Please enter a valid location.'))
    }
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoiYWxwc3RpbmdlciIsImEiOiJja2xrcXFtOGIzZXo4Mm5zODRrNGtiaWFuIn0.XOEIMIGklGIu7NgM7IVORQ&limit=1'
    
    request({url, json:true}, (error, {body}={})=>{
        const {features} = body;
        if(error){
            callback(undefined,'A system error has occured.')
        }

        else if(features.length===0||body===undefined){
            callback(undefined, 'Invalid Location entered. Please try a different one')
        }
        
        else{
            callback({latitude: features[0].center[1], longitude: features[0].center[0], location:features[0].place_name}, undefined);
        }
    })
}

const forecast = (latitude, longitude, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=dff5abb3548c1ec5b69ab770d7f3ff85&query=${latitude}, ${longitude}`

    request({url, json:true}, (error, {body}={})=>{
        const {current} = body;

        if(error){
            callback(undefined, error);
        }
        else if(body.error||body.success==='false'){
            callback(undefined,'Request failed, please try again with a different location.')
        }
        else{
            callback({current_temperature :current.temperature, feels_like:current.feelslike})
        }

    })
   
}


module.exports = {geocode:geocode, forecast:forecast}