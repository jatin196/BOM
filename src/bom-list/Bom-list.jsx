import React, { Component } from 'react'
import { Navbar } from '../Navbar';
import { Link } from '@material-ui/core';
import {  Link as RouterLink} from 'react-router-dom'
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { getAllParts } from '../_actions';
import { connect } from 'react-redux';
import Footer from '../footer';



class BomList extends Component {      
 
   async  componentDidMount(){
  
       await this.props.getParts()

   }
   UTCDateToLocal(date) {
    return new Date(date);
  }
  UTCTimeToLocal(date) {
    console.log(typeof date);
    const utcdate = new Date(date);
    // return utcdate.toLocaleString;
    return (
      utcdate.getDate() +
      "/" +
      utcdate.getMonth() +
      "/" +
      utcdate.getFullYear() +
      " " +
      utcdate.getHours() +
      ":" +
      utcdate.getMinutes()
    );
  }
   render() {
       return (
           <div style={{"overflowX" : "hidden"}}>
               <Navbar></Navbar>
                 <div className="container-fluid">
                   <div class="row">
           <div className="d-flex justify-content-center col mt-4">
               <h1>Parts List</h1>
           </div>
           <div className="float-right d-flex align-items-end mb-3 ">
            <Link component={RouterLink}  to={{pathname: `/add-bom`}} >
                <button className="btn float-right btn-link ml-auto " >Add Part</button> 
                 </Link>
                 
            </div>
           </div>
       <div className="ml-5 mr-5">
           <table className="table">
           <thead>
            <tr>
               {/* <th scope="col">#</th> */}
               {/* <th scope="col">Parent Part</th> */}
               <th scope="col">Part Number</th>

               {/* <th scope="col">Quantity</th> */}
               <th scope="col">Part Description</th>
               <th scope="col">Status</th>
               <th scope="col">Modeling Time</th>
                  <th scope="col">Detailing Time</th>
                  {/* <th scope="col">Assembly Time</th> */}
                  <th scope="col">Supplier</th>
               <th scope="col"></th>
           </tr>
           </thead>
           <tbody>
           {   
               this.props.parts ?
               this.props.parts.sort(function(a, b) {
                if (a.id < b.id) return -1;
                else return 1;
            }).map((part,index) => {
                   return(
                   <tr key={part.id}>
                       {/* <th scope="row">{index+1}</th> */}
                       {/* <td>{part.parent_part ? part.parent_part : <span>null</span> }</td> */}
                       <td>{part.part_number}</td>
                       {/* <td>{part.qty}</td> */}
                       {/* <td>{part.qty}</td> */}

                       <td>{part.part_desc}</td>
                       <td>{part.status}</td>
                          <td>
                            {part.modeling_time
                              ? this.UTCTimeToLocal(part.modeling_time)
                              : "-"}
                          </td>
                          {/* <td>{part.modeling_time ? part.modeling_time : '-'}</td> */}
                          <td>
                            {part.detailing_time
                              ? this.UTCTimeToLocal(part.detailing_time)
                              : "-"}
                          </td>
                          {/* <td>
                            {part.assembly_time
                              ? this.UTCTimeToLocal(part.assembly_time)
                              : "-"}
                          </td> */}
                          <td>{part.supplier ? part.supplier : "-"}</td>
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
           </div>
           <Footer></Footer>

           </div>
       )}}

const mapStateToProps = (state) => {
   const {loading, parts} = state.api

   return {
       loading : loading,
       parts  : parts

   }    
}
const mapDispatchToProps = {
    getParts : getAllParts,

}

const connectedParts = connect(mapStateToProps, mapDispatchToProps)(BomList)
export { connectedParts as BomList }
