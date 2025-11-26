const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const executePython = (code) => {
  return new Promise((resolve, reject) => {
    //Create temp file with random name
    const jobId = uuidv4();
    const filename = `${jobId}.py`;
    const filepath = path.join(__dirname, "../temp", filename);

    //Write code to the temp file
    fs.writeFileSync(filepath, code);
    console.log(`[${jobId}] File created: ${filepath}`);

    //TODO: Call spawn to excute file
    
    //Mock output
    resolve("It not run yet, just a mock output!!!");
  });
};

module.exports = { executePython };
