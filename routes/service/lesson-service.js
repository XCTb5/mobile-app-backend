const { getLessonCollection } = require("../models/lessons");
const { ObjectId } = require('mongodb');

class LessonService {

    async getLessons() {
        const lessonCollection = await getLessonCollection();
        return await lessonCollection.find().toArray();
    }

    async getLessonsSearch(searchParam) {
        console.log('searchParam: ' + searchParam);

        const lessonCollection = await getLessonCollection();
        //Performing a case -insensitive search using a regular expression
        const regex = new RegExp(searchParam, 'i');
        const isSearchParamNumber = !isNaN(Number(searchParam));
        console.log('isSearchParamNumber: ' + isSearchParamNumber);

        if (isSearchParamNumber) {
            // Search for lessons with price/spaces less than or equal to the specified value,
            //if the sepecified value is a number
            const query = {
                $or: [
                    { subject: { $regex: regex } },
                    { location: { $regex: regex } },
                    { price: { $lte: parseInt(searchParam, 10) } },                    
                    { spaces: parseInt(searchParam, 10) },
                ],
            };
            return await lessonCollection.find(query).toArray();
        } else {
            const query = {
                $or: [
                    { subject: { $regex: regex } },
                    { location: { $regex: regex } },
                ],
            };
            return await lessonCollection.find(query).toArray();
        }
    }

    async updateLessonSpaces(lessons) {
        const lessonCollection = await getLessonCollection();
        console.log('Cart Items: '+JSON.stringify(lessons));
        for (const lesson of lessons) {
            const objectId = new ObjectId(lesson._id);
            const result = await lessonCollection.findOneAndUpdate(
                { _id: objectId },
                { $inc: { spaces: -lesson.spaces } }, // Reduce spaces by respective qty in the cart
                { returnDocument: 'after' } // Return the updated document
            );
            console.log('Result: ',result);
        }        
        return 'Lessons updated successfully';
    }
}
module.exports = LessonService;