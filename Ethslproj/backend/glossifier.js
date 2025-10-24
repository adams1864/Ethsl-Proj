// glossifier.js

// Optional dictionary to normalize words
const glossDictionary = {
  reading: "READ",
  reads: "READ",
  student: "STUDENT",
  book: "BOOK",
  biology: "BIOLOGY",
  is: "", // remove
  the: "", // remove
  a: "",
};

const stopWords = new Set(["is", "the", "a", "an", "in", "on", "of", "about", "are", "was", "this"]);

function glossify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // remove punctuation
    .split(/\s+/)            // tokenize
    .filter(word => !stopWords.has(word))
    .map(word => glossDictionary[word] || word.toUpperCase())
    .filter(Boolean); // remove empty strings
}

module.exports = { glossify };

