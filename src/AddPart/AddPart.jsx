import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
// import axios from "axios"
import { connect } from "react-redux";

import { Navbar } from "../Navbar";
import { getAllParts, getProject } from "../_actions";
// import { getCsrfToken } from '../_services'

const status = [
  {
    value: "done",
    label: "Done",
  },
  {
    value: "improve",
    label: "Needs Improvement",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "discuss",
    label: "Discuss Later",
  },
];
class AddPart extends Component {
  constructor(props) {
    super(props);
    let path = this.props.match.url.split("/");

    console.log("props", props);
    let part = {};

    if (path[1] == "edit") {
      part = this.props.parts.find((p) => p.id == +path[2]);
    }
    this.state = {
      // name : "",
      part_desc: part.part_desc || "",
      parent_part: part.parent_part || "",
      part_number: part.part_number || "",
      status: part.status || status[2].value,
      project: part.project || "",
      qty: part.qty || "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let path = this.props.match.url.split("/");

    await this.props.getParts();
    this.props.getProject(+path[2]);
  }

  async handleSubmit(e) {
    let url = process.env.REACT_APP_AXIOS_URL;

    e.preventDefault();
    await this.setState({ project: this.props.project.project_name });
    console.log("state", this.state);
    let path = this.props.match.url.split("/");

    let method = "";
    path[1] == "edit" ? (method = "put") : (method = "post");
    path[1] == "edit"
      ? (url += `/api/parts/${+path[2]}/`)
      : (url += `/api/parts/`);

    const { part_desc, parent_part, part_number, status } = this.state;
    if (part_desc && part_number && status) {
      let token = JSON.parse(localStorage.getItem("user"));
      console.log("token", token);
      var axios = require("axios");

      var qs = require("qs");
      var data = qs.stringify({
        part_desc: part_desc,
        parent_part: parent_part,

        part_number: part_number,
        project: this.state.project,
        status: status,
        qty: this.state.qty,
      });
      console.log(data);
      var config = {
        method: method,
        url: `${url}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios(config)
        .then((res) => {
          console.log(JSON.stringify(res.data));
          this.setState({
            part_desc: "",
            parent_part: "",
            part_number: "",
            project: "",
            status: "",
            qty: "",
          });
          this.props.history.push("/home");
        })
        .catch((error) => console.log(error));
    }
  }

  handleChange(e, val = "") {
    if (e) {
      let { name, value } = e.target;
      console.log("name, value , event: ", name, value, e);

      this.setState({ [name]: value });
    }
  }


  render() {
    let path = this.props.match.url.split("/");

    let part = {};
    this.props.parts
      ? (part = this.props.parts.find((p) => p.id == path[2]))
      : (part = {});

    return (
      <div>
        <Navbar></Navbar>
        <div className="my-5 mx-3">
          <form onSubmit={this.handleSubmit}>
            <div className="my-5">
              <TextField
                id="standard-basic"
                value={this.state.part_desc}
                onChange={this.handleChange}
                label="Description"
                name="part_desc"
              />
            </div>
            <div className="my-5">
              <TextField
                id="standard-basic"
                value={this.state.part_number}
                onChange={this.handleChange}
                label="Part Number"
                name="part_number"
              />
            </div>
            <div className="my-5">
              <TextField
                id="standard-basic"
                value={this.state.qty}
                onChange={this.handleChange}
                label="Quantity"
                name="qty"
              />
            </div>
            <div className="my-5">
              {" "}
              <TextField
                id="standard-select-currency-native"
                select
                style={{ width: 150 }}
                label="Part Status"
                value={this.state.status}
                name="status"
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

            <div className="my-5">
              <TextField
                id="standard-basic"
                value={this.state.parent_part}
                onChange={this.handleChange}
                label="Parent Part"
                name="parent_part"
              />
            </div>

            <input type="submit" value="submit" />
          </form>
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
  getParts: getAllParts,
  getProject: getProject,
};
const coonnectedAddPart = connect(mapStateToProps, mapDispatchToProps)(AddPart);
export { coonnectedAddPart as AddPart };

