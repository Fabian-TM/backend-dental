import { Document, Number, Schema } from 'mongoose';

export interface User {
  _id?: any;
  name: string;
  cellphone?: Number;
  dni: string;
  email: string;
  sex: string;
  company: string;
  accountId: Schema.Types.ObjectId;
  userCreationDate: Date;
}

export interface UserModel extends User, Document {}