require('dotenv').config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
const morgan = require('morgan');
const connectionImageDb = require('./imagedb');
const Grid = require('gridfs-stream');
import { ImageModel } from './models/image.model';
import multer from 'multer';
const app = express();

let gfs;
connectionImageDb();

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
}).single('testImage');

app.post('/dogImage', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            const newImage = new ImageModel({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png',
                },
            });
            newImage
                .save()
                .then(() => res.send('successfuly saved'))
                .catch((err) => console.log(err));
        }
    });
});

app.get('/dogImage/:dogId', async (req, res) =>{
        try {
        const file = await ImageModel.findOne({ dogId: req.params.dogId });
        console.log(file);
        res.send("got successfuly image");
    } catch (error) {
        res.send("not found");
    }
})

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
// route middlewares
app.use('/api', authRoutes);
app.listen(8000, console.log('Server running on port 8000'));
