import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { closeDepositModal } from '../../redux/actions/walletActions';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import ModalAlert from './ModalAlert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: '600px'
    },
  }),
);

const DepositModal = ({ open, data, closeDepositModal }: any) => {
    
  const classes = useStyles();
  return (    
    <div>
      <Modal
        aria-labelledby="deposit-modal-title"
        aria-describedby="deposit-modal-description"
        className={classes.modal}
        open={open}
        onClose={closeDepositModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 1000 }}
      >
        <Fade in={open}>          
          <div className={classes.paper}>
            <ModalAlert />               
            <h2 id="deposit-modal-title">Deposit {data.symbol}</h2>
            <br/><br/>
            <p>Total Balance: {data.total}</p>
            <p>Available Balance: {data.available}</p>
            <img src={data.qr} alt=''/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
    open: state.wallet.depositModalOpen,
    data: state.wallet.depositModalData,
    error: state.error,
});

export default connect(mapStateToProps, { closeDepositModal })(DepositModal);
