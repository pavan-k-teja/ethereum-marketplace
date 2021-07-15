import React, { Component } from 'react';
import './Navbar.css';

class App extends Component {

  render() {
    return (
      
        <nav className="navbar navbar-dark fixed-top flex-md-nowrap p-3 shadow" style={{backgroundColor: "#1f2833"}}>
            
            <a href="#" style={{textDecoration: 'none', fontStyle: 'bold', pointerEvents: 'none', color: '#66fcf1', fontSize: 'larger'}}>Ethereum Marketplace</a>

            <ul className="navbar-nav px-10">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small className="text-white">
                <span id="account" style={{fontSize: 'larger'}}>Account: {this.props.account}</span>
                </small>
            </li>
            </ul>
        </nav>
    );
  }
}

export default App;
