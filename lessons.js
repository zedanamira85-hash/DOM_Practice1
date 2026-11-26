const lessons = [
  {
    "id": "menu",
    "title": "Toggle a navigation menu",
    "goal": "Build a button that opens and closes a navigation menu. Change its label every time the menu switches state.",
    "hints": [
      [
        "Create the button and list",
        "In the body of index.html, create a button with class Menu and the label clickMe. Add a ul with class navMenu below it. Put Home, Contacts, and Profile in three li elements."
      ],
      [
        "Use a class to control visibility",
        "In app.css, hide .navMenu with display: none. Use .navMenu.active with display: block to show a menu that has both classes."
      ],
      [
        "Connect the click to the menu",
        "Select .Menu and .navMenu with document.querySelector(). Add a click listener to the button. Inside it, store the return value of navMenu.classList.toggle(\"active\") in isOpen."
      ],
      [
        "Update the button label",
        "toggle() returns true when it adds the class and false when it removes it. Use if…else to set the button’s textContent to Clicked when isOpen is true and clickMe otherwise."
      ]
    ],
    "test": "The menu starts hidden. Click once to show it, then again to hide it. Check the label after each click.",
    "quiz": [
      "What does toggle(\"active\") return when it adds the class?",
      [
        "true",
        "false",
        "The text \"active\""
      ],
      0,
      "toggle() returns whether the class is present after the change."
    ],
    "solution": [
      [
        "index.html · in the body",
        "<button type=\"button\" class=\"Menu\">clickMe</button>\n<ul class=\"navMenu\">\n    <li>Home</li>\n    <li>Contacts</li>\n    <li>Profile</li>\n</ul>"
      ],
      [
        "app.css",
        ".navMenu {\n    display: none;\n    list-style: none;\n    background-color: bisque;\n    padding: 10px;\n    width: 100px;\n}\n\n.navMenu.active {\n    display: block;\n}"
      ],
      [
        "app.js",
        "const hamburger = document.querySelector(\".Menu\");\nconst navMenu = document.querySelector(\".navMenu\");\n\nhamburger.addEventListener(\"click\", () => {\n    const isOpen = navMenu.classList.toggle(\"active\");\n    if (isOpen) {\n        hamburger.textContent = \"Clicked\";\n    } else {\n        hamburger.textContent = \"clickMe\";\n    }\n});"
      ]
    ]
  },
  {
    "id": "hint",
    "title": "Reveal and hide a hint",
    "goal": "Add a question about CSS and a button that reveals a clue below it. The label should tell the user what the next click will do.",
    "hints": [
      [
        "Add a question, button, and clue",
        "Below the menu, add the question “What does CSS stand for?” Add a button with class hintBtn and the label View Hint. Add a paragraph with class hintText immediately after the button."
      ],
      [
        "Hide the clue and keep its position",
        "Set display: none on .hintText and display: block on .hintText.display. Keep the paragraph in normal page flow so it appears under its own button."
      ],
      [
        "Write a second click listener",
        "Select .hintBtn and .hintText. Inside the hint button’s listener, store hintText.classList.toggle(\"display\") in displayed."
      ],
      [
        "Choose the label with if…else",
        "Set textContent to Hide Hint when displayed is true. In the else block, set it to View Hint."
      ]
    ],
    "test": "Click View Hint to read the Cascading clue. Click Hide Hint to close it again.",
    "quiz": [
      "Which selector matches the hint only when both classes are present?",
      [
        ".hintText .display",
        ".hintText, .display",
        ".hintText.display"
      ],
      2,
      "Writing the classes together applies the rule to one element that has both classes."
    ],
    "solution": [
      [
        "index.html · add below the menu",
        "<h2>What does CSS stand for?</h2>\n<button type=\"button\" class=\"hintBtn\">View Hint</button>\n<p class=\"hintText\">The first word is Cascading.</p>"
      ],
      [
        "app.css · append",
        ".hintText {\n    display: none;\n    background-color: lightyellow;\n    padding: 8px;\n}\n\n.hintText.display {\n    display: block;\n}"
      ],
      [
        "app.js · append below the menu script",
        "const hintBtn = document.querySelector(\".hintBtn\");\nconst hintText = document.querySelector(\".hintText\");\n\nhintBtn.addEventListener(\"click\", () => {\n    const displayed = hintText.classList.toggle(\"display\");\n    if (displayed) {\n        hintBtn.textContent = \"Hide Hint\";\n    } else {\n        hintBtn.textContent = \"View Hint\";\n    }\n});"
      ]
    ]
  },
  {
    "id": "colors",
    "title": "Change the button colors",
    "goal": "Use the open state to change the hint button’s background and text colors, then restore its defaults when the hint closes.",
    "hints": [
      [
        "Choose the two sets of colors",
        "In app.css, give .hintBtn a light gray background and black text. Give .hintBtn.show a light green background and dark green text."
      ],
      [
        "Add or remove the show class",
        "Inside the existing if (displayed) block, add show to the button with classList.add(). Inside else, remove it with classList.remove()."
      ],
      [
        "Check the braces",
        "Put braces around each branch so the label and color change together. Without braces, else controls just the following statement. A remove() on the next line would run on every click."
      ],
      [
        "Try JavaScript styles",
        "For a second approach, replace the class operations with assignments to style.color and style.backgroundColor. Assign an empty string to both properties in the closed branch to restore the CSS defaults."
      ]
    ],
    "test": "Open the hint to see green, then close it to see gray. Watch both the background and the text.",
    "quiz": [
      "Which property sets a background color directly in JavaScript?",
      [
        "hintBtn.style.background-color",
        "hintBtn.style.backgroundColor",
        "hintBtn.backgroundColor"
      ],
      1,
      "JavaScript uses backgroundColor on the element’s style object."
    ],
    "solution": [
      [
        "app.css · append",
        ".hintBtn {\n    color: black;\n    background-color: lightgray;\n}\n\n.hintBtn.show {\n    color: darkgreen;\n    background-color: lightgreen;\n}"
      ],
      [
        "app.js · replace the hint code from challenge 2",
        "const hintBtn = document.querySelector(\".hintBtn\");\nconst hintText = document.querySelector(\".hintText\");\n\nhintBtn.addEventListener(\"click\", () => {\n    const displayed = hintText.classList.toggle(\"display\");\n    if (displayed) {\n        hintBtn.textContent = \"Hide Hint\";\n        hintBtn.classList.add(\"show\");\n    } else {\n        hintBtn.textContent = \"View Hint\";\n        hintBtn.classList.remove(\"show\");\n    }\n});"
      ],
      [
        "Optional · replace the add line in the open branch",
        "hintBtn.style.color = \"darkgreen\";\nhintBtn.style.backgroundColor = \"lightgreen\";"
      ],
      [
        "Optional · replace the remove line in the closed branch",
        "hintBtn.style.color = \"\";\nhintBtn.style.backgroundColor = \"\";"
      ]
    ]
  },
  {
    "id": "reset",
    "title": "Add a Reset button",
    "goal": "Restore the hint section to its starting state in one click, even if the hint is already hidden.",
    "hints": [
      [
        "Add the reset control",
        "Add a button with class resetBtn after the hint paragraph. Select it in JavaScript and attach its own click listener."
      ],
      [
        "Hide the hint directly",
        "Use hintText.classList.remove(\"display\") so the hint ends up hidden each time Reset is clicked."
      ],
      [
        "Restore the button",
        "Set its label to View Hint and remove show. If you tried the inline style version, also clear both style properties inside the reset listener. The remaining solutions use the class-based colors."
      ]
    ],
    "test": "Open the hint and click Reset. Click Reset again. The hint should stay hidden, and View Hint should still work.",
    "quiz": [
      "Which class operation guarantees that Reset hides the hint?",
      [
        "toggle(\"display\")",
        "add(\"display\")",
        "remove(\"display\")"
      ],
      2,
      "remove() leaves the class absent whether it started present or absent."
    ],
    "solution": [
      [
        "index.html · add after the hint paragraph",
        "<button type=\"button\" class=\"resetBtn\">Reset</button>"
      ],
      [
        "app.js · append below the hint code",
        "const resetBtn = document.querySelector(\".resetBtn\");\n\nresetBtn.addEventListener(\"click\", () => {\n    hintText.classList.remove(\"display\");\n    hintBtn.classList.remove(\"show\");\n    hintBtn.textContent = \"View Hint\";\n});"
      ]
    ]
  },
  {
    "id": "counter",
    "title": "Count hint openings",
    "goal": "Display how many times the hint has opened since the last reset. Closing the hint should leave the count alone.",
    "hints": [
      [
        "Add a place to display the number",
        "Add a paragraph with class hintCounter after the hint paragraph. Start it with Hint opened 0 times."
      ],
      [
        "Keep the count between clicks",
        "Select the paragraph and declare let openCount = 0 before the hint click listener. Both listeners need to access the same variable."
      ],
      [
        "Increment and redraw",
        "Inside if (displayed), use openCount += 1. Then set the counter’s textContent with a template literal. Backticks let ${openCount} insert the current number into the sentence."
      ],
      [
        "Reset the number and text",
        "At the end of the existing Reset listener, set openCount back to 0. Set the counter paragraph’s text back to Hint opened 0 times."
      ]
    ],
    "test": "Open, close, then reopen. The display should read 1, 1, and 2. Click Reset to return to 0.",
    "quiz": [
      "Where should let openCount = 0 go?",
      [
        "Inside the hint click listener",
        "Inside the Reset listener",
        "Before both click listeners"
      ],
      2,
      "Declaring it before the listeners lets them share one value across clicks."
    ],
    "solution": [
      [
        "index.html · add the counter paragraph",
        "<p class=\"hintCounter\">Hint opened 0 times</p>"
      ],
      [
        "app.js · add before the hint listener",
        "const hintCounter = document.querySelector(\".hintCounter\");\nlet openCount = 0;"
      ],
      [
        "app.js · add inside if (displayed)",
        "openCount += 1;\nhintCounter.textContent = `Hint opened ${openCount} times`;"
      ],
      [
        "app.js · add inside the Reset listener",
        "openCount = 0;\nhintCounter.textContent = \"Hint opened 0 times\";"
      ]
    ]
  },
  {
    "id": "rotate",
    "title": "Cycle through three hints",
    "goal": "Show Cascading, Style, and Sheets in order. The fourth opening returns to Cascading while the counter continues to increase.",
    "hints": [
      [
        "Create an array of clues",
        "Put three clue sentences in a hints array before the click listener. The first item has index 0, the second has index 1, and the third has index 2."
      ],
      [
        "Convert openings into an index",
        "After increasing openCount, subtract 1 to start at index 0. Use % hints.length to take the remainder after division by the number of hints. When openCount is 4, the calculation is (4 − 1) % 3, which is 0."
      ],
      [
        "Set the new hint text",
        "Use hints[hintIndex] to read the clue. Set hintText.textContent in the open branch and keep the existing counter update there."
      ],
      [
        "Reuse Reset",
        "Reset already returns openCount to 0 and hides the hint. The next open increases the count to 1, which selects the first item in the array."
      ]
    ],
    "test": "Open and close four times. Read Cascading, Style, Sheets, and Cascading. Reset, then open again to see Cascading with a count of 1.",
    "quiz": [
      "What is the array index on the fifth opening?",
      [
        "0",
        "1",
        "2"
      ],
      1,
      "(5 − 1) % 3 is 1, so the fifth opening shows Style."
    ],
    "solution": [
      [
        "app.js · add before the hint listener",
        "const hints = [\n    \"The first word is Cascading.\",\n    \"The second word is Style.\",\n    \"The last word is Sheets.\"\n];"
      ],
      [
        "app.js · replace the two counter lines inside if (displayed)",
        "openCount += 1;\nconst hintIndex = (openCount - 1) % hints.length;\nhintText.textContent = hints[hintIndex];\nhintCounter.textContent = `Hint opened ${openCount} times`;"
      ]
    ]
  }
];

const finalProject = [
  [
    "index.html",
    "<!doctype html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>DOM Practice Solution</title>\n    <link rel=\"stylesheet\" href=\"app.css\">\n</head>\n<body>\n    <button type=\"button\" class=\"Menu\">clickMe</button>\n    <ul class=\"navMenu\">\n        <li>Home</li>\n        <li>Contacts</li>\n        <li>Profile</li>\n    </ul>\n    \n    <h2>What does CSS stand for?</h2>\n    <button type=\"button\" class=\"hintBtn\">View Hint</button>\n    <p class=\"hintText\">The first word is Cascading.</p>\n    <p class=\"hintCounter\">Hint opened 0 times</p>\n    <button type=\"button\" class=\"resetBtn\">Reset</button>\n    <script src=\"app.js\"></script>\n</body>\n</html>\n"
  ],
  [
    "app.css",
    ".navMenu {\n    display: none;\n    list-style: none;\n    background-color: bisque;\n    padding: 10px;\n    width: 100px;\n}\n\n.navMenu.active {\n    display: block;\n}\n\n.hintText {\n    display: none;\n    background-color: lightyellow;\n    padding: 8px;\n}\n\n.hintText.display {\n    display: block;\n}\n\n.hintBtn {\n    color: black;\n    background-color: lightgray;\n}\n\n.hintBtn.show {\n    color: darkgreen;\n    background-color: lightgreen;\n}\n"
  ],
  [
    "app.js",
    "const hamburger = document.querySelector(\".Menu\");\nconst navMenu = document.querySelector(\".navMenu\");\n\nhamburger.addEventListener(\"click\", () => {\n    const isOpen = navMenu.classList.toggle(\"active\");\n    if (isOpen) {\n        hamburger.textContent = \"Clicked\";\n    } else {\n        hamburger.textContent = \"clickMe\";\n    }\n});\n\nconst hintBtn = document.querySelector(\".hintBtn\");\nconst hintText = document.querySelector(\".hintText\");\n\nconst hintCounter = document.querySelector(\".hintCounter\");\nlet openCount = 0;\n\nconst hints = [\n    \"The first word is Cascading.\",\n    \"The second word is Style.\",\n    \"The last word is Sheets.\"\n];\n\nhintBtn.addEventListener(\"click\", () => {\n    const displayed = hintText.classList.toggle(\"display\");\n    if (displayed) {\n        hintBtn.textContent = \"Hide Hint\";\n        hintBtn.classList.add(\"show\");\n        openCount += 1;\n        const hintIndex = (openCount - 1) % hints.length;\n        hintText.textContent = hints[hintIndex];\n        hintCounter.textContent = `Hint opened ${openCount} times`;\n    } else {\n        hintBtn.textContent = \"View Hint\";\n        hintBtn.classList.remove(\"show\");\n    }\n});\n\nconst resetBtn = document.querySelector(\".resetBtn\");\n\nresetBtn.addEventListener(\"click\", () => {\n    hintText.classList.remove(\"display\");\n    hintBtn.classList.remove(\"show\");\n    hintBtn.textContent = \"View Hint\";\n    openCount = 0;\n    hintCounter.textContent = \"Hint opened 0 times\";\n});\n"
  ]
];

const practiceFiles = [
  [
    "<button type=\"button\" class=\"Menu\">clickMe</button>\n<ul class=\"navMenu\">\n    <li>Home</li>\n    <li>Contacts</li>\n    <li>Profile</li>\n</ul>",
    ".navMenu {\n    display: none;\n    list-style: none;\n    background-color: bisque;\n    padding: 10px;\n    width: 100px;\n}\n\n.navMenu.active {\n    display: block;\n}",
    "const hamburger = document.querySelector(\".Menu\");\nconst navMenu = document.querySelector(\".navMenu\");\n\n// Add the menu click listener here.\n"
  ],
  [
    "<h2>What does CSS stand for?</h2>\n<button type=\"button\" class=\"hintBtn\">View Hint</button>\n<p class=\"hintText\">The first word is Cascading.</p>",
    ".hintText {\n    display: none;\n    background-color: lightyellow;\n    padding: 8px;\n}\n\n.hintText.display {\n    display: block;\n}",
    "const hintBtn = document.querySelector(\".hintBtn\");\nconst hintText = document.querySelector(\".hintText\");\n\n// Add the hint click listener here.\n"
  ],
  [
    "<h2>What does CSS stand for?</h2>\n<button type=\"button\" class=\"hintBtn\">View Hint</button>\n<p class=\"hintText\">The first word is Cascading.</p>",
    ".hintText {\n    display: none;\n    background-color: lightyellow;\n    padding: 8px;\n}\n\n.hintText.display {\n    display: block;\n}\n.hintBtn {\n    color: black;\n    background-color: lightgray;\n}\n\n.hintBtn.show {\n    color: darkgreen;\n    background-color: lightgreen;\n}",
    "const hintBtn = document.querySelector(\".hintBtn\");\nconst hintText = document.querySelector(\".hintText\");\n\nhintBtn.addEventListener(\"click\", () => {\n    const displayed = hintText.classList.toggle(\"display\");\n    if (displayed) {\n        hintBtn.textContent = \"Hide Hint\";\n        // Set the open colors here.\n    } else {\n        hintBtn.textContent = \"View Hint\";\n        // Restore the default colors here.\n    }\n});"
  ],
  [
    "<h2>What does CSS stand for?</h2>\n<button type=\"button\" class=\"hintBtn\">View Hint</button>\n<p class=\"hintText\">The first word is Cascading.</p>\n<button type=\"button\" class=\"resetBtn\">Reset</button>",
    ".hintText {\n    display: none;\n    background-color: lightyellow;\n    padding: 8px;\n}\n\n.hintText.display {\n    display: block;\n}\n.hintBtn {\n    color: black;\n    background-color: lightgray;\n}\n\n.hintBtn.show {\n    color: darkgreen;\n    background-color: lightgreen;\n}",
    "const hintBtn = document.querySelector(\".hintBtn\");\nconst hintText = document.querySelector(\".hintText\");\n\nhintBtn.addEventListener(\"click\", () => {\n    const displayed = hintText.classList.toggle(\"display\");\n    if (displayed) {\n        hintBtn.textContent = \"Hide Hint\";\n        hintBtn.classList.add(\"show\");\n    } else {\n        hintBtn.textContent = \"View Hint\";\n        hintBtn.classList.remove(\"show\");\n    }\n});\n\n// Select the Reset button and add its click listener.\n"
  ],
  [
    "<h2>What does CSS stand for?</h2>\n<button type=\"button\" class=\"hintBtn\">View Hint</button>\n<p class=\"hintText\">The first word is Cascading.</p>\n<p class=\"hintCounter\">Hint opened 0 times</p>\n<button type=\"button\" class=\"resetBtn\">Reset</button>",
    ".hintText {\n    display: none;\n    background-color: lightyellow;\n    padding: 8px;\n}\n\n.hintText.display {\n    display: block;\n}\n.hintBtn {\n    color: black;\n    background-color: lightgray;\n}\n\n.hintBtn.show {\n    color: darkgreen;\n    background-color: lightgreen;\n}",
    "const hintBtn = document.querySelector(\".hintBtn\");\nconst hintText = document.querySelector(\".hintText\");\n\n// Declare the counter here.\n\nhintBtn.addEventListener(\"click\", () => {\n    const displayed = hintText.classList.toggle(\"display\");\n    if (displayed) {\n        hintBtn.textContent = \"Hide Hint\";\n        hintBtn.classList.add(\"show\");\n        // Increase the count and update its text here.\n    } else {\n        hintBtn.textContent = \"View Hint\";\n        hintBtn.classList.remove(\"show\");\n    }\n});\n\nconst resetBtn = document.querySelector(\".resetBtn\");\n\nresetBtn.addEventListener(\"click\", () => {\n    hintText.classList.remove(\"display\");\n    hintBtn.classList.remove(\"show\");\n    hintBtn.textContent = \"View Hint\";\n    // Reset the count and its text here.\n});"
  ],
  [
    "<h2>What does CSS stand for?</h2>\n<button type=\"button\" class=\"hintBtn\">View Hint</button>\n<p class=\"hintText\">The first word is Cascading.</p>\n<p class=\"hintCounter\">Hint opened 0 times</p>\n<button type=\"button\" class=\"resetBtn\">Reset</button>",
    ".hintText {\n    display: none;\n    background-color: lightyellow;\n    padding: 8px;\n}\n\n.hintText.display {\n    display: block;\n}\n.hintBtn {\n    color: black;\n    background-color: lightgray;\n}\n\n.hintBtn.show {\n    color: darkgreen;\n    background-color: lightgreen;\n}",
    "const hintBtn = document.querySelector(\".hintBtn\");\nconst hintText = document.querySelector(\".hintText\");\n\nconst hintCounter = document.querySelector(\".hintCounter\");\nlet openCount = 0;\n\n// Add the hints array here.\n\nhintBtn.addEventListener(\"click\", () => {\n    const displayed = hintText.classList.toggle(\"display\");\n    if (displayed) {\n        hintBtn.textContent = \"Hide Hint\";\n        hintBtn.classList.add(\"show\");\n        openCount += 1;\n        // Pick the next hint and update its text here.\n        hintCounter.textContent = `Hint opened ${openCount} times`;\n    } else {\n        hintBtn.textContent = \"View Hint\";\n        hintBtn.classList.remove(\"show\");\n    }\n});\n\nconst resetBtn = document.querySelector(\".resetBtn\");\n\nresetBtn.addEventListener(\"click\", () => {\n    hintText.classList.remove(\"display\");\n    hintBtn.classList.remove(\"show\");\n    hintBtn.textContent = \"View Hint\";\n    openCount = 0;\n    hintCounter.textContent = \"Hint opened 0 times\";\n});"
  ]
];
