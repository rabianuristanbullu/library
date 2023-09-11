import actionTypes from "../actions/actionTypes";

const initialState={
    pending:true,
    success:false,
    categories:[],
    error:false,
    errorMessages:""
}

const categoriesReducer =(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.categoryAction.GET_CATEGORY_START:
            return{
                ...state,
                pending:true
            }
        case actionTypes.categoryAction.GET_CATEGORY_SUCCESS:
            return{
                ...state,
                pending:false,
                success:true,
                categories:action.payload,
                error:false
            }
        case actionTypes.categoryAction.GET_CATEGORY_FAİL:
            return{
                ...state,
                pending:false,
                success:false,
                error:true,
                errorMessages:action.payload
            }
        case actionTypes.categoryAction.ADD_CATEGORIES:
            return{
                ...state, categories:[...state.categories,action.payload]
            }
        case actionTypes.categoryAction.DELETE_CATEGORIES:
            const filteredCategory=state.categories.filter(item=>item.id!==action.payload)
            return{
                ...state ,categories:filteredCategory
            }    
        case actionTypes.categoryAction.EDIT_CATEGORIES:
            const updateArray=[]
            for (let i = 0; i < state.categories.length; i++) {
                if(state.categories[i].id===action.payload.id){
                    updateArray.push(action.payload)
                }else{
                    updateArray.push(state.categories[i])
                }
        
                
            }  
            return{
                ...state,categories:updateArray
            }  
    
        default:
            return state
            
    }

}

export default categoriesReducer