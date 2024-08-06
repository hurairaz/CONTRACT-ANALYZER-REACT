import React, { useState } from "react";

function AdvanceSearchCategoryRow({ category_str, searchFields, handleFieldAdd, handleFieldChange, handleFieldRemove }) {
  const title = category_str.charAt(0).toUpperCase() + category_str.slice(1);

  return (
    <div className='section'>
      <h3>{title}</h3>
      {searchFields[category_str].map((element, index) => (
        <div key={index} className='input-container'>
          <input
            type='text'
            className='input-field'
            placeholder={category_str}
            value={element}
            onChange={(e) => handleFieldChange(category_str, index, e.target.value)}
          />
          <button className="remove-button" onClick={() => handleFieldRemove(category_str, index)}>Remove</button>
        </div>
      ))}
      <button className="add-button" onClick={() => handleFieldAdd(category_str)}>Add</button>
    </div>
  );
}

function SearchBar({ searchFields, handleSimpleFieldsChange }) {
  return (
    <div className="section">
      <div className='input-container'>
        <input
          type='text'
          className='input-field'
          placeholder='Search..'
          value={searchFields.plainText}
          onChange={(e) => handleSimpleFieldsChange('plainText', e.target.value)}
        />
        <button><i className='fas fa-search'></i></button>
      </div>
    </div>
  );
}

function AdvanceSearchDateRow({ category_str, handleSimpleFieldsChange }) {
  const title = category_str === "beforeDate" ? "Before" : "After";

  return (
    <div className="section">
      <div className="input-container">
        <h4>{title}</h4>
        <input
          type='date'
          className='input-field'
          onChange={(e) => handleSimpleFieldsChange(category_str, e.target.value)}
        />
      </div>
    </div>
  );
}

export default function Search() {
  const [isExpanded, setIsExpanded] = useState(false);

  const [searchFields, setSearchFields] = useState({
    plainText: '',
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
    console.log("data: ", searchFields);
  };

  const handleFieldRemove = (field, index) => {
    const fieldArray = searchFields[field].filter((_, i) => i !== index);
    setSearchFields(prevState => ({
      ...prevState, [field]: fieldArray,
    }));
  };

  return (
    <div className="search-section">
      <SearchBar
        searchFields={searchFields}
        handleSimpleFieldsChange={handleSimpleFieldsChange}
      />

      <div className='container'>
        <button
          className='advance-search-button'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse Search' : 'Expand Search'}
        </button>
      </div>
      {isExpanded && (
        <div className="container">
          <AdvanceSearchDateRow
            category_str="beforeDate"
            handleSimpleFieldsChange={handleSimpleFieldsChange}
          />
          <AdvanceSearchDateRow
            category_str="afterDate"
            handleSimpleFieldsChange={handleSimpleFieldsChange}
          />
          <AdvanceSearchCategoryRow
            category_str="clauses"
            searchFields={searchFields}
            handleFieldAdd={handleFieldAdd}
            handleFieldChange={handleFieldChange}
            handleFieldRemove={handleFieldRemove}
          />
          <AdvanceSearchCategoryRow
            category_str="parties"
            searchFields={searchFields}
            handleFieldAdd={handleFieldAdd}
            handleFieldChange={handleFieldChange}
            handleFieldRemove={handleFieldRemove}
          />
          <AdvanceSearchCategoryRow
            category_str="terms"
            searchFields={searchFields}
            handleFieldAdd={handleFieldAdd}
            handleFieldChange={handleFieldChange}
            handleFieldRemove={handleFieldRemove}
          />
          <AdvanceSearchCategoryRow
            category_str="companies"
            searchFields={searchFields}
            handleFieldAdd={handleFieldAdd}
            handleFieldChange={handleFieldChange}
            handleFieldRemove={handleFieldRemove}
          />
          <AdvanceSearchCategoryRow
            category_str="divisions"
            searchFields={searchFields}
            handleFieldAdd={handleFieldAdd}
            handleFieldChange={handleFieldChange}
            handleFieldRemove={handleFieldRemove}
          />
          <AdvanceSearchCategoryRow
            category_str="dealTypes"
            searchFields={searchFields}
            handleFieldAdd={handleFieldAdd}
            handleFieldChange={handleFieldChange}
            handleFieldRemove={handleFieldRemove}
          />
          <AdvanceSearchCategoryRow
            category_str="mentionedNames"
            searchFields={searchFields}
            handleFieldAdd={handleFieldAdd}
            handleFieldChange={handleFieldChange}
            handleFieldRemove={handleFieldRemove}
          />
          <AdvanceSearchCategoryRow
            category_str="mentionedSignatures"
            searchFields={searchFields}
            handleFieldAdd={handleFieldAdd}
            handleFieldChange={handleFieldChange}
            handleFieldRemove={handleFieldRemove}
          />
          <AdvanceSearchCategoryRow
            category_str="mentionedWitnesses"
            searchFields={searchFields}
            handleFieldAdd={handleFieldAdd}
            handleFieldChange={handleFieldChange}
            handleFieldRemove={handleFieldRemove}
          />
        </div>
      )}
    </div>
  );
}
