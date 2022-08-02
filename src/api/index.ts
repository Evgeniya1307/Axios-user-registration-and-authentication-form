import { ILoginRequest } from './auth/types';
import { axiosInstance } from './auth/instance';
import Endpoints from './endpoints';

//запрос
export const login=(params:ILoginRequest)=>axiosInstance.post(Endpoints.AUTH.Login)//создаю запрос пост 1параметр ендпоинтс куда нужно стучаться, 2параметр отдаю параметры