import mongoose, { Schema } from 'mongoose';
import { UserModel } from '../models';

export const userSchema: Schema<UserModel> = new Schema({
    name: {
        type: String,
        required: true,
    },
    cellphone: {
        type: Schema.Types.Number,
        required: false,
    },
    dni: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    accountId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Account', 
        required: false 
    },
    userCreationDate: {
        type: Date,
        default: Date.now,
    },

}, { versionKey: false });

export default mongoose.model<UserModel>('User', userSchema);
