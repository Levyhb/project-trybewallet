// Coloque aqui suas actions
export const USER_INFO = 'USER_INFO';
export const WALLET_INFO = 'WALLET_INFO';

export const userData = (user) => ({
  type: USER_INFO,
  payload: user,
});

export const walletData = (wallet) => ({
  type: WALLET_INFO,
  payload: wallet,
});
