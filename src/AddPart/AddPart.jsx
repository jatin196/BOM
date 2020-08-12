import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
// import axios from "axios"
import { withRouter } from "react-router";

// import { getCsrfToken } from '../_services'
 class AddPart extends Component {
    constructor(props){
        super(props)
        console.log('props', props);
        this.state = {
            // name : "",
            part_desc : "",
            parent_part : "",
            part_number : '',
            project : '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);





    }

    async handleSubmit(e) {
        e.preventDefault();
        await this.setState({  project : this.props.location.state });
        console.log('state' , this.state);

        const {  part_desc, parent_part, part_number} = this.state;
        if ( part_desc && parent_part && part_number) {
            // const csrftoken =  await getCsrfToken();
            // console.log(csrftoken);
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
        const url = process.env.serverUrl;

                var qs = require('qs');
                var data = qs.stringify({
                'part_desc': part_desc,
                'parent_part' : parent_part,

                'part_number': part_number,
                'project' : this.state.project
                });
                console.log(data);
                var config = {
                method: 'post',
                url: `${url}/api/parts/`,
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded', 
                },
                data : data
                };

                axios(config)
                .then(res => {
                    console.log(JSON.stringify(res.data))
                    this.setState({
                        part_desc : "",
                        parent_part : "",
                        part_number : "",
                        project : "",
                    })
                    this.props.history.push('/home')
                    } )
                .catch(error  => console.log(error) );
        }
    
}

    handleChange(e) {

        const { name, value } = e.target;
        console.log("name, value : ", name, value );
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div>
                <form  noValidate autoComplete="off" onSubmit={this.handleSubmit}>
      <div><TextField id="standard-basic" onChange={this.handleChange} label="Description" name="part_desc" /></div>
      <div><TextField id="standard-basic" onChange={this.handleChange} label="Parent Part" name="parent_part" /></div>
      <div><TextField id="standard-basic" onChange={this.handleChange} label="Part Number" name="part_number" /></div>
      {/* <div><TextField id="standard-basic" value={this.state.} label="Project" name="project" /></div> */}
      {/* <div><TextField id="standard-basic" onChange={this.handleChange} label="ProjectId" name="project" /></div> */}
      {/* <input hidden type="text" value={this.props.location.state} name="project"  /> */}
      <input type="submit" value="submit" />
      </form>
            </div>
        )
    }
}

export default withRouter(AddPart) ;
