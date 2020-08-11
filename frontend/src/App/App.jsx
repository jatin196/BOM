import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { AddPart } from '../AddPart/AddPart';
import { AddProject } from '../Add-Project';
import { AllProjects } from '../All-Projects'
import { AllParts } from '../All-Parts';
import  ProjectDetails  from '../ProjectDetails'

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
                    <div >
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/add-project" component={AddProject} />

                                <Route path="/projects" component={AllProjects} />
                                <Route path="/projects/:projectId" component={ProjectDetails} />

                                <Route path="/all-parts" component={AllParts} />
                                <Route path="/add-part" component={AddPart} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };