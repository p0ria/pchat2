import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../state/login/login.selectors";

export default ({ component: Component, ...rest }) => {
  const token = useSelector(selectToken);
  return (
    <Route {...rest} render={
      props => token ?
        <Component {...props} />
        :
        <Redirect to="/login" />
    } />
  );
}