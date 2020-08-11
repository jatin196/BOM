import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import axios from "axios"
import { getCsrfToken } from '../_services'
 class AddPart extends Component {
    constructor(props){
        super(props)
        this.state = {
            // name : "",
            description : "",
            parent : "",
            number : 0,
            submitted: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const {  description, parent, number} = this.state;
        if ( description && parent && number) {
            const csrftoken =  await getCsrfToken();
            console.log(csrftoken);
            let token = JSON.parse(localStorage.getItem('user')).data.token
            console.log("token" , token);
            
                // let lookupOptions = {
                //     method: "POST",
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: {
                //         part_desc : description, parent_part: parent, part_number : number, 
                //     },
                // }
      
                // fetch('http://127.0.0.1:8000/part-api/', lookupOptions).then(res => console.log(res))
            //    let data = {
            //     part_number : number, part_desc : description, parent_part: parent
            //    }
            // data = JSON.stringify(data)
            // axios({
            
            //         method: 'POST',
            //         url: 'http://127.0.0.1:8000/part-api/',
            //         headers: { 
            //           'Authorization': 'Base ' + token, 
            //           'Content-Type': 'application/x-www-form-urlencoded', 
            //         },
            //         data : data
                  
            //     // method: 'post',

            //     // headers: {  'Content-Type': 'application/x-www-form-urlencoded', "Access-Control-Allow-Headers": "*", 'X-CSRFToken': csrftoken, 'Authentication' : `Token ${token}`  },

            //     // url: `http://127.0.0.1:8000/part-api/`,
            //     // data: {
            //     //     csrfmiddlewaretoken: csrftoken,
            //     //    part_desc : description, parent_part: parent, part_number : number
         
            //     }).then(res => console.log("res", res))
                var axios = require('axios');
                var qs = require('qs');
                var data = qs.stringify({
                'part_desc': this.state.description,
                // 'parent_part': 'root',
                'part_number': '534' 
                });
                var config = {
                method: 'post',
                url: 'http://127.0.0.1:8000/api/parts/',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded', 
                },
                data : data
                };

                axios(config)
                .then(res =>  console.log(JSON.stringify(response.data)) )
                .catch(error  => console.log(error) );
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
      <div><TextField id="standard-basic" onChange={this.handleChange} label="Description" name="description" /></div>
      <div><TextField id="standard-basic" onChange={this.handleChange} label="Parent" name="parent" /></div>
      <div><TextField id="standard-basic" onChange={this.handleChange} label="Number" name="number" /></div>
      {/* <div><TextField id="standard-basic" onChange={this.handleChange} label="ProjectId" name="project" /></div> */}
      <input type="submit" value="submit" />
      </form>
            </div>
        )
    }
}

export { AddPart };
