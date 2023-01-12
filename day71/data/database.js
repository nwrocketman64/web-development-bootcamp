const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
    const client = await MongoClient.connect(
        'mongodb+srv://test-user:asdfghjkl@cluster0.o3xao.mongodb.net/?retryWrites=true&w=majority'
    );
    database = client.db('auth-demo');
}

function getDb() {
    if (!database) {
        throw { message: 'You must connect first!' };
    }
    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb,
};
