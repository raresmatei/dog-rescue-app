require('dotenv').config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
const morgan = require('morgan');
const connectionImageDb = require('./imagedb');
import { ImageModel } from './models/image.model';
import multer from 'multer';
const bodyParser = require('body-parser');
const fs = require('fs');
import { encode as btoa } from 'base-64';

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
    try{
        const allData = await ImageModel.find();

        // console.log('all data:' ,allData[0].img.data);
        //  const base64String = btoa(String.fromCharCode(...new Uint8Array(allData[0].img.data)));
        //  console.log('base 64 str: ', base64String);

        res.json(allData);
    }
    catch(err){
        console.log('err : ', err);
    }
});


app.get('/dogImage/:dogId', async (req, res) =>{
        try {
        const file = await ImageModel.findOne({ dogId: req.params.dogId });
        res.send(file.image.data);
    } catch (error) {
        res.send("not found");
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

//------

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DATABASE;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});
client
    .connect()
    .then(() => console.log('db connected'))
    .catch((err) => {
        console.log('db error: ', err);
        // perform actions on the collection object
        client.close();
    });

export { client };


// route middlewares
app.use('/api', authRoutes);
app.listen(8000, console.log('Server running on port 8000'));
