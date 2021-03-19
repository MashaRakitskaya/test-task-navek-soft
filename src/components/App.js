import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
// import { useState, useEffect, useCallback } from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext }  from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
// import api from "../utils/api";
import * as api from "../utils/api";
import * as auth from '../utils/auth';


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    // history.push — создаёт запись в навигации истории.
    const history = useHistory();
    // const [data, setData] = useState({ avatar: "", name: "" , email: "" });
    // const [data, setData] = useState({ email: "" });
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    // useEffect(() => {
    //     api.getReviews()
    //     .then((result) =>{
    //         // console.log(result)
    //         setReviews(result)
    //     })
    //     .catch(err => console.log(`Ошибка получения информации${err}`));
    // },[]);

    useEffect(() => {
        // const token = localStorage.getItem('token');
        // localStorage.setItem('token', result.token);
        // api.getReviews(token)
        api.getReviews()
        .then((result) =>{
            console.log(result.data)
            setReviews(result.data)
        })
        .catch(err => console.log(`Ошибка получения информации${err}`));
    },[]);


    function handleSignOut() {
        
    };

    function handleRegister(email, name, password, password_confirmation) {
        console.log(auth.register(email, name, password, password_confirmation));
        auth.register(email, name, password, password_confirmation)
        .then((result) => {
            // handleInfoTooltip()
            console.log(result);
            history.push('/signin')
        })
        .catch((err)=> {
            // handleInfoTooltip()
            // setInfoTooltipInformation({title: "Что-то пошло не так! Попробуйте ещё раз.", icon: false})
            history.push('/signup')
            console.log(`${err}`)
        })
    };

    // function handleLogin (email, password) {
    //     auth.authorize(email, password)
    //     .then((result) => {
    //         if (result.token) {
    //             setLoggedIn(true);
    //             // localStorage.setItem('token', result.token);
    //             history.push('/main');
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(`${err}`);
    //     })
    // };

    function handleLogin (email, password) {
        auth.authorize(email, password)
        .then((result) => {
            setLoggedIn(true);
            // localStorage.setItem('token', result.token);
            history.push('/main');
        })
        .catch((err) => {
            console.log(`${err}`);
        })
    };

    // const handleTokenCheck = useCallback(() => {
    //     const token = localStorage.getItem('token');
    //     console.log(localStorage.getItem('token'));
    //     if (token) {
    //         auth.checkToken(token)
    //         .then((result) => {
    //         if (result) {
    //             setLoggedIn(true)
    //             // setData({ email: result.data.email })
    //             history.push('/main')
    //         }
    //         })
    //         .catch((err) => {
    //             history.push('/signin');
    //             console.log(`${err}`);
    //         } 
    //         )
    //     }
    // }, [history]);

    // useEffect(() => {
    //     handleTokenCheck();
    // }, [handleTokenCheck]);
    
    return(
        <div className="page">
            <div className="page__container">
                <CurrentUserContext.Provider value={currentUser}>
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
                            {/* <Login onLogin={handleLogin} handleTokenCheck={handleTokenCheck} /> */}
                            <Login onLogin={handleLogin} />
                        </Route>
                        
                        <Route>
                            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
                        </Route>

                    </Switch>

                    {loggedIn && <Footer />}
                </CurrentUserContext.Provider>
            </div>
        </div>
    )
}
export default App;