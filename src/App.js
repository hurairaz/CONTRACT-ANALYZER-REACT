import React, { useState } from 'react';
import PDFLists from './PDFLists';
import PDFViewer from './PDFViewer';
import Search from './Search';  // Import the Search component
import './App.css';

export default function App() {
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [searchFields, setSearchFields] = useState({
    finalPlainText: '',
    beforeDate: '',
    afterDate: '',
    parties: [''],
    clauses: [''],
    terms: [''],
    companies: [''],
    divisions: [''],
    mentionedNames: [''],
    mentionedSignatures: [''],
    mentionedWitnesses: [''],
    dealTypes: ['']
  });
  const [pdfUrls, setPdfUrls] = useState([
    '/sample.pdf',
    '/sample1.pdf',
    '/sample2.pdf',
    '/sample3.pdf'
  ]);
  const [searchTextSuggestions, setSearchTextSuggestions] = useState([
    "real estate description",
    "real property",
    "real",
    "real estate agent",
    "real estate property",
    "real estate purchase",
    "real estate if",
    "real property situated",
    "real estate",
    "real estate contract",
    "real estate taxes",
    "real estate mortgage"
  ]);
  const [nlpRequestText, setNlpRequestText] = useState('');

  const handlePdfClick = (pdfUrl) => {
    setSelectedPdfUrl(pdfUrl);
  };

  const handleSimpleFieldsChange = (field, value) => {
    setSearchFields(prevState => ({
      ...prevState, [field]: value,
    }));
  };

  const handleFieldAdd = (field) => {
    setSearchFields(prevState => ({
      ...prevState, [field]: [...prevState[field], ''],
    }));
  };

  const handleFieldChange = (field, index, value) => {
    const fieldArray = [...searchFields[field]];
    fieldArray[index] = value;
    setSearchFields(prevState => ({
      ...prevState, [field]: fieldArray,
    }));
  };

  const handleFieldRemove = (field, index) => {
    const fieldArray = searchFields[field].filter((_, i) => i !== index);
    setSearchFields(prevState => ({
      ...prevState, [field]: fieldArray,
    }));
  };

  const handleNlpRequest = (plainText) => {
    setNlpRequestText(plainText);
    console.log(nlpRequestText);
  };

  return (
    <div className="app-section">
      <div className="pdf-lists-container">
        <PDFLists pdfUrls={pdfUrls} onPdfClick={handlePdfClick} />
      </div>
      <div className="pdf-viewer-container">
        {selectedPdfUrl && <PDFViewer pdf_url={selectedPdfUrl} />}
      </div>
      <div className="search-container">
        <Search
          searchFields={searchFields}
          handleSimpleFieldsChange={handleSimpleFieldsChange}
          handleFieldAdd={handleFieldAdd}
          handleFieldChange={handleFieldChange}
          handleFieldRemove={handleFieldRemove}
          searchTextSuggestions={searchTextSuggestions}
          handleNlpRequest={handleNlpRequest}
        />
      </div>
    </div>
  );
}
