import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { addToExpenseThunk, chooseCoinThunk, updateExpense } from '../redux/actions';
import './walletForm.css';

const ALIMENTACAO = 'Alimentação';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      currency: 'USD',
      description: '',
      tag: ALIMENTACAO,
      method: 'Dinheiro',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(chooseCoinThunk());
  }

  componentDidUpdate(prevProps) {
    const { editor } = this.props;
    if (prevProps.editor !== editor) this.editEnabled();
  }

  editEnabled = () => {
    const { editor, idToEdit, expenses } = this.props;
    if (editor) {
      const expenseToEdit = expenses.find((e) => e.id === idToEdit);
      this.setState({ ...expenseToEdit });
    } else {
      this.setState({
        value: '',
        currency: 'USD',
        description: '',
        tag: ALIMENTACAO,
        method: 'Dinheiro',
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  addExpenses = () => {
    const { dispatch, editor } = this.props;

    if (editor) {
      dispatch(updateExpense(this.state));
      this.setState({
        value: '',
        currency: 'USD',
        description: '',
        tag: ALIMENTACAO,
        method: 'Dinheiro',
      });
    } else {
      dispatch(addToExpenseThunk(this.state));
      this.setState({
        value: '',
        currency: 'USD',
        description: '',
        tag: ALIMENTACAO,
        method: 'Dinheiro',
      });
    }
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, currency, tag, description, method } = this.state;
    const isDisabled = (!value || !description);
    return (
      <form className="wallet-form">
        <label htmlFor="value" className="input-expenses">
          Valor
          <input
            type="number"
            name="value"
            className="input value-expenses"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency" className="input-expenses">
          Moeda
          <select
            name="currency"
            id="currency"
            className="select-wallet"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((e) => (
              <option value={ e } key={ e }>{e}</option>
            ))}
          </select>
        </label>
        <label htmlFor="description" className="input-expenses">
          Descrição
          <input
            type="text"
            name="description"
            className="input"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="tag" className="input-expenses">
          Tag
          <select
            name="tag"
            className="select-wallet"
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="method" className="input-expenses">
          Método de pagamento
          <select
            name="method"
            id="method"
            className="select-wallet"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <button
          onClick={ this.addExpenses }
          type="button"
          disabled={ isDisabled }
          className="add-expense-btn button"
        >
          {editor ? 'Editar despesa ' : ' Adicionar despesas '}
          <lord-icon
            src="https://cdn.lordicon.com/qhviklyi.json"
            trigger="hover"
            colors="primary:#333,secondary:white"
            style={ { width: '50px', height: '50px' } }
          />
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: string,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
