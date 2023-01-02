import mongoose from 'mongoose';
const { Schema } = mongoose;
const savedDogSchema = new Schema(
    {
        dogId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
export default mongoose.model('SavedDog', savedDogSchema);
