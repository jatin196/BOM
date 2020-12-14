import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
// import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import  HomePage  from '../HomePage/HomePage';
import  LoginPage  from '../LoginPage/LoginPage';
import  RegisterPage  from '../RegisterPage/RegisterPage';
import { AddPart } from '../AddPart/AddPart';
import  AddProject  from '../Add-Project/Add-Project';
import { AllProjects } from '../All-Projects'
import { AllParts } from '../All-Parts';
import  {ProjectDetails}  from '../ProjectDetails/ProjectDetails'
import {BomList} from '../bom-list/Bom-list';
import Footer from '../footer';
class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            // this.props.clearAlerts();
        });
        
    }

    render() {
        const { alert } = this.props;
        return (
                    <>
                    <div style={{position:"relative"}}>                      
                      {/* {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        } */}
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute  component={HomePage} path="/home" exact   />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <PrivateRoute path="/add-project" component={AddProject} />
                                <PrivateRoute path="/bom" component={BomList} />
                                <PrivateRoute path="/projects/:projectId" component={ProjectDetails} />

                                <PrivateRoute path="/projects" component={AllProjects} />

                                <PrivateRoute path="/all-parts" component={AllParts} />
                                <PrivateRoute path="/add-part/:projectId" component={AddPart} />
                                <PrivateRoute path="/edit/:partId" component={AddPart} />
                                <PrivateRoute path="/add-bom" component={AddPart} />

                                
                                <Redirect from="*" to="/home" />
                            </Switch>
                        </Router>
                        <div style={{"padding": "30px"}}>
                            
                        <Footer></Footer>
                        </div>
                        </div>

                    </>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

// const actionCreators = {
//     clearAlerts: alertActions.clear
// };

const connectedApp = connect(mapState, null)(App);
export { connectedApp as App };