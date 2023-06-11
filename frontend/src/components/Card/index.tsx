
import style from '../Card/Card.module.css';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {AiOutlineEdit} from 'react-icons/ai';
import { getHours, isAfter } from 'date-fns';


interface ISchedule{
  name:string;
  phone:string;
  date:Date;
  id:string;
}




export const Card =({name, date, phone, id}:ISchedule)=>{

  const isAfterDate = isAfter(new Date(date), new Date());
let phoneFormated= phone.replace(/\D/g,'');
phoneFormated = phoneFormated.replace(
  /{\d{2}\d{5}\d{4}}/,
'($1) $2-$3');

  return(
  <div className={style.background}>
   <div>
    <span className={`${!isAfterDate && style.disabled}`}>
    {getHours(new Date(date))}</span>
    <p>{name}- {phoneFormated}</p>
   </div>
   <div className={style.icons}>
<RiDeleteBin6Line size={18} color='red'/>
<AiOutlineEdit size={18} color='#1e3a8a'/>
   </div>
  </div>
  );
};