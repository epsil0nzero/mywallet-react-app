import React from 'react';
import { connect } from 'react-redux';
import { closeWithdrawModal } from '../../redux/actions/walletActions';

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

const WithdrawModal = ({ open, data, closeWithdrawModal }: any) => {

  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="withdraw-modal-title"
        aria-describedby="withdraw-modal-description"
        className={classes.modal}
        open={open}
        onClose={closeWithdrawModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 1000 }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <ModalAlert />
            <h2 id="withdraw-modal-title">Withdraw {data.symbol}</h2>
            <br/><br/>
            <p>Total Balance: {data.total}</p>
            <p>Available Balance: {data.available}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
    open: state.wallet.withdrawModalOpen,
    data: state.wallet.withdrawModalData
});

export default connect(mapStateToProps, { closeWithdrawModal })(WithdrawModal);
