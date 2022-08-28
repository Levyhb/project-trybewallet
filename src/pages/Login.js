import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userData } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { history, dispatch } = this.props;
    dispatch(userData(this.state));
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    const emailRegex = /\S+@\S+\.\S+/.test(email);
    const passwordLength = 6;
    const isDisabled = (password.length < passwordLength || !emailRegex);

    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          onChange={ this.handleChange }
          value={ password }
        />
        <button type="submit" disabled={ isDisabled }>Entrar</button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
