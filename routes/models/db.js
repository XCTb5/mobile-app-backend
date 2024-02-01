const { MongoClient } = require('mongodb');

//const uri = 'mongodb://127.0.0.1:27017';
const uri = 'mongodb+srv://jubayerdb:jubayerdbpwd@cluster0.s3oaxjf.mongodb.net/';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db('school_activities');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

module.exports = connectToMongoDB;
