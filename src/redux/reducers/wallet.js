// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { EDIT_EXPENSES, FETCH_EXPENSE_SUCCESS, FETCH_WALLET_ERROR,
  FETCH_WALLET_SUCCESS, REMOVE_EXPENSE, UPDATE_EXPENSES, WALLET_INFO } from '../actions';

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
        id: (state.expenses.length), ...action.payload }],
    };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...action.payload],
    };

  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((element) => (
        element.id === state.idToEdit ? action.payload : element
      )),
    };
  default: return state;
  }
};

export default walletReducer;
