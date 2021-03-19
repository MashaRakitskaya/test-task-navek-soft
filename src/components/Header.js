// import React from 'react';
// import { Link, Route, Switch } from 'react-router-dom';

// function Header({ userAvatar, userName, userEmail, onSignOut }) {

//     return (
//         <header className="header">
//             <Switch>
//                 <Route path="/main">
//                     <div className="header__container">
//                         <img className="header__avatar" src={userAvatar} alt={userName}  />
                    
//                         <p className="header__name">{userName}</p>
//                         <p className="header__email">{userEmail}</p>
//                         <Link onClick={onSignOut} to="/signin" className="header__exit">
//                             Выйти
//                         </Link>
//                     </div>
//                 </Route>
//                 <Route path="/signup">
//                     <Link to="/signin" className="header__registration">
//                         Войти
//                     </Link>
//                 </Route>

//                 <Route path="/signin">
//                     <Link to="/signup" className="header__login">
//                         Регистрация
//                     </Link>
//                 </Route>

//             </Switch>
//         </header>
//     );
// }
// export default Header;

import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

function Header({ onSignOut }) {

    return (
        <header className="header">
            <Switch>
                <Route path="/main">
                    <div className="header__container">
                        <Link onClick={onSignOut} to="/signin" className="header__exit">
                            Выйти
                        </Link>
                    </div>
                </Route>
                <Route path="/signup">
                    <Link to="/signin" className="header__registration">
                        Войти
                    </Link>
                </Route>

                <Route path="/signin">
                    <Link to="/signup" className="header__login">
                        Регистрация
                    </Link>
                </Route>

            </Switch>
        </header>
    );
}
export default Header;

