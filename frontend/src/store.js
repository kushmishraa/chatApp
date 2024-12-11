import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer
    }

}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;