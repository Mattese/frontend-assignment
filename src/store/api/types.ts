// COMMON TYPES

export type AccessToken = string;
export type RefreshToken = string;

type UserId = string;
type UserName = string;
type Password = string;

type TodoTitle = string;
type TodoDescription = string;

// AUTH API TYPES

export type RegisterBody = Readonly<{
  username: UserName;
  password: Password;
}>;

export type RegisterResponse = Readonly<{
  refreshToken: RefreshToken;
  accessToken: AccessToken;
}>;

export type LoginBody = Readonly<{
  username: UserName;
  password: Password;
}>;

export type LoginResponse = Readonly<{
  refreshToken: RefreshToken;
  accessToken: AccessToken;
}>;

export type UserResponse = Readonly<{
  id: UserId;
  username: UserName;
  createdAt: string;
}>;

export type RefreshTokenBody = Readonly<{
  refreshToken: RefreshToken;
}>;

export type RefreshTokenResponse = Readonly<{
  accessToken?: AccessToken;
}>;

// TODO API TYPES

export type CreateTodoBody = Readonly<{
  title: TodoTitle;
  description?: TodoDescription;
}>;

export type TodoResponse = Readonly<{
  id: string;
  title: TodoTitle;
  userId: UserId;
  completed: boolean;
  createdAt: string;
  description?: TodoDescription;
}>;
