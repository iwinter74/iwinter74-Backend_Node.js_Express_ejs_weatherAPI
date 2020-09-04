const express = require('express')
const app = express()
const config = require('./.env')
const fetch = require('node-fetch');

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.listen(3002, (req, res) => {
    console.log("Server started")
})

let weatherapi = config.apikey

console.log(weatherapi)

let data

let userCity ="London"


fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${weatherapi}`)
  .then(response => response.json())
    .then(json => {
        data = json
        console.log(data)
    })

app.get('/', (req, res) => {
    res.render('index', {weatherdata: data, city: userCity, temp: (data.main.temp - 273.15).toFixed(2) })
})

app.use('/404', (req, res) => {
    req.status(404)
    res.render('404')
})





  



