const express = require('express');
const uuid = require('uuid');

const resData = require('../util/restaurant-data');

const router = express.Router();

router.get('/restaurants', (req, res, next) => {
    let order = req.query.order;
    let nextOrder = 'desc'

    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }

    if (order === 'desc') {
        nextOrder = 'asc';
    }

    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.sort((resA, resB) => {
        if (
            (order === 'asc' && resA.name > resB.name) ||
            (order === 'desc' && resB.name > resA.name)) {
            return 1;
        }
        return -1;
    })

    res.render('restaurants', {
        numberOfRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants,
        nextOrder: nextOrder,
    });
});

router.get('/restaurants/:id', (req, res, next) => {
    const restaurantId = req.params.id;
    storedRestaurants = resData.getStoredRestaurants();

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId) {
            return res.render('restaurant-detail', { restaurant: restaurant });
        }
    }
    
    res.status(404).render('404');
});

router.get('/recommend', (req, res, next) => {
    res.render('recommend');
});

router.post('/recommend', (req, res, next) => {
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.push(restaurant);

    resData.storeRestaurants(storedRestaurants)

    res.redirect('/confirm');
});

router.get('/confirm', (req, res, next) => {
    res.render('confirm');
});

module.exports = router;