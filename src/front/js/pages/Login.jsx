import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

 export const Login = () => {
  const navigate = useNavigate()
  const {store, actions} = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { "email" : email,
      "password" : password };
    console.log(dataToSend)
    const url = 'https://upgraded-chainsaw-9769jgpgjqrqcxv7g-3001.app.github.dev/api/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await  fetch (url, options);
    if (!response.ok){
      console.log('Error:', response.status, response.statusText)
      return
    }
    const data = await response.json();
    localStorage.setItem('token', data.access_token)
    actions.settingLogin()
    navigate('/')
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-3 display-5">
                Iniciar sesión
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3 h6">
                  <label htmlFor="email" className="mb-1">
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="password" className="mb-1">
                    Contraseña:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-5">
                    Iniciar sesión
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

