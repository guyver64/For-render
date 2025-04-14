import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('MCP Server is running.');
});

app.listen(PORT, () => {
  console.log(`HTTP health check server running on port ${PORT}`);
});
