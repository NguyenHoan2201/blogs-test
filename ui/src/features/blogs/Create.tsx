import { useState } from "react";
import { Editor } from '../../components/Editor';
import { createBlog } from "../../api/blogs";
import { useNavigate } from "react-router-dom";

export function BlogNew() {
  const [title, setTitle] = useState("");
  const [shortContent, setShortContent] = useState("");
  const [content, setContent] = useState("");
  const [thumImg, setThumImg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const {id} = await createBlog({
      title,
      shortContent,
      content,
      thumImg,
    })

    navigate(`/blogs/${id}`);

  }

  const onChangeThumImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setThumImg(reader.result?.toString()?? '');
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <div className="px-8">
      <h2 className="font-semibold text-3xl text-gray-900">Write your nice blog post</h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Blog title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="your blog's title"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Write a short content
                </label>
                <div className="mt-2">
                  <textarea
                    id="short-content"
                    name="shortContent"
                    value={shortContent}
                    onChange={e => setShortContent(e.target.value)}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="this is short content of your blog"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                  Choose a nice thumbnail image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {
                      thumImg && (
                        <div className="w-full">
                          <img src={thumImg} />
                        </div>
                      )
                    }
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={onChangeThumImg} />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 3MB</p>
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Your blog content
                </label>
                <Editor value={content} onChange={setContent} />
              </div>

            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold px-8 leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

