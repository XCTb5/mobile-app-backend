// schemas.js
const connectToMongoDB = require('./db');

async function getOrderCollection() {
    const db = await connectToMongoDB();
    return db.collection('orders');
}

module.exports = { getOrderCollection };