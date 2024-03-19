import { FC } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { logout } from '../store/user/user.slice'
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper'
import { toast } from 'react-toastify'

const Header: FC = () => {
  const isAuth = useAuth()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout({}))
    removeTokenFromLocalStorage('token')
    toast.success('You have successfully logged out')
    navigate('/')
  }
  
  return (
    <header className='flex items-center px-4 py-2 shadow-sm backdrop-blur-sm'>
      <Link to="/">
        <FaBtc size={20}/>
      </Link>

    {/*Menu*/}
    {
      isAuth && (
          <nav className='ml-auto mr-10'>
            <ul className='flex items-center gap-5 ml-auto'>
              <li>
                <NavLink to={'/'} className={({ isActive }) => 
                    isActive ? 'text-white' : 'text-white/60'
                  }
                >
                  Home
                </NavLink>
              </li>
            </ul>
          </nav>
      )
    }
    {
      isAuth ? (
        <button className='btn btn-red' onClick={logoutHandler}>
          <span>Log Out</span>
          <FaSignOutAlt/>
        </button>
      ) : (
        <Link className='py-2 text-white/60 hover:text-white ml-auto' to={'/auth'}>Log In / Sing In</Link>
      )
    }
    </header>

  )
}

export default Header