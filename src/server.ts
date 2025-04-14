import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Travel Planner MCP Server is running.');
});

app.listen(PORT, () => {
  console.log(`Health check server listening on port ${PORT}`);
});
