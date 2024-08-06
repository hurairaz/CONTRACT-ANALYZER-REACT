import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PDFViewer({ fileUrl }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const zoomPluginInstance = zoomPlugin();
    const toolbarPluginInstance = toolbarPlugin();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    console.log('Zoom Plugin Instance:', zoomPluginInstance);
    console.log('Toolbar Plugin Instance:', toolbarPluginInstance);
    console.log('Default Layout Plugin Instance:', defaultLayoutPluginInstance);

    const onLoadSuccess = () => {
        console.log('PDF loaded successfully');
        setLoading(false);
    };

    const onLoadError = (error) => {
        console.error('PDF load error:', error);
        setLoading(false);
        setError(error.message);
    };

    return (
        <div className="pdf-viewer">
            {loading && <div className="loading-indicator">Loading...</div>}
            {error && <div className="error">Error: {error}</div>}

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.js">
                <Viewer
                    fileUrl={fileUrl}
                    plugins={[
                        defaultLayoutPluginInstance
                    ]}
                    onLoadSuccess={onLoadSuccess}
                    onLoadError={onLoadError}
                />
            </Worker>
        </div>
    );
}
