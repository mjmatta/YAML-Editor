/* This component is rendered after the user clicks the Edit button. */ 
import React from 'react'

var EditableRow = ( {editFormData, handleEditFormChangeName, handleEditFormChangeType, handleEditFormChangePath, handleEditFormSubmit, handleCancelClick} ) => {
    /* Inputs include current data in the row, three functions to change editFormData, and functions to deal with Save and Cancel. */ 
    return (
        <tr>
            <td>
                <input 
                    type="text"
                    name="name"
                    required="required"
                    placeholder='Enter a name...'
                    value={editFormData.name}
                    onChange={(event) => handleEditFormChangeName(event)}
                />
            </td>
            <td>
                <input type="text"
                    name="type"
                    required="required"
                    placeholder='Enter a type...'
                    value={editFormData.type}
                    onChange={handleEditFormChangeType}
                />
            </td>
            <td>
                <input type="text"
                    name="path"
                    required="required"
                    placeholder='Enter a path...'
                    value={editFormData.path}
                    onChange={handleEditFormChangePath}
                />
            </td>
            <td>
                <button type="button" onClick={handleEditFormSubmit}>Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </td>
    </tr>
    )
};

export default EditableRow;