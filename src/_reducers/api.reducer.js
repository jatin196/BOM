// const initialState = {
//     projects : []
//     loading : false

// }

export function api(state = {} ,  action){
    switch(action.type){
        case "Get_All_Projects":
            return {
                loading : true
            }
        case "Done_All_Projects":
            return {
                loading : false,
                projects : action.projects,
            }
            case "Get_This_Project":
                return {
                    loading : true
                }
            case "Got_Project":
                return {
                    loading : false,
                    project : action.project,
                }
        case "Failed":
            return {
                loading : false,
                error : action.err
            }
        default :
            return state
                    
    }
}