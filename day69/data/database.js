const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
    const client = await MongoClient.connect('mongodb+srv://test-user:asdfghjkl@cluster0.o3xao.mongodb.net/?retryWrites=true&w=majority');
    database = client.db('blog');
}

function getDb() {
    if (!database) {
        throw { message: 'Database connection not established!' };
    }
    return database;
}

module.exports = {
    connectToDatabase: connect,
    getDb: getDb
};
