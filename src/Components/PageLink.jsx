import React from 'react'
import { NavLink } from 'react-router-dom'

const PageLink = ({link,to}) => {
  return (
    <>
        <li className="p-1 rounded-lg transition-all duration-200 cursor-pointer hover:bg-base-300">
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block w-full px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive ? "bg-neutral-700 text-white shadow-md" : "text-gray-700 hover:text-black"
      }`
    }
  >
    {link}
  </NavLink>
</li>

    </>
  )
}

export default PageLink