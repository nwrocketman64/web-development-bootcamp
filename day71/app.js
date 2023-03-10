const path = require('path');

const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

const db = require('./data/database');
const demoRoutes = require('./routes/demo');
const database = require('./data/database');

const MongoDBStore = mongodbStore(session);

const app = express();

const sessionStore = new MongoDBStore({
    uri: 'mongodb+srv://test-user:asdfghjkl@cluster0.o3xao.mongodb.net/?retryWrites=true&w=majority',
    databaseName: 'auth-demo',
    collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'asdsgwecafcagsvcewdc',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
}));

app.use(demoRoutes);

app.use(function (error, req, res, next) {
    res.render('500');
})

db.connectToDatabase().then(function () {
    app.listen(3000);
    console.log('Listening on Port 3000');
});
