import mongoose, { Schema } from 'mongoose';
import { AccountModel } from '../models/account';

const accountSchema: Schema<AccountModel> = new Schema({
    password: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
        default: 'credentials'
    },
    type: {
        type: String,
        required: true,
        default: 'oauth'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    newAccount: {
        type: Schema.Types.Boolean,
        default: true
    },
    isRegistered: {
        type: Schema.Types.Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        default: null
    },
    passwordRecoveryToken: {
        type: String,
        default: null
    },
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin', 'manager', 'worker'],
        }],
        default: ['user'],
    },

}, { versionKey: false });

export default mongoose.model<AccountModel>('Account', accountSchema);
