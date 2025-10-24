const express = require('express');
const cors = require('cors');
const path   = require('path');
const app   = express();
const port= process.env.PORT || 3000;
const routes = require('./routes');

app.use(cors());
app.use(express.json());
// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.listen(port, () => {
  console.log(`🔥 Server is running on http://localhost:${port}`);
});