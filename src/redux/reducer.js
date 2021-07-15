import axios from "axios"

const number = axios.get('http://localhost:3000/person/1')
            .then((res)=>{
                return res.data.orderList.length
            })
const initialState = {
    itemsToBuy : 0
}

const reducer = (state = initialState , action) => {
    if(action.type == 'INCREAMENT'){
        console.log(state)
        // return {
        //     ...state,
        //     itemsToBuy : state.itemsToBuy + 1
        // }
        // console.log(action.value)
    }
    return state
}

export default reducer