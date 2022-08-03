import { createContext, useState } from "react";

//контекстный API
//соз-ла контекст и использую состояние
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => { //деструктурирую дочерние элементы
   //соз-ла состояние
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>{/*значения передаю аунтефикация   */}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;