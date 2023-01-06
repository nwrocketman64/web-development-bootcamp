const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    const htmlFilePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(htmlFilePath);
});

app.get('/restaurants', (req, res, next) => {
    const htmlFilePath = path.join(__dirname, 'views', 'restaurants.html');
    res.sendFile(htmlFilePath);
});

app.get('/recommend', (req, res, next) => {
    const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    res.sendFile(htmlFilePath);
});

app.post('/recommend', (req, res, next) => {
    const restaurant = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurants.json');
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

    res.redirect('/confirm');
});

app.get('/confirm', (req, res, next) => {
    const htmlFilePath = path.join(__dirname, 'views', 'confirm.html');
    res.sendFile(htmlFilePath);
});

app.get('/about', (req, res, next) => {
    const htmlFilePath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(htmlFilePath);
});

console.log('Listening on Port 3000');
app.listen(3000);