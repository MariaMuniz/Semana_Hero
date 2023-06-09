import { ReactNode, createContext} from "react";
import { api } from "../server";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import {useNavigate } from 'react-router-dom';
interface IAuthProvider{
  children: ReactNode;
}

interface IAuthContextData{
  sigIn:({email, password}: ISigIn)=> void
}

interface ISigIn{
  email:string;
  password:string;

}


export const AuthContext = createContext({}as IAuthContextData)

export  function AuthProvider({children}:IAuthProvider){
  const navigate= useNavigate()
async function sigIn({email, password}: ISigIn){
  try {
    const {data} = await api.post('/users/auth',{
      email,
      password,
    });
    const {token, refresh_token, user}=data;
    const userData={
      name:user.name,
      email:user.email,
//avatar_url:user.avatar_url,
    }

    localStorage.setItem('token:semana-heroi', token);
    localStorage.setItem('refresh-token:semana-heroi', refresh_token);
    localStorage.setItem('user:semana-heroi',JSON.stringify(userData));
    navigate('/dashboard');
    toast.success(`Seja bem vindo!,${userData.name}`)
    return data;
  } catch (error) {
  
    if(isAxiosError(error)){
      toast.error(error.response?.data.message);
    }else{
      toast.error('Não conseguimos realizar o login')
    }
  }
}
return(
    <AuthContext.Provider value ={{sigIn}}>{children}</AuthContext.Provider>
  )
}