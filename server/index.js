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
import { decode as atob, encode as btoa } from 'base-64';

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
    const buffer = fs.readFileSync('uploads/' + req.file.filename);
    const base64String = btoa(
        new Uint8Array(buffer).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
        }, '')
    );

    const { name, breed, age, temper, gender, shelterId } = req.body;

    const dog = ImageModel({
        name,
        breed,
        age,
        temper,
        gender,
        shelterId,
        isAdopted: false,
        personId: null,
        base64StringImage: base64String,
    });

    console.log('base 64 string: ', base64String);
    dog.save()
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
        const allData = await ImageModel.find({isAdopted: false});

        res.json(allData);
    } catch (err) {
        console.log('err : ', err);
    }
});

app.get('/dogImage/:dogId', async (req, res) => {
    console.log(req.params);
    try {
        const file = await ImageModel.findOne({ _id: req.params.dogId });

        console.log('file: ', file);
        res.json(file);
    } catch (error) {
        res.send('not found');
    }
});

app.patch('/dogImage/:dogId', async (req, res) => {
    const { userId } = req.body;
    try {
        const file = await ImageModel.findOne({ _id: req.params.dogId });

        if (file) {
            file.isAdopted = true;
            file.personId = userId;

            file.save();
        }
        else{
            res.send('not found');
        }

        res.send(file);
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
