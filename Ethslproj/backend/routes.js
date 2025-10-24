const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { extractTextFromPDF } = require('./pdfHandler');
const { glossify } = require("./glossifier");
const { visualizeGlosses } = require("./visualizer");

const router = express.Router();

// Load SignWriting mapping (gloss -> svg filename)
let SW_MAP = {};
try {
  const swMapPath = path.join(__dirname, 'public', 'signwriting', 'map.json');
  if (fs.existsSync(swMapPath)) {
    SW_MAP = JSON.parse(fs.readFileSync(swMapPath, 'utf8'));
    console.log('SignWriting map loaded:', Object.keys(SW_MAP).length, 'entries');
  } else {
    console.log('No SignWriting map found at', swMapPath);
  }
} catch (err) {
  console.warn('Failed to load SignWriting map.json:', err && err.message);
}

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


router.post("/upload/pdf", upload.single("file"), async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const text = await extractTextFromPDF(pdfPath);
    res.json({ text });
  } catch (err) {
    console.error("PDF extraction error:", err);
    res.status(500).json({ error: "Failed to extract PDF text" });
  }
});

router.post("/translate/text", (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'text'" });
  }

  const gloss = glossify(text);
  // map to icons: prefer SignWriting SVGs when available, otherwise emoji
  const icons = gloss.map(g => {
    const key = (g || '').toUpperCase();
    if (SW_MAP[key]) return `/signwriting/glyphs/${SW_MAP[key]}`;
    return visualizeGlosses([key])[0] || '✋';
  });
  res.json({ gloss, icons });
});

// Full pipeline: upload PDF -> extract text -> glossify -> visualize
router.post("/translate/pdf", upload.single("file"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) return res.status(400).json({ error: "Missing file upload (field name: file)" });
    const pdfPath = req.file.path;
    const text = await extractTextFromPDF(pdfPath);
    const glosses = glossify(text);
    const icons = visualizeGlosses(glosses);
    res.json({ glosses, icons });
  } catch (err) {
    console.error("Translate pipeline error:", err);
    res.status(500).json({ error: "Failed to translate PDF" });
  }
});

module.exports = router;