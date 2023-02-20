import {Date, Document, Types} from 'mongoose';

export interface IUser extends Document<Types.ObjectId> {
    email: string;
    password: string;
    name: string;
    last_name: string;
    mobile_phone: string;
    about: string;
    active: boolean;
    actived_at: Date;
    active_until: Date
    created_at: Date;
    token: string;
}
