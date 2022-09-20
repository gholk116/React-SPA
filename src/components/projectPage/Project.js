import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addResourceToProject, deleteResourceFromProject, getProject } from '../../store/projectReducer';
import { readRequest } from '../../store/resourceReducer';
import './Project.css'


function Project() {
    const rColumnNames = useSelector((state) => state.resource.columnNames);
    const rTableData = useSelector((state) => state.resource.tableData);
    const pColumnNames = useSelector((state) => state.project.projectcolumnNames);
    const pTableData = useSelector((state) => state.project.projecttableData);
    let resourceNamesArr = rColumnNames;
    let resourceDataArr = rTableData;
    let projectNamesArr = pColumnNames;
    let projectDataArr = pTableData;
    const dispatch = useDispatch();
    let resourceToBeAdded = [];
    let resourceToBeRemoved = [];

    useEffect(() => {
        dispatch(readRequest());
        let data = "16";
        dispatch(getProject(parseInt(data)));
    },[]);

    const checkedResourceForAdding = (resourceId, e) => {
        let data = {
            pId: parseInt("16"),
            rId: parseInt(resourceId)
        }
        if(e.target.checked){
            resourceToBeAdded.push(data);
            console.log("Checked", resourceToBeAdded)
        }
        else {
            for(let i = 0; i < resourceToBeAdded.length; i++){
                if(resourceToBeAdded[i].rId == resourceId){
                    console.log("removing", resourceToBeAdded[i])
                    resourceToBeAdded.splice(i, 1);
                }
            }
        }    
    }

    const handleAddResourceToProject = () => {
        for(let i = 0; i < resourceToBeAdded.length; i++){
            let duplicate = false;
            for(let j = 0; j < projectDataArr.length; j++)
                if(resourceToBeAdded[i].rId == projectDataArr[j].resourceId)
                    duplicate = true;
            if(!duplicate)
                dispatch(addResourceToProject(resourceToBeAdded[i]));
        }
    }

    const checkedResourceForDeleting = (resourceId, e) => {
        let data = {
            pId: parseInt("16"),
            rId: parseInt(resourceId)
        }
        if(e.target.checked){
            resourceToBeRemoved.push(data);
            console.log("Checked", resourceToBeRemoved)
        }
        else {
            for(let i = 0; i < resourceToBeRemoved.length; i++){
                if(resourceToBeRemoved[i].rId == resourceId){
                    console.log("removing", resourceToBeRemoved[i])
                    resourceToBeRemoved.splice(i, 1);
                }
            }
        }    
    }

    const handleDeleteResourceFromProject = () => {
        console.log("Deleting")
        for(let i = 0; i < resourceToBeRemoved.length; i++){
            dispatch(deleteResourceFromProject(resourceToBeRemoved[i]));
        }
    }


    return (
        <div className="twotable">
            <div className="child">
                <div className="projectpageheader">
                    <h2>Resource Catalog</h2>
                    <div className="resourceBtn">
                        <input type="button" value=" Send => " onClick={() => handleAddResourceToProject()}/>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th id="checkboxCol">Add</th>
                            {(resourceNamesArr).map((column) => {
                                return (
                                <th key={column.id}>
                                    {column["columnName:"].toUpperCase()}
                                </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {(resourceDataArr).map((row) => {
                            return (
                                <tr key={row.resourceId}>
                                    <input type="checkbox" id="checkboxCol" onClick={(e) => checkedResourceForAdding(row.resourceId, e)} />
                                    {(resourceNamesArr).map((column) => {
                                        return(
                                        <td key={column.id} >
                                            { row.content[column.id] }
                                        </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="child">
                <div className="projectpageheader">
                    <h2>Project Catalog</h2>
                    <div className="trash">
                        <input type="button" value=" Delete " onClick={() => handleDeleteResourceFromProject()}/>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th id="checkboxCol">Remove</th>
                            {(projectNamesArr).map((column) => {
                                return (
                                <th key={column.id}>
                                    {column["columnName:"].toUpperCase()}
                                </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {(projectDataArr).map((row) => {
                            return (
                                <tr key={row.resourceId}>
                                    <input type="checkbox" id="checkboxCol" onClick={(e) => checkedResourceForDeleting(row.resourceId, e)} />
                                    {(projectNamesArr).map((column) => {
                                        return(
                                        <td key={column.id} >
                                            { row.content[column.id] }
                                        </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Project;