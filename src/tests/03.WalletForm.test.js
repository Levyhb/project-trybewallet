import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import mockData from './helpers/mockData';

const VALUE_INPUT_ID = 'value-input';
const CURRENCY_INPUT_ID = 'currency-input';
const METHOD_INPUT_ID = 'method-input';
const TAG_INPUT_ID = 'tag-input';
const DESCRIPTION_INPUT_ID = 'description-input';

const availableCurrencies = Object.keys(mockData).filter((e) => e !== 'USDT');

const WALLET_DATA = {
  currencies: availableCurrencies,
  expenses: [{}],
  editor: false,
  idToEdit: 0,
};

describe('Testes do component WalletForm.js', () => {
  it('o componente WalletForm.js é renderizado no endereço correto', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/carteira');
  });

  it('O formulário possui todos os campos requeridos, e se é possível alterar eles e salvar as informações como uma despesa.', () => {
    renderWithRouterAndRedux(<WalletForm />, {
      initialState: { wallet: WALLET_DATA } });

    const valueInput = screen.getByTestId(VALUE_INPUT_ID);
    const currencyInput = screen.getByTestId(CURRENCY_INPUT_ID);
    const methodInput = screen.getByTestId(METHOD_INPUT_ID);
    const tagInput = screen.getByTestId(TAG_INPUT_ID);
    const descriptionInput = screen.getByTestId(DESCRIPTION_INPUT_ID);
    const saveBtn = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    userEvent.type(valueInput, '1');

    expect(currencyInput).toBeInTheDocument();
    userEvent.selectOptions(currencyInput, 'BTC');

    expect(methodInput).toBeInTheDocument();
    userEvent.selectOptions(methodInput, 'Dinheiro');

    expect(tagInput).toBeInTheDocument();
    userEvent.selectOptions(tagInput, 'Alimentação');

    expect(descriptionInput).toBeInTheDocument();
    userEvent.type(descriptionInput, 'teste');

    expect(saveBtn).toBeInTheDocument();

    userEvent.click(saveBtn);
    expect(valueInput).toHaveTextContent('');
    expect(currencyInput).toHaveTextContent('USD');
    expect(methodInput).toHaveTextContent('Dinheiro');
    expect(tagInput).toHaveTextContent('Alimentação');
    expect(descriptionInput).toHaveTextContent('');
  });
});
