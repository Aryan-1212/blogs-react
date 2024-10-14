import React from 'react'
import { useSelector } from 'react-redux'
import {Container, Logo, LogoutBtn} from './'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

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
      name:'All Posts',
      url:'/all-posts',
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
              <Logo width='100px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item)=>(
              item.active? (
                <li key={item.name} className='flex justify-center items-center'>
                  <button
                    onClick={()=>navigate(item.url)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
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