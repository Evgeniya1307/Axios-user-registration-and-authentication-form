import { ILoginRequest, ILoginResponse } from './auth/types';
import { axiosInstance } from './auth/instance';
import Endpoints from './endpoints';
import { AxiosPromise } from 'axios';

//запрос
export const login=(params:ILoginRequest):AxiosPromise<ILoginResponse>=>axiosInstance.post(Endpoints.AUTH.Login)//создаю запрос пост 1параметр ендпоинтс куда нужно стучаться, 2параметр отдаю параметры

//:AxiosPromise<ILoginResponse> описала что вернёт на выход аксиос промис и вернётILoginResponse 