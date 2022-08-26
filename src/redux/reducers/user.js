// Esse reducer será responsável por tratar as informações da pessoa usuária

import { USER_INFO } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
    password: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO:
    return {
      user: { ...action.payload },
    };
  default:
    return state;
  }
};

export default userReducer;
