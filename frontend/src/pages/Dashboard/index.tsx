import style from './Dashboard.module.css';
import { Header } from "../../components/Header"
import {useAuth} from "../../hooks/Auth";
import {DayPicker} from 'react-day-picker'
import 'react-day-picker/dist/style.css';
import { Card } from '../../components/Card';
import { useEffect, useState } from 'react';
import { ptBR } from 'date-fns/locale';
import { isToday, format } from 'date-fns';
import { api } from '../../server';

interface ISchedule{
  name:string;
  phone:string;
  date:Date;
  id:string;
}
export function Dashboard(){
  const {user}=useAuth();
  const [date, setDate]=useState(new Date());
  const [schedules, setSchedules]= useState<Array<ISchedule>>([]);
      const isWeekend =(date:Date) =>{
   const day= date.getDay();
    return day === 0 || day === 6;
      };
      const isWeekDay=(date:Date)=>{
        const day= date.getDay();
        return day != 0 && day != 6;
      };

      const handleDateChange=(date:Date)=>{
        setDate(date);
      };


      useEffect(()=>{
   api.get('/schedules', {
    params:{
      date,
   },
   }).then((response)=>{
    console.log(response);
    setSchedules(response.data);
   }).catch((error)=>console.log(error));
 
      },[date]);

  return(
    <div className="container">
    <Header/ >
    <div className={style.dataTitle}>
      <h2>Bem vindo(a),{user.name}</h2>
      <p>Esta é sua lista de horários {isToday(date) && <span>de hoje, </span>} 
      dia {format(date,'dd/MM/yyy')}
      </p>
    </div>
    <h2 className={style.nextschedule}>Próximos horários</h2>
   
    <div className={style.schedule}>
      <div className={style.cardwrapper}>

      {schedules.map((schedule,index) =>
       <Card key={index} 
        date={schedule.date} 
        name={schedule.name} 
        phone={schedule.phone} 
        id={schedule.id} />
      )};
     
      </div>
      <div className={style.picker}>
<DayPicker
 className={style.calendary}
 classNames={{
  day:style.day,
}}
selected={date} 
modifiers={{available: isWeekDay}}
mode="single"
modifiersClassNames={{
  selected:style.selected,
}}
fromMonth={new Date}
locale={ptBR}
 disabled={isWeekend}
 onDayClick={handleDateChange}
 />
    </div>
    </div>
    </div>
  )
}