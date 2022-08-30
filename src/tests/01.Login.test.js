import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

const EMAIL_INPUT_ID = 'email-input';
const PASSWORD_INPUT_ID = 'password-input';

describe('Testes da página Login.js', () => {
  it('A página do login é renderizado na rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('A página de login contém um campo de email e senha para o usuário preencher', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_ID);
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId(PASSWORD_INPUT_ID);
    expect(password).toBeInTheDocument();
  });

  it('O botão de enviar a informação só é habilitado após as validações corretas do "email" e do "password"', () => {
    renderWithRouterAndRedux(<App />);
    const validEmail = 'trybe@teste.com';
    const validPassword = '123456';
    const emailInput = screen.getByTestId(EMAIL_INPUT_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_ID);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    expect(loginBtn).toBeInTheDocument();

    userEvent.type(emailInput, 'teste');
    expect(loginBtn).toHaveAttribute('disabled');

    userEvent.type(passwordInput, '12345');
    expect(loginBtn).toHaveAttribute('disabled');

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);

    expect(loginBtn).not.toHaveAttribute('disabled');
  });

  it('Ao clicar no botão, a página é riderecionada para a rota "/carteira"', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    const { history } = renderWithRouterAndRedux(<App />);

    const validEmail = 'trybe@teste.com';
    const validPassword = '123456';
    const emailInput = screen.getByTestId(EMAIL_INPUT_ID);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT_ID);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    expect(loginBtn).toBeInTheDocument();

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
    userEvent.click(loginBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    expect(global.fetch).toBeCalled();
  });
});
