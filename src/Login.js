import { useRef, useState, useEffect,useContext  } from "react";
import AuthContext from "./context/AuthProvider";
import axios from './api/axios';


const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
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
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
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
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                {/* сообщение об ощибке и ссылка на ошибку */}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> 
                    <h1>Войти</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label> {/*метка для каждого ввода одно уведомление атоматом получаю атрибут htmlFor он соответвтвует id ввода и имя пол-ля и внутри метки*/}
                       {/*ввод для имени пол-ля*/}
                        <input 
                            type="text"
                            id="username"
                            ref={userRef}//фокус на ввод
                            autoComplete="off" //автозаполнение отключила
                            onChange={(e) => setUser(e.target.value)}//фу-ия внутри свяжет сост-ие пол-ля 
                            value={user} // состояние пользователя
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
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
                            {/*put router link here*/}
                            <a href="#">Зарегистрироваться</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login;

