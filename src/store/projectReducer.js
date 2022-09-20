import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const defaultOptions = {
    baseURL: 'http://localhost:8080/Kotera/project/',
    headers: {
        'Authorization': localStorage.getItem("token"),
    } 
}

export const getProject = createAsyncThunk(
    'project/getProject',
    async (data) => {
        let request = axios.create(defaultOptions);
        request.defaults.headers.common['Content-Type'] = 'application/json';
        return await request.get(`read/?projectId=${data}`, null)
            .then(response => response)
    }
)

export const addResourceToProject = createAsyncThunk(
    'project/addResourceToProject',
    async (data) => {
        let request = axios.create(defaultOptions);
        return await request.post(`addResourceToProject/?projectId=${data.pId}&resourceId=${data.rId}`, null)
            .then(response => response)
    }
)

export const deleteResourceFromProject = createAsyncThunk(
    'project/deleteResourceFromProject',
    async (data) => {
        let request = axios.create(defaultOptions);
        console.log(data);
        return await request.post('deleteResource', null, {
            params: {
                'projectId': data.pId,
                'resourceId': data.rId
            }
        })
            .then(response => response)
    }
)

export const addTemplate = createAsyncThunk(
    'project/addTemplate',
    async (data) => {
        let request = axios.create(defaultOptions);
        return await request.post('addTemplate', null, {
            params: {
                'projectId': data.pId,
                'columnName': "",
                'columnType': "Number",
                'formula': "null"
            }
        })
            .then(response => response)
    }
)

export const deleteTemplate = createAsyncThunk(
    'project/deleteTemplate',
    async (data) => {
        let request = axios.create(defaultOptions);
        return await request.post('deleteTemplate', null, {
            params: {
                'projectId': data.pId,
                'columnName': data.name
            }
        })
            .then(response => response)
    }
)

export const updateTemplate = createAsyncThunk(
    'project/updateTemplate',
    async (data) => {
        let request = axios.create(defaultOptions);
        console.log(data)
        return await request.put('updateTemplate', null, {
            params: {
                'projectId': data.pId,
                'columnName': data.name,
                'columnType': data.type,
                'formula': data.formula
            }
        })
            .then(response => response)
    }
)

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectcolumnNames: [],
        projecttableData: [],
        projecterror: '',
        projectstatus: null,

        formulaTableNames: [],
        formulaTableData: [],
    },
    reducers:{
        addColumnToFormula: (state, action) => {
            state.formulaTableNames.splice(action.payload.index, 0, action.payload.column)
        },
        removeColumnFromFormula: (state, action) => {
            state.formulaTableNames.splice(action.payload, 1)
        },
    },
    extraReducers: {
        [getProject.pending]: (state) => { //Read project data
            state.projectstatus = "Pending"
            console.log("Pending")
        },
        [getProject.fulfilled]: (state, action) => {
            state.projectstatus = "Fulfiled";
            console.log("Fulfilled");
            state.projectcolumnNames.length = 0;
            state.projecttableData.length = 0;
            state.formulaTableNames.length = 0;
            state.formulaTableData.length = 0;
            let table = action.payload.data;
            
            for(let i = 0; i < table.columnInfo.length; i++) {
                state.projectcolumnNames.push(table.columnInfo[i]);
                state.formulaTableNames.push(table.columnInfo[i]);
                if(state.formulaTableNames[i].type !== 'null'){ //Proper case the column types
                    let str = state.formulaTableNames[i].type
                    state.formulaTableNames[i].type = str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
                }
            }
            for(let i = 0; i < table.tableDetail.length; i++) {
                state.projecttableData.push(table.tableDetail[i]);
                state.formulaTableData.push(table.tableDetail[i]);
            }
        },
        [getProject.rejected]: (state, action) => {
            state.projectstatus = "Rejected"
            state.projecterror = action.payload;
            console.log("Failed")
        },

        [addResourceToProject.pending]: (state) => { //Add Resource to Project
            state.status = "Pending"
            console.log("Pending")
        },
        [addResourceToProject.fulfilled]: (state) => {
            state.status = "Fulfilled"
            console.log("Fulfilled")
        },
        [addResourceToProject.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload;
            console.log("Failed")
        },

        [deleteResourceFromProject.pending]: (state) => { //Remove Resource to Project
            state.status = "Pending"
            console.log("Pending")
        },
        [deleteResourceFromProject.fulfilled]: (state) => {
            state.status = "Fulfilled"
            console.log("Fulfilled")
        },
        [deleteResourceFromProject.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload;
            console.log("Failed")
        },

        [addTemplate.pending]: (state) => { //Add Template to project
            state.status = "Pending"
            console.log("Pending")
        },
        [addTemplate.fulfilled]: (state) => {
            state.status = "Fulfilled"
            console.log("Fulfilled")
        },
        [addTemplate.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload;
            console.log("Failed")
        },

        [deleteTemplate.pending]: (state) => { //Delete Template from project
            state.status = "Pending"
            console.log("Pending")
        },
        [deleteTemplate.fulfilled]: (state) => {
            state.status = "Fulfilled"
            console.log("Fulfilled")
        },
        [deleteTemplate.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload;
            console.log("Failed")
        },

        [updateTemplate.pending]: (state) => { //Update Template 
            state.status = "Pending"
            console.log("Pending")
        },
        [updateTemplate.fulfilled]: (state) => {
            state.status = "Fulfilled"
            console.log("Fulfilled")
        },
        [updateTemplate.rejected]: (state, action) => {
            state.status = "Rejected"
            state.error = action.payload;
            console.log("Failed")
        },
    }
})
export const { removeColumnFromFormula, addColumnToFormula} = projectSlice.actions;
export default projectSlice.reducer;