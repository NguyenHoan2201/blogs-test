import $http from './http';
import {packOpts} from '../helpers'
import { Blog, CreateBlog } from '../models/blog';
export const blogsSortOptions = ['createdAt'];
export const blogsOrderByOptions = ['desc', 'asc'];

export interface GetBlogsFilter {
  base?: number;
  limit?: number;
  title?: string;
  author?: string;
  sortBy?: typeof blogsSortOptions[number];
  orderBy?: typeof blogsOrderByOptions[number];
}

export interface BlogList {
  data: Blog[];
  count: number;
}
export async function getPeopleBlogs(opts: GetBlogsFilter): Promise<BlogList> {
  return await $http.get(`/blogs${packOpts(opts)}`);
}

export async function getMyBlogs(opts: GetBlogsFilter): Promise<BlogList> {
  return await $http.get(`/blogs/of-mine${packOpts(opts)}`);
}

export async function getBlog(id: string): Promise<Blog> {
  return await $http.get(`/blogs/${id}`);
}

export async function createBlog(data: CreateBlog): Promise<Blog> {
  return await $http.post('/blogs', {data});
}