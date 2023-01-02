import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    name: String,
    breed: String,
    age: Number,
    temper: String,
    // img: {
    //     data: Buffer,
    //     contentType: String,
    // },
    base64StringImage : String,
});

// module.exports= ImageModel = mongoose.model('imageModel', imageSchema);
const ImageModel =  mongoose.model('ImageModel', imageSchema);

export {ImageModel};
