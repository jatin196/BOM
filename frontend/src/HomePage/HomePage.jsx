import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar } from '../Navbar'
import { userActions } from '../_actions';
import { AllParts } from '../All-Parts';

class HomePage extends React.Component {
    // componentDidMount() {
    //     this.props.getUsers();
    // }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <Navbar></Navbar>
                {/* <h1>Hi {user.firstName}!</h1> */}
                {/* <p>You're logged in with React!!</p> */}
                <AllParts></AllParts>
                {/* <p>
                    <Link to="/login">Logout</Link>
                </p> */}
            </div>
        );
    }
}

// function mapState(state) {
//     const { users, authentication } = state;
//     const { user } = authentication;
//     return { user, users };
// }

// const actionCreators = {
//     getUsers: userActions.getAll,
//     deleteUser: userActions.delete
// }

// const connectedHomePage = connect(mapState, actionCreators)(HomePage);
// export { connectedHomePage as HomePage };
export {  HomePage };