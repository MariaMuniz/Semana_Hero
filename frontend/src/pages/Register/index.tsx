import style from './Register.module.css';
import logo from '../../assets/img/logo.png';
import {Input} from '../../components/Input';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {BsPersonFill}from 'react-icons/bs';
import {AiOutlineMail}from 'react-icons/ai';
import {RiLockPasswordFill}from 'react-icons/ri';


interface IFormValue{
  name:string;
  email:string;
  password:string;
 }

export function Register(){
  const schema = yup.object({
    name:yup
    .string().
    required('Campo obrigatório'),
  
    email:yup
    .string()
    .email('Digite um email válido')
    .required('Campo email obrigatório'),
    password:yup
    .string()
    .min(6, 'minimo 6 caracteres')
    .required('Campo senha obrigatório')
  });
  const { register, handleSubmit,formState:{errors}}=useForm<IFormValue>
  ({resolver: yupResolver(schema),
  });
  const submit =handleSubmit((data) =>{
    console.log(data)
      })


return(
<div className={style.background}>
<div className='container'>
  <p className={style.navigate}>
  <Link to={'/'}>Home</Link>{'>'}Área de Cadastro
  </p>
  <div className={style.wrapper}>
    <div className={style.imageContainer}>
<img src={logo} alt=''/>
  </div>
  <div className={style.card}>
<h2>Área de cadastro</h2>

<form onSubmit={submit}>
<Input
  type='text'

   placeholder='Nome'
  {...register("name",{required:true})}
   error={errors.name && errors.name.message}
   Icon={<BsPersonFill size={20} />}
    />
  <Input
  type='text'
   placeholder='email'
  {...register("email",{required:true})}
   error={errors.email && errors.email.message}
   Icon={<AiOutlineMail size={20}/>}
    />
  <Input 
  type='password'
  placeholder='senha'
  {...register("password",{required:true})}
  error={errors.password && errors.password.message}
  Icon={<RiLockPasswordFill size={20}/>}
   />
  <Button  text="Cadastrar"/>
 </form>
 <div className={style.register}>
 <span>
  Já tem cadastro? <Link to={'/'}>Voltar página inicial</Link>
 </span>
   </div>
   </div>
   </div>
   </div>
  </div>


);
}