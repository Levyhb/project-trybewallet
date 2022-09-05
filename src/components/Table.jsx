import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { editExpense, removeExpense } from '../redux/actions';
import './table.css';

class Table extends Component {
  removeExpense = (id) => {
    console.log(id);
    const { expenses, dispatch } = this.props;
    const deleteExpense = expenses.filter((e) => e.id !== id);
    dispatch(removeExpense(deleteExpense));
  };

  updateExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses, idToEdit, editor } = this.props;

    return (
      <table className="table">
        <thead className="table-head-expenses">
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
        {expenses.length > 0 ? expenses.map((element) => (
          <tbody key={ element.id } className="table-body-expenses">
            <tr className={ editor && idToEdit === element.id ? 'is-selected' : '' }>
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
              <td className="buttons-expenses">
                <button
                  type="button"
                  data-testid="edit-btn"
                  className="button is-warning btn-edit"
                  onClick={ () => this.updateExpense(element.id) }
                >
                  Editar
                  <AiFillEdit />
                </button>
                <button
                  type="button"
                  className="button is-danger"
                  onClick={ () => this.removeExpense(element.id) }
                  data-testid="delete-btn"
                >
                  Excluir
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          </tbody>
        )) : null}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

Table.propTypes = {
  expenses: string,
}.isRequired;
export default connect(mapStateToProps)(Table);
