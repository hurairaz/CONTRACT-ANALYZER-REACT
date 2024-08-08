import React, { useState } from "react";
import './App.css'
export default function KeyTerms({ selectedPdfKeyTerms, selectedPdfUrl, onPdfClick }) {
    return (
        <div className='pdf-keyterms-section'>
            {selectedPdfKeyTerms.map((keyTerm, index) => (
                <div key={index} className='keyterm-item' onClick={() => onPdfClick(selectedPdfUrl)}>
                    <span className="keyterm">{keyTerm}</span>
                </div>
            ))}
        </div>
    );
}