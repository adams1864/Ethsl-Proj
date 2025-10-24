const { visualizeGlosses } = require('../visualizer');

describe('visualizeGlosses', () => {
  test('should return correct emojis for known glosses', () => {
    const glosses = ["SCRATCH", "HELP", "CHILDREN", "THINK", "READ"];
    const expected = ["🐱", "🤲", "🧒", "💭", "📖"];
    expect(visualizeGlosses(glosses)).toEqual(expected);
  });

  test('should return default emoji for unknown glosses', () => {
    const glosses = ["UNKNOWN", "ANOTHER_UNKNOWN"];
    const expected = ["✋", "✋"];
    expect(visualizeGlosses(glosses)).toEqual(expected);
  });

  test('should handle mixed known and unknown glosses', () => {
    const glosses = ["SCRATCH", "UNKNOWN", "HELP"];
    const expected = ["🐱", "✋", "🤲"];
    expect(visualizeGlosses(glosses)).toEqual(expected);
  });

  test('should handle empty array', () => {
    expect(visualizeGlosses([])).toEqual([]);
  });

  test('should handle null or undefined input', () => {
    expect(visualizeGlosses(null)).toEqual([]);
    expect(visualizeGlosses(undefined)).toEqual([]);
  });
});