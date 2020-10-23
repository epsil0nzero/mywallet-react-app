import React from 'react';
import { connect } from 'react-redux';
import { Route,  Redirect } from 'react-router-dom';
import { IAuthReduxProps } from '../../types/interfaces';

const ProtectedRoute = ({ component: Component, ...rest }: any) => (
    <Route {...rest} render={(props) => (
        rest.isAuthenticated === true
        ? <Component {...props} /> 
        : <Redirect to={{ pathname: '/404', state: { from: props.location }}} />
    )}/>
);

const mapStateToProps = (state: IAuthReduxProps) => ({
    isAuthenticated: state.auth.isAuthenticated
});    
  
export default connect(mapStateToProps)(ProtectedRoute);