const codeEditor = document.getElementById("codeEditor");
const output = document.getElementById("output");
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");

codeEditor.value = `print("Welcome to Python online compiler replica!")

name = "Mohit"
age = 25
print(f"Hello, {name} and my age is {age}")`;

let pyodide = null;

function setOutput(text) {
  output.textContent = text;
}

function appendOutput(text) {
  output.textContent += text;
}

async function loadPyodideRuntime() {
  if (pyodide) {
    return pyodide;
  }

  setOutput("Loading Python runtime...");
  runBtn.disabled = true;

  pyodide = await window.loadPyodide({
    stdout: (line) => appendOutput(`${line}\n`),
    stderr: (line) => appendOutput(`${line}\n`),
  });

  runBtn.disabled = false;
  setOutput("Python runtime ready. Click Run.");
  return pyodide;
}

async function runCode() {
  try {
    runBtn.disabled = true;
    setOutput("");

    const runtime = await loadPyodideRuntime();
    const userCode = codeEditor.value;

    await runtime.runPythonAsync(userCode);
    if (output.textContent.trim() === "") {
      setOutput("(No output)");
    }
  } catch (error) {
    appendOutput(`\nError: ${error.message}`);
  } finally {
    runBtn.disabled = false;
  }
}

runBtn.addEventListener("click", runCode);
clearBtn.addEventListener("click", () => setOutput(""));

//localhost:8001 in your browser to see the online Python compiler replica in action.