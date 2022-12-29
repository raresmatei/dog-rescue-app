import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    dogId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        reguired: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
});

// module.exports= ImageModel = mongoose.model('imageModel', imageSchema);
const ImageModel =  mongoose.model('ImageModel', imageSchema);

export {ImageModel};
