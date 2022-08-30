// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { FETCH_EXPENSE_SUCCESS, FETCH_WALLET_ERROR,
  FETCH_WALLET_SUCCESS, WALLET_INFO } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_INFO:
    return {
      ...state,
    };
  case FETCH_WALLET_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case FETCH_WALLET_ERROR:
    return {
      ...state,
      error: 'Erro na API',
    };
  case FETCH_EXPENSE_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: (state.expenses.length), ...action.payload }] };
  default: return state;
  }
};

export default walletReducer;
