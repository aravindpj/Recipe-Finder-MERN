import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated:false,
    user:{name:"Aravind"}
  },
  reducers: {
    setUser: (state, {payload}) => {
        state.authenticated=true
        state.user=payload.user
    },
    logout:(state)=>{
        state.authenticated=false
        state.user={}
    }
  },
})

// Action creators are generated for each case reducer function
export const {setUser,logout} = authSlice.actions

export default authSlice.reducer