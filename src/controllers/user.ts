import fastify from "fastify";
import { IUser } from "../interfaces/user";
import User from "../models/user";
import { UserService } from "../services/user";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class UserController {

    public Errores:Error[]=[];
    public Service:UserService = new UserService();
    public bcript = bcrypt;
    public jwt = jwt;

    public async register(
        email:string,
        password:string, 
        name:string, 
        last_name:string,
        mobile_phone: string,
        about:string,
        active:boolean
        ){
        try{

            const exists = this.Service.find(email);
            if(!(email && password && name && last_name && mobile_phone)){
                console.log(`Todos los campos son obligatorios`);
            }
            console.log(exists.getQuery());
            const encryptedPassword = await this.bcript.hash(password,10);
            let user = new User();
            user.email= email;
            user.password = encryptedPassword;
            user.name= name;
            user.last_name= last_name;
            user.mobile_phone = mobile_phone;
            user.about = about;
            user.active = active;

            console.log(user);
            
            let newUser = await this.Service.register(user)
            if(newUser._id){
                const token = this.jwt.sign(
                    {
                        user_id: newUser._id,
                        email,
                        active
                    },
                    'apiHeader',
                    {
                        expiresIn: '2h'
                    }
                );
                newUser.token = token;
                newUser.save();
            return token;
            }else{
                return null;
            }
        }catch(err){
            console.error(err);
        }
    }

    public find(email:string){
        const user = User.findOne({email: email});
        return user;
    }
}