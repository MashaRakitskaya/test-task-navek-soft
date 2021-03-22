// import React from 'react';
// import { useState } from 'react';

// function Login({ onLogin }) {
//     //исходные данные
//     const initialData = {
//         email: '',
//         password: ''
//     };
//     const [data, setData] = useState(initialData);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         //инпуты определяются по имени, одна функция на несколько инпутов указываем что их нужно различать по имени.
//         setData(data => ({
//           ...data,
//           [name]: value,
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         onLogin(data.email, data.password);
//     };

//     return(
//         <section className="sing-in">
//             <div className="sign-in__content">
//                 <h3 className="sing-in__title">Вход</h3>
//                 <form onSubmit={handleSubmit} className="sing-in__form" noValidate>
//                     {/* <label className="sing-in__input-label" htmlFor="sing-in-email-input"> */}
//                         <input
//                             value={data.email}
//                             id='sing-in-email-input'
//                             className="sing-in__input sing-in__input_type_email"
//                             type="email"
//                             name="email"
//                             onChange={handleChange}
//                             placeholder="Email"
//                             maxLength="255"
//                             required 
//                         />
//                     {/* </label> */}
                    
//                     {/* <label className="sing-in__input-label" htmlFor="sing-in-password-input"> */}
//                         <input
//                             value={data.password}
//                             id='sing-in-password-input'
//                             className="sing-in__input sing-in__input_type_password"
//                             type="password"
//                             name="password"
//                             onChange={handleChange}
//                             placeholder="Пароль"
//                             minLength="2"
//                             maxLength="255"
//                             required
//                         />
//                     {/* </label> */}
                    

//                     <button type="submit" className="sing-in__save" value="Зарегистрироваться">Войти</button>
//                 </form>
//             </div>
            
//         </section>
//     );
// }
// export default Login;



import React from 'react';
import { useState, useEffect } from 'react';

function Login({ onLogin }) {
    //данные email
    const [email, setEmail] = useState('');
    //данные password
    const [password, setPassword] = useState('');

    //были или не были в input
    const [emailDirty, setEmailDirty] = useState(false);
    //были или не были в input
    const [passwordDirty, setPasswordDirty] = useState(false);

    //отражает ошибку email
    const [emailError, setEmailError] = useState('Email не должен быть пустым');
    //отражает ошибку password
    const [passwordError, setPasswordError] = useState('Пароль не должен быть пустым');

    //валидна форма или нет
    const [formValid, setFormValid] = useState(false);

    //валидна форма или нет
    useEffect(() => {
        if(emailError || passwordError) {
            //если возникли ошибки форма не валидна
            setFormValid(false);
        } else {
            //если ошибок нет то форма валидна
            setFormValid(true);
        }
    },[emailError, passwordError]);

    //Пользователь покинул поле ввода
    const handlerBlur = (event) => {
        switch(event.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    };

    //если введен некорректный email то уведомляем
    const emailHandler = (event) => {
        setEmail(event.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(String(event.target.value).toLowerCase())) {
            setEmailError('Некорректный email, пример: text@mail.ru')
            if(!event.target.value) {
                setEmailError('Email не должен быть пустым')  
            }
        } else {
            setEmailError('')
        }
    };

    //если введен короткий password то уведомляем
    const passwordHandler = (event) => {
        setPassword(event.target.value);
        if(event.target.value.length < 8) {
            setPasswordError('Пароль должен быть больше 8-ми символов');
            if(!event.target.value) {
                setPasswordError('Пароль не должен быть пустым')  
            }
        } else if(event.target.value.length > 255) {
            setPasswordError('Пароль должен быть меньше 255-ти символов')
        }
        else {
            setPasswordError('')
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(email, password);
    };

    return(
        <section className="sing-in">
            <div className="sign-in__content">
                <h3 className="sing-in__title">Вход</h3>
                <form onSubmit={handleSubmit} className="sing-in__form" noValidate>
                    
                    <input
                        value={email}
                        id='sing-in-email-input'
                        className="sing-in__input sing-in__input_type_email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        onBlur={event => handlerBlur(event)}
                        onChange={event => emailHandler(event)}
                    />
                    {(emailDirty && emailError) &&
                        <label 
                        className="sing-in__input-label"
                        htmlFor="sing-in-email-input"
                        >
                           {emailError} 
                        </label>
                    }

                    <input
                        value={password}
                        id='sing-in-password-input'
                        className="sing-in__input sing-in__input_type_password"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        required
                        onBlur={event => handlerBlur(event)}
                        onChange={event => passwordHandler(event)}
                    />
                    {(passwordDirty && passwordError) &&
                        <label 
                        className="sing-in__input-label"
                        htmlFor="sing-in-password-input"
                        >
                           {passwordError} 
                        </label>
                    }
                    
                    <button
                        //если форма не валидна то кнопка не доступна
                        disabled={!formValid}
                        type="submit"
                        className="sing-in__save"
                        value="Вход"
                    >
                        Войти
                    </button>
                </form>
            </div>
            
        </section>
    );
}
export default Login;