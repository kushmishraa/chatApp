import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const validateuser = createAsyncThunk(
    'validateUser',
    async(loginDetails, thunkAPI) =>{
        console.log("loginDetails => ", loginDetails)
        if(loginDetails){
            const result = await fetch('http://localhost:3001/validateUser',{
                method:"POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(loginDetails)
            });

            const res = await result.json();
            if(res.redirectUrl){
                window.location.replace(res.redirectUrl);
            }
        }
    }
)

export const registerUser = createAsyncThunk(
    "registerUser",
    async(formValues,thunkAPI)=>{
        if(formValues){
            const result = fetch("http://localhost:3001/registerUser",{
                method:"POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body:JSON.stringify(formValues)
            });
            const res = await result.json();
            console.log(res);
        }
    }
)

export const updatePassword = createAsyncThunk(
    "updatePassword",
    async(formValues, thunkAPI) =>{
        if(formValues){
            const result = await fetch("http://localhost:3001/resetpassword",{
                method:"PATCH",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });
            const res = await result.json();
            if(res.user){
                window.location.replace('/login')
            }
        }
    }
)

const userSlice = createSlice({
    name:"userSlice",
    initialState:{
        loggedInUser:"kushagra",
        cachedLists : {}
    },
    
    reducers:{
        setLoggedInUser : (state, action) =>{
            state.loggedInUser = action.payload
        },
        setCachedLists : (state, action) =>{
            state.cachedLists = action.payload;
        }
    }
});

export const { setLoggedInUser, setCachedLists } = userSlice.actions;

export default userSlice.reducer;
