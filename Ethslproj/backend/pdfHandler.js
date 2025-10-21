const fs = require('fs');
let pdfParse;
try {
  pdfParse = require('pdf-parse');
} catch (e) {
  // pdf-parse may not be installed; provide a fallback that returns empty text
  console.warn('pdf-parse not installed; PDF extraction will return empty string');
  pdfParse = async () => ({ text: '' });
}

async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text || '';
}

module.exports = { extractTextFromPD };

