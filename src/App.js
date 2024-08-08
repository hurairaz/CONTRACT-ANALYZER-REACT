import React, { useState } from 'react';
import PDFLists from './PDFLists';
import PDFViewer from './PDFViewer';
import Search from './Search';
import './App.css';
import KeyTerms from './KeyTerms';
import SearchResults from './SearchResults';

export default function App() {
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [searchResults, setSearchResults] = useState([
    { pdfUrl: "/sample.pdf", matchPercentage: "75%" },
    { pdfUrl: "/sample1.pdf", matchPercentage: "60%" },
    { pdfUrl: "/sample2.pdf", matchPercentage: "50%" },
    { pdfUrl: "/sample3.pdf", matchPercentage: "90%" }
  ]);
  const [selectedPdfKeyTerms, setSelectedPdfKeyTerms] = useState([
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
  const [searchTextSuggestions, setSearchTextSuggestions] = useState([]);
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
    <div className="app-container">
      <div className="search-panel">
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
      <div className='main-content'>
        <div className='header'>
          <h1>OwlEyes Contract Analyzer</h1>
        </div>
        <div className='content'>
          <div className='insights-panel'>
            <div className='key-terms-panel'>
              <KeyTerms selectedPdfKeyTerms={selectedPdfKeyTerms} selectedPdfUrl={selectedPdfUrl} onPdfClick={handlePdfClick} />
            </div>
            <div className='search-results-panel'>
              <SearchResults searchResults={searchResults} onPdfClick={handlePdfClick} />
            </div>
          </div>
          <div className="pdf-viewer-panel">
            {selectedPdfUrl && <PDFViewer pdf_url={selectedPdfUrl} />}
          </div>
          <div className="pdf-lists-panel">
            <PDFLists pdfUrls={pdfUrls} onPdfClick={handlePdfClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
