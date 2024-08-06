import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';

async function extractTextWithPositions(pdfUrl) {
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    let textData = [];

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        content.items.forEach(item => {
            textData.push({
                text: item.str,
                page: i,
                bb_cord: item.transform
            });
        });
    }

    return textData;
}

function findKeywordPositions(textData, keyword) {
    const keywordPositions = [];

    textData.forEach(item => {
        if (item.text.includes(keyword)) {
            keywordPositions.push({
                page: item.page,
                bb_cord: item.bb_cord,
                text: item.text
            });
        }
    });

    return keywordPositions;
}

export default function PDFExtractor({ keyword, pdfUrl }) {
    const [keywordPositions, setKeywordPositions] = useState([]);
    const [error, setError] = useState(null);

    async function handleCall() {
        try {
            const textData = await extractTextWithPositions(pdfUrl); // Await the result
            const positions = findKeywordPositions(textData, keyword);
            setKeywordPositions(positions);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <button onClick={handleCall}>Search</button>
            {error && <div className="error">Error: {error}</div>}
            {keywordPositions.length > 0 && (
                <div>
                    <h2>Keyword Positions:</h2>
                    <ul>
                        {keywordPositions.map((position, index) => (
                            <li key={index}>
                                <p><strong>Page:</strong> {position.page}</p>
                                <p><strong>Text:</strong> {position.text}</p>
                                <p><strong>Bounding Box:</strong> {position.bb_cord.join(', ')}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
