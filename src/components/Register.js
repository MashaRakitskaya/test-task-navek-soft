// import { useState, useRef } from 'react';

// function Register({ onRegister }) {
//     //исходные данные
//     const initialData = {
//         avatar: '',
//         email: '',
//         name: '',
//         password: '',
//         password_confirmation: ''
//     };
//     const [data, setData] = useState(initialData);
//     // const passwordConfirmationError = document.querySelector('.sign-up__input-label-password-confirmation');

//     // const [password, setPassword] = useState({password: ''});
//     // const [passwordConfirmation, setPasswordConfirmation] = useState({password_confirmation: ''});

//     const handleChange = (event) => {
//         const { name, value } = event.target;
        
//         //инпуты определяются по имени, одна функция на несколько инпутов указываем что их нужно различать по имени.
//         setData(data => ({
//           ...data,
//           [name]: value,
//         }));

//         // if(data.password !== data.password_confirmation) {
            
//         // } else {
//         //     passwordConfirmationError.textContent = "Подтверждение пароля не совпадает"
//         // }

//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         onRegister( data.avatar, data.email, data.name, data.password, data.password_confirmation);

//         // if(data.password !== data.password_confirmation) {
//         //     passwordConfirmationError.textContent = "Подтверждение пароля не совпадает"
//         // }
//     };

//     const uploadedImage = useRef(null);
//     const imageUploader = useRef(null);

//     const handleImageUpload = e => {
//         const [file] = e.target.files;
//         if (file) {
//         const reader = new FileReader();
//         const {current} = uploadedImage;
//         current.file = file;
//         reader.onload = (e) => {
//             current.src = e.target.result;
//         }
//         reader.readAsDataURL(file);
//         }
//     };


//     return(
//         <section className="sign-up">
//             <div className="sign-up__content">
//                 <h3 className="sign-up__title">Регистрация</h3>
//                 <form onSubmit={handleSubmit} className="sign-up__form" noValidate>
//                     <label className="sign-up__input-label-avatar" htmlFor="sign-up-avatar-input">Добавьте файл размером не более 10МБ</label>
//                     <input
//                         value={data.avatar}
//                         id='sign-up-avatar-input'
//                         className="sign-up__input sign-up__input_type_avatar"
//                         type="file"
//                         accept="image/jpeg, image/bmp, image/png"
//                         multiple = "false"
//                         data-max-size="10000"
//                         name="avatar"
//                         onChange={handleChange}
//                         placeholder="Ссылка на аватарку"
//                         onChange={handleImageUpload}
//                         ref={imageUploader}
//                         style={{
//                             display: "none"
//                         }}
//                     />
//                     <div
//                         className="sign-up__input-box-img"
//                         onClick={() => imageUploader.current.click()}
//                     >
//                         <img
//                             className="sign-up__input-img"
//                             ref={uploadedImage}
//                         />
//                     </div>

//                     <input
//                         value={data.email}
//                         id='sign-up-email-input'
//                         className="sign-up__input sign-up__input_type_email"
//                         type="email"
//                         name="email"
//                         onChange={handleChange}
//                         placeholder="Email"
//                         maxLength="255"
//                         required 
//                     />

//                     <input
//                         value={data.name}
//                         id='sign-up-name-input'
//                         className="sign-up__input sign-up__input_type_name"
//                         type="text"
//                         name="name"
//                         onChange={handleChange}
//                         placeholder="Имя"
//                         maxLength="255"
//                         required
//                     />

//                     <input
//                         value={data.password}
//                         id='sign-up-password-input'
//                         className="sign-up__input sign-up__input_type_password"
//                         type="password"
//                         name="password"
//                         onChange={handleChange}
//                         placeholder="Пароль"
//                         minLength="2"
//                         maxLength="255"
//                         required
//                     />
                    
//                     <input
//                         value={data.password_confirmation}
//                         id='sign-up-password-confirmation-input'
//                         className="sign-up__input sign-up__input_type_password-сonfirmation"
//                         type="password"
//                         name="password_confirmation"
//                         onChange={handleChange}
//                         placeholder="Подтвердите пароль"
//                         minLength="2"
//                         maxLength="255"
//                         required
//                     />
//                     {/* <label className="sign-up__input-label-password-confirmation" htmlFor="sign-up-password-confirmation-input"></label> */}

//                     <button type="submit" className="sign-up__save" value="Зарегистрироваться">Зарегистрироваться</button>
//                 </form>
//             </div>
            
//         </section>
//     );
// }
// export default Register;








import { useState, useRef, useEffect } from 'react';

function Register({ onRegister }) {

    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);
    // //данные исходные
    // const initialData = {
    //     avatar: '',
    //     email: '',
    //     name: '',
    //     password: '',
    //     password_confirmation: ''
    // };
    // const [data, setData] = useState(initialData);

    
    //исходные данные
    const [email, setEmail] = useState('');
    //исходные данные
    const [password, setPassword] = useState('');
    //были или не были в input
    const [emailDirty, setEmailDirty] = useState(false);
    //были или не были в input
    const [passwordDirty, setPasswordDirty] = useState(false);
    //отрожает ошибку email
    const [emailError, setEmailError] = useState('Email не должен быть пустым');
    //отрожает ошибку password
    const [passwordError, setPasswordError] = useState('Пароль не должен быть пустым');
    //валидна форма или нет
    const [formValid, setFormValid] = useState(false);

    //валидна форма или нет
    useEffect(() => {
        if(emailError || passwordError) {
            //если возникли ошибки форма не валидна
            setFormValid(false);
            // buttonSignUpSave.classList.add(buttonSignUpDisabled);
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
        if(event.target.value.length < 2) {
            setPasswordError('Пароль должен быть больше 2-ух символов');
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


    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     //инпуты определяются по имени, одна функция на несколько инпутов указываем что их нужно различать по имени.
    //     setData(data => ({
    //       ...data,
    //       [name]: value,
    //     }));
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     onRegister( data.avatar, data.email, data.name, data.password, data.password_confirmation);
    // };

    // const handleImageUpload = e => {
    //     const [file] = e.target.files;
    //     if (file) {
    //     const reader = new FileReader();
    //     const {current} = uploadedImage;
    //     current.file = file;
    //     reader.onload = (e) => {
    //         current.src = e.target.result;
    //     }
    //     reader.readAsDataURL(file);
    //     }
    // };

    return(
        <section className="sign-up">
            <div className="sign-up__content">
                <h3 className="sign-up__title">Регистрация</h3>
                {/* <form onSubmit={handleSubmit} className="sign-up__form" noValidate> */}
                <form className="sign-up__form" noValidate>
                    <label className="sign-up__input-label-avatar" htmlFor="sign-up-avatar-input">Добавьте jpeg/bmp/png картинку размером не более 10МБ</label>
                    <input
                        // value={data.avatar}
                        id='sign-up-avatar-input'
                        className="sign-up__input sign-up__input_type_avatar"
                        type="file"
                        accept="image/jpeg, image/bmp, image/png"
                        multiple = "false"
                        data-max-size="10000"
                        name="avatar"
                        // onChange={handleChange}
                        placeholder="Ссылка на аватарку"
                        // onChange={handleImageUpload}
                        ref={imageUploader}
                        style={{
                            display: "none"
                        }}
                    />
                    <div
                        className="sign-up__input-box-img"
                        onClick={() => imageUploader.current.click()}
                    >
                        <img
                            className="sign-up__input-img"
                            ref={uploadedImage}
                        />
                    </div>

                    
                    
                    <input
                        value={email}
                        id='sign-up-email-input'
                        className="sign-up__input sign-up__input_type_email"
                        type="email"
                        name="email"
                        placeholder="Email"
                        maxLength="255"
                        required
                        onBlur={event => handlerBlur(event)}
                        onChange={event => emailHandler(event)}
                    />

                    {(emailDirty && emailError) &&
                        <label 
                        className="sign-up__input-label"
                        htmlFor="sign-up-email-input"
                        >
                           {emailError} 
                        </label>
                    }

                    <input
                        // value={data.name}
                        id='sign-up-name-input'
                        className="sign-up__input sign-up__input_type_name"
                        type="text"
                        name="name"
                        // onChange={handleChange}
                        placeholder="Имя"
                        maxLength="255"
                        required
                    />

                    
                    <input
                        value={password}
                        id='sign-up-password-input'
                        className="sign-up__input sign-up__input_type_password"
                        type="password"
                        name="password"
                        // onChange={handleChange}
                        placeholder="Пароль"
                        minLength="2"
                        maxLength="255"
                        required
                        onBlur={event => handlerBlur(event)}
                        onChange={event => passwordHandler(event)}
                    />

                    {(passwordDirty && passwordError) &&
                        <label 
                        className="sign-up__input-label"
                        htmlFor="sign-up-password-input"
                        >
                           {passwordError} 
                        </label>
                    }
                    
                    <input
                        // value={data.password_confirmation}
                        id='sign-up-password-confirmation-input'
                        className="sign-up__input sign-up__input_type_password-сonfirmation"
                        type="password"
                        name="password_confirmation"
                        // onChange={handleChange}
                        placeholder="Подтвердите пароль"
                        // minLength="2"
                        // maxLength="255"
                        required
                    />
                    {/* <label className="sign-up__input-label-password-confirmation" htmlFor="sign-up-password-confirmation-input"></label> */}

                    <button
                        //если форма не валидна то кнопка не доступна
                        disabled={!formValid}
                        type="submit"
                        className="sign-up__save"
                        value="Зарегистрироваться"
                    >
                        Зарегистрироваться
                    </button>
                </form>
            </div>
            
        </section>
    );
}
export default Register;