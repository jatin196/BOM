import React, { Component } from 'react'
import { connect } from 'react-redux';
import { logout } from '../_services/user.service'
import { userActions } from '../_actions';
import { Route, Redirect } from 'react-router-dom';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    // localStorage.removeItem('key');

    console.log(event);
    // <Redirect to='/'/>
  }
    render () {
        return (
            
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="#">BOM</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      {/* <li className="nav-item active">

      { 
        localStorage.getItem('key') ? 
        <a className="nav-link" id="logout" onClick={this.handleClick}>Logout <span className="sr-only">(current)</span></a>
        :
        <a className="nav-link" id="login" onClick={this.handleClick} href="#">Login <span className="sr-only">(current)</span></a>
        
    }
      </li> */}

 



    </ul>
  
  </div>
</nav>
        
        )
    }
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};
const connectedNavbar = connect(mapState, actionCreators)(Navbar);

export { connectedNavbar as Navbar };