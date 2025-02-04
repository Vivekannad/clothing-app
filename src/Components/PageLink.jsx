import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const PageLink = ({link,to}) => {

  const theme = useSelector(state => state.theme.theme);

  return (
    <>
        <li className="p-1 rounded-lg transition-all duration-200 cursor-pointer hover:bg-base-300 md:w-auto w-full">
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block w-full px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive ? "bg-neutral-700 text-white shadow-md" : ` hover:text-black ${theme === "light" ? "hover:bg-neutral-200" : "hover:bg-neutral-100"}`
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