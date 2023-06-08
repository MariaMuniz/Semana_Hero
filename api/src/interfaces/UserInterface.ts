 export interface ICreate{
  name:string;
  email:string;
  password:string;
}

export interface IUpdate{
  name:string;
  newPassword:string;
  oldPassword:string;
  avatar_url?:string;
  user_id:string;
}