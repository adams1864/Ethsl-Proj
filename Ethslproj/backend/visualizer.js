// visualizer.js
// A helper that converts gloss words into emoji or 2D hand icons.
// Uses a small dictionary and falls back to a raised-hand emoji if missing.

const emojiMap = {
  SCRATCH: "🐱",
  HELP: "🤲",
  CHILDREN: "🧒",
  THINK: "💭",
  CREATIVE: "💡",
  READ: "📖",
  STUDENT: "🎓",
  BOOK: "📚",
  BIOLOGY: "🧬",
};

function visualizeGlosses(glosses) {
  if (!Array.isArray(glosses)) return [];
  return glosses.map(g => emojiMap[g] || "✋");
}

module.exports = { visualizeGlosses };
