import axios from 'axios';
import { WALLET_GET_BALANCES, WALLET_BALANCES_LOADING } from './types';
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
