import { UsersRepository } from "../repositories/UsersRepository"
import { ICreate, IUpdate } from "../interfaces/UserInterface"
import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

class UsersServices{
  private  usersRepository:UsersRepository;
  constructor(){
    this.usersRepository = new UsersRepository
  }
  async create({name, email, password}:ICreate){
    const findUser = await this.usersRepository.findUserByEmail(email)
    if(findUser){
      throw new Error('User exists')
      
    }
    const hasPassword= await hash(password, 10)
  const create = this.usersRepository.create({
    name, email, password: hasPassword
  });
  return create;
}


 async update({
  name,
   oldPassword,
    newPassword,
   
    user_id
}:IUpdate){
  let password
  if(oldPassword && newPassword){
    const findUserById = await this.usersRepository.findUserById(user_id);
    if(!findUserById){
      throw new Error('User not found.');
    }
    const passwordMatch = compare(oldPassword, findUserById.password);
    if(!passwordMatch){
      throw new Error('Password invalid.');
    }
    password= await hash(newPassword, 10)
    await this.usersRepository.updatePassword(newPassword,user_id);
  }
  await this.usersRepository.update(name, user_id, avatar_url);
  return {
    message:'User update successfully.'
  }
 
}


async auth(email:string, password:string){
const findUser = await this.usersRepository.findUserByEmail(email);
if(!findUser){
  throw new Error('User or password invalid.');
}
const passwordMatch = compare(password, findUser.password)
if(!passwordMatch){
  throw new Error('User or password invalid.');
}
let secretKey:string | undefined= process.env.ACCESSS_KEY_TOKEN;
if(!secretKey){
  throw new Error('There is no token key');
}
const token = sign({email},secretKey ,{
subject: findUser.id, 
expiresIn:60*15, ////15 min

});
const refreshToken =sign({email},secretKey ,{
  subject: findUser.id, 
  expiresIn:'7d', ////7 dias
});

return{
  token,
  refresh_token:refreshToken,
  user:{
    name: findUser.name,
    email:findUser.email,
  },
}

}
async refresh(refresh_token:string ){
  if(!refresh_token){
    throw new Error('Refresh token missing')
  }
  let secretKey:string | undefined= process.env.ACCESSS_KEY_TOKEN;
if(!secretKey){
  throw new Error('There is no refres-token key');
}
  const verifyRefreshToken = verify(refresh_token,secretKey)
  const{sub}= verifyRefreshToken;
  const newToken = sign({sub},secretKey,{
    expiresIn:60*15,
  });
  return {token:newToken};
}
}
export {UsersServices}