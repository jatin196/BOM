import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
// import axios from "axios"
import { withRouter } from "react-router";
import { connect } from 'react-redux'

import Autocomplete from '@material-ui/lab/Autocomplete';
import { Navbar } from '../Navbar';
// import { getCsrfToken } from '../_services'

const status = [
    {
        value : 'done',
        label : 'Done'
    },
    {
        value : 'improve',
        label : 'Needs Improvement'
    },
    {
        value : 'pending',
        label : 'Pending'
    },
    {
        value : 'discuss',
        label : 'Discuss Later'
    }
]
 class AddPart extends Component {
    constructor(props){
        super(props)
        console.log('props', props);
        this.state = {
            // name : "",
            part_desc : "",
            parent_part : '',
            part_number : "",
            status : status[2].value,
            project : '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        await this.setState({  project : this.props.project.project_name });
        console.log('state' , this.state);

        const {  part_desc, parent_part, part_number, status} = this.state;
        if ( part_desc  && part_number && status) {
            // const csrftoken =  await getCsrfToken();
            // console.log(csrftoken);
            let token = JSON.parse(localStorage.getItem('user')).data.token
            console.log("token" , token);
                var axios = require('axios');
        const url = process.env.REACT_APP_AXIOS_URL;

                var qs = require('qs');
                var data = qs.stringify({
                'part_desc': part_desc,
                'parent_part' : parent_part,

                'part_number': part_number,
                'project' : this.state.project,
                'status' : status
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
                        status : ""
                    })
                    this.props.history.push('/home')
                    } )
                .catch(error  => console.log(error) );
        }}

    handleChange(e, val="") {

        let { name, value } = e.target;
        console.log("name, value , event: ",name,  value, e );
        if (val) {
            name='parent_part'
            value=val
        }
        this.setState({ [name]: value });
    }

    render() {
        return (<div>
            <Navbar></Navbar>
            <div className="my-5">

                <form  onSubmit={this.handleSubmit}>
      <div className="my-5"><TextField id="standard-basic" onChange={this.handleChange} label="Description" name="part_desc" /></div>
      {/* <div><TextField id="standard-basic" onChange={this.handleChange} label="Parent Part" name="parent_part" /></div> */}
      <div className="my-5"><TextField id="standard-basic" onChange={this.handleChange} label="Part Number" name="part_number" /></div>
      <div className="my-5"> <TextField
          id="standard-select-currency-native"
          select
          style={{width: 150}}
          label="Part Status"
          value={this.state.status}
          name='status'
          onChange={this.handleChange}
          SelectProps={{
            native: true,
          }}
        >
            {status.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        </div>
      {/* <div><TextField id="standard-basic" value={this.state.} label="Project" name="project" /></div> */}
      {/* <div><TextField id="standard-basic" onChange={this.handleChange} label="ProjectId" name="project" /></div> */}
      {/* <input hidden type="text" value={this.props.location.state} name="project"  /> */}
      {console.log(this.props.location.state.parts)}
      <Autocomplete
      className="my-5"
  id="combo-box-demo"
  options={this.props.project.parts}
  getOptionLabel={(option) => option.part_number}
  style={{ width: 300 }}
  onInputChange={this.handleChange}
  label="Parent Part" 
  name="parent_part"
  renderInput={(params) => <TextField {...params} label="Parent Part"    name="parent_part"
    variant="outlined" />}
/>
      <input className="my-5" type="submit" value="submit" />
      </form>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {loading, project} = state.api

    return {
        loading : loading,
        project : project
    }    
}
// const mapDispatchToProps = {
//     getProject : getProject
// }
const coonnectedAddPart = connect(mapStateToProps, null)(AddPart)
export { coonnectedAddPart as AddPart }

// export default withRouter(AddPart) ;
