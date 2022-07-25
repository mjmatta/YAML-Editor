/* This component renders when a YAML file is submitted. */ 
import React from 'react'

var ReadOnlyRow = ( {field, index, name, handleEditClick, deleteRow} ) => {
    /* The inputs are the field of the table, index of the table, name of the table, a function to handle the Edit button when it is clicked, and a function to handle the Delete button when it is clicked. */ 
    return (
        <tr>
            <td>{field.name}</td>
            <td>{field.type}</td>
            <td>{field.path}</td>
            <td>
                <button type="button" onClick={(event)=> handleEditClick(event, field, index, name)}>Edit</button>
                <button type="button" onClick={(event) => deleteRow(event, index)}>Delete</button>
            </td>
        </tr>
    )
};

export default ReadOnlyRow;