import React, { Component } from 'react';
import './footer.css';

export default class
  extends Component {
  render() {
    return (
      <footer className="footer-trybewallet">
        <p className="footer-contents">
          Desenvolvido por
          {' '}
          <a href="https://github.com/Levyhb">Levy Bezerra &copy;</a>
        </p>
      </footer>
    );
  }
}
