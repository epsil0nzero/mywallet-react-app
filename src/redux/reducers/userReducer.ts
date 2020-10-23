import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  USERS_LOADING
} from '../actions/types';
import { IAction, IUser } from '../../types/interfaces';

const initialState = {
  users: [],
  loading: false
};

interface IState {
  users: IUser[];
}

export default function(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users]
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
