import { IUser } from "../interfaces/user";
import User from "../models/user";

export class UserService {

    public async register(user: IUser){
        const newUser = new User({
            email: user.email.toLowerCase(),
            password: user.password,
            name: user.name,
            last_name: user.last_name,
            mobile_phone: user.mobile_phone,
            about: user.about,
            active: user.active,
            active_until: null
        });
        return newUser.save();
    }

    public find(email:string){
        const user = User.findOne({email: email});
        return user;
    }
}