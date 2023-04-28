export interface CreateBlog{
  title: string;
  thumImg: string;
  content: string;
  shortContent: string;
}

export interface Blog{
  id: string;
  title: string;
  thumImg: string;
  content: string;
  shortContent: string;
  createdBy: string;
  createdAt: string;
}
