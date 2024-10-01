import { Document, Schema } from 'mongoose';

export interface Account {
    password: string;
    provider: string;
    type: string;
    userId: Schema.Types.ObjectId;
    newAccount: boolean;
    isRegistered: boolean;
    refreshToken: string;
    passwordRecoveryToken: string;
    roles: string [];
}

export interface AccountModel extends Account, Document {}