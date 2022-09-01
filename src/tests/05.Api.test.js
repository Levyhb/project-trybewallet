import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/renderWith';

const STATE = {
  user: {
    email: 'trybe@wallet.com',
    senha: '123456',
  },
  wallet: {
    editor: false,
    idToEdit: 0,
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '20',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Saúde',
        description: 'Descrição da despesa',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '12',
        currency: 'CAD',
        method: 'Cartão de Crédito',
        tag: 'Alimentação',
        description: 'Lanche',
        exchangeRates: mockData,
      },
      {
        id: 2,
        value: '43',
        currency: 'BTC',
        method: 'Cartão de Débito',
        tag: 'Lazer',
        description: 'God of War',
        exchangeRates: mockData,
      },
    ],
  },
};
describe('', () => {
  test('Verifica o fetch da API', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    renderWithRouterAndRedux(<Wallet />, { initialState: STATE });
  });
});
