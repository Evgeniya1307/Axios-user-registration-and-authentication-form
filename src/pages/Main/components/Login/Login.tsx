import React, { FormEvent } from 'react';


const Login =()=>{
    const handleSubmit = (e:FormEvent) => { // в эту фу-ию будет приходить событие 

    }
    return(
        <div>
            <form onSubmit={handleSubmit}>

            </form>
        </div>
    )
}

export default Login;