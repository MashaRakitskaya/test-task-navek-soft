import React from 'react';
import { Route, Redirect } from "react-router-dom";

//Защищенный маршрут
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    //Если залогенены то переходим в main иначе на станицу входа
    <Route>
      {
        () => props.loggedIn === true ? <Component {...props} /> : <Redirect to="/signin" />
      }
    </Route>
  )
}

export default ProtectedRoute;