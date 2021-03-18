import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { CurrentUserContext }  from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/api";
import * as auth from '../utils/auth';


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    // history.push — создаёт запись в навигации истории.
    const history = useHistory();
    // const [data, setData] = useState({ avatar: "", name: "" , email: "" });
    const [data, setData] = useState({ email: "" });
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        api.getReviews()
        .then((result) =>{
            // console.log(result)
            setReviews(result)
        })
        .catch(err => console.log(`Ошибка получения информации${err}`));
    },[]);


    function handleSignOut() {
        
    };

    function handleRegister(avatar, email, name, password) {
        auth.register(avatar, email, name, password)
        .then((result) => {
            // handleInfoTooltip()
            history.push('/signin')
        })
        .catch((err)=> {
            // handleInfoTooltip()
            // setInfoTooltipInformation({title: "Что-то пошло не так! Попробуйте ещё раз.", icon: false})
            history.push('/signup')
            console.log(`${err}`)
        })
    };

    function handleLogin (email, password) {
        auth.authorize(email, password)
        .then((result) => {
            if (result.token) {
                setLoggedIn(true);
                localStorage.setItem('token', result.token);
                setData({ email: email });
                history.push('/main');
            }
        })
        .catch((err) => {
            console.log(`${err}`);
        })
    };

    function handleTokenCheck() {

    };
    
    return(
        <div className="page">
            <div className="page__container">
                <CurrentUserContext.Provider value={currentUser}>
                        <Header
                            userAvatar={data.avatar}
                            userName={data.name}
                            userEmail={data.email}
                            onSignOut={handleSignOut}
                        />
                    <Switch>
                        <ProtectedRoute
                            exact
                            path="/main"
                            loggedIn={loggedIn}
                            component={Main}
                            reviews={reviews} 
                            loggedIn={loggedIn}
                        />

                        <Route path="/signup">
                            <Register onRegister={handleRegister} />
                        </Route>

                        <Route path="/signin">
                            <Login onLogin={handleLogin} handleTokenCheck={handleTokenCheck} />
                        </Route>
                        
                        <Route exact="/main">
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