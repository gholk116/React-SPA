import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getProject } from '../../store/projectReducer';
import { setEntry } from '../../store/resourceReducer';


function Formula() {
    const pColumnNames = useSelector((state) => state.project.formulaTableNames);
    const pTableData = useSelector((state) => state.project.formulaTableData);
    let projectNamesArr = pColumnNames;
    let projectDataArr = pTableData;
    const dispatch = useDispatch();

    useEffect(() => {
        let data = "16";
        if(projectNamesArr.length === 0)
            dispatch(getProject(parseInt(data)));
        formulaUpdater();
    },[]);

    const handleSetEntry = (rowId, colId, val) => {
        let data = {
            resourceId: parseInt(rowId),
            columnId: parseInt(colId),
            value: val,
        }
        dispatch(setEntry(data));
    }

    const formulaUpdater = () => {
        console.log(projectNamesArr)
        let nameId = {}
        for(let i = 0; i < projectNamesArr.length; i++){
            nameId[projectNamesArr[i]["columnName:"].toUpperCase()] = projectNamesArr[i].id; //name: id
            console.log(nameId);
            if(projectNamesArr[i].type === 'Formula'){
                let cols = projectNamesArr[i].formula.split("*"); //column names
                let column1 = nameId[cols[0].toUpperCase()]; //ids
                let column2 = nameId[cols[1].toUpperCase()];
                
                for(let j = 0; j < projectDataArr.length; j++){
                    let row = projectDataArr[j]; //resource
                    let col = projectNamesArr[i]; //columnInfo
                    let value = row.content[column1] * row.content[column2]
                    handleSetEntry(row.resourceId, col.id, value)
                }
            }
        }
    }

    return (
        <div>
            <div className="theader">
                <h2>Quantity Survey</h2>
                <input type="button" value="Evaluate Formulas" onClick={() => formulaUpdater()}/>
            </div>
            <table>
                <thead>
                    <tr>
                        { (projectNamesArr).map((column) => {
                                return (
                                <th key={column.id}>
                                    {column["columnName:"].toUpperCase()}
                                </th>
                                )
                            }) 
                        }
                    </tr>
                </thead>
                <tbody>
                    {(projectDataArr).map((row) => {
                        return (
                            <tr key={row.resourceId}>
                                {(projectNamesArr).map((column) => {
                                    return(
                                    <td key={column.id} contentEditable="true" suppressContentEditableWarning={true} onInput={(e) => handleSetEntry(row.resourceId, column.id, e.currentTarget.textContent)}>
                                        { row.content[column.id] }
                                    </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Link to={"/template"}>Edit Quantity Survey Template</Link>
        </div>
    );
}
export default Formula;