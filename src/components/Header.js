import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expense } = this.props;

    const expensesCost = expense
      .reduce((acc, { value, currency, exchangeRates }) => (
        acc + Number(value * Object.entries(exchangeRates)
          .find((e) => e[0] === currency)[1].ask)), 0).toFixed(2);

    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
        <span data-testid="total-field">
          { expensesCost }
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expense: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expense: PropTypes.shape({
    value: PropTypes.number,
    length: PropTypes.number,
    map: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
