import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <div>
        <label htmlFor="expenses">
          Valor:
          <input type="number" name="expenses" id="expenses" />
        </label>
        <label htmlFor="coins">
          Moeda:
          <select name="coins" id="coins" data-testid="currency-input">
            {}
          </select>
        </label>
        <label htmlFor="expensesDescribe">
          Descrição
          <input type="text" name="expensesDescribe" id="expensesDescribe" />
        </label>
        <label htmlFor="tag">
          tag
          <select name="tag" id="tag" data-testid="tag-input">
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>
        </label>
        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select name="paymentMethod" id="paymentMethod" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </div>
    );
  }
}

export default WalletForm;
