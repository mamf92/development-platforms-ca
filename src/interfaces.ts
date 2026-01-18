export interface User {
  id: number;
  email: string;
  password?: string;
}

export interface UserResponse {
  id: number;
  email: string;
}

export interface Article {
  id: number;
  title: string;
  body: string;
  user_id: number;
  created_at: string;
}

export interface ArticleWithUser extends Article {
  email: string;
}

export type CreateArticleBody = {
  title: string;
  body: string;
  category: string;
};

export type RegisterBody = {
  email: string;
  password: string;
};

export type LoginBody = {
  email: string;
  password: string;
};
