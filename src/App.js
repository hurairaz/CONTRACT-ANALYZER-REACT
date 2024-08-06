import React from 'react';
import './App.css'; // Import your CSS file

function App() {
  const pdfUrls = [
    'https://example.com/pdf1.pdf',
    'https://example.com/pdf2.pdf',
    'https://example.com/pdf3.pdf'
  ];

  const getFileNameFromUrl = (url) => {
    return url.substring(url.lastIndexOf('/') + 1);
  };

  return (
    <div className="App">
      <h1>PDF List</h1>
      <div className="pdf-list">
        {pdfUrls.map((url, index) => (
          <div key={index} className="pdf-item">
            <a href={url} target="_blank" rel="noopener noreferrer" className="pdf-link">
              <i className="fas fa-file-pdf pdf-icon"></i>
              <span className="pdf-name">{getFileNameFromUrl(url)}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
