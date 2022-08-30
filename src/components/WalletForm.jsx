import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToExpenseThunk, chooseCoinThunk } from '../redux/actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      currency: 'USD',
      description: '',
      tag: 'Alimentação',
      method: 'Dinheiro',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(chooseCoinThunk());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  addExpenses = () => {
    const { dispatch } = this.props;
    dispatch(addToExpenseThunk(this.state));
    this.setState({
      value: '',
      currency: 'USD',
      description: '',
      tag: 'Alimentação',
      method: 'Dinheiro',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, currency, tag, description, method } = this.state;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((e) => (
              <option value={ e } key={ e }>{e}</option>
            ))}
          </select>
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="tag">
          tag
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <button onClick={ this.addExpenses } type="button">Adicionar despesas</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
