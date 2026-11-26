// Exercise code runs only after a student submits it, in a frame with an opaque origin.
const editor = byId("editor");
const runButton = byId("run");
const codeFeedback = byId("code-feedback");
const drafts = new Map();
let practiceIndex = currentIndex;
let activeRun;

function finishRun(message = "") {
  clearTimeout(activeRun?.timeout);
  activeRun = undefined;
  byId("runner-bin").replaceChildren();
  runButton.disabled = false;
  codeFeedback.textContent = message;
}

function showPractice() {
  finishRun();
  practiceIndex = currentIndex;
  const [html, css, starter] = practiceFiles[currentIndex];
  editor.value = drafts.get(currentIndex) ?? starter;
  byId("provided").open = false;
  const source = byId("fixture-code");
  source.replaceChildren();
  appendCode(source, [["Practice HTML", html], ["Practice CSS", css]]);
}

function exerciseChecks(level) {
  const expect = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const select = (selector) => document.querySelector(selector);
  const hidden = (element) => getComputedStyle(element).display === "none";

  if (level === 0) {
    const button = select(".Menu");
    const menu = select(".navMenu");
    expect(hidden(menu), "The menu should start hidden.");
    button.click();
    expect(!hidden(menu) && button.textContent.trim() === "Clicked",
      "The first click should show the menu and change the button to Clicked.");
    button.click();
    expect(hidden(menu) && button.textContent.trim() === "clickMe",
      "The second click should hide the menu and restore clickMe.");
    return;
  }

  const button = select(".hintBtn");
  const hint = select(".hintText");
  const reset = select(".resetBtn");
  const counter = select(".hintCounter");
  const colors = () => {
    const style = getComputedStyle(button);
    return [style.color, style.backgroundColor].join("|");
  };
  const closedColors = colors();
  const countIs = (number) => new RegExp(`\\b${number}\\b`).test(counter.textContent);
  const opens = level === 5 ? ["Cascading", "Style", "Sheets", "Cascading"] : ["Cascading", "Cascading"];

  expect(hidden(hint), "The hint should start hidden.");
  for (const [index, word] of opens.entries()) {
    button.click();
    expect(!hidden(hint) && button.textContent.trim() === "Hide Hint",
      "Opening the hint should show the clue and change the label to Hide Hint.");
    expect(hint.textContent.includes(word), `Opening ${index + 1} should show ${word}.`);
    if (level >= 2) {
      expect(colors() === "rgb(0, 100, 0)|rgb(144, 238, 144)",
        "The open button should have dark green text and a light green background.");
    }
    if (level >= 4) expect(countIs(index + 1), "Each opening should increase the count by one.");
    button.click();
    expect(hidden(hint) && button.textContent.trim() === "View Hint",
      "Closing the hint should hide the clue and restore View Hint.");
    if (level >= 2) expect(colors() === closedColors, "Closing should restore both default colors.");
    if (level >= 4) expect(countIs(index + 1), "Closing should leave the count alone.");
  }

  if (level >= 3) {
    button.click();
    for (let press = 0; press < 2; press += 1) {
      reset.click();
      expect(hidden(hint) && button.textContent.trim() === "View Hint" && colors() === closedColors,
        "Reset should hide the hint and restore the original label and colors, even on a second click.");
      if (level >= 4) expect(countIs(0), "Reset should also display a count of zero.");
    }
    button.click();
    expect(!hidden(hint) && button.textContent.trim() === "Hide Hint",
      "View Hint should still open the hint after Reset.");
    if (level >= 4) expect(countIs(1), "The first opening after Reset should count as one.");
    if (level >= 5) expect(hint.textContent.includes("Cascading"), "The first opening after Reset should show Cascading.");
  }
}

window.addEventListener("message", ({ source, data }) => {
  if (!activeRun || source !== activeRun.frame.contentWindow || data?.key !== activeRun.key) return;
  finishRun(data.passed ? "Passed. Your code produced the expected behavior." : `Check your code. ${data.message}`);
});

byId("code-form").addEventListener("submit", (event) => {
  event.preventDefault();
  finishRun();
  codeFeedback.textContent = "Checking your code…";
  runButton.disabled = true;
  const [html, css] = practiceFiles[currentIndex];
  const frame = document.createElement("iframe");
  const key = String(Math.random());
  frame.title = "Isolated JavaScript exercise checker";
  frame.setAttribute("sandbox", "allow-scripts");
  const script = `
    const report = (passed, message) => parent.postMessage({key: ${JSON.stringify(key)}, passed, message}, "*");
    try {
      (new Function(${JSON.stringify(editor.value).replace(/</g, "\\u003c")}))();
      (${exerciseChecks.toString()})(${currentIndex});
      report(true);
    } catch (error) {
      report(false, String(error.message || error));
    }`;
  frame.srcdoc = `<!doctype html><meta charset="utf-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'">
    <style>${css}</style>${html}<script>${script}</script>`;
  activeRun = {
    frame,
    key,
    timeout: setTimeout(() => finishRun("The checker did not finish. Check your code and try again."), 3000)
  };
  byId("runner-bin").append(frame);
});

editor.addEventListener("input", () => {
  drafts.set(practiceIndex, editor.value);
  if (!activeRun) codeFeedback.textContent = "";
});

byId("restore").addEventListener("click", () => {
  drafts.delete(practiceIndex);
  showPractice();
  editor.focus();
});

window.addEventListener("hashchange", () => {
  if (practiceIndex !== currentIndex) showPractice();
});
showPractice();
