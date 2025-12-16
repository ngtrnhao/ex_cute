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

    const pythonProcess = spawn("python", [filepath]);

    let output = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
      console.log(`[${jobId}] Process exited with code ${code}`);

      try {
        fs.unlinkSync(filepath);
        console.log(`[${jobId} Temporary file deleted]`);
      } catch (error) {
        console.error(
          `$[jobId] Error deleting temporary file: ${error.message}`
        );
      }
      if (code !== 0) {
        reject(new Error(errorOutput || "Unknown error occurred"));
      } else {
        resolve(output);
      }
    });
  });
};

module.exports = { executePython };
