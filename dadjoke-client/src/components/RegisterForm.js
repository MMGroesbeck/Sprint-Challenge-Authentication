import React, { useState } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const Register = (props) => {
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

    const register = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/api/auth/register', credentials)
            .then(res => {
                console.log(res);
                localStorage.setItem("token", JSON.stringify(res.data.payload));
                props.history.push('/protected');
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
          <form onSubmit={register}>
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
            <button>Register</button>
          </form>
        </div>
      );
}

export default Register;