const chalk = require('chalk')
const utils = require('./util_functions.js')

utils.geocode(process.argv.splice(2,).join(' '), ({latitude, longitude, location}={}, error)=>{
    if(error){
        return console.log(chalk.redBright('Error:', error))
    }
    //console.log(latitude, ' ', longitude);
    utils.forecast(latitude, longitude, ({current_temperature, feels_like}={}, error)=>{
        
        if(error){
            return console.log(chalk.redBright('Error: ', error))
        }
        
        console.log(chalk.blueBright(`Current temperature in ${location} is ${current_temperature}'C & it feels like ${feels_like}'C.`))
        
    })
})



