import React from 'react'
import { NavLink } from 'react-router-dom'

const PageLink = ({link,to}) => {
  return (
    <>
        <li className='p-3 hover:bg-base-300 transition-all rounded-lg duration-200 cursor-pointer'>
              <NavLink to={to} className={({isActive}) => isActive ? 'bg-neutral-700 text-white rounded-lg' : ''} >
              {link}
              </NavLink>
            </li>
    </>
  )
}

export default PageLink