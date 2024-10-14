import React from 'react'
import authService from '../appwrite/auth'
import { logout } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = () =>{
        authService.logout()
        .then(()=>{
          dispatch(logout())
          navigate('/')
        })
        .catch(()=>console.log("Appwrite :: logout :: error ::"+error))
    }

  return (
        // <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>Logout</button>
        <button className={`inline-bock px-6 py-2 duration-200 text-white hover:bg-red-500 bg-red-600 rounded-full`} onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn