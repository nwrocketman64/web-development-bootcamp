const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'blog',
    user: 'blog-user',
    password: 'password1'
});

module.exports = pool;