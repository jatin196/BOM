
import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux' 
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { userActions } from '../_actions';

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                password1: '',
                password2: ''
            },
            errors: {
                email:'',
                password1:'',
                password2:'',
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;

        let errors = this.state.errors;

        switch (name) {

          case 'email': 
            errors.email = 
              validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
          case 'password1': 
            errors.password1 = 
              value.length < 8
                ? 'Password must be at least 8 characters long!'
                : '';
            break;

            case 'password2': 
            errors.password2 = 
              this.state.password1 === this.state.password2
                ? 'Passwords do not match'
                : '';
            break;
          default:
            break;
        }
    
        this.setState({errors, [name]: value});

        this.setState({
            errors:errors,
            user: {
            
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        console.log("usererer", user)
        if(validateForm(this.state.errors)) {
            console.info('Valid Form')
            this.props.register(user);

          }else{
            console.error('Invalid Form')
          }
        this.setState({             
            user: {
            email: '',
            password1: '',
            password2: ''
        },
            errors: {
                email:'',
                password1:'',
                password2:'',
            },
        submitted: false });
        this.history.push('/')
        
    }

    render() {
        const { registering  } = this.props;
        const {errors} = this.state;
        const { user, submitted } = this.state;
        return (
            <Container  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

            <div className="col-md-6 col-md-offset-3 mt-5">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
        
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {(submitted && !user.email &&
                            <div className="help-block">Email is required</div>) ||
                            (errors.email.length > 0 && 
                                <span className='error'>{errors.email}</span>)
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password1 ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password1" value={user.password1} onChange={this.handleChange} />
                        {(submitted && !user.password1 &&
                            (
                            <div className="help-block">Password is required</div>
                            )) ||
                            (
                            errors.password1.length > 0 && <span className='error'>{errors.password1}</span>
                            )
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password2 ? ' has-error' : '')}>
                        <label htmlFor="password2">Confirm Password</label>
                        <input type="password" className="form-control" name="password2" value={user.password2} onChange={this.handleChange} />
                        {submitted && !user.password1 &&
                            <div className="help-block">Password is required</div>
                        }
                        {submitted && user.password1 !== user.password2 &&
                            <div className="help-block">Passwords Don't match</div>
                            ||
                            (
                            errors.password2.length > 0 && <span className='error'>{errors.password2}</span>
                            )
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        {registering && 
                            <img alt="def" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                           <Link component={RouterLink}  to={{pathname: `/login`}}>
                    
                    <button className="btn btn-link" >To Login</button>
                </Link>
                  
                    </div>
                </form>
            </div>
            </Container>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

export default connect(mapState, actionCreators)(RegisterPage) 
