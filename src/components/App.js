import Header from "./Header.js";
import Main from "./Main.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom"; 


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    // history.push — создаёт запись в навигации истории.
    const history = useHistory();
    const [data, setData] = useState({ avatar: "", name: "" , email: "" });
    const [reviews, seReviews] = useState([]);


    function handleSignOut() {
        
    };
    
    return(
        <div className="page">
            <div className="page__container">
            <Switch>
                <Header
                    userAvatar={data.avatar}
                    userName={data.name}
                    userEmail={data.email}
                    onSignOut={handleSignOut}
                />

                <ProtectedRoute
                    path="/main"
                    loggedIn={loggedIn}
                    component={Main}
                    reviews={reviews}  
                />

                <Route path="/signup">
                    
                </Route>

                <Route path="/signin">
                    
                </Route>
                
                <Route>
                    {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />} {/* Если залогинены то перенаправляем в main иначе во вход */}
                </Route>

            </Switch>
            

            </div>
        </div>
    )
}
export default App;