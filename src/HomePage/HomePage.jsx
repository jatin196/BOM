import React from 'react';
import { Navbar } from '../Navbar'
import { withRouter } from 'react-router-dom';
import { AllProjects } from '../All-Projects';

class HomePage extends React.Component {

    render() {
        console.log('props', this.props);

        return (
            <div style={{overflowX : "hidden",overflowY : "hidden", position:"relative"}}>
                <Navbar></Navbar>
                <AllProjects></AllProjects>
              

            </div>
        );
    }
}

export default withRouter(HomePage);