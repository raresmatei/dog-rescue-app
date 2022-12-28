require('dotenv').config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
const morgan = require('morgan');
const app = express();

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

export {client};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
// route middlewares
app.use('/api', authRoutes);
app.listen(8000, console.log('Server running on port 8000'));
