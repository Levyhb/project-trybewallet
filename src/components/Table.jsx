import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './components.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table className="table-head">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de Pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor Convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
        {expenses.length > 0 ? expenses.map((element) => (
          <table key={ element.id } className="table-body">
            <tbody>
              <tr>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.currency}</td>
                <td>
                  {(element.value * Number(element.exchangeRates[element.currency].ask))
                    .toFixed(2)}
                </td>
                <td>
                  {Number((element.exchangeRates[element.currency]).ask)
                    .toFixed(2)}
                </td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>Real</td>
                <button type="button">Editar/Excluir</button>
              </tr>
            </tbody>
          </table>
        )) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }).isRequired,
};
export default connect(mapStateToProps)(Table);
