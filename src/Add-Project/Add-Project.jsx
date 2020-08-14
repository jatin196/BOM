import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';

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
        const {  project_name, project_desc} = this.state;
        if ( project_name && project_desc ){

                var data = qs.stringify({
                   project_name: project_name,
                   project_desc: project_desc
                   });
                   var config = {
                     method: 'post',
                     url: `${url}/api/projects/`,
                     headers: { 
                       'Content-Type': 'application/x-www-form-urlencoded', 
                     },
                     data : data
                   };
                   
                   axios(config)
                   .then(function (response) {
                     console.log(JSON.stringify(response.data));
                   })
                   .catch(error => {
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
                <form  noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <div><TextField id="standard-basic" onChange={this.handleChange} label="Project Name" name="project_name" /></div>
                    <div><TextField id="standard-basic" onChange={this.handleChange} label="Project Description" name="project_desc" /></div>
                    <input type="submit" value="submit" />
                </form>
            </div>
        )
    }
}

export  { AddProject }
