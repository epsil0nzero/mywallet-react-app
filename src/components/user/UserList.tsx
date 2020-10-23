import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../redux/actions/userActions';

import { CssBaseline, Container } from '@material-ui/core';
import { DataGrid, ColDef } from '@material-ui/data-grid';

const columns: ColDef[] = [
  { field: '_id', headerName: 'ID', width: 300 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },  
];

const UserList = ({
  getUsers,
  deleteUser,
  isAuthenticated,
  users
}: any) => {

  const rows = users.users;

  useEffect(() => { getUsers(); }, [getUsers]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </Container>
    </React.Fragment>    
  );
};

const mapStateToProps = (state: any) => ({
  users: state.users,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getUsers, deleteUser })(UserList);
