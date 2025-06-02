import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    showInput: false,
}

const searchSlice = createSlice({
    name: 'search' ,
    initialState,
    reducers: {
       toggleInput : (state) =>{
        state.showInput = !state.showInput
       },
       setInputVisible: (state, action) => {
        state.showInput = action.payload;
       }
    },
})

export const {toggleInput, setInputVisible} = searchSlice.actions
export default searchSlice.reducer