import style from './Header.module.css';
import logobranca from '../../assets/img/logo_branca.png';
import{CgProfile} from 'react-icons/cg'
import {useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/Auth';

export function Header(){
  const [open, setOpen]=useState(false);
const {signOut}=useAuth()
  const navigate = useNavigate();
  return(
    <header className={style.background}>

<div className={style.image} onClick={() => navigate('/dashboard')}>
<img src={logobranca} alt="logo"/>
<span>Here HairDress</span>

</div>
<div className={style.profile}>
  <div className={style.dropdow} onClick={()=>setOpen(!open)}>
  <CgProfile size={18} color="white"/>
  <span>Perfil</span>
  <ul className={`${style.dropdowMenu} ${open && style.open}`}>
    <li className={style.dropdowMenuItem}>Agendamento</li>
    <li className={style.dropdowMenuItem}>Editar Perfil</li>
    <li className={style.dropdowMenuItem} onClick={signOut}>Sair</li>
 
  </ul>
  </div>
</div>
    </header>
  );
}