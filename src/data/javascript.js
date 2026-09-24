export const javascript = {
  id: "javascript",
  title: "JavaScript",
  heading: "Core language",
  tagline: "Types, scope, async, and the runtime",
  lede: "Start here. Interviewers almost always begin with how JavaScript actually works before they ask about React.",
  tip: "Do not confuse JavaScript with Java — they are different languages. JavaScript runs in browsers and Node.js. Java is a compiled language used for enterprise and Android apps.",
  practice: {
    title: "Note",
    body: "Open DevTools (F12 → Console) and try these: (1) Type console.log('Your name') and press Enter. (2) Calculate your birth year: console.log(2026 - yourAge). (3) Combine text: console.log('Hello ' + 'World').",
  },
  takeaways: [
    "JavaScript is the programming language of the web and also runs on servers with Node.js.",
    "Prefer const, use let when a binding must change, and avoid var.",
    "=== compares type and value. == coerces types and is usually a trap.",
    "Async work is scheduled: Promises (microtasks) run before setTimeout (macrotasks).",
  ],
  sections: [
    {
      title: "Foundations",
      level: "basic",
      questions: [
        {
          id: "js-what",
          q: "What is JavaScript?",
          a: `<p>JavaScript is a programming language used to build interactive and dynamic applications. It is single-threaded and dynamically typed, and executes code synchronously by default. It also supports asynchronous operations using the event loop, callbacks, and Promises.</p>`,
        },
        {
          id: "js-features",
          q: "What are the features of JavaScript?",
          a: `<p>JavaScript is a flexible and easy-to-use programming language that is mainly used to add logic and interactivity to applications. It is dynamically typed and single-threaded, but it also supports asynchronous operations. It supports different programming styles like object-oriented and functional programming. Another important feature is that it can run in different environments, such as browsers, Node.js, and React Native.</p>`,
        },
        {
          id: "js-es6",
          q: "What are the major features introduced in ES6?",
          a: `<p>ES6 introduced several important features like <code>let</code> and <code>const</code>, arrow functions, template literals, destructuring, spread/rest operators, classes, Promises, modules, and <code>Map</code>/<code>Set</code>. These features made JavaScript code more modern, readable, and easier to manage.</p>`,
        },
        {
          id: "js-classes",
          q: "What are Classes in ES6?",
          a: `<p>Classes in ES6 provide a cleaner and easier way to create objects and implement object-oriented programming in JavaScript. A class acts like a blueprint for creating objects, and it can contain properties and methods. We use the constructor to initialize the object's properties.</p>
<pre><code>class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(\`Hello, \${this.name}\`);
  }
}

const user = new User("Nitin", 25);

user.greet(); // Hello, Nitin</code></pre>`,
        },
        {
          id: "js-default-params",
          q: "What are Default Parameters?",
          a: `<p>Default parameters allow us to provide a default value for a function parameter if no value or <code>undefined</code> is passed. They were introduced in ES6 and help us avoid writing extra checks for missing arguments.</p>
<pre><code>function greet(name = "Guest") {
  console.log(\`Hello, \${name}\`);
}

greet("Nitin"); // Hello, Nitin
greet();        // Hello, Guest</code></pre>`,
        },
        {
          id: "js-symbol",
          q: "What are Symbols in JavaScript?",
          a: `<p>Symbol is a primitive data type introduced in ES6 that is used to create unique values. Every Symbol is unique, even if two Symbols have the same description. They are commonly used as unique object property keys to avoid naming conflicts.</p>
<pre><code>const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2); // false</code></pre>
<p>For example:</p>
<pre><code>const user = {
  name: "Nitin",
  [id1]: 123
};

console.log(user[id1]); // 123</code></pre>`,
        },
        {
          id: "js-nullish",
          q: "What is the Nullish Coalescing Operator (??)?",
          a: `<p>The nullish coalescing operator (<code>??</code>) is used to provide a default value when the value on the left side is <code>null</code> or <code>undefined</code>. Unlike <code>||</code>, it does not treat values like <code>0</code>, <code>false</code>, or an empty string as missing.</p>
<pre><code>const name = null ?? "Guest";

console.log(name); // Guest</code></pre>
<p>Important difference from <code>||</code></p>
<pre><code>console.log(0 || 10);  // 10
console.log(0 ?? 10);  // 0

console.log(false || true); // true
console.log(false ?? true); // false</code></pre>`,
        },
        {
          id: "js-logical-assignment",
          q: "What are Logical Assignment Operators (&&=, ||=, ??=)?",
          a: `<p>Logical assignment operators combine a logical operator with assignment, so they allow us to assign a value only when a certain condition is met. They are basically a shorter way of writing common <code>if</code> conditions.</p>
<p><strong>1. <code>||=</code></strong> — assign if the value is falsy</p>
<pre><code>let name = "";

name ||= "Guest";

console.log(name); // Guest</code></pre>
<p>Equivalent to:</p>
<pre><code>if (!name) {
  name = "Guest";
}</code></pre>
<p><strong>2. <code>&amp;&amp;=</code></strong> — assign if the value is truthy</p>
<pre><code>let name = "Nitin";

name &amp;&amp;= "Rahul";

console.log(name); // Rahul</code></pre>
<p>Equivalent to:</p>
<pre><code>if (name) {
  name = "Rahul";
}</code></pre>
<p><strong>3. <code>??=</code></strong> — assign if the value is <code>null</code> or <code>undefined</code></p>
<pre><code>let name = null;

name ??= "Guest";

console.log(name); // Guest</code></pre>
<p>Equivalent to:</p>
<pre><code>if (name === null || name === undefined) {
  name = "Guest";
}</code></pre>`,
        },
        {
          id: "js-iterators",
          q: "What are Iterators?",
          a: `<p>An iterator is an object that allows us to access elements of a collection one at a time. It follows a standard <code>next()</code> method, which returns an object containing the current value and a <code>done</code> property that tells us whether there are more values left.</p>
<pre><code>const numbers = [10, 20, 30];

const iterator = numbers[Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }</code></pre>`,
        },
        {
          id: "js-symbol-iterator",
          q: "What is Symbol.iterator?",
          a: `<p><code>Symbol.iterator</code> is a built-in JavaScript symbol that defines how an object can be iterated, or gone through one value at a time. If an object has a <code>[Symbol.iterator]()</code> method, JavaScript considers it iterable and allows it to be used with <code>for...of</code>, spread syntax, and other iteration features.</p>
<pre><code>const numbers = [10, 20, 30];

const iterator = numbers[Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }</code></pre>
<p>Here, the array already has a <code>[Symbol.iterator]()</code> method, which returns an iterator.</p>
<p><strong>Real example with <code>for...of</code></strong></p>
<pre><code>const numbers = [10, 20, 30];

for (const number of numbers) {
  console.log(number);
}</code></pre>
<p>Behind the scenes, <code>for...of</code> uses the object's <code>Symbol.iterator</code> to get an iterator and retrieve values one by one.</p>`,
        },
        {
          id: "js-async-iterators",
          q: "What are Async Iterators?",
          a: `<p>Async iterators are used to process values that become available asynchronously, one at a time. Instead of the normal iterator's <code>next()</code> returning a value directly, an async iterator's <code>next()</code> returns a Promise. They are commonly used when working with data that arrives over time, such as API results, streams, or paginated data.</p>
<pre><code>const asyncIterator = {
  async *[Symbol.asyncIterator]() {
    yield 10;
    yield 20;
    yield 30;
  }
};

(async () => {
  for await (const value of asyncIterator) {
    console.log(value);
  }
})();</code></pre>`,
        },
        {
          id: "js-generators",
          q: "What are Generator Functions?",
          a: `<p>Generator functions are special functions that can pause their execution and resume it later. They are defined using the <code>function*</code> syntax and use the <code>yield</code> keyword to return values one at a time. When called, a generator function returns a generator object, which is an iterator.</p>
<pre><code>function* numbers() {
  yield 10;
  yield 20;
  yield 30;
}

const gen = numbers();

console.log(gen.next()); // { value: 10, done: false }
console.log(gen.next()); // { value: 20, done: false }
console.log(gen.next()); // { value: 30, done: false }
console.log(gen.next()); // { value: undefined, done: true }</code></pre>
<p><strong>Key point</strong></p>
<p>Unlike a normal function:</p>
<pre><code>function test() {
  return 10;
  return 20; // never reached
}</code></pre>
<p>A generator can pause at <code>yield</code> and continue from the same point when <code>next()</code> is called again.</p>`,
        },
        {
          id: "js-generators-work",
          q: "How do Generators Work?",
          a: `<p>A generator works by pausing and resuming its execution using the <code>yield</code> keyword. When we call a generator function, it doesn't execute immediately; instead, it returns a generator object. Each time we call <code>next()</code>, the function runs until it reaches the next <code>yield</code>, returns that value, and pauses there. The next <code>next()</code> call continues from where it stopped.</p>
<pre><code>function* numbers() {
  console.log("Start");

  yield 10;
  yield 20;

  console.log("End");
}

const gen = numbers();

console.log(gen.next()); // Start → { value: 10, done: false }
console.log(gen.next()); // { value: 20, done: false }
console.log(gen.next()); // End → { value: undefined, done: true }</code></pre>
<p><strong>Execution flow</strong></p>
<pre><code>numbers()
   ↓
Generator object created
   ↓
next()
   ↓
runs → yield 10 → pauses
   ↓
next()
   ↓
resumes → yield 20 → pauses
   ↓
next()
   ↓
resumes → function ends</code></pre>`,
        },
        {
          id: "js-regular-vs-async-generators",
          q: "What is the difference between Regular and Async Generators?",
          a: `<p>A regular generator produces values synchronously using <code>function*</code> and <code>yield</code>, while an async generator produces values asynchronously using <code>async function*</code> and <code>yield</code>. A regular generator uses <code>for...of</code>, whereas an async generator uses <code>for await...of</code>. In an async generator, <code>next()</code> returns a Promise, so it can work with asynchronous operations like API calls or streams.</p>
<p><strong>Regular Generator</strong></p>
<pre><code>function* numbers() {
  yield 10;
  yield 20;
}

const gen = numbers();

console.log(gen.next());
// { value: 10, done: false }</code></pre>
<p><strong>Async Generator</strong></p>
<pre><code>async function* numbers() {
  yield await Promise.resolve(10);
  yield await Promise.resolve(20);
}

(async () => {
  for await (const num of numbers()) {
    console.log(num);
  }
})();</code></pre>`,
        },
        {
          id: "js-threaded-async",
          q: "Is JavaScript single-threaded or multi-threaded, and is it sync or async?",
          a: `<p>JavaScript is single-threaded, meaning it has one main call stack where JavaScript code is executed. It is synchronous by default, so code normally runs one statement at a time. However, JavaScript can handle asynchronous operations using the runtime environment, event loop, callbacks, and Promises, which allows tasks like API calls and timers to run without blocking the main thread.</p>`,
        },
        {
          id: "js-variable",
          q: "What is a variable in JavaScript?",
          a: `<p>A variable is basically a named container used to store a value in JavaScript. We can use <code>var</code>, <code>let</code>, or <code>const</code> to declare variables. JavaScript is dynamically typed, so we don't need to specify the data type while declaring a variable.</p>
<pre><code>var city = "Delhi";
let name = "Nitin";
let age = 25;
const country = "India";

city = "Mumbai";     // allowed
name = "Aman";       // allowed
// country = "USA";  // TypeError — const cannot be reassigned</code></pre>`,
        },
        {
          id: "js-declare-init-assign",
          q: "What is a variable declaration, initialization, and assignment?",
          a: `<p>Think of it as creating a variable, giving it a value, and changing its value.</p>
<p><strong>1. Declaration</strong></p>
<p>Variable declaration is the process of creating a variable by specifying its name using <code>var</code>, <code>let</code>, or <code>const</code>.</p>
<pre><code>let name;</code></pre>
<p>Here, we have declared <code>name</code>, but haven't given it a value yet.</p>
<p><strong>2. Initialization</strong></p>
<p>Initialization means giving a variable its first value when we create it.</p>
<pre><code>let name = "Nitin";</code></pre>
<p>Here, <code>name</code> is declared and initialized with <code>"Nitin"</code>.</p>
<p><strong>3. Assignment</strong></p>
<p>Assignment means giving a new value to an already existing variable or changing its current value.</p>
<pre><code>let name = "Nitin"; // initialization

name = "Rahul";     // assignment</code></pre>`,
        },
        {
          id: "js-var-let-const",
          q: "What is var, let, and const, and what is the difference?",
          a: `<p><code>var</code>, <code>let</code>, and <code>const</code> are used to declare variables in JavaScript. The main difference is in their scope and whether you can redeclare or reassign them. <code>var</code> is function-scoped and can be redeclared, while <code>let</code> and <code>const</code> are block-scoped. With <code>let</code>, we can reassign the value, but with <code>const</code>, we cannot reassign the variable after initialization.</p>
<p class="table-label">Quick difference</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th></th>
        <th><code>var</code></th>
        <th><code>let</code></th>
        <th><code>const</code></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Scope</th>
        <td>Function</td>
        <td>Block</td>
        <td>Block</td>
      </tr>
      <tr>
        <th>Reassignment</th>
        <td><span class="yes">Yes</span></td>
        <td><span class="yes">Yes</span></td>
        <td><span class="no">No</span></td>
      </tr>
      <tr>
        <th>Redeclare</th>
        <td><span class="yes">Yes</span></td>
        <td><span class="no">No</span></td>
        <td><span class="no">No</span></td>
      </tr>
      <tr>
        <th>Must initialize</th>
        <td><span class="no">No</span></td>
        <td><span class="no">No</span></td>
        <td><span class="yes">Yes</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
        {
          id: "js-types",
          q: "What are JavaScript’s data types?",
          a: `<p>JavaScript has two categories of data types: primitive and non-primitive. Primitive types represent single values, while non-primitive types are reference-based and are used to store collections or more complex data.</p>
<p>JavaScript data types are broadly divided into two categories:</p>
<p><strong>1. Primitive Data Types</strong></p>
<ul>
<li><code>String</code></li>
<li><code>Number</code></li>
<li><code>Boolean</code></li>
<li><code>Undefined</code></li>
<li><code>Null</code></li>
<li><code>BigInt</code></li>
<li><code>Symbol</code></li>
</ul>
<p><strong>2. Non-Primitive (Reference) Data Types</strong></p>
<ul>
<li><code>Object</code></li>
<li><code>Array</code></li>
<li><code>Function</code></li>
<li><code>Date</code></li>
<li><code>Map</code></li>
<li><code>Set</code></li>
<li>and other objects</li>
</ul>`,
        },
        {
          id: "js-primitive-vs-non",
          q: "What is the difference between primitive and non-primitive data types?",
          a: `<p>Primitive data types represent a single value, like <code>string</code>, <code>number</code>, <code>boolean</code>, <code>undefined</code>, <code>null</code>, <code>symbol</code>, and <code>bigint</code>. Non-primitive types are used to store collections or more complex data, mainly objects, arrays, and functions. The main difference is that primitives are copied by their value, while non-primitives are handled through references.</p>`,
        },
        {
          id: "js-coercion",
          q: "What is Type Coercion?",
          a: `<p>Type coercion is when JavaScript automatically converts one data type into another while performing an operation. For example, when we add a number and a string, JavaScript may convert the number into a string. This can happen implicitly, or we can explicitly convert the type ourselves.</p>
<pre><code>let result = 5 + "10";
console.log(result); // "510"</code></pre>`,
        },
        {
          id: "js-eq",
          q: "What is the difference between == and ===?",
          a: `<p>The main difference is that <code>==</code> compares values after performing type conversion if needed, while <code>===</code> compares both the value and the data type without conversion. So <code>===</code> is generally preferred because it gives more predictable results.</p>
<pre><code>5 == "5"   // true
5 === "5"  // false</code></pre>`,
        },
        {
          id: "js-what-function",
          q: "What is a function in JavaScript?",
          a: `<p>A function is a reusable block of code that performs a specific task. We define a function once and can call it whenever we need that task, which helps us avoid repeating the same code. A function can also accept inputs called parameters and return a result.</p>
<pre><code>function add(a, b) {
  return a + b;
}

add(10, 20); // 30</code></pre>`,
        },
        {
          id: "js-truthy",
          q: "What are Truthy and Falsy values?",
          a: `<p>Truthy and falsy values are values that JavaScript treats as either true or false when used in a condition. Falsy values include <code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, and <code>NaN</code>. Almost everything else is considered truthy.</p>
<pre><code>if ("hello") {
  console.log("Truthy");
}</code></pre>`,
        },
        {
          id: "js-null",
          q: "What is null?",
          a: `<p>null represents an intentional absence of a value. We use it when we want to explicitly say that a variable currently has no value.</p>
<pre><code>let user = null;</code></pre>`,
        },
        {
          id: "js-undefined",
          q: "What is undefined?",
          a: `<p>undefined generally means a value has not been assigned yet. For example, when we declare a variable without assigning a value, its value is undefined.</p>
<pre><code>let name;
console.log(name); // undefined</code></pre>`,
        },
        {
          id: "js-nan",
          q: "What is NaN?",
          a: `<p>NaN stands for "Not a Number". It is a special numeric value that we get when a mathematical operation doesn't result in a valid number.</p>
<pre><code>let result = "hello" * 5;
console.log(result); // NaN</code></pre>`,
        },
        {
          id: "js-null-vs-undefined",
          q: "What is the difference between null and undefined?",
          a: `<p>undefined usually means a value has not been assigned, while null means we intentionally set the value to nothing. So, undefined is generally the absence of an assigned value, whereas null is an intentional empty value.</p>
<pre><code>let a;        // undefined
let b = null; // intentionally empty</code></pre>`,
        },
        {
          id: "js-array-methods",
          q: "What is the difference between map(), filter(), and reduce()?",
          a: `<p><code>map()</code> is used when we want to transform every element of an array and it returns a new array of the same length. <code>filter()</code> is used when we want to select specific elements based on a condition, so the resulting array can be smaller. <code>reduce()</code> is used when we want to combine all elements and produce a single final value, such as a sum, object, or array.</p>
<p><strong>map()</strong> — transform every element and return a new array of the same length.</p>
<pre><code>const numbers = [1, 2, 3, 4];

const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8]</code></pre>
<p><strong>filter()</strong> — select elements that pass a condition. The new array can be smaller.</p>
<pre><code>const numbers = [1, 2, 3, 4];

const even = numbers.filter(n => n % 2 === 0);
// [2, 4]</code></pre>
<p><strong>reduce()</strong> — combine all elements into one final value (sum, object, or array).</p>
<pre><code>const numbers = [1, 2, 3, 4];

const total = numbers.reduce((sum, n) => sum + n, 0);
// 10</code></pre>
<p>If you are not using the returned array, use <code>forEach</code> or <code>for...of</code> instead of <code>map</code>.</p>`,
        },
        {
          id: "js-first-class",
          q: "What is a first-class function?",
          a: `<p>In JavaScript, first-class functions (first-class citizens) mean that functions are treated like any other variable. That means:</p>
<ul>
<li>You can assign a function to a variable.</li>
<li>You can pass a function as an argument to another function.</li>
<li>You can return a function from another function.</li>
</ul>
<p>This capability enables powerful patterns like callbacks, higher-order functions, event handling, and functional programming in JavaScript.</p>`,
        },
        {
          id: "js-first-order",
          q: "What is a First-Order Function?",
          a: `<p>A first-order function is a function that does not take another function as an argument and does not return another function. It basically works with normal values like numbers, strings, or objects.</p>
<pre><code>function add(a, b) {
  return a + b;
}

add(10, 20);</code></pre>`,
        },
        {
          id: "js-higher-order",
          q: "What is a higher-order function?",
          a: `<p>A higher-order function is a function that either accepts another function as an argument, returns a function as its result, or both. This concept is a core part of JavaScript's functional programming capabilities and is widely used for creating modular, reusable, and expressive code.</p>
<p>The syntactic structure of a higher-order function will be explained with an example as follows:</p>
<pre><code>// First-order function (does not accept or return another function)
const firstOrderFunc = () =>
  console.log("Hello, I am a first-order function");

// Higher-order function (accepts a function as an argument)
const higherOrder = (callback) => callback();

// Passing the first-order function to the higher-order function
higherOrder(firstOrderFunc);</code></pre>
<p>In this example:</p>
<ul>
<li><code>firstOrderFunc</code> is a regular (first-order) function.</li>
<li><code>higherOrder</code> is a higher-order function because it takes another function as an argument.</li>
<li><code>firstOrderFunc</code> is also called a callback function because it is passed to and executed by another function.</li>
</ul>`,
        },
        {
          id: "js-unary",
          q: "What is a unary function?",
          a: `<p>A unary function (also known as a monadic function) is a function that accepts exactly one argument. The term "unary" simply refers to the function's arity—the number of arguments it takes.</p>
<p>Let us take an example of a unary function:</p>
<pre><code>const unaryFunction = (a) => console.log(a + 10); // This will add 10 to the input and log the result
unaryFunction(5); // Output: 15</code></pre>`,
        },
        {
          id: "js-currying-fn",
          q: "What is a currying function?",
          a: `<p>Currying is a functional programming technique in JavaScript where a function that accepts multiple arguments is transformed into a sequence of functions, with each function accepting one argument at a time.</p>
<pre><code>function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(add(10)(20)(30)); // 60</code></pre>
<p>The most important benefits to remember are reusability, partial application, function composition, and modularity.</p>`,
        },
        {
          id: "js-pure-function",
          q: "What is a Pure Function?",
          a: `<p>A pure function is a function that:</p>
<ul>
<li>Always returns the same output for the same input.</li>
<li>Does not cause any side effects — it doesn't modify anything outside the function.</li>
</ul>
<p>Example:</p>
<pre><code>function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5</code></pre>`,
        },
        {
          id: "js-arrow",
          q: "What is an Arrow Function?",
          a: `<p>An arrow function is a shorter way of writing a function in JavaScript, introduced in ES6. It provides a more concise syntax and, importantly, it does not have its own <code>this</code>; it uses <code>this</code> from its surrounding scope.</p>
<pre><code>const add = (a, b) => {
  return a + b;
};</code></pre>
<p>For a single expression, we can make it even shorter:</p>
<pre><code>const add = (a, b) => a + b;</code></pre>`,
        },
        {
          id: "js-anonymous",
          q: "What is an Anonymous Function?",
          a: `<p>An anonymous function is a function that doesn't have a name. We usually use it when we need a function for a short or specific purpose, such as passing it as a callback or assigning it to a variable.</p>
<pre><code>const greet = function () {
  console.log("Hello");
};</code></pre>
<p>Here, the function itself has no name, so it is an anonymous function.</p>
<p>Another common example:</p>
<pre><code>setTimeout(function () {
  console.log("Hello");
}, 1000);</code></pre>`,
        },
        {
          id: "js-callback",
          q: "What is a Callback Function?",
          a: `<p>A callback function is a function that we pass as an argument to another function, and the other function calls it when it needs to. It is commonly used for handling events and asynchronous operations.</p>
<pre><code>function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

function done() {
  console.log("Done!");
}

greet("Nitin", done);</code></pre>`,
        },
        {
          id: "js-iife",
          q: "What is an IIFE (Immediately Invoked Function Expression)?",
          a: `<p>IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined. The signature of it would be as below:</p>
<pre><code>(function () {
  // logic here
})();</code></pre>
<p>The primary reason to use an IIFE is to obtain data privacy because any variables declared within the IIFE cannot be accessed by the outside world. If you try to access variables from the IIFE then it throws an error as below:</p>
<pre><code>(function () {
  var message = "IIFE";
  console.log(message);
})();
console.log(message); // Error: message is not defined</code></pre>`,
        },
        {
          id: "js-template",
          q: "What are template literals?",
          a: `<p>Template literals use backticks and allow interpolation: <code>\`Hello, \${name}\`</code>. They also support multi-line strings.</p>`,
        },
        {
          id: "js-destructuring",
          q: "What is Destructuring in JavaScript?",
          a: `<p>Destructuring is a convenient way to extract values from an object or an array and store them in variables. It makes the code cleaner and avoids repeatedly accessing the object properties or array indexes.</p>
<p>Object destructuring:</p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};

const { name, age } = user;

console.log(name); // Nitin
console.log(age);  // 25</code></pre>
<p>Array destructuring:</p>
<pre><code>const numbers = [10, 20, 30];

const [first, second] = numbers;

console.log(first);  // 10
console.log(second); // 20</code></pre>`,
        },
      ],
    },
    {
      title: "Scope, this, and objects",
      level: "intermediate",
      questions: [
        {
          id: "js-scope",
          q: "What is Scope in JavaScript?",
          a: `<p>Scope defines where a variable can be accessed or used in our code. In simple words, it decides the visibility and accessibility of a variable. JavaScript mainly has global scope, function scope, and block scope.</p>
<pre><code>let name = "Nitin"; // Global scope

function greet() {
  let message = "Hello"; // Function scope
  console.log(name);     // Can access global variable
}</code></pre>`,
        },
        {
          id: "js-scope-types",
          q: "What are Global, Function, and Block Scope?",
          a: `<p>Global scope means a variable can be accessed from almost anywhere in the program. Function scope means a variable is accessible only inside the function where it is declared. Block scope means a variable is accessible only inside a block <code>{ }</code>, such as an <code>if</code> statement or a loop. <code>let</code> and <code>const</code> are block-scoped, while <code>var</code> is function-scoped.</p>
<pre><code>let a = 10; // Global scope

function test() {
  let b = 20; // Function scope

  if (true) {
    let c = 30; // Block scope
  }
}</code></pre>`,
        },
        {
          id: "js-lexical-scope",
          q: "What is Lexical Scope?",
          a: `<p>Lexical scope means that the scope of a variable is decided by where the variable is written in the code. A function can access variables from its own scope and from the outer scope where it was created. This is determined when the code is written, not when the function is called.</p>
<pre><code>let name = "Nitin";

function greet() {
  console.log(name);
}

greet(); // Nitin</code></pre>`,
        },
        {
          id: "js-execution-context",
          q: "What is Execution Context?",
          a: `<p>Execution context is the environment in which JavaScript code is executed. It keeps track of things like variables, functions, and the value of <code>this</code> that are available while the code is running. JavaScript creates a global execution context when the program starts and creates a function execution context whenever a function is called.</p>`,
        },
        {
          id: "js-call-stack",
          q: "What is the Call Stack?",
          a: `<p>The call stack is a mechanism in JavaScript that keeps track of the functions that are currently being executed. When a function is called, it is added to the top of the stack, and when it finishes, it is removed. Since JavaScript has a single call stack, it executes one function at a time.</p>
<pre><code>function first() {
  second();
}

function second() {
  console.log("Hello");
}

first();</code></pre>
<p>The execution is roughly:</p>
<pre><code>first() → second() → console.log() → back to second() → first()</code></pre>`,
        },
        {
          id: "js-hoisting",
          q: "What is hoisting and the temporal dead zone?",
          a: `<p>Hoisting is JavaScript's default behavior where variable and function declarations are moved to the top of their scope before code execution. This means you can access certain variables and functions even before they are defined in the code. However, the behavior is different for <code>var</code>, <code>let</code>, <code>const</code>, and function declarations.</p>
<p><code>var</code> bindings become <code>undefined</code>. Function declarations are fully available. <code>let</code> and <code>const</code> are hoisted but stay uninitialized until their line — that gap is the temporal dead zone. Accessing them early throws <code>ReferenceError</code>.</p>`,
        },
        {
          id: "js-tdz",
          q: "What is the Temporal Dead Zone (TDZ)?",
          a: `<p>The Temporal Dead Zone is the period between entering a scope and the point where a <code>let</code> or <code>const</code> variable is declared. During this time, the variable exists but cannot be accessed. If we try to access it before its declaration, JavaScript throws a <code>ReferenceError</code>.</p>
<pre><code>console.log(name); // ReferenceError

let name = "Nitin";</code></pre>`,
        },
        {
          id: "js-closure",
          q: "What is a closure?",
          a: `<p>A closure is a combination of a function and its lexical environment. It allows an inner function to remember and access variables from its outer scope, even after the outer function has finished executing. In simple words, a closure allows a function to "remember" the variables that were available when it was created.</p>
<pre><code>function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();

counter(); // 1
counter(); // 2</code></pre>
<p>Used for data privacy, partial application, React hooks, and event handlers. A common bug is creating closures in a loop with <code>var</code> so every callback shares one binding.</p>`,
        },
        {
          id: "js-memoization",
          q: "What is Memoization?",
          a: `<p>Memoization is an optimization technique where we store the result of a function so that if the same input is provided again, we can return the stored result instead of calculating it again. This can improve performance, especially for expensive or frequently repeated calculations.</p>
<pre><code>const cache = {};

function square(n) {
  if (cache[n]) {
    return cache[n];
  }

  const result = n * n;
  cache[n] = result;

  return result;
}

square(5); // calculates → 25
square(5); // returns cached result → 25</code></pre>`,
        },
        {
          id: "js-this",
          q: "What is this in JavaScript?",
          a: `<p><code>this</code> is a special keyword that refers to the value associated with the current execution context. For a regular function, the value of <code>this</code> is generally determined by how the function is called. Arrow functions don't have their own <code>this</code>; they inherit it lexically from their surrounding scope.</p>
<p>Inside a regular function, <code>this</code> also behaves differently in strict and non-strict mode. In strict mode, if <code>this</code> is <code>undefined</code> or <code>null</code>, it remains that way; in non-strict mode, it is substituted with the global object (<code>window</code> in browsers). This behavior is called <code>this</code> substitution.</p>
<p>Important points to remember:</p>
<ul>
<li>Regular function: <code>this</code> is generally determined at call time.</li>
<li>Arrow function: doesn't have its own <code>this</code>; it inherits <code>this</code> from the surrounding lexical scope.</li>
<li>Strict mode: a standalone regular function gets <code>this = undefined</code>.</li>
<li>Non-strict mode: a standalone regular function gets <code>this =</code> global object (<code>window</code> in browsers).</li>
<li><code>this</code> substitution: in non-strict mode, <code>null</code> or <code>undefined</code> used as <code>this</code> is converted to the global object.</li>
</ul>
<pre><code>"use strict";

function test() {
  console.log(this);
}

test(); // undefined</code></pre>
<p>Without strict mode:</p>
<pre><code>function test() {
  console.log(this);
}

test(); // window (in a browser)</code></pre>
<p>Also: in a method, <code>this</code> is the object before the dot; with <code>new</code> it is the new instance; with <code>call</code>/<code>apply</code>/<code>bind</code> it is the value you pass. Losing <code>this</code> in callbacks is a classic follow-up — fix it with an arrow, <code>bind</code>, or by not using <code>this</code>.</p>`,
        },
        {
          id: "js-call",
          q: "What is call() in JavaScript?",
          a: `<p><code>call()</code>, <code>apply()</code>, and <code>bind()</code> are all used to control the value of <code>this</code> when calling a function.</p>
<p><code>call()</code> immediately calls the function and lets us set what <code>this</code> should refer to. Arguments are passed individually.</p>
<pre><code>const user = {
  name: "Nitin"
};

function greet(age) {
  console.log(this.name, age);
}

greet.call(user, 25);
// Nitin 25</code></pre>
<p>Here, <code>this</code> inside <code>greet()</code> refers to <code>user</code>.</p>`,
        },
        {
          id: "js-apply",
          q: "What is apply() in JavaScript?",
          a: `<p><code>apply()</code> works almost exactly like <code>call()</code>, but the arguments are passed as an array.</p>
<pre><code>const user = {
  name: "Nitin"
};

function greet(age, city) {
  console.log(this.name, age, city);
}

greet.apply(user, [25, "Delhi"]);
// Nitin 25 Delhi</code></pre>
<p>Main difference:</p>
<pre><code>call(user, 25, "Delhi");

apply(user, [25, "Delhi"]);</code></pre>`,
        },
        {
          id: "js-bind",
          q: "What is bind() in JavaScript?",
          a: `<p><code>bind()</code> doesn't immediately call the function. Instead, it creates a new function with <code>this</code> permanently set to the object we provide.</p>
<pre><code>const user = {
  name: "Nitin"
};

function greet() {
  console.log(this.name);
}

const newGreet = greet.bind(user);

newGreet();
// Nitin</code></pre>`,
        },
        {
          id: "js-constructor",
          q: "What is a Constructor in JavaScript?",
          a: `<p>A constructor is a special method used to initialize an object when we create a new instance of a class. It is automatically called when we use the <code>new</code> keyword, and we commonly use it to set the initial values of the object's properties.</p>
<pre><code>class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const user1 = new User("Nitin", 25);

console.log(user1.name); // Nitin</code></pre>
<p>Here, <code>constructor()</code> is automatically called when we do <code>new User()</code> and initializes <code>name</code> and <code>age</code>.</p>`,
        },
        {
          id: "js-prototype",
          q: "What is Prototypal Inheritance?",
          a: `<p>Prototypal inheritance is the mechanism JavaScript uses for objects to inherit properties and methods from another object. Every JavaScript object has a hidden link to another object called its prototype. If a property or method isn't found on the object itself, JavaScript looks for it in the prototype chain.</p>
<pre><code>const user = {
  greet() {
    console.log("Hello");
  }
};

const person = Object.create(user);

person.greet(); // Hello</code></pre>
<p>Here, <code>person</code> doesn't have its own <code>greet()</code> method, so JavaScript finds it in its prototype (<code>user</code>).</p>
<p><code>class</code> syntax is sugar over the same prototype model. Constructors put shared methods on <code>Fn.prototype</code> so instances share one function instead of copying it.</p>`,
        },
        {
          id: "js-prototype-chain",
          q: "What is the Prototype Chain?",
          a: `<p>The prototype chain is the mechanism JavaScript uses to look for a property or method when it can't find it directly on an object. JavaScript first checks the object itself, then its prototype, then the prototype's prototype, and continues until it reaches <code>null</code>. This chain of objects is called the prototype chain.</p>
<pre><code>const user = {
  greet() {
    console.log("Hello");
  }
};

const person = Object.create(user);

person.greet();</code></pre>
<p>Here, JavaScript looks like this:</p>
<pre><code>person
  ↓
user
  ↓
Object.prototype
  ↓
null</code></pre>
<p>Since <code>person</code> doesn't have <code>greet()</code>, JavaScript finds it in <code>user</code>.</p>`,
        },
        {
          id: "js-spread-rest",
          q: "What are Spread and Rest Operators?",
          a: `<p>Both use the <code>...</code> syntax, but they are used for different purposes. The spread operator is used to expand or unpack values from an array or object. The rest operator is used to collect multiple values into a single array or object.</p>
<p><strong>Spread</strong> — Expand</p>
<pre><code>const numbers = [1, 2, 3];

const newNumbers = [...numbers, 4, 5];

console.log(newNumbers);
// [1, 2, 3, 4, 5]</code></pre>
<p>Here, <code>...numbers</code> spreads/unpacks the values.</p>
<p><strong>Rest</strong> — Collect</p>
<pre><code>function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(10, 20, 30);
// 60</code></pre>
<p>Here, <code>...numbers</code> collects all the arguments into an array.</p>`,
        },
        {
          id: "js-shallow-deep-copy",
          q: "What is Shallow Copy vs Deep Copy?",
          a: `<p>A shallow copy creates a new object, but nested objects or arrays are still shared by reference with the original object. A deep copy creates a completely independent copy, including all nested objects and arrays. So, changing a nested value in a shallow copy can affect the original, while a deep copy won't.</p>
<p><strong>Shallow Copy</strong></p>
<pre><code>const user = {
  name: "Nitin",
  address: {
    city: "Delhi"
  }
};

const copy = { ...user };

copy.address.city = "Mumbai";

console.log(user.address.city);
// Mumbai</code></pre>
<p>Because <code>address</code> is still shared by reference.</p>
<p><strong>Deep Copy</strong></p>
<pre><code>const copy = structuredClone(user);

copy.address.city = "Mumbai";

console.log(user.address.city);
// Delhi</code></pre>
<p>Here, the nested object is also copied, so the original isn't affected.</p>`,
        },
        {
          id: "js-object-keys",
          q: "How do you get the keys of an object?",
          a: `<p>We can use <code>Object.keys()</code> to get all the own enumerable property names of an object. It returns the keys as an array of strings.</p>
<pre><code>const user = {
  name: "Nitin",
  age: 25,
  city: "Delhi"
};

console.log(Object.keys(user));
// ["name", "age", "city"]</code></pre>
<p><strong>Interview point</strong></p>
<p><code>Object.keys()</code> only returns the object's own enumerable keys; it does not include inherited properties.</p>
<p>Easy way to remember:</p>
<pre><code>Object.keys()    → keys
Object.values()  → values
Object.entries() → key-value pairs</code></pre>`,
        },
        {
          id: "js-object-keys-values-entries",
          q: "What is the difference between Object.keys(), Object.values(), and Object.entries()?",
          a: `<p>All three methods are used to extract information from an object. <code>Object.keys()</code> returns the keys, <code>Object.values()</code> returns the values, and <code>Object.entries()</code> returns the key-value pairs as arrays.</p>
<pre><code>const user = {
  name: "Nitin",
  age: 25,
  city: "Delhi"
};

console.log(Object.keys(user));
// ["name", "age", "city"]

console.log(Object.values(user));
// ["Nitin", 25, "Delhi"]

console.log(Object.entries(user));
// [["name", "Nitin"], ["age", 25], ["city", "Delhi"]]</code></pre>`,
        },
        {
          id: "js-object-assign",
          q: "What is Object.assign()?",
          a: `<p><code>Object.assign()</code> is used to copy properties from one or more source objects into a target object. It modifies and returns the target object. It performs a shallow copy, so nested objects are still shared by reference.</p>
<pre><code>const user = {
  name: "Nitin"
};

const details = {
  age: 25,
  city: "Delhi"
};

Object.assign(user, details);

console.log(user);
// { name: "Nitin", age: 25, city: "Delhi" }</code></pre>`,
        },
        {
          id: "js-object-assign-uses",
          q: "What are the applications of Object.assign()?",
          a: `<p>Common uses are:</p>
<p><strong>1. Merging objects</strong></p>
<pre><code>const user = { name: "Nitin" };
const details = { age: 25 };

const result = Object.assign({}, user, details);

console.log(result);
// { name: "Nitin", age: 25 }</code></pre>
<p><strong>2. Creating a shallow copy</strong></p>
<pre><code>const user = { name: "Nitin", age: 25 };

const copy = Object.assign({}, user);</code></pre>
<p><strong>3. Updating/overwriting properties</strong></p>
<pre><code>const user = { name: "Nitin", age: 25 };

Object.assign(user, { age: 26 });

console.log(user);
// { name: "Nitin", age: 26 }</code></pre>`,
        },
        {
          id: "js-object-create-vs-assign",
          q: "What is the difference between Object.create() and Object.assign()?",
          a: `<p><code>Object.create()</code> creates a new object and sets the given object as its prototype. On the other hand, <code>Object.assign()</code> copies properties from one or more objects into a target object. So, <code>Object.create()</code> is mainly related to prototypal inheritance, while <code>Object.assign()</code> is mainly used for copying or merging properties.</p>`,
        },
        {
          id: "js-copy-properties",
          q: "How do you copy properties from one object to another?",
          a: `<p>There are several ways to copy properties from one object to another, but the most common are the spread operator and <code>Object.assign()</code>. Both perform a shallow copy, meaning nested objects are still shared by reference.</p>
<p><strong>1. Using the spread operator — most common</strong></p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};

const copy = { ...user };

console.log(copy);
// { name: "Nitin", age: 25 }</code></pre>
<p><strong>2. Using <code>Object.assign()</code></strong></p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};

const copy = Object.assign({}, user);

console.log(copy);
// { name: "Nitin", age: 25 }</code></pre>
<p><strong>3. Copying into an existing object</strong></p>
<pre><code>const user = { name: "Nitin" };
const details = { age: 25 };

Object.assign(user, details);

console.log(user);
// { name: "Nitin", age: 25 }</code></pre>`,
        },
        {
          id: "js-define-properties",
          q: "How do you define multiple properties on an object?",
          a: `<p>We can use <code>Object.defineProperties()</code> to define multiple properties on an object at once. It allows us to specify not only the property values but also descriptors like <code>writable</code>, <code>enumerable</code>, and <code>configurable</code>.</p>
<pre><code>const user = {};

Object.defineProperties(user, {
  name: {
    value: "Nitin",
    writable: true,
    enumerable: true
  },
  age: {
    value: 25,
    writable: false,
    enumerable: true
  }
});

console.log(user);
// { name: "Nitin", age: 25 }</code></pre>`,
        },
        {
          id: "js-object-freeze",
          q: "What is Object.freeze()?",
          a: `<p><code>Object.freeze()</code> is used to make an object immutable at the top level. Once an object is frozen, we cannot add, remove, or modify its existing properties. It also makes the object's properties non-writable and non-configurable.</p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};

Object.freeze(user);

user.name = "Rahul";
user.age = 30;
user.city = "Delhi";
delete user.age;

console.log(user);
// { name: "Nitin", age: 25 }</code></pre>
<p>The changes don't take effect.</p>`,
        },
        {
          id: "js-freeze-vs-seal",
          q: "What is the difference between Object.freeze() and Object.seal()?",
          a: `<p>Both prevent adding and deleting properties from an object, but <code>freeze()</code> also prevents modifying existing properties, while <code>seal()</code> still allows existing properties to be modified. Both are shallow operations.</p>
<p><strong><code>Object.seal()</code></strong></p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};

Object.seal(user);

user.name = "Rahul"; // ✅ Allowed
user.city = "Delhi"; // ❌ Not allowed
delete user.age;     // ❌ Not allowed

console.log(user);
// { name: "Rahul", age: 25 }</code></pre>
<p><strong><code>Object.freeze()</code></strong></p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};

Object.freeze(user);

user.name = "Rahul"; // ❌ Not allowed
user.city = "Delhi"; // ❌ Not allowed
delete user.age;     // ❌ Not allowed</code></pre>`,
        },
        {
          id: "js-has-property",
          q: "How do you check whether an object has a particular property?",
          a: `<p>We can use the <code>hasOwnProperty()</code> method or the <code>in</code> operator to check whether a property exists. If we specifically want to check whether the property belongs directly to the object, <code>Object.hasOwn()</code> is a modern and safer option.</p>
<p><strong>1. Using <code>Object.hasOwn()</code> — recommended</strong></p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};

console.log(Object.hasOwn(user, "name")); // true
console.log(Object.hasOwn(user, "city")); // false</code></pre>
<p><strong>2. Using <code>hasOwnProperty()</code></strong></p>
<pre><code>console.log(user.hasOwnProperty("name")); // true</code></pre>
<p><strong>3. Using <code>in</code></strong></p>
<pre><code>console.log("name" in user); // true</code></pre>
<p>The important difference is that <code>in</code> also checks the prototype chain, while <code>Object.hasOwn()</code> checks only the object's own properties.</p>`,
        },
        {
          id: "js-property-shadowing",
          q: "What is Property Shadowing?",
          a: `<p>Property shadowing happens when an object has its own property with the same name as a property inherited from its prototype. The object's own property takes priority, so it shadows the prototype property.</p>
<pre><code>const parent = {
  name: "Parent"
};

const child = Object.create(parent);

child.name = "Child";

console.log(child.name); // Child</code></pre>
<p>Here, <code>child</code> inherits <code>name</code> from <code>parent</code>, but <code>child.name</code> has its own <code>name</code>, so it shadows the inherited property.</p>
<p>Easy way to remember:</p>
<p>Shadowing = an object's own property hides an inherited property with the same name.</p>`,
        },
        {
          id: "js-illegal-shadowing",
          q: "What is Illegal Shadowing?",
          a: `<p>Illegal shadowing happens when a <code>let</code> or <code>const</code> variable tries to shadow a <code>let</code> or <code>const</code> variable in a way that JavaScript does not allow, usually when the inner declaration uses <code>var</code> against an outer lexical declaration in the same applicable scope.</p>
<p>The classic example is:</p>
<pre><code>let name = "Nitin";

{
  var name = "Rahul"; // ❌ SyntaxError
}</code></pre>
<p>Why?</p>
<p>Because <code>var</code> is function-scoped, so the <code>var name</code> conflicts with the existing <code>let name</code> in the same function or global scope.</p>
<p>But this is valid:</p>
<pre><code>let name = "Nitin";

{
  let name = "Rahul"; // ✅ Valid
  console.log(name);  // Rahul
}

console.log(name); // Nitin</code></pre>`,
        },
        {
          id: "js-computed-property",
          q: "What is Computed Property Syntax?",
          a: `<p>Computed property syntax allows us to use an expression or variable as the property name of an object. We use square brackets <code>[]</code> to tell JavaScript to evaluate the expression and use its result as the property name.</p>
<pre><code>const key = "name";

const user = {
  [key]: "Nitin"
};

console.log(user);
// { name: "Nitin" }</code></pre>
<p>Here, JavaScript evaluates <code>[key]</code> and uses its value <code>"name"</code> as the property name.</p>
<p><strong>Real use case</strong></p>
<pre><code>const property = "age";
const value = 25;

const user = {
  [property]: value
};

console.log(user.age); // 25</code></pre>`,
        },
        {
          id: "js-typeof",
          q: "What is the typeof operator?",
          a: `<p><code>typeof</code> is a JavaScript operator used to check the data type of a value or variable. It returns the type as a string, such as <code>"string"</code>, <code>"number"</code>, <code>"boolean"</code>, <code>"object"</code>, or <code>"undefined"</code>.</p>`,
        },
        {
          id: "js-typeof-null",
          q: 'Why does typeof null return "object"?',
          a: `<p><code>typeof null</code> returns <code>"object"</code> due to a historical bug in JavaScript's early implementation. It was kept for backward compatibility, so even today <code>null</code> is reported as <code>"object"</code> by <code>typeof</code>.</p>`,
        },
        {
          id: "js-delete",
          q: "What is the delete operator?",
          a: `<p>The <code>delete</code> operator is used to remove a property from an object. It returns <code>true</code> if the property is successfully deleted and <code>false</code> in certain cases where it cannot be deleted.</p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};

delete user.age;

console.log(user);
// { name: "Nitin" }</code></pre>`,
        },
        {
          id: "js-unary-operator",
          q: "What is a Unary Operator?",
          a: `<p>A unary operator is an operator that works on only one operand (one value). It is used to perform operations such as changing a value, checking its type, or converting it to another type.</p>
<p><strong>Examples</strong></p>
<pre><code>let x = 10;

console.log(-x);       // -10
console.log(+x);       // 10
console.log(typeof x); // "number"
console.log(!x);       // false</code></pre>
<p>Here, <code>-</code>, <code>+</code>, <code>typeof</code>, and <code>!</code> are examples of unary operators because they operate on one value.</p>
<p>Another common example:</p>
<pre><code>let x = 5;

x++; // 6
x--; // 5</code></pre>`,
        },
        {
          id: "js-double-bang",
          q: "What is the double exclamation (!!) operator?",
          a: `<p><code>!!</code> is a simple way to explicitly convert any value into a boolean (<code>true</code> or <code>false</code>). It works by applying the logical NOT operator <code>!</code> twice.</p>`,
        },
        {
          id: "js-double-bang-how",
          q: "How does !! convert a value to boolean?",
          a: `<p>The first <code>!</code> converts the value to a boolean and reverses it. The second <code>!</code> reverses it again, giving the original truthiness as a boolean.</p>`,
        },
        {
          id: "js-explicit-implicit",
          q: "What is Explicit vs Implicit Type Conversion?",
          a: `<p>Implicit conversion happens automatically by JavaScript, while explicit conversion is done intentionally by the developer using methods or operators.</p>
<p><strong>Implicit</strong></p>
<pre><code>const result = "10" - 5;

console.log(result); // 5</code></pre>
<p>JavaScript automatically converts <code>"10"</code> from a string to a number.</p>
<p><strong>Explicit</strong></p>
<pre><code>const value = "10";

const number = Number(value);

console.log(number); // 10</code></pre>
<p>Here, we explicitly tell JavaScript to convert the string into a number.</p>`,
        },
        {
          id: "js-isnan",
          q: "What is isNaN()?",
          a: `<p><code>isNaN()</code> is a global function used to check whether a value is <code>NaN</code> (Not-a-Number). However, before checking, it converts the value to a number, which can sometimes give unexpected results.</p>
<pre><code>isNaN(10);       // false
isNaN("10");     // false
isNaN("Hello");  // true
isNaN("10abc");  // true</code></pre>`,
        },
        {
          id: "js-isnan-vs-number-isnan",
          q: "What is the difference between isNaN() and Number.isNaN()?",
          a: `<p>The main difference is that <code>isNaN()</code> performs type conversion before checking, while <code>Number.isNaN()</code> checks strictly whether the value is actually the <code>NaN</code> value.</p>
<pre><code>console.log(isNaN("Hello"));        // true
console.log(Number.isNaN("Hello")); // false</code></pre>
<p>Why?</p>
<pre><code>isNaN("Hello")
→ converts "Hello" to NaN
→ true

Number.isNaN("Hello")
→ "Hello" is a string, not NaN
→ false</code></pre>`,
        },
        {
          id: "js-isfinite",
          q: "What is isFinite()?",
          a: `<p><code>isFinite()</code> is a global function used to check whether a value is a finite number. Before checking, it converts the value to a number, similar to the global <code>isNaN()</code> function.</p>
<pre><code>console.log(isFinite(100));      // true
console.log(isFinite(Infinity)); // false
console.log(isFinite(NaN));      // false
console.log(isFinite("100"));    // true
console.log(isFinite("Hello"));  // false</code></pre>
<p>For example:</p>
<pre><code>isFinite("100");
// "100" → 100
// 100 is finite → true</code></pre>`,
        },
        {
          id: "js-isfinite-vs-number-isfinite",
          q: "What is the difference between isFinite() and Number.isFinite()?",
          a: `<p>The main difference is that <code>isFinite()</code> performs type conversion before checking, while <code>Number.isFinite()</code> does not. <code>Number.isFinite()</code> returns <code>true</code> only when the value is actually a finite number.</p>
<pre><code>console.log(isFinite("100"));        // true
console.log(Number.isFinite("100")); // false</code></pre>
<p>Why?</p>
<pre><code>isFinite("100")
→ converts "100" to 100
→ true

Number.isFinite("100")
→ "100" is a string
→ false</code></pre>`,
        },
        {
          id: "js-parseint-vs-number",
          q: "What is the difference between parseInt() and Number()?",
          a: `<p>Both are used to convert values into numbers, but they behave differently. <code>parseInt()</code> parses a string and returns an integer, stopping when it encounters an invalid character. <code>Number()</code> tries to convert the entire value into a number, including decimals.</p>
<p><strong>Example</strong></p>
<pre><code>console.log(parseInt("10px")); // 10
console.log(Number("10px"));   // NaN</code></pre>
<p><code>parseInt()</code> stops when it reaches <code>p</code>, while <code>Number()</code> expects the whole string to represent a valid number.</p>
<p><strong>Decimal example</strong></p>
<pre><code>console.log(parseInt("10.75")); // 10
console.log(Number("10.75"));   // 10.75</code></pre>
<p><strong>Another important difference</strong></p>
<pre><code>console.log(parseInt("")); // NaN
console.log(Number(""));   // 0</code></pre>`,
        },
        {
          id: "js-parsefloat-vs-number",
          q: "What is the difference between parseFloat() and Number()?",
          a: `<p>Both are used to convert values into numbers, but <code>parseFloat()</code> parses a string and extracts a decimal number from the beginning, while <code>Number()</code> tries to convert the entire value into a number. <code>parseFloat()</code> can stop when it reaches an invalid character, whereas <code>Number()</code> returns <code>NaN</code> if the complete value isn't a valid number.</p>`,
        },
        {
          id: "js-dom",
          q: "What is the DOM?",
          a: `<p>DOM stands for Document Object Model. It is a representation of an HTML document as a tree of objects, which JavaScript can use to access and modify the webpage. We can use the DOM to change elements, content, styles, attributes, and handle events dynamically.</p>`,
        },
        {
          id: "js-events",
          q: "What are Events in JavaScript?",
          a: `<p>Events are actions or occurrences that happen in a webpage, such as a user clicking a button, typing in an input, submitting a form, or the page loading. JavaScript can listen for these events and execute a function when they occur.</p>
<p><strong>Common events</strong></p>
<pre><code>click     → user clicks an element
input     → user types in an input
submit    → form is submitted
keydown   → keyboard key is pressed
mouseover → mouse moves over an element
load      → page/resource finishes loading</code></pre>`,
        },
        {
          id: "js-event-queue",
          q: "What is the Event Queue?",
          a: `<p>The event queue is a queue where callback functions wait until the call stack becomes empty. When an asynchronous operation finishes, its callback is placed in the appropriate queue, and the event loop takes it from the queue and pushes it onto the call stack for execution.</p>`,
        },
        {
          id: "js-event-vs-microtask-queue",
          q: "What is the difference between the Event Queue and Microtask Queue?",
          a: `<p>Both queues store callbacks waiting to be executed, but microtasks have higher priority. After the current synchronous code finishes, JavaScript processes all microtasks first, and only then takes a task from the event/task queue.</p>`,
        },
        {
          id: "js-settimeout",
          q: "What is setTimeout()?",
          a: `<p><code>setTimeout()</code> is used to execute a function once after a specified delay.</p>
<pre><code>setTimeout(() => {
  console.log("Hello");
}, 2000);</code></pre>
<p>Runs once after at least 2 seconds.</p>`,
        },
        {
          id: "js-setinterval",
          q: "What is setInterval()?",
          a: `<p><code>setInterval()</code> is used to repeatedly execute a function after a specified time interval until it is stopped.</p>
<pre><code>setInterval(() => {
  console.log("Hello");
}, 2000);</code></pre>
<p>Runs approximately every 2 seconds.</p>`,
        },
        {
          id: "js-cleartimeout",
          q: "What is clearTimeout()?",
          a: `<p><code>clearTimeout()</code> is used to cancel a <code>setTimeout()</code> before it executes.</p>
<pre><code>const timer = setTimeout(() => {
  console.log("Hello");
}, 2000);

clearTimeout(timer);</code></pre>`,
        },
        {
          id: "js-clearinterval",
          q: "What is clearInterval()?",
          a: `<p><code>clearInterval()</code> is used to stop a <code>setInterval()</code> from running repeatedly.</p>
<pre><code>const timer = setInterval(() => {
  console.log("Hello");
}, 2000);

clearInterval(timer);</code></pre>`,
        },
        {
          id: "js-request-animation-frame",
          q: "What is requestAnimationFrame()?",
          a: `<p><code>requestAnimationFrame()</code> is a browser API used to run a function before the browser's next screen repaint. It is mainly used for smooth animations because the browser schedules the callback at the appropriate time for rendering.</p>
<pre><code>function animate() {
  console.log("Animation frame");
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);</code></pre>
<p><strong>Important point</strong></p>
<p>Unlike <code>setInterval()</code>, you don't specify a fixed time interval. The browser decides when to run it based on the screen's refresh rate.</p>`,
        },
        {
          id: "js-local-storage",
          q: "What is localStorage?",
          a: `<p><code>localStorage</code> is a browser storage mechanism used to store data as key-value pairs. The data remains stored even after the browser or tab is closed, until we manually remove it.</p>
<pre><code>localStorage.setItem("name", "Nitin");

localStorage.getItem("name"); // "Nitin"

localStorage.removeItem("name");</code></pre>`,
        },
        {
          id: "js-session-storage",
          q: "What is sessionStorage?",
          a: `<p><code>sessionStorage</code> is also used to store key-value data, but the data is available only for the current browser tab/session. It is cleared when that tab or window is closed.</p>
<pre><code>sessionStorage.setItem("userId", "123");

sessionStorage.getItem("userId"); // "123"</code></pre>`,
        },
        {
          id: "js-cookie",
          q: "What is a Cookie?",
          a: `<p>A cookie is a small piece of data stored by the browser that can be sent to the server with HTTP requests. Cookies are commonly used for authentication, sessions, and user preferences. They can also have settings like <code>HttpOnly</code>, <code>Secure</code>, and <code>SameSite</code>.</p>
<pre><code>document.cookie = "theme=dark";</code></pre>`,
        },
        {
          id: "js-storage-difference",
          q: "What is the difference between localStorage, sessionStorage, and Cookies?",
          a: `<p class="table-label">Difference</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th><code>localStorage</code></th>
        <th><code>sessionStorage</code></th>
        <th>Cookies</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Lifetime</td>
        <td>Until manually removed</td>
        <td>Until tab is closed</td>
        <td>Depends on expiry</td>
      </tr>
      <tr>
        <td>Sent to server automatically</td>
        <td>❌ No</td>
        <td>❌ No</td>
        <td>✅ Yes</td>
      </tr>
      <tr>
        <td>Storage size</td>
        <td>Larger</td>
        <td>Larger</td>
        <td>Small (~4 KB each)</td>
      </tr>
      <tr>
        <td>Accessible from JS</td>
        <td>✅ Yes</td>
        <td>✅ Yes</td>
        <td>✅ Usually*</td>
      </tr>
      <tr>
        <td>Common use</td>
        <td>Persistent client data</td>
        <td>Temporary tab data</td>
        <td>Sessions, auth, preferences</td>
      </tr>
    </tbody>
  </table>
</div>
<p>*Cookies marked <code>HttpOnly</code> cannot be accessed by JavaScript.</p>`,
        },
        {
          id: "js-window-vs-document",
          q: "What is the difference between window and document?",
          a: `<p><code>window</code> represents the entire browser window, while <code>document</code> represents the HTML page loaded inside that window. <code>window</code> provides browser-related features like URL, timers, and screen information, whereas <code>document</code> is used to access and manipulate HTML elements.</p>`,
        },
        {
          id: "js-global-this",
          q: "What is globalThis?",
          a: `<p><code>globalThis</code> is a standard way to access the global object in JavaScript, regardless of the environment. It works consistently in browsers, Node.js, and other JavaScript environments.</p>`,
        },
        {
          id: "js-mutation-observer",
          q: "What is the MutationObserver API?",
          a: `<p><code>MutationObserver</code> is a browser API used to watch for changes in the DOM, such as adding or removing elements, changing attributes, or modifying text content. It automatically calls a callback whenever the observed DOM changes.</p>`,
        },
        {
          id: "js-abort-controller",
          q: "What is the AbortController API?",
          a: `<p><code>AbortController</code> is a browser API used to cancel an ongoing asynchronous operation, such as a <code>fetch()</code> request. We create an <code>AbortController</code>, pass its signal to the operation, and call <code>abort()</code> when we want to cancel it.</p>
<pre><code>const controller = new AbortController();

fetch("/api/users", {
  signal: controller.signal
});

// Cancel the request
controller.abort();</code></pre>`,
        },
        {
          id: "js-remove-listeners",
          q: "Why is it important to remove event listeners after use?",
          a: `<p>We remove event listeners when they are no longer needed to prevent unnecessary function calls and memory usage. If a listener remains attached, it may continue running even when the related component or element is no longer needed. This can cause memory leaks, performance issues, or unexpected behavior.</p>`,
        },
        {
          id: "js-callback-hell",
          q: "What is Callback Hell and how to avoid it?",
          a: `<p>Callback hell happens when multiple asynchronous operations are nested inside each other's callbacks, making the code difficult to read, maintain, and debug. It is also commonly called the "Pyramid of Doom" because the code starts moving deeper and deeper to the right.</p>
<pre><code>getUser((user) => {
  getOrders(user, (orders) => {
    getPayment(orders, (payment) => {
      sendEmail(payment, () => {
        console.log("Done");
      });
    });
  });
});</code></pre>
<p>As more asynchronous operations are added, the nesting becomes harder to manage.</p>
<p><strong>How to avoid it?</strong></p>
<p>We can use:</p>
<ul>
<li>Promises</li>
<li>Promise chaining</li>
<li><code>async</code>/<code>await</code></li>
</ul>`,
        },
        {
          id: "js-promise-chaining",
          q: "What is Promise Chaining?",
          a: `<p>Promise chaining is a way of handling multiple asynchronous operations one after another by using multiple <code>.then()</code> calls. Each <code>.then()</code> can return a new value or Promise, which is passed to the next <code>.then()</code>.</p>
<pre><code>getUser()
  .then((user) => {
    return getOrders(user);
  })
  .then((orders) => {
    return getPayment(orders);
  })
  .then((payment) => {
    console.log("Payment successful");
  })
  .catch((error) => {
    console.log(error);
  });</code></pre>`,
        },
        {
          id: "js-promise-throw",
          q: "What happens when you throw an error inside a Promise?",
          a: `<p>If you throw an error inside a Promise executor or a <code>.then()</code>/<code>.catch()</code> callback, the Promise becomes rejected. The error can then be handled using <code>.catch()</code> or <code>try...catch</code> with <code>async</code>/<code>await</code>.</p>
<p><strong>Example</strong></p>
<pre><code>const promise = new Promise((resolve, reject) => {
  throw new Error("Something went wrong");
});

promise.catch((error) => {
  console.log(error.message);
});</code></pre>`,
        },
        {
          id: "js-async-error-handling",
          q: "How does Error Handling Work with async/await?",
          a: `<p>With <code>async</code>/<code>await</code>, we usually handle errors using <code>try...catch</code>. If an awaited Promise is rejected, the <code>await</code> expression throws the rejection reason, and the <code>catch</code> block handles it.</p>`,
        },
        {
          id: "js-forget-await",
          q: "What happens if you forget to await a Promise?",
          a: `<p>If you forget to use <code>await</code>, JavaScript does not wait for the Promise to finish. Instead, you immediately get the Promise object, and the next line continues executing.</p>
<pre><code>async function getUser() {
  const data = fetch("/api/user");

  console.log(data);
}

getUser();</code></pre>
<p>Here, <code>data</code> is a Promise, not the actual response data.</p>
<p>If you use <code>await</code>:</p>
<pre><code>async function getUser() {
  const data = await fetch("/api/user");

  console.log(data);
}</code></pre>
<p>Now JavaScript waits for the Promise to settle before continuing.</p>`,
        },
        {
          id: "js-sequential-vs-parallel",
          q: "What is the difference between Sequential and Parallel Promise Execution?",
          a: `<p>Sequential execution means we wait for one Promise to finish before starting the next one. Parallel execution means we start multiple independent Promises at the same time and wait for their results together.</p>
<p><strong>1. Sequential Execution</strong></p>
<pre><code>const user = await getUser();
const orders = await getOrders();
const products = await getProducts();</code></pre>
<p><strong>2. Parallel Execution</strong></p>
<p>If the operations are independent, we can start them together:</p>
<pre><code>const [user, orders, products] = await Promise.all([
  getUser(),
  getOrders(),
  getProducts()
]);</code></pre>`,
        },
        {
          id: "js-queue-microtask",
          q: "What is queueMicrotask()?",
          a: `<p><code>queueMicrotask()</code> is a JavaScript API used to schedule a function to run as a microtask after the current synchronous code finishes, but before the next task such as <code>setTimeout()</code>.</p>
<pre><code>console.log("Start");

queueMicrotask(() => {
  console.log("Microtask");
});

console.log("End");</code></pre>
<p><strong>Output</strong></p>
<pre><code>Start
End
Microtask</code></pre>
<p><strong>Difference from <code>setTimeout()</code></strong></p>
<pre><code>queueMicrotask(() => console.log("Microtask"));

setTimeout(() => console.log("Timeout"), 0);</code></pre>
<p><strong>Output</strong></p>
<pre><code>Microtask
Timeout</code></pre>
<p>Because microtasks have higher priority than normal tasks.</p>`,
        },
        {
          id: "js-async-thunk",
          q: "What is an Asynchronous Thunk?",
          a: `<p>An asynchronous thunk is a function that delays an asynchronous operation until the function is called. Instead of executing the async operation immediately, it returns a function that can execute it later.</p>
<pre><code>function fetchUser() {
  return () => {
    return fetch("/api/user");
  };
}

const getUser = fetchUser();

// API request happens only when we call it
getUser();</code></pre>
<p>Here, <code>fetchUser()</code> creates and returns a function. The <code>fetch()</code> request doesn't happen until <code>getUser()</code> is called.</p>
<p><strong>Why is it useful?</strong></p>
<p>Thunks are commonly used when you want to:</p>
<ul>
<li>Delay execution</li>
<li>Control when an API request starts</li>
<li>Pass additional arguments later</li>
<li>Manage asynchronous actions in state-management patterns such as Redux Thunk</li>
</ul>`,
        },
        {
          id: "js-strict-mode",
          q: "What is Strict Mode in JavaScript?",
          a: `<p>Strict mode is a feature in JavaScript that makes the language behave more strictly and helps developers catch common coding mistakes. It is enabled using <code>"use strict"</code>.</p>
<pre><code>"use strict";

x = 10; // ❌ ReferenceError</code></pre>
<p>Without strict mode, assigning to an undeclared variable could create a global variable in non-module code.</p>
<p><strong>Why use Strict Mode?</strong></p>
<p>It helps by:</p>
<ul>
<li>Preventing accidental global variables</li>
<li>Throwing errors for certain unsafe operations</li>
<li>Making some JavaScript behavior more predictable</li>
<li>Changing some <code>this</code> behavior in regular functions</li>
</ul>`,
        },
        {
          id: "js-undeclared-vs-undefined",
          q: "What is the difference between an undeclared and an undefined variable?",
          a: `<p>An undeclared variable is a variable that has never been declared, while an undefined variable is a declared variable that currently has the value <code>undefined</code>.</p>
<p><strong>1. Undeclared Variable</strong></p>
<p>A variable that was never declared using <code>let</code>, <code>const</code>, or <code>var</code>.</p>
<pre><code>console.log(age);
// ❌ ReferenceError: age is not defined</code></pre>
<p>Here, <code>age</code> doesn't exist because it was never declared.</p>
<p><strong>2. Undefined Variable</strong></p>
<p>A variable that has been declared, but no value has been assigned to it.</p>
<pre><code>let age;

console.log(age);
// undefined</code></pre>
<p>The variable exists, but its value is <code>undefined</code>.</p>`,
        },
        {
          id: "js-strict-mode-changes",
          q: "What changes when Strict Mode is enabled?",
          a: `<p>Strict mode makes JavaScript enforce stricter rules and turn some silent mistakes into errors. It is enabled using <code>"use strict"</code>.</p>
<pre><code>"use strict";

x = 10; // ❌ ReferenceError</code></pre>
<p>Some important changes:</p>
<ul>
<li>❌ Cannot assign to undeclared variables.</li>
<li>❌ Cannot delete certain non-configurable properties.</li>
<li>❌ Duplicate parameter names are not allowed.</li>
<li>❌ Some silent errors become exceptions.</li>
<li><code>this</code> in a regular function called without an object is <code>undefined</code>.</li>
<li>Certain older JavaScript features are restricted.</li>
</ul>`,
        },
        {
          id: "js-strict-this",
          q: "How does Strict Mode affect this?",
          a: `<p>In a regular function, strict mode prevents JavaScript from automatically converting <code>this</code> from <code>undefined</code> to the global object.</p>
<p><strong>Non-strict mode</strong></p>
<pre><code>function test() {
  console.log(this);
}

test();
// window (in a browser)</code></pre>
<p>In non-strict mode, <code>this</code> is substituted with the global object.</p>
<p><strong>Strict mode</strong></p>
<pre><code>"use strict";

function test() {
  console.log(this);
}

test();
// undefined</code></pre>
<p><strong>Important: Arrow functions</strong></p>
<p>Arrow functions do not have their own <code>this</code>, so strict mode doesn't change how they determine <code>this</code>. They inherit <code>this</code> from their surrounding lexical scope.</p>`,
        },
        {
          id: "js-inheritance",
          q: "What is Inheritance in JavaScript?",
          a: `<p>Inheritance is a mechanism that allows one object or class to access properties and methods from another object or class. In JavaScript, inheritance is primarily implemented through the prototype chain.</p>
<p><strong>Example using classes</strong></p>
<pre><code>class Animal {
  eat() {
    console.log("Eating");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Barking");
  }
}

const dog = new Dog();

dog.eat();  // Eating
dog.bark(); // Barking</code></pre>
<p>Here, <code>Dog</code> inherits the <code>eat()</code> method from <code>Animal</code> using <code>extends</code>.</p>`,
        },
        {
          id: "js-extends",
          q: "What is the extends keyword?",
          a: `<p>The <code>extends</code> keyword is used to create a child class that inherits properties and methods from a parent class.</p>
<pre><code>class Animal {
  eat() {
    console.log("Eating");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Barking");
  }
}

const dog = new Dog();

dog.eat();  // Eating
dog.bark(); // Barking</code></pre>
<p>Here, <code>Dog</code> extends <code>Animal</code>, so <code>Dog</code> can use the <code>eat()</code> method.</p>`,
        },
        {
          id: "js-super",
          q: "What is the super keyword?",
          a: `<p>The <code>super</code> keyword is used to access the parent class's constructor and methods from a child class.</p>
<p><strong>Calling the parent constructor</strong></p>
<pre><code>class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}

const dog = new Dog("Bruno", "Labrador");

console.log(dog.name);  // Bruno
console.log(dog.breed); // Labrador</code></pre>
<p>Here, <code>super(name)</code> calls the parent <code>Animal</code> constructor.</p>
<p><strong>Calling a parent method</strong></p>
<pre><code>class Animal {
  eat() {
    console.log("Eating");
  }
}

class Dog extends Animal {
  eat() {
    super.eat();
    console.log("Dog is eating");
  }
}

const dog = new Dog();

dog.eat();</code></pre>
<p><strong>Output</strong></p>
<pre><code>Eating
Dog is eating</code></pre>`,
        },
        {
          id: "js-static-methods",
          q: "What are Static Methods?",
          a: `<p>Static methods are methods that belong to the class itself, not to its objects (instances). They are defined using the <code>static</code> keyword and are called directly using the class name.</p>
<pre><code>class MathHelper {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathHelper.add(10, 20)); // 30</code></pre>
<p>You cannot call a static method through an instance:</p>
<pre><code>const helper = new MathHelper();

helper.add(10, 20); // ❌ TypeError</code></pre>
<p><strong>Why use static methods?</strong></p>
<p>Static methods are useful when a method doesn't need data from a specific object.</p>
<p>For example:</p>
<pre><code>class User {
  static createGuest() {
    return {
      name: "Guest",
      role: "user"
    };
  }
}

const guest = User.createGuest();</code></pre>`,
        },
        {
          id: "js-private-fields",
          q: "What are Private Class Fields?",
          a: `<p>Private class fields are class properties that can only be accessed from inside the class. They are declared using the <code>#</code> symbol and cannot be accessed directly from outside the class.</p>
<pre><code>class User {
  #password = "12345";

  getPassword() {
    return this.#password;
  }
}

const user = new User();

console.log(user.getPassword()); // "12345"

console.log(user.#password); // ❌ SyntaxError</code></pre>
<p>Here, <code>#password</code> is a private field, so outside code cannot directly access it.</p>
<p><strong>Why use private fields?</strong></p>
<p>They provide encapsulation, meaning internal data can be hidden and controlled through methods.</p>
<pre><code>class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();

account.deposit(1000);

console.log(account.getBalance()); // 1000</code></pre>
<p>The <code>#balance</code> cannot be directly modified from outside.</p>`,
        },
        {
          id: "js-method-overriding",
          q: "What is Method Overriding?",
          a: `<p>Method overriding occurs when a child class provides its own implementation of a method that already exists in the parent class. The child class's version is used when the method is called on a child object.</p>
<pre><code>class Animal {
  speak() {
    console.log("Animal makes a sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks");
  }
}

const dog = new Dog();

dog.speak(); // Dog barks</code></pre>
<p>Here, <code>Dog</code> overrides the <code>speak()</code> method inherited from <code>Animal</code>.</p>
<p><strong>Using <code>super</code></strong></p>
<p>The child can also call the parent's implementation:</p>
<pre><code>class Dog extends Animal {
  speak() {
    super.speak();
    console.log("Dog barks");
  }
}

const dog = new Dog();

dog.speak();</code></pre>
<p><strong>Output</strong></p>
<pre><code>Animal makes a sound
Dog barks</code></pre>`,
        },
        {
          id: "js-multiple-inheritance",
          q: "Does JavaScript support Multiple Inheritance?",
          a: `<p>JavaScript does not support multiple inheritance through classes. A class can extend only one parent class using the <code>extends</code> keyword.</p>`,
        },
        {
          id: "js-classes-prototypes",
          q: "How are JavaScript Classes related to Prototypes?",
          a: `<p>JavaScript classes are built on top of JavaScript's existing prototype-based inheritance system. Classes provide a cleaner syntax for creating objects and handling inheritance, but internally, methods are stored on the class's prototype.</p>`,
        },
        {
          id: "js-class-vs-constructor",
          q: "What is the difference between a Class and a Constructor Function?",
          a: `<p>Both classes and constructor functions can be used to create objects and implement inheritance, but classes provide a cleaner and more modern syntax. Under the hood, classes still use JavaScript's prototype-based inheritance.</p>
<p class="table-label">Key differences</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Constructor Function</th>
        <th>Class</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Traditional approach</td>
        <td>Modern ES6 syntax</td>
      </tr>
      <tr>
        <td>Uses a function</td>
        <td>Uses <code>class</code></td>
      </tr>
      <tr>
        <td>Methods are usually added to <code>.prototype</code> manually</td>
        <td>Methods are automatically added to <code>.prototype</code></td>
      </tr>
      <tr>
        <td>Can be called without <code>new</code> in some cases</td>
        <td>Cannot be called without <code>new</code></td>
      </tr>
      <tr>
        <td>Hoisted like function declarations</td>
        <td>Class declarations are hoisted but remain in the TDZ</td>
      </tr>
      <tr>
        <td>Inheritance uses prototype manipulation / <code>call()</code></td>
        <td>Uses <code>extends</code> and <code>super</code></td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
        {
          id: "js-classes-are-prototypes",
          q: "Are JavaScript classes actually implemented using classes internally, or are they based on prototypes?",
          a: `<p>JavaScript classes are based on the prototype system. The <code>class</code> syntax was introduced in ES6 to provide a cleaner and more convenient way to work with JavaScript's existing prototype-based inheritance.</p>`,
        },
        {
          id: "js-impure-function",
          q: "What is an Impure Function?",
          a: `<p>An impure function is a function that either produces different results for the same input or causes side effects outside the function.</p>
<p><strong>Example 1: Different result for the same input</strong></p>
<pre><code>let count = 0;

function getCount() {
  return count++;
}

console.log(getCount()); // 0
console.log(getCount()); // 1</code></pre>
<p>The same function call produces different results because it depends on and changes the external variable <code>count</code>.</p>
<p><strong>Example 2: Side effect</strong></p>
<pre><code>let total = 0;

function add(amount) {
  total += amount;
}</code></pre>
<p>This function changes a variable outside itself, so it has a side effect.</p>`,
        },
        {
          id: "js-immutability",
          q: "What is Immutability?",
          a: `<p>Immutability means that once a value or object is created, we don't modify it directly. Instead, we create a new value or object with the required changes.</p>
<p>For example:</p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};

// ❌ Mutating the original object
user.age = 26;</code></pre>
<p>Instead:</p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};

// ✅ Create a new object
const updatedUser = {
  ...user,
  age: 26
};

console.log(user.age);        // 25
console.log(updatedUser.age); // 26</code></pre>`,
        },
        {
          id: "js-idempotent",
          q: "What is an Idempotent Function?",
          a: `<p>An operation is idempotent if doing it multiple times has the same final effect as doing it once.</p>
<pre><code>let user = {
  name: "Nitin"
};

function setName(name) {
  user.name = name;
}

setName("Rahul");
setName("Rahul");
setName("Rahul");

// Final result is still:
console.log(user.name); // Rahul</code></pre>
<p>Calling <code>setName("Rahul")</code> repeatedly produces the same final state.</p>`,
        },
        {
          id: "js-pure-vs-idempotent",
          q: "What is the key difference between a Pure Function and an Idempotent Function?",
          a: `<p class="table-label">Key difference</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Pure Function</th>
        <th>Idempotent Function</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Same input → same output</td>
        <td>Repeated execution → same final result</td>
      </tr>
      <tr>
        <td>Must have no side effects</td>
        <td>Can have side effects</td>
      </tr>
      <tr>
        <td>Focuses on predictability</td>
        <td>Focuses on repeated execution</td>
      </tr>
      <tr>
        <td>Example: <code>add(2, 3)</code></td>
        <td>Example: <code>setName("Rahul")</code></td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
        {
          id: "js-function-composition",
          q: "What is Function Composition?",
          a: `<p>Function composition is the process of combining multiple functions so that the output of one function becomes the input of another function.</p>`,
        },
        {
          id: "js-recursion",
          q: "What is Recursion?",
          a: `<p>Recursion is a technique where a function calls itself to solve a problem by breaking it into smaller versions of the same problem. A recursive function must have a base case to stop the recursion.</p>`,
        },
        {
          id: "js-tail-recursion",
          q: "What is Tail Recursion?",
          a: `<p>Tail recursion is recursion where the recursive call is the final operation of the function, so there is no computation left after the recursive call returns.</p>`,
        },
        {
          id: "js-callback-vs-hof",
          q: "What is the difference between a Callback and a Higher-Order Function?",
          a: `<p>A callback is a function passed to another function, whereas a higher-order function is a function that accepts another function as an argument or returns a function. A higher-order function often uses callbacks, but they are not the same thing.</p>`,
        },
        {
          id: "js-partial-application",
          q: "What is Partial Application?",
          a: `<p>Partial application is the technique of taking a function with multiple parameters and fixing some of those parameters in advance, creating a new function with fewer parameters.</p>
<p><strong>Example</strong></p>
<pre><code>function multiply(a, b, c) {
  return a * b * c;
}

// Fix the first parameter
const multiplyBy2 = (b, c) => multiply(2, b, c);

console.log(multiplyBy2(3, 4));
// 24</code></pre>
<p>Here, <code>a = 2</code> is fixed in advance, so the new function only needs <code>b</code> and <code>c</code>.</p>
<p><strong>Another simple example</strong></p>
<pre><code>function add(a, b, c) {
  return a + b + c;
}

const add10 = (b, c) => add(10, b, c);

console.log(add10(20, 30));
// 60</code></pre>`,
        },
        {
          id: "js-currying-vs-partial",
          q: "What is the difference between Currying and Partial Application?",
          a: `<p>Currying converts a function with multiple parameters into a sequence of functions that each take one parameter. Partial application fixes some arguments in advance and returns a new function that accepts the remaining arguments.</p>
<p><strong>1. Currying</strong></p>
<pre><code>function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

console.log(add(10)(20)(30));
// 60</code></pre>
<p>Here:</p>
<pre><code>add(10)
   ↓
function(b)
   ↓
function(c)
   ↓
60</code></pre>
<p>Each function takes one argument.</p>
<p><strong>2. Partial Application</strong></p>
<pre><code>function add(a, b, c) {
  return a + b + c;
}

const add10 = (b, c) => add(10, b, c);

console.log(add10(20, 30));
// 60</code></pre>
<p>Here, <code>10</code> is fixed in advance, while <code>b</code> and <code>c</code> are passed later.</p>
<p class="table-label">Key difference</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Currying</th>
        <th>Partial Application</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Converts a function into a chain of functions</td>
        <td>Fixes some arguments in advance</td>
      </tr>
      <tr>
        <td>Usually one argument at a time</td>
        <td>Remaining function can accept multiple arguments</td>
      </tr>
      <tr>
        <td><code>f(a)(b)(c)</code></td>
        <td><code>f(a, b, c)</code> → <code>g(b, c)</code></td>
      </tr>
      <tr>
        <td>Focuses on function transformation</td>
        <td>Focuses on pre-filling arguments</td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
        {
          id: "js-iterator-vs-iterable",
          q: "What is the difference between an Iterator and an Iterable?",
          a: `<p>An iterable is an object that can be iterated over, while an iterator is the object that actually performs the iteration and keeps track of the current position.</p>`,
        },
        {
          id: "js-yield",
          q: "What does the yield keyword do?",
          a: `<p>The <code>yield</code> keyword is used inside a generator function to pause its execution and return a value. The function can later resume from exactly where it stopped.</p>
<pre><code>function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = numbers();

console.log(generator.next());
// { value: 1, done: false }

console.log(generator.next());
// { value: 2, done: false }

console.log(generator.next());
// { value: 3, done: false }

console.log(generator.next());
// { value: undefined, done: true }</code></pre>`,
        },
        {
          id: "js-generator-return",
          q: "What does a Generator Function return?",
          a: `<p>A generator function returns a Generator object (an iterator) when it is called. The function's code does not execute immediately. It starts executing when we call <code>.next()</code> on the returned generator.</p>
<p>A generator function:</p>
<pre><code>function* numbers() {
  yield 1;
}</code></pre>
<p>returns a Generator object, not the yielded value directly.</p>
<pre><code>const generator = numbers();

console.log(generator.next().value);
// 1</code></pre>`,
        },
        {
          id: "js-generator-vs-normal",
          q: "What is the difference between Generators and Normal Functions?",
          a: `<p>A normal function runs from start to finish when called, while a generator function can pause and resume its execution using <code>yield</code>.</p>`,
        },
        {
          id: "js-v8",
          q: "What is the V8 JavaScript Engine?",
          a: `<p>V8 is an open-source JavaScript engine developed by Google that executes JavaScript code. It is written in C++ and is used by Google Chrome and Node.js.</p>`,
        },
        {
          id: "js-v8-how",
          q: "How does V8 work?",
          a: `<p>When you write JavaScript:</p>
<pre><code>const result = 10 + 20;
console.log(result);</code></pre>
<p>V8 roughly does:</p>
<pre><code>JavaScript Code
      ↓
   Parsing
      ↓
   Bytecode
      ↓
Execution + Optimization
      ↓
Machine Code
      ↓
    CPU</code></pre>
<p>V8 uses Just-In-Time (JIT) compilation to optimize frequently executed JavaScript code for better performance.</p>`,
        },
        {
          id: "js-heap",
          q: "What is the JavaScript Heap?",
          a: `<p>The JavaScript heap is a memory area where JavaScript stores objects, arrays, functions, and other dynamically allocated data while the program is running.</p>
<p>For example:</p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};</code></pre>
<p>The object created above is stored in memory managed by the JavaScript engine's heap.</p>`,
        },
        {
          id: "js-garbage-collection",
          q: "What is Garbage Collection?",
          a: `<p>Garbage collection (GC) is the automatic process of finding and removing objects from memory that are no longer reachable or needed by a JavaScript program. It helps prevent unnecessary memory usage.</p>`,
        },
        {
          id: "js-memory-leak-causes",
          q: "What are the possible causes of memory leaks in JavaScript?",
          a: `<p>A memory leak occurs when a program keeps references to objects that are no longer needed, preventing the garbage collector from reclaiming their memory.</p>
<p><strong>Common causes</strong></p>
<p><strong>1. Unremoved Event Listeners</strong></p>
<pre><code>element.addEventListener("click", handleClick);

// Component is removed, but listener remains</code></pre>
<p>If the listener is no longer needed, remove it:</p>
<pre><code>element.removeEventListener("click", handleClick);</code></pre>
<p><strong>2. Accidental Global Variables</strong></p>
<pre><code>function test() {
  data = new Array(1000000); // ❌ accidental global in non-strict code
}</code></pre>
<p>The global reference can keep the data alive.</p>
<p><strong>3. Timers Not Cleared</strong></p>
<pre><code>const timer = setInterval(() => {
  // keeps running
}, 1000);</code></pre>
<p>If the timer is no longer needed:</p>
<pre><code>clearInterval(timer);</code></pre>
<p><strong>4. Closures Holding Unnecessary Data</strong></p>
<p>A closure can keep references to variables alive as long as the closure itself remains reachable.</p>
<pre><code>function createHandler() {
  const largeData = new Array(1000000);

  return function () {
    console.log(largeData.length);
  };
}</code></pre>
<p>If the returned function stays referenced for a long time, <code>largeData</code> may also remain in memory.</p>
<p><strong>5. Detached DOM Elements</strong></p>
<p>An element can be removed from the DOM but still remain referenced by JavaScript:</p>
<pre><code>const element = document.getElementById("box");

element.remove();

// \`element\` still references the removed DOM node</code></pre>`,
        },
        {
          id: "js-identify-memory-leak",
          q: "How can you identify a memory leak in JavaScript?",
          a: `<p>Memory leaks can be identified by monitoring memory usage over time and checking whether memory continues to grow even after objects or components should have been released. Browser DevTools provide tools such as the Memory panel, heap snapshots, and allocation timelines for this.</p>`,
        },
        {
          id: "js-inline-caching",
          q: "What is Inline Caching?",
          a: `<p>Inline caching is a JavaScript engine optimization technique that makes repeated property access and method calls faster by remembering where a property was found on an object.</p>
<p>For example:</p>
<pre><code>function getName(user) {
  return user.name;
}

getName({ name: "Nitin" });
getName({ name: "Rahul" });
getName({ name: "Amit" });</code></pre>
<p>The JavaScript engine notices that <code>user.name</code> is repeatedly accessed on objects with a similar structure. Instead of searching for <code>name</code> from scratch every time, it can cache information about where the property is located.</p>`,
        },
        {
          id: "js-jit",
          q: "What is JIT Compilation?",
          a: `<p>JIT (Just-In-Time) compilation is a technique where JavaScript code is compiled into optimized machine code at runtime, while the program is running. It helps JavaScript engines execute frequently used code faster.</p>`,
        },
        {
          id: "js-stack-vs-heap",
          q: "What is the difference between Stack Memory and Heap Memory?",
          a: `<p>Stack memory is mainly used to manage function execution and local primitive values, while heap memory is used for dynamically allocated objects and other data.</p>
<p><strong>1. Stack Memory</strong></p>
<p>The stack stores information needed for function execution, such as execution contexts and local variables.</p>
<pre><code>function add(a, b) {
  const result = a + b;
  return result;
}

add(10, 20);</code></pre>
<p><strong>2. Heap Memory</strong></p>
<p>The heap is used for dynamically allocated data such as objects, arrays, and functions.</p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};</code></pre>
<p class="table-label">Key differences</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Stack</th>
        <th>Heap</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Function execution and call frames</td>
        <td>Dynamically allocated objects/data</td>
      </tr>
      <tr>
        <td>LIFO structure</td>
        <td>No simple LIFO model</td>
      </tr>
      <tr>
        <td>Fast to allocate/deallocate</td>
        <td>Generally more complex</td>
      </tr>
      <tr>
        <td>Managed as functions enter/exit</td>
        <td>Managed largely by garbage collection</td>
      </tr>
      <tr>
        <td>Limited in size</td>
        <td>Typically larger</td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
        {
          id: "js-tree-shaking",
          q: "What is Tree Shaking?",
          a: `<p>Tree shaking is a build-time optimization technique that removes unused code from the final JavaScript bundle. It helps reduce bundle size and improve application loading performance.</p>`,
        },
        {
          id: "js-babel",
          q: "What is Babel?",
          a: `<p>Babel is a JavaScript compiler that transforms modern JavaScript code into older, more widely supported JavaScript code. It allows developers to use newer JavaScript features while supporting environments that may not understand them.</p>`,
        },
        {
          id: "js-why-babel",
          q: "Why is Babel used?",
          a: `<ul>
<li>Converts modern JavaScript syntax for browser compatibility</li>
<li>Transforms newer syntax such as optional chaining, JSX, and class syntax</li>
<li>Can use plugins and presets to control transformations</li>
</ul>`,
        },
        {
          id: "js-transpilation",
          q: "What is Transpilation?",
          a: `<p>Transpilation is the process of converting source code from one version or form of a programming language into another version or form of the same language.</p>
<p>In JavaScript, it is commonly used to convert modern JavaScript syntax into older JavaScript syntax for better compatibility.</p>`,
        },
        {
          id: "js-polyfill",
          q: "What is a Polyfill?",
          a: `<p>A polyfill is code that provides an implementation of a modern JavaScript feature or API in environments that don't natively support it.</p>
<p><strong>Example</strong></p>
<p>Suppose an older browser doesn't support <code>Array.prototype.includes()</code>.</p>
<p>A polyfill can provide that functionality:</p>
<pre><code>if (!Array.prototype.includes) {
  Array.prototype.includes = function (value) {
    return this.indexOf(value) !== -1;
  };
}</code></pre>
<p>Now older environments can use:</p>
<pre><code>[1, 2, 3].includes(2); // true</code></pre>`,
        },
        {
          id: "js-minification",
          q: "What is Minification?",
          a: `<p>Minification is the process of reducing the size of JavaScript, CSS, or HTML files by removing unnecessary characters such as whitespace, comments, and line breaks, while preserving the code's functionality.</p>
<p><strong>Example</strong></p>
<p>Before minification:</p>
<pre><code>function add(a, b) {
  // Add two numbers
  const result = a + b;
  return result;
}</code></pre>
<p>After minification:</p>
<pre><code>function add(a,b){return a+b}</code></pre>
<p>The code still works the same, but the file is smaller.</p>`,
        },
        {
          id: "js-minification-removes",
          q: "What does minification remove?",
          a: `<ul>
<li>Whitespace</li>
<li>Line breaks</li>
<li>Comments</li>
<li>Unnecessary characters</li>
<li>Sometimes shorter variable/function names</li>
</ul>
<p>For example:</p>
<pre><code>function calculateTotal(price, tax) {
  return price + tax;
}</code></pre>
<p>may become:</p>
<pre><code>function n(t,e){return t+e}</code></pre>`,
        },
        {
          id: "js-why-minification",
          q: "Why is minification useful?",
          a: `<ul>
<li>📦 Smaller bundle size</li>
<li>🚀 Faster download</li>
<li>⚡ Faster page loading</li>
<li>📉 Reduced bandwidth usage</li>
</ul>`,
        },
        {
          id: "js-obfuscation",
          q: "What is Obfuscation?",
          a: `<p>Obfuscation is the process of transforming source code into a form that is difficult for humans to understand while keeping the code's functionality the same.</p>
<p>It is mainly used to make code harder to read or reverse-engineer, not to provide strong security.</p>
<p><strong>Example</strong></p>
<p>Original:</p>
<pre><code>function calculateSalary(salary, bonus) {
  return salary + bonus;
}</code></pre>
<p>Obfuscated:</p>
<pre><code>function a(b,c){return b+c}</code></pre>
<p>More aggressive obfuscation might look like:</p>
<pre><code>var _0x12ab = ['log', 'Hello'];
console[_0x12ab[0]](_0x12ab[1]);</code></pre>
<p>The code still works, but it is much harder to understand.</p>
<p><strong>Why is obfuscation used?</strong></p>
<ul>
<li>Makes source code harder to understand</li>
<li>Makes casual reverse engineering more difficult</li>
<li>Can protect implementation details</li>
<li>Adds a layer of difficulty when analyzing client-side code</li>
</ul>`,
        },
        {
          id: "js-minification-vs-obfuscation",
          q: "What is the difference between Minification and Obfuscation?",
          a: `<p class="table-label">Obfuscation vs Minification</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Minification</th>
        <th>Obfuscation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Focuses on reducing file size</td>
        <td>Focuses on making code harder to understand</td>
      </tr>
      <tr>
        <td>Removes whitespace/comments</td>
        <td>Can rename and transform code extensively</td>
      </tr>
      <tr>
        <td>Primarily a performance optimization</td>
        <td>Primarily a code-hiding technique</td>
      </tr>
      <tr>
        <td>Code may remain relatively readable</td>
        <td>Code can become very difficult to read</td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
        {
          id: "js-obfuscation-vs-encryption",
          q: "What is the difference between Obfuscation and Encryption?",
          a: `<p>Obfuscation makes code difficult to understand, while encryption transforms data into an unreadable form that requires a key to decrypt.</p>
<p class="table-label">Key differences</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Obfuscation</th>
        <th>Encryption</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Makes code difficult to understand</td>
        <td>Makes data unreadable</td>
      </tr>
      <tr>
        <td>Usually doesn't require a key to reverse</td>
        <td>Requires a key to decrypt</td>
      </tr>
      <tr>
        <td>Focuses on hiding implementation details</td>
        <td>Focuses on protecting confidentiality</td>
      </tr>
      <tr>
        <td>Can often be reversed through analysis</td>
        <td>Designed to be computationally difficult to break</td>
      </tr>
      <tr>
        <td>Not a strong security mechanism</td>
        <td>A security mechanism</td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
        {
          id: "js-json",
          q: "What is JSON, JSON.stringify(), and JSON.parse()?",
          a: `<p>JSON (JavaScript Object Notation) is a lightweight text format used to represent and exchange structured data. <code>JSON.stringify()</code> converts a JavaScript value into a JSON string, while <code>JSON.parse()</code> converts a valid JSON string back into a JavaScript value.</p>`,
        },
        {
          id: "js-localstorage-json",
          q: "How would you store an array/object in localStorage?",
          a: `<p><code>localStorage</code> stores data only as strings, so we use <code>JSON.stringify()</code> to convert an array or object into a JSON string before storing it. When retrieving it, we use <code>JSON.parse()</code> to convert the string back into an array or object.</p>
<p><strong>Example with an Object</strong></p>
<pre><code>const user = {
  name: "Nitin",
  age: 25
};

// Store object
localStorage.setItem("user", JSON.stringify(user));

// Get object
const storedUser = JSON.parse(localStorage.getItem("user"));

console.log(storedUser.name); // Nitin</code></pre>
<p><strong>Example with an Array</strong></p>
<pre><code>const skills = ["JavaScript", "React", "React Native"];

localStorage.setItem("skills", JSON.stringify(skills));

const storedSkills = JSON.parse(localStorage.getItem("skills"));

console.log(storedSkills);
// ["JavaScript", "React", "React Native"]</code></pre>`,
        },
        {
          id: "js-error-object",
          q: "What is an Error Object?",
          a: `<p>The <code>Error</code> object is a built-in JavaScript object used to represent and provide information about errors that occur during program execution.</p>
<p><strong>Example</strong></p>
<pre><code>try {
  throw new Error("Something went wrong");
} catch (error) {
  console.log(error.message);
}</code></pre>
<p><strong>Output</strong></p>
<pre><code>Something went wrong</code></pre>`,
        },
        {
          id: "js-error-types",
          q: "What are the different types of JavaScript errors?",
          a: `<p>JavaScript has several built-in error types:</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Error Type</th>
        <th>When it occurs</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>SyntaxError</code></td>
        <td>Invalid JavaScript syntax</td>
        <td><code>if (true {}</code></td>
      </tr>
      <tr>
        <td><code>ReferenceError</code></td>
        <td>Accessing a variable that doesn't exist</td>
        <td><code>console.log(x)</code></td>
      </tr>
      <tr>
        <td><code>TypeError</code></td>
        <td>Performing an invalid operation on a value's type</td>
        <td><code>null.name</code></td>
      </tr>
      <tr>
        <td><code>RangeError</code></td>
        <td>A value is outside its allowed range</td>
        <td><code>new Array(-1)</code></td>
      </tr>
      <tr>
        <td><code>URIError</code></td>
        <td>Invalid URI encoding/decoding</td>
        <td><code>decodeURIComponent("%")</code></td>
      </tr>
      <tr>
        <td><code>EvalError</code></td>
        <td>Related to <code>eval()</code></td>
        <td>Rare in modern JavaScript</td>
      </tr>
      <tr>
        <td><code>Error</code></td>
        <td>Generic/custom error</td>
        <td><code>throw new Error("Failed")</code></td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
        {
          id: "js-try-catch-finally",
          q: "What is try...catch...finally?",
          a: `<p><code>try...catch...finally</code> is used for handling runtime errors in JavaScript. The <code>try</code> block contains code that may throw an error, <code>catch</code> handles the error, and <code>finally</code> runs after the try/catch regardless of whether an error occurred.</p>
<p><strong>Example</strong></p>
<pre><code>try {
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.log("Error:", error.message);
} finally {
  console.log("Execution completed");
}</code></pre>`,
        },
        {
          id: "js-throw-vs-return",
          q: "What is the difference between throw and return?",
          a: `<p><code>return</code> ends a function normally and optionally sends a value back to the caller, while <code>throw</code> stops normal execution and signals an error/exception that can be handled with <code>try...catch</code>.</p>
<p><strong>1. <code>return</code></strong></p>
<pre><code>function add(a, b) {
  return a + b;
}

const result = add(10, 20);

console.log(result); // 30</code></pre>
<p><code>return</code>:</p>
<ul>
<li>Ends the current function.</li>
<li>Sends a value back to the caller.</li>
<li>Does not represent an error.</li>
</ul>
<p><strong>2. <code>throw</code></strong></p>
<pre><code>function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}</code></pre>
<p>Handle the error:</p>
<pre><code>try {
  divide(10, 0);
} catch (error) {
  console.log(error.message);
}</code></pre>
<p><code>throw</code>:</p>
<ul>
<li>Immediately stops normal execution.</li>
<li>Signals an exception.</li>
<li>Can transfer control to a matching <code>catch</code> block.</li>
<li>Can throw any value, although throwing an <code>Error</code> object is recommended.</li>
</ul>`,
        },
        {
          id: "js-try-without-catch",
          q: "Can we have a try block without catch?",
          a: `<p>Yes. A <code>try</code> block can exist without a <code>catch</code> block if it is followed by a <code>finally</code> block.</p>
<pre><code>try {
  console.log("Executing...");
} finally {
  console.log("Cleanup");
}</code></pre>`,
        },
        {
          id: "js-custom-error",
          q: "How do you create a Custom Error?",
          a: `<p>A custom error can be created by extending the built-in <code>Error</code> class and adding your own error type or properties.</p>
<p><strong>Example</strong></p>
<pre><code>class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

throw new ValidationError("Invalid email");</code></pre>
<p>You can handle it with <code>try...catch</code>:</p>
<pre><code>try {
  throw new ValidationError("Invalid email");
} catch (error) {
  console.log(error.name);    // ValidationError
  console.log(error.message); // Invalid email
}</code></pre>`,
        },
        {
          id: "js-async-error-handling-ways",
          q: "How do you handle errors in Asynchronous JavaScript?",
          a: `<p>Errors in asynchronous JavaScript are handled differently depending on whether we use callbacks, Promises, or <code>async</code>/<code>await</code>.</p>
<p><strong>1. With Callbacks</strong></p>
<p>Use an error-first callback pattern:</p>
<pre><code>getData((error, data) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(data);
});</code></pre>
<p><strong>2. With Promises</strong></p>
<p>Use <code>.catch()</code>:</p>
<pre><code>fetch("/api/users")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));</code></pre>
<p><strong>3. With <code>async</code>/<code>await</code></strong></p>
<p>Use <code>try...catch</code>:</p>
<pre><code>async function getUsers() {
  try {
    const response = await fetch("/api/users");
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}</code></pre>`,
        },
        {
          id: "js-json-types",
          q: "What data types are supported by JSON?",
          a: `<p>JSON supports six main data types: string, number, boolean, <code>null</code>, object, and array.</p>
<pre><code>{
  "name": "Nitin",
  "age": 25,
  "isDeveloper": true,
  "skills": ["JavaScript", "React"],
  "address": {
    "city": "Mohali"
  },
  "phone": null
}</code></pre>
<p><strong>Important point</strong></p>
<p>JSON does not directly support JavaScript-specific types such as:</p>
<ul>
<li><code>undefined</code></li>
<li><code>function</code></li>
<li><code>Symbol</code></li>
<li><code>BigInt</code></li>
<li><code>Date</code> as a native JSON type</li>
</ul>`,
        },
        {
          id: "js-sync-vs-async",
          q: "What is the difference between Synchronous and Asynchronous Code?",
          a: `<p>Synchronous code executes one task at a time and waits for each task to finish before moving to the next. Asynchronous code allows a task to start without blocking the execution of other code while waiting for the result.</p>`,
        },
        {
          id: "js-await-not-blocking",
          q: "Why doesn't await block the JavaScript main thread?",
          a: `<p><code>await</code> pauses the execution of the current async function, not the entire JavaScript thread. While the function is waiting for the Promise to settle, JavaScript can continue executing other tasks.</p>`,
        },
        {
          id: "js-promises-resolve-together",
          q: "What happens when multiple Promises resolve at the same time?",
          a: `<p>When multiple Promises resolve, their <code>.then()</code> callbacks are added to the microtask queue. JavaScript processes these microtasks in the order they were queued, one at a time.</p>
<p><strong>Example</strong></p>
<pre><code>Promise.resolve().then(() => {
  console.log("Promise 1");
});

Promise.resolve().then(() => {
  console.log("Promise 2");
});

Promise.resolve().then(() => {
  console.log("Promise 3");
});</code></pre>
<p><strong>Output</strong></p>
<pre><code>Promise 1
Promise 2
Promise 3</code></pre>`,
        },
        {
          id: "js-allsettled-failed-api",
          q: "How would you handle one failed API call while allowing other API calls to complete?",
          a: `<p>Use <code>Promise.allSettled()</code> when you want to run multiple API calls independently and receive the result of every call, even if some fail.</p>`,
        },
        {
          id: "js-identify-fix-memory-leak",
          q: "How would you identify and fix a memory leak?",
          a: `<p>I would first reproduce the issue, monitor memory usage, take heap snapshots, identify objects that remain reachable unnecessarily, and then remove the references causing them to stay in memory.</p>`,
        },
        {
          id: "js-object-reference-modify",
          q: "What happens if you modify an object that was assigned to another variable?",
          a: `<p>Objects are assigned by reference in JavaScript. So if two variables reference the same object, modifying the object through one variable will also be visible through the other variable.</p>
<p><strong>Example</strong></p>
<pre><code>const user1 = {
  name: "Nitin",
  age: 25
};

const user2 = user1;

user2.age = 26;

console.log(user1.age); // 26
console.log(user2.age); // 26</code></pre>`,
        },
        {
          id: "js-pass-by-value",
          q: "Pass-by-Value vs Reference Behavior in JavaScript",
          a: `<p>JavaScript is always pass-by-value. However, when an object is passed to a function, the value being copied is a reference to that object. This is why objects can appear to behave like they are passed by reference.</p>
<p><strong>Primitive Values — Pass by Value</strong></p>
<pre><code>function change(x) {
  x = 20;
}

let num = 10;

change(num);

console.log(num); // 10</code></pre>
<p>The function receives a copy of <code>num</code>, so changing <code>x</code> doesn't affect <code>num</code>.</p>
<p><strong>2. Objects — Reference Value is Copied</strong></p>
<pre><code>function change(user) {
  user.name = "Rahul";
}

const person = {
  name: "Nitin"
};

change(person);

console.log(person.name); // Rahul</code></pre>`,
        },
        {
          id: "js-missing-property",
          q: "What happens when a property doesn't exist on an object?",
          a: `<p>If you access a property that doesn't exist on an object, JavaScript returns <code>undefined</code>.</p>
<pre><code>const user = {
  name: "Nitin"
};

console.log(user.age);
// undefined</code></pre>
<p>JavaScript checks the object's prototype chain if the property isn't found directly on the object.</p>
<pre><code>const user = {};

console.log(user.toString);
// function</code></pre>
<p><code>toString</code> isn't directly on <code>user</code>, but JavaScript finds it in <code>Object.prototype</code>.</p>
<p>If the property isn't found anywhere in the prototype chain:</p>
<pre><code>console.log(user.age);
// undefined</code></pre>`,
        },
        {
          id: "js-arrow-callbacks",
          q: "Why are Arrow Functions Commonly Used as Callbacks?",
          a: `<p>Arrow functions are commonly used as callbacks because they provide a short syntax and inherit <code>this</code> from their surrounding scope.</p>
<p><strong>1. Concise Syntax</strong></p>
<p>Instead of:</p>
<pre><code>const numbers = [1, 2, 3];

numbers.map(function (num) {
  return num * 2;
});</code></pre>
<p>We can write:</p>
<pre><code>numbers.map((num) => num * 2);</code></pre>
<p>This makes callbacks shorter and easier to read.</p>
<p><strong>2. Lexical <code>this</code></strong></p>
<p>Arrow functions do not have their own <code>this</code>. They inherit <code>this</code> from the surrounding scope.</p>
<pre><code>const user = {
  name: "Nitin",

  greet() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

user.greet();
// Nitin</code></pre>
<p>The arrow function inherits <code>this</code> from <code>greet()</code>.</p>
<p>With a regular function:</p>
<pre><code>setTimeout(function () {
  console.log(this.name);
}, 1000);</code></pre>
<p><code>this</code> would have different behavior.</p>
<p><strong>Important Point</strong></p>
<p>Arrow functions are not always better for callbacks. If you specifically need a callback's own <code>this</code>, <code>arguments</code>, or constructor behavior, a regular function may be more appropriate.</p>`,
        },
        {
          id: "js-event-listener",
          q: "What is an Event Listener?",
          a: `<p>An event listener is a function that waits for a specific event to occur and then executes a callback function when that event happens.</p>
<p><strong>Example</strong></p>
<pre><code>const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("Button clicked");
});</code></pre>
<p>Here:</p>
<ul>
<li><code>"click"</code> → the event</li>
<li><code>addEventListener()</code> → registers the listener</li>
<li><code>() =&gt; { ... }</code> → the callback function</li>
</ul>`,
        },
        {
          id: "js-thunk",
          q: "What is a Thunk Function?",
          a: `<p>A thunk is a function that delays the execution of an operation by wrapping it inside another function. Instead of performing the operation immediately, it returns a function that can be called later.</p>
<p><strong>Example</strong></p>
<pre><code>function createThunk() {
  return function () {
    console.log("Executed later");
  };
}

const thunk = createThunk();

console.log("Before");

thunk();

console.log("After");</code></pre>
<p><strong>Output</strong></p>
<pre><code>Before
Executed later
After</code></pre>
<p>The operation is delayed until <code>thunk()</code> is called.</p>`,
        },
        {
          id: "js-array-mutate",
          q: "Which Array Methods Mutate the Original Array and Which Don't?",
          a: `<p>Some array methods modify the original array (mutating methods), while others return a new array/value without changing the original array (non-mutating methods).</p>
<p><strong>❌ Mutating Methods</strong></p>
<p>These modify the original array:</p>
<ul>
<li><code>push()</code></li>
<li><code>pop()</code></li>
<li><code>shift()</code></li>
<li><code>unshift()</code></li>
<li><code>splice()</code></li>
<li><code>sort()</code></li>
<li><code>reverse()</code></li>
<li><code>fill()</code></li>
<li><code>copyWithin()</code></li>
</ul>
<p>Example:</p>
<pre><code>const arr = [1, 2, 3];

arr.push(4);

console.log(arr);
// [1, 2, 3, 4]</code></pre>
<p><strong>✅ Non-Mutating Methods</strong></p>
<p>These do not modify the original array:</p>
<ul>
<li><code>map()</code></li>
<li><code>filter()</code></li>
<li><code>slice()</code></li>
<li><code>concat()</code></li>
<li><code>flat()</code></li>
<li><code>flatMap()</code></li>
<li><code>includes()</code></li>
<li><code>indexOf()</code></li>
<li><code>find()</code></li>
<li><code>findIndex()</code></li>
<li><code>some()</code></li>
<li><code>every()</code></li>
<li><code>join()</code></li>
<li><code>toString()</code></li>
</ul>
<p>Example:</p>
<pre><code>const arr = [1, 2, 3];

const result = arr.map(x => x * 2);

console.log(arr);
// [1, 2, 3]

console.log(result);
// [2, 4, 6]</code></pre>
<p><strong>Important Modern Methods</strong></p>
<p>JavaScript also provides non-mutating alternatives:</p>
<pre><code>const sorted = arr.toSorted();
const reversed = arr.toReversed();
const spliced = arr.toSpliced(1, 1);</code></pre>
<p>These return a new array instead of modifying the original.</p>`,
        },
        {
          id: "js-string-immutable",
          q: "Are Strings Mutable or Immutable in JavaScript?",
          a: `<p>Strings are immutable in JavaScript. Once a string is created, its characters cannot be changed directly. Any operation that appears to modify a string actually creates a new string.</p>
<p><strong>Example</strong></p>
<pre><code>let name = "Nitin";

name[0] = "R";

console.log(name);
// "Nitin"</code></pre>
<p>The original string remains unchanged.</p>
<p>Instead:</p>
<pre><code>let name = "Nitin";

name = "R" + name.slice(1);

console.log(name);
// "Ritin"</code></pre>
<p>Here, a new string is created and assigned to <code>name</code>.</p>`,
        },
        {
          id: "js-debounce",
          q: "What is Debouncing?",
          a: `<p>Debouncing is a technique where we delay the execution of a function until the user stops performing an action for a certain amount of time. If the action happens again before the time is over, the timer is reset. It's commonly used in search inputs, API calls, and resize events.</p>
<p>For example, in a search box, instead of calling the API on every keystroke, we wait until the user stops typing for, say, 500ms.</p>
<pre><code>function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}</code></pre>
<p>Simple example: if the user types:</p>
<pre><code>R → Re → Rea → Reac → React</code></pre>
<ul>
<li>Without debounce → 5 API calls</li>
<li>With a 500ms debounce → 1 API call, after the user stops typing</li>
</ul>`,
        },
        {
          id: "js-throttle",
          q: "What is Throttling?",
          a: `<p>Throttling is a technique where we limit how often a function can execute within a specific time interval. Even if the event happens many times, the function will execute at most once during that interval. It's commonly used for scrolling, mouse movement, and window resize events.</p>
<p>For example, if a scroll event happens 100 times in 1 second, with a 200ms throttle, the function can execute at most about 5 times per second.</p>
<pre><code>function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}</code></pre>
<p>Easy way to remember:</p>
<ul>
<li>Debouncing → wait until the action stops.</li>
<li>Throttling → execute at a controlled rate while the action continues.</li>
</ul>`,
        },
        {
          id: "js-event-delegation",
          q: "What is Event Bubbling, Capturing, and Delegation?",
          a: `<p>These are concepts related to how events travel through the DOM.</p>
<p><strong>1. Event Capturing</strong></p>
<p>Capturing is when an event travels from the top of the DOM down toward the element that was actually clicked. It is also called the capture phase.</p>
<pre><code>document
   ↓
html
   ↓
body
   ↓
button ← clicked</code></pre>
<p><strong>2. Event Bubbling</strong></p>
<p>Bubbling is when an event travels from the element that was clicked upward through its parent elements.</p>
<pre><code>button ← clicked
   ↑
div
   ↑
body
   ↑
html
   ↑
document</code></pre>
<p>Important: Most DOM events are handled during the bubbling phase by default.</p>
<p><strong>3. Event Delegation</strong></p>
<p>Event delegation is a technique where we attach one event listener to a parent instead of adding separate listeners to each child. Because events bubble up, the parent can detect which child triggered the event.</p>
<pre><code>const list = document.querySelector("ul");

list.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log(event.target.textContent);
  }
});</code></pre>
<p>Instead of doing:</p>
<pre><code>item1.addEventListener("click", ...);
item2.addEventListener("click", ...);
item3.addEventListener("click", ...);</code></pre>
<p>we put one listener on the parent. It also works for items added later. Use <code>stopPropagation()</code> only when you have a real reason.</p>`,
        },
      ],
    },
    {
      title: "Async and the runtime",
      level: "advanced",
      questions: [
        {
          id: "js-event-loop",
          q: "What is the Event Loop?",
          a: `<p>The event loop is a mechanism that allows JavaScript to handle asynchronous operations even though JavaScript is single-threaded. It continuously checks whether the call stack is empty and, if it is, moves pending tasks from the appropriate queue to the call stack for execution. This is what allows things like timers, API calls, and event handlers to run without blocking the main JavaScript execution.</p>`,
        },
        {
          id: "js-microtasks-macrotasks",
          q: "What are Microtasks and Macrotasks?",
          a: `<p>Microtasks and macrotasks are two types of tasks handled by the JavaScript runtime. Microtasks include Promise callbacks and <code>queueMicrotask()</code>, while macrotasks include <code>setTimeout</code>, <code>setInterval</code>, and events. The important point is that after the current call stack is completed, JavaScript processes the microtask queue before moving to the next macrotask.</p>
<p>Easy way to remember:</p>
<ul>
<li>Microtask → higher priority → Promise callbacks</li>
<li>Macrotask → later → timers, events, etc.</li>
</ul>
<pre><code>console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");</code></pre>
<p>Output:</p>
<pre><code>1
4
3
2</code></pre>
<p>Because the Promise callback (microtask) is processed before the <code>setTimeout</code> callback (macrotask).</p>`,
        },
        {
          id: "js-promises",
          q: "What is a Promise?",
          a: `<p>A Promise is a JavaScript object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It acts as a placeholder for a value that may not be available yet but will be resolved in the future.</p>
<p>It basically tells us that a task is still in progress and will either complete successfully or fail in the future. We commonly use Promises for things like API calls, file operations, or timers.</p>
<p>A Promise can be in one of three states:</p>
<ul>
<li><code>pending</code>: Initial state, neither fulfilled nor rejected.</li>
<li><code>fulfilled</code>: The operation completed successfully.</li>
<li><code>rejected</code>: The operation failed (e.g., due to a network error).</li>
</ul>
<p>Promise syntax:</p>
<pre><code>const promise = new Promise(function (resolve, reject) {
  // Perform async operation
});</code></pre>
<p>Example: creating and using a Promise</p>
<pre><code>const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("I'm a Promise!");
  }, 5000);
});

promise
  .then((value) => console.log(value)) // Logs after 5 seconds: "I'm a Promise!"
  .catch((error) => console.error(error))  // Handles any rejection
  .finally(() => console.log("Done"));     // Runs regardless of success or failure</code></pre>
<p>Always handle rejections — an unhandled rejection is a real production bug.</p>`
        },
        {
          id: "js-why-promises",
          q: "Why do you need a Promise?",
          a: `<p>Promises are used to handle asynchronous operations, especially in languages like JavaScript, which often work with non-blocking operations such as network requests, file I/O, and timers. When an operation is asynchronous, it doesn't immediately return a result; instead, it works in the background and provides the result later. Handling this in a clean, organized way can be difficult without a structured approach.</p>
<p>Promises are used to:</p>
<ul>
<li>Handle asynchronous operations.</li>
<li>Provide a cleaner alternative to callbacks.</li>
<li>Avoid callback hell.</li>
<li>Make code more readable and maintainable.</li>
</ul>`,
        },
        {
          id: "js-promise-states",
          q: "Explain the three states of a Promise.",
          a: `<p>Promises have three states:</p>
<ul>
<li><strong>Pending:</strong> This is the initial state of the Promise before an operation begins.</li>
<li><strong>Fulfilled:</strong> This state indicates that the specified operation was completed.</li>
<li><strong>Rejected:</strong> This state indicates that the operation did not complete. In this case an error value will be thrown.</li>
</ul>`,
        },
        {
          id: "js-promise-methods",
          q: "What are the different Promise methods in JavaScript?",
          a: `<p>These four methods are used when we want to run multiple Promises together. The easiest way to understand them is by focusing on what happens when one Promise succeeds or fails.</p>
<p class="table-label">Quick notes</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>What happens?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><code>Promise.all()</code></th>
        <td>All must succeed; one failure → reject</td>
      </tr>
      <tr>
        <th><code>Promise.allSettled()</code></th>
        <td>Waits for everyone, success or failure</td>
      </tr>
      <tr>
        <th><code>Promise.race()</code></th>
        <td>First Promise to settle wins</td>
      </tr>
      <tr>
        <th><code>Promise.any()</code></th>
        <td>First Promise to succeed wins</td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
        {
          id: "js-promise-all",
          q: "What is Promise.all()?",
          a: `<p><code>Promise.all()</code> waits for all Promises to succeed. If even one Promise fails, the whole <code>Promise.all()</code> rejects.</p>
<pre><code>Promise.all([api1(), api2(), api3()])
  .then(results => console.log(results))
  .catch(error => console.log(error));</code></pre>
<p>Remember: <strong>all</strong> → All must succeed.</p>`,
        },
        {
          id: "js-promise-allsettled",
          q: "What is Promise.allSettled()?",
          a: `<p><code>Promise.allSettled()</code> waits for all Promises to finish, whether they succeed or fail. It gives us the result of every Promise.</p>
<pre><code>Promise.allSettled([api1(), api2(), api3()])
  .then(results => console.log(results));</code></pre>
<p>Remember: <strong>allSettled</strong> → Wait for everyone, regardless of success or failure.</p>`,
        },
        {
          id: "js-promise-race",
          q: "What is Promise.race()?",
          a: `<p><code>Promise.race()</code> returns the result of the first Promise that settles, whether it is fulfilled or rejected.</p>
<pre><code>Promise.race([api1(), api2(), api3()])
  .then(result => console.log(result))
  .catch(error => console.log(error));</code></pre>
<p>If <code>api2()</code> finishes first, its result/rejection is used.</p>
<p>Remember: <strong>race</strong> → First one to finish wins.</p>`,
        },
        {
          id: "js-promise-any",
          q: "What is Promise.any()?",
          a: `<p><code>Promise.any()</code> returns the first Promise that successfully fulfills. It ignores rejected Promises unless all of them fail.</p>
<pre><code>Promise.any([api1(), api2(), api3()])
  .then(result => console.log(result))
  .catch(error => console.log(error));</code></pre>
<p>If <code>api1</code> fails, <code>api2</code> fails, but <code>api3</code> succeeds → <code>api3</code>'s result is returned.</p>
<p>If all Promises fail, <code>Promise.any()</code> rejects with an <code>AggregateError</code>.</p>
<p>Remember: <strong>any</strong> → First successful one.</p>`,
        },
        {
          id: "js-async-await",
          q: "What does async/await actually do?",
          a: `<p><code>async</code>/<code>await</code> is a cleaner way to work with Promises. The <code>async</code> keyword makes a function return a Promise, and <code>await</code> pauses the execution of that async function until the Promise settles. It makes asynchronous code look and behave more like synchronous code, which makes it easier to read and handle.</p>
<pre><code>async function getUser() {
  const response = await fetch("/api/user");
  const data = await response.json();

  console.log(data);
}</code></pre>
<p>Here:</p>
<ul>
<li><code>async</code> → makes <code>getUser()</code> return a Promise.</li>
<li><code>await</code> → waits for the Promise result inside that async function.</li>
<li>It does not block the JavaScript main thread; other JavaScript work can continue.</li>
</ul>
<p>In short: <code>async</code>/<code>await</code> is syntactic sugar over Promises that makes asynchronous code easier to write and read. <code>await</code> waits for a Promise to settle without blocking the main JavaScript thread.</p>
<p>Do not await independent work in sequence. Start them together, then await:</p>
<pre><code>const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(),
]);</code></pre>`,
        },
        {
          id: "js-memory",
          q: "What causes memory leaks in JavaScript?",
          a: `<ul>
<li>Forgotten timers or intervals.</li>
<li>Event listeners not removed.</li>
<li>Closures holding large objects you no longer need.</li>
<li>Detached DOM nodes still referenced from JS.</li>
<li>Global caches that grow without bounds.</li>
</ul>
<p>Garbage collection frees objects that nothing can reach. Leaks happen when something still points at data you thought was gone.</p>`,
        },
        {
          id: "js-modules",
          q: "How do ES Modules differ from CommonJS?",
          a: `<p>ES Modules (ESM) and CommonJS are two different module systems used to organize and share code between files. ES Modules use <code>import</code> and <code>export</code>, while CommonJS uses <code>require()</code> and <code>module.exports</code>. ES Modules are the standard JavaScript module system and are commonly used in modern applications, while CommonJS is traditionally associated with Node.js.</p>
<p><strong>ES Modules:</strong></p>
<pre><code>// math.js
export const add = (a, b) => a + b;

// app.js
import { add } from "./math.js";</code></pre>
<p><strong>CommonJS:</strong></p>
<pre><code>// math.js
const add = (a, b) => a + b;

module.exports = { add };

// app.js
const { add } = require("./math");</code></pre>
<p class="table-label">Key difference</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>ES Modules</th>
        <th>CommonJS</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>import</code> / <code>export</code></td>
        <td><code>require()</code> / <code>module.exports</code></td>
      </tr>
      <tr>
        <td>Modern JavaScript standard</td>
        <td>Traditional Node.js module system</td>
      </tr>
      <tr>
        <td>Static module structure</td>
        <td>More dynamic</td>
      </tr>
      <tr>
        <td>Supports tree-shaking well</td>
        <td>Less suitable for tree-shaking</td>
      </tr>
    </tbody>
  </table>
</div>
<p>In browsers, modules need <code>type="module"</code> and are deferred by default. Mixing CJS and ESM in Node is a common tooling headache.</p>`,
        },
        {
          id: "js-map",
          q: "What is Map in JavaScript?",
          a: `<p><code>Map</code> is a built-in JavaScript data structure used to store data in key-value pairs. Unlike a normal object, a <code>Map</code> can use any type of value as a key, such as strings, numbers, objects, or functions. It also maintains the insertion order of its entries.</p>
<pre><code>const user = new Map();

user.set("name", "Nitin");
user.set("age", 25);

console.log(user.get("name")); // Nitin
console.log(user.has("age"));  // true</code></pre>
<p>Common methods:</p>
<ul>
<li><code>set()</code> → add/update a value</li>
<li><code>get()</code> → get a value</li>
<li><code>has()</code> → check if a key exists</li>
<li><code>delete()</code> → remove a key</li>
<li><code>size</code> → number of entries</li>
</ul>`,
        },
        {
          id: "js-set",
          q: "What is Set in JavaScript?",
          a: `<p><code>Set</code> is a built-in JavaScript data structure used to store a collection of unique values. It automatically removes duplicate values, and it can store values of any type.</p>
<pre><code>const numbers = new Set([1, 2, 2, 3, 3]);

console.log(numbers);
// Set {1, 2, 3}

numbers.add(4);
numbers.delete(2);

console.log(numbers.has(3)); // true</code></pre>
<p>Common methods:</p>
<ul>
<li><code>add()</code> → add a value</li>
<li><code>has()</code> → check if a value exists</li>
<li><code>delete()</code> → remove a value</li>
<li><code>clear()</code> → remove all values</li>
<li><code>size</code> → number of values</li>
</ul>`,
        },
      ],
    },
  ],
};
