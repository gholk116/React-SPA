import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import React from 'react';
import thunk from 'redux-thunk';
import axios from 'axios';

const defaultOptions = {
    baseURL: 'http://localhost:8080/Kotera/resource/',
    headers: {
        'Authorization': localStorage.getItem("token"),
    } 
}

export const readRequest = createAsyncThunk(
    'resource/readRequest',
    async () => { 
        let request = axios.create(defaultOptions);
        request.defaults.headers.common['Content-Type'] = 'application/json'
        return await request.get('read')
            .then(response => response)
    }
);

export const addResource = createAsyncThunk(
    'resource/addResource',
    async () => {
        let request = axios.create(defaultOptions);
        return await request.post('addResource')
            .then(response => response)
    }
);

export const addColumn = createAsyncThunk(
    'resource/addColumn',
    async (columnName) => {
        let request = axios.create(defaultOptions);
        request.defaults.params = {};
        request.defaults.params['columnName'] = columnName;
        return await request.post('addColumn')
            .then(response => response)
    }
)

export const setEntry = createAsyncThunk(
    'resource/setEntry',
    async(data) => {
        let request = axios.create(defaultOptions);
        console.log(data);
        return await request.post('setEntry', null, {
            params: {
                resourceId: data.resourceId,
                columnId: data.columnId,
                value: data.value,
            }
        })
            .then(response => response)
    }
)

export const updateColumn = createAsyncThunk(
    'resource/updateColumn',
    async(data) => {
        let request = axios.create(defaultOptions);
        console.log(data);
        return await request.post('updateColumn', null, {
            params: {
                'oldColumnName': data.old,
                'newColumnName': data.new,
            }
        })
            .then(response => response)
    }
)

export const resourceSlice = createSlice({
    name: 'resource',
    initialState: {
        columnNames: [],
        tableData: [],
        error: '',
        status: null,
        keyword: "",
        isEditingColumnName: false,
    },
    reducers: {
        changeKeyword: (state, action) => {
            state.keyword = action.payload;
        },
        changeIsEditingColumnName: (state, action) => {
            state.isEditingColumnName = action.payload;
        }
    },
    extraReducers: {
        [readRequest.pending]: (state) => { //Read data
            state.status = "Pending"
            console.log("Pending")
        },
        [readRequest.fulfilled]: (state, action) => {
            state.status = "Fulfiled";
            console.log("Fulfilled");
            state.columnNames.length = 0;
            state.tableData.length = 0;
            let table = action.payload.data;
            
            for(let i = 0; i < table.columnInfo.length/2; i++) {
                state.columnNames.push(table.columnInfo[i]);
            }
            for(let i = 0; i < table.tableDetail.length; i++) {
                state.tableData.push(table.tableDetail[i]);
            }
        },
        [readRequest.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload;
            console.log("Failed")
        },

        [addResource.pending]: (state) => { //Add Resource
            state.status = "Pending"
            console.log("Pending")
        },
        [addResource.fulfilled]: (state) => {
            state.status = "Fulfilled"
            console.log("Fulfilled")
        },
        [addResource.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload;
            console.log("Failed")
        },
        
        [addColumn.pending]: (state) => { //Add Column
            state.status = "Pending"
            console.log("Pending")
        },
        [addColumn.fulfilled]: (state) => {
            state.status = "Fulfilled"
            console.log("Fulfilled")
        },
        [addColumn.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload;
            console.log("Failed")
        },

        [setEntry.pending]: (state) => { //Set Entry
            state.status = "Pending"
            console.log("Pending")
        },
        [setEntry.fulfilled]: (state) => {
            state.status = "Fulfilled"
            console.log("Fulfilled")
        },
        [setEntry.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload;
            console.log("Failed")
        },

        [updateColumn.pending]: (state) => { //Change Column Name
            state.status = "Pending"
            console.log("Pending")
        },
        [updateColumn.fulfilled]: (state) => {
            state.status = "Fulfilled"
            console.log("Fulfilled")
        },
        [updateColumn.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload;
            console.log("Failed")
        },
    }
})

export const { changeKeyword, changeIsEditingColumnName } = resourceSlice.actions;
export default resourceSlice.reducer;
// console.log(table);
// names = table.columnInfo.splice(table.columnInfo.length/2);
// console.log(names);
// data = table.tableDetail;
// console.log(data)