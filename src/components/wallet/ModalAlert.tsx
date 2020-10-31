import React from 'react';
import { connect } from 'react-redux';

import { Alert, AlertTitle } from '@material-ui/lab';

const ModalAlert = ({ error }: any) => {
  return (    
    error.status ? 
    <div >        
        <Alert severity='error'>
            <AlertTitle><strong>Error {error.status}</strong></AlertTitle>
            {error.msg}
        </Alert>
    </div> : null     
  );
}

const mapStateToProps = (state: any) => ({
    error: state.error,
});

export default connect(mapStateToProps, {})(ModalAlert);