import { Route, Routes } from "react-router-dom"
import {Login} from '../pages/Login'
import { Register } from "../pages/Register"
import { Dashboard } from "../pages/Dashboard"

export const RouterApp =()=>{
  return(
  
    <Routes>
      <Route path='/'element={<Login />}
        />
          <Route path='/register'element={<Register />}
        />
         <Route path='/dashboard'element={<Dashboard />}
        />
    </Routes>
   
  )
}