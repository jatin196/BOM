import React, { Component } from 'react'
import {  Link as RouterLink} from 'react-router-dom'
import axios from 'axios'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

import { withRouter } from "react-router";
 class ProjectDetails extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              project : []
         }
     }
     

    componentDidMount() {
        
        const id = this.props.match.params.projectId
        console.log(this.props)
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/api/projects/${id}/`
        }).then(res => {
            console.log(res)
            this.setState({project : res.data})
        })
        
    }

    render() {
        return (
            <div>
                <div class="container-fluid">
                    <div class="row">
            <div className="d-flex justify-content-center col mt-5 "><h1> {this.state.project.project_name} </h1></div>
            <div className="float-right d-flex align-items-end mb-3 ">
                <Link component={RouterLink}  to={{pathname: `/add-part`, state: `${this.state.project.project_name}`}}>
                    
                 <Chip color="primary" label="Add Part" avatar={<Avatar>+</Avatar>} /> 
                 </Link>
            </div>
            </div>

            </div>
            <table className="table table-striped">
            <thead>
             <tr>
                <th scope="col">#</th>
                <th scope="col">Part Number</th>
                <th scope="col">Part Description</th>
                <th scope="col">Parent Part</th>
            </tr>
            </thead>
            <tbody>
            {   
                this.state.project.parts ?
                this.state.project.parts.map((part,index) => {
                    return(
                    <tr key={part.id}>
                        <th scope="row">{index}</th>
                        <td>{part.part_number}</td>
                        <td>{part.part_desc}</td>
                        <td>{part.parent_part ? part.parent_part : <span>null</span> }</td>
                    </tr>)
                })
                :
            <h1>Loading...</h1>  

            }
            </tbody>
            </table>
            </div>
        )
    }
}

export default withRouter(ProjectDetails) 
