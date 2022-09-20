import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { readRequest, changeKeyword, addResource, addColumn, setEntry, updateColumn } from '../../store/resourceReducer';
import './Resource.css'

function Resource() {
    const tableData = useSelector((state) => state.resource.tableData);
    const columnNames = useSelector((state) => state.resource.columnNames);
    const keyword = useSelector((state) => state.resource.keyword);
    const dispatch = useDispatch();
    // let namesArr = [];
    // for(let i = 0; i < columnNames.length; i++)
    //     namesArr[i] = columnNames[i];
    // let dataArr = [];
    // for(let i = 0; i < columnNames.length; i++)
    //     dataArr[i] = tableData[i];
    let namesArr = columnNames;
    let dataArr = tableData;
    let previousName = "";
    

    useEffect(() => {
        dispatch(readRequest());
    },[]);

    const handleSearch = (query) => {
        if(query === "") {
            dataArr = tableData;
        }
        else {
            let name = namesArr[0].id
            dataArr = dataArr.filter(row => String(row.content[name]).includes(query))
        }
    }

 
    const handleAddResource = () => {
        dispatch(addResource());
        dispatch(readRequest());
    };

    const handleAddColumn = () => {
        const columnName = prompt("Enter Column Name")
        dispatch(addColumn(columnName));
        dispatch(readRequest());
    }

    const handleSetEntry = (rowId, colId, val) => {
        let data = {
            resourceId: parseInt(rowId),
            columnId: parseInt(colId),
            value: val,
        }
        dispatch(setEntry(data));
    }

    const handleChangeColumnName = (oldColumnName, e) => {
        const newColumnName = prompt("Enter a new column name");
        let data = {
            old: oldColumnName,
            new: newColumnName
        }
        
        dispatch(updateColumn(data));
        dispatch(readRequest());
    }
    
    return (
        <div>
            <div className="theader">
                <div className="filter">
                    <input type="text" placeholder=" Search Name" onChange={(e) => dispatch(changeKeyword(e.target.value))}/>
                    <input type="submit" value=" Search " onClick={handleSearch(keyword)}/>
                </div>
                <h2>Resource Catalog</h2>
                <div className="dropdown">
                    <input type="button" value=" + "/>
                    <div className="dropdown-content">
                        <p onClick={() => handleAddResource()}>Add Row</p>
                        <p onClick={() => handleAddColumn()}>Add Column</p>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        { namesArr.length > 0  
                            ? (namesArr).map((item) => {
                                // console.log(dataArr)
                                return (
                                <th key={item.id} onClick={(e) => handleChangeColumnName(item["columnName:"], e)}>
                                    {item["columnName:"].toUpperCase()}
                                </th>
                                )
                            }) 
                            : console.log("This is the problem: namesArr is", namesArr)
                        }
                    </tr>
                </thead>
                <tbody>
                    {(dataArr).map((row) => {
                        return (
                            <tr key={row.resourceId}>
                                {(namesArr).map((column) => {
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
        </div>
    );
}
export default Resource;