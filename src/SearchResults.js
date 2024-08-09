import React from "react";
import './App.css';

export default function SearchResults({ searchResults, onPdfClick }) {
    const results = [
        { pdfUrl: "/sample.pdf", matchPercentage: "75%" },
        { pdfUrl: "/sample1.pdf", matchPercentage: "60%" },
        { pdfUrl: "/sample2.pdf", matchPercentage: "50%" },
        { pdfUrl: "/sample3.pdf", matchPercentage: "90%" }
    ];

    const getPDFNameFromUrl = (pdfUrl) => {
        const pdfNameWithExtension = pdfUrl.substring(pdfUrl.lastIndexOf('/') + 1);
        const pdfName = pdfNameWithExtension.substring(0, pdfNameWithExtension.lastIndexOf('.'));
        return pdfName;
    };

    return (
        <div className='search-results-section'>
            <h4>Search Results</h4>
            {results.map((result, index) => (
                <div key={index} className='result-item' onClick={() => onPdfClick(result.pdfUrl)}>
                    <div className="pdf-item">
                        <i className="fa-solid fa-file-pdf"></i>
                        <span className='pdf-name'>{getPDFNameFromUrl(result.pdfUrl)}</span>
                    </div>
                    <div className="match-percentage">
                        <span>Match: {result.matchPercentage}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
