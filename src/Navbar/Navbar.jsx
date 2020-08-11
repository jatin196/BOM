import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { logout } from '../_services/user.service'
import { userActions } from '../_actions';
import {  Link, Redirect } from 'react-router-dom';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    console.log("kya hua")
    localStorage.removeItem('user')

     return <Redirect to='/login'/>
  }
    render () {
        return (
            
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="/">BOM</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <a href='/' className="nav-link">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item active">

      { 
        localStorage.getItem('user') ? 
        <Link to='/login' onClick={this.handleClick} className="nav-link" id="logout">Logout</Link>
        :
        <Link to='/login' className="nav-link" id="login">Login</Link>

        
    }

        
      </li>

 



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

