
const jwt = require('jsonwebtoken');
import User from '../models/user';

export default async function verifyToken(token:string){
    try{
        const decoded= jwt.verify(token,'apiHeader');
        const email = decoded.email;
        const user = await User.findOne({email});
        if(user && user._id == decoded.user_id){
            return true;
        }
        return false;
    }catch(err){
        return false;
    }
}