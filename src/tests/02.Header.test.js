import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const EMAIL_FIELD__ID = 'email-field';
const TOTAL_FIELD_ID = 'total-field';
const CURRENCY_FIELD_ID = 'header-currency-field';

const USER_DATA = {
  email: 'trybe@teste.com',
};

const availableCurrencies = Object.keys(mockData).filter((e) => e !== 'USDT');

const WALLET_DATA = {
  currencies: availableCurrencies,
  expenses: [
    {
      id: 0,
      value: '1',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '1',
      exchangeRates: mockData,
    }],
  editor: false,
  idToEdit: 0 };

describe('Testes do componente Header.js', () => {
  it('O componente Header é renderizado na rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');

    const heading = screen.getByRole('heading', { name: /trybewallet/i, level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('Há no componente header.js, o email cadastrado pelo usuário.', () => {
    renderWithRouterAndRedux(<Header />, {
      initialState: { user: USER_DATA, wallet: WALLET_DATA } });

    const emailInput = screen.getByTestId(EMAIL_FIELD__ID);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveTextContent('trybe@teste.com');
  });

  it('Há no componente header.js, o valor total da carteira e a moeda do referido valor', () => {
    renderWithRouterAndRedux(<Header />, {
      initialState: { user: USER_DATA, wallet: WALLET_DATA } });

    const totalField = screen.getByTestId(TOTAL_FIELD_ID);
    expect(totalField).toBeInTheDocument();
    expect(totalField).toHaveTextContent('4.75');

    const currencyField = screen.getByTestId(CURRENCY_FIELD_ID);
    expect(currencyField).toBeInTheDocument();
    expect(currencyField).toHaveTextContent('BRL');
  });
});
