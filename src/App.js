import './App.css';
import DropFileInput from './components/drop-file-input/DropFileInput';
import jsyaml from 'js-yaml'
import React, { useState } from 'react';
import Table from './components/Table';
import { Button, FormGroup, Form, Label, Input } from 'reactstrap';

function App() {

    let fileReader;
    let source;
    const [content, setContent] = useState(null);
    const [mapping, setMapping] = useState([]);

    /**
     * Read the yaml file into plain text when the file gets uploaded
     * @param {*} files 
     */
    const onFileChange = (files) => {
        if (files.length > 0){
            fileReader = new FileReader();
            fileReader.onloadend = handleFileRead;
            fileReader.readAsText(files[0]);
        }else{
            setContent(null)
        }
    };

    /**
     * Set the state when the mapping  childData 
     * @param {*} index 
     */
    const handleCallback = (childData, index) => {
        const newMap = mapping;
        newMap[index] = childData;
        setMapping([...newMap])
    };

    /**
     * Read file upload by users 
     * @param {} e 
     */
    const handleFileRead = (e) => {
        source = fileReader.result;
        setContent(source)
    };

    /**
     * Read yaml file and convert them into yaml objects. 
     */
    const convertMapping = () => {
        const datasets = jsyaml.load(content).datasets
        setMapping(datasets)
    };

    /**
     * Help function to remove multiple indexes in javascript in one time. 
     * @param {*} from 
     * @param {*} to 
     * @returns 
     */
    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    /**
     * Remove the spefic table.
     * @param {*} i 
     */
    var removeTable = (i) => {
        var newM = [...mapping];
        newM.remove(i);
        setMapping(newM);
    };

    /**
     * Function to delete a table. 
     * @param {} data 
     */
    const addTable = (data) => {
        data.preventDefault();
        const newMap = mapping;
        newMap.push({name: data.target[0].value, path: data.target[1].value, fields: []});
        setMapping([...newMap]);
        document.getElementById("addTableForm").reset();
    };

    return (
        <div className="box" id="box">
        <h2 className="header">
            Shredding UI
        </h2>
        <DropFileInput
            onFileChange={(files) => onFileChange(files)}
        />
        {
            content != null ? (
            <>
            <div className="content">
            {content}
            </div>
            <button className='btn btn_generate' onClick={convertMapping}> submit </button>

            <div className='app-container'>
                    {
                        mapping.map((data, index) => (
                            <div>
                            <Table data={data} index={index} parentCallback={handleCallback}/>
                            <Button className = "btn_delete" size="sm" color="primary" onClick={() => removeTable(index)}>Delete</Button>
                            </div>
                        ))
                    }
                    <Form inline onSubmit={(data) => addTable(data)} id="addTableForm">
                        <FormGroup>
                            <Label for="newTableName">Name</Label>
                            <Input type="text" name="name" id="newTableName"></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="newTablePath">Path</Label>
                            <Input type="text" name="path" id="newTablePath"></Input>
                        </FormGroup>
                        <Button size="sm" color="success" type="submit">+</Button>
                    </Form>
                    <a href={`data:text/yaml;charset=utf-8,${encodeURIComponent(jsyaml.dump(mapping))}`} download="newconfig.yaml">Download</a>
            </div>
            </>
            ):(null)
        }
    </div>
    );
}

export default App;