import React, { Component } from 'react'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
// import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';



class AllParts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parts : []
        }

    }

    componentDidMount(){
    const axios = require('axios')
const url = process.env.serverUrl;

    axios({
        method: 'get',
        url : `${url}/api/parts/`
        }
    ).then(res => {
        console.log(res)
        this.setState({parts: res.data})
    })
    }

    render(){
        return(
            <div>
                <div className="container-fluid">
                    <div class="row">
            <div className="d-flex justify-content-center col mt-5 "><h1> All parts </h1></div>
            <div className="float-right d-flex align-items-end mb-3 ">
                <Link to={`/add-part/`}>
                 <Chip color="primary" label="Add Part" avatar={<Avatar>+</Avatar>} clickable  /> 
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
                this.state.parts.map((part,index) => {
                    return(
                    <tr>
                        <th scope="row">{index}</th>
                        <td>{part.part_number}</td>
                        <td>{part.part_desc}</td>
                        <td>{part.parent_part ? part.parent_part.part_number : <span>null</span> }</td>
                    </tr>)
                })
            }
            </tbody>
            </table>
            </div>
        )
    }
}


export { AllParts };