import React from 'react';
import './App.css';

export default function PDFLists({ pdfUrls, onPdfClick }) {


    const getPDFNameFromUrl = (pdf_url) => {
        const pdfNameWithExtension = pdf_url.substring(pdf_url.lastIndexOf('/') + 1);
        const pdfName = pdfNameWithExtension.substring(0, pdfNameWithExtension.lastIndexOf('.'));
        return pdfName;
    };

    return (
        <div className='pdf-lists-section'>
            {pdfUrls.map((pdf_url, index) => (
                <div key={index} className='pdf-item' onClick={() => onPdfClick(pdf_url)}>
                    <i className="fa-solid fa-file-pdf"></i>
                    <span className='pdf-name'>{getPDFNameFromUrl(pdf_url)}</span>
                </div>
            ))}
        </div>
    );
}

