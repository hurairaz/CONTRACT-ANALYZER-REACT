import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PDFViewer({ pdf_url }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const onLoadSuccess = () => {
        setLoading(false);
        console.log("PDF SUCCESSFULLY LOADED");
    };

    const onLoadError = (error) => {
        setLoading(false);
        setError(error.message);
        console.log("PDF LOAD ERROR");
    };

    return (
        <div className="pdf-viewer-section">
            {loading && <div className="loading-indicator">Loading...</div>}
            {error && <div className="error">Error: {error}</div>}

            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.js">
                <Viewer
                    fileUrl={pdf_url}
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
