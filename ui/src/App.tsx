import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './features/auth/Login'
import { Header } from './components/Header'
import { Blogs } from './features/blogs/List'
import { BlogNew } from './features/blogs/Create'
import BlogDetail from './features/blogs/Detail'
import useCookieToken from './hooks/token'
import { useAppDispatch } from './store'
import { ifAuthThenRenewThunk } from './features/auth/auth.slice'

function App() {
  const hasToken = useCookieToken();
  const dispatch = useAppDispatch();
  if (hasToken) {
    dispatch(ifAuthThenRenewThunk())
  }
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="blogs">
            <Route index element={<Blogs />} />
            <Route path="new" element={<BlogNew />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>
          <Route path="my-blogs">
            <Route index element={<Blogs />} />
            <Route path="new" element={<BlogNew />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>

          <Route path="login" element={<Login />} />


          <Route path="/" element={<Blogs />} />
        </Routes>
        <footer className='py-16 text-center'>
        if backend is running and you've created dummy data using : yarn seed, you can click sign in without any extra effort

          © {new Date().getFullYear()}, Blogs test
        </footer>
      </BrowserRouter>
    </>
  )
}

export default App
