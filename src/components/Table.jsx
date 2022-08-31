import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import './components.css';
import { editExpense, removeExpense } from '../redux/actions';

class Table extends Component {
  removeExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const deleteExpense = expenses.filter((e) => e.id !== id);
    dispatch(removeExpense(deleteExpense));
  };

  updateExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table className="table-head">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
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
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.updateExpense(element.id) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.removeExpense(element.id) }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
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
  expenses: string,
}.isRequired;
export default connect(mapStateToProps)(Table);
