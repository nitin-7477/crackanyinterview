export const PLAN_TOPIC = "javascript";
export const PLAN_DAYS = 10;
export const READ_PER_DAY = 20;
export const QUIZ_SIZE = 40;
export const PASS_SCORE = 30;

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

export function orderForPlan(questions) {
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

export const QUIZ_BANK_VERSION = 15;

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
};

function authoredItem(entry) {
  const options = shuffle(entry.options);
  const correctText = entry.options[entry.correct];
  return {
    id: entry.id,
    q: entry.q,
    options,
    correct: options.indexOf(correctText),
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
  const skipped = new Set(["js-coercion", "js-explicit-implicit", "js-truthy", "js-primitive-vs-non"]);
  const rest = dayQuestions(questions, day)
    .map((item) => pool.get(item.id))
    .filter((item) => item && !used.has(item.id) && !skipped.has(item.id));
  const items = [...ordered];
  let cursor = 0;
  while (items.length < QUIZ_SIZE && rest.length) {
    items.push(rest[cursor % rest.length]);
    cursor += 1;
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
