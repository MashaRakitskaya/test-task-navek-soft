import { useState } from 'react';

function Register({ onRegister }) {
    //исходные данные
    const initialData = {
        // avatar: '',
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
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
        onRegister(data.email, data.name, data.password, data.password_confirmation);
    };


    return(
        <section className="sign-up">
            <h3 className="sign-up__title">Регистрация</h3>
            <form onSubmit={handleSubmit} className="sign-up__form" noValidate>
                {/* <input
                    value={data.avatar}
                    id='sign-up-avatar-input'
                    className="sign-up__input sign-up__input_type_avatar"
                    type="url"
                    name="avatar"
                    onChange={handleChange}
                    placeholder="Ссылка на аватарку"
                /> */}

                <input
                    value={data.email}
                    id='sign-up-email-input'
                    className="sign-up__input sign-up__input_type_email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email"
                />

                <input
                    value={data.name}
                    id='sign-up-name-input'
                    className="sign-up__input sign-up__input_type_name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="Имя"
                />

                <input
                    value={data.password}
                    id='sign-up-password-input'
                    className="sign-up__input sign-up__input_type_password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Пароль"
                />

                <input
                    value={data.password_confirmation}
                    id='sign-up-password-input'
                    className="sign-up__input sign-up__input_type_password-сonfirmation"
                    type="password"
                    name="password_confirmation"
                    onChange={handleChange}
                    placeholder="Подтвердите пароль"
                />

                <button type="submit" className="sign-up__save" value="Зарегистрироваться">Зарегистрироваться</button>
            </form>
        </section>
    );
}
export default Register;