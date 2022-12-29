const mongoose = require('mongoose');

module.exports = async function connectionToImageDb() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(process.env.DB_IMAGES, connectionParams);
        console.log('connected to  image database');
    } catch (error) {
        console.log(error);
        console.log('could not connect to database');
    }
};
