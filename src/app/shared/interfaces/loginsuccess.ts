export interface successLogin {
  message: string;
  user: UserLogin;
  token: string;
}

 export interface UserLogin {
  name: string;
  email: string;
  role: string;
}