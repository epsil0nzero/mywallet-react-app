import axios from 'axios';
import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { IUser } from '../../types/interfaces';

export const getUsers = () => (dispatch: Function) => {
  dispatch(setUsersLoading());
  axios
    .get('/api/users')
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data.map((user: any) => { return {...user, id: user._id} })
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addUser = (item: IUser) => (
  dispatch: Function,
  getState: Function
) => {
  axios
    .post('/api/users', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteUser = (id: string) => (
  dispatch: Function,
  getState: Function
) => {
  axios
    .delete(`/api/users/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};
