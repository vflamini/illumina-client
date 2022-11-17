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
        label="Upload folder containing raw illumina data"
        endpoint="sendIllumina"
      />
    </div>
  );
}

export default App;
