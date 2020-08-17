import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { Navbar } from '../Navbar';

 class AddProject extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            project_name : '',
            project_desc : ''
             
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }


     handleSubmit(e) {
const url = process.env.REACT_APP_AXIOS_URL;

        e.preventDefault();
        var axios = require('axios');
        var qs = require('qs');
        var FormData = require('form-data');

        const {  project_name, project_desc} = this.state;
        if ( project_name && project_desc ){

          var data = new FormData();
          data.append('project_name', project_name);
          data.append('project_desc', project_desc);
          
          var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/projects/',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded', 

            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
          
           }
        
}

    handleChange(e) {
        console.log(e.target.name);
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(value);
    }

    render() {
        return (
            <div>
              <Navbar></Navbar>
              <div className="mt-5">
                <form  noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <div><TextField id="standard-basic" onChange={this.handleChange} label="Project Name" name="project_name" /></div>
                    <div><TextField id="standard-basic" onChange={this.handleChange} label="Project Description" name="project_desc" /></div>
                    <input type="submit" value="submit" />
                </form>
                </div>
            </div>
        )
    }
}

export  default AddProject ;
