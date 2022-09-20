import { createSlice } from '@reduxjs/toolkit'
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: "yang",
        password: "123456",
        signingUp: false,
        invalidLogin: false,
    },
    reducers: {
        inputUsername:  (state, action) => {
            state.username = action.payload;
        },
        inputPassword:  (state, action) => {
            state.password = action.payload;
        },
        changeSignUp: (state, action) => {
            state.signingUp = action.payload;
        },
        changeInvalidLogin: (state, action) => {
            state.invalidLogin = action.payload;
        },
        loggingIn: (state, action) => {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(action.payload),
            }
            fetch('http://localhost:8080/Kotera/users/login', requestOptions)
                .then((response) => response.text())
                .then((response) => {
                    if(!response.toString().includes("403")){
                        localStorage.setItem("username", action.payload.username);
                        localStorage.setItem("token", 'Bearer ' + response);
                    }
                })
                .catch((error) => {
                    
                    console.error('Error: ', error);
                });
               
        },
        register: (state, action) => {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(action.payload),
            }
            fetch('http://localhost:8080/Kotera/users/register', requestOptions)
                .catch((error) => {
                    console.error('Error: ', error);
                });
        },
    },
})


export const { inputUsername, inputPassword, loggingIn, register, changeSignUp, changeInvalidLogin } = userSlice.actions;
export default userSlice.reducer;

