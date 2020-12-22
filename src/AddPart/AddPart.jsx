// import React, { Component } from "react";
// import TextField from "@material-ui/core/TextField";
// import axios from "axios"
// import { connect } from "react-redux";

// import { Navbar } from "../Navbar";
// import { getAllParts, getProject } from "../_actions";
// // import { getCsrfToken } from '../_services'

// const status = [
//   {
//     value: "done",
//     label: "Done",
//   },
//   {
//     value: "improve",
//     label: "Needs Improvement",
//   },
//   {
//     value: "pending",
//     label: "Pending",
//   },
//   {
//     value: "discuss",
//     label: "Discuss Later",
//   },
// ];
// class AddPart extends Component {
//   constructor(props) {
//     super(props);
//     let path = this.props.match.url.split("/");

//     console.log("props", props);
//     let part = {};

//     if (path[1] == "edit") {
//       part = this.props.parts.find((p) => p.id == +path[2]);
//     }
//     this.state = {
//       // name : "",
//       part_desc: part.part_desc || "",
//       parent_part: part.parent_part || "",
//       part_number: part.part_number || "",
//       status: part.status || status[2].value,
//       project: part.project || "",
//       qty: part.qty || "",
//       mtime: part.modeling_time || Date.now(),
//       atime: part.detailing_time || Date.now(),
//       dtime: part.assembly_time || Date.now(),
//       supplier: part.supplier || "",
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   async componentDidMount() {
//     let path = this.props.match.url.split("/");

//     await this.props.getParts();
//     this.props.getProject(+path[2]);
//   }

//   async handleSubmit(e) {
//     let url = process.env.REACT_APP_AXIOS_URL;

//     e.preventDefault();
//     await this.setState({ project: this.props.project.project_name });
//     console.log("state", this.state);
//     let path = this.props.match.url.split("/");

//     let method = "";
//     path[1] == "edit" ? (method = "put") : (method = "post");
//     path[1] == "edit"
//       ? (url += `/api/parts/${+path[2]}/`)
//       : (url += `/api/parts/`);

//     const { part_desc, parent_part, part_number, status } = this.state;
//     if (part_desc && part_number && status) {
//       let token = JSON.parse(localStorage.getItem("user"));
//       console.log("token", token);
//       var axios = require("axios");

//       var qs = require("qs");
//       var data = qs.stringify({
//         part_desc: part_desc,
//         parent_part: parent_part,

//         part_number: part_number,
//         project: this.state.project,
//         status: status,
//         qty: this.state.qty,
//         modeling_time: this.modeling_time,
//         detailing_time: this.detailing_time,
//         assembly_time: this.assembly_time,
//         supplier: this.supplier,
//       });
//       console.log(data);
//       var config = {
//         method: method,
//         url: `${url}`,
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         data: data,
//       };

//       axios(config)
//         .then((res) => {
//           console.log("ddd", JSON.stringify(res.data));
//           this.setState({
//             part_desc: "",
//             parent_part: "",
//             part_number: "",
//             project: "",
//             status: "",
//             qty: "",
//             mtime: "",
//             atime: "",
//             dtime: "",
//             supplier: "",
//           });
//           this.props.history.push("/home");
//         })
//         .catch((error) => console.log(error));
//     }
//   }

//   handleChange(e, val = "") {
//     if (e) {
//       let { name, value } = e.target;
//       console.log("name, value , event: ", name, value, e);

//       this.setState({ [name]: value });
//     }
//   }

//   render() {
//     let path = this.props.match.url.split("/");

//     let part = {};
//     this.props.parts
//       ? (part = this.props.parts.find((p) => p.id == path[2]))
//       : (part = {});

//     return (
//       <div>
//         <Navbar></Navbar>
//         <div className="my-5 mx-3">
//           <form onSubmit={this.handleSubmit}>
//             <div className="my-5">
//               <TextField
//                 id="standard-basic"
//                 value={this.state.part_desc}
//                 onChange={this.handleChange}
//                 label="Description"
//                 name="part_desc"
//               />
//             </div>
//             <div className="my-5">
//               <TextField
//                 id="standard-basic"
//                 value={this.state.part_number}
//                 onChange={this.handleChange}
//                 label="Part Number"
//                 name="part_number"
//               />
//             </div>
//             <div className="my-5">
//               <TextField
//                 id="standard-basic"
//                 value={this.state.qty}
//                 onChange={this.handleChange}
//                 label="Quantity(optional)"
//                 name="qty"
//               />
//             </div>
//             <div className="my-5">
//               {" "}
//               <TextField
//                 id="standard-select-currency-native"
//                 select
//                 style={{ width: 150 }}
//                 label="Part Status"
//                 value={this.state.status}
//                 name="status"
//                 onChange={this.handleChange}
//                 SelectProps={{
//                   native: true,
//                 }}
//               >
//                 {status.map((option) => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </TextField>
//             </div>

//             <div className="my-5">
//               <TextField
//                 id="standard-basic"
//                 value={this.state.parent_part}
//                 onChange={this.handleChange}
//                 label="Parent Part"
//                 name="parent_part"
//               />
//             </div>
//             {/* times */}
//             <div className="my-5">
//               <TextField
//                 id="datetime-local"
//                 label="Modeling Time (optional)"
//                 type="datetime-local"
//                 name="mtime"
//                 // defaultValue="2017-05-24T10:30"
//                 onChange = {this.handleChange}
//                 value = {this.mtime}
//                 // className={classes.textField}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//              </div>
//              <div className="my-5">
//               <TextField
//                 id="datetime-local"
//                 label="Detailing Time (optional)"
//                 type="datetime-local"
//                 name="dtime"
//                 // defaultValue="2017-05-24T10:30"
//                 onChange = {this.handleChange}
//                 value = {this.dtime}
//                 // className={classes.textField}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//              </div>
//              <div className="my-5">
//               <TextField
//                 id="datetime-local"
//                 label="Assembly Time (optional)"
//                 type="datetime-local"
//                 name="atime"
//                 onChange = {this.handleChange}
//                 value = {this.atime}
//                 // defaultValue="2017-05-24T10:30"
//                 // className={classes.textField}
//                 InputLabelProps={{
//                   shrink: true,
//                 }}
//               />
//              </div>
//              <div className="my-5">
//               <TextField
//                 id="standard-basic"
//                 value={this.state.qty}
//                 onChange={this.handleChange}
//                 label="Supplier(optional)"
//                 name="supplier"
//               />
//             </div>

//             <input type="submit" value="submit" />
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   const { loading, project, parts } = state.api;

//   return {
//     loading: loading,
//     project: project,
//     parts: parts,
//   };
// };
// const mapDispatchToProps = {
//   getParts: getAllParts,
//   getProject: getProject,
// };
// const coonnectedAddPart = connect(mapStateToProps, mapDispatchToProps)(AddPart);
// export { coonnectedAddPart as AddPart };

import React, { useState } from "react";
import { connect } from "react-redux";
import { Navbar } from "../Navbar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete'
import { getAllParts, getProject } from "../_actions";

const STATUS = [
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

const AddPart = (props) => {
  let path = props.match.url.split("/");

  //     console.log("props", props);
  let part = null;

  if (path[1] === "edit") {
    part = props.parts.find((p) => p.id === +path[2]);
  }
  //     this.state = {
  //       // name : "",
  //       part_desc: part.part_desc || "",
  //       parent_part: part.parent_part || "",
  //       part_number: part.part_number || "",
  //       status: part.status || status[2].value,
  //       project: part.project || "",
  //       qty: part.qty || "",
  //       mtime: part.modeling_time || Date.now(),
  //       atime: part.detailing_time || Date.now(),
  //       dtime: part.assembly_time || Date.now(),
  //       supplier: part.supplier || "",

  const [part_desc, setpart_desc] = useState(part.part_desc || "");
  const [parent_part, setparent_part] = useState(part.parent_part || "");
  const [part_number, setpart_number] = useState(part.part_number || "");
  const [status, setstatus] = useState(part.status || status[0].value);
  const [project, setproject] = useState(part.project || "");
  const [qty, setqty] = useState(part.qty || "");
  const [mtime, setmtime] = useState(part.mtime || "");
  const [atime, setatime] = useState(part.atime || "");
  const [dtime, setdtime] = useState(part.dtime || "");
  const [supplier, setsupplier] = useState(part.supplier || "");

  const handleSubmit = (e) => {
    let url = process.env.REACT_APP_AXIOS_URL;

    e.preventDefault();
    // this.setState({ project: props.project.project_name });
    setproject(props.project.project_name)
    let path = props.match.url.split("/");

    let method = "";
    path[1] === "edit" ? (method = "put") : (method = "post");
    path[1] === "edit"
      ? (url += `/api/parts/${+path[2]}/`)
      : (url += `/api/parts/`);

    // const { part_desc, parent_part, part_number, status } = this.state;
    // if (part_desc && part_number && status) {
    let token = JSON.parse(localStorage.getItem("user"));
    console.log("token", token);
    var axios = require("axios");

    var qs = require("qs");
    var data = qs.stringify({
      part_desc: part_desc,
      parent_part: parent_part,

      part_number: part_number,
      project: project,
      status: status,
      qty: qty,
      modeling_time: mtime,
      detailing_time: dtime,
      assembly_time: atime,
      supplier: supplier,
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
        console.log("ddd", JSON.stringify(res.data));
        // this.setState({
        //   part_desc: "",
        //   parent_part: "",
        //   part_number: "",
        //   project: "",
        //   status: "",
        //   qty: "",
        //   mtime: "",
        //   atime: "",
        //   dtime: "",
        //   supplier: "",
        // });
        props.history.push("/home");
      })
      .catch((error) => console.log(error));
    // }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="my-5 mx-3">
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <TextField
              id="standard-basic"
              value={part_desc}
              onChange={(e) => setpart_desc(e.target.value)}
              label="Description"
              name="part_desc"
            />
          </div>
          <div className="my-5">
            <TextField
              id="standard-basic"
              value={part_number}
              onChange={(e) => setpart_number(e.target.value)}
              label="Part Number"
              name="part_number"
            />
          </div>
          <div className="my-5">
            <TextField
              id="standard-basic"
              value={qty}
              onChange={(e) => setqty(e.target.value)}
              label="Quantity(optional)"
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
              value={status}
              name="status"
              onChange={(e) => setstatus(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              {STATUS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>

          <div className="my-5">
            <TextField
              id="standard-basic"
              value={parent_part}
              onChange={(e) => setparent_part(e.target.value)}
              label="Parent Part"
              name="parent_part"
            />
          </div>
          {/* times */}
          <div className="my-5">
            <TextField
              id="datetime-local"
              label="Modeling Time (optional)"
              type="datetime-local"
              name="mtime"
              // defaultValue="2017-05-24T10:30"
              onChange={(e) => setmtime(e.target.value)}
              value={mtime}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="my-5">
            <TextField
              id="datetime-local"
              label="Detailing Time (optional)"
              type="datetime-local"
              name="dtime"
              // defaultValue="2017-05-24T10:30"
              onChange={(e) => setdtime(e.target.value)}
              value={dtime}
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="my-5">
            <TextField
              id="datetime-local"
              label="Assembly Time (optional)"
              type="datetime-local"
              name="atime"
              onChange={(e) => setatime(e.target.value)}
              value={atime}
              // defaultValue="2017-05-24T10:30"
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="my-5">
            <TextField
              id="standard-basic"
              value={supplier}
              onChange={(e) => setsupplier(e.target.value)}
              label="Supplier(optional)"
              name="supplier"
            />
          </div>

          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};
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

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};

const coonnectedAddPart = connect(mapStateToProps, mapDispatchToProps)(AddPart);
export { coonnectedAddPart as AddPart };

// export default connect(mapStateToProps, mapDispatchToProps)(AddPart)
