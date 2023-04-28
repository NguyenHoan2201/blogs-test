import { Link, useLocation } from "react-router-dom";
import { Blog } from "../models/blog";

export default function BlogCard(props: Blog) {
  const location = useLocation();
  return (
    <div
      className="grid grid-cols-1 mb-6 md:grid-cols-[70%,1fr] pb-6 gap-4 border-b">
      <div>
        <h2 className="mt-1 mb-3 text-xl font-semibold text-gray-800">
          <Link className="underline" to={`/${location.pathname ==='/' ? 'blogs': location.pathname }/${props.id}`}>
            {props.title}
          </Link>
        </h2>
        <p className="mb-3 text-sm text-gray-600">
          {props.shortContent}
        </p>
        <div className="flex items-center ">
          <span className="text-xs text-gray-600 mr-4">By {props.createdBy}</span>
          <span className="text-xs text-gray-600">{props.createdAt}</span>
        </div>
      </div>
      <div>
        <img src={props.thumImg} alt=""
          className="object-cover w-full rounded-md h-80 md:h-44" />
      </div>
    </div>
  )
}