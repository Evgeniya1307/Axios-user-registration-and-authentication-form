import { useRef, useState, useEffect,useContext  } from "react";
import AuthContext from "./context/AuthProvider";
import axios from './api/axios';

//константа url адреса входа /соответсвует серверной части созд-ой 
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);// вытаскиваю что нужно для входа в систему,когда войду в систем уст-лю новое состояние аутенфикации и сохраню в глобальном контексте 
    const userRef = useRef();// ссылка на пользователя
    const errRef = useRef();//когда компонент заг-с и есть ссылка на ошибку


    //состояния 
    const [user, setUser] = useState('');// пользователь
    const [pwd, setPwd] = useState('');//пароль
    const [errMsg, setErrMsg] = useState('');//сообщения об ошибке
    const [success, setSuccess] = useState(false);//сообщения об успехе когда пойду с помощью реагирующего маршрутизатора на страницу по выбору


//ис-ю эффект дважды,в первый раз установить фокус на первом вводе когда компонент заг-ся  

    useEffect(() => {
        userRef.current.focus();// ус-ла фокус на первом вводе
    }, []) // в массиве зависимостей ничего нет , произоёдёт тогда когда компонент заг-ся и состредоточилась на пользовательском вводе



    //2-ой раз говорю что должна уд-ть любое сообщение об ошибке которое может возникнуть если пользователь из-ит состояние пользователя или состояние пароля
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    //дискриптор отправки асинхронная фу-ия
    const handleSubmit = async (e) => { //получит событие а затем использовать событие чтобы небыло перезагрузки страницы предотвращение событий по умолчанию
        e.preventDefault();

        try { 
            //определение ответа и внуть передаю url адрес для входа который присоеденён к базовому url-адресу
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });//установить авторизацию
            setUser('');//установить пользователя
            setPwd('');//ус-ть пароль
            setSuccess(true);//установить успех
        } catch (err) { //gjkexftn jib,r4e 
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? ( //проверяю состояния успеха если успешно то покажу нижний элемент
                <section>
                    <h1>Вы вошли в систему!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : ( //если по существу успех ложен он покажет нашу форму
                <section>
                {/* сообщение об ощибке и ссылка на ошибку */}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                    <h1>Войти</h1>
                    <form onSubmit={handleSubmit}>{/*обработчик отправки дискриптор отправки */}
                        <label htmlFor="username">Username:</label> {/*метка для каждого ввода одно уведомление атоматом получаю атрибут htmlFor он соответвтвует id ввода и имя пол-ля и внутри метки*/}
                       {/*ввод для имени пол-ля*/}
                        <input 
                            type="text"
                            id="username"
                            ref={userRef}//фокус на ввод
                            autoComplete="off" //автозаполнение отключила
                            onChange={(e) => setUser(e.target.value)}//фу-ия внутри свяжет сост-ие пол-ля и это сделает его котролируемым вводом
                            required//требуется 
                        />

                        {/*пароль */}
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password" //точки при заполнении
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Войти</button>
                    </form>
                    <p>
                    Нужна учетная запись?<br />
                        <span className="line">
                            {/*реагирующий маршрутизатор ссылка заполнитель которая введёт к регистрационной форме */}
                            <a href="#">Зарегистрироваться</a>{/*ссылка для регистрации */}
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login;

