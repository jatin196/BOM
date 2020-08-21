
import { alertActions } from './';

export function getAllProjects(){
    return dispatch =>
    {
        dispatch(request())
        
        const axios = require('axios')
        const url = process.env.REACT_APP_AXIOS_URL;
    
        axios({
            method: 'get',
            
            url : `${url}/api/projects/`
            }
        ).then(res => {
            console.log(res)
            dispatch(success(res.data))

            // this.setState({projects: res.data})
        },
        error => {
            dispatch(failure(error.toString()))
            dispatch(alertActions.error(error.toString()));

        }
        )
        
    };
    function request(){ return  {type: "Get_All_Projects"}}
    function success(projects) {return {type: "Done_All_Projects", projects : projects}};
    function failure(error) {return  {type: "Failed", err : error }}
    }

    export  function   getProject(id){

        return  (dispatch) =>
        {
            dispatch(request(+id))
            
            const axios = require('axios')
            const url = process.env.REACT_APP_AXIOS_URL;

       
            axios({
                method: 'get',
                
                url: `${url}/api/projects/${+id}/`
                }
            ).then(res => {
                console.log(res)
                dispatch(success(res.data))
    
                // this.setState({projects: res.data})
            },
            error => {
                dispatch(failure(error.toString()))
                dispatch(alertActions.error(error.toString()));
    
            }
            )
            
        };
        function request(){ return  {type: "Get_This_Project"}}
        function success(project) {return {type: "Got_Project", project : project}};
        function failure(error) {return  {type: "Failed", err : error }}
        }
         export  function getAllParts(){
            return dispatch =>
            {
                dispatch(request())
                
                const axios = require('axios')
                const url = process.env.REACT_APP_AXIOS_URL;
            
                 axios({
                    method: 'get',
                    
                    url : `${url}/api/parts/`
                    }
                ).then(res => {
                    console.log(res)
                    dispatch(success(res.data))
                    
                    // this.setState({projects: res.data})
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()));
        
                }
                )
                
            };
            function request(){ return  {type: "Get_All_Parts"}}
            function success(parts) {return {type: "Got_All_Parts", parts : parts}};
            function failure(error) {return  {type: "Failed", err : error }}
            }
        