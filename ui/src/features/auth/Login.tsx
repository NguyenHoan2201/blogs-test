import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { loginAsync, selectIsLoggedin } from "./auth.slice";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("user1@gmail.com");
  const dispatch = useAppDispatch();
  const isLoggedin = useAppSelector(selectIsLoggedin)
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    await dispatch(loginAsync(email));
  }

  useEffect(()=>{
    if(isLoggedin){
    navigate('/')
    }
  }, [isLoggedin, navigate])
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input type="email" name="email" id="email" value={email} onChange={e=> setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <span>for this demo, password I will ignore password</span>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
              </div>
              if backend is running and you've created dummy data using : yarn seed, you can click sign in without any extra effort
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}