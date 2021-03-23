import { useState, useEffect } from 'react';

function Register({ onRegister }) {
    //данные avatar
    const [avatar, setAvatar] = useState('');
    //данные email
    const [email, setEmail] = useState('');
    //данные name
    const [name, setName] = useState('');
    //данные password
    const [password, setPassword] = useState('');
    //данные passwordСonfirmation
    const [password_confirmation, setPasswordСonfirmation] = useState('');
    
    //были или не были в input
    const [emailDirty, setEmailDirty] = useState(false);
    const [nameDirty, setNameDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [passwordСonfirmationDirty, setPasswordСonfirmationDirty] = useState(false);
    
    //отражает ошибку под input
    const [avatarError, setAvatarError] = useState('');
    const [emailError, setEmailError] = useState('Email не должен быть пустым');
    const [nameError, setNameError] = useState('Имя не должен быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не должен быть пустым');
    const [passwordСonfirmationError, setPasswordСonfirmationError] = useState('Подтверждение пароля не должно быть пустым');
    
    //валидна форма или нет
    const [formValid, setFormValid] = useState(false);

    //валидна форма или нет
    useEffect(() => {
        if(emailError || nameError || passwordError  || passwordСonfirmationError) {
            //если возникли ошибки форма не валидна
            setFormValid(false);
        } else {
            //если ошибок нет то форма валидна
            setFormValid(true);
        }
    },[emailError, nameError, passwordError, passwordСonfirmationError]);

    //Пользователь покинул поле ввода
    const handlerBlur = (event) => {
        switch(event.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'name':
                setNameDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            case 'password_confirmation':
                setPasswordСonfirmationDirty(true)
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

    //если введен длинный name то уведомляем
    const nameHandler = (event) => {
        setName(event.target.value);
        if(event.target.value.length > 255) {
            if(!event.target.value) {
                setNameError('Имя не должен быть пустым')  
            }
            setNameError('Имя должено быть меньше 255-ти символов');
        }
        else {
            setNameError('')
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

    //если введен короткий passwordСonfirmation то уведомляем
    const passwordСonfirmationHandler = (event) => {
        setPasswordСonfirmation(event.target.value);
        if(event.target.value.length < 8) {
            setPasswordСonfirmationError('Пароль должен быть больше 8-ми символов');
            if(!event.target.value) {
                setPasswordСonfirmationError('Пароль не должен быть пустым')  
            }
        } else if(event.target.value.length > 255) {
            setPasswordСonfirmationError('Пароль должен быть меньше 255-ти символов')
        }
        else if(event.target.value !== password) {
            setPasswordСonfirmationError('Пароли не совпадают');
        } else {
            setPasswordСonfirmationError('')
        }
    };
    //если картинка не того размера или слишком большая то уведомляем
    const onChangeFile = (event) => {
        setAvatar(event.target.value);
        const imageFile = event.target.files[0];
        if(!imageFile) {
            setAvatarError('')
        } else if (!imageFile.name.match(/\.(jpeg|bmp|png)$/)) {
            setAvatarError('Выберите формат jpeg/bmp/png')
        } else if(imageFile.size > 10240) {
            setAvatarError('Выберите картинку меньше 10МБ')
        } else {
            setAvatarError('')
        }
    };

    //обработчик сабмита
    const handleSubmit = (event) => {
        event.preventDefault();
        onRegister( avatar, email, name, password, password_confirmation);
    };

    return(
        <section className="sign-up">
            <div className="sign-up__content">
                <h3 className="sign-up__title">Регистрация</h3>
                <form onSubmit={handleSubmit} className="sign-up__form" noValidate>
                    <p className="sign-up__avatar-upload-text">Добавьте jpeg/bmp/png картинку размером не более 10МБ 
                        <span className="sign-up__optional-input"> *необязательное поле</span>
                    </p>
                    <input
                        value={avatar}
                        type="file"
                        onChange={event => onChangeFile(event)}
                        id='sign-up-avatar-input'
                        name="avatar"
                        placeholder="Выберите файл"
                        className="sign-up__input sign-up__input_type_avatar"
                    />
                    <label 
                        className="sign-up__input-label"
                        htmlFor="sign-up-avatar-input"
                        >
                           {avatarError} 
                    </label>
                    
                    <input
                        value={email}
                        id='sign-up-email-input'
                        className="sign-up__input sign-up__input_type_email"
                        type="email"
                        name="email"
                        placeholder="Email"
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
                        value={name}
                        id='sign-up-name-input'
                        className="sign-up__input sign-up__input_type_name"
                        type="text"
                        name="name"
                        onBlur={event => handlerBlur(event)}
                        onChange={ event => nameHandler(event)}
                        placeholder="Имя"
                        required
                    />
                    {(nameDirty && nameError) &&
                        <label 
                        className="sign-up__input-label"
                        htmlFor="sign-up-name-input"
                        >
                           {nameError} 
                        </label>
                    }

                    <input
                        value={password}
                        id='sign-up-password-input'
                        className="sign-up__input sign-up__input_type_password"
                        type="password"
                        name="password"
                        placeholder="Пароль"
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
                        value={password_confirmation}
                        id='sign-up-password-confirmation-input'
                        className="sign-up__input sign-up__input_type_password-сonfirmation"
                        type="password"
                        name="password_confirmation"
                        onBlur={event => handlerBlur(event)}
                        onChange={event => passwordСonfirmationHandler(event)}
                        placeholder="Подтвердите пароль"
                        required
                    />
                    {(passwordСonfirmationDirty && passwordСonfirmationError) &&
                        <label 
                        className="sign-up__input-label"
                        htmlFor="sign-up-password-confirmation-input"
                        >
                           {passwordСonfirmationError} 
                        </label>
                    }

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