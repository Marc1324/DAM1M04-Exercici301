const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

const app = express();

// Config de les vistes i partials
app.set('view engine', 'hbs');
app.set('views', './server/views');
hbs.registerPartials('./server/views/partials');
app.use(express.static('public'));

// El helper per saber si un número és "menor o igual a"
hbs.registerHelper('lte', (a, b) => a <= b);

// Rutes
app.get('/', (req, res) => {
    const site = JSON.parse(fs.readFileSync('./server/data/site.json'));
    res.render('index', site);
});

app.get('/informe', (req, res) => {
    const site = JSON.parse(fs.readFileSync('./server/data/site.json'));
    const cities = JSON.parse(fs.readFileSync('./server/data/cities.json'));
    const countries = JSON.parse(fs.readFileSync('./server/data/countries.json'));
    res.render('informe', { site, cities, countries });
});

app.listen(3000, () => console.log('Funcionant a http://localhost:3000'));