const path = require('path');
const express = require('express');
const hbs = require('hbs');
const utils = require('./util_functions.js')
const chalk = require('chalk');

const app = express();
const port = process.env.PORT||3000;

const static_files_path = path.join(__dirname,'../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(static_files_path));
hbs.registerPartials(partialsPath);

app.get('', (req, res)=>{
    res.render('index', {title: 'Weather', name: 'Ansh'})
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        date: '4/3/2021',
        name:'Ansh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        date: '4/3/2021',
        name: 'Ansh'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Project-x',
        errorMessage:'Help article not found.'
    })
})

app.get('/address', (req, res)=>{
    if(!req.query.address){
        return res.send({error: 'Please enter a valid address.'})
    }

    utils.geocode(req.query.address, ({latitude, longitude, location}={}, error)=>{
        if(error){
            return console.log(chalk.redBright('Error:', error))
        }

        utils.forecast(latitude, longitude, ({current_temperature, feels_like}={}, error)=>{
            
            if(error){
                return console.log(chalk.redBright('Error: ', error))
            }

            console.log(chalk.blueBright(`Current temperature in ${location} is ${current_temperature}'C & it feels like ${feels_like}'C.`))
            
            res.send({
                location: location,
                current_temperature: current_temperature,
                feels_like: feels_like
            })
        
    })
})
})


app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Project-x',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, () => console.log('Server up and running on '+port+'.'))