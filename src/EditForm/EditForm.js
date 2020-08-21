import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
// import axios from "axios"
import { withRouter } from "react-router";
import { connect } from 'react-redux'

import Autocomplete from '@material-ui/lab/Autocomplete';
import { Navbar } from '../Navbar';
import { getAllParts, getProject } from '../_actions';
import { ListItemText } from '@material-ui/core';
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
 class EditForm extends Component {
    constructor(props){
        super(props)
        console.log('props', props);
        let part = {}
        let path = this.props.match.url.split('/')
        part = this.props.parts.find(p => p.id == +path[2])
        console.log('part', part)
        this.state = {
            // name : "",
            part_desc : part.part_desc,
            parent_part :  this.props.parts.find(p => p.part_desc == part.parent_part) || {},
            part_number : part.part_number,
            status : status[2].value &&  part.status,
            project : part.project,
            qty :  part.qty ,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

 
       async componentDidMount(){
        let path = this.props.match.url.split('/')

          await this.props.getParts()
           this.props.getProject(+path[2])
        console.log("ppp", this.props);
  
//         if(path[1]==='edit')
//         { 
//             console.log('edit mode');
//                 console.log("abc");
//                 console.log(this.props);
//                 console.log("path id ", path[2]);
//                 let part = this.props.parts.find(p =>p.id == path[2])
//                     console.log(part); 
//   }

    }
    async handleSubmit(e) {
        let url = process.env.REACT_APP_AXIOS_URL;

        e.preventDefault();
        await this.setState({  project : this.props.project.project_name });
        console.log('state' , this.state);
        let path = this.props.match.url.split('/')
        
        let method = ""
        path[1]=='edit' ? method='put' : method='post'
        path[1]=='edit' ? url +=`/api/parts/${+path[2]}` : url += `/api/parts/`

        const {  part_desc, parent_part, part_number, status} = this.state;
        if ( part_desc  && part_number && status) {
            // const csrftoken =  await getCsrfToken();
            // console.log(csrftoken);
            let token = JSON.parse(localStorage.getItem('user')).data.token
            console.log("token" , token);
                var axios = require('axios');

                var qs = require('qs');
                var data = qs.stringify({
                'part_desc': part_desc,
                'parent_part' : parent_part,

                'part_number': part_number,
                'project' : this.state.project,
                'status' : status,
                'qty' : this.state.qty
                });
                console.log(data);
                var config = {
                method: method,
                url: `${url}`,
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
                        status : "",
                        qty: ""
                    })
                    this.props.history.push('/home')
                    } )
                .catch(error  => console.log(error) );
        }}

    handleChange(e, val="") {
        if(e){
        let { name, value } = e.target;
        console.log("name, value , event: ",name,  value, e );
        if (val) {
            name='parent_part'
            value=val
        }
        this.setState({ [name]: value });}
    }
    
    // getSelectedItem(part){
    //     const item = this.props.parts.find((opt)=>{
    //       if (opt.value == part.part_number)
    //         return opt;
    //     })
    //     return item || {};
    //   }
    render() {
        // let path = this.props.match.url.split('/')

        // let part ={}
        // this.props.parts ?
        // (
        //     part = this.props.parts.find(p =>p.id == path[2])
        // )
        // :
        // part = {}
       
        
        return (<div>

            <Navbar></Navbar>
            <div className="my-5">

                <form  onSubmit={this.handleSubmit}>
      
      <div className="my-5"><TextField id="standard-basic" value={  this.state.part_desc}    onChange={this.handleChange} label="Description" name="part_desc" /></div>
      {/* <div><TextField id="standard-basic" onChange={this.handleChange} label="Parent Part" name="parent_part" /></div> */}
      <div className="my-5"><TextField id="standard-basic" value={  this.state.part_number}  onChange={this.handleChange} label="Part Number" name="part_number" /></div>
      <div className="my-5"><TextField id="standard-basic" value={ this.state.qty}  onChange={this.handleChange} label="Quantity" name="qty" /></div>
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
      {
          this.props.parts ? 
      <Autocomplete
      className="my-5"
  id="combo-box-demo"
  options={this.props.parts}
  getOptionLabel={(option) => option.part_number}
  
      value={this.state.parent_part}

  style={{ width: 300 }}
  onInputChange={this.handleChange}
  label="Parent Part" 
            
  name="parent_part"
  renderInput={(params) => <TextField {...params}   label="Parent Part"    name="parent_part"
    variant="outlined"
    
    />}
/>
:
"loading..."
}
      <input className="my-5" type="submit" value="submit" />
      </form>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {loading, project, parts} = state.api

    return {
        loading : loading,
        project : project,
        parts  : parts
    }    
}
const mapDispatchToProps = {
    getParts : getAllParts,
    getProject : getProject
}
const connectedEditForm = connect(mapStateToProps, mapDispatchToProps)(EditForm)
export { connectedEditForm as EditForm }

// export default withRouter(AddPart) ;
