import React, { useEffect, useRef, useState } from 'react';
import { ip } from "../config/ip";
import { fetchEventSource } from '@microsoft/fetch-event-source'
import GradientCircleProgressbar from './GradientCircleProgressbar';
import {
    FileUploadContainer,
    UploadFileBtn,
    InputLabel,
    BeginAnalysisBtn
  } from "./styles/file-upload.styles";
import "../css/InputField.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const FileUpload = ({ //inputs as props
    label,
    endpoint
}) => {
    // state variables for files added and progress received from server
    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});
    const [progress, setProgress] = useState({});

    // Handles files being `chosen` by the user
    const changeHandler = (event) => {
        setFiles([...event.target.files]);
    }

    // Add files to form data to be posted to server
    const uploadFiles = async () => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append("File", file);
        })
        // Post to server listens for event feedback continuously until force stopped by server
        fetchEventSource(ip + endpoint, {
            method: 'POST',
            body: formData,
            onmessage(ev){
                // set progress, parse incoming object data as JSON
                setProgress(JSON.parse(ev.data));
            }
        })
    }

    // get finalized files from server as a .zip
    const downloadFinishedZip = () => {
        // get request from server
        fetch(ip + "getCollapsedZip")
            .then(response => {
                return response.blob();
            })
            .then(bytes => {
                console.log(bytes);
                let elm = document.createElement('a');  // create a link element in the DOM
                elm.href = URL.createObjectURL(bytes);  // set link element contents to be bytes received from GET
                elm.setAttribute('download', "collapsed.zip"); // set element attribute download to desired file name
                elm.click() // click the link to initiate download
            })
    }

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    }

    useEffect(() => {
    })

    return(
        <div>
            <FileUploadContainer>
                <InputLabel>{label}</InputLabel>
                <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
                    <i className="fas fa-file-upload"/>
                    <span>Upload Folder</span>
                </UploadFileBtn>
                <input
                    type="file" 
                    ref={fileInputField} 
                    directory="" 
                    webkitdirectory=""
                    title=""
                    value=""
                    onChange={changeHandler}
                />
                <div style={{padding: "5px"}}></div>
                <BeginAnalysisBtn type="button" onClick={uploadFiles}>
                    <i className="fas fa-sync-alt"/>
                    <span>Begin Analysis</span>
                </BeginAnalysisBtn>
                
            </FileUploadContainer>
            <div>
                {Object.keys(progress).map(key => {
                    return (
                        <div style={{display: "flex", width: "25%"}}>
                            <p style={{marginTop: "-5px", paddingRight: "10px"}}>{key}</p>
                            <ProgressBar animated now={progress[key].slice(0,progress[key].length-1)} style={{width: "100%"}} />
                        </div>
                    );
                })}
            </div>
            <button 
                type="button" 
                onClick={downloadFinishedZip}
            >
            <span>Download</span>
            </button>
        </div>
    );
}

export default FileUpload;