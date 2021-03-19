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
            <h3 className="sing-in__title">Вход</h3>
            <form onSubmit={handleSubmit} className="sing-in__form" noValidate>
                <input
                    value={data.email}
                    id='sing-in-email-input'
                    className="sing-in__input sing-in__input_type_email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                />

                <input
                    value={data.password}
                    id='sing-in-password-input'
                    className="sing-in__input sing-in__input_type_password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Пароль"
                />

                <button type="submit" className="sing-in__save" value="Зарегистрироваться">Войти</button>
            </form>
        </section>
    );
}
export default Login;