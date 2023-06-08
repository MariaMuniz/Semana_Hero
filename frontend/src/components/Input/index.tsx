
import {forwardRef,ForwardRefRenderFunction, ReactNode } from 'react';
import style from './input.module.css'


interface IInput{
  placeholder:string;
  type:'text' | 'password'|'date';
  error?:string;
  Icon?:ReactNode;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInput> =(
  {placeholder, type, error, Icon, ...rest},
  ref,
 ) =>{
return(
  <div className={style.container}>
<label htmlFor=''>
  <i aria-hidden="true"> {Icon}</i>
  <input type={type} placeholder={placeholder} ref ={ref}{...rest}/>
</label>
{error && <span>{error}</span>}
  </div>
);
};
export const Input= forwardRef(InputBase)
