import fetchCurrencies from '../api';

// Coloque aqui suas actions
export const USER_INFO = 'USER_INFO';
export const WALLET_INFO = 'WALLET_INFO';
export const FETCH_WALLET_SUCCESS = 'FETCH_WALLET_SUCCESS';
export const FETCH_WALLET_ERROR = 'FETCH_WALLET_ERROR';
export const FETCH_EXPENSE_SUCCESS = 'FETCH_EXPENSE_SUCCESS';
export const FETCH_EXPENSE_ERROR = 'FETCH_EXPENSE_ERROR';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const SENT_EXPENSES = 'SENT_EXPENSES';

export const userData = (user) => ({
  type: USER_INFO,
  payload: user,
});

export const walletData = (wallet) => ({
  type: WALLET_INFO,
  payload: wallet,
});

const fetchWalletSuccess = (currency) => ({
  type: FETCH_WALLET_SUCCESS,
  payload: currency,
});

const fetchWalletError = () => ({
  type: FETCH_WALLET_ERROR,
});

export const fetchExpensesSuccess = (expense) => ({
  type: FETCH_EXPENSE_SUCCESS,
  payload: expense,
});

export const updateExpense = (expense) => ({
  type: UPDATE_EXPENSE,
  payload: expense,
});

export const chooseCoinThunk = () => async (dispatch) => {
  dispatch(walletData());
  try {
    const currencies = await fetchCurrencies();
    const dataCurrencies = Object.keys(currencies).filter((e) => e !== 'USDT');
    dispatch(fetchWalletSuccess(dataCurrencies));
  } catch (error) {
    console.log(error);
    dispatch(fetchWalletError());
  }
};

export const addToExpenseThunk = (expense) => async (dispatch) => {
  dispatch(walletData());
  try {
    const exchangeRates = await fetchCurrencies();
    const newExpense = { ...expense, exchangeRates };
    dispatch(fetchExpensesSuccess(newExpense));
  } catch (error) {
    console.log(error);
    dispatch(fetchWalletError());
  }
};
