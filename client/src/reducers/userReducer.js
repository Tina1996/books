export const initialState = null;

export const reducer = (state,action) => {
    // console.log("state in  reducer",typeof(state))
    if(action.type === "USER"){
        return action.payload
    }
    if(action.type === "UPDATECART"){
        state.cart = [];
        return{
            ...state,
            cart:action.payload
        }
    }
    if(action.type === "CLEAR"){
        return null
    }
    
    return state
}