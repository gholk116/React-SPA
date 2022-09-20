import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addColumnToFormula, addTemplate, deleteTemplate, getProject, removeColumnFromFormula, updateTemplate } from '../../store/projectReducer';
import './Template.css'

function Template() {
    const pColumnNames = useSelector((state) => state.project.projectcolumnNames);
    let projectNamesArr = pColumnNames;
    const fColumnNames = useSelector((state) => state.project.formulaTableNames);
    let formulaNamesArr = fColumnNames;
    const dispatch = useDispatch();
    

    useEffect(() => {
        let data = "16";
        if(projectNamesArr.length === 0)
            dispatch(getProject(parseInt(data)));
    },[]);

    const columnIsVisible = (col) => {
        for(let i = 0; i < formulaNamesArr.length; i++)
            if(col.id == formulaNamesArr[i].id)
                return true;
        return false;
    }

    const handleCheckColumn = (e, col) => {
        if(e.target.checked){
            for(let i = 0; i < projectNamesArr.length; i++){
                if(col.id == projectNamesArr[i].id){
                    let payload = {
                        index: i,
                        column: col
                    }
                    dispatch(addColumnToFormula(payload))
                }
            }
        }
        else{
            for(let i = 0; i < formulaNamesArr.length; i++)
                if(col.id == formulaNamesArr[i].id)
                    dispatch(removeColumnFromFormula(i))
        }
    }

    const handleAddTemplate = () => {
        let data = {
            pId: parseInt("16")
        }
        dispatch(addTemplate(data));
    }

    const handleDeleteTemplate = (colName) => {
        let data = {
            pId: parseInt("16"),
            name: colName
        }
        dispatch(deleteTemplate(data));
    }

    const handleUpdateFormula = (colName, colType, colFormula) => {
        let termNames = colFormula.split("*");
        let colNames = []
        for(let i = 0; i < projectNamesArr.length; i++){
            colNames.push(projectNamesArr[i]["columnName:"])
        }

        if(termNames.length === 2 && colNames.includes(termNames[0]) && colNames.includes(termNames[1])){
            let data = {
                pId: parseInt("16"),
                name: colName,
                type: colType,
                formula: colFormula
            }
            dispatch(updateTemplate(data));
        }
        else console.log("Invalid Formula")
    }

    const handleUpdateTemplate = (colName, colType, colFormula) => {
        let data = {
            pId: parseInt("16"),
            name: colName,
            type: colType,
            formula: colFormula
        }
        dispatch(updateTemplate(data));
    }




    return (
        <div className='Template'>
            <div className='Container'>
                <h2>Project Scope Fields</h2>
            {projectNamesArr.map(column => {
                if(column.type === 'null')
                return (
                    <div key={column.id}>
                        <input type="checkbox" defaultChecked={columnIsVisible(column)} onClick={(e) => handleCheckColumn(e, column)}/>
                        {column["columnName:"].toUpperCase()}
                    </div>
                )
            })}
            </div>
            <div className='Container'>
                <div className='SurveyHeader'>
                    <h2>Quantity Survey Fields</h2>
                    <input type="submit" value=" + " onClick={() => handleAddTemplate()}/>
                </div>
                {projectNamesArr.map(column => {
                    if(column.type !== 'null'){
                        console.log(column)
                        if(column.type === 'Formula')
                            return (
                                <div key={column.id}>
                                    <label>Field: </label>
                                    <input type="text" defaultValue={column["columnName:"]} onChange={(e) => handleUpdateTemplate(e.target.value, column.type, column.formula)}/>
                                    
                                    <label>  Type: </label>
                                    <select id="type" name="type" defaultValue={column.type} onChange={(e) => handleUpdateTemplate(column["columnName:"], e.target.value, column.formula)}>
                                        <option value="Number">Number</option>
                                        <option value="Text">Text</option>
                                        <option value='Formula'>Formula</option>
                                    </select>
                                    
                                    <label>  Formula: </label>
                                    <input type="text" defaultValue={column.formula} onChange={(e) => handleUpdateFormula(column["columnName:"], column.type, e.target.value)}/>
 
                                    <input type="submit" id="x" value=" X " onClick={() => handleDeleteTemplate(column["columnName:"])}/>
                                </div>
                        )
                        else return (
                            <div key={column.id}>
                                <label>Field </label>
                                <input type="text" defaultValue={column["columnName:"]} onChange={(e) => handleUpdateTemplate(e.target.value, column.type, column.formula)}/>
                                
                                <label> Type </label>
                                <select id="type" name="type" defaultValue={column.type} onChange={(e) => handleUpdateTemplate(column["columnName:"], e.target.value, column.formula)}>
                                    <option value="Number">Number</option>
                                    <option value="Text">Text</option>
                                    <option value='Formula'>Formula</option>
                                </select>
                                
                                <input type="submit" id="x" value=" X " onClick={() => handleDeleteTemplate(column["columnName:"])}/>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
}
export default Template;