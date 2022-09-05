import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import './pages.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div className="container-wallet">
          <Header />
          <WalletForm />
          <Table />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Wallet;
