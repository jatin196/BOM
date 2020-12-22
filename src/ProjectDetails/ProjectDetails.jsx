import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";

import Link from "@material-ui/core/Link";
import { getProject, getAllParts } from "../_actions/api.actions";

import EditRoundedIcon from "@material-ui/icons/EditRounded";

import { withRouter } from "react-router";
import { Navbar } from "../Navbar";
import Footer from "../footer";

class ProjectDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: {},
    };
  }

  componentDidUpdate() {
    console.log("upd", this.props);
  }
  async componentDidMount() {
    const pid = this.props.match.params.projectId;
    console.log("pid", pid);
    this.props.getProject(+pid);
    await this.props.getParts();

    // // console.log("def" , this.props);

    //  let project = []
    // await  this.props.projects ?
    //  project = this.props.projects.find(pro => pro.id === +id)
    //  :
    //  project={}
    // this.setState({project : project})
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
      <div style={{ overflowX: "hidden", height: "100%", bottom: "0px" }}>
        <Navbar></Navbar>
        <div className="container-fluid">
          <div class="row">
            <div className="d-flex justify-content-center col mt-5 ">
              <h1>
                {this.props.project
                  ? this.props.project.project_name
                  : "loading ... "}{" "}
              </h1>
            </div>
            <div className="float-right d-flex align-items-end mb-3 ">
              {this.props.project ? (
                <Link
                  component={RouterLink}
                  to={{ pathname: `/add-part/${this.props.project.id}` }}
                >
                  <button className="btn float-right btn-link ml-auto ">
                    Add Part
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="ml-5 mr-5">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Parent Part</th>
                  <th scope="col">Part Number</th>

                  <th scope="col">Quantity</th>
                  <th scope="col">Part Description</th>
                  <th scope="col">Status</th>
                  <th scope="col">Modeling Time</th>
                  <th scope="col">Detailing Time</th>
                  <th scope="col">Assembly Time</th>
                  <th scope="col">Supplier</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.props.project ? (
                  this.props.project.parts
                    .sort(function (a, b) {
                      // var nameA = a.part_desc.toUpperCase(); // ignore upper and lowercase
                      // var nameB = b.part_desc.toUpperCase(); // ignore upper and lowercase
                      if (a.id < b.id) return -1;
                      else return 1;

                    })
                    .map((part, index) => {
                      return (
                        <tr key={part.id}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {part.parent_part ? (
                              part.parent_part
                            ) : (
                              <span>null</span>
                            )}
                          </td>
                          <td>{part.part_number}</td>
                          <td>{part.qty}</td>

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
                          <td>
                            {part.assembly_time
                              ? this.UTCTimeToLocal(part.assembly_time)
                              : "-"}
                          </td>
                          <td>{part.supplier ? part.supplier : "-"}</td>
                          <Link
                            component={RouterLink}
                            to={{ pathname: `/edit/${part.id}` }}
                          >
                            <td>
                              {" "}
                              <EditRoundedIcon />
                            </td>
                          </Link>
                        </tr>
                      );
                    })
                ) : (
                  <h1>Loading...</h1>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loading, project, parts } = state.api;

  return {
    loading: loading,
    project: project,
    parts: parts,
  };
};
const mapDispatchToProps = {
  getProject: getProject,
  getParts: getAllParts,
};
const connectedProjectDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetails);
export { connectedProjectDetails as ProjectDetails };
// export default withRouter(ProjectDetails)
