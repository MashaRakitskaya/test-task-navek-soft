import React from 'react';
import { useState } from 'react';

function Login({ onLogin }) {
    //исходные данные
    const initialData = {
        email: '',
        password: ''
    };
    const [data, setData] = useState(initialData);

    const handleChange = (event) => {
        const { name, value } = event.target;
        //инпуты определяются по имени, одна функция на несколько инпутов указываем что их нужно различать по имени.
        setData(data => ({
          ...data,
          [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(data.email, data.password);
    };

    return(
        <section className="sing-in">
            <div className="sign-in__content">
                <h3 className="sing-in__title">Вход</h3>
                <form onSubmit={handleSubmit} className="sing-in__form" noValidate>
                    {/* <label className="sing-in__input-label" htmlFor="sing-in-email-input"> */}
                        <input
                            value={data.email}
                            id='sing-in-email-input'
                            className="sing-in__input sing-in__input_type_email"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                            maxLength="255"
                            required 
                        />
                    {/* </label> */}
                    
                    {/* <label className="sing-in__input-label" htmlFor="sing-in-password-input"> */}
                        <input
                            value={data.password}
                            id='sing-in-password-input'
                            className="sing-in__input sing-in__input_type_password"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Пароль"
                            minLength="2"
                            maxLength="255"
                            required
                        />
                    {/* </label> */}
                    

                    <button type="submit" className="sing-in__save" value="Зарегистрироваться">Войти</button>
                </form>
            </div>
            
        </section>
    );
}
export default Login;