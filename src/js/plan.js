export const PLAN_TOPIC = "javascript";
export const PLAN_DAYS = 10;
export const READ_PER_DAY = 20;
export const QUIZ_SIZE = 20;
export const PASS_SCORE = 15;

const ITERATOR_GENERATOR_IDS = [
  "js-iterators",
  "js-symbol-iterator",
  "js-async-iterators",
  "js-generators",
  "js-generators-work",
  "js-regular-vs-async-generators",
  "js-iterator-vs-iterable",
  "js-yield",
  "js-generator-return",
  "js-generator-vs-normal",
];

const DAY_SIX_IDS = [
  "js-impure-function",
  "js-immutability",
  "js-idempotent",
  "js-pure-vs-idempotent",
  "js-function-composition",
  "js-recursion",
  "js-tail-recursion",
  "js-callback-vs-hof",
  "js-partial-application",
  "js-currying-vs-partial",
  "js-error-object",
  "js-error-types",
  "js-try-catch-finally",
  "js-throw-vs-return",
  "js-try-without-catch",
  "js-custom-error",
  "js-object-reference-modify",
  "js-pass-by-value",
  "js-missing-property",
  "js-json-types",
];

const DAY_SEVEN_IDS = [
  "js-this",
  "js-call",
  "js-apply",
  "js-bind",
  "js-strict-this",
  "js-arrow-callbacks",
  "js-classes",
  "js-constructor",
  "js-class-vs-constructor",
  "js-prototype",
  "js-prototype-chain",
  "js-classes-prototypes",
  "js-classes-are-prototypes",
  "js-inheritance",
  "js-extends",
  "js-super",
  "js-static-methods",
  "js-private-fields",
  "js-method-overriding",
  "js-multiple-inheritance",
];

const DAY_EIGHT_IDS = [
  "js-sync-vs-async",
  "js-callback-hell",
  "js-promises",
  "js-why-promises",
  "js-promise-states",
  "js-promise-chaining",
  "js-promise-methods",
  "js-promise-all",
  "js-promise-allsettled",
  "js-promise-race",
  "js-promise-any",
  "js-async-await",
  "js-forget-await",
  "js-await-not-blocking",
  "js-sequential-vs-parallel",
  "js-promises-resolve-together",
  "js-promise-throw",
  "js-async-error-handling",
  "js-async-error-handling-ways",
  "js-allsettled-failed-api",
];

const DAY_NINE_IDS = [
  "js-dom",
  "js-events",
  "js-event-listener",
  "js-remove-listeners",
  "js-event-delegation",
  "js-settimeout",
  "js-setinterval",
  "js-cleartimeout",
  "js-clearinterval",
  "js-request-animation-frame",
  "js-debounce",
  "js-throttle",
  "js-event-queue",
  "js-event-vs-microtask-queue",
  "js-queue-microtask",
  "js-event-loop",
  "js-microtasks-macrotasks",
  "js-mutation-observer",
  "js-abort-controller",
  "js-window-vs-document",
];

const DAY_TEN_IDS = [
  "js-v8",
  "js-v8-how",
  "js-heap",
  "js-stack-vs-heap",
  "js-garbage-collection",
  "js-memory-leak-causes",
  "js-identify-memory-leak",
  "js-identify-fix-memory-leak",
  "js-memory",
  "js-inline-caching",
  "js-jit",
  "js-tree-shaking",
  "js-babel",
  "js-why-babel",
  "js-transpilation",
  "js-polyfill",
  "js-minification",
  "js-minification-removes",
  "js-why-minification",
  "js-obfuscation",
];

const LATER_DAY_IDS = [DAY_SIX_IDS, DAY_SEVEN_IDS, DAY_EIGHT_IDS, DAY_NINE_IDS, DAY_TEN_IDS];

const DAY_ONE_IDS = [
  "js-what",
  "js-features",
  "js-es6",
  "js-variable",
  "js-declare-init-assign",
  "js-var-let-const",
  "js-types",
  "js-primitive-vs-non",
  "js-coercion",
  "js-eq",
  "js-truthy",
  "js-null",
  "js-undefined",
  "js-nan",
  "js-null-vs-undefined",
  "js-typeof",
  "js-typeof-null",
  "js-unary-operator",
  "js-double-bang",
  "js-explicit-implicit",
];

function readingOrder(questions) {
  const byId = new Map(questions.map((item) => [item.id, item]));
  const first = DAY_ONE_IDS.map((id) => byId.get(id)).filter(Boolean);
  const used = new Set(first.map((item) => item.id));
  const deferred = ITERATOR_GENERATOR_IDS.map((id) => byId.get(id)).filter(
    (item) => item && !used.has(item.id)
  );
  const deferredIds = new Set(deferred.map((item) => item.id));
  const rest = questions.filter((item) => !used.has(item.id) && !deferredIds.has(item.id));
  const insertAt = Math.min((4 - 1) * READ_PER_DAY - first.length, rest.length);
  return [...first, ...rest.slice(0, insertAt), ...deferred, ...rest.slice(insertAt)];
}

export function orderForPlan(questions) {
  const byId = new Map(questions.map((item) => [item.id, item]));
  const laterIds = LATER_DAY_IDS.flat();
  const held = new Set([...laterIds, ...ITERATOR_GENERATOR_IDS]);
  const rest = readingOrder(questions).filter((item) => !held.has(item.id));
  const dayFourStart = (4 - 1) * READ_PER_DAY;
  const iterators = ITERATOR_GENERATOR_IDS.map((id) => byId.get(id)).filter(Boolean);
  const later = laterIds.map((id) => byId.get(id)).filter(Boolean);
  return [
    ...rest.slice(0, dayFourStart),
    ...iterators,
    ...rest.slice(dayFourStart),
    ...later,
  ];
}

export function dayQuestions(questions, day) {
  const start = (day - 1) * READ_PER_DAY;
  return questions.slice(start, start + READ_PER_DAY);
}

export function isDayUnlocked(day, results) {
  if (day <= 1) return true;
  return Boolean(results?.[day - 1]?.passed);
}

export function answerChoice(html) {
  const text = String(html)
    .replace(/<pre[\s\S]*?<\/pre>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  const sentence = text.split(/(?<=[.!?])\s+/)[0] || text;
  if (!sentence) return "This question is explained in the notes.";
  if (sentence.length <= 220) return sentence;
  return `${sentence.slice(0, 217).trim()}…`;
}

const STOP_WORDS = new Set(
  "a an the of in to and or how do you does are between when why would can we for with from that this it be on by if not which who what is was were into about than then their there them your javascript function functions object objects code value values type types used using method methods data return returns called call difference work works keyword".split(
    " "
  )
);

const ALIASES = {
  variable: ["var", "let", "const", "declaration", "assignment", "hoisting", "scope", "binding"],
  var: ["variable", "let", "const", "hoisting", "scope"],
  let: ["variable", "var", "const", "scope", "tdz"],
  const: ["variable", "var", "let", "scope"],
  hoisting: ["variable", "var", "let", "const", "tdz"],
  scope: ["variable", "closure", "lexical", "hoisting"],
  closure: ["scope", "lexical"],
  promise: ["promises", "async", "await", "microtask", "then"],
  promises: ["promise", "async", "await", "microtask"],
  async: ["await", "promise", "promises"],
  await: ["async", "promise", "promises"],
  prototype: ["inheritance", "class", "extends", "constructor"],
  class: ["classes", "extends", "super", "constructor", "prototype", "inheritance"],
  classes: ["class", "extends", "super", "prototype"],
  generator: ["generators", "yield", "iterator", "iterable"],
  generators: ["generator", "yield", "iterator", "iterable"],
  iterator: ["iterable", "iterators", "generator", "generators", "yield"],
  iterators: ["iterator", "iterable", "generator", "yield"],
  iterable: ["iterator", "generator", "yield"],
  yield: ["generator", "generators", "iterator"],
  array: ["arrays", "map", "filter", "reduce", "slice", "splice"],
  arrays: ["array", "map", "filter", "reduce"],
  string: ["strings", "template"],
  event: ["events", "listener", "delegation", "click"],
  this: ["bind", "call", "apply", "arrow"],
};

function topicWords(value) {
  const words = String(value)
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
  const expanded = new Set(words);
  for (const word of words) {
    const aliases = Object.hasOwn(ALIASES, word) ? ALIASES[word] : [];
    for (const alias of aliases) expanded.add(alias);
  }
  return expanded;
}

function relatedness(current, other) {
  if (current.id === other.id) return -1;
  const currentWords = topicWords(current.q);
  const otherWords = topicWords(other.q);
  let shared = 0;
  for (const word of currentWords) {
    if (otherWords.has(word)) shared += 1;
  }
  return shared;
}

export const QUIZ_BANK_VERSION = 38;

const DAY_QUIZ_ORDER = {
  1: [
    "js-what",
    "js-features",
    "js-quiz-async-feature",
    "js-es6",
    "js-quiz-es6-feature",
    "js-variable",
    "js-quiz-declare-keywords",
    "js-quiz-init",
    "js-quiz-assign",
    "js-quiz-var-scope",
    "js-quiz-let-const",
    "js-quiz-primitives",
    "js-quiz-non-primitive",
    "js-quiz-coercion",
    "js-quiz-truthy",
    "js-quiz-falsy",
    "js-quiz-null",
    "js-quiz-undefined",
    "js-quiz-nan",
    "js-quiz-null-undefined",
    "js-quiz-typeof",
    "js-quiz-typeof-null",
    "js-quiz-typeof-null-statement",
    "js-quiz-unary",
    "js-quiz-unary-example",
    "js-quiz-double-bang",
    "js-quiz-double-bang-zero",
    "js-quiz-describes",
    "js-declare-init-assign",
    "js-var-let-const",
    "js-quiz-primitive-diff",
    "js-quiz-hello-truthy",
  ],
  2: [
    "js-quiz-default-param",
    "js-quiz-symbol",
    "js-quiz-nullish-output",
    "js-quiz-logical-or",
    "js-quiz-execution-model",
    "js-quiz-what-function",
    "js-quiz-filter-map",
    "js-quiz-first-class",
    "js-quiz-first-order",
    "js-quiz-higher-order",
    "js-quiz-unary",
    "js-quiz-currying",
    "js-quiz-pure",
    "js-quiz-arrow-this",
    "js-quiz-anonymous",
    "js-quiz-callback-output",
    "js-quiz-iife",
    "js-quiz-destructure",
    "js-quiz-scope",
    "js-quiz-curry-double",
  ],
  3: [
    "js-quiz-block-scope",
    "js-quiz-lexical-print",
    "js-quiz-execution-context",
    "js-quiz-call-stack-print",
    "js-quiz-tdz",
    "js-quiz-closure-count",
    "js-quiz-closure-why",
    "js-quiz-memoization",
    "js-quiz-spread",
    "js-quiz-shallow-deep",
    "js-quiz-object-keys",
    "js-quiz-object-assign",
    "js-quiz-keys-values-entries",
    "js-quiz-spread-overwrite",
    "js-quiz-rest-length",
    "js-quiz-spread-copy",
    "js-quiz-deep-copy",
    "js-quiz-define-properties",
    "js-quiz-freeze",
    "js-quiz-has-own",
  ],
  4: [
    "js-quiz-iterator",
    "js-quiz-symbol-iterator",
    "js-quiz-async-iterator",
    "js-quiz-generator-keyword",
    "js-quiz-generator-called",
    "js-quiz-regular-vs-async",
    "js-quiz-iterable-iterator",
    "js-quiz-yield-pause",
    "js-quiz-generator-returns",
    "js-quiz-generator-vs-normal",
    "js-quiz-shadow-output",
    "js-quiz-illegal-shadow",
    "js-quiz-computed-key",
    "js-quiz-delete-age",
    "js-quiz-double-bang-output",
    "js-quiz-isnan-output",
    "js-quiz-isnan-diff",
    "js-quiz-isfinite-output",
    "js-quiz-isfinite-diff",
    "js-quiz-parseint-number",
  ],
  5: [
    "js-parsefloat-vs-number",
    "js-local-storage",
    "js-session-storage",
    "js-cookie",
    "js-storage-difference",
    "js-global-this",
    "js-async-thunk",
    "js-strict-mode",
    "js-undeclared-vs-undefined",
    "js-strict-mode-changes",
    "js-minification-vs-obfuscation",
    "js-obfuscation-vs-encryption",
    "js-localstorage-json",
    "js-json",
    "js-thunk",
    "js-array-mutate",
    "js-modules",
    "js-map",
    "js-string-immutable",
    "js-set",
  ],
  6: [
    "js-impure-function",
    "js-immutability",
    "js-idempotent",
    "js-pure-vs-idempotent",
    "js-function-composition",
    "js-recursion",
    "js-tail-recursion",
    "js-callback-vs-hof",
    "js-partial-application",
    "js-currying-vs-partial",
    "js-error-object",
    "js-error-types",
    "js-try-catch-finally",
    "js-throw-vs-return",
    "js-try-without-catch",
    "js-custom-error",
    "js-object-reference-modify",
    "js-pass-by-value",
    "js-missing-property",
    "js-json-types",
  ],
  7: [
    "js-this",
    "js-call",
    "js-apply",
    "js-bind",
    "js-strict-this",
    "js-arrow-callbacks",
    "js-classes",
    "js-constructor",
    "js-class-vs-constructor",
    "js-prototype",
    "js-prototype-chain",
    "js-classes-are-prototypes",
    "js-classes-prototypes",
    "js-inheritance",
    "js-extends",
    "js-super",
    "js-static-methods",
    "js-private-fields",
    "js-method-overriding",
    "js-multiple-inheritance",
  ],
  8: [
    "js-sync-vs-async",
    "js-callback-hell",
    "js-promises",
    "js-why-promises",
    "js-promise-states",
    "js-promise-chaining",
    "js-promise-methods",
    "js-promise-allsettled",
    "js-promise-all",
    "js-promise-any",
    "js-async-await",
    "js-promise-race",
    "js-forget-await",
    "js-sequential-vs-parallel",
    "js-promises-resolve-together",
    "js-promise-throw",
    "js-async-error-handling",
    "js-async-error-handling-ways",
    "js-allsettled-failed-api",
    "js-await-not-blocking",
  ],
  9: [
    "js-dom",
    "js-events",
    "js-event-listener",
    "js-remove-listeners",
    "js-event-delegation",
    "js-settimeout",
    "js-setinterval",
    "js-cleartimeout",
    "js-clearinterval",
    "js-request-animation-frame",
    "js-debounce",
    "js-throttle",
    "js-event-queue",
    "js-event-vs-microtask-queue",
    "js-queue-microtask",
    "js-event-loop",
    "js-microtasks-macrotasks",
    "js-mutation-observer",
    "js-abort-controller",
    "js-window-vs-document",
  ],
};

const QUIZ_BANK = {
  "js-what": {
    q: "What is JavaScript?",
    options: [
      "A dynamically typed, single-threaded programming language used to build interactive and dynamic applications.",
      "A statically typed language used mainly for database management.",
      "A markup language used to structure web pages.",
      "A styling language used to design web pages.",
    ],
    correct: 0,
  },
  "js-features": {
    q: "What are the features of JavaScript?",
    options: [
      "Dynamically typed, single-threaded, object-based, event-driven, and supports asynchronous programming.",
      "Statically typed, multi-threaded, and designed only for system programming.",
      "Markup-based, statically typed, and used only for styling web pages.",
      "Database-oriented, compiled-only, and unable to handle asynchronous operations.",
    ],
    correct: 0,
  },
  "js-es6": {
    q: "What are the major features introduced in ES6?",
    options: [
      "let, const, arrow functions, classes, template literals, destructuring, modules, Promises, and default parameters.",
      "Only var, function declarations, and traditional loops.",
      "HTML elements, CSS selectors, and browser rendering APIs.",
      "Database queries, server configuration, and operating system APIs.",
    ],
    correct: 0,
  },
  "js-variable": {
    q: "What is a variable in JavaScript?",
    options: [
      "A named storage location used to hold a value that can be accessed and, depending on the declaration, reassigned.",
      "A function that automatically executes when a program starts.",
      "A keyword used only to define objects and classes.",
      "A special data type used to store only numbers.",
    ],
    correct: 0,
  },
  "js-parsefloat-vs-number": {
    q: "What is the difference between parseFloat() and Number()?",
    options: [
      "parseFloat() converts only whole numbers, while Number() converts decimal numbers.",
      "parseFloat() reads a number from the start of a string and stops when it encounters an invalid character, while Number() tries to convert the entire string into a number.",
      "Both always return the same result.",
      "Number() works only with strings, while parseFloat() works only with numbers.",
    ],
    correct: 1,
  },
  "js-local-storage": {
    q: "What is localStorage in JavaScript?",
    options: [
      "It stores data only until the browser tab is closed.",
      "It stores data on the server.",
      "It stores data in the browser that persists even after the browser is closed.",
      "It stores data only for a single HTTP request.",
    ],
    correct: 2,
  },
  "js-session-storage": {
    q: "What is sessionStorage?",
    options: [
      "It stores data permanently across all browser sessions.",
      "It stores data for a page's browsing session, usually until that tab or window is closed.",
      "It stores data in a database on the server.",
      "It stores data that is automatically sent with every HTTP request.",
    ],
    correct: 1,
  },
  "js-cookie": {
    q: "What is a Cookie in web development?",
    options: [
      "A JavaScript function used to convert strings into numbers.",
      "A type of database stored only on a remote server.",
      "A browser storage mechanism whose data can be sent to the server with matching HTTP requests.",
      "A storage method that always deletes data when the tab closes.",
    ],
    correct: 2,
  },
  "js-storage-difference": {
    q: "What is the main difference between localStorage, sessionStorage, and Cookies?",
    options: [
      "All three store data in exactly the same way and have the same lifetime.",
      "localStorage persists across sessions, sessionStorage is scoped to a page session, and Cookies can be sent with HTTP requests.",
      "Cookies are never sent to a server, but localStorage is automatically sent.",
      "sessionStorage persists permanently, while localStorage is deleted when the tab closes.",
    ],
    correct: 1,
  },
  "js-global-this": {
    q: "What is `globalThis` in JavaScript?",
    options: [
      "A variable that can only be accessed inside a function.",
      "A standard way to access the global object across different JavaScript environments.",
      "A method used to declare global variables.",
      "An object available only in web browsers.",
    ],
    correct: 1,
  },
  "js-async-thunk": {
    q: "What is an Asynchronous Thunk?",
    options: [
      "A function that immediately executes every asynchronous operation when defined.",
      "A function that returns another function, allowing an operation to be performed later when the returned function is called.",
      "A JavaScript keyword used to pause a loop.",
      "A function that converts asynchronous code into synchronous code.",
    ],
    correct: 1,
  },
  "js-strict-mode": {
    q: "What is Strict Mode in JavaScript?",
    options: [
      "A mode that makes JavaScript code execute faster.",
      "A mode that disables all asynchronous operations.",
      "A mode that enables stricter parsing and error checking, helping catch certain coding mistakes.",
      "A mode that prevents the use of functions.",
    ],
    correct: 2,
  },
  "js-undeclared-vs-undefined": {
    q: "What is the difference between an undeclared and an undefined variable?",
    options: [
      "They mean exactly the same thing in every situation.",
      "An undeclared variable has not been declared in the accessible scope, while an undefined variable may be declared but have the value `undefined`.",
      "An undeclared variable always has the value `null`.",
      "An undefined variable cannot be declared using `let` or `const`.",
    ],
    correct: 1,
  },
  "js-strict-mode-changes": {
    q: "What changes when Strict Mode is enabled?",
    options: [
      "Assigning to an undeclared variable silently creates a global variable.",
      "Duplicate parameter names are always allowed in ordinary functions.",
      "Some silent errors become exceptions, and certain unsafe or confusing language features are restricted.",
      "All variables automatically become constants.",
    ],
    correct: 2,
  },
  "js-minification-vs-obfuscation": {
    q: "What is the difference between Minification and Obfuscation?",
    options: [
      "Minification encrypts code, while obfuscation converts it into JSON.",
      "Minification reduces code size by removing unnecessary characters, while obfuscation makes code harder to understand.",
      "Minification makes code harder to understand, while obfuscation only reduces file size.",
      "Both techniques perform exactly the same task.",
    ],
    correct: 1,
  },
  "js-obfuscation-vs-encryption": {
    q: "What is the difference between Obfuscation and Encryption?",
    options: [
      "Obfuscation makes code harder to understand, while encryption transforms data using a key and requires decryption to recover the original.",
      "Obfuscation always requires a secret key, while encryption does not.",
      "Both are security techniques that make the original code impossible to recover.",
      "Encryption only reduces code size, while obfuscation compresses files.",
    ],
    correct: 0,
  },
  "js-localstorage-json": {
    q: "How would you store an array or object in localStorage?",
    options: [
      "Call `localStorage.setItem('data', object)` directly and retrieve it as an object.",
      "Use `JSON.parse()` to store it and `JSON.stringify()` to retrieve it.",
      "Use `JSON.stringify()` before storing and `JSON.parse()` after retrieving.",
      "localStorage automatically stores arrays and objects in their original formats.",
    ],
    correct: 2,
  },
  "js-json": {
    q: "What are JSON, JSON.stringify(), and JSON.parse()?",
    options: [
      "JSON is a JavaScript loop, stringify converts JSON into an object, and parse converts objects into strings.",
      "JSON is a data format, JSON.stringify() converts a JavaScript value into a JSON string, and JSON.parse() converts valid JSON text into a JavaScript value.",
      "JSON is a database, stringify encrypts data, and parse decrypts it.",
      "JSON.stringify() and JSON.parse() both convert values into strings.",
    ],
    correct: 1,
  },
  "js-thunk": {
    q: "What is a Thunk Function?",
    options: [
      "A function that can only run once.",
      "A function that always executes immediately when defined.",
      "A function that wraps an operation or computation so it can be executed later when called.",
      "A function used exclusively to encrypt data.",
    ],
    correct: 2,
  },
  "js-array-mutate": {
    q: "Which statement about JavaScript array methods is correct?",
    options: [
      "`map()` and `filter()` mutate the original array.",
      "`push()` and `splice()` never mutate the original array.",
      "`sort()` and `reverse()` mutate the original array, while `map()` and `filter()` return new arrays.",
      "All JavaScript array methods mutate the original array.",
    ],
    correct: 2,
  },
  "js-modules": {
    q: "How do ES Modules differ from CommonJS?",
    options: [
      "ES Modules use `import` and `export`, while CommonJS commonly uses `require()` and `module.exports`.",
      "ES Modules use `require()`, while CommonJS uses `import` and `export` exclusively.",
      "Both use exactly the same syntax and loading behavior.",
      "CommonJS is only supported in browsers, while ES Modules are only supported in Node.js.",
    ],
    correct: 0,
  },
  "js-map": {
    q: "What is `Map` in JavaScript?",
    options: [
      "A method that sorts arrays alphabetically.",
      "A collection of unique values without keys.",
      "An object that stores only string keys and numeric values.",
      "A collection of key-value pairs where keys can be values of any type.",
    ],
    correct: 3,
  },
  "js-string-immutable": {
    q: "Are strings mutable or immutable in JavaScript?",
    options: [
      "Strings are mutable, so individual characters can be changed directly.",
      "Strings are immutable, so their characters cannot be changed in place; operations produce new strings.",
      "Strings become immutable only when declared with `const`.",
      "Strings are mutable only inside functions.",
    ],
    correct: 1,
  },
  "js-set": {
    q: "What is `Set` in JavaScript?",
    options: [
      "A collection that automatically stores duplicate values.",
      "A key-value collection where every key must be a string.",
      "A collection of unique values, which does not store duplicates.",
      "An array method that removes every value from an array.",
    ],
    correct: 2,
  },
  "js-impure-function": {
    q: "What is an Impure Function?",
    options: [
      "A function that always returns `undefined`.",
      "A function that has side effects or produces different results for the same input because it depends on changing external state.",
      "A function that never accepts parameters.",
      "A function that always returns the same output for the same input.",
    ],
    correct: 1,
  },
  "js-immutability": {
    q: "What is Immutability in JavaScript?",
    options: [
      "The ability to change an object's properties whenever needed.",
      "A rule that prevents variables from being declared with `let`.",
      "The principle of not changing existing data directly, but creating new data when changes are needed.",
      "A feature that makes every JavaScript variable constant.",
    ],
    correct: 2,
  },
  "js-idempotent": {
    q: "What is an Idempotent Function?",
    options: [
      "A function that always returns the same result for every possible input.",
      "A function that can only be called once.",
      "A function that changes its input every time it runs.",
      "A function that satisfies f(f(x)) = f(x), meaning applying it again to its result makes no further change.",
    ],
    correct: 3,
  },
  "js-pure-vs-idempotent": {
    q: "What is the key difference between a Pure Function and an Idempotent Function?",
    options: [
      "A pure function always modifies external state, while an idempotent function never returns a value.",
      "A pure function returns the same output for the same input without side effects; an idempotent function produces no further change when its operation is applied repeatedly to its result.",
      "Both terms mean exactly the same thing.",
      "A pure function must be asynchronous, while an idempotent function must be synchronous.",
    ],
    correct: 1,
  },
  "js-function-composition": {
    q: "What is Function Composition?",
    options: [
      "Combining functions so that the output of one function becomes the input of another.",
      "Putting multiple functions inside a JavaScript class.",
      "Calling the same function repeatedly with the same input.",
      "Combining two arrays into one array using `concat()`.",
    ],
    correct: 0,
  },
  "js-recursion": {
    q: "What is Recursion in JavaScript?",
    options: [
      "A function that calls itself to solve a problem in smaller steps.",
      "A function that can only be called once.",
      "A function that always returns another function.",
      "A loop that runs forever.",
    ],
    correct: 0,
  },
  "js-tail-recursion": {
    q: "What is Tail Recursion?",
    options: [
      "Recursion that can only be used with arrays.",
      "Recursion where the function call happens before any other operation in the function.",
      "Recursion where the recursive call is the final operation performed by the function.",
      "Recursion that does not require a base case.",
    ],
    correct: 2,
  },
  "js-callback-vs-hof": {
    q: "What is the difference between a Callback and a Higher-Order Function?",
    options: [
      "A callback always runs asynchronously, while a higher-order function always runs synchronously.",
      "A callback is a function passed to or invoked by another function; a higher-order function accepts a function as an argument or returns a function.",
      "A callback must return a value, while a higher-order function cannot return anything.",
      "They are two names for exactly the same concept.",
    ],
    correct: 1,
  },
  "js-partial-application": {
    q: "What is Partial Application?",
    options: [
      "Calling a function without providing any arguments.",
      "Breaking a function into multiple files.",
      "Executing a function only once.",
      "Creating a new function by fixing some of the arguments of an existing function.",
    ],
    correct: 3,
  },
  "js-currying-vs-partial": {
    q: "What is the difference between Currying and Partial Application?",
    options: [
      "Currying transforms a multi-argument function into a sequence of single-argument functions; partial application fixes some arguments to create a function that needs fewer arguments.",
      "Currying always fixes the first argument, while partial application always creates single-argument functions.",
      "Currying applies only to asynchronous functions, while partial application applies only to synchronous functions.",
      "There is no difference between them.",
    ],
    correct: 0,
  },
  "js-error-object": {
    q: "What is an Error Object in JavaScript?",
    options: [
      "An object that stores information about an error, such as its name and message",
      "A function that automatically fixes errors",
      "A variable that stores only numbers",
      "A method used to stop loops",
    ],
    correct: 0,
  },
  "js-error-types": {
    q: "What are the different types of JavaScript errors?",
    options: [
      "SyntaxError, TypeError, ReferenceError, RangeError, and more",
      "Only SyntaxError and TypeError",
      "HTML error, CSS error, and JavaScript error",
      "Only errors created using `throw`",
    ],
    correct: 0,
  },
  "js-try-catch-finally": {
    q: "What is the purpose of try...catch...finally?",
    options: [
      "To declare variables and functions",
      "To handle exceptions and optionally run cleanup code",
      "To repeat a block of code until it succeeds",
      "To return values from every function",
    ],
    correct: 1,
  },
  "js-throw-vs-return": {
    q: "What is the difference between throw and return?",
    options: [
      "Both always stop the entire application",
      "`throw` sends an error or exception; `return` exits a function and optionally provides a value",
      "`return` throws an error, while `throw` returns a value",
      "There is no difference",
    ],
    correct: 1,
  },
  "js-try-without-catch": {
    q: "Can we have a try block without catch?",
    options: [
      "No, every try must have catch",
      "Yes, but only when it contains a return statement",
      "Yes, if it is followed by a finally block",
      "Yes, a try block can always stand alone",
    ],
    correct: 2,
  },
  "js-custom-error": {
    q: "How do you create a Custom Error in JavaScript?",
    options: [
      "By creating a class that extends the built-in `Error` class",
      "By declaring a variable with the name `Error`",
      "By using `console.error()` only",
      "By creating a function that returns a string",
    ],
    correct: 0,
  },
  "js-object-reference-modify": {
    q: "What happens if you modify an object that was assigned to another variable?",
    options: [
      "The second variable always gets an independent copy",
      "Both variables can reflect the change because they refer to the same object",
      "JavaScript automatically freezes the object",
      "The second variable becomes undefined",
    ],
    correct: 1,
  },
  "js-pass-by-value": {
    q: "Which statement best describes pass-by-value and reference behavior in JavaScript?",
    options: [
      "Objects are always passed by reference, so variables can be reassigned through functions",
      "Primitives and objects are both passed by value; for objects, the copied value is a reference to the same object",
      "Primitives are passed by reference, but objects are passed by value",
      "JavaScript uses pass-by-reference for every data type",
    ],
    correct: 1,
  },
  "js-missing-property": {
    q: "What happens when you access a property that doesn't exist on an object?",
    options: [
      "JavaScript automatically creates the property with a value of null",
      "JavaScript throws a ReferenceError in every case",
      "The property access returns undefined",
      "The property access always returns false",
    ],
    correct: 2,
  },
  "js-json-types": {
    q: "Which data types are supported by JSON?",
    options: [
      "Functions, symbols, and undefined",
      "Objects, arrays, strings, numbers, booleans, and null",
      "Only strings and numbers",
      "Every JavaScript data type without restrictions",
    ],
    correct: 1,
  },
  "js-this": {
    q: "What determines the value of `this` in a regular JavaScript function?",
    options: [
      "Always the object where the function is defined",
      "Usually how the function is called",
      "Always the global object",
      "Always the first argument passed to the function",
    ],
    correct: 1,
  },
  "js-call": {
    q: "What does `call()` do in JavaScript?",
    options: [
      "Calls a function immediately with a specified `this` value and individual arguments",
      "Creates a copy of a function without calling it",
      "Calls a function with all arguments packed into an array",
      "Automatically binds `this` permanently",
    ],
    correct: 0,
  },
  "js-apply": {
    q: "How is `apply()` different from `call()`?",
    options: [
      "`apply()` never invokes the function",
      "`apply()` permanently binds `this`",
      "`apply()` accepts arguments as an array or array-like object",
      "`apply()` works only with arrow functions",
    ],
    correct: 2,
  },
  "js-bind": {
    q: "What does `bind()` return?",
    options: [
      "The result of immediately executing the function",
      "A new function with a specified `this` value and optionally preset arguments",
      "An array containing the function's arguments",
      "A new object created from the function",
    ],
    correct: 1,
  },
  "js-strict-this": {
    q: "What happens to `this` when a regular function is called without an object in strict mode?",
    options: [
      "It always refers to `window`",
      "It refers to the function itself",
      "It becomes an empty object",
      "It is `undefined`",
    ],
    correct: 3,
  },
  "js-arrow-callbacks": {
    q: "Why are arrow functions commonly used as callbacks?",
    options: [
      "They always execute faster than regular functions",
      "They inherit `this` from their surrounding scope and offer concise syntax",
      "They automatically handle asynchronous errors",
      "They can only be used as callbacks",
    ],
    correct: 1,
  },
  "js-classes": {
    q: "What are classes in ES6?",
    options: [
      "A new primitive data type",
      "A way to create CSS styles in JavaScript",
      "A cleaner syntax for creating objects and working with prototype-based inheritance",
      "A replacement for all JavaScript functions",
    ],
    correct: 2,
  },
  "js-constructor": {
    q: "What is a constructor in JavaScript?",
    options: [
      "A special method that initializes a class instance when created with `new`",
      "A method that destroys an object",
      "A function that can only return strings",
      "A method that runs every time an object's property is accessed",
    ],
    correct: 0,
  },
  "js-class-vs-constructor": {
    q: "What is the difference between a class and a constructor function?",
    options: [
      "Classes use prototypes, but constructor functions do not",
      "Constructor functions must always be called with `new`, but classes do not",
      "There is no difference in syntax or behavior",
      "Classes provide dedicated syntax and cannot be called without `new`; constructor functions are regular functions that can also be called normally",
    ],
    correct: 3,
  },
  "js-prototype": {
    q: "What is prototypal inheritance?",
    options: [
      "Copying every method from one object into another automatically",
      "A mechanism where an object can access properties and methods through another object in its prototype chain",
      "A way to inherit variables from CSS",
      "A feature available only inside ES6 classes",
    ],
    correct: 1,
  },
  "js-prototype-chain": {
    q: "What is the Prototype Chain in JavaScript?",
    options: [
      "A sequence of functions executed in a fixed order",
      "A chain of objects JavaScript searches when a property is not found on the current object",
      "A list of classes stored in an array",
      "A mechanism that copies every property from parent objects",
    ],
    correct: 1,
  },
  "js-classes-are-prototypes": {
    q: "Are JavaScript classes internally based on classes or prototypes?",
    options: [
      "They are based on Java-style classes internally",
      "They use prototypes underneath, with class syntax providing a cleaner way to work with them",
      "They do not use prototypes at all",
      "They are converted into JSON objects",
    ],
    correct: 1,
  },
  "js-classes-prototypes": {
    q: "How are JavaScript classes related to prototypes?",
    options: [
      "Methods defined in a class are generally placed on its prototype and shared by instances",
      "Every class method is copied separately onto every instance",
      "Prototypes are used only for arrow functions",
      "A class and its prototype are exactly the same object",
    ],
    correct: 0,
  },
  "js-inheritance": {
    q: "What is inheritance in JavaScript?",
    options: [
      "Creating a variable inside another function",
      "Converting an object into a primitive value",
      "Allowing an object or class to reuse or extend behavior from another object or class",
      "Copying an entire program into another file",
    ],
    correct: 2,
  },
  "js-extends": {
    q: "What does the `extends` keyword do in JavaScript?",
    options: [
      "Makes a function asynchronous",
      "Creates a new primitive data type",
      "Prevents a class from being instantiated",
      "Declares that a class inherits from another class",
    ],
    correct: 3,
  },
  "js-super": {
    q: "What is the `super` keyword in JavaScript?",
    options: [
      "It creates a new independent object",
      "It refers to the global object",
      "It is used to call a parent class constructor or access parent methods",
      "It makes every method static",
    ],
    correct: 2,
  },
  "js-static-methods": {
    q: "What are static methods in JavaScript?",
    options: [
      "Methods that belong to the class itself rather than its instances",
      "Methods that can only run once",
      "Methods that automatically become private",
      "Methods inherited only by object instances",
    ],
    correct: 0,
  },
  "js-private-fields": {
    q: "What are private class fields in JavaScript?",
    options: [
      "Properties whose names begin with an underscore",
      "Properties that are hidden only in browser developer tools",
      "Properties that can be accessed by any subclass",
      "Fields declared with `#` that can only be accessed within the class's permitted private scope",
    ],
    correct: 3,
  },
  "js-method-overriding": {
    q: "What is method overriding in JavaScript?",
    options: [
      "Defining two methods with the same name in one object and running both automatically",
      "A child class providing its own implementation of a method inherited from its parent",
      "Changing a method into a variable",
      "Calling a method without parentheses",
    ],
    correct: 1,
  },
  "js-multiple-inheritance": {
    q: "Does JavaScript support multiple inheritance?",
    options: [
      "Yes, a class can directly extend any number of classes",
      "Yes, using multiple `extends` keywords",
      "No, a class can directly extend only one class, but mixins and composition can combine behavior from multiple sources",
      "No, JavaScript cannot reuse behavior from other objects",
    ],
    correct: 2,
  },
  "js-sync-vs-async": {
    q: "What is the difference between synchronous and asynchronous code?",
    options: [
      "Synchronous code runs only in the browser, while asynchronous code runs only on servers",
      "Synchronous code generally executes step by step, while asynchronous operations allow other work to proceed without waiting for them to finish",
      "Asynchronous code always executes faster than synchronous code",
      "There is no difference between them",
    ],
    correct: 1,
  },
  "js-callback-hell": {
    q: "What is Callback Hell, and how can you avoid it?",
    options: [
      "A JavaScript syntax error caused by using arrow functions",
      "A situation where callbacks are nested deeply, making code hard to read and maintain; Promises and `async/await` can help",
      "An error that happens whenever a callback returns a value",
      "A problem that occurs only when using `setTimeout()`",
    ],
    correct: 1,
  },
  "js-promises": {
    q: "What is a Promise in JavaScript?",
    options: [
      "An object representing the eventual completion or failure of an asynchronous operation",
      "A function that must execute immediately",
      "A special type of loop",
      "An object that can only store strings",
    ],
    correct: 0,
  },
  "js-why-promises": {
    q: "Why do we need Promises in JavaScript?",
    options: [
      "To make all JavaScript code synchronous",
      "To eliminate the need for functions",
      "To manage asynchronous results and errors more clearly than deeply nested callbacks",
      "To guarantee that every operation succeeds",
    ],
    correct: 2,
  },
  "js-promise-states": {
    q: "What are the three states of a Promise?",
    options: [
      "Started, running, and stopped",
      "Open, closed, and waiting",
      "Success, failure, and cancelled",
      "Pending, fulfilled, and rejected",
    ],
    correct: 3,
  },
  "js-promise-chaining": {
    q: "What is Promise Chaining?",
    options: [
      "Calling multiple promises without waiting for any result",
      "Using `.then()` repeatedly, where each step can use the previous step's result",
      "Running the same promise forever",
      "Converting a Promise into a callback",
    ],
    correct: 1,
  },
  "js-promise-methods": {
    q: "Which option lists valid static Promise methods?",
    options: [
      "`Promise.all()`, `Promise.race()`, `Promise.any()`, and `Promise.allSettled()`",
      "`Promise.then()`, `Promise.catch()`, and `Promise.finally()` only",
      "`Promise.start()`, `Promise.stop()`, and `Promise.wait()`",
      "`Promise.map()`, `Promise.filter()`, and `Promise.reduce()`",
    ],
    correct: 0,
  },
  "js-promise-allsettled": {
    q: "What does `Promise.allSettled()` do?",
    options: [
      "Rejects immediately when any input Promise rejects",
      "Returns only the first fulfilled result",
      "Waits for every input Promise to settle and reports each outcome",
      "Cancels all Promises after the first result",
    ],
    correct: 2,
  },
  "js-promise-all": {
    q: "What happens when you use `Promise.all()` and one input Promise rejects?",
    options: [
      "It waits for every other Promise to finish before rejecting",
      "It fulfills with the successful results only",
      "It automatically retries the rejected Promise",
      "The combined Promise rejects when an input rejects; the other operations are not automatically cancelled",
    ],
    correct: 3,
  },
  "js-promise-any": {
    q: "How does `Promise.any()` behave?",
    options: [
      "It fulfills with the first fulfilled input and rejects only if all inputs reject",
      "It fulfills only when every input fulfills",
      "It returns the first input to settle, whether fulfilled or rejected",
      "It waits for every input to settle and returns every result",
    ],
    correct: 0,
  },
  "js-async-await": {
    q: "What does `async/await` actually do?",
    options: [
      "Makes all code run on a separate thread",
      "Lets you write Promise-based asynchronous code in a more readable style; `await` pauses the surrounding async function until the awaited result settles",
      "Turns every function into a synchronous function",
      "Removes the need to handle rejected Promises",
    ],
    correct: 1,
  },
  "js-promise-race": {
    q: "What does `Promise.race()` do?",
    options: [
      "Returns the first fulfilled Promise, ignoring earlier rejections",
      "Waits for all input Promises and returns an array of results",
      "Settles with the outcome of the first input Promise to settle, whether fulfilled or rejected",
      "Rejects only if all input Promises reject",
    ],
    correct: 2,
  },
  "js-forget-await": {
    q: "What happens if you forget to `await` a Promise inside an async function?",
    options: [
      "JavaScript automatically waits for it before moving to the next line",
      "You generally get the Promise object immediately, and the following code continues without waiting for its result",
      "The Promise is automatically cancelled",
      "The async function stops executing permanently",
    ],
    correct: 1,
  },
  "js-sequential-vs-parallel": {
    q: "What is the difference between sequential and parallel Promise execution?",
    options: [
      "Sequential execution waits for each operation before starting the next; parallel execution starts independent operations without waiting for each one to finish",
      "Sequential execution always uses multiple threads; parallel execution always uses one",
      "They are exactly the same",
      "Parallel execution guarantees every operation finishes faster",
    ],
    correct: 0,
  },
  "js-promises-resolve-together": {
    q: "What happens when multiple Promises fulfill around the same time inside `Promise.all()`?",
    options: [
      "Only the first result is returned",
      "The results are returned in the order they finish",
      "The results are returned in the same order as the input Promises",
      "JavaScript throws an error because they finished together",
    ],
    correct: 2,
  },
  "js-promise-throw": {
    q: "What happens when you throw an error inside a Promise's `.then()` handler?",
    options: [
      "The error is ignored automatically",
      "The Promise chain becomes rejected, and a later `.catch()` can handle the error",
      "The entire JavaScript application must stop",
      "The Promise automatically retries the handler",
    ],
    correct: 1,
  },
  "js-async-error-handling": {
    q: "How does error handling work with `async/await`?",
    options: [
      "Errors cannot be caught when using `await`",
      "Every error is automatically converted to `null`",
      "You must use `.then()` after every `await`",
      "Use `try...catch` around awaited operations to handle rejected Promises and thrown errors",
    ],
    correct: 3,
  },
  "js-async-error-handling-ways": {
    q: "How can you handle errors in asynchronous JavaScript?",
    options: [
      "Use only `console.log()`",
      "Ignore every rejected Promise",
      "Use `.catch()` with Promise chains or `try...catch` with `async/await`",
      "Use `finally` alone to catch and handle every error",
    ],
    correct: 2,
  },
  "js-allsettled-failed-api": {
    q: "How would you handle one failed API call while allowing other API calls to complete?",
    options: [
      "Use `Promise.allSettled()` to inspect every result, or catch failures individually",
      "Use `Promise.all()` and assume it returns successful results after any rejection",
      "Cancel all other requests whenever one request fails",
      "Put every request in one `try` block and assume all requests succeed",
    ],
    correct: 0,
  },
  "js-await-not-blocking": {
    q: "Why doesn't `await` block the JavaScript main thread?",
    options: [
      "Because `await` makes the CPU execute every Promise on a separate thread",
      "Because `await` suspends the current async function and lets the event loop process other work while the awaited operation settles",
      "Because Promises always resolve instantly",
      "Because JavaScript stops processing all other code until the Promise settles",
    ],
    correct: 1,
  },
  "js-dom": {
    q: "What is the DOM (Document Object Model)?",
    options: [
      "A JavaScript library for making API requests",
      "A programming language used to style websites",
      "A tree-like representation of an HTML document that JavaScript can access and modify",
      "A database that stores website passwords",
    ],
    correct: 2,
  },
  "js-events": {
    q: "What are events in JavaScript?",
    options: [
      "Actions or occurrences, such as clicks, key presses, or page loading, that code can respond to",
      "Only errors that happen in JavaScript",
      "Functions that always run when a page opens",
      "HTML elements used to style buttons",
    ],
    correct: 0,
  },
  "js-event-listener": {
    q: "What is an event listener?",
    options: [
      "A variable that stores every event permanently",
      "A method that prevents all browser events",
      "A function that automatically removes HTML elements",
      "A function registered to run when a particular event occurs",
    ],
    correct: 3,
  },
  "js-remove-listeners": {
    q: "Why is it important to remove event listeners after use?",
    options: [
      "To make every event execute twice",
      "To avoid unwanted repeated behavior, unnecessary work, and potential memory leaks when listeners are no longer needed",
      "Because event listeners stop working after one click",
      "To prevent JavaScript from accessing the DOM",
    ],
    correct: 1,
  },
  "js-event-delegation": {
    q: "Which statement correctly describes event bubbling, capturing, and delegation?",
    options: [
      "Bubbling moves from parent to child; capturing moves from child to parent; delegation requires one listener per child",
      "Bubbling and capturing mean the same thing, and delegation disables both",
      "Capturing travels from ancestors toward the target; bubbling travels from the target toward ancestors; delegation handles descendant events using a listener on an ancestor",
      "Event delegation works only with keyboard events",
    ],
    correct: 2,
  },
  "js-settimeout": {
    q: "What is setTimeout() in JavaScript?",
    options: [
      "It executes a function repeatedly after a fixed interval.",
      "It schedules a function to execute once after a specified delay.",
      "It immediately stops a running function.",
      "It pauses the entire JavaScript thread for the specified time.",
    ],
    correct: 1,
  },
  "js-setinterval": {
    q: "What is setInterval() in JavaScript?",
    options: [
      "It executes a function once after a delay.",
      "It repeatedly schedules a callback at approximately fixed intervals until stopped.",
      "It delays all JavaScript code.",
      "It runs a callback only when the browser repaints.",
    ],
    correct: 1,
  },
  "js-cleartimeout": {
    q: "What is clearTimeout() used for?",
    options: [
      "To stop every timer in the application.",
      "To pause a timeout and resume it later.",
      "To cancel a pending timeout using its timer ID.",
      "To clear the browser's localStorage.",
    ],
    correct: 2,
  },
  "js-clearinterval": {
    q: "What is clearInterval() used for?",
    options: [
      "To stop a repeating interval using its timer ID.",
      "To delay the next interval callback by one second.",
      "To cancel all pending promises.",
      "To remove an event listener.",
    ],
    correct: 0,
  },
  "js-request-animation-frame": {
    q: "What is requestAnimationFrame() used for?",
    options: [
      "To run a callback exactly every 16 milliseconds in every situation.",
      "To run a callback before every network request.",
      "To schedule a callback in sync with the browser's next repaint, commonly for animations.",
      "To repeatedly call a function until clearInterval() is used.",
    ],
    correct: 2,
  },
  "js-debounce": {
    q: "What is debouncing in JavaScript?",
    options: [
      "Calling a function repeatedly at a fixed interval.",
      "Ensuring a function runs only once when the page loads.",
      "Delaying a function until a specified time has passed without another triggering call.",
      "Making an asynchronous function execute synchronously.",
    ],
    correct: 2,
  },
  "js-throttle": {
    q: "What is throttling in JavaScript?",
    options: [
      "Delaying a function until no new calls occur for a specified time.",
      "Ensuring a function executes at most once during a specified time interval.",
      "Making a function execute immediately every time it is called.",
      "Canceling all asynchronous operations.",
    ],
    correct: 1,
  },
  "js-event-queue": {
    q: "What is the Event Queue in JavaScript?",
    options: [
      "A queue that stores only synchronous JavaScript statements.",
      "A place where browser events and scheduled callbacks can wait until they are eligible to run.",
      "A JavaScript object that stores DOM elements.",
      "A queue that always executes tasks immediately.",
    ],
    correct: 1,
  },
  "js-event-vs-microtask-queue": {
    q: "What is the difference between the Event Queue and the Microtask Queue?",
    options: [
      "There is no difference; they are two names for the same queue.",
      "The Event Queue contains only promises, while the Microtask Queue contains timers.",
      "The task queue holds tasks such as timer callbacks and many event handlers; the microtask queue holds jobs such as Promise reactions and queueMicrotask callbacks, which are generally processed before the next task.",
      "The Microtask Queue always runs after the next timer callback.",
    ],
    correct: 2,
  },
  "js-queue-microtask": {
    q: "What does queueMicrotask() do?",
    options: [
      "Schedules a callback to run as a microtask after the current synchronous execution finishes and the stack clears.",
      "Schedules a callback to run after a fixed delay, like setTimeout().",
      "Runs a callback immediately before the current line finishes.",
      "Repeats a callback at regular intervals.",
    ],
    correct: 0,
  },
  "js-event-loop": {
    q: "What is the Event Loop?",
    options: [
      "A loop that repeatedly executes every function in a JavaScript file.",
      "A mechanism that coordinates execution of synchronous code, queued tasks, and microtasks.",
      "A browser API used only for animations.",
      "A loop that makes JavaScript execute all asynchronous operations simultaneously.",
    ],
    correct: 1,
  },
  "js-microtasks-macrotasks": {
    q: "What are Microtasks and Macrotasks (tasks)?",
    options: [
      "Microtasks are always slower than macrotasks.",
      "Microtasks include Promise reactions and queueMicrotask callbacks; tasks include many timer callbacks and event handlers.",
      "Microtasks run only on the server, while macrotasks run only in browsers.",
      "Both are synchronous functions that execute immediately when called.",
    ],
    correct: 1,
  },
  "js-mutation-observer": {
    q: "What is the MutationObserver API?",
    options: [
      "An API that observes changes to DOM nodes and can notify your callback asynchronously.",
      "An API that tracks changes to JavaScript variables of any type.",
      "An API that detects changes in localStorage only.",
      "An API that automatically prevents all DOM changes.",
    ],
    correct: 0,
  },
  "js-abort-controller": {
    q: "What is the AbortController API used for?",
    options: [
      "To undo any JavaScript function after it finishes.",
      "To cancel all requests made by the browser automatically.",
      "To signal cancellation to supported operations, such as fetch(), using an AbortSignal.",
      "To stop the event loop.",
    ],
    correct: 2,
  },
  "js-window-vs-document": {
    q: "What is the difference between window and document in a browser?",
    options: [
      "window represents the HTML page only, while document represents the entire browser tab and its timers.",
      "window is the browser's global object in a page; document represents the page's HTML DOM.",
      "They are exactly the same object and have the same properties.",
      "document handles timers, while window handles only HTML elements.",
    ],
    correct: 1,
  },
};

const DAY_QUIZ_EXTRAS = {
  1: [
    {
      id: "js-quiz-describes",
      q: "Which of the following best describes JavaScript?",
      options: [
        "A dynamically typed programming language that supports both synchronous and asynchronous programming.",
        "A purely synchronous programming language that cannot perform asynchronous operations.",
        "A statically typed language used only for server-side development.",
        "A markup language used to define the structure of web pages.",
      ],
      correct: 0,
      a: `<p>JavaScript is dynamically typed and supports both synchronous and asynchronous programming. It runs code synchronously by default, and it handles asynchronous work with the event loop, callbacks, and Promises.</p>`,
    },
    {
      id: "js-quiz-async-feature",
      q: "Which feature allows JavaScript to handle asynchronous operations?",
      options: ["Event loop", "Static typing", "CSS engine", "HTML parser"],
      correct: 0,
      a: `<p>The event loop lets JavaScript handle asynchronous operations even though JavaScript is single-threaded. It checks the call stack and moves pending tasks, such as timers, API calls, and event handlers, onto the stack when it is empty.</p>`,
    },
    {
      id: "js-quiz-es6-feature",
      q: "Which of the following is an ES6 feature?",
      options: ["Arrow functions", "var declarations", "document.getElementById()", "setTimeout()"],
      correct: 0,
      a: `<p>Arrow functions were introduced in ES6. <code>var</code>, <code>document.getElementById()</code>, and <code>setTimeout()</code> existed before ES6.</p>`,
    },
    {
      id: "js-quiz-declare-keywords",
      q: "Which keywords can be used to declare variables in JavaScript?",
      options: ["var, let, and const", "variable, let, and define", "int, float, and string", "declare, var, and constant"],
      correct: 0,
      a: `<p><code>var</code>, <code>let</code>, and <code>const</code> are the keywords used to declare variables in JavaScript. <code>let</code> and <code>const</code> are block-scoped, and a <code>const</code> binding cannot be reassigned.</p>`,
    },
    {
      id: "js-quiz-init",
      q: "What is variable initialization in JavaScript?",
      options: [
        "Giving a variable its first value when it is created.",
        "Changing a variable's value after it has been created.",
        "Removing a variable from memory.",
        "Checking the data type of a variable.",
      ],
      correct: 0,
      a: `<p>Initialization means giving a variable its first value at the time it is created, such as <code>let age = 25</code>.</p>`,
    },
    {
      id: "js-quiz-assign",
      q: "What is variable assignment in JavaScript?",
      options: [
        "Giving or changing the value stored in an existing variable.",
        "Creating a variable without giving it a name.",
        "Declaring a function inside a variable.",
        "Converting a variable into a constant.",
      ],
      correct: 0,
      a: `<p>Assignment means giving a value to a variable, or changing the value it already holds, using <code>=</code>.</p>`,
    },
    {
      id: "js-quiz-var-scope",
      q: "What is the main difference between var, let, and const?",
      options: [
        "var is function-scoped, while let and const are block-scoped.",
        "var, let, and const are all block-scoped.",
        "let is function-scoped, while var and const are block-scoped.",
        "Only var can be used to declare variables.",
      ],
      correct: 0,
      a: `<p><code>var</code> is function-scoped. <code>let</code> and <code>const</code> are block-scoped.</p>`,
    },
    {
      id: "js-quiz-let-const",
      q: "Which statement about let and const is correct?",
      options: [
        "Both are block-scoped, but let can be reassigned while const cannot be reassigned.",
        "Both are function-scoped and can be redeclared in the same scope.",
        "const can be reassigned, but let cannot.",
        "let and const are exactly the same as var.",
      ],
      correct: 0,
      a: `<p><code>let</code> and <code>const</code> are both block-scoped. A <code>let</code> binding can be reassigned. A <code>const</code> binding cannot be reassigned.</p>`,
    },
    {
      id: "js-quiz-primitives",
      q: "Which of the following are JavaScript primitive data types?",
      options: [
        "String, Number, BigInt, Boolean, Undefined, Symbol, and Null",
        "Array, Object, Function, and Date",
        "String, Array, Object, and Function",
        "Number, Array, Boolean, and Object",
      ],
      correct: 0,
      a: `<p>JavaScript’s primitive types are String, Number, BigInt, Boolean, Undefined, Symbol, and Null. Arrays, objects, and functions are non-primitive.</p>`,
    },
    {
      id: "js-quiz-non-primitive",
      q: "Which of the following is a non-primitive data type in JavaScript?",
      options: ["Object", "String", "Number", "Boolean"],
      correct: 0,
      a: `<p>Object is a non-primitive data type. String, Number, and Boolean are primitives.</p>`,
    },
    {
      id: "js-quiz-coercion",
      q: "What is Type Coercion in JavaScript?",
      options: [
        "The automatic or explicit conversion of a value from one data type to another.",
        "The process of declaring multiple variables with the same name.",
        "The process of converting JavaScript code into machine code.",
        "The process of removing unused variables from memory.",
      ],
      correct: 0,
      a: `<p>Type coercion converts a value from one data type to another. It can happen automatically, or you can convert the value yourself.</p>`,
    },
    {
      id: "js-quiz-truthy",
      q: "What are Truthy and Falsy values in JavaScript?",
      options: [
        "Truthy values behave like true in a Boolean context, while Falsy values behave like false.",
        "Truthy values are always true, while Falsy values are always false.",
        "Truthy and Falsy values are special JavaScript data types.",
        "Truthy values can only be numbers, while Falsy values can only be strings.",
      ],
      correct: 0,
      a: `<p>In a Boolean context, a truthy value is treated as <code>true</code> and a falsy value is treated as <code>false</code>. They are not separate data types.</p>`,
    },
    {
      id: "js-quiz-falsy",
      q: "Which of the following is a Falsy value in JavaScript?",
      options: ["0", '"0"', "[]", "{}"],
      correct: 0,
      a: `<p><code>0</code> is falsy. The string <code>"0"</code>, an empty array, and an empty object are all truthy.</p>`,
    },
    {
      id: "js-quiz-null",
      q: "What is null in JavaScript?",
      options: [
        "A special value that explicitly represents the intentional absence of an object value.",
        "A value that represents an undeclared variable.",
        "A value that automatically represents an empty string.",
        "A keyword used to delete a variable from memory.",
      ],
      correct: 0,
      a: `<p><code>null</code> is an intentional empty value. It means there is no object value on purpose.</p>`,
    },
    {
      id: "js-quiz-undefined",
      q: "What is undefined in JavaScript?",
      options: [
        "A value assigned to a variable that has been declared but not given a value.",
        "A value that represents an intentional absence of an object.",
        "A special value used only for invalid mathematical operations.",
        "A keyword used to delete a variable.",
      ],
      correct: 0,
      a: `<p><code>undefined</code> means a variable was declared but has not been given a value yet.</p>`,
    },
    {
      id: "js-quiz-nan",
      q: "What is NaN in JavaScript?",
      options: [
        "A special numeric value that represents an invalid or unrepresentable numerical result.",
        'A string value representing "Not a Number".',
        "A value that represents an empty object.",
        "A value used when a variable is not declared.",
      ],
      correct: 0,
      a: `<p><code>NaN</code> is a numeric value that means the result is not a valid number, such as <code>Number("abc")</code>.</p>`,
    },
    {
      id: "js-quiz-null-undefined",
      q: "What is the difference between null and undefined?",
      options: [
        "null represents an intentional absence of a value, while undefined generally means a value has not been assigned or is unavailable.",
        "null is automatically assigned to all undeclared variables, while undefined represents an empty object.",
        "null and undefined are exactly the same value in JavaScript.",
        "undefined can only be used for objects, while null can only be used for numbers.",
      ],
      correct: 0,
      a: `<p><code>null</code> is an intentional empty value. <code>undefined</code> means a value was never assigned or is not available.</p>`,
    },
    {
      id: "js-quiz-typeof",
      q: "What is the typeof operator?",
      options: [
        "An operator used to determine the type of a value and return it as a string.",
        "An operator used to convert any value into a string.",
        "An operator used to check whether a variable is declared with let or const.",
        "An operator used to create a new data type.",
      ],
      correct: 0,
      a: `<p><code>typeof</code> returns the type of a value as a string, such as <code>"string"</code>, <code>"number"</code>, or <code>"object"</code>.</p>`,
    },
    {
      id: "js-quiz-typeof-null",
      q: 'Why does typeof null return "object"?',
      options: [
        "It is a historical behavior in JavaScript that was kept for backward compatibility.",
        "null is actually an object in modern JavaScript.",
        "typeof cannot detect primitive values.",
        "null is automatically converted into an object before typeof runs.",
      ],
      correct: 0,
      a: `<p><code>typeof null</code> returns <code>"object"</code> because of an old JavaScript bug that was kept so existing code would not break.</p>`,
    },
    {
      id: "js-quiz-typeof-null-statement",
      q: "Which statement correctly describes typeof null?",
      options: [
        'typeof null returns "object", even though null is a primitive value.',
        'typeof null returns "null" because null is its own data type.',
        'typeof null returns "undefined".',
        'typeof null returns "boolean".',
      ],
      correct: 0,
      a: `<p><code>null</code> is a primitive, but <code>typeof null</code> still returns <code>"object"</code>.</p>`,
    },
    {
      id: "js-quiz-unary",
      q: "What is a Unary Operator?",
      options: [
        "An operator that works on a single operand.",
        "An operator that always works on two operands.",
        "An operator that works only with strings.",
        "An operator used only for mathematical calculations.",
      ],
      correct: 0,
      a: `<p>A unary operator uses one operand. Examples include <code>typeof</code>, <code>!</code>, and <code>++</code>.</p>`,
    },
    {
      id: "js-quiz-unary-example",
      q: "Which of the following is an example of a unary operator?",
      options: ["typeof value", "a + b", "a * b", "a === b"],
      correct: 0,
      a: `<p><code>typeof value</code> uses one operand, so it is unary. <code>+</code>, <code>*</code>, and <code>===</code> each use two operands.</p>`,
    },
    {
      id: "js-quiz-double-bang",
      q: "What does the double exclamation (!!) operator do?",
      options: [
        "Converts a value into its Boolean equivalent.",
        "Converts a Boolean value into a string.",
        "Checks whether two values are strictly equal.",
        "Negates a number twice to make it positive.",
      ],
      correct: 0,
      a: `<p><code>!!</code> converts a value to <code>true</code> or <code>false</code>. A truthy value becomes <code>true</code>, and a falsy value becomes <code>false</code>.</p>`,
    },
    {
      id: "js-quiz-double-bang-zero",
      q: "What is the result of !!0 in JavaScript?",
      options: ["false", "true", "0", "undefined"],
      correct: 0,
      a: `<p><code>0</code> is falsy, so <code>!!0</code> is <code>false</code>.</p>`,
    },
    {
      id: "js-quiz-primitive-diff",
      q: "What is the difference between primitive and non-primitive data types?",
      options: [
        "Primitive types store single, immutable values, while non-primitive types are reference-based and can hold collections or complex data.",
        "Primitive types are always mutable, while non-primitive types are always immutable.",
        "Primitive types are stored only in the heap, while non-primitive types are stored only in the stack.",
        "Primitive and non-primitive types have exactly the same behavior in JavaScript.",
      ],
      correct: 0,
      a: `<p>Primitive values are single and immutable. Non-primitive values, such as objects and arrays, are stored by reference and can hold more complex data.</p>`,
    },
    {
      id: "js-quiz-hello-truthy",
      q: `What will be the output of this code?
if ("Hello") {
  console.log("Truthy");
} else {
  console.log("Falsy");
}`,
      options: ["Truthy", "Falsy", "undefined", "TypeError"],
      correct: 0,
      a: `<p><code>"Hello"</code> is a non-empty string, so it is truthy. The condition runs and logs <code>Truthy</code>.</p>`,
    },
  ],
  2: [
    {
      id: "js-quiz-default-param",
      q: "What happens when a JavaScript function parameter has a default value and the function is called without providing that argument?",
      options: [
        "The function throws an error",
        "The parameter automatically receives its default value",
        "The parameter becomes null",
        "The parameter becomes an empty string",
      ],
      correct: 1,
      a: `<p>A default parameter is used when the corresponding argument is undefined, including when the argument is omitted.</p>`,
    },
    {
      id: "js-quiz-symbol",
      q: "What is the main purpose of a Symbol in JavaScript?",
      options: [
        "To automatically encrypt object properties",
        "To create a unique primitive value",
        "To create a mutable object",
        "To convert strings into numbers",
      ],
      correct: 1,
      a: `<p>A Symbol creates a unique primitive value, which is useful when you need a property key that should not accidentally collide with another key.</p>`,
    },
    {
      id: "js-quiz-nullish-output",
      q: `What is the output of this JavaScript code?
const value = 0 ?? 100;
console.log(value);`,
      options: ["null", "100", "undefined", "0"],
      correct: 3,
      a: `<p>The result is 0 because <code>??</code> preserves valid falsy values such as 0 instead of treating them as missing.</p>`,
    },
    {
      id: "js-quiz-logical-or",
      q: `What is the output of this JavaScript code?
let a = 0;
a ||= 10;
console.log(a);`,
      options: ["null", "undefined", "10", "0"],
      correct: 2,
      a: `<p>Because 0 is falsy, the <code>||=</code> operator evaluates the right side and assigns 10 to <code>a</code>.</p>`,
    },
    {
      id: "js-quiz-execution-model",
      q: "Which statement best describes JavaScript's execution model in a typical browser environment?",
      options: [
        "JavaScript is inherently multi-threaded, so every function runs on a separate thread",
        "JavaScript is inherently multi-threaded and every operation is asynchronous",
        "JavaScript is single-threaded, but asynchronous behavior is enabled through the runtime and event loop",
        "JavaScript is always synchronous and cannot perform asynchronous operations",
      ],
      correct: 2,
      a: `<p>JavaScript runs on one thread. Asynchronous work is scheduled by the runtime and the event loop, not by starting a new thread for every function.</p>`,
    },
    {
      id: "js-quiz-what-function",
      q: "Which statement best describes a function in JavaScript?",
      options: [
        "A reusable block of code designed to perform a specific task",
        "An object that can only contain strings",
        "A variable that can only store numbers",
        "A loop that automatically repeats forever",
      ],
      correct: 0,
      a: `<p>A function groups reusable behavior that can be executed when the function is called.</p>`,
    },
    {
      id: "js-quiz-filter-map",
      q: `What is the output of this JavaScript code?
const nums = [1, 2, 3, 4];
const result = nums.filter(n => n % 2 === 0).map(n => n * 10);
console.log(result);`,
      options: ["[20, 40]", "[10, 20, 30, 40]", "[2, 4]", "60"],
      correct: 0,
      a: `<p><code>filter</code> keeps 2 and 4, and <code>map</code> then transforms them to 20 and 40.</p>`,
    },
    {
      id: "js-quiz-first-class",
      q: "Which example demonstrates that JavaScript functions are first-class values?",
      options: [
        "Calling a function only with numeric arguments",
        "Passing a function as an argument to another function",
        "Declaring a function only with the function keyword",
        "Using a function only once in a program",
      ],
      correct: 1,
      a: `<p>Passing a function as an argument demonstrates that functions can be treated like values in JavaScript.</p>`,
    },
    {
      id: "js-quiz-first-order",
      q: "Which function is a first-order function in JavaScript?",
      options: [
        "A function that accepts another function as an argument",
        "A function that returns another function",
        "A function that accepts a callback and executes it",
        "A function that accepts numbers and returns their sum",
      ],
      correct: 3,
      notes: [
        `<p>Accepting another function as an argument is a defining behavior of a higher-order function, not merely a first-order function.</p>`,
        "",
        "",
        `<p>This function operates only on ordinary values and neither accepts nor returns a function, so it is first-order.</p>`,
      ],
      a: `<p>This function operates only on ordinary values and neither accepts nor returns a function, so it is first-order.</p>`,
    },
    {
      id: "js-quiz-higher-order",
      q: "Which statement correctly describes a higher-order function in JavaScript?",
      options: [
        "A function that always returns a number",
        "A function that is declared using an arrow function",
        "A function that has more than two parameters",
        "A function that accepts a function or returns a function",
      ],
      correct: 3,
      a: `<p>A higher-order function operates on functions by accepting one as an argument, returning one, or both.</p>`,
    },
    {
      id: "js-quiz-unary",
      q: "Which function is a unary function in JavaScript?",
      options: [
        "function sum(a, b, c) { return a + b + c; }",
        'function greet() { return "Hello"; }',
        "function square(n) { return n * n; }",
        "function add(a, b) { return a + b; }",
      ],
      correct: 2,
      a: `<p>This function accepts exactly one parameter, <code>n</code>, so it is unary.</p>`,
    },
    {
      id: "js-quiz-currying",
      q: "What is the main idea behind currying in JavaScript?",
      options: [
        "Creating a function that accepts any number of arguments at once",
        "Executing a function immediately when it is declared",
        "Converting a function with multiple parameters into a sequence of functions that each take one argument",
        "Calling a function multiple times with the same arguments",
      ],
      correct: 2,
      a: `<p>Currying transforms a multi-parameter function into a chain of single-argument function calls.</p>`,
    },
    {
      id: "js-quiz-pure",
      q: "Which function is a pure function?",
      options: [
        'function save(data) { localStorage.setItem("data", data); }',
        "function getRandom() { return Math.random(); }",
        "function add(a, b) { return a + b; }",
        "function add(a) { total += a; return total; }",
      ],
      correct: 2,
      a: `<p><code>add</code> returns a result that depends only on its arguments and does not change anything outside the function.</p>`,
    },
    {
      id: "js-quiz-arrow-this",
      q: "Which statement about JavaScript arrow functions is correct?",
      options: [
        "Arrow functions can only contain one statement",
        "Arrow functions inherit this from their surrounding scope",
        "Arrow functions have their own this value",
        "Arrow functions cannot accept parameters",
      ],
      correct: 1,
      a: `<p>Arrow functions use lexical <code>this</code>, meaning <code>this</code> is taken from the surrounding scope rather than created when the function is called.</p>`,
    },
    {
      id: "js-quiz-anonymous",
      q: "Which example is an anonymous function in JavaScript?",
      options: [
        'const greet = function() { return "Hello"; };',
        'function greet() { return "Hello"; }',
        "function greet(name) { return name; }",
        "function calculate(a, b) { return a + b; }",
      ],
      correct: 0,
      a: `<p>The function expression itself has no function name, so it is an anonymous function stored in the <code>greet</code> variable.</p>`,
    },
    {
      id: "js-quiz-callback-output",
      q: `What is the output of this code?
function process(value, callback) { return callback(value); }

const result = process(5, x => x * 2); console.log(result);`,
      options: [
        "Error because callbacks cannot be passed as arguments",
        "5",
        "undefined",
        "10",
      ],
      correct: 3,
      a: `<p><code>process</code> calls the callback with 5, and <code>x =&gt; x * 2</code> returns 10.</p>`,
    },
    {
      id: "js-quiz-iife",
      q: "What is the main purpose of an IIFE (Immediately Invoked Function Expression)?",
      options: [
        "To make every function asynchronous",
        "To create and execute a function immediately",
        "To prevent a function from returning a value",
        "To define a function that can only be called from another file",
      ],
      correct: 1,
      a: `<p>An IIFE is a function expression that is invoked immediately after it is created.</p>`,
    },
    {
      id: "js-quiz-destructure",
      q: `What is the output?
const user = { name: "Nitin", age: 25 }; const { name, age } = user; console.log(name, age);`,
      options: ["user user", "undefined undefined", "Nitin 25", "name age"],
      correct: 2,
      a: `<p>Object destructuring extracts the name and age property values into variables with those names.</p>`,
    },
    {
      id: "js-quiz-scope",
      q: `What is the output?
let x = "global";

function test() { let x = "local"; console.log(x); }

test();`,
      options: ["ReferenceError", "global", "local", "undefined"],
      correct: 2,
      a: `<p>The locally declared <code>x</code> takes precedence inside <code>test</code>, so <code>console.log</code> prints local.</p>`,
    },
    {
      id: "js-quiz-curry-double",
      q: `What is the output of this code?
const multiply = a => b => a * b; const double = multiply(2);

console.log(double(5));`,
      options: ["10", "25", "undefined", "7"],
      correct: 0,
      a: `<p><code>multiply(2)</code> returns a function that multiplies by 2, so <code>double(5)</code> is 10.</p>`,
    },
  ],
  3: [
    {
      id: "js-quiz-block-scope",
      q: `What is the output of this code?
let x = "global";

function test() { let x = "function";

if (true) { let x = "block"; console.log(x); }

console.log(x); }

test(); console.log(x);`,
      options: [
        "block → block → global",
        "global → function → block",
        "block → function → global",
        "function → function → global",
      ],
      correct: 2,
      a: `<p>The inner block logs its own <code>x</code>, then the function logs its own <code>x</code>, then the outer log prints the global <code>x</code>.</p>`,
    },
    {
      id: "js-quiz-lexical-print",
      q: `What will this code print?
let x = "global";

function outer() { let x = "outer";

function inner() { console.log(x); }

inner(); }

outer();`,
      options: ["ReferenceError", "undefined", "outer", "global"],
      correct: 2,
      a: `<p><code>inner</code> reads <code>x</code> from the surrounding <code>outer</code> function, so it prints outer.</p>`,
    },
    {
      id: "js-quiz-execution-context",
      q: "When a JavaScript function is called, which of the following is created to manage information such as local variables, parameters, and the value of this?",
      options: ["Callback Queue", "Prototype Context", "Execution Context", "DOM Context"],
      correct: 2,
      a: `<p>A function execution context contains the information needed while that function is executing.</p>`,
    },
    {
      id: "js-quiz-call-stack-print",
      q: `What will be printed?
function first() { console.log("first"); second(); }

function second() { console.log("second"); }

first();`,
      options: ["second only", "first only", "second → first", "first → second"],
      correct: 3,
      a: `<p><code>first()</code> is pushed onto the call stack first, then <code>second()</code> is pushed on top of it and executes.</p>`,
    },
    {
      id: "js-quiz-tdz",
      q: `What happens when this code runs?
console.log(a); let a = 10;`,
      options: ["ReferenceError", "SyntaxError", "undefined", "10"],
      correct: 0,
      a: `<p>Accessing a <code>let</code> variable before its initialization causes a ReferenceError because it is in the Temporal Dead Zone.</p>`,
    },
    {
      id: "js-quiz-closure-count",
      q: `What is the output of this code?
function outer() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const counter = outer();

counter();
counter();`,
      options: ["1 1", "0 0", "1 2", "2 2"],
      correct: 2,
      a: `<p>The returned function keeps the same <code>count</code>. The first call logs 1 and the second logs 2.</p>`,
    },
    {
      id: "js-quiz-closure-why",
      q: `Why does sayHello() print "John"?
function greet() {
  let name = "John";

  return function () {
    console.log(name);
  };
}

const sayHello = greet();
sayHello();`,
      options: [
        "Because name is a global variable",
        "Because closures remember variables from their outer scope",
        "Because name is automatically converted to global scope",
        "Because return makes all variables global",
      ],
      correct: 1,
      a: `<p>The returned function closes over <code>name</code> from <code>greet</code> and can still read it after <code>greet</code> has finished.</p>`,
    },
    {
      id: "js-quiz-memoization",
      q: "What is the main purpose of memoization?",
      options: [
        "To delete unused variables",
        "To store previously calculated results and reuse them",
        "To convert objects into arrays",
        "To create a closure",
      ],
      correct: 1,
      a: `<p>Memoization stores a result for a given input so the same calculation does not have to run again.</p>`,
    },
    {
      id: "js-quiz-spread",
      q: `What does ... do in this code?
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4];`,
      options: [
        "Combines the array into a string",
        "Copies/unpacks the elements of numbers into a new array",
        "Removes the elements from numbers",
        "Creates a nested array",
      ],
      correct: 1,
      a: `<p>The spread operator unpacks <code>numbers</code> into the new array, so <code>newNumbers</code> is <code>[1, 2, 3, 4]</code>.</p>`,
    },
    {
      id: "js-quiz-shallow-deep",
      q: "What is the main difference between a shallow copy and a deep copy?",
      options: [
        "Shallow copy copies only primitive values, while deep copy copies only objects",
        "Shallow copy shares nested object references, while deep copy creates independent nested copies",
        "Shallow copy is always slower than deep copy",
        "There is no difference",
      ],
      correct: 1,
      a: `<p>A shallow copy shares nested objects with the original. A deep copy duplicates those nested objects too.</p>`,
    },
    {
      id: "js-quiz-object-keys",
      q: `What is the output?
const user = { name: "Nitin", age: 25 }; console.log(Object.keys(user));`,
      options: ["name, age", '["name", "age"]', '{"name": "Nitin", "age": 25}', '["Nitin", 25]'],
      correct: 1,
      a: `<p><code>Object.keys()</code> returns the object's own property names in an array.</p>`,
    },
    {
      id: "js-quiz-object-assign",
      q: `What is the output?
const target = { a: 1 }; const source = { b: 2 };

const result = Object.assign(target, source);
console.log(result);`,
      options: ["undefined", "{ a: 1, b: 2 }", "{ a: 1 }", "{ b: 2 }"],
      correct: 1,
      a: `<p><code>Object.assign()</code> copies source properties into the target and returns the target object.</p>`,
    },
    {
      id: "js-quiz-keys-values-entries",
      q: `Which option correctly describes these three methods?
Object.keys(obj) Object.values(obj) Object.entries(obj)`,
      options: [
        "All three return the complete object",
        "Keys → key-value pairs, Values → keys, Entries → values",
        "Keys → keys, Values → values, Entries → key-value pairs",
        "Keys → values, Values → keys, Entries → keys only",
      ],
      correct: 2,
      a: `<p><code>Object.keys()</code> returns property names, <code>Object.values()</code> returns property values, and <code>Object.entries()</code> returns <code>[key, value]</code> pairs.</p>`,
    },
    {
      id: "js-quiz-spread-overwrite",
      q: `What is the output?
const user = { name: "Nitin", age: 25 }; const updatedUser = {
...user, age: 26 };

console.log(updatedUser.age);`,
      options: ["Error", "26", "25", "undefined"],
      correct: 1,
      a: `<p>Object spread copies <code>user</code> first, then the later <code>age: 26</code> property overwrites the copied age.</p>`,
    },
    {
      id: "js-quiz-rest-length",
      q: `What is the output?
function sum(first, ...numbers) { return numbers.length; }

console.log(sum(10, 20, 30, 40));`,
      options: ["4", "3", "1", "40"],
      correct: 1,
      a: `<p>The rest parameter <code>numbers</code> collects 20, 30, and 40, so its length is 3.</p>`,
    },
    {
      id: "js-quiz-spread-copy",
      q: `What is the output?
const source = { name: "Nitin", age: 25 }; const target = {
...source }; target.age = 26;

console.log(source.age, target.age);`,
      options: ["26 26", "26 25", "25 26", "25 25"],
      correct: 2,
      a: `<p>Spread copies <code>source</code> into a new object. Changing <code>target.age</code> leaves <code>source.age</code> at 25.</p>`,
    },
    {
      id: "js-quiz-deep-copy",
      q: "Which approach creates a deep copy of an object containing nested objects, assuming the data is JSON-compatible?",
      options: [
        "JSON.parse(JSON.stringify(obj))",
        "{ ...obj }",
        "Object.assign({}, obj)",
        "Object.keys(obj)",
      ],
      correct: 0,
      a: `<p><code>JSON.parse(JSON.stringify(obj))</code> rebuilds nested objects. Spread and <code>Object.assign</code> only copy the top level.</p>`,
    },
    {
      id: "js-quiz-define-properties",
      q: "Which method is designed to define multiple properties on an object while allowing you to specify descriptors such as writable, enumerable, and configurable?",
      options: ["Object.assign()", "Object.defineProperties()", "Object.entries()", "Object.keys()"],
      correct: 1,
      a: `<p><code>Object.defineProperties()</code> accepts an object of property descriptors and can define multiple properties at once.</p>`,
    },
    {
      id: "js-quiz-freeze",
      q: `What happens to this object?
const user = { name: "Nitin" }; Object.freeze(user);

user.name = "Rahul"; user.age = 25;

console.log(user);`,
      options: [
        '{ name: "Nitin", age: 25 }',
        "{}",
        '{ name: "Nitin" }',
        '{ name: "Rahul", age: 25 }',
      ],
      correct: 2,
      a: `<p><code>Object.freeze</code> prevents changing existing properties and adding new properties.</p>`,
    },
    {
      id: "js-quiz-has-own",
      q: "Which is a modern and direct way to check whether an object has a property as its own property, without considering inherited properties?",
      options: [
        "obj.name === true",
        'obj.hasProperty("name")',
        'Object.hasOwn(obj, "name")',
        'Object.keys(obj).includes("name")',
      ],
      correct: 2,
      a: `<p><code>Object.hasOwn()</code> checks only the object's own properties and does not walk the prototype chain.</p>`,
    },
  ],
  4: [
    {
      id: "js-quiz-iterator",
      q: "What is an iterator in JavaScript?",
      options: [
        "A function that can only loop through arrays",
        "A function that automatically runs forever",
        "An object that produces a sequence of values using a next() method",
        "A special type of Promise",
      ],
      correct: 2,
      notes: [
        "<p>Iterators are not limited to arrays; many JavaScript objects can provide iteration behavior.</p>",
        "",
        "<p>Correct. An iterator provides a next() method that returns an object containing value and done.</p>",
        "",
      ],
      a: `<p>An iterator provides a <code>next()</code> method that returns an object containing <code>value</code> and <code>done</code>.</p>`,
    },
    {
      id: "js-quiz-symbol-iterator",
      q: "What does Symbol.iterator define on an object?",
      options: [
        "How the object should be cloned",
        "How the object can be iterated using protocols such as for...of",
        "How the object should be converted to JSON",
        "How the object should be compared with another object",
      ],
      correct: 1,
      notes: [
        "",
        "<p>Correct. Symbol.iterator is the well-known symbol used to define an object's default synchronous iterator.</p>",
        "",
        "",
      ],
      a: `<p><code>Symbol.iterator</code> is the well-known symbol used to define an object's default synchronous iterator.</p>`,
    },
    {
      id: "js-quiz-async-iterator",
      q: "Which statement correctly describes an Async Iterator?",
      options: [
        "It is the same thing as a Promise",
        "It uses Symbol.iterator and only produces synchronous values",
        "It uses Symbol.asyncIterator and can produce values asynchronously",
        "It can only iterate over arrays",
      ],
      correct: 2,
      notes: [
        "",
        "",
        "<p>Correct. Async iterables expose Symbol.asyncIterator and are commonly consumed with for await...of.</p>",
        "",
      ],
      a: `<p>Async iterables expose <code>Symbol.asyncIterator</code> and are commonly consumed with <code>for await...of</code>.</p>`,
    },
    {
      id: "js-quiz-generator-keyword",
      q: "Which keyword is used to define a Generator Function in JavaScript?",
      options: ["async", "yield", "function*", "generate"],
      correct: 2,
      notes: [
        "",
        "<p>yield is used inside generators, but the function itself is declared using the generator syntax.</p>",
        "<p>Correct. A generator function is declared using function* and can use yield.</p>",
        "",
      ],
      a: `<p>A generator function is declared using <code>function*</code> and can use <code>yield</code>.</p>`,
    },
    {
      id: "js-quiz-generator-called",
      q: "What happens when a generator function containing yield is called?",
      options: [
        "It automatically runs asynchronously in the background",
        "It can never return a value",
        "It immediately executes all of its code and returns the final value",
        "It returns a generator object, and execution pauses at each yield until next() is called",
      ],
      correct: 3,
      notes: [
        "",
        "",
        "",
        "<p>Correct. Calling the generator creates an iterator-like generator object; next() resumes execution until the next yield or completion.</p>",
      ],
      a: `<p>Calling the generator creates an iterator-like generator object. <code>next()</code> resumes execution until the next <code>yield</code> or completion.</p>`,
    },
    {
      id: "js-quiz-regular-vs-async",
      q: "Which statement correctly describes the difference between a regular generator and an async generator?",
      options: [
        "Regular generators are consumed with next(), while async generators are commonly consumed with for await...of",
        "There is no difference between them",
        "Regular generators use yield, while async generators cannot use yield",
        "Regular generators always run asynchronously, while async generators run synchronously",
      ],
      correct: 0,
      notes: [
        "<p>Correct. Regular generators implement synchronous iteration, while async generators implement asynchronous iteration.</p>",
        "",
        "",
        "<p>The distinction is not that simple; async generators are designed for asynchronous iteration.</p>",
      ],
      a: `<p>Regular generators implement synchronous iteration and are consumed with <code>next()</code>. Async generators implement asynchronous iteration and are commonly consumed with <code>for await...of</code>.</p>`,
    },
    {
      id: "js-quiz-iterable-iterator",
      q: "Which statement correctly explains the difference between an Iterable and an Iterator?",
      options: [
        "They are exactly the same concept",
        "An Iterator has Symbol.iterator, while an Iterable has next()",
        "An Iterable has a Symbol.iterator method that returns an Iterator; an Iterator has a next() method",
        "An Iterable can only be an array, while an Iterator can only be an object",
      ],
      correct: 2,
      notes: [
        "",
        "",
        "<p>Correct. The iterable provides a way to obtain an iterator, while the iterator produces the values.</p>",
        "",
      ],
      a: `<p>An iterable has a <code>Symbol.iterator</code> method that returns an iterator. An iterator has a <code>next()</code> method that produces the values.</p>`,
    },
    {
      id: "js-quiz-yield-pause",
      q: "What happens when JavaScript reaches a yield expression inside a generator?",
      options: [
        "The generator automatically starts again from the beginning",
        "The entire JavaScript program pauses",
        "The generator terminates permanently",
        "The generator pauses and returns a value through the current next() call",
      ],
      correct: 3,
      notes: [
        "",
        "",
        "",
        "<p>Correct. Execution pauses at yield and can later resume when next() is called again.</p>",
      ],
      a: `<p>Execution pauses at <code>yield</code> and returns a value through the current <code>next()</code> call. It resumes when <code>next()</code> is called again.</p>`,
    },
    {
      id: "js-quiz-generator-returns",
      q: `What does calling a generator function return?
function* numbers() { yield 1; yield 2; }

const result = numbers();`,
      options: [
        "The value 1",
        "undefined",
        "An array containing [1, 2]",
        "A Generator object that is also an iterator",
      ],
      correct: 3,
      notes: [
        "<p>The generator body does not reach its first yield until next() is called.</p>",
        "",
        "",
        "<p>Correct. Calling the generator function creates a generator object, which provides next() and follows the iterator protocol.</p>",
      ],
      a: `<p>Calling the generator function creates a generator object, which provides <code>next()</code> and follows the iterator protocol. The body does not reach the first <code>yield</code> until <code>next()</code> is called.</p>`,
    },
    {
      id: "js-quiz-generator-vs-normal",
      q: "What is a key difference between a generator function and a normal function?",
      options: [
        "A normal function cannot return a value",
        "Generators are always asynchronous",
        "A generator can pause and resume execution using yield, while a normal function normally runs to completion when called",
        "Generators cannot accept parameters",
      ],
      correct: 2,
      notes: [
        "",
        "",
        "<p>Correct. Generators provide controlled suspension and resumption through yield and next().</p>",
        "",
      ],
      a: `<p>A generator can pause and resume through <code>yield</code> and <code>next()</code>. A normal function normally runs to completion when called.</p>`,
    },
    {
      id: "js-quiz-shadow-output",
      q: `What is the output?
let x = "global";

function test() { let x = "local"; console.log(x); }

test();`,
      options: ["undefined", "local", "ReferenceError", "global"],
      correct: 1,
      notes: [
        "",
        "<p>Correct. The local variable shadows the global variable within test().</p>",
        "",
        "",
      ],
      a: `<p>The local <code>x</code> inside <code>test</code> shadows the global <code>x</code>, so the log prints <code>local</code>.</p>`,
    },
    {
      id: "js-quiz-illegal-shadow",
      q: "Which situation is an example of illegal shadowing in JavaScript?",
      options: [
        "const x = 10; function test() { const x = 20; }",
        "var x = 10; function test() { let x = 20; }",
        "let x = 10; { let x = 20; }",
        "let x = 10; { var x = 20; }",
      ],
      correct: 3,
      notes: [
        "",
        "",
        "",
        "<p>Correct. A var declaration cannot shadow a let declaration from the same applicable scope chain in this way.</p>",
      ],
      a: `<p>A <code>var</code> declaration cannot shadow a <code>let</code> from the same applicable scope chain, so <code>let x = 10; { var x = 20; }</code> is illegal shadowing.</p>`,
    },
    {
      id: "js-quiz-computed-key",
      q: `What is the output?
const key = "name"; const user = { [key]: "Nitin" };

console.log(user.name);`,
      options: ["Nitin", "key", "ReferenceError", "undefined"],
      correct: 0,
      notes: [
        `<p>Correct. [key] evaluates the variable key and uses "name" as the property name.</p>`,
        "",
        "",
        "",
      ],
      a: `<p><code>[key]</code> evaluates the variable and uses <code>"name"</code> as the property name, so <code>user.name</code> is <code>"Nitin"</code>.</p>`,
    },
    {
      id: "js-quiz-delete-age",
      q: `What is the output?
const user = { name: "Nitin", age: 25 }; delete user.age;

console.log(user);`,
      options: ["undefined", "{ age: 25 }", '{ name: "Nitin", age: 25 }', '{ name: "Nitin" }'],
      correct: 3,
      notes: [
        "",
        "",
        "",
        "<p>Correct. The age property has been removed from the object.</p>",
      ],
      a: `<p><code>delete user.age</code> removes the <code>age</code> property, so the object is <code>{ name: "Nitin" }</code>.</p>`,
    },
    {
      id: "js-quiz-double-bang-output",
      q: `What is the output?
console.log(!!0); console.log(!!"hello"); console.log(!!null);`,
      options: ["true, false, true", "true, true, false", "false, true, false", "false, false, true"],
      correct: 2,
      notes: [
        "",
        "",
        "<p>Correct. 0 and null are falsy, while a non-empty string is truthy.</p>",
        "",
      ],
      a: `<p><code>0</code> and <code>null</code> are falsy, and a non-empty string is truthy, so the logs are <code>false</code>, <code>true</code>, <code>false</code>.</p>`,
    },
    {
      id: "js-quiz-isnan-output",
      q: `What is the output?
console.log(isNaN("hello")); console.log(isNaN("123"));`,
      options: ["true, false", "true, true", "false, false", "false, true"],
      correct: 0,
      notes: [
        `<p>Correct. "hello" becomes NaN after coercion, while "123" can be converted to the number 123.</p>`,
        "",
        "",
        "<p>The results are the opposite of global isNaN()'s coercive behavior.</p>",
      ],
      a: `<p>Global <code>isNaN</code> coerces its argument. <code>"hello"</code> becomes <code>NaN</code>, and <code>"123"</code> becomes <code>123</code>, so the result is <code>true</code>, <code>false</code>.</p>`,
    },
    {
      id: "js-quiz-isnan-diff",
      q: "Which statement correctly describes the difference between isNaN() and Number.isNaN()?",
      options: [
        "Number.isNaN() converts strings to numbers first",
        "isNaN() performs type coercion, while Number.isNaN() checks whether the value is actually the numeric NaN",
        "isNaN() only works with strings",
        "Both perform exactly the same type coercion",
      ],
      correct: 1,
      notes: [
        "",
        "<p>Correct. Number.isNaN() does not coerce its argument.</p>",
        "",
        "",
      ],
      a: `<p><code>isNaN()</code> coerces its argument before checking. <code>Number.isNaN()</code> returns true only when the value is already the numeric <code>NaN</code>.</p>`,
    },
    {
      id: "js-quiz-isfinite-output",
      q: `What is the output?
console.log(isFinite(100)); console.log(isFinite(Infinity));
console.log(isFinite("100"));`,
      options: ["true, false, false", "true, false, true", "true, true, false", "false, false, true"],
      correct: 1,
      notes: [
        "",
        `<p>Correct. 100 is finite, Infinity is not finite, and global isFinite() coerces the string "100" into the number 100.</p>`,
        "",
        "",
      ],
      a: `<p><code>100</code> is finite, <code>Infinity</code> is not, and global <code>isFinite</code> coerces <code>"100"</code> to <code>100</code>, so the result is <code>true</code>, <code>false</code>, <code>true</code>.</p>`,
    },
    {
      id: "js-quiz-isfinite-diff",
      q: `What is the output?
console.log(isFinite("100"));
console.log(Number.isFinite("100"));`,
      options: ["false, false", "true, true", "true, false", "false, true"],
      correct: 2,
      notes: [
        "",
        "",
        "<p>Correct. Global isFinite() coerces the string, while Number.isFinite() requires the value itself to be a number.</p>",
        "",
      ],
      a: `<p>Global <code>isFinite</code> coerces <code>"100"</code> to a number and returns <code>true</code>. <code>Number.isFinite</code> requires the value itself to be a number, so it returns <code>false</code>.</p>`,
    },
    {
      id: "js-quiz-parseint-number",
      q: `What is the output?
console.log(parseInt("123px"));
console.log(Number("123px"));`,
      options: ["123, 123", "NaN, 123", "NaN, NaN", "123, NaN"],
      correct: 3,
      notes: [
        "",
        "",
        "",
        "<p>Correct. parseInt() reads the leading integer and stops at the non-numeric characters, while Number() cannot convert the entire string.</p>",
      ],
      a: `<p><code>parseInt("123px")</code> reads <code>123</code> and stops at <code>px</code>. <code>Number("123px")</code> cannot convert the whole string, so it returns <code>NaN</code>.</p>`,
    },
  ],
};

function authoredItem(entry) {
  const pairs = entry.options.map((option, index) => ({
    option,
    note: entry.notes?.[index] || "",
  }));
  const shuffled = shuffle(pairs);
  const correctText = entry.options[entry.correct];
  return {
    id: entry.id,
    q: entry.q,
    options: shuffled.map((pair) => pair.option),
    notes: shuffled.map((pair) => pair.note),
    correct: shuffled.findIndex((pair) => pair.option === correctText),
    ...(entry.a ? { a: entry.a } : {}),
  };
}

function sameOptions(item, bank) {
  if (item.q !== bank.q || !Array.isArray(item.options)) return false;
  if (item.options.length !== bank.options.length) return false;
  if (item.options[item.correct] !== bank.options[bank.correct]) return false;
  return [...item.options].sort().join("\n") === [...bank.options].sort().join("\n");
}

export function quizMatchesBank(quiz) {
  if (!quiz?.items) return false;
  if (quiz.bankVersion !== QUIZ_BANK_VERSION) return false;
  return quiz.items.every((item) => {
    const bank = QUIZ_BANK[item.id];
    if (bank) return sameOptions(item, bank);
    return true;
  });
}

export function buildQuizItems(questions, day) {
  const ids = buildQuizIds(questions, day);
  const choices = new Map(questions.map((item) => [item.id, answerChoice(item.a)]));
  const byId = new Map(questions.map((item) => [item.id, item]));
  const generated = ids.map((id) => {
    const bank = QUIZ_BANK[id];
    if (bank) return authoredItem({ id, ...bank });
    const current = byId.get(id);
    const correctText = choices.get(id);
    const ranked = questions
      .map((item) => ({ item, score: relatedness(current, item) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.id.localeCompare(b.item.id));
    const sameSection = questions.filter(
      (item) => item.id !== id && item.section && item.section === current.section
    );
    const pool = ranked.length
      ? shuffle(ranked.filter((entry) => entry.score === ranked[0].score)).concat(ranked)
      : shuffle(sameSection).map((item) => ({ item, score: 0 }));
    const distractors = [];
    for (const entry of pool) {
      if (distractors.length >= 3) break;
      const text = choices.get(entry.item.id);
      if (!text || text === correctText || distractors.includes(text)) continue;
      distractors.push(text);
    }
    const options = shuffle([correctText, ...distractors]);
    return { id, options, correct: options.indexOf(correctText) };
  });
  const extras = (DAY_QUIZ_EXTRAS[day] || []).map((entry) => authoredItem(entry));
  const pool = new Map();
  for (const item of [...generated, ...extras]) {
    if (!pool.has(item.id)) pool.set(item.id, item);
  }
  const order = DAY_QUIZ_ORDER[day] || [];
  const ordered = order.map((id) => pool.get(id)).filter(Boolean);
  const used = new Set(ordered.map((item) => item.id));
  const skipped = new Set([
    "js-coercion",
    "js-explicit-implicit",
    "js-truthy",
    "js-primitive-vs-non",
    "js-default-params",
    "js-symbol",
    "js-nullish",
    "js-logical-assignment",
    "js-threaded-async",
    "js-what-function",
    "js-array-methods",
    "js-first-class",
    "js-first-order",
    "js-higher-order",
    "js-unary",
    "js-currying-fn",
    "js-pure-function",
    "js-arrow",
    "js-anonymous",
    "js-callback",
    "js-iife",
    "js-template",
    "js-destructuring",
    "js-scope",
    "js-scope-types",
    "js-lexical-scope",
    "js-execution-context",
    "js-call-stack",
    "js-tdz",
    "js-closure",
    "js-memoization",
    "js-spread-rest",
    "js-shallow-deep-copy",
    "js-object-keys",
    "js-object-keys-values-entries",
    "js-object-assign",
    "js-copy-properties",
    "js-hoisting",
    "js-object-assign-uses",
    "js-object-create-vs-assign",
    "js-define-properties",
    "js-object-freeze",
    "js-freeze-vs-seal",
    "js-has-property",
  ]);
  const rest = dayQuestions(questions, day)
    .map((item) => pool.get(item.id))
    .filter((item) => item && !used.has(item.id) && !skipped.has(item.id));
  const items = [];
  const seen = new Set();
  for (const item of [...ordered, ...rest]) {
    if (items.length >= QUIZ_SIZE) break;
    if (!item || seen.has(item.id)) continue;
    seen.add(item.id);
    items.push(item);
  }
  return items;
}

export function buildQuizIds(questions, day) {
  const today = dayQuestions(questions, day);
  const earlier = questions.slice(0, (day - 1) * READ_PER_DAY);
  const ids = today.map((item) => item.id);
  for (const item of shuffle(earlier)) {
    if (ids.length >= QUIZ_SIZE) break;
    ids.push(item.id);
  }
  const extras = shuffle(today);
  let cursor = 0;
  while (ids.length < QUIZ_SIZE && extras.length) {
    ids.push(extras[cursor % extras.length].id);
    cursor += 1;
  }
  return shuffle(ids);
}

export function emptyPlan() {
  return { selectedDay: 1, read: {}, results: {}, activeQuiz: null };
}

function shuffle(list) {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}
