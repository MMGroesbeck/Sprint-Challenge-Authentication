import React, { useState } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
    const [ credentials, setCredentials ] = useState({
        username: "",
        password: ""
    });

    const handleChange = e => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const login = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/api/auth/login', credentials)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", JSON.stringify(res.data.payload));
                props.history.push('/protected');
            })
            .catch(err => console.log(err));
    }

    const goRegister = e => {
        e.preventDefault();
        props.history.push("/register");
    }

    return (
        <div>
            <div onClick={goRegister} className="regbutton">Register New User</div>
          <form onSubmit={login}>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
            <button>Log in</button>
          </form>
        </div>
      );
}

export default Login;