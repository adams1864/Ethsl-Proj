# Ethiopian Sign Language Translator

This is a web-based application to translate Amharic text or text from PDF files into Ethiopian Sign Language glosses and visualizations.

## Features

*   Translate Amharic text to sign language glosses.
*   Upload a PDF file and translate its content.
*   Visualize sign language glosses using emojis and SignWriting SVGs.
*   Simple and intuitive web interface.

## Getting Started

### Prerequisites

*   Node.js and npm must be installed on your machine.

### Installation

1.  Clone the repository.
2.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
3.  Install the dependencies:
    ```bash
    npm install express multer cors pdf-parse
    ```

### Running the Application

1.  Start the server:
    ```bash
    node server.js
    ```
2.  Open your web browser and navigate to `http://localhost:3000`.

## Folder Structure

```
backend/
├── public/
│   ├── index.html      # The main HTML file for the frontend
│   ├── main.js         # Client-side JavaScript for handling user interactions
│   ├── styles.css      # CSS styles for the frontend
│   └── signwriting/    # Folder for SignWriting SVG glyphs
├── uploads/            # Folder where uploaded PDF files are stored
├── glossifier.js       # Handles the conversion of text to sign language glosses
├── pdfHandler.js       # Extracts text from PDF files
├── server.js           # The main Express server file
└── visualizer.js       # Maps glosses to visual representations (emojis or SVGs)
```

## API Endpoints

*   `POST /upload/pdf`: Uploads a PDF file and returns the extracted text.
*   `POST /translate/text`: Takes a JSON object with a `text` field and returns the sign language glosses and corresponding icons.
    *   Request body: `{ "text": "your text here" }`
    *   Response: `{ "gloss": ["GLOSS1", "GLOSS2"], "icons": ["ICON1", "ICON2"] }`
*   `POST /translate/pdf`: Uploads a PDF file, extracts the text, and returns the sign language glosses and icons.
