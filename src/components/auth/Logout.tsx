import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { ILogoutProps } from '../../types/interfaces';

export const Logout = ({ logout }: ILogoutProps) => {
  return (   
      <div onClick={logout}> Logout </div>
  );
};

export default connect(null, { logout })(Logout);
