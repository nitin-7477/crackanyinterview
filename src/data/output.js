export const output = {
  id: "output",
  title: "Output",
  heading: "Console output questions",
  tagline: "Predict the log, then explain why",
  lede: "These are console-based JavaScript questions. Read the snippet, say the output out loud, then open the answer.",
  tip: "Say the output first, then the reason. Interviewers care more about coercion, scope, and the event loop than about memorizing the line.",
  practice: {
    title: "Note",
    body: "Paste a snippet into the browser console only after you have written the output down. If you were wrong, name the rule: coercion, reference, hoisting, or task queue.",
  },
  takeaways: [
    "== coerces types. === does not. Objects are compared by reference, not by their contents.",
    "var is function-scoped and hoists as undefined. let and const are block-scoped and throw if you read them too early.",
    "Promise callbacks (microtasks) run before setTimeout (macrotasks). An async function always returns a Promise.",
  ],
  sections: [
    {
      title: "Type Coercion & Equality",
      level: "basic",
      questions: [
        {
          id: "out-eq-0-false",
          q: 'What is the output of 0 == false and 0 === false?',
          a: `<pre><code>console.log(0 == false);
console.log(0 === false);</code></pre>
<p><strong>Output</strong></p>
<p><code>true</code><br><code>false</code></p>
<p><code>==</code> converts <code>false</code> to <code>0</code>, so both sides are <code>0</code>. <code>===</code> also checks the type, and a number is not a boolean.</p>`,
        },
        {
          id: "out-eq-1-string",
          q: 'What is the output of 1 == "1" and 1 === "1"?',
          a: `<pre><code>console.log(1 == "1");
console.log(1 === "1");</code></pre>
<p><strong>Output</strong></p>
<p><code>true</code><br><code>false</code></p>
<p><code>==</code> converts the string <code>"1"</code> to the number <code>1</code>. <code>===</code> keeps the types, so a number is not equal to a string.</p>`,
        },
        {
          id: "out-eq-null-undefined",
          q: "What is the output of null == undefined and null === undefined?",
          a: `<pre><code>console.log(null == undefined);
console.log(null === undefined);</code></pre>
<p><strong>Output</strong></p>
<p><code>true</code><br><code>false</code></p>
<p><code>null</code> and <code>undefined</code> are loosely equal to each other, and to nothing else. They are still different types, so <code>===</code> is <code>false</code>.</p>`,
        },
        {
          id: "out-eq-string-0-false",
          q: 'What is the output of "0" == false and "0" === false?',
          a: `<pre><code>console.log("0" == false);
console.log("0" === false);</code></pre>
<p><strong>Output</strong></p>
<p><code>true</code><br><code>false</code></p>
<p><code>false</code> becomes <code>0</code>, then <code>"0"</code> becomes <code>0</code>, so the loose comparison is <code>true</code>. Strict comparison stays <code>false</code> because the types differ.</p>`,
        },
        {
          id: "out-eq-empty-false",
          q: 'What is the output of "" == false and "" === false?',
          a: `<pre><code>console.log("" == false);
console.log("" === false);</code></pre>
<p><strong>Output</strong></p>
<p><code>true</code><br><code>false</code></p>
<p><code>false</code> becomes <code>0</code>, and an empty string also becomes <code>0</code>. <code>===</code> does not coerce, so the result is <code>false</code>.</p>`,
        },
        {
          id: "out-eq-array-false",
          q: "What is the output of [] == false and [] === false?",
          a: `<pre><code>console.log([] == false);
console.log([] === false);</code></pre>
<p><strong>Output</strong></p>
<p><code>true</code><br><code>false</code></p>
<p><code>false</code> becomes <code>0</code>. The array is converted to a string first, which is <code>""</code>, and <code>""</code> becomes <code>0</code>. Strict comparison does not do that conversion.</p>`,
        },
        {
          id: "out-eq-array-array",
          q: "What is the output of [] == [] and [] === []?",
          a: `<pre><code>console.log([] == []);
console.log([] === []);</code></pre>
<p><strong>Output</strong></p>
<p><code>false</code><br><code>false</code></p>
<p>Each <code>[]</code> creates a new array. When both sides are objects, <code>==</code> and <code>===</code> compare references, not the values inside.</p>`,
        },
        {
          id: "out-eq-object-object",
          q: "What is the output of {} == {} and {} === {}?",
          a: `<pre><code>console.log({} == {});
console.log({} === {});</code></pre>
<p><strong>Output</strong></p>
<p><code>false</code><br><code>false</code></p>
<p>Each <code>{}</code> is a different object in memory. Equality checks whether they are the same object, not whether they look the same.</p>`,
        },
        {
          id: "out-eq-nan",
          q: "What is the output of NaN == NaN and NaN === NaN?",
          a: `<pre><code>console.log(NaN == NaN);
console.log(NaN === NaN);</code></pre>
<p><strong>Output</strong></p>
<p><code>false</code><br><code>false</code></p>
<p><code>NaN</code> is not equal to anything, including itself. Check it with <code>Number.isNaN(value)</code> or <code>Object.is(value, NaN)</code>.</p>`,
        },
        {
          id: "out-eq-true-1",
          q: "What is the output of true == 1 and false == 0?",
          a: `<pre><code>console.log(true == 1);
console.log(false == 0);</code></pre>
<p><strong>Output</strong></p>
<p><code>true</code><br><code>true</code></p>
<p>A boolean is converted to a number in a loose comparison. <code>true</code> becomes <code>1</code> and <code>false</code> becomes <code>0</code>.</p>`,
        },
      ],
    },
    {
      title: "typeof",
      level: "basic",
      questions: [
        {
          id: "out-typeof-null",
          q: "What is the output of typeof null and typeof undefined?",
          a: `<pre><code>console.log(typeof null);
console.log(typeof undefined);</code></pre>
<p><strong>Output</strong></p>
<p><code>"object"</code><br><code>"undefined"</code></p>
<p><code>typeof null</code> returns <code>"object"</code>. That is a long-standing JavaScript bug. <code>null</code> is a primitive, not an object. <code>typeof undefined</code> is <code>"undefined"</code>.</p>`,
        },
        {
          id: "out-typeof-array-object",
          q: "What is the output of typeof [] and typeof {}?",
          a: `<pre><code>console.log(typeof []);
console.log(typeof {});</code></pre>
<p><strong>Output</strong></p>
<p><code>"object"</code><br><code>"object"</code></p>
<p>Arrays are objects, so <code>typeof</code> cannot tell an array from a plain object. Use <code>Array.isArray(value)</code> for arrays.</p>`,
        },
        {
          id: "out-typeof-function",
          q: "What is the output of typeof function () {}?",
          a: `<pre><code>console.log(typeof function () {});</code></pre>
<p><strong>Output</strong></p>
<p><code>"function"</code></p>
<p>Functions are objects, but <code>typeof</code> has a special result for them: <code>"function"</code>.</p>`,
        },
        {
          id: "out-typeof-nan-infinity",
          q: "What is the output of typeof NaN and typeof Infinity?",
          a: `<pre><code>console.log(typeof NaN);
console.log(typeof Infinity);</code></pre>
<p><strong>Output</strong></p>
<p><code>"number"</code><br><code>"number"</code></p>
<p>Both <code>NaN</code> and <code>Infinity</code> are number values. <code>typeof</code> reports the type, not whether the number is usable.</p>`,
        },
      ],
    },
    {
      title: "Strings & Numbers",
      level: "basic",
      questions: [
        {
          id: "out-plus-string",
          q: 'What is the output of 1 + "2", "1" + 2, 1 + 2 + "3", and "1" + 2 + 3?',
          a: `<pre><code>console.log(1 + "2");
console.log("1" + 2);
console.log(1 + 2 + "3");
console.log("1" + 2 + 3);</code></pre>
<p><strong>Output</strong></p>
<p><code>"12"</code><br><code>"12"</code><br><code>"33"</code><br><code>"123"</code></p>
<p><code>+</code> concatenates when either side is a string, and it runs left to right. <code>1 + 2 + "3"</code> adds the numbers first (<code>3</code>), then joins <code>"3"</code>. <code>"1" + 2 + 3</code> becomes a string on the first <code>+</code>, so the rest is concatenation.</p>`,
        },
        {
          id: "out-string-math",
          q: 'What is the output of "5" - 2, "5" * 2, and "5" / 2?',
          a: `<pre><code>console.log("5" - 2);
console.log("5" * 2);
console.log("5" / 2);</code></pre>
<p><strong>Output</strong></p>
<p><code>3</code><br><code>10</code><br><code>2.5</code></p>
<p><code>-</code>, <code>*</code>, and <code>/</code> always do numeric math. The string <code>"5"</code> is converted to the number <code>5</code>.</p>`,
        },
        {
          id: "out-ten-plus-minus",
          q: 'What is the output of "10" + 5 and "10" - 5?',
          a: `<pre><code>console.log("10" + 5);
console.log("10" - 5);</code></pre>
<p><strong>Output</strong></p>
<p><code>"105"</code><br><code>5</code></p>
<p><code>+</code> with a string concatenates. <code>-</code> converts both sides to numbers and subtracts.</p>`,
        },
        {
          id: "out-null-undefined-add",
          q: "What is the output of 10 + null and 10 + undefined?",
          a: `<pre><code>console.log(10 + null);
console.log(10 + undefined);</code></pre>
<p><strong>Output</strong></p>
<p><code>10</code><br><code>NaN</code></p>
<p><code>null</code> becomes <code>0</code> in numeric math, so <code>10 + null</code> is <code>10</code>. <code>undefined</code> becomes <code>NaN</code>, and any math with <code>NaN</code> stays <code>NaN</code>.</p>`,
        },
        {
          id: "out-true-plus",
          q: "What is the output of true + true and true + false?",
          a: `<pre><code>console.log(true + true);
console.log(true + false);</code></pre>
<p><strong>Output</strong></p>
<p><code>2</code><br><code>1</code></p>
<p><code>+</code> converts booleans to numbers. <code>true</code> is <code>1</code> and <code>false</code> is <code>0</code>.</p>`,
        },
        {
          id: "out-string-true",
          q: 'What is the output of "5" + true and "5" - true?',
          a: `<pre><code>console.log("5" + true);
console.log("5" - true);</code></pre>
<p><strong>Output</strong></p>
<p><code>"5true"</code><br><code>4</code></p>
<p><code>+</code> sees a string and concatenates, so <code>true</code> becomes the text <code>"true"</code>. <code>-</code> converts both sides to numbers: <code>5 - 1</code> is <code>4</code>.</p>`,
        },
      ],
    },
    {
      title: "Variables & Hoisting",
      level: "intermediate",
      questions: [
        {
          id: "out-var-hoist",
          q: "What is the output of console.log(a) before var a = 10?",
          a: `<pre><code>console.log(a);
var a = 10;</code></pre>
<p><strong>Output</strong></p>
<p><code>undefined</code></p>
<p><code>var</code> is hoisted and initialized to <code>undefined</code>. The assignment <code>a = 10</code> happens later, on the line where it is written.</p>`,
        },
        {
          id: "out-let-tdz",
          q: "What happens if you read a before let a = 10?",
          a: `<pre><code>console.log(a);
let a = 10;</code></pre>
<p><strong>Output</strong></p>
<p><code>ReferenceError: Cannot access 'a' before initialization</code></p>
<p><code>let</code> is hoisted, but it stays uninitialized until its line runs. That gap is the temporal dead zone. Reading it early throws.</p>`,
        },
        {
          id: "out-const-tdz",
          q: "What happens if you read a before const a = 10?",
          a: `<pre><code>console.log(a);
const a = 10;</code></pre>
<p><strong>Output</strong></p>
<p><code>ReferenceError: Cannot access 'a' before initialization</code></p>
<p><code>const</code> has the same temporal dead zone as <code>let</code>. The variable exists, but you cannot read it before the declaration line.</p>`,
        },
        {
          id: "out-var-block",
          q: "What is the output when var is redeclared inside a block?",
          a: `<pre><code>var a = 10;

{
  var a = 20;
}

console.log(a);</code></pre>
<p><strong>Output</strong></p>
<p><code>20</code></p>
<p><code>var</code> is function-scoped, not block-scoped. Both declarations are the same <code>a</code>, so the inner assignment overwrites <code>10</code>.</p>`,
        },
        {
          id: "out-let-block",
          q: "What is the output when let is redeclared inside a block?",
          a: `<pre><code>let a = 10;

{
  let a = 20;
}

console.log(a);</code></pre>
<p><strong>Output</strong></p>
<p><code>10</code></p>
<p><code>let</code> is block-scoped. The inner <code>a</code> is a different variable and disappears when the block ends. The outer <code>a</code> is still <code>10</code>.</p>`,
        },
        {
          id: "out-var-function",
          q: "What is the output of a var declared inside a function?",
          a: `<pre><code>var a = 10;

function test() {
  var a = 20;
}

test();
console.log(a);</code></pre>
<p><strong>Output</strong></p>
<p><code>10</code></p>
<p>A <code>var</code> inside a function belongs to that function. It does not change the outer <code>a</code>.</p>`,
        },
        {
          id: "out-let-function",
          q: "What is the output of a let declared inside a function?",
          a: `<pre><code>let a = 10;

function test() {
  let a = 20;
  console.log(a);
}

test();
console.log(a);</code></pre>
<p><strong>Output</strong></p>
<p><code>20</code><br><code>10</code></p>
<p>The function logs its own <code>a</code>. After the call, the outer <code>console.log</code> still sees <code>10</code>.</p>`,
        },
      ],
    },
    {
      title: "Functions",
      level: "intermediate",
      questions: [
        {
          id: "out-fn-declaration",
          q: "What is the output of calling a function declaration before it is written?",
          a: `<pre><code>sayHello();

function sayHello() {
  console.log("Hello");
}</code></pre>
<p><strong>Output</strong></p>
<p><code>"Hello"</code></p>
<p>A function declaration is hoisted with its body. You can call it before the line where it appears in the file.</p>`,
        },
        {
          id: "out-fn-expression",
          q: "What happens if you call a function expression before it is initialized?",
          a: `<pre><code>sayHello();

const sayHello = function () {
  console.log("Hello");
};</code></pre>
<p><strong>Output</strong></p>
<p><code>ReferenceError: Cannot access 'sayHello' before initialization</code></p>
<p>This is a <code>const</code> binding, not a hoisted function declaration. The function exists only after that line runs, so the earlier call hits the temporal dead zone.</p>`,
        },
        {
          id: "out-arrow-add",
          q: "What is the output of an arrow function that adds 2 and 3?",
          a: `<pre><code>const add = (a, b) => a + b;

console.log(add(2, 3));</code></pre>
<p><strong>Output</strong></p>
<p><code>5</code></p>
<p>An arrow with no braces returns the expression after <code>=&gt;</code>. <code>2 + 3</code> is <code>5</code>.</p>`,
        },
        {
          id: "out-return-asi",
          q: "What is the output of return followed by an object on the next line?",
          a: `<pre><code>function test() {
  return;
  {
    value: 10
  }
}

console.log(test());</code></pre>
<p><strong>Output</strong></p>
<p><code>undefined</code></p>
<p>JavaScript inserts a semicolon after <code>return</code> when the next token is on a new line. The function returns <code>undefined</code>. The braces below are a block, not an object being returned. Put the <code>{</code> on the same line as <code>return</code>.</p>`,
        },
        {
          id: "out-fn-var-hoist",
          q: "What is the output of console.log(a) before var a = 10 inside a function?",
          a: `<pre><code>function test() {
  console.log(a);
  var a = 10;
}

test();</code></pre>
<p><strong>Output</strong></p>
<p><code>undefined</code></p>
<p><code>var a</code> is hoisted to the top of <code>test</code> and starts as <code>undefined</code>. The value <code>10</code> is assigned after the log.</p>`,
        },
      ],
    },
    {
      title: "Scope & Closure",
      level: "intermediate",
      questions: [
        {
          id: "out-shadow",
          q: "What is the output when an inner let shadows an outer let?",
          a: `<pre><code>let x = 10;

function test() {
  let x = 20;
  console.log(x);
}

test();
console.log(x);</code></pre>
<p><strong>Output</strong></p>
<p><code>20</code><br><code>10</code></p>
<p>Inside <code>test</code>, the inner <code>x</code> hides the outer one. Outside the function, the outer <code>x</code> is still <code>10</code>.</p>`,
        },
        {
          id: "out-lexical",
          q: "What is the output of a nested function reading x?",
          a: `<pre><code>let x = 10;

function outer() {
  let x = 20;

  function inner() {
    console.log(x);
  }

  inner();
}

outer();</code></pre>
<p><strong>Output</strong></p>
<p><code>20</code></p>
<p><code>inner</code> reads <code>x</code> from the closest outer scope where it was written. That is <code>outer</code>'s <code>x</code>, not the global <code>10</code>.</p>`,
        },
        {
          id: "out-closure-counter",
          q: "What is the output of a closure counter called three times?",
          a: `<pre><code>function outer() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const counter = outer();

counter();
counter();
counter();</code></pre>
<p><strong>Output</strong></p>
<p><code>1</code><br><code>2</code><br><code>3</code></p>
<p>The returned function keeps <code>count</code> from <code>outer</code> after <code>outer</code> has finished. Each call updates that same <code>count</code>.</p>`,
        },
      ],
    },
    {
      title: "this",
      level: "intermediate",
      questions: [
        {
          id: "out-this-method",
          q: "What is the output of this inside a method?",
          a: `<pre><code>const user = {
  name: "Nitin",

  greet() {
    console.log(this.name);
  }
};

user.greet();</code></pre>
<p><strong>Output</strong></p>
<p><code>"Nitin"</code></p>
<p>A regular method gets <code>this</code> from the call. <code>user.greet()</code> sets <code>this</code> to <code>user</code>.</p>`,
        },
        {
          id: "out-this-arrow-method",
          q: "What is the output of this inside an arrow function used as a method?",
          a: `<pre><code>const user = {
  name: "Nitin",

  greet: () => {
    console.log(this.name);
  }
};

user.greet();</code></pre>
<p><strong>Output</strong></p>
<p><code>undefined</code></p>
<p>An arrow function does not get its own <code>this</code>. Calling <code>user.greet()</code> does not point <code>this</code> at <code>user</code>. It uses the surrounding <code>this</code>, which does not have <code>name: "Nitin"</code>.</p>`,
        },
        {
          id: "out-this-arrow-inner",
          q: "What is the output of an arrow function inside a method?",
          a: `<pre><code>const user = {
  name: "Nitin",

  greet() {
    const inner = () => {
      console.log(this.name);
    };

    inner();
  }
};

user.greet();</code></pre>
<p><strong>Output</strong></p>
<p><code>"Nitin"</code></p>
<p><code>greet</code> is a regular method, so its <code>this</code> is <code>user</code>. The inner arrow copies that <code>this</code> from <code>greet</code>.</p>`,
        },
        {
          id: "out-call",
          q: "What is the output of greet.call(user)?",
          a: `<pre><code>const user = {
  name: "Nitin"
};

function greet() {
  console.log(this.name);
}

greet.call(user);</code></pre>
<p><strong>Output</strong></p>
<p><code>"Nitin"</code></p>
<p><code>call</code> invokes the function immediately and sets <code>this</code> to the object you pass. Here that object is <code>user</code>.</p>`,
        },
        {
          id: "out-apply",
          q: "What is the output of greet.apply(user, [25])?",
          a: `<pre><code>const user = {
  name: "Nitin"
};

function greet(age) {
  console.log(this.name, age);
}

greet.apply(user, [25]);</code></pre>
<p><strong>Output</strong></p>
<p><code>"Nitin" 25</code></p>
<p><code>apply</code> also sets <code>this</code> and calls the function now. The difference from <code>call</code> is that the arguments go in an array.</p>`,
        },
      ],
    },
    {
      title: "Arrays",
      level: "basic",
      questions: [
        {
          id: "out-map-double",
          q: "What is the output of map multiplying each number by 2?",
          a: `<pre><code>const arr = [1, 2, 3];

console.log(arr.map(x => x * 2));</code></pre>
<p><strong>Output</strong></p>
<p><code>[2, 4, 6]</code></p>
<p><code>map</code> builds a new array from the value each callback returns. The original array stays <code>[1, 2, 3]</code>.</p>`,
        },
        {
          id: "out-filter-even",
          q: "What is the output of filter keeping even numbers?",
          a: `<pre><code>const arr = [1, 2, 3, 4];

console.log(arr.filter(x => x % 2 === 0));</code></pre>
<p><strong>Output</strong></p>
<p><code>[2, 4]</code></p>
<p><code>filter</code> keeps the items whose callback returns a truthy value. <code>1</code> and <code>3</code> are odd, so they are dropped.</p>`,
        },
        {
          id: "out-reduce-sum",
          q: "What is the output of reduce summing an array?",
          a: `<pre><code>const arr = [1, 2, 3, 4];

console.log(
  arr.reduce((sum, value) => sum + value, 0)
);</code></pre>
<p><strong>Output</strong></p>
<p><code>10</code></p>
<p><code>reduce</code> starts at <code>0</code> and adds each value: <code>0 + 1 + 2 + 3 + 4</code>.</p>`,
        },
        {
          id: "out-map-no-return",
          q: "What is the output of map with a block that does not return?",
          a: `<pre><code>const arr = [1, 2, 3];

console.log(arr.map(x => {
  x * 2;
}));</code></pre>
<p><strong>Output</strong></p>
<p><code>[undefined, undefined, undefined]</code></p>
<p>A block body does not return the last expression. There is no <code>return</code>, so each callback returns <code>undefined</code>. <code>x * 2</code> is calculated and thrown away.</p>`,
        },
        {
          id: "out-map-implicit",
          q: "What is the output of map with an implicit return?",
          a: `<pre><code>const arr = [1, 2, 3];

console.log(arr.map(x => x * 2));</code></pre>
<p><strong>Output</strong></p>
<p><code>[2, 4, 6]</code></p>
<p>Without braces, the arrow returns <code>x * 2</code>. This is the version that actually builds <code>[2, 4, 6]</code>.</p>`,
        },
        {
          id: "out-push",
          q: "What is the output after push(4)?",
          a: `<pre><code>const arr = [1, 2, 3];

arr.push(4);

console.log(arr);</code></pre>
<p><strong>Output</strong></p>
<p><code>[1, 2, 3, 4]</code></p>
<p><code>push</code> adds the value to the end of the same array. The log prints the array, not the length that <code>push</code> returns.</p>`,
        },
        {
          id: "out-pop",
          q: "What is the output of pop()?",
          a: `<pre><code>const arr = [1, 2, 3];

console.log(arr.pop());
console.log(arr);</code></pre>
<p><strong>Output</strong></p>
<p><code>3</code><br><code>[1, 2]</code></p>
<p><code>pop</code> removes and returns the last item. The array is then <code>[1, 2]</code>.</p>`,
        },
      ],
    },
    {
      title: "Objects & References",
      level: "intermediate",
      questions: [
        {
          id: "out-shared-ref",
          q: "What is the output after changing a property through another variable?",
          a: `<pre><code>const a = { name: "Nitin" };
const b = a;

b.name = "Rahul";

console.log(a.name);</code></pre>
<p><strong>Output</strong></p>
<p><code>"Rahul"</code></p>
<p><code>b = a</code> copies the reference, not the object. <code>a</code> and <code>b</code> point at the same object, so changing <code>b.name</code> changes <code>a.name</code>.</p>`,
        },
        {
          id: "out-two-objects",
          q: "What is the output of comparing two objects with the same contents?",
          a: `<pre><code>const a = { name: "Nitin" };
const b = { name: "Nitin" };

console.log(a === b);</code></pre>
<p><strong>Output</strong></p>
<p><code>false</code></p>
<p>Same contents do not mean the same object. <code>a</code> and <code>b</code> were created separately, so the references differ.</p>`,
        },
        {
          id: "out-same-ref",
          q: "What is the output of comparing an object with a variable that points at it?",
          a: `<pre><code>const a = { name: "Nitin" };
const b = a;

console.log(a === b);</code></pre>
<p><strong>Output</strong></p>
<p><code>true</code></p>
<p><code>b</code> was assigned <code>a</code>, so both variables hold the same reference.</p>`,
        },
        {
          id: "out-shallow-spread",
          q: "What is the output after changing a nested property on a spread copy?",
          a: `<pre><code>const user = {
  name: "Nitin",
  address: {
    city: "Delhi"
  }
};

const copy = { ...user };

copy.address.city = "Mumbai";

console.log(user.address.city);</code></pre>
<p><strong>Output</strong></p>
<p><code>"Mumbai"</code></p>
<p>Spread makes a shallow copy. <code>copy.address</code> and <code>user.address</code> are still the same nested object, so the city change shows up on both.</p>`,
        },
      ],
    },
    {
      title: "Spread, Rest & Destructuring",
      level: "basic",
      questions: [
        {
          id: "out-spread-array",
          q: "What is the output of spreading an array and adding 4?",
          a: `<pre><code>const a = [1, 2, 3];
const b = [...a, 4];

console.log(b);</code></pre>
<p><strong>Output</strong></p>
<p><code>[1, 2, 3, 4]</code></p>
<p>Spread copies the items of <code>a</code> into a new array, then <code>4</code> is added at the end. <code>a</code> itself stays <code>[1, 2, 3]</code>.</p>`,
        },
        {
          id: "out-rest",
          q: "What is the output of a rest parameter collecting 1, 2, 3?",
          a: `<pre><code>function test(...args) {
  console.log(args);
}

test(1, 2, 3);</code></pre>
<p><strong>Output</strong></p>
<p><code>[1, 2, 3]</code></p>
<p>Rest gathers the arguments into one array. <code>args</code> is <code>[1, 2, 3]</code>.</p>`,
        },
        {
          id: "out-destructure",
          q: "What is the output of destructuring name and age?",
          a: `<pre><code>const user = {
  name: "Nitin",
  age: 25
};

const { name, age } = user;

console.log(name, age);</code></pre>
<p><strong>Output</strong></p>
<p><code>"Nitin" 25</code></p>
<p>Object destructuring reads properties by name and creates local variables <code>name</code> and <code>age</code>.</p>`,
        },
      ],
    },
    {
      title: "Promises & Async",
      level: "advanced",
      questions: [
        {
          id: "out-promise-then",
          q: "What is the output of a Promise then between two logs?",
          a: `<pre><code>console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");</code></pre>
<p><strong>Output</strong></p>
<p><code>"Start"</code><br><code>"End"</code><br><code>"Promise"</code></p>
<p>The synchronous logs run first. A <code>then</code> callback is a microtask, so it runs after the current code finishes and before timers.</p>`,
        },
        {
          id: "out-timeout-0",
          q: "What is the output of setTimeout 0 between two logs?",
          a: `<pre><code>console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");</code></pre>
<p><strong>Output</strong></p>
<p><code>"Start"</code><br><code>"End"</code><br><code>"Timeout"</code></p>
<p><code>setTimeout</code> queues a macrotask even when the delay is <code>0</code>. The current script finishes before that callback runs.</p>`,
        },
        {
          id: "out-micro-macro",
          q: "What is the output of setTimeout and Promise together?",
          a: `<pre><code>console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");</code></pre>
<p><strong>Output</strong></p>
<p><code>"1"</code><br><code>"4"</code><br><code>"3"</code><br><code>"2"</code></p>
<p>Synchronous code runs first: <code>1</code>, then <code>4</code>. The promise callback is a microtask, so <code>3</code> runs next. The timer is a macrotask, so <code>2</code> is last.</p>`,
        },
        {
          id: "out-two-promises",
          q: "What is the output of one timeout and two promise callbacks?",
          a: `<pre><code>setTimeout(() => console.log("A"), 0);

Promise.resolve().then(() => console.log("B"));

Promise.resolve().then(() => console.log("C"));

console.log("D");</code></pre>
<p><strong>Output</strong></p>
<p><code>"D"</code><br><code>"B"</code><br><code>"C"</code><br><code>"A"</code></p>
<p><code>D</code> is synchronous. <code>B</code> and <code>C</code> are microtasks and run in the order they were queued. <code>A</code> waits for the timer queue.</p>`,
        },
        {
          id: "out-async-await-order",
          q: "What is the output of async/await mixed with logs?",
          a: `<pre><code>async function test() {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}

console.log("C");

test();

console.log("D");</code></pre>
<p><strong>Output</strong></p>
<p><code>"C"</code><br><code>"A"</code><br><code>"D"</code><br><code>"B"</code></p>
<p><code>C</code> runs before <code>test</code> is called. <code>A</code> is synchronous inside <code>test</code>. <code>await</code> pauses the rest of <code>test</code>, so <code>D</code> runs next. <code>B</code> resumes as a microtask after that.</p>`,
        },
        {
          id: "out-async-return",
          q: 'What is the output of console.log on an async function that returns "Hello"?',
          a: `<pre><code>async function test() {
  return "Hello";
}

console.log(test());</code></pre>
<p><strong>Output</strong></p>
<p><code>Promise { &lt;fulfilled&gt;: "Hello" }</code></p>
<p>An <code>async</code> function always returns a Promise. <code>console.log</code> prints that Promise. It does not wait for <code>"Hello"</code>. Use <code>await test()</code> or <code>.then</code> to read the string.</p>`,
        },
      ],
    },
  ],
};
