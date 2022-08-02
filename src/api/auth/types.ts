// интерфейсы для login что отправляем при заппросе и чтог получить в ответ

export interface ILoginRequest {
    login:string
    password:string
}


// в ответ ожидаю 
export interface ILoginResponse{
   accessToken:string // с помощью него подписывать все запросы чтобы запросы приходили  
}


// буду хранить в куки так безопаснее , access будет хр-ся в самом приложении, можно хранить в LocalStorage но это не безопасно так как все скрипты на этой странице будут иметь к ним доступ 