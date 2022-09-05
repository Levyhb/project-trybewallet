import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { userData } from '../redux/actions';
import './pages.css';
import wallet from '../imgs/wallet-img.png';
import coin from '../imgs/coin.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showPassword: false,
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

  showOrHidePassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    });
  };

  render() {
    const { email, password, showPassword } = this.state;
    const emailRegex = /\S+@\S+\.\S+/.test(email);
    const passwordLength = 6;
    const passwordValid = password.length < passwordLength;
    const isDisabled = (passwordValid || !emailRegex);

    return (
      <div className="container-login">
        <img
          src={ wallet }
          alt="wallet"
          className="wallet-img"
        />

        <form onSubmit={ this.handleSubmit } className="form-login">
          <div className="title-div">
            <h2>
              TrybeWallet
              <img src={ coin } alt="coin-icon" className="coin-icon" />
            </h2>
          </div>
          <div className="input-login">
            <input
              type="email"
              name="email"
              id="email"
              data-testid="email-input"
              placeholder="email@teste.com"
              value={ email }
              onChange={ this.handleChange }
              className={ !emailRegex ? 'input is-danger' : 'input is-success' }
            />
            <AiOutlineMail className="icon-input" />
          </div>
          <Tooltip
            title="Sua senha deve ter mais de 6 caracteres"
            position="top"
            trigger="click"
          >
            <div className="password-input">
              <input
                type={ showPassword ? 'text' : 'password' }
                name="password"
                id="password"
                placeholder="senha"
                data-testid="password-input"
                onChange={ this.handleChange }
                value={ password }
                className={ passwordValid ? 'input is-danger' : 'input is-success' }
              />
              <RiLockPasswordFill className="icon-input" />
              { !showPassword ? <AiFillEye
                className="show-password"
                onClick={ this.showOrHidePassword }
              /> : <AiFillEyeInvisible
                className="show-password"
                onClick={ this.showOrHidePassword }
              /> }
            </div>
          </Tooltip>
          <button
            type="submit"
            disabled={ isDisabled }
            className="button btn-login"
          >
            Entrar
          </button>
        </form>
      </div>
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
