import React, { useState } from "react";
import axios from "axios";

function Coder() {
  const [language, setLanguage] = useState("js");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  // Language ID mapping for Judge0 API
  const languageIdMap = {
    js: 63, // JavaScript
    cpp: 52, // C++
    java: 91, // Java
    py: 92, // Python
  };

  const handleCompile = async () => {
    try {
      const submitEndpoint = "https://judge0-ce.p.rapidapi.com/submissions";
      const submitOptions = {
        method: "POST",
        url: submitEndpoint,
        params: { fields: "*" },
        headers: {
          "x-rapidapi-key":
            "26d3d3b84emsh8cf70abca12e070p10feddjsnb478fd404662",
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          language_id: languageIdMap[language] || 63,
          source_code: code,
          stdin: input,
        },
      };

      const submitResponse = await axios.request(submitOptions);
      const submissionId = submitResponse.data.token;

      // Fetch the result
      const resultEndpoint = `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`;

      const resultOptions = {
        method: "GET",
        url: resultEndpoint,
        params: {
          base64_encoded: "true",
          fields: "*",
        },
        headers: {
          "x-rapidapi-key":
            "26d3d3b84emsh8cf70abca12e070p10feddjsnb478fd404662",
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        },
      };

      let resultResponse = null;
      let status = "";
      await new Promise((resolve) => setTimeout(resolve, 1000));
      resultResponse = await axios.request(resultOptions);

      status = resultResponse.data.status?.id;
      setOutput(
        resultResponse.data.stdout
          ? atob(resultResponse.data.stdout)
          : resultResponse.data.stderr
          ? atob(resultResponse.data.stderr)
          : "No output"
      );
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div className="coder-container">
      

      <div className="coder-elements">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="js">JavaScript</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="py">Python</option>
        </select>
        <textarea
          rows="18"
          cols="100"
          placeholder="Write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <textarea
          rows="5"
          placeholder="Standard Input (stdin)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleCompile}>Compile & Run</button>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default Coder;
