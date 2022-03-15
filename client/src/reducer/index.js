const initialState = {
    characters : [],
    allcharacters: [],
    occupations: [],
    detail:[]
}

function rootReducer (state= initialState, action) {
    switch(action.type) {
        case 'GET_CHARACTERS':
            return{
                ...state,
                characters: action.payload,
                allcharacters: action.payload
            }
        case 'GET_NAME_CHARACTERS':
            return{
                ...state,
                characters: action.payload
            }    
        case 'FILTER_BY_STATUS':
            const allCharacters = state.allcharacters
            const statusFiltered = action.payload ==='All' ? allCharacters :
                    allCharacters.filter(el =>el.status === action.payload)
            return{
                ...state,
                characters: statusFiltered
            }  
        case 'POST_CHARACTER':
            return {
                ...state
            } 
        case 'GET_OCCUPATIONS':
            return{
                ...state,
                occupations: action.payload
            }     
        case 'FILTER_CREATED':
            const AllCharacters = state.allcharacters
            const createdFilter =action.payload === 'All' ? AllCharacters : 
                    action.payload ==='created' ? AllCharacters.filter(el =>el.createdInDb === true) :
                    AllCharacters.filter(el =>!el.createdInDb)
            return{
                ...state,
                characters:  createdFilter
            }   
        case 'ORDER_BY_NAME':
            const sortedarr = action.payload === 'asc' ?
            state.allcharacters.sort(function(a,b){
                if (a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0
            }) :
            state.allcharacters.sort(function(a,b){
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0
            }) 
            return{
                ...state,
                characters:  sortedarr
            }    
        case 'GET_DETAILS':
            return{
                ...state,
                detail : action.payload
            }    
        default:
            return state;
    }

}

export default rootReducer;