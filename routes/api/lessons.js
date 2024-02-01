const express = require('express');
const router = express.Router();
const LessonService = require('../service/lesson-service');
const lessonService = new LessonService();

router.get('/', async (req, res) => {
    try {
        const lessons = await lessonService.getLessons();
        res.json(lessons);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error processing request at this time!" });
    }
});

router.get('/search/:searchParam', async (req, res) => {
    try {
        const lessons = await lessonService.getLessonsSearch(req.params.searchParam);
        res.json(lessons);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error processing request at this time!" });
    }
});

router.put('/', async (req, res) => {
    try {
        const lessons = await lessonService.updateLessonSpaces(req.body);
        res.json(lessons);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error processing request at this time!" });
    }
});

module.exports = router;