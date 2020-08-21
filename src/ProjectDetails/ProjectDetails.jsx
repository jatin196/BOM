import React, { Component } from 'react'
import {  Link as RouterLink} from 'react-router-dom'
import axios from 'axios'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux'

import Link from '@material-ui/core/Link';
import {getProject, getAllParts} from '../_actions/api.actions'

import EditRoundedIcon from '@material-ui/icons/EditRounded';

import { withRouter } from "react-router";
import { Navbar } from '../Navbar';

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
        await this.props.getParts()

        
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
                <Navbar></Navbar>
                  <div className="container-fluid">
                    <div class="row">
            <div className="d-flex justify-content-center col mt-5 "><h1>{this.props.project ?  this.props.project.project_name  : "loading ... "  } </h1></div>
            <div className="float-right d-flex align-items-end mb-3 ">
                {
                    this.props.project ?
            <Link component={RouterLink}  to={{pathname: `/add-part/${this.props.project.id}`}} >
                <button className="btn float-right btn-link ml-auto " >Add Part</button> 
                 </Link>
                : "" 
                }
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
                <th scope="col">Parent Part</th>
                <th scope="col">Quantity</th>
                <th scope="col">Part Number</th>
                <th scope="col">Part Description</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            {   
                this.props.project ?
                this.props.project.parts.map((part,index) => {
                    return(
                    <tr key={part.id}>
                        <th scope="row">{index}</th>
                        <td>{part.parent_part ? part.parent_part : <span>null</span> }</td>
                        <td>{part.qty}</td>
                        <td>{part.part_number}</td>
                        <td>{part.part_desc}</td>
                        <td>{part.status}</td>
                        <Link component={RouterLink}  to={{pathname: `/edit/${part.id}`}} >
                            <td> <EditRoundedIcon /></td>
                        </Link>
                    </tr>)
                })
                :
            <h1>Loading...</h1>  

            }
            </tbody>
            </table>
            </div>
        )}}

const mapStateToProps = (state) => {
    const {loading, project , parts} = state.api

    return {
        loading : loading,
        project : project,
        parts  : parts

    }    
}
const mapDispatchToProps = {
    getProject : getProject,
    getParts : getAllParts,

}
const connectedProjectDetails = connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)
export { connectedProjectDetails as ProjectDetails }
// export default withRouter(ProjectDetails) 
