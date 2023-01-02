import mongoose from 'mongoose';

const dogSchema = mongoose.Schema({
    name: {
        type: String,
        reguired: true,
    },
    breed: {
        type: String,
        reguired: true,
    },
});

// module.exports= ImageModel = mongoose.model('imageModel', imageSchema);
const Dog =  mongoose.model('ImageModel', dogSchema);

export {Dog};
