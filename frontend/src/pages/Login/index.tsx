
import style from './Login.module.css';
import logo from '../../assets/img/logo.png';
import {Input} from '../../components/Input';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import {AiOutlineMail}from 'react-icons/ai';
import {RiLockPasswordFill}from 'react-icons/ri';


 interface IFormValue{
  email:string;
  password:string;
 }

export function Login(){
  const schema = yup.object({
    email:yup
    .string()
    .email('Digite um email válido')
    .required('Campo email obrigatório'),
    password:yup
    .string()
    .required('Campo senha obrigatório')
  });
  const { register, handleSubmit,formState:{errors}}=useForm<IFormValue>
  ({resolver: yupResolver(schema),
  });
  const submit =handleSubmit((data) =>{
console.log(data)
  })
  return(
    <div className={style.background} >

<div className={`container ${style.container}`}>
<div className={style.wrapper}>
  <div>
<img src={logo} alt=''/>
  </div>
  <div className={style.card}>
<h2>Olá, Seja bem-vindo!</h2>

<form onSubmit={submit}>
  <Input
  type='text'
   placeholder='email'{...register("email",{required:true})}
   error={errors.email && errors.email.message}
   Icon={<AiOutlineMail size={20}/>}
    />
  <Input 
  type='password'
  placeholder='senha'{...register("password",{required:true})}
  error={errors.password && errors.password.message}
  Icon={<RiLockPasswordFill size={20}/>}
   />
  <Button text='Entrar'/>
 </form>
 <div className={style.register}>
 <span>Ainda não tem conta? <Link to={'/register'}>Cadastre-se</Link></span>
   </div>
   </div>
  </div>
  </div>
</div>
  )
}