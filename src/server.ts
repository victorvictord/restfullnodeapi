import fastify from 'fastify';
import * as mongoose from 'mongoose';
import { UserController } from './controllers/user';
import {TypeBoxTypeProvider} from '@fastify/type-provider-typebox';
import { IUser } from './interfaces/user';

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();
// Declare a route
server.get('/', async (request, reply) => {
  return { hello: 'world' }
});


server.post<{Body:IUser, Reply: any}>(
  '/register',
  (request, reply)=>{
  let controler = new UserController();
  const {email,password,name, last_name, about, mobile_phone} = request.body;
  const response = controler.register(email, password, name, last_name, mobile_phone, about, true);
  reply.status(200).send(response);
});

mongoose.set('toJSON', {
    virtuals: true,
    transform: (_:any, converted:any)=>{
      delete converted._id;
    }
});
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/Api')
  .then(()=>{
    console.log(`Conectado a la base de datos mongoDB!`)
  })

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Servidor escuchando en ${address}`);
  })
