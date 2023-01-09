const path = require('path');

const express = require('express');
const uuid = require('uuid');

const resData = require('./util/restaurant-data');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/restaurants', (req, res, next) => {
    storedRestaurants = resData.getStoredRestaurants();
    res.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants,
    });
});

app.get('/restaurants/:id', (req, res, next) => {
    const restaurantId = req.params.id;
    storedRestaurants = resData.getStoredRestaurants();

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId) {
            return res.render('restaurant-detail', { restaurant: restaurant });
        }
    }
    
    res.status(404).render('404');
});

app.get('/recommend', (req, res, next) => {
    res.render('recommend');
});

app.post('/recommend', (req, res, next) => {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.push(restaurant);

    resData.storeRestaurants(storedRestaurants)

    res.redirect('/confirm');
});

app.get('/confirm', (req, res, next) => {
    res.render('confirm');
});

app.get('/about', (req, res, next) => {
    res.render('about');;
});

app.use((req, res, next) => {
    res.status(404).render('404');
});

app.use((error, req, res, next,) => {
    res.status(500).render('500');
});

console.log('Listening on Port 3000');
app.listen(3000);