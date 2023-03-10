const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
    res.render('welcome');
});

router.get('/signup', function (req, res) {
    res.render('signup');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/signup', async function (req, res) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredConfirmEmail = userData['confirm-email'];
    const enteredPassword = userData.password;

    if (
        !enteredEmail ||
        !enteredConfirmEmail ||
        !enteredPassword ||
        enteredPassword.trim() < 6 ||
        enteredEmail !== enteredConfirmEmail
    ) {
        return res.redirect('/signup');
    }

    const existingUser = await db
        .getDb()
        .collection('users')
        .findOne({
            email:enteredEmail
        });

    if (existingUser) {
        return res.redirect('/signup');
    }

    const hashedPassword = await bcrypt.hash(enteredPassword, 12);

    const user = {
        email: enteredEmail,
        password: hashedPassword,
    };

    await db.getDb().collection('users').insertOne(user);

    res.redirect('/login');
});

router.post('/login', async function (req, res) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredPassword = userData.password;

    const existingUser = await db
        .getDb()
        .collection('users')
        .findOne({
            email: enteredEmail,
        });
    
    if (!existingUser) {
        return res.redirect('/login');
    }

    const passwordsAreEqual = await bcrypt.compare(enteredPassword, existingUser.password);

    if (!passwordsAreEqual) {
        return res.redirect('/login');
    }

    req.session.user = {
        id: existingUser._id,
        email: existingUser.email,
    };
    req.session.isAuthenticated = true;
    req.session.save(() => {
        res.redirect('/admin');
    });
});

router.get('/admin', function (req, res) {
    if (!req.session.isAuthenticated) {
        return res.status(401).render('401');
    }
    res.render('admin');
});

router.post('/logout', function (req, res) {
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect('/');
});

module.exports = router;
