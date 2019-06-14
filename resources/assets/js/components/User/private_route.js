import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from '../Reusable/loader';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, userCheck } = rest.user;

  return (
    userCheck
    ? user.length
    ? (
      <Route
        {...rest}
        render={ props =>
          <Component {...props} />
        }
      />
      ) : (
      <Redirect
        to={{
        pathname: '/app/unauthorized',
        }}
      />
    ) : <Loader />  
  )
}

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(PrivateRoute);
