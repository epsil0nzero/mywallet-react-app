import {
  WALLET_GET_BALANCES,
  WALLET_BALANCES_LOADING
} from '../actions/types';
import { IAction, IBalance } from '../../types/interfaces';

const initialState = {
  balances: [],
  loading: false
};

interface IState {
  balances: IBalance[];
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
    default:
      return state;
  }
}
