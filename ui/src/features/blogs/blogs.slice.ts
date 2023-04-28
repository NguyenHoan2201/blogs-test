import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { BlogList, GetBlogsFilter, getMyBlogs, getPeopleBlogs } from "../../api/blogs";

interface State {
  myBlogs: BlogList;
  peopleBlogs: BlogList;
  isLoading: boolean;
  error: any;
}
const initialState: State = {
  myBlogs: {
    data: [],
    count: 0
  },
  peopleBlogs:  {
    data: [],
    count: 0
  },
  isLoading: false,
  error: null,
};

export const myBlogsThunk = createAsyncThunk("my-blogs", async (opts: GetBlogsFilter) => {
    return await getMyBlogs(opts);
});

export const peopleBlogsThunk = createAsyncThunk("people-blogs", async (opts: GetBlogsFilter) => {
  return await getPeopleBlogs(opts);
});

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
      builder
        .addCase(myBlogsThunk.pending, state => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(myBlogsThunk.fulfilled, (state, action: PayloadAction<BlogList>) => {
          state.isLoading = false;
          state.error = null;
          state.myBlogs = {...action.payload};
        })
        .addCase(myBlogsThunk.rejected, (state, action) => {
          state.isLoading = false;
          state.myBlogs ={
            data: [],
            count: 0
          }
          state.error = action.payload;
        })
        .addCase(peopleBlogsThunk.pending, state => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(peopleBlogsThunk.fulfilled, (state, action: PayloadAction<BlogList>) => {
          state.isLoading = false;
          state.error = null;
          state.peopleBlogs = {...action.payload};
        })
        .addCase(peopleBlogsThunk.rejected, (state, action) => {
          state.isLoading = false;
          state.peopleBlogs ={
            data: [],
            count: 0
          }
          state.error = action.payload;
        });
    },
});

export const selectMyBlogs = (state: RootState) => state.blog.myBlogs;
export const selectPeopleBlogs = (state: RootState) => state.blog.peopleBlogs;
export const isLoading = (state: RootState) => state.blog.isLoading;
export const error = (state: RootState) => state.blog.error;
export default blogsSlice.reducer;
