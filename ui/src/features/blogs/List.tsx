import { useEffect, useState } from "react"
import BlogCard from "../../components/BlogCard"
import { useLocation, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { myBlogsThunk, peopleBlogsThunk, selectMyBlogs, selectPeopleBlogs } from "./blogs.slice";
import { GetBlogsFilter } from "../../api/blogs";

export function Blogs() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const myBlogs = useAppSelector(selectMyBlogs);
  const peopleBlogs = useAppSelector(selectPeopleBlogs);
  const [order, setOrder] = useState("desc");
  const [searchParams] = useSearchParams();

  const getBlogs = () => {
    const opts: GetBlogsFilter ={
      sortBy: 'createdAt',
      orderBy: order,
    }
    if(searchParams.get('filter')) {
      opts.title = searchParams.get('filter') ?? ''
    }

    if (isMyBlogs()) {
      dispatch(myBlogsThunk(opts))
    } else {
      dispatch(peopleBlogsThunk(opts))
    }
  }

  const isMyBlogs = () => {
    return location.pathname.includes('my-blogs')
  }

  useEffect(() => {
    getBlogs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, order, location.search]);

  return (
    <section className="flex items-center bg-white font-poppins dark:bg-gray-900 ">
      <div className="justify-center flex-1 max-w-4xl px-4 py-4 mx-auto text-left">
        <div className="text-center">
          <h1 className="text-3xl font-bold capitalize dark:text-white">
            {
              isMyBlogs() ? 'My Blogs' : 'People Blogs'
            }
          </h1>
          <div className="pt-3">
            <button onClick={()=>setOrder('desc')} className={`${order === 'desc' ? 'bg-blue-100 text-blue-800': ''} text-xs font-medium mr-2 px-3 py-0.5 rounded-full`}>newest first</button>
            <button onClick={()=>setOrder('asc')} className={`${order === 'asc' ? 'bg-blue-100 text-blue-800': ''} text-xs font-medium mr-2 px-3 py-0.5 rounded-full`}>oldest first</button>
          </div>
        </div>
        {
          (isMyBlogs() ? myBlogs.data : peopleBlogs.data).map((blog,) => (
            <BlogCard key={blog.id}  {...blog} />
          ))
        }
      </div>
    </section>
  )
}
