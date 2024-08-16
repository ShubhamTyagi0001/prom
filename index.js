const express = require("express");
const app = express();

const client = require("prom-client");

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register: client.register });

app.get("/", (req, res) => {
  return res.send("Hello!");
});

app.get("/matrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const matrics = await client.register.metrics();
  return res.send(matrics);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
