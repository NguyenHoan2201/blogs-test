import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import { selectUser } from "../features/auth/auth.slice";
import { debounce } from 'lodash'
import React, { useState } from "react";
export function Header() {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(selectUser);

  const getPath = (val: string) => {
    return location.pathname.includes('my-blogs') ? `/my-blogs?filter=${val}` : `/blogs?filter=${val}`;
  }
  const debouncedSearch = debounce((val) => {
    navigate(getPath(val))
  }, 200);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    debouncedSearch(e.target.value);
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blogs Test</span>
        </a>
        <div className="flex md:order-2">
          <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input value={filter} onChange={handleChange} type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
          </div>
        </div>
        <div className="flex order-2">
          {
            user ? (
              <div className="flex items-center space-x-4">
                {user.displayName}
                <NavLink className="ml-3 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" to="blogs/new">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                  Write new blog
                </NavLink>
              </div>
            ) : <NavLink className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" to="login">Login</NavLink>
          }
        </div>
        <div className="items-center justify-between w-full flex md:w-auto md:order-1" id="navbar-search">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to="" className={({ isActive }) =>
                `block py-2 pl-3 pr-4  rounded hover:bg-gray-100 p-0 hover:text-blue-700 ${isActive ? 'text-blue-700' : 'text-gray-900'}`
              }>Home</NavLink>
            </li>
            {
              user && (
                <li>
                  <NavLink to="my-blogs" className={({ isActive }) =>
                    `block py-2 pl-3 pr-4  rounded hover:bg-gray-100 p-0 hover:text-blue-700 ${isActive ? 'text-blue-700' : 'text-gray-900'}`
                  }>My Blogs</NavLink>
                </li>
              )
            }

          </ul>
        </div>
      </div>
    </nav>

  )
}