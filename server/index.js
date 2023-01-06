require('dotenv').config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import savedDogsRoutes from './routes/savedDogs';
const morgan = require('morgan');
const connectionImageDb = require('./imagedb');
import { ImageModel } from './models/image.model';
import multer from 'multer';
const bodyParser = require('body-parser');
const fs = require('fs');
import { encode as btoa } from 'base-64';

const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.text({ limit: '200mb' }));
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

app.post('/dogs', (req, res) => {
    // const buffer = fs.readFileSync(req.body.image.slice(8));

    // const base64String = btoa(
    //     new Uint8Array(buffer).reduce(function (data, byte) {
    //         return data + String.fromCharCode(byte);
    //     }, '')
    // );
    console.log('here');
    const { name, breed, age, temper, gender, shelterId, image } = req.body;

    const dog = ImageModel({
        name,
        breed,
        age,
        temper,
        gender,
        shelterId,
        isAdopted: false,
        personId: null,
        base64StringImage: image,
    });

    dog.save()
        .then((res) => {
            console.log('image is saved');
            // res.json(dog);
        })
        .catch((err) => {
            console.log(err, 'error has occur');
            res.json({
                error: 'file is too large',
            });

        });
    res.send(dog);
});

app.get('/dogs/:personId', async (req, res) => {
    try {
        const personId = req.params.personId;

        const allData = await ImageModel.find({ personId: personId });

        res.json(allData);
    } catch (err) {
        console.log('err : ', err);
    }
});

app.get('/shleter/dogs/:shelterID', async (req, res) => {
    try {
        const shelterId = req.params.shelterID;

        const allData = await ImageModel.find({ shelterId: shelterId });

        res.json(allData);
    } catch (error) {
        console.log(error);
    }
});

app.get('/dogs', async (req, res) => {
    try {
        const allData = await ImageModel.find({ isAdopted: false });

        res.status(200).json(allData);
    } catch (err) {
        console.log('err : ', err);
    }
});

app.get('/dogImage/:dogId', async (req, res) => {
    try {
        const file = await ImageModel.findOne({ _id: req.params.dogId });

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
        } else {
            res.send('not found');
        }

        res.send(file);
    } catch (error) {
        res.send('not found');
    }
});

// app.patch('/dogImage/:dogId/:likeValue', async (req, res) => {
//     const { userId } = req.body;
//     try {
//         const file = await ImageModel.findOne({ _id: req.params.dogId });

//         if (file) {
//             file.likeCount = file.likeCount + Number(req.params.likeValue);

//             file.save();
//         } else {
//             res.send('not found');
//         }

//         res.send(file);
//     } catch (error) {
//         res.send('not found');
//     }
// });

app.delete('/dogImage/:dogId', async (req, res) => {
    try {
        const file = await ImageModel.deleteOne({ _id: req.params.dogId });
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
