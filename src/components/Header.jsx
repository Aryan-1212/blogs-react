import React from 'react'
import { useSelector } from 'react-redux'
import {Container, Logo, LogoutBtn} from './'
import { Link, useNavigate, useLocation } from 'react-router-dom'

function Header() {

  const location = useLocation()
  const authStatus = useSelector((state)=>state.authSlice.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name:'Home',
      url:'/',
      active:true,
    },
    {
      name:'Login',
      url:'/login',
      active:!authStatus,
    },
    {
      name:'Signup',
      url:'/signup',
      active:!authStatus,
    },
    {
      name:'My Posts',
      url:'/my-posts',
      active:authStatus,
    },
    {
      name:'Add Post',
      url:'/add-post',
      active:authStatus,
    },
    {
      name:'Profile',
      url:'/profile',
      active:authStatus,
    }
  ]
  return (
    <header className='py-3 shadow bg-[#00afb9]'>
      <Container>
        <nav className='flex'>
          <div className='mr-4 '>
            <Link to='/'>
              <Logo width='200px' />
            </Link>
          </div>
          <ul className='flex ml-auto text-xs md:text-lg'>
            {navItems.map((item)=>(
              item.active? (
                <li key={item.name} className='flex justify-center items-center'>
                  <button
                    onClick={()=>navigate(item.url)}
                    className={`${location.pathname == item.url? 'bg-blue-100':null} inline-block px-2 sm:px-5 md:px-6 py-2 duration-200 hover:bg-blue-100 rounded-full`}
                  >{item.name}</button>
                </li>
              ) : null
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header