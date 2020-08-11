import React from 'react';
import { Navbar } from '../Navbar'
import { withRouter } from 'react-router-dom';
// import { AllParts } from '../All-Parts';
import { AllProjects } from '../All-Projects';

class HomePage extends React.Component {
    // componentDidMount() {
    //     this.props.getUsers();
    // }

    // handleDeleteUser(id) {
    //     return (e) => this.props.deleteUser(id);
    // }

    render() {
        console.log('props', this.props);

        // const { user, users } = this.props;
        return (
            <div>
                <Navbar></Navbar>
                {/* <h1>Hi {user.firstName}!</h1> */}
                {/* <p>You're logged in with React!!</p> */}
                <AllProjects></AllProjects>
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
export default withRouter(HomePage);