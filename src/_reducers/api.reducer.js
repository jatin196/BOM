// const initialState = {
//     projects : []
//     loading : false

// }

export function api(state = {} ,  action){
    switch(action.type){
        case "Get_All_Projects":
            return {
                ...state,

                loading : true
            }
        case "Done_All_Projects":
            return {
                ...state,

                loading : false,
                projects : action.projects,
            }
            case "Get_This_Project":
                return {
                    ...state,

                    loading : true
                }
            case "Got_Project":
                return {
                    ...state,

                    loading : false,
                    project : action.project,
                }
            case "Get_All_Parts":
                return {
                    ...state,

                    loading : false,
                }
            case "Got_All_Parts":
                return {
                    ...state,
                    loading : false,
                    parts : action.parts,
                }
        case "Failed":
            return {
                ...state,

                loading : false,
                error : action.err
            }
        default :
            return state
                    
    }
}