import axios from 'axios';
import { 
  WALLET_GET_BALANCES,
  WALLET_BALANCES_LOADING,
  WALLET_OPEN_DEPOSIT_MODAL,
  WALLET_CLOSE_DEPOSIT_MODAL,
  WALLET_OPEN_WITHDRAW_MODAL,
  WALLET_CLOSE_WITHDRAW_MODAL
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getBalances = () => (dispatch: Function, getState: Function) => {
  dispatch(setWalletBalanceLoading());
  axios
    .get('/api/wallet/balances', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: WALLET_GET_BALANCES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setWalletBalanceLoading = () => {
  return {
    type: WALLET_BALANCES_LOADING
  };
};

export const openDepositModal = () => (dispatch: Function) => {
  dispatch({
    type: WALLET_OPEN_DEPOSIT_MODAL
  });
};

export const closeDepositModal = () => (dispatch: Function) => {
  dispatch({
    type: WALLET_CLOSE_DEPOSIT_MODAL
  });
};

export const openWithdrawModal = () => (dispatch: Function) => {
  dispatch({
    type: WALLET_OPEN_WITHDRAW_MODAL
  });
};

export const closeWithdrawModal = () => (dispatch: Function) => {
  dispatch({
    type: WALLET_CLOSE_WITHDRAW_MODAL
  });
};
