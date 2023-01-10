const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.redirect('/posts');
});

router.get('/posts', (req, res, next) => {
    res.render('posts-list');
});

router.get('/new-post', (req, res, next) => {
    res.render('create-post');
});

module.exports = router;