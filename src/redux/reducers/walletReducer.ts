import {
  WALLET_GET_BALANCES,
  WALLET_BALANCES_LOADING,
  WALLET_OPEN_DEPOSIT_MODAL,
  WALLET_CLOSE_DEPOSIT_MODAL,
  WALLET_OPEN_WITHDRAW_MODAL,
  WALLET_CLOSE_WITHDRAW_MODAL
} from '../actions/types';
import { IAction, IBalance } from '../../types/interfaces';

const initialState = {
  balances: [],
  depositModalOpen: false,
  withdrawModalOpen: false,
  loading: false
};

interface IState {
  balances: IBalance[];
  depositModalOpen: boolean,
  withdrawModalOpen: boolean,
}

export default function(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case WALLET_GET_BALANCES:
      return {
        ...state,
        balances: action.payload,
        loading: false
      };
    case WALLET_BALANCES_LOADING:
      return {
        ...state,
        loading: true
      };
    case WALLET_OPEN_DEPOSIT_MODAL:
      return {
        ...state,
        depositModalOpen: true
      };
    case WALLET_CLOSE_DEPOSIT_MODAL:
      return {
        ...state,
        depositModalOpen: false
      };
    case WALLET_OPEN_WITHDRAW_MODAL:
      return {
        ...state,
        withdrawModalOpen: true
      };
    case WALLET_CLOSE_WITHDRAW_MODAL:
      return {
        ...state,
        withdrawModalOpen: false
      };
    default:
      return state;
  }
}
