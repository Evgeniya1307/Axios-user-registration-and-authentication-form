import React, { FormEvent } from "react";

const Login = () => {
//2 state
const [login, setLogin]=React.useState('');
const[password, setPassword]=React.useState('');

  const handleSubmit = (e: FormEvent) => {
    // в эту фу-ию будет приходить событие
    //отменяю событие чтобы вополнился код
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login">Login:</label>
          <input name="login" type="text" value={login} onChange={e=>setLogin(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        </div>
        <button>Sumbit</button>
      </form>
    </div>
  );
};

export default Login;

//onChange={e=>setLogin}/> приходит событие (е => из е достану значение )