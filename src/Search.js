import React, { useState } from "react";

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
        dealType: ['']

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
    };

    const handleFieldRemove = (field, index) => {
        const fieldArray = searchFields[field].filter((_, i) => i !== index);
        setSearchFields(prevState => ({
            ...prevState, [field]: fieldArray,
        }));

    };

    return (
        <div className="search-section">
            <div className='container'>
                <input
                    type='text'
                    className='input-field'
                    placeholder='Search..'
                    value={searchFields.plainText}
                    onChange={(e) => handleSimpleFieldsChange('searchText', e.target.value)}
                />
                <button><i className='fas fa-search'></i></button>
            </div>

            <div className='container'>
                <button
                    className='advance-search-button'
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Collapse Search' : 'Expand Search'}
                </button>
            </div>
            {isExpanded && (<div className="container">
                <div className='section'>
                    <h3>Effective Date</h3>
                    <h4>Before:</h4>
                    <input
                        type='date'
                        className='input-field'
                        onChange={(e) => handleSimpleFieldsChange('beforeDate', e.target.value)}
                    />
                    <h4>After:</h4>
                    <input
                        type='date'
                        className='input-field'
                        onChange={(e) => handleInputChange('afterDate', e.target.value)}
                    />
                </div>
                <div className='section'>
                    <h3>Clauses</h3>
                    {searchFields.clauses.map((clause, index) => (
                        <div key={index} className='input-container'>
                            <input
                                type='text'
                                className='input-field'
                                placeholder='Clause'
                                value={clause}
                                onChange={(e) => handleFieldChange('clauses', index, e.target.value)}
                            />
                            <button className="remove-button" onClick={() => handleFieldRemove('clauses', index)}>Remove</button>
                        </div>
                    ))}
                    <button className="add-button" onClick={() => handleFieldAdd('clauses')}>Add Another Clause</button>
                </div>
                <div className='section'>
                    <h3>Parties</h3>
                    {searchFields.parties.map((party, index) => (
                        <div key={index} className='input-container'>
                            <input
                                type='text'
                                className='input-field'
                                placeholder='Party'
                                value={party}
                                onChange={(e) => handleFieldChange('parties', index, e.target.value)}
                            />
                            <button className="remove-button" onClick={() => handleFieldRemove('parties', index)}>Remove</button>
                        </div>
                    ))}
                    <button className="add-button" onClick={() => handleFieldAdd('parties')}>Add Another Party</button>
                </div>
                <div className='section'>
                    <h3>Terms</h3>
                    {searchFields.terms.map((term, index) => (
                        <div key={index} className='input-container'>
                            <input
                                type='text'
                                className='input-field'
                                placeholder='Term'
                                value={term}
                                onChange={(e) => handleFieldChange('terms', index, e.target.value)}
                            />
                            <button className="remove-button" onClick={() => handleFieldRemove('terms', index)}>Remove</button>
                        </div>
                    ))}
                    <button className="add-button" onClick={() => handleFieldAdd('terms')}>Add Another Term</button>
                </div>
                <div className='section'>
                    <h3>Companies</h3>
                    {searchFields.companies.map((company, index) => (
                        <div key={index} className='input-container'>
                            <input
                                type='text'
                                className='input-field'
                                placeholder='Company'
                                value={company}
                                onChange={(e) => handleFieldChange('companies', index, e.target.value)}
                            />
                            <button className="remove-button" onClick={() => handleFieldRemove('companies', index)}>Remove</button>
                        </div>
                    ))}
                    <button className="add-button" onClick={() => handleFieldAdd('companies')}>Add Another Company</button>
                </div>
                <div className='section'>
                    <h3>Divisions</h3>
                    {searchFields.divisions.map((division, index) => (
                        <div key={index} className='input-container'>
                            <input
                                type='text'
                                className='input-field'
                                placeholder='Division'
                                value={division}
                                onChange={(e) => handleFieldChange('divisions', index, e.target.value)}
                            />
                            <button className="remove-button" onClick={() => handleFieldRemove('divisions', index)}>Remove</button>
                        </div>
                    ))}
                    <button className="add-button" onClick={() => handleFieldAdd('divisions')}>Add Another Division</button>
                </div>
                <div className="section">

                </div>
            </div>)}
        </div>
    );
}