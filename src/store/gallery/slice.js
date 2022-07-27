import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    getGalleries() {},


};

const galleriesSlice = createSlice({
    name: "galleries",
    initialState: {
        page: {
            data: [],
    },
    
},
    reducers: {
        setGalleries: (state, action) => {
            state.page = action.payload;
        },
   

        ...middlewareActions
    }
});

export const { getGalleries,setGalleries} = galleriesSlice.actions;
export default galleriesSlice.reducer;