const express = require("express");
const { executePython } = require("./execute");
const app = express();

app.use(express.json());

app.post("/run", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "No code provided to execute" });
  }
  try {
    const output = await executePython(code);
    res.json({ output });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
