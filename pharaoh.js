const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <body style="background-color: #f0f8ff; font-family: Arial, sans-serif; text-align: center; padding: 50px;">
      <h1 style="color: #2c3e50;">🚀 THE DYNAMIC PROTOTYPE!</h1>
      <p style="color: #34495e; font-size: 1.2em;">
        Discover, connect, and create — all in one place.
      </p>
    </body>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
