// интерфейсы для login что отправляем при заппросе и чтог получить в ответ

export interface ILoginRequest {
    login:string
    password:string
}


// в ответ ожидаю 
export interface ILoginResponse{
   accessToken:string // с помощью него подписывать все запросы чтобы запросы приходили  
}
