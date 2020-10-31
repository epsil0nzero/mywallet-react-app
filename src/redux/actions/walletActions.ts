import axios from 'axios';
import { 
  WALLET_GET_BALANCES,
  WALLET_BALANCES_LOADING,
  WALLET_OPEN_DEPOSIT_MODAL,
  WALLET_CLOSE_DEPOSIT_MODAL,
  WALLET_SET_DEPOSIT_MODAL_DATA,
  WALLET_OPEN_WITHDRAW_MODAL,
  WALLET_CLOSE_WITHDRAW_MODAL,
  WALLET_SET_WITHDRAW_MODAL_DATA
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors, clearErrors } from './errorActions';

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

export const openDepositModal = (data: any) => (dispatch: Function, getState: Function) => {
  axios
    .get(`/api/wallet/deposit?cid=${data.id}`, tokenConfig(getState))
    .then(res => {
      dispatch(clearErrors());
      dispatch(setDepositModalData(res.data));
      dispatch({ type: WALLET_OPEN_DEPOSIT_MODAL });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.statusText, err.response.status));
      dispatch({ type: WALLET_OPEN_DEPOSIT_MODAL });      
    });
};

export const closeDepositModal = () => (dispatch: Function) => {
  dispatch(setDepositModalData({}));
  dispatch({
    type: WALLET_CLOSE_DEPOSIT_MODAL
  });
};

export const setDepositModalData = (data: any) => (dispatch: Function) => {
  dispatch({
    type: WALLET_SET_DEPOSIT_MODAL_DATA,
    payload: data
  });
};

export const openWithdrawModal = (data: any) => (dispatch: Function, getState: Function) => {
  axios
    .get(`/api/wallet/withdraw?cid=${data.id}`, tokenConfig(getState))
    .then(res => {
      dispatch(clearErrors());
      dispatch(setWithdrawModalData(res.data));
      dispatch({ type: WALLET_OPEN_WITHDRAW_MODAL });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.statusText, err.response.status));
      dispatch({ type: WALLET_OPEN_WITHDRAW_MODAL });      
    });
};

export const closeWithdrawModal = () => (dispatch: Function) => {
  dispatch(setWithdrawModalData({}));
  dispatch({
    type: WALLET_CLOSE_WITHDRAW_MODAL
  });
};

export const setWithdrawModalData = (data: any) => (dispatch: Function) => {
  dispatch({
    type: WALLET_SET_WITHDRAW_MODAL_DATA,
    payload: data
  });
};
