import React, { Component } from 'react'
import {  Link as RouterLink} from 'react-router-dom'
import axios from 'axios'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux'

import Link from '@material-ui/core/Link';
import {getProject} from '../_actions/api.actions'


import { withRouter } from "react-router";

 class ProjectDetails extends Component {
      constructor(props) {
         super(props)
     
         this.state = {
              project : {}
         }

         
     }
       
    componentDidUpdate(){

        console.log("upd", this.props);
        
        
    }
    async  componentDidMount(){
        const pid = this.props.match.params.projectId
        console.log("pid", pid);
        await this.props.getProject(+pid)
        
        // // console.log("def" , this.props);

        //  let project = []
        // await  this.props.projects ?
        //  project = this.props.projects.find(pro => pro.id === +id)
        //  :
        //  project={}
        // this.setState({project : project})
    }
    render() {
        return (
            <div>
                  <div className="container-fluid">
                    <div class="row">
            <div className="d-flex justify-content-center col mt-5 "><h1>{this.props.project ?  this.props.project.project_name  : "loading ... "  } </h1></div>
            <div className="float-right d-flex align-items-end mb-3 ">
            <Link component={RouterLink}  to={{pathname: `/add-part`, state: {'project' :`${this.state.project.project_name}`, 'parts': `${this.state.project.parts}`}}}>
                <button className="btn float-right btn-link ml-auto " >Add Part</button> 
                 </Link>
            </div>
            </div>
            </div>
            {/* <div class="container-fluid">
                <div class="row">
                
        <div className="d-flex justify-content-center col mt-5 "><h1>{ this.props.project ?  this.props.project.project_name  : "loading ... "   }</h1></div>
        <div className="float-right d-flex align-items-end mb-3 ">
            { this.state.project && <Link component={RouterLink}  to={{pathname: `/add-part`, state: {'project' :`${this.state.project.project_name}`, 'parts': `${this.state.project.parts}`}}}>
                
                <Chip color="primary" label="Add Part" avatar={<Avatar>+</Avatar>} /> 
                </Link>}
        </div>
        </div>

        </div> */}
            <table className="table table-striped">
            <thead>
             <tr>
                <th scope="col">#</th>
                <th scope="col">Part Number</th>
                <th scope="col">Part Description</th>
                <th scope="col">Status</th>
                <th scope="col">Parent Part</th>
            </tr>
            </thead>
            <tbody>
            {   
                this.props.project ?
                this.props.project.parts.map((part,index) => {
                    return(
                    <tr key={part.id}>
                        <th scope="row">{index}</th>
                        <td>{part.part_number}</td>
                        <td>{part.part_desc}</td>
                        <td>{part.status}</td>
                        <td>{part.parent_part ? part.parent_part : <span>null</span> }</td>
                    </tr>)
                })
                :
            <h1>Loading...</h1>  

            }
            </tbody>
            </table>
            </div>
        )}}

const mapStateToProps = (state, ownProps) => {
    const {loading, project} = state.api

    return {
        loading : loading,
        project : project
    }    
}
const mapDispatchToProps = {
    getProject : getProject
}
const connectedProjectDetails = connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)
export { connectedProjectDetails as ProjectDetails }
// export default withRouter(ProjectDetails) 
