import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect, useCallback } from "react";
// import { useState, useEffect } from "react";
// import { useState } from "react";
// import { CurrentUserContext }  from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
// import api from "../utils/api";
import * as api from "../utils/api";
import * as auth from '../utils/auth';
import InfoTooltip from "./InfoTooltip.js";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    // history.push — создаёт запись в навигации истории.
    const history = useHistory();
    const [reviews, setReviews] = useState([]);
    // const [currentUser, setCurrentUser] = useState({});
    // const [token, setToken] = useState(localStorage.getItem('token'));

    const [isInfoTooltipInformation, setInfoTooltipInformation] = useState({title: "Вы успешно зарегистрировались!"});
    const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

    function handleOpenInfoTooltip() {
        setInfoTooltipPopupOpen(true)
    };
    function closePopup() {
        setInfoTooltipPopupOpen(false) 
    };
    function closePopupByOverlay(event) { 
        if (event.target.classList.contains('popup')) {
            closePopup()
        }
    };

    function handleRegister(avatar, email, name, password, password_confirmation) {
        // console.log(auth.register(avatar, email, name, password, password_confirmation));
        auth.register(avatar, email, name, password, password_confirmation)
        .then((result) => {
            handleOpenInfoTooltip()
            console.log(result);
            history.push('/signin')
        })
        .catch((err)=> {
            handleOpenInfoTooltip()
            if(`${err}` === 'Ошибка 422') {
                setInfoTooltipInformation({title: "Пользователь с таким email уже существует!"});
            } else {
                setInfoTooltipInformation({title: "Что-то пошло не так!"});
            }
            history.push('/signup')
            console.log(`${err}`)
        })
    };

    function handleLogin(email, password) {
        auth.authorize(email, password)
        .then((result) => {
            if (result.token.access_token) {
                setLoggedIn(true);
                localStorage.setItem('token', result.token.access_token);
                // localStorage.getItem('token');
                // console.log(token);
                getReviews();
                history.push('/main');
            }
        })
        .catch((err)=> {
            handleOpenInfoTooltip();
            if(`${err}` === 'Ошибка 422') {
                setInfoTooltipInformation({title: "Неправильные данные, попробуйте еще раз!"});
            }else {
                setInfoTooltipInformation({title: "Что-то пошло не так!"});
            }
            history.push('/signip')
            console.log(`${err}`)
        })
    };

    function handleSignOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/signin');
        console.log(localStorage.getItem('token'));
    };

    // const token = localStorage.getItem('token');
    // useEffect(() => {
    //     // const token = localStorage.getItem('token')
    //     api.getReviews(token)
    //     // api.getReviews()
    //     .then((result) =>{
    //         console.log(result.data)
    //         setReviews(result.data)
    //     })
    //     .catch(err => console.log(`Ошибка получения информации${err}`));
    // },[token]);

    function getReviews() {
        const token = localStorage.getItem('token')
        api.getReviews(token)
        .then((result) =>{
            setReviews(result.data.slice(0, 15))
        })
        .catch(err => console.log(`Ошибка получения информации${err}`));
    };

    const handleTokenCheck = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getReviews();
            setLoggedIn(true)
            history.push('/main')
        } else {
            history.push('/signin');
        }
    }, [history]);

    useEffect(() => {
        handleTokenCheck();
    }, [handleTokenCheck]);


    // const checkStatusEmail = (response) => {
    //     if (response.status = 422) {
          
    //     } else {
    //       var error = new Error(response.statusText)
    //       error.response = response
    //       return error
    //     }
    // }

    // function checkEmail(response) {
    //     // raises an error in case response status is not a success
    //     if (response.status === 422 ) {
          
    //     } else {
    //       var error = new Error(response.statusText)
    //       error.response = response
    //       return error
    //     }
    // };

    // function checkEmail(response) {
    //     // raises an error in case response status is not a success
    //     if (response.status === 422 ) {
    //         setEmailError('Пользователь с таким email уже существует')
    //     } else {
    //         setEmailError('')
    //     }
    // };

    return(
        <div className="page">
            <div className="page__container">
                {/* <CurrentUserContext.Provider value={currentUser}> */}
                        <Header
                            // userAvatar={data.avatar}
                            // userName={data.name}
                            // userEmail={data.email}
                            onSignOut={handleSignOut}
                        />
                    <Switch>
                        <ProtectedRoute
                            path="/main"
                            loggedIn={loggedIn}
                            component={Main}
                            reviews={reviews}
                        />

                        <Route path="/signup">
                            <Register onRegister={handleRegister} />
                        </Route>

                        <Route path="/signin">
                            <Login onLogin={handleLogin} handleTokenCheck={handleTokenCheck} />
                        </Route>
                        
                        <Route>
                            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
                        </Route>

                    </Switch>

                    {loggedIn && <Footer />}

                    <InfoTooltip
                      title={isInfoTooltipInformation.title}
                      isOpen={isInfoTooltipPopupOpen}
                      onClose={closePopup}
                      onOvarlayClose={closePopupByOverlay}  
                    />
                {/* </CurrentUserContext.Provider> */}
            </div>
        </div>
    )
}
export default App;