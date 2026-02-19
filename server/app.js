const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');
const { title } = require('process');

const app = express();

// Configuració Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.use(express.static(path.join(__dirname, '../public')));

// D) Helper obligatori: lte (less than or equal)
hbs.registerHelper('lte', function (a, b) {
    return a <= b;
});

// Càrrega de dades
const site = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/site.json'), 'utf8'));
const cities = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/cities.json'), 'utf8'));
const countries = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/countries.json'), 'utf8'));

// B) Ruta /
app.get('/', (req, res) => {
    res.render('index', site);
});

// C) Ruta /informe
app.get('/informe', (req, res) => {
    res.render('informe', {
        title:site.title ,
        cities: cities.cities,
        countriesName: countries.countries
    });
});

app.listen(3000, () => console.log('Servidor a http://localhost:3000'));
//con este conado se arrana 
//npm run dev//