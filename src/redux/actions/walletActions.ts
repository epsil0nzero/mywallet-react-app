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

import QRCode from 'qrcode';
const generateQR = async (text: string) => await QRCode.toDataURL(text);

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

export const openDepositModal = (data: any) => async (dispatch: Function, getState: Function) => {
    try {
      const res = await axios.get(`/api/wallet/deposit?cid=${data.id}`, tokenConfig(getState));
      res.data.qr = await generateQR(res.data.address);
      dispatch(clearErrors());
      dispatch(setDepositModalData(res.data));
      dispatch({ type: WALLET_OPEN_DEPOSIT_MODAL });
    } catch (err) {
      dispatch({ type: WALLET_OPEN_DEPOSIT_MODAL });
      dispatch(returnErrors(err.response.statusText, err.response.status));  
    }
};

export const closeDepositModal = () => (dispatch: Function) => {
  dispatch({ type: WALLET_CLOSE_DEPOSIT_MODAL });
  dispatch(setDepositModalData({}));
};

export const setDepositModalData = (data: any) => (dispatch: Function) => {
  dispatch({
    type: WALLET_SET_DEPOSIT_MODAL_DATA,
    payload: data
  });
};

export const openWithdrawModal = (data: any) => async (dispatch: Function, getState: Function) => {
  try {
    const res = await axios.get(`/api/wallet/withdraw?cid=${data.id}`, tokenConfig(getState));
    dispatch(clearErrors());
    dispatch(setWithdrawModalData(res.data));
    dispatch({ type: WALLET_OPEN_WITHDRAW_MODAL });
  } catch (err) {
    dispatch({ type: WALLET_OPEN_WITHDRAW_MODAL });
    dispatch(returnErrors(err.response.statusText, err.response.status));      
  }
};

export const closeWithdrawModal = () => (dispatch: Function) => {
  dispatch({ type: WALLET_CLOSE_WITHDRAW_MODAL });
  dispatch(setWithdrawModalData({}));  
};

export const setWithdrawModalData = (data: any) => (dispatch: Function) => {
  dispatch({
    type: WALLET_SET_WITHDRAW_MODAL_DATA,
    payload: data
  });
};
