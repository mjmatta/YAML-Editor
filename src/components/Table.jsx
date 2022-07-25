import React, { Fragment } from "react";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./ReadOnlyRow";

class Table extends React.Component {

    //Get props and initialize state
    constructor(props) {
        super(props);
        this.state = {mapping: props.data, index: props.index, editFieldId: null, editTableName: null, editFormData: {name: "", type:"", path:""}};
    };

    //Automatically updates mapping
    componentWillReceiveProps(nextProps) {
        this.setState({mapping: nextProps.data, index: nextProps.index})
    }

    //updates table mapping with newly added row
    handleAddFormSubmit = (event) => {
        event.preventDefault();
        const newField = {
            name : event.target[0].value,
            type : event.target[1].value,
            path : event.target[2].value
        };

        const newmap = this.state.mapping;
        newmap.fields.push(newField);

        this.setState({mapping: newmap});
        this.props.parentCallback(this.state.mapping, this.state.index); //callback to App.js to update overall mapping
    };

    //update table mapping on row edit
    handleEditFormSubmit = (event) => {
        
        event.preventDefault();
        var newField = {
            name : this.editFormData.name,
            type : this.editFormData.type,
            path : this.editFormData.path
        };

        const newmap = this.state.mapping;

        newmap.fields.splice(this.state.editFieldId, 1, newField);
        this.setState({mapping: newmap});
        this.props.parentCallback(this.state.mapping, this.state.index); //callback to App.js to update overall mapping

        this.setState({editFieldId: null})
  };

    //Five methods below are for handling editable row changes
    handleEditFormChangeName = (event) => {
        event.preventDefault();

        const fieldValue = event.target.value;
        
        this.setState(prevState => {
            let editFormData = Object.assign({}, prevState.editFormData); //update editable row
            editFormData.name = fieldValue; //updatre editFormData with new value
            this.editFormData = editFormData;           
            return { editFormData };
        })

    }
    handleEditFormChangeType = (event) => {
        event.preventDefault();

        const fieldValue = event.target.value;
        
        this.setState(prevState => {
            let editFormData = Object.assign({}, prevState.editFormData);
            editFormData.type = fieldValue;  
            this.editFormData = editFormData;              
            return { editFormData };
        })
    }

    handleEditFormChangePath = (event) => {
        event.preventDefault();

        const fieldValue = event.target.value;
        
        this.setState(prevState => {
            let editFormData = Object.assign({}, prevState.editFormData);
            editFormData.path = fieldValue;    
            this.editFormData = editFormData;            
            return { editFormData };
        })
    }
    
    handleEditClick = (event, field, index, name) => {
        event.preventDefault();
        this.setState({editFieldId: index, editTableName: name})

        const formValues = {
            name : field.name,
            type : field.type,
            path : field.path
        }
        this.setState({editFormData: formValues})
    }

    handleCancelClick =() => {
        this.setState({editFieldId: null, editTableName: null, editFormData: {name: "", type:"", path:""}})
    }

    //handles row deletion
    deleteRow = (event, i) => {

    const newmap = this.state.mapping;
        event.preventDefault();
        newmap.fields.splice(i, 1); //make new object without given row
        this.setState({mapping: newmap}); //set new state
        this.props.parentCallback(this.state.mapping, this.state.index); //callback to App.js
    };

    render() {
        const data = this.props.data;

        return (
            <div>
            <form>
            <table>
            <thead>
                <tr>
                    <th>{data.name}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>name</th>
                    <th>type</th>
                    <th>path</th>
                </tr>
            <tbody>
            </tbody>
                {
                    (data.fields).map((field, index) => (
                        <Fragment>
                            {((this.state.editFieldId === index) && (this.state.editTableName === this.state.mapping.name)) ? (
                                <EditableRow 
                                    editFormData={this.state.editFormData}
                                    handleEditFormChangeName={this.handleEditFormChangeName}
                                    handleEditFormChangeType={this.handleEditFormChangeType}
                                    handleEditFormChangePath={this.handleEditFormChangePath}
                                    handleEditFormSubmit={this.handleEditFormSubmit}
                                    handleCancelClick={this.handleCancelClick}
                                />
                            ) : (
                                <ReadOnlyRow 
                                field={field}
                                index={index} 
                                name={this.state.mapping.name}  
                                handleEditClick={this.handleEditClick}
                                deleteRow={this.deleteRow}/>
                            )}
                        </Fragment>
                    ))
                }
            </tbody>
            </table>
            </form>
            <form onSubmit={(event) => this.handleAddFormSubmit(event)}>
                <input type="text"
                    name="addName"
                    required="required"
                    placeholder='name'
                    
                />

                <input type="text"
                    name="addType"
                    required="required"
                    placeholder='type'
                    
                />
                <input type="text"
                    name="addPath"
                    required="required"
                    placeholder='path'
                    
                />
                <button type='submit' >Add</button>
            </form>         
            </div>
        );
    }

}

export default Table;