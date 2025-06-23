import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    isDarkMode: false
}

const darkModeSlice = createSlice({
    name: "darkmode",
    initialState,
    reducers: {
        toggleDarkmMode : (state) => {
            state.isDarkMode = !state.isDarkMode
        }
    }
});


export const {toggleDarkmMode} = darkModeSlice.actions;
export default darkModeSlice.reducer;