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

function SearchBar({ searchFields, handleSimpleFieldsChange, handleNlpRequest }) {
  return (
    <div className="section">
      <div className='input-container'>
        <input
          type='text'
          className='input-field'
          placeholder='Search..'
          value={searchFields.plainText}
          onChange={(e) => {
            handleSimpleFieldsChange('finalPlainText', e.target.value);
            handleNlpRequest(e.target.value);
          }}
        />
        <button><i className='fas fa-search'></i></button>
      </div>
    </div>
  );
}

function SearchTextSuggestionsRow({ searchTextSuggestions }) {
  return (
    <div className="suggestions-section">
      {searchTextSuggestions.map((suggestion, index) => (
        <div key={index} className="suggestion-container">
          <i className='fas fa-search'></i>
          <p className="suggestion-text">{suggestion}</p>
        </div>
      ))}
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

export default function Search({ searchFields, handleSimpleFieldsChange, handleFieldAdd, handleFieldChange, handleFieldRemove, searchTextSuggestions, handleNlpRequest }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="search-section">
      <SearchBar
        searchFields={searchFields}
        handleSimpleFieldsChange={handleSimpleFieldsChange}
        handleNlpRequest={handleNlpRequest}
      />

      {searchTextSuggestions.length > 0 && (
        <SearchTextSuggestionsRow
          searchTextSuggestions={searchTextSuggestions}
        />
      )}

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
          {Object.entries(searchFields).map(([key, value]) => {
            if (key !== 'finalPlainText' && key !== 'beforeDate' && key !== 'afterDate') {
              return (
                <AdvanceSearchCategoryRow
                  key={key}
                  category_str={key}
                  searchFields={searchFields}
                  handleFieldAdd={handleFieldAdd}
                  handleFieldChange={handleFieldChange}
                  handleFieldRemove={handleFieldRemove}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
