// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { WALLET_INFO } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_INFO:
    return {
      type: WALLET_INFO,
      wallet: { ...action.payload },
    };
  default: return state;
  }
};

export default walletReducer;
