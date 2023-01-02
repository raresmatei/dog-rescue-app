require('dotenv').config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import savedDogsRoutes from './routes/savedDogs';
const morgan = require('morgan');
const connectionImageDb = require('./imagedb');
import { ImageModel } from './models/image.model';
import multer from 'multer';
const fs = require('fs');
import savedDogs from './models/savedDogs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

connectionImageDb();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/dogs', upload.single('testImage'), (req, res) => {
    const saveImage = ImageModel({
        name: req.body.name,
        img: {
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: 'image/png',
        },
    });
    saveImage
        .save()
        .then((res) => {
            console.log('image is saved');
        })
        .catch((err) => {
            console.log(err, 'error has occur');
        });
    res.send('image is saved');
});

app.get('/dogs', async (req, res) => {
    try {
        const allData = await ImageModel.find();

        res.json(allData);
    } catch (err) {
        console.log('err : ', err);
    }
});

app.get('/dogImage/:dogId', async (req, res) => {
    try {
        const file = await ImageModel.findOne({ dogId: req.params.dogId });
        res.send(file.image.data);
    } catch (error) {
        res.send('not found');
    }
});

app.delete('/dogImage/:dogId', async (req, res) => {
    try {
        const file = await ImageModel.deleteOne({ dogId: req.params.dogId });
        console.log(file);
        res.send('deleted successfuly image');
    } catch (error) {
        res.send('not found');
    }
});

// route middlewares
app.use('/api', authRoutes);
app.use('/savedDogs', savedDogsRoutes);
app.listen(8000, console.log('Server running on port 8000'));
