import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import {getAllProjects} from '../_actions/api.actions'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     '& > *': {
//       margin: theme.spacing(1),
//       width: theme.spacing(16),
//       height: theme.spacing(16),
//     },
//   },
// }));


 class AllProjects extends Component {
     
    constructor(props) {
        super(props)
    
        this.state = {
             projects: []
        }

    }
        // componentWillUpdate({projects}){
        //     this.setState({projects })
        // }
    async componentDidMount(){
        // const axios = require('axios')
        // const url = process.env.REACT_APP_AXIOS_URL;

        // axios({
        //     method: 'get',
            
        //     url : `${url}/api/projects/`
         //     }
        // ).then(res => {
        //     console.log(res)
        //     this.setState({projects: res.data})
        // })

        await this.props.getProjects()
        this.setState({projects : this.props.projects})
        // if ( this.props.projects){
        //     console.log("abc", this.props.projects);
        // this.setState({project: this.props.projects})}
    }
    
  render() {

        return (
            <div>
                <div className="container-fluid">
                    <div class="row">
            <div className="d-flex justify-content-center col mt-3 ml-5 "><h1>   All Projects </h1></div>
            <div className="float-right d-flex align-items-end mb-3 ">
                <Link to={`/add-project`}>
                <button className="btn float-right btn-link ml-auto " >Add Project</button>
                 </Link>
            </div>
            </div>
            </div>
                {/* <div>
                <div>
                <Typography variant="h2" align="center" gutterBottom>
                    All Projects
                </Typography>
                </div>
                <div className="btn float-right btn-link ml-auto ">                
                    <Link  component={RouterLink}  to={{pathname: `/add-project`}}>
                    <button >Add Project</button>
                </Link>
                </div>  

                </div> */}
                <div>
                <Grid
                className="mt-3 ml-5"
                container
                direction="row"
                alignItems="center"
                spacing={1}>
                   
                
            
                {   
                    this.props.projects ?
                    this.props.projects.map(project => {
                            return (
                                <Grid item xs={12} sm={4} key={project.id}className="my-3"> 

                                <Link component={RouterLink} to={`projects/${project.id}`} style={{ textDecoration: 'none' }}> 
                                <Paper elevation={6} style={{flexGrow: 1, width: 350, height: 150}}>
                                    <Typography variant="h5" align="center" gutterBottom>
                                         {project.project_name}
                                    </Typography>
                                    <div className="mt-2">
                                    <Typography variant="body1" gutterBottom>
                                        {project.project_desc}
                                    </Typography>
                                    </div>
                                </Paper>

                                </Link>
                                </Grid>
                            )
                        }) 
                        : "loading..."
                    }
</Grid>
</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {loading, projects} = state.api
    return {
        loading : loading,
        projects : projects
    }    
}

const mapDispatchToProps = {
    getProjects : getAllProjects
}

const connectedAllProjects = connect(mapStateToProps, mapDispatchToProps)(AllProjects)
export { connectedAllProjects as AllProjects }