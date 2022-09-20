import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import projectReducer from "./projectReducer";
import resourceReducer from "./resourceReducer";
import userReducer from './userReducer'

export default configureStore({
    reducer: {
        user: userReducer,
        resource: resourceReducer,
        project: projectReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk,
        serializableCheck: false,
    }),
})