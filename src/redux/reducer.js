const initialState = {
    itemsToBuy : 0
}

const reducer = (state = initialState , action) => {
    if(action.type == 'INCREAMENT'){
        return {
            itemsToBuy : state.itemsToBuy + 1
        }
    }
    return state
}

export default reducer