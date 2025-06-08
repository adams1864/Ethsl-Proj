const express =require('express');
const multer  = require('multer');
const cors = require('cors');
const path   = require('path');
const {extractTextFromPDF} = require('./pdfHandler');
const fs    = require('fs');
const app   = express();
const port= process.env.port || 3000;
const { glossify } = require("./glossifier");
app.use(cors());
app.use(express.json());
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)){ 
    fs.mkdirSync(uploadDir)}
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


app.post("/upload/pdf", upload.single("file"), async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const text = await extractTextFromPDF(pdfPath);
    res.json({ text });
  } catch (err) {
    console.error("PDF extraction error:", err);
    res.status(500).json({ error: "Failed to extract PDF text" });
  }
});
app.post("/translate/text", (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'text'" });
  }

  const gloss = glossify(text);
  res.json({ gloss });
});
app.listen(port, () => {
  console.log(`🔥 Server is running on http://localhost:${port}`);
});