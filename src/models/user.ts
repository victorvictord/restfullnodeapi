import {Schema, model} from 'mongoose';
import {IUser} from '../interfaces/user';

export const userSchema = new Schema({
    email: {type: String, required:[true, `El campo email es requerido.`]},
    password: {type: String, required:[true, `El campo password es obligatorio.`]},
    name: {type: String, required:[true, `El campo nombre es obligatorio.`]},
    last_name: {type: String, required:[true, `El campo nombre es obligatorio.`]},
    mobile_phone: {type: String, required: [true, `El campo celular es obligatiorio.`]},
    about: {type:String},
    active: {type:Boolean, default: false},
    active_until: {type:Date, default: null},
    created_at: {type:Date, default: Date.now},
    token: {type: String}
});

const User = model<IUser>("users", userSchema);

export default User;