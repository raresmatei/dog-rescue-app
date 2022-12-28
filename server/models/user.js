import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema(
    {
        role: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 64,
        },
        city: {
            type: String,
            required: false,
        },
        street: {
            type: String,
            required: false,
        },
        number: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);
export default mongoose.model('User', userSchema);
