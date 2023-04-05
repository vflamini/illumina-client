import './css/App.css';
import FileUpload from './inputs/FileUpload';
import { ip } from "./config/ip";
import React, { useRef, useState, useEffect } from 'react';

function App() {
  return (
    <div>
      <header>
        
      </header>
      <FileUpload 
        label="Upload Folder Containing Raw Illumina Data"
        endpoint="sendIllumina"
      />
    </div>
  );
}

export default App;
