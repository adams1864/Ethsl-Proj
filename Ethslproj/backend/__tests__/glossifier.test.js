const { glossify } = require('../glossifier');

describe('glossify', () => {
  test('should convert text to uppercase glosses and remove stop words', () => {
    const text = "This is a reading book about biology.";
    const expected = ["READ", "BOOK", "BIOLOGY"];
    expect(glossify(text)).toEqual(expected);
  });

  test('should handle empty string', () => {
    expect(glossify("")).toEqual([]);
  });

  test('should remove punctuation', () => {
    const text = "Hello, world! How are you?";
    const expected = ["HELLO", "WORLD", "HOW", "YOU"];
    expect(glossify(text)).toEqual(expected);
  });

  test('should use dictionary for normalization', () => {
    const text = "student reads a book";
    const expected = ["STUDENT", "READ", "BOOK"];
    expect(glossify(text)).toEqual(expected);
  });

  test('should handle words not in dictionary', () => {
    const text = "computer science";
    const expected = ["COMPUTER", "SCIENCE"];
    expect(glossify(text)).toEqual(expected);
  });
});