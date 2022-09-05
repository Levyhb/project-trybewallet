import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import coin from '../imgs/coin.png';
import './header.css';

class Header extends Component {
  render() {
    const { email, expense } = this.props;

    const expensesCost = expense
      .reduce((acc, { value, currency, exchangeRates }) => (
        acc + Number(value * Object.entries(exchangeRates)
          .find((e) => e[0] === currency)[1].ask)), 0).toFixed(2);

    return (
      <header className="header-table">
        <div className="header-title">
          <h1>TrybeWallet</h1>
          <img src={ coin } alt="coin-icon" className="coin-icon" />
        </div>
        <p data-testid="email-field" className="user-email">
          { email }
        </p>
        <div className="total-field">
          <span data-testid="total-field">
            <lord-icon
              src="https://cdn.lordicon.com/qhviklyi.json"
              trigger="hover"
              colors="primary:#e4e4e4,secondary:#e8b730"
              style={ { width: '50px', height: '50px' } }
            />
            Despesa total:
            {' '}
            { expensesCost }
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

Header.propTypes = {
  email: string,
}.isRequired;

export default connect(mapStateToProps)(Header);
