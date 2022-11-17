import React, { useEffect, useRef, useState } from 'react';
import { ip } from "../config/ip";
import { fetchEventSource } from '@microsoft/fetch-event-source'
import GradientCircleProgressbar from './GradientCircleProgressbar';

const FileUpload = ({
    label,
    endpoint
}) => {
    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});
    const [progress, setProgress] = useState({});

    const changeHandler = (event) => {
        setFiles([...event.target.files]);
    }

    // const uploadFiles = () => {
    //     const formData = new FormData();
    //     files.forEach(file => {
    //         formData.append("File", file);
    //     })
    //     fetch(ip + endpoint, {
    //         method: 'POST',
    //         body: formData
    //     })
    //     .then(res => res.json())
    //     .then(result => {
    //         console.log(result)
    //     })
    //     .catch(error => {
    //         console.error('Error: ', error);
    //     })
    // }

    const uploadFiles = async () => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append("File", file);
        })
        fetchEventSource(ip + endpoint, {
            method: 'POST',
            body: formData,
            onmessage(ev){
                setProgress(JSON.parse(ev.data));
            }
        })
    }

    useEffect(() => {
    })

    return(
        <div>
            <section>
                <label>{label}</label>
                <button type="button" onClick={uploadFiles}>
                    <i />
                    <span>Upload folder</span>
                </button>
                <input 
                    type="file" 
                    ref={fileInputField} 
                    directory="" 
                    webkitdirectory=""
                    title=""
                    defaultValue=""
                    onChange={changeHandler}
                />
                {Object.keys(progress).map(key => {
                    return (
                        <div>
                            <p>{key}</p>
                            <GradientCircleProgressbar percentage={progress[key].slice(0,progress[key].length-1)} strokeWidth={8} />
                        </div>
                    );
                })}
            </section>
        </div>
    );
}

export default FileUpload;