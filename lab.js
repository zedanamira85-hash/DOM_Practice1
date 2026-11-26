const byId = (id) => document.getElementById(id);
const storageKey = "dom-lab-completed-v1";
const completed = new Set();

try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (Array.isArray(saved)) {
    lessons.forEach(({ id }) => {
      if (saved.includes(id)) completed.add(id);
    });
  }
} catch {
  // Progress can still be tracked for this visit.
}

let currentIndex = 0;

function renderProgress() {
  byId("progress").value = completed.size;
  byId("progress-label").textContent = `${completed.size} of ${lessons.length} completed`;
  const lessonDone = completed.has(lessons[currentIndex].id);
  byId("complete").textContent = lessonDone ? "Completed" : "Mark complete";
  byId("complete").setAttribute("aria-pressed", lessonDone);
  document.querySelectorAll("#navigation a").forEach((link, index) => {
    const done = completed.has(lessons[index].id);
    link.firstElementChild.textContent = done ? "✓" : index + 1;
    link.firstElementChild.classList.toggle("done", done);
    link.setAttribute("aria-label", `Challenge ${index + 1}: ${lessons[index].title}${done ? ", completed" : ""}`);
  });
}

function renderDemo() {
  const stage = byId("stage");

  if (currentIndex === 0) {
    stage.innerHTML = `
      <button type="button" class="Menu" aria-expanded="false" aria-controls="demo-menu">clickMe</button>
      <ul class="navMenu" id="demo-menu" hidden><li>Home</li><li>Contacts</li><li>Profile</li></ul>`;
    const button = stage.querySelector("button");
    const list = stage.querySelector("ul");
    button.addEventListener("click", () => {
      const isOpen = list.classList.toggle("active");
      list.hidden = !isOpen;
      button.textContent = isOpen ? "Clicked" : "clickMe";
      button.setAttribute("aria-expanded", isOpen);
    });
    return;
  }

  stage.innerHTML = `
    <p><strong>What does CSS stand for?</strong></p>
    <button type="button" class="hintBtn" aria-expanded="false" aria-controls="demo-hint">View Hint</button>
    <p class="hintText" id="demo-hint" hidden>The first word is Cascading.</p>
    <p class="hintCounter" role="status" hidden>Hint opened 0 times</p>
    <button type="button" class="plain resetBtn" hidden>Reset</button>`;

  const colorEnabled = currentIndex >= 2;
  const resetEnabled = currentIndex >= 3;
  const counterEnabled = currentIndex >= 4;
  const rotationEnabled = currentIndex === 5;
  const button = stage.querySelector(".hintBtn");
  const hint = stage.querySelector(".hintText");
  const reset = stage.querySelector(".resetBtn");
  const counter = stage.querySelector(".hintCounter");
  const clues = ["The first word is Cascading.", "The second word is Style.", "The last word is Sheets."];
  let count = 0;

  reset.hidden = !resetEnabled;
  counter.hidden = !counterEnabled;

  function updateButton(isOpen) {
    hint.hidden = !isOpen;
    button.textContent = isOpen ? "Hide Hint" : "View Hint";
    button.classList.toggle("show", colorEnabled && isOpen);
    button.setAttribute("aria-expanded", isOpen);
  }

  button.addEventListener("click", () => {
    const isOpen = hint.classList.toggle("display");
    if (isOpen && counterEnabled) {
      count += 1;
      counter.textContent = `Hint opened ${count} times`;
      if (rotationEnabled) hint.textContent = clues[(count - 1) % clues.length];
    }
    updateButton(isOpen);
  });

  reset.addEventListener("click", () => {
    hint.classList.remove("display");
    updateButton(false);
    count = 0;
    counter.textContent = "Hint opened 0 times";
  });
}

function renderHints(hints) {
  byId("hints").replaceChildren(...hints.map(([title, text], index) => {
    const detail = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = `${index + 1}. ${title}`;
    const body = document.createElement("p");
    body.textContent = text;
    detail.append(summary, body);
    return detail;
  }));
}

function renderQuiz([question, options, correct, explanation]) {
  const form = byId("quiz");
  const feedback = byId("feedback");
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = question;
  fieldset.append(legend);
  options.forEach((option, index) => {
    const label = document.createElement("label");
    const choice = document.createElement("input");
    choice.type = "radio";
    choice.name = "choice";
    choice.value = index;
    choice.required = true;
    label.append(choice, document.createTextNode(option));
    fieldset.append(label);
  });
  const submit = document.createElement("button");
  submit.textContent = "Check answer";
  form.replaceChildren(fieldset, submit);
  feedback.textContent = "";
  form.onchange = () => { feedback.textContent = ""; };
  form.onsubmit = (event) => {
    event.preventDefault();
    const choice = new FormData(form).get("choice");
    feedback.textContent = choice === String(correct)
      ? `Correct. ${explanation}`
      : "Try again. Reopen the hints to review the idea.";
  };
}

function appendCode(container, blocks) {
  blocks.forEach(([label, source]) => {
    const description = document.createElement("p");
    description.textContent = label;
    description.className = "code-label";
    const pre = document.createElement("pre");
    pre.tabIndex = 0;
    pre.setAttribute("aria-label", label);
    const code = document.createElement("code");
    code.textContent = source;
    pre.append(code);
    container.append(description, pre);
  });
}

function renderLesson() {
  const index = lessons.findIndex(({ id }) => location.hash === `#${id}`);
  currentIndex = Math.max(0, index);
  const lesson = lessons[currentIndex];
  byId("lesson-number").textContent = `Challenge ${currentIndex + 1} of ${lessons.length}`;
  byId("title").textContent = lesson.title;
  byId("goal").textContent = lesson.goal;
  byId("expectation").textContent = lesson.test;
  renderHints(lesson.hints);
  renderQuiz(lesson.quiz);
  renderDemo();

  const solution = byId("solution");
  byId("answer").open = false;
  solution.replaceChildren();
  appendCode(solution, lesson.solution);
  if (currentIndex === lessons.length - 1) {
    const full = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Show the complete three-file project";
    full.className = "full-project";
    full.append(summary);
    appendCode(full, finalProject);
    solution.append(full);
  }

  const next = byId("next");
  const nextLesson = lessons[currentIndex + 1];
  next.hidden = !nextLesson;
  if (nextLesson) {
    next.href = `#${nextLesson.id}`;
    next.textContent = "Next challenge";
  }
  document.querySelectorAll("#navigation a").forEach((link, index) => {
    if (index === currentIndex) link.setAttribute("aria-current", "step");
    else link.removeAttribute("aria-current");
  });
  renderProgress();
}

for (const { id, title } of lessons) {
  const link = document.createElement("a");
  const number = document.createElement("span");
  number.className = "number";
  number.setAttribute("aria-hidden", "true");
  link.href = `#${id}`;
  link.append(number, document.createTextNode(title));
  byId("navigation").append(link);
}

byId("restart").addEventListener("click", renderDemo);
byId("complete").addEventListener("click", () => {
  const { id } = lessons[currentIndex];
  if (completed.has(id)) completed.delete(id);
  else completed.add(id);
  try {
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
  } catch {
    // Storage may be unavailable in some browser sessions.
  }
  renderProgress();
});
window.addEventListener("hashchange", () => {
  if (!lessons.some(({ id }) => location.hash === `#${id}`)) return;
  renderLesson();
  byId("lesson").focus({ preventScroll: true });
  window.scrollTo(0, 0);
});
renderLesson();
