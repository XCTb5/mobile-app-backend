// schemas.js
const connectToMongoDB = require('./db');

async function getLessonCollection() {
    const db = await connectToMongoDB();
    return db.collection('lessons');
}

module.exports = { getLessonCollection };