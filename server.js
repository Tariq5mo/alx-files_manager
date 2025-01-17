const express = require('express');
const routes = require('./routes/index');

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; // Export for testing