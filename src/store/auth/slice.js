import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    login: () => {},
    logout: () => {},
    register: () => {},   
    getActiveUser: () => {},
    
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token"),
        activeUser: null,
        loginError: false,
        RegisterError:false,
    },
    reducers: {
        setActiveUser: (state, action) => {
            state.activeUser = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoginError(state, action) {
            state.loginError = action.payload;
          },
          setRegistrationErrors(state, action) {
            state.registrationErrors = action.payload;
          },
        
        ...middlewareActions
    }
});

export const { login, logout, register, getActiveUser, setActiveUser, setToken,setLoginError,setRegistrationErrors,} = authSlice.actions;
export default authSlice.reducer;