//запросы

const Endpoints ={
   //все запросы объединила 
   AUTH:{
    Login:'/login',
    REFRESH:'/refresh', // токин протухнет делаю его рефреш
LOGOUT:'/logout',//когда надо выйти
PROFITLE:'/profitle'//проверить  то что всё работает делаю запрос профиля
   
}
}

export default Endpoints;