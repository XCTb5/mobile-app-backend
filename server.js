const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const fs = require('fs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware to log requests
app.use(async (req, res, next) => {
    try {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp} - ${req.method} ${req.url}`);
        next();
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

// Use Routes
app.use(cors(corsOptions));
app.use('/api/v1/orders', require('./routes/api/orders'));
app.use('/api/v1/lessons', require('./routes/api/lessons'));


/* a static file middleware that returns lesson images, or an error message if the image file does not exist */

const lessonImagesDirectory = path.join(__dirname, 'lesson-images');

// Custom middleware to check if the image file exists
const checkImageExists = (req, res, next) => {
    const url = req.originalUrl;
    const lastSegment = url.substring(url.lastIndexOf('/') + 1);
    const imagePath = path.join(lessonImagesDirectory, lastSegment);
    

    fs.access(imagePath, fs.constants.R_OK, (err) => {
        if (err) {
            res.status(404).json({ error: 'Image not found' });
        } else {
            console.log('imagePath: ' + imagePath);
            next();
        }
    });
};

// Use the custom middleware before the express.static middleware
app.use('/api/v1/lesson-images', checkImageExists, express["static"](lessonImagesDirectory));


const port = 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));