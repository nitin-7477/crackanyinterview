export const react = {
  id: "react",
  title: "React",
  heading: "UI as a function of state",
  tagline: "Components, hooks, rendering, and performance",
  lede: "Ten days, 25 questions each. The next day opens after every question for the day is marked as read.",
  tip: "React is a library, not a language. You still write JavaScript. JSX looks like HTML, but it compiles to function calls.",
  practice: {
    title: "Note",
    body: "Read the 25 questions for the day and mark each one complete. The next day opens only after all 25 are read.",
  },
  takeaways: [
    "React is a JavaScript library for building user interfaces from reusable components.",
    "It uses a declarative approach and updates the DOM when data changes.",
  ],
  sections: [
    {
      title: "React",
      level: "basic",
      questions: [
        {
          id: "react-what",
          q: "What is React.js, and why is it used?",
          a: `<p>React.js is an open-source JavaScript library developed by Meta for building user interfaces, especially for web applications. It allows us to break complex UIs into small, reusable components, making applications easier to maintain and scale. React uses a declarative approach to update the UI when data changes.</p>
<p><strong>Why is it used?</strong> React promotes component reusability, simplifies UI development, and efficiently updates the DOM when necessary.</p>`,
        },
        {
          id: "react-features",
          q: "What are the main features of React?",
          a: `<p>The main features of React are:</p>
<ol>
<li><strong>Component-Based Architecture:</strong> Builds UIs using small, reusable components.</li>
<li><strong>Declarative UI:</strong> We describe how the UI should look, and React manages updates.</li>
<li><strong>Virtual DOM:</strong> Helps React determine which DOM changes are necessary.</li>
<li><strong>One-Way Data Flow:</strong> Data flows from parent components to child components through props.</li>
<li><strong>Hooks:</strong> Allow functional components to manage state and use features like effects.</li>
<li><strong>Efficient Rendering:</strong> Reconciliation helps React update the UI when data changes.</li>
</ol>`,
        },
        {
          id: "react-library-vs-framework",
          q: "Is React a library or a framework? What is the difference?",
          a: `<p>React is a JavaScript library, not a framework, because it primarily focuses on building user interfaces.</p>
<ul>
<li><strong>Library:</strong> Provides specific functionality that developers can use as needed.</li>
<li><strong>Framework:</strong> Provides a broader structure and conventions for building applications.</li>
</ul>`,
        },
        {
          id: "react-problems",
          q: "What problems does React solve in frontend development?",
          a: `<p>React makes it easier to build interactive websites by breaking the UI into small, reusable components. It updates the UI when data changes, so we don't have to manually update the DOM. It also makes code easier to manage, reuse, and maintain.</p>`,
        },
        {
          id: "react-spa",
          q: "What is a Single Page Application (SPA)?",
          a: `<p>A Single Page Application (SPA) is a web application that loads a single HTML page and updates its content dynamically without reloading the entire page. It provides a faster and smoother user experience.</p>`,
        },
        {
          id: "react-traditional-vs-spa",
          q: "What is the difference between a traditional website and an SPA?",
          a: `<p>A traditional website reloads a new page from the server when navigating between pages, while an SPA updates the content dynamically without reloading the entire page.</p>`,
        },
        {
          id: "react-component",
          q: "What is a component in React?",
          a: `<p>A component in React is a reusable, independent piece of UI that defines how a part of the interface should look and behave. Components help us break a complex UI into smaller, manageable parts.</p>
<p><strong>Example:</strong> Navbar, Login Form, and Product Card can each be separate React components.</p>`,
        },
        {
          id: "react-functional-vs-class",
          q: "What is the difference between functional and class components?",
          a: `<p>Functional components are JavaScript functions that return JSX. They use Hooks like <code>useState</code> and <code>useEffect</code> to manage state and side effects.</p>
<p>Class components are ES6 classes that extend <code>React.Component</code> and use lifecycle methods and <code>this.state</code> to manage state.</p>
<p><strong>Key difference:</strong> Functional components are simpler and use Hooks, so they are the preferred approach for modern React development.</p>`,
        },
        {
          id: "react-jsx",
          q: "What is JSX, and why do we use it?",
          a: `<p>JSX (JavaScript XML) is a syntax extension for JavaScript that lets us write HTML-like code inside JavaScript to describe the UI. It makes React components easier to read and write.</p>
<p><strong>Why use it?</strong> JSX makes UI code more readable and allows us to combine JavaScript logic with UI structure. It is transformed into JavaScript by tools like Babel before execution.</p>`,
        },
        {
          id: "react-jsx-browsers",
          q: "Can browsers understand JSX directly?",
          a: `<p>No, browsers cannot understand JSX directly because it is not valid standard JavaScript syntax. JSX must first be transformed into regular JavaScript by tools like Babel, and then the browser can execute it.</p>`,
        },
        {
          id: "react-jsx-compiled",
          q: "What happens internally when JSX is compiled?",
          a: `<p>When we write JSX, tools like Babel convert it into regular JavaScript that the browser can understand. React then uses that code to figure out what the UI should look like and updates the DOM when needed.</p>`,
        },
        {
          id: "react-vs-reactdom",
          q: "What is the difference between React and ReactDOM?",
          a: `<p>React is the library used to build UI components and manage their state and logic. ReactDOM connects React to the browser DOM and renders those components on a web page.</p>`,
        },
        {
          id: "react-createroot",
          q: "What is the purpose of createRoot()?",
          a: `<p><code>createRoot()</code> is a function provided by <code>react-dom/client</code> that creates a root for rendering React components into a DOM element.</p>
<p><strong>Example:</strong> <code>createRoot(document.getElementById('root')).render(&lt;App /&gt;)</code> initializes the React application inside the HTML element with the ID <code>root</code>.</p>`,
        },
        {
          id: "react-vs-javascript",
          q: "What is the difference between React and JavaScript?",
          a: `<p>JavaScript is a programming language used to add logic and interactivity to applications. React is a JavaScript library used to build user interfaces using reusable components.</p>
<p><strong>Example:</strong> JavaScript handles calculations and logic, while React helps display and update that data in the UI.</p>`,
        },
        {
          id: "react-declarative",
          q: "What is declarative programming, and how does React use it?",
          a: `<p>Declarative programming means describing what you want the result to look like rather than specifying every step to achieve it. React uses this approach by letting us describe the UI based on the current state, and React handles the necessary updates.</p>
<p><strong>Example:</strong> We update a counter's state, and React automatically updates the displayed number.</p>`,
        },
        {
          id: "react-declarative-vs-imperative",
          q: "What is the difference between declarative and imperative programming?",
          a: `<p>Declarative programming means describing what result you want, while imperative programming means explaining step by step how to achieve that result.</p>`,
        },
        {
          id: "react-component-tree",
          q: "What is the React component tree?",
          a: `<p>The React component tree is the hierarchical structure that shows how components are nested inside one another. A parent component can contain multiple child components, forming a tree-like structure.</p>
<p><strong>Example:</strong> App → Navbar, Sidebar, Dashboard means App is the parent, and the others are its children.</p>`,
        },
        {
          id: "react-advantages-disadvantages",
          q: "What are the advantages and disadvantages of React?",
          a: `<p><strong>Advantages of React:</strong></p>
<ol>
<li><strong>Reusable Components:</strong> Reduces code duplication and improves maintainability.</li>
<li><strong>Efficient UI Updates:</strong> Updates only the necessary parts of the DOM.</li>
<li><strong>Easy to Maintain:</strong> Component-based architecture makes code easier to manage.</li>
<li><strong>Large Ecosystem:</strong> Provides many libraries and tools for development.</li>
</ol>
<p><strong>Disadvantages of React:</strong></p>
<ol>
<li><strong>Only a UI Library:</strong> Requires additional libraries for routing and other features.</li>
<li><strong>Learning Curve:</strong> Advanced concepts like Hooks and state management take time to understand.</li>
<li><strong>SEO Challenges:</strong> Client-side rendered applications may need SSR for better SEO.</li>
<li><strong>Performance Issues:</strong> Poor state management and unnecessary re-renders can affect performance.</li>
</ol>`,
        },
        {
          id: "react-vs-angular-vue",
          q: "What is the difference between React and Angular or Vue?",
          a: `<p>React is a UI library, Angular is a full-featured framework, and Vue is a progressive JavaScript framework.</p>
<ul>
<li><strong>React:</strong> Flexible and component-based; requires additional libraries for routing and other features.</li>
<li><strong>Angular:</strong> Provides built-in features like routing, dependency injection, and form handling.</li>
<li><strong>Vue:</strong> Offers a simpler learning curve with built-in directives and a flexible component system.</li>
</ul>`,
        },
        {
          id: "react-working-mechanism",
          q: "How would you explain React's working mechanism",
          a: `<p>React builds the UI using reusable components. When props or state change, React re-renders the component, compares the new UI with the previous one through reconciliation, and updates the necessary parts of the DOM. This makes UI updates easier to manage without manually manipulating the DOM.</p>`,
        },
        {
          id: "react-jsx-rules",
          q: "What are the rules of writing JSX?",
          a: `<ol>
<li><strong>Single parent:</strong> JSX must return one parent element or a Fragment (<code>&lt;&gt;...&lt;/&gt;</code>).</li>
<li><strong>Close all tags:</strong> Every element must be properly closed, e.g., <code>&lt;img /&gt;</code>.</li>
<li><strong>Use camelCase:</strong> Event handlers use camelCase, such as <code>onClick</code>.</li>
<li><strong>Use className:</strong> Instead of HTML's <code>class</code> attribute.</li>
<li><strong>JavaScript expressions:</strong> Use curly braces <code>{}</code> to write JavaScript inside JSX.</li>
</ol>`,
        },
        {
          id: "react-jsx-single-parent",
          q: "Why must JSX return a single parent element?",
          a: `<p>JSX must return a single parent element because a component must return one React element or a single root value. To return multiple elements, we can wrap them in a <code>&lt;div&gt;</code> or a React Fragment (<code>&lt;&gt;...&lt;/&gt;</code>), which avoids adding an unnecessary DOM element.</p>`,
        },
        {
          id: "react-fragment",
          q: "What is a React Fragment, and when should you use it?",
          a: `<p>A React Fragment lets us group multiple JSX elements without adding an extra DOM element to the page. We use it when a component needs to return multiple elements but we don't want an unnecessary wrapper like a <code>&lt;div&gt;</code>.</p>
<p><strong>Example:</strong> <code>&lt;&gt; &lt;h1&gt;Hello&lt;/h1&gt;&lt;p&gt;Welcome&lt;/p&gt; &lt;/&gt;</code></p>`,
        },
        {
          id: "react-fragment-vs-div",
          q: "What is the difference between <>...</> and a <div>?",
          a: `<p>A Fragment (<code>&lt;&gt;...&lt;/&gt;</code>) groups multiple elements without adding an extra DOM node, while a <code>&lt;div&gt;</code> creates an actual DOM element.</p>
<p>Use a Fragment when you only need to group elements; use a <code>&lt;div&gt;</code> when you need a wrapper for styling, layout, or other attributes.</p>`,
        },
        {
          id: "react-jsx-expressions",
          q: "How do you embed JavaScript expressions inside JSX?",
          a: `<p>We use curly braces <code>{}</code> to embed JavaScript expressions inside JSX. This allows us to display variables, perform calculations, and call functions directly in the UI.</p>
<p><strong>Example:</strong> <code>&lt;h1&gt;Hello, {name}&lt;/h1&gt;</code> displays the value of the <code>name</code> variable.</p>`,
        },
        {
          id: "react-html-vs-jsx",
          q: "What is the difference between HTML and JSX?",
          a: `<p>HTML is the standard markup language used to structure web pages, while JSX is a JavaScript syntax extension that lets us write HTML-like markup inside JavaScript.</p>
<p>In JSX, we use <code>className</code> instead of <code>class</code>, <code>htmlFor</code> instead of <code>for</code>, and curly braces <code>{}</code> to embed JavaScript expressions. JSX is transformed into JavaScript before execution.</p>`,
        },
        {
          id: "react-classname",
          q: "Why do we use className instead of class in JSX?",
          a: `<p>We use <code>className</code> instead of <code>class</code> because <code>class</code> is a reserved keyword in JavaScript. JSX uses JavaScript-compatible attribute names, and React maps <code>className</code> to the HTML <code>class</code> attribute when rendering the DOM.</p>`,
        },
        {
          id: "react-htmlfor",
          q: "Why is htmlFor used instead of for?",
          a: `<p>We use <code>htmlFor</code> instead of <code>for</code> in JSX because <code>for</code> is a reserved keyword in JavaScript. React uses <code>htmlFor</code> to associate a <code>&lt;label&gt;</code> with a form element, and it renders as the HTML <code>for</code> attribute.</p>`,
        },
        {
          id: "react-conditional-render",
          q: "How do you conditionally render elements in React?",
          a: `<p>In React, we use <code>if/else</code>, the ternary operator (<code>? :</code>), or the logical AND operator (<code>&amp;&amp;</code>) to render elements based on a condition.</p>
<p><strong>Example:</strong> <code>{isLoggedIn ? &lt;Dashboard /&gt; : &lt;Login /&gt;}</code> displays the Dashboard if the user is logged in; otherwise, it displays the Login component.</p>`,
        },
        {
          id: "react-conditional-operators",
          q: "What is the difference between &&, ternary operators, and if statements for rendering?",
          a: `<ul>
<li><strong><code>&amp;&amp;</code>:</strong> Renders an element only when the condition is true. Best for showing or hiding a single element.</li>
<li><strong>Ternary (<code>? :</code>):</strong> Renders one of two elements depending on the condition.</li>
<li><strong><code>if/else</code>:</strong> Used for more complex conditions or when rendering logic requires multiple statements.</li>
</ul>`,
        },
        {
          id: "react-render-list",
          q: "How do you render a list of elements in React?",
          a: `<p>In React, we use JavaScript's <code>map()</code> method to render a list of elements from an array. Each element should have a unique, stable key so React can identify it efficiently when the list changes.</p>`,
        },
        {
          id: "react-keys",
          q: "Why does React require keys when rendering lists?",
          a: `<p>React uses keys to uniquely identify list items between renders. They help React determine which items were added, removed, or changed, so it can update the UI correctly and efficiently.</p>`,
        },
        {
          id: "react-index-key",
          q: "What happens when you use an array index as a key?",
          a: `<p>Using an array index as a key can cause incorrect UI updates when items are added, removed, or reordered, because React may associate the wrong item with existing component state. Use a stable, unique ID whenever possible.</p>`,
        },
        {
          id: "react-unique-keys",
          q: "Why should keys be unique among sibling elements?",
          a: `<p>Keys help React identify each item among its siblings during rendering. Duplicate keys can confuse React's reconciliation process and cause incorrect updates.</p>`,
        },
        {
          id: "react-element-vs-component",
          q: "What is the difference between a React element and a React component?",
          a: `<p>A component is a function or class that defines UI, while an element is a description of what should appear on the screen. For example, <code>Button</code> is a component, and <code>&lt;Button /&gt;</code> creates a React element.</p>`,
        },
        {
          id: "react-pure-component",
          q: "What does it mean for a component to be pure?",
          a: `<p>A pure component produces the same output for the same props, state, and context, without causing side effects during rendering. It does not modify external data or its inputs during rendering.</p>`,
        },
        {
          id: "react-controlled-uncontrolled",
          q: "What are controlled and uncontrolled components?",
          a: `<p>A controlled component gets its input value from React state, while an uncontrolled component manages its value through the DOM, usually accessed using a ref.</p>`,
        },
        {
          id: "react-composition-vs-inheritance",
          q: "What is the difference between component composition and inheritance?",
          a: `<p>Composition builds complex components by combining smaller components, while inheritance allows one class to inherit properties and methods from another. React generally recommends composition for reusing UI and behavior.</p>`,
        },
        {
          id: "react-children",
          q: "What is the children prop, and how is it used?",
          a: `<p>The <code>children</code> prop contains the content placed between a component's opening and closing tags. It allows us to create reusable wrapper components.</p>
<p><strong>Example:</strong> <code>&lt;Card&gt;&lt;h1&gt;Hello&lt;/h1&gt;&lt;/Card&gt;</code> — the heading is passed as <code>children</code> to <code>Card</code>.</p>`,
        },
        {
          id: "react-reuse-component",
          q: "How would you reuse a component across multiple pages?",
          a: `<p>I would create a reusable component with configurable props and import it wherever needed. For example, a <code>Button</code> component can be reused on Login, Signup, and Checkout pages with different labels and actions.</p>`,
        },
        {
          id: "react-props",
          q: "What are props in React?",
          a: `<p>Props (properties) are used to pass data from a parent component to a child component. They make components reusable by allowing us to provide different data to each component.</p>`,
        },
        {
          id: "react-state",
          q: "What is state in React?",
          a: `<p>State is data managed inside a component that can change over time. When state is updated using its setter function, React re-renders the component to reflect the changes in the UI.</p>`,
        },
        {
          id: "react-props-vs-state",
          q: "What is the difference between props and state?",
          a: `<p>Props are passed from a parent component, while state is managed within a component. Props are read-only for the receiving component, whereas state can be updated using its setter function.</p>`,
        },
        {
          id: "react-props-immutable",
          q: "Are props mutable or immutable from the receiving component's perspective?",
          a: `<p>Props are read-only from the receiving component's perspective. A child should not modify its props directly; instead, the parent should provide updated values.</p>`,
        },
        {
          id: "react-pass-data",
          q: "How do you pass data from a parent component to a child?",
          a: `<p>We pass data through props by providing attributes when using the child component.</p>
<p><strong>Example:</strong> <code>&lt;Child name="Nitin" /&gt;</code> — the child receives <code>"Nitin"</code> through <code>props.name</code>.</p>`,
        },
        {
          id: "react-child-to-parent",
          q: "How can a child component communicate with its parent?",
          a: `<p>A parent can pass a callback function as a prop, and the child can call it to send data or notify the parent about an event.</p>`,
        },
        {
          id: "react-prop-drilling",
          q: "What is prop drilling?",
          a: `<p>Prop drilling means passing props through multiple intermediate components just to deliver data to a deeply nested child. It can make code harder to maintain.</p>`,
        },
        {
          id: "react-solve-prop-drilling",
          q: "How can you solve prop drilling?",
          a: `<p>We can use Context API or state-management libraries like Redux or Zustand to share data without passing props through every intermediate component. For simpler cases, component composition can also help.</p>`,
        },
        {
          id: "react-lifting-state",
          q: "What is lifting state up?",
          a: `<p>Lifting state up means moving state from child components to their nearest common parent so that multiple components can share and use the same data.</p>`,
        },
        {
          id: "react-move-state",
          q: "When should state be moved to a common parent?",
          a: `<p>When two or more components need to access or update the same data, we move the state to their nearest common parent to keep the data synchronized.</p>`,
        },
        {
          id: "react-local-vs-global-state",
          q: "What is the difference between local state and global state?",
          a: `<p>Local state is used within a specific component, while global state is shared across multiple components or screens. For example, a form input is local state, while user authentication data may be global state.</p>`,
        },
        {
          id: "react-child-modify-parent",
          q: "Can a child component directly modify its parent's state?",
          a: `<p>No, a child cannot directly modify its parent's state. The parent can pass a state setter or callback function as a prop, which the child can call to request an update.</p>`,
        },
        {
          id: "react-state-change",
          q: "What happens when a component's state changes?",
          a: `<p>When state is updated, React schedules a re-render of that component. React then compares the new output with the previous one and applies the necessary UI updates.</p>`,
        },
        {
          id: "react-never-mutate",
          q: "Why should you never mutate React state directly?",
          a: `<p>Direct mutation can prevent React from detecting changes correctly and can cause unexpected behavior. Instead, create a new object or array and update state using its setter function.</p>`,
        },
        {
          id: "react-update-object-state",
          q: "How do you update an object stored in state?",
          a: `<p>Use the spread operator to create a new object while preserving existing properties.</p>
<p><strong>Example:</strong> <code>setUser({ ...user, name: "Nitin" })</code></p>`,
        },
        {
          id: "react-update-array-state",
          q: "How do you update an array stored in state?",
          a: `<p>Use methods that return a new array, such as <code>map()</code>, <code>filter()</code>, or the spread operator, instead of mutating the existing array.</p>
<p><strong>Example:</strong> <code>setItems([...items, newItem])</code></p>`,
        },
        {
          id: "react-setstate-vs-usestate",
          q: "What is the difference between setState in class components and state setters in function components?",
          a: `<p>In class components, <code>setState()</code> merges the updated object with the existing state. In function components, the setter from <code>useState</code> replaces the entire state value, so objects must be merged manually when updating them.</p>`,
        },
        {
          id: "react-state-snapshot",
          q: "Why might a state variable not immediately reflect its updated value after calling a setter?",
          a: `<p>React state is a snapshot for the current render. Calling a setter schedules an update, but the current function continues to see the existing value until the next render.</p>`,
        },
        {
          id: "react-functional-updater",
          q: "When should you use the functional updater form of a state setter?",
          a: `<p>Use it when the next state depends on the previous state, especially when multiple updates may happen together.</p>
<p><strong>Example:</strong> <code>setCount(prev =&gt; prev + 1)</code></p>`,
        },
        {
          id: "react-form-state",
          q: "How would you manage a form with multiple input fields using React state?",
          a: `<p>I would store the form fields in a single state object and update the relevant field using its name.</p>
<p><strong>Example:</strong> <code>setForm(prev =&gt; ({ ...prev, [name]: value }))</code></p>`,
        },
        {
          id: "react-event-handling",
          q: "How does event handling work in React?",
          a: `<p>React handles events using props like <code>onClick</code>, <code>onChange</code>, and <code>onSubmit</code>. We pass a function that runs when the corresponding event occurs.</p>`,
        },
        {
          id: "react-onclick-call",
          q: "What is the difference between onClick={handleClick} and onClick={handleClick()}?",
          a: `<p><code>onClick={handleClick}</code> passes the function to run when clicked. <code>onClick={handleClick()}</code> calls the function immediately during rendering and passes its return value instead.</p>`,
        },
        {
          id: "react-event-arguments",
          q: "How do you pass arguments to an event handler?",
          a: `<p>We use an arrow function to pass arguments when the event occurs.</p>
<p><strong>Example:</strong> <code>onClick={() =&gt; handleClick(id)}</code></p>`,
        },
        {
          id: "react-synthetic-event",
          q: "What is a SyntheticEvent in React?",
          a: `<p>A SyntheticEvent is React's event wrapper that provides a consistent interface for handling events across browsers. It exposes properties and methods similar to native browser events.</p>`,
        },
        {
          id: "react-event-propagation",
          q: "What is event propagation?",
          a: `<p>Event propagation is the process through which an event travels through the DOM hierarchy, involving capturing, target, and bubbling phases.</p>`,
        },
        {
          id: "react-bubbling-vs-capturing",
          q: "What is the difference between event bubbling and event capturing?",
          a: `<p>Bubbling means an event travels from the target element up to its ancestors. Capturing means it travels from the outer ancestors down toward the target.</p>`,
        },
        {
          id: "react-prevent-default",
          q: "How do you prevent the default behavior of an event?",
          a: `<p>We use <code>event.preventDefault()</code> to stop the browser's default action, such as submitting a form or following a link.</p>`,
        },
        {
          id: "react-stop-propagation",
          q: "What is the purpose of stopPropagation()?",
          a: `<p><code>stopPropagation()</code> prevents an event from continuing to propagate to other elements through the event path. It does not prevent the event's default behavior.</p>`,
        },
        {
          id: "react-prevent-vs-stop",
          q: "What is the difference between preventDefault() and stopPropagation()?",
          a: `<p><code>preventDefault()</code> stops the browser's default action, while <code>stopPropagation()</code> stops the event from propagating to other elements.</p>`,
        },
        {
          id: "react-controlled-inputs",
          q: "How do controlled inputs work in React?",
          a: `<p>Controlled inputs get their value from React state and update that state through event handlers. This allows React to manage and control the input's current value.</p>`,
        },
        {
          id: "react-uncontrolled-inputs",
          q: "How do uncontrolled inputs work in React?",
          a: `<p>Uncontrolled inputs manage their own values through the DOM rather than React state. We usually access their values using a ref when needed, such as during form submission.</p>`,
        },
        {
          id: "react-value-vs-defaultvalue",
          q: "What is the difference between value and defaultValue?",
          a: `<p><code>value</code> sets the current value of a controlled input, which React state manages. <code>defaultValue</code> sets the initial value of an uncontrolled input.</p>`,
        },
        {
          id: "react-form-validation",
          q: "How do you validate a form in React?",
          a: `<p>We validate input values before submission using conditions or validation libraries like Formik and React Hook Form. If validation fails, we display appropriate error messages.</p>`,
        },
        {
          id: "react-checkbox-radio",
          q: "How would you handle checkbox and radio-button inputs?",
          a: `<p>For checkboxes, we use the <code>checked</code> property to track whether they are selected. For radio buttons, we usually store the selected option in state and update it when the user selects another option.</p>`,
        },
        {
          id: "react-single-change-handler",
          q: "How do you handle multiple input fields using a single change handler?",
          a: `<p>We give each input a <code>name</code> attribute and use one handler to update the corresponding field in state.</p>
<p><strong>Example:</strong> <code>setForm(prev =&gt; ({ ...prev, [e.target.name]: e.target.value }))</code></p>`,
        },
        {
          id: "react-loading-indicator",
          q: "How do you conditionally display a loading indicator?",
          a: `<p>We maintain a loading state and render the indicator only when it is true.</p>
<p><strong>Example:</strong> <code>{isLoading &amp;&amp; &lt;p&gt;Loading...&lt;/p&gt;}</code></p>`,
        },
        {
          id: "react-null-vs-empty",
          q: "What is the difference between rendering null and rendering an empty element?",
          a: `<p>Returning <code>null</code> renders nothing. An empty element such as <code>&lt;div&gt;&lt;/div&gt;</code> creates an actual DOM element, even if it has no content.</p>`,
        },
        {
          id: "react-error-message",
          q: "How do you display an error message only when a request fails?",
          a: `<p>We store the error in state when the request fails and conditionally render the message.</p>
<p><strong>Example:</strong> <code>{error &amp;&amp; &lt;p&gt;{error}&lt;/p&gt;}</code></p>`,
        },
        {
          id: "react-searchable-list",
          q: "How would you implement a searchable list with a controlled input?",
          a: `<p>I would store the search text in state and filter the list based on that value. Whenever the user types, React updates the state and displays the matching items.</p>`,
        },
        {
          id: "react-form-rerenders",
          q: "How would you prevent unnecessary form re-renders when building a large form?",
          a: `<p>I would keep state as local as possible, split the form into smaller components, and use memoization only where profiling shows it helps. Libraries like React Hook Form can also reduce unnecessary re-renders.</p>`,
        },
        {
          id: "react-hooks",
          q: "What are React Hooks, and why were they introduced?",
          a: `<p>Hooks are special functions that let functional components use React features like state, lifecycle-related effects, and context. They were introduced to make stateful logic easier to reuse and to reduce the need for class components.</p>`,
        },
        {
          id: "react-rules-of-hooks",
          q: "What are the Rules of Hooks?",
          a: `<ul>
<li>Call Hooks only at the top level of a function component or custom Hook.</li>
<li>Don't call Hooks inside loops, conditions, or nested functions.</li>
<li>Call Hooks in the same order on every render.</li>
<li>Don't call Hooks inside regular JavaScript functions.</li>
</ul>`,
        },
        {
          id: "react-hooks-order",
          q: "Why can't Hooks normally be called inside loops, conditions, or nested functions?",
          a: `<p>React relies on the order of Hook calls to associate each Hook with its stored state. If Hooks are called conditionally or in a changing order, React may associate state with the wrong Hook, causing unexpected behavior.</p>`,
        },
        {
          id: "react-usestate",
          q: "What is useState, and how does it work?",
          a: `<p><code>useState</code> is a React Hook that allows functional components to store and manage state. It returns two values: the current state and a setter function used to update that state. When the state changes, React re-renders the component to display the updated value.</p>
<pre><code>const [count, setCount] = useState(0);</code></pre>`,
        },
        {
          id: "react-useeffect",
          q: "What is useEffect, and when should you use it?",
          a: `<p><code>useEffect</code> is a React Hook that lets us perform side effects in functional components, such as fetching API data, setting up event listeners, or managing timers. It runs after React renders the component. We can control when it runs using a dependency array and return a cleanup function when needed.</p>`,
        },
        {
          id: "react-useeffect-deps",
          q: "What is the difference between useEffect(() => {}), useEffect(() => {}, []), and useEffect(() => {}, [value])?",
          a: `<ul>
<li><strong>No dependency array:</strong> Runs after every committed render.</li>
<li><strong>Empty array <code>[]</code>:</strong> Runs after the initial mount, with an additional development run possible in Strict Mode.</li>
<li><strong><code>[value]</code>:</strong> Runs after the initial mount and again when <code>value</code> changes.</li>
</ul>`,
        },
        {
          id: "react-useeffect-cleanup",
          q: "What is the cleanup function in useEffect?",
          a: `<p>A cleanup function removes or stops resources created by an effect, such as event listeners, timers, or subscriptions.</p>
<pre><code>useEffect(() =&gt; {
  const id = setInterval(doSomething, 1000);
  return () =&gt; clearInterval(id);
}, []);</code></pre>
<p>Here, the cleanup clears the interval to prevent it from continuing unnecessarily.</p>`,
        },
        {
          id: "react-cleanup-when",
          q: "When does an effect's cleanup function run?",
          a: `<p>The cleanup runs before the effect runs again when its dependencies change, and when the component unmounts. In development Strict Mode, React may also run an extra setup-and-cleanup cycle to help identify bugs.</p>`,
        },
        {
          id: "react-effect-leaks",
          q: "How do you prevent memory leaks associated with effects?",
          a: `<p>Clean up timers, event listeners, and subscriptions when they are no longer needed. For API requests, use cancellation where supported, such as <code>AbortController</code>, and avoid updating state from obsolete asynchronous operations.</p>`,
        },
        {
          id: "react-stale-closure",
          q: "What is a stale closure in React?",
          a: `<p>A stale closure occurs when a function uses state or props captured from an older render instead of the latest values.</p>
<p>For example, a timer created in an effect may keep reading an old <code>count</code> value. We can fix this using correct effect dependencies, functional state updates, or a ref when appropriate.</p>`,
        },
        {
          id: "react-fix-stale-closure",
          q: "How can you fix stale state or stale closure problems?",
          a: `<p>A stale closure occurs when a function uses state or props captured from an older render.</p>
<p>I fix it by using the correct effect dependencies, functional state updates, or a ref when I need the latest value without triggering a re-render.</p>
<pre><code>setCount(prev =&gt; prev + 1);</code></pre>
<p>The functional updater is especially useful when the next state depends on the previous state.</p>`,
        },
        {
          id: "react-infinite-useeffect",
          q: "What are common causes of infinite loops in useEffect?",
          a: `<p>An infinite loop commonly occurs when an effect updates state, and that update changes one of the effect's dependencies, causing it to run again.</p>
<p>Another cause is creating a new object or function dependency on every render.</p>
<p>I fix this by reviewing dependencies, removing unnecessary effects, and moving objects or functions inside the effect when appropriate.</p>`,
        },
        {
          id: "react-strict-mode-double-effect",
          q: "Why can an effect run twice during development with Strict Mode enabled?",
          a: `<p>In development, React Strict Mode performs an extra effect setup-and-cleanup cycle to help identify missing cleanup and unsafe side effects.</p>
<p>This is expected behavior and does not happen in the same way in production. Instead of disabling Strict Mode, I ensure effects correctly clean up timers, subscriptions, event listeners, and requests.</p>`,
        },
        {
          id: "react-useref-vs-usestate",
          q: "What is useRef, and how is it different from useState?",
          a: `<p><code>useRef</code> stores a mutable value that persists between renders without triggering a re-render when changed.</p>
<p><code>useState</code> stores data that affects the UI, and updating it schedules a re-render.</p>
<p>I use <code>useRef</code> for DOM references, timer IDs, or values that need to persist without updating the UI.</p>`,
        },
        {
          id: "react-useref-dom",
          q: "How do you access a DOM element using useRef?",
          a: `<p>I create a ref using <code>useRef(null)</code>, attach it to an element, and access the element through <code>ref.current</code>.</p>
<pre><code>const inputRef = useRef(null);

function focusInput() {
  inputRef.current?.focus();
}

return (
  &lt;&gt;
    &lt;input ref={inputRef} /&gt;
    &lt;button onClick={focusInput}&gt;Focus&lt;/button&gt;
  &lt;/&gt;
);</code></pre>
<p>This is useful for focusing inputs, scrolling to elements, and measuring DOM dimensions.</p>`,
        },
        {
          id: "react-usememo",
          q: "What is useMemo, and when should you use it?",
          a: `<p><code>useMemo</code> caches the result of a calculation between renders until its dependencies change.</p>
<pre><code>const filteredUsers = useMemo(
  () =&gt; users.filter(user =&gt; user.active),
  [users]
);</code></pre>
<p>I use it for expensive calculations or when a stable result reference helps avoid unnecessary work. I don't use it for every calculation because memoization also has overhead.</p>`,
        },
        {
          id: "react-usecallback",
          q: "What is useCallback, and when should you use it?",
          a: `<p><code>useCallback</code> caches a function reference between renders until its dependencies change.</p>
<pre><code>const handleClick = useCallback(() =&gt; {
  setCount(prev =&gt; prev + 1);
}, []);</code></pre>
<p>It is useful when passing callbacks to memoized child components or when a stable function reference is required by another Hook. It is not necessary for every function.</p>`,
        },
        {
          id: "react-usememo-vs-usecallback",
          q: "What is the difference between useMemo and useCallback?",
          a: `<p><code>useMemo</code> caches a calculated value, whereas <code>useCallback</code> caches a function reference.</p>
<p>For example, I would use <code>useMemo</code> to cache filtered results and <code>useCallback</code> to maintain a stable event-handler reference passed to a memoized child.</p>`,
        },
        {
          id: "react-usereducer",
          q: "What is useReducer, and when is it preferable to useState?",
          a: `<p><code>useReducer</code> manages state through a reducer function that receives the current state and an action, then returns the next state.</p>
<p>It is preferable when state transitions are complex or multiple related values change through different actions, such as form submission, validation, and reset operations.</p>
<p>For simple values such as a Boolean toggle, <code>useState</code> is usually sufficient.</p>`,
        },
        {
          id: "react-usecontext",
          q: "What is useContext, and how does it work?",
          a: `<p><code>useContext</code> reads a value from the nearest matching Context provider above the component in the React tree.</p>
<p>It helps share data such as themes, authentication information, and language settings without passing props through every intermediate component.</p>
<p>When the provider's value changes, components consuming that context are generally updated.</p>`,
        },
        {
          id: "react-custom-hook",
          q: "What is a custom Hook, and why would you create one?",
          a: `<p>A custom Hook is a JavaScript function whose name starts with <code>use</code> and that can use React Hooks to share stateful logic between components.</p>
<p>For example, a <code>useFetch()</code> Hook can encapsulate API request logic so multiple components can reuse it instead of duplicating the same code.</p>
<p>Custom Hooks share logic, but each call normally maintains its own independent Hook state.</p>`,
        },
        {
          id: "react-custom-hook-state",
          q: "Can a custom Hook share state between multiple components automatically?",
          a: `<p>No. Each component calling a custom Hook gets its own independent state instance.</p>
<p>If multiple components need to share the same state, I would use Context, Redux, Zustand, or lift the state to a common parent and pass it through props.</p>`,
        },
        {
          id: "react-uselayouteffect",
          q: "What is useLayoutEffect, and how does it differ from useEffect?",
          a: `<p><code>useLayoutEffect</code> runs after React updates the DOM but before the browser paints, making it useful for measuring elements or adjusting layout before the user sees it.</p>
<p><code>useEffect</code> generally runs after the browser paints, so it is preferable for most other side effects because it is less likely to block visual updates.</p>`,
        },
        {
          id: "react-useid",
          q: "What is useId, and when is it useful?",
          a: `<p><code>useId</code> generates an ID suitable for associating related elements, especially accessible form controls.</p>
<pre><code>const id = useId();

return (
  &lt;&gt;
    &lt;label htmlFor={id}&gt;Email&lt;/label&gt;
    &lt;input id={id} type="email" /&gt;
  &lt;/&gt;
);</code></pre>
<p>Here, the label is associated with its input. Do not use <code>useId</code> to generate list keys; use stable IDs from your data instead.</p>`,
        },
        {
          id: "react-transition-deferred",
          q: "What are useTransition and useDeferredValue, and what problems do they solve?",
          a: `<p>Both help keep the UI responsive when some updates are expensive.</p>
<ul>
<li><code>useTransition</code>: Marks certain state updates as non-urgent so urgent interactions can take priority.</li>
<li><code>useDeferredValue</code>: Allows a value used for rendering to lag behind its latest value while React works on updating the UI.</li>
</ul>
<p>For example, in a search interface, typing can remain responsive while a large result list updates. Neither Hook inherently makes the underlying calculation faster.</p>`,
        },
        {
          id: "react-lifecycle-phases",
          q: "What are the lifecycle phases of a React class component?",
          a: `<p>A class component has three main lifecycle phases: Mounting, Updating, and Unmounting.</p>
<ul>
<li><strong>Mounting:</strong> The component is created and added to the DOM.</li>
<li><strong>Updating:</strong> The component re-renders when its props or state change.</li>
<li><strong>Unmounting:</strong> The component is removed from the DOM, and its resources should be cleaned up.</li>
</ul>`,
        },
        {
          id: "react-lifecycle-methods",
          q: "What are componentDidMount, componentDidUpdate, and componentWillUnmount?",
          a: `<p>These are lifecycle methods used to perform tasks at different stages.</p>
<ul>
<li><code>componentDidMount()</code>: Runs after the component is mounted; commonly used for API calls or subscriptions.</li>
<li><code>componentDidUpdate()</code>: Runs after an update; useful for responding to changes in props or state.</li>
<li><code>componentWillUnmount()</code>: Runs before removal; used to clean up timers, subscriptions, and event listeners.</li>
</ul>`,
        },
        {
          id: "react-lifecycle-hooks",
          q: "How can you achieve similar lifecycle behavior with Hooks?",
          a: `<p>In functional components, <code>useEffect</code> can handle many tasks previously handled by lifecycle methods.</p>
<pre><code>useEffect(() =&gt; {
  // Setup: similar to componentDidMount

  return () =&gt; {
    // Cleanup: similar to componentWillUnmount
  };
}, []);</code></pre>
<p>Using dependencies, <code>useEffect</code> can also respond to changes, similar to <code>componentDidUpdate</code>. However, it is not an exact one-to-one replacement for every lifecycle method.</p>`,
        },
        {
          id: "react-render-phase",
          q: "What is the React render phase?",
          a: `<p>The render phase is when React calls components and calculates what the UI should look like based on the current props, state, and context.</p>
<p>During this phase, React determines the required changes but does not yet apply them to the DOM. Rendering should remain pure because React may repeat or abandon a render.</p>`,
        },
        {
          id: "react-commit-phase",
          q: "What is the commit phase?",
          a: `<p>The commit phase is when React applies the necessary changes to the DOM and updates relevant refs.</p>
<p>After the DOM changes, React runs layout effects before the browser paints, while passive effects (<code>useEffect</code>) generally run afterward.</p>
<p><strong>Remember:</strong> Render calculates the changes; commit applies them.</p>`,
        },
        {
          id: "react-render-vs-mount",
          q: "What is the difference between rendering a component and mounting it?",
          a: `<p>Rendering means React executes a component to calculate its UI. It can happen multiple times during the component's lifetime.</p>
<p>Mounting happens when the component is first added to the rendered UI. A component can re-render many times without mounting again.</p>`,
        },
        {
          id: "react-rerender-causes",
          q: "What causes a React component to re-render?",
          a: `<p>Common causes include:</p>
<ul>
<li>Its state is updated.</li>
<li>Its parent re-renders.</li>
<li>A context value it consumes changes.</li>
<li>An external store it subscribes to reports a relevant update.</li>
</ul>
<p>A re-render does not necessarily mean the DOM will change. React compares the output and commits only the necessary updates.</p>`,
        },
        {
          id: "react-parent-rerender",
          q: "Does a parent re-render cause its children to re-render?",
          a: `<p>Usually, yes. When a parent re-renders, React normally re-renders its child components too.</p>
<p>You can sometimes skip unnecessary child renders using <code>React.memo</code>, stable props, and other optimizations. However, a memoized child can still re-render when its own state or consumed context changes.</p>`,
        },
        {
          id: "react-reconciliation",
          q: "What is reconciliation in React?",
          a: `<p>Reconciliation is the process React uses to compare the previous rendered element tree with the new one and determine what needs to change.</p>
<p>React considers element types, positions, and keys to decide whether to update existing elements, preserve state, or replace parts of the UI.</p>`,
        },
        {
          id: "react-virtual-dom",
          q: "What is the Virtual DOM?",
          a: `<p>The Virtual DOM is a common term for React's in-memory representation of the UI.</p>
<p>When state or props change, React calculates a new representation, compares it with the previous one, and determines the necessary UI updates. This helps React manage updates declaratively, but it does not guarantee that every operation is faster than direct DOM manipulation.</p>`,
        },
        {
          id: "react-virtual-dom-faster",
          q: "Is the Virtual DOM always faster than direct DOM manipulation?",
          a: `<p>No. Direct DOM manipulation can be faster for simple, specific operations because it avoids some React overhead.</p>
<p>React's advantage is that it manages complex UI updates predictably and efficiently. Performance depends on the application, the work being performed, and how updates are implemented.</p>`,
        },
        {
          id: "react-key-reconciliation",
          q: "What is the purpose of React's key during reconciliation?",
          a: `<p>A key helps React identify which list item corresponds to which element between renders.</p>
<p>Stable, unique keys let React preserve the correct component instances and state when items are inserted, deleted, or reordered. Array indexes can cause bugs when list items change position.</p>
<pre><code>{users.map(user =&gt; (
  &lt;UserCard key={user.id} user={user} /&gt;
))}</code></pre>`,
        },
        {
          id: "react-preserve-state",
          q: "How does React determine whether a component should preserve or reset its state?",
          a: `<p>React primarily considers a component's type, position in the UI tree, and key.</p>
<p>If the same component remains at the same position with the same key, its state is generally preserved. Changing its type or key can cause React to treat it as a new component and reset its state.</p>`,
        },
        {
          id: "react-element-type-change",
          q: "What happens when the type of a rendered element changes?",
          a: `<p>React generally removes the previous element and mounts the new one.</p>
<p>For example, changing a rendered <code>&lt;div&gt;</code> to a <code>&lt;section&gt;</code> causes React to replace that DOM element. If a component type changes, its previous component instance is unmounted, its state is discarded, and a new instance is mounted.</p>`,
        },
        {
          id: "react-fiber",
          q: "What is React Fiber?",
          a: `<p>React Fiber is the internal reconciliation architecture introduced in React 16.</p>
<p>It represents rendering work as units that React can prioritize, pause, resume, or abandon when appropriate. Fiber provides the foundation for features such as concurrent rendering and more responsive UI updates.</p>`,
        },
        {
          id: "react-concurrent",
          q: "What is concurrent rendering in React?",
          a: `<p>Concurrent rendering allows React to work on rendering updates without requiring every rendering task to finish in one uninterrupted block.</p>
<p>React can prioritize urgent updates, pause lower-priority work, and abandon outdated work when necessary. This helps keep interfaces responsive, but it does not mean React executes component rendering simultaneously on multiple JavaScript threads.</p>`,
        },
        {
          id: "react-sync-vs-interruptible",
          q: "What is the difference between synchronous rendering and interruptible rendering?",
          a: `<p>Synchronous rendering performs rendering work without yielding until that work finishes.</p>
<p>Interruptible rendering allows React to pause lower-priority rendering work so more urgent tasks can be handled first, then resume or restart the rendering later.</p>
<p>React's concurrent features make interruptible rendering possible for appropriate updates. This does not mean every React update is automatically interruptible.</p>`,
        },
        {
          id: "react-strict-mode",
          q: "What is StrictMode, and what does it help identify?",
          a: `<p>StrictMode is a development-only tool that helps identify potential problems in a React application.</p>
<p>It can expose impure rendering, missing effect cleanup, and deprecated API usage. In development, React may render components or run effect setup and cleanup an extra time to help reveal bugs.</p>
<p>It does not add these extra checks to production builds.</p>`,
        },
        {
          id: "react-batching",
          q: "What is batching in React?",
          a: `<p>Batching means React groups multiple state updates together so it can process them in fewer renders.</p>
<pre><code>setCount(count =&gt; count + 1);
setName("Nitin");</code></pre>
<p>Instead of rendering separately for each update, React can process both updates in a single render, reducing unnecessary work.</p>`,
        },
        {
          id: "react-automatic-batching",
          q: "How does automatic batching work in modern React?",
          a: `<p>With React 18 and modern React roots, React automatically batches updates from more sources, including promises, timers, and native event handlers, not just React event handlers.</p>
<pre><code>setTimeout(() =&gt; {
  setCount(c =&gt; c + 1);
  setName("Nitin");
}, 1000);</code></pre>
<p>These updates can be processed in a single render instead of two separate renders. If an update must be applied synchronously for a specific reason, React provides <code>flushSync</code>, but it should be used sparingly.</p>`,
        },
        {
          id: "react-usestate-vs-usereducer-complex",
          q: "What is the difference between useState and useReducer in complex state management?",
          a: `<p><code>useState</code> is ideal for simple state values, while <code>useReducer</code> is useful when state transitions involve multiple related values or complex logic.</p>
<p>With <code>useState</code>, I update values using a setter. With <code>useReducer</code>, I dispatch actions, and a reducer determines the next state.</p>
<p><strong>Example:</strong> I would use <code>useState</code> for a toggle and <code>useReducer</code> for a form with validation, submission, and reset actions.</p>`,
        },
        {
          id: "react-where-state-belongs",
          q: "How do you decide whether state belongs in a component, Context, or a global store?",
          a: `<p>I decide based on how many components need the state and how complex its updates are.</p>
<ul>
<li><strong>Local state:</strong> Used by one component or a small section of the UI.</li>
<li><strong>Context:</strong> Shares values such as theme, language, or authentication across a component tree.</li>
<li><strong>Global store:</strong> Useful for complex shared state accessed across multiple screens, such as cart data or application workflows.</li>
</ul>
<p>I prefer keeping state as close as possible to where it is used.</p>`,
        },
        {
          id: "react-derived-vs-stored",
          q: "What is the difference between derived state and stored state?",
          a: `<p>Stored state is data maintained by React, such as a selected filter or input value.</p>
<p>Derived state is calculated from existing props or state.</p>
<pre><code>const [price, setPrice] = useState(100);
const [quantity, setQuantity] = useState(2);

const total = price * quantity;</code></pre>
<p>Here, <code>price</code> and <code>quantity</code> are stored state, while <code>total</code> is derived state.</p>`,
        },
        {
          id: "react-avoid-derived-state",
          q: "Why should you avoid storing values in state that can be calculated from existing props or state?",
          a: `<p>Storing calculated values separately can create synchronization problems and unnecessary re-renders.</p>
<p>For example, if <code>total</code> is stored independently from <code>price</code> and <code>quantity</code>, I must remember to update all three correctly. Calculating <code>total</code> during rendering keeps it consistent automatically.</p>`,
        },
        {
          id: "react-sync-external",
          q: "How do you synchronize a component with an external system using useEffect?",
          a: `<p>I use <code>useEffect</code> when a component needs to synchronize with an external system, such as an event listener, timer, subscription, or third-party API.</p>
<pre><code>useEffect(() =&gt; {
  const connection = connectToServer();

  return () =&gt; connection.disconnect();
}, []);</code></pre>
<p>The effect establishes the connection, and the cleanup disconnects it. Dependencies determine when React repeats the synchronization.</p>`,
        },
        {
          id: "react-fetch-not-always-effect",
          q: "Why is fetching data not always the best use of useEffect?",
          a: `<p>Fetching directly inside <code>useEffect</code> can lead to repeated requests, race conditions, missing caching, and complex loading states.</p>
<p>For larger applications, tools such as TanStack Query, SWR, or framework-level data fetching can handle caching, retries, request deduplication, and stale data more reliably.</p>
<p>Effects are still useful when I need to manage a request lifecycle myself.</p>`,
        },
        {
          id: "react-effect-race",
          q: "How do you avoid race conditions when making API requests inside an effect?",
          a: `<p>A race condition occurs when requests finish in a different order than they started, allowing an older response to overwrite newer data.</p>
<p>I cancel outdated requests or ignore their results during cleanup.</p>
<pre><code>useEffect(() =&gt; {
  let ignore = false;

  fetchUser(userId).then(data =&gt; {
    if (!ignore) setUser(data);
  });

  return () =&gt; {
    ignore = true;
  };
}, [userId]);</code></pre>
<p>This prevents results from outdated effects from updating the state.</p>`,
        },
        {
          id: "react-cancel-fetch",
          q: "How do you cancel an in-flight fetch request?",
          a: `<p>I use <code>AbortController</code>, pass its signal to <code>fetch</code>, and call <code>abort()</code> during effect cleanup.</p>
<pre><code>useEffect(() =&gt; {
  const controller = new AbortController();

  fetch("/api/users", { signal: controller.signal })
    .then(res =&gt; {
      if (!res.ok) throw new Error("Request failed");
      return res.json();
    })
    .then(setUsers)
    .catch(error =&gt; {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });

  return () =&gt; controller.abort();
}, []);</code></pre>
<p>This helps avoid wasting resources on requests that are no longer needed.</p>`,
        },
        {
          id: "react-abort-controller",
          q: "What is AbortController, and how can you use it with React?",
          a: `<p><code>AbortController</code> is a browser API that allows you to cancel operations supporting an <code>AbortSignal</code>, including <code>fetch</code> requests.</p>
<p>In React, I commonly create one inside an effect and abort it during cleanup. This is useful when a component unmounts or its request dependencies change.</p>`,
        },
        {
          id: "react-effect-deps-functions",
          q: "How do dependency arrays work when an effect uses functions or objects?",
          a: `<p>React compares dependencies with their previous values using <code>Object.is</code>.</p>
<p>If a dependency changes, React cleans up the previous effect and runs it again. Objects and functions created during rendering often have new references on every render.</p>
<p>I avoid unnecessary reruns by moving objects or functions inside the effect when appropriate, or stabilizing references with <code>useMemo</code> or <code>useCallback</code> when genuinely necessary.</p>`,
        },
        {
          id: "react-object-deps",
          q: "Why can objects and functions cause effects to run more frequently than expected?",
          a: `<p>JavaScript compares objects and functions by reference, not by their contents.</p>
<pre><code>const options = { page: 1 };

useEffect(() =&gt; {
  fetchData(options);
}, [options]);</code></pre>
<p>A new <code>options</code> object is created on every render, so the effect may run again each time. Defining the object inside the effect can avoid this problem.</p>`,
        },
        {
          id: "react-measure-layout",
          q: "What is the difference between useEffect and useLayoutEffect when measuring DOM dimensions?",
          a: `<p><code>useLayoutEffect</code> runs after React updates the DOM but before the browser paints, so I use it when measurements must affect layout immediately.</p>
<p><code>useEffect</code> generally runs after the browser paints and is preferable when an immediate visual adjustment is unnecessary.</p>
<p><strong>Example:</strong> Measuring and positioning a tooltip before it becomes visible can prevent a visual jump.</p>`,
        },
        {
          id: "react-useimperativehandle",
          q: "What is useImperativeHandle, and when would you use it with forwardRef?",
          a: `<p><code>useImperativeHandle</code> lets a component expose specific methods through a ref instead of exposing its entire internal implementation.</p>
<pre><code>useImperativeHandle(ref, () =&gt; ({
  focus() {
    inputRef.current?.focus();
  }
}));</code></pre>
<p>A parent can then call <code>childRef.current.focus()</code>. This is useful for actions such as focusing an input or controlling a custom media component.</p>
<p>In React 18 and earlier, <code>forwardRef</code> is commonly used to receive refs in function components. React 19 allows <code>ref</code> to be received as a prop, so <code>forwardRef</code> is no longer necessary for that purpose.</p>`,
        },
        {
          id: "react-usesyncexternalstore",
          q: "What are useSyncExternalStore and its use cases?",
          a: `<p><code>useSyncExternalStore</code> lets a component subscribe to state maintained outside React and read consistent snapshots of that state.</p>
<p>It is useful for external stores, browser APIs, or custom subscription-based state systems.</p>
<pre><code>const value = useSyncExternalStore(
  store.subscribe,
  store.getSnapshot
);</code></pre>
<p>React uses the subscription and snapshot functions to keep the component synchronized with external changes, including during concurrent rendering.</p>`,
        },
        {
          id: "react-transition-vs-debounce",
          q: "What is the difference between useTransition and debouncing?",
          a: `<p><code>useTransition</code> marks React state updates as non-urgent, allowing urgent interactions to take priority.</p>
<p>Debouncing delays an operation until a specified period passes without another triggering event, commonly reducing API calls while a user types.</p>
<p>For example, <code>useTransition</code> can keep a search interface responsive during expensive rendering, while debouncing can reduce how often the search API is called.</p>`,
        },
        {
          id: "react-usedeferredvalue-search",
          q: "How can you use useDeferredValue to improve the responsiveness of a search interface?",
          a: `<p><code>useDeferredValue</code> allows an expensive part of the UI to render using a temporarily older value while React prioritizes urgent interactions.</p>
<pre><code>const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);

const results = filterItems(items, deferredQuery);</code></pre>
<p>The input updates immediately, while the result list can catch up when rendering time is available. It does not debounce network requests or make the filtering calculation inherently faster.</p>`,
        },
        {
          id: "react-hook-vs-hoc",
          q: "What is the difference between a custom Hook and a higher-order component?",
          a: `<p>A custom Hook shares stateful logic between function components without adding another component to the tree.</p>
<p>A higher-order component (HOC) takes a component and returns an enhanced component.</p>
<p>For example, <code>useAuth()</code> can provide authentication logic, while <code>withAuth(Component)</code> can wrap a component with authentication checks. Custom Hooks are generally the more direct choice for sharing logic in modern React.</p>`,
        },
        {
          id: "react-usefetch-hook",
          q: "How would you design a reusable useFetch custom Hook?",
          a: `<p>I would make the Hook accept a URL and return the data, loading status, and error. It should also handle cancellation when the URL changes or the component unmounts.</p>
<pre><code>function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =&gt; {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        setData(await response.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();
    return () =&gt; controller.abort();
  }, [url]);

  return { data, loading, error };
}</code></pre>
<p>For production, I would also consider caching, retries, and request deduplication, or use a library such as TanStack Query.</p>`,
        },
        {
          id: "react-usedebounce-hook",
          q: "How would you implement a custom Hook for debouncing a value?",
          a: `<p>I would update the debounced value only after the original value remains unchanged for a specified delay.</p>
<pre><code>function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() =&gt; {
    const timer = setTimeout(() =&gt; {
      setDebouncedValue(value);
    }, delay);

    return () =&gt; clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}</code></pre>
<p>For a search field, I would use the normal value to update the input immediately and the debounced value to trigger the search after typing pauses.</p>`,
        },
        {
          id: "react-test-custom-hook",
          q: "How would you test a custom Hook that uses state and effects?",
          a: `<p>I would test the Hook's observable behavior using React Testing Library's <code>renderHook</code>.</p>
<p>I would verify the initial state, state updates, effect behavior when dependencies change, and cleanup on unmount. For debouncing, I would use fake timers; for API requests, I would mock responses and test loading, success, error, and cancellation scenarios.</p>
<p>I would use <code>act</code> and asynchronous testing utilities when necessary to ensure updates have completed before assertions.</p>`,
        },
        {
          id: "react-context-api",
          q: "What is the Context API, and what problems does it solve?",
          a: `<p>The Context API allows React components to share data without passing props through every intermediate component. It helps solve prop drilling, where props are passed through components that don't actually need them.</p>
<p>Common use cases include themes, authentication information, language preferences, and user settings.</p>`,
        },
        {
          id: "react-create-consume-context",
          q: "How do you create and consume a Context?",
          a: `<p>Create a context using <code>createContext</code>, provide a value through a provider, and access it with <code>useContext</code>.</p>
<pre><code>const ThemeContext = createContext("light");

function App() {
  return (
    &lt;ThemeContext value="dark"&gt;
      &lt;Home /&gt;
    &lt;/ThemeContext&gt;
  );
}

function Home() {
  const theme = useContext(ThemeContext);
  return &lt;p&gt;{theme}&lt;/p&gt;;
}</code></pre>
<p>In React 18 and earlier, use <code>ThemeContext.Provider</code>. React 19 supports the shorter provider syntax shown above.</p>`,
        },
        {
          id: "react-context-frequent-state",
          q: "What are the disadvantages of using Context for frequently changing state?",
          a: `<p>When a Context value changes, its consumers are notified and generally re-render if they read that context, even if they only need an unrelated part of the value.</p>
<p>For frequently changing state, this can cause unnecessary rendering, especially when many components consume the same context. Context also doesn't provide built-in features such as caching, selectors, or advanced state debugging.</p>`,
        },
        {
          id: "react-context-rerenders",
          q: "Does Context automatically prevent unnecessary component re-renders?",
          a: `<p>No. Context provides data sharing, not automatic render optimization.</p>
<p>When a provider's value changes according to <code>Object.is</code>, components consuming that context are updated. <code>React.memo</code> does not prevent a component from receiving a changed context value, although it can prevent some re-renders caused by unchanged parent props.</p>`,
        },
        {
          id: "react-split-contexts",
          q: "How can you split Contexts to reduce unnecessary updates?",
          a: `<p>I can separate unrelated data into different contexts so components subscribe only to the values they need.</p>
<p>For example, I might create separate <code>AuthContext</code>, <code>ThemeContext</code>, and <code>NotificationContext</code> providers rather than putting everything into one large context.</p>
<p>I can also separate state and dispatch contexts when appropriate, so components that only dispatch actions don't need to consume the changing state value.</p>`,
        },
        {
          id: "react-redux",
          q: "What is Redux, and why is it used?",
          a: `<p>Redux is a state-management library that stores shared application state in a centralized store and updates it through predictable actions and reducers.</p>
<p>It is useful when multiple components or screens need shared state, especially when updates are complex and need consistent handling, debugging, or testing.</p>
<p>Redux Toolkit is the recommended way to write Redux logic today.</p>`,
        },
        {
          id: "react-redux-flow",
          q: "Explain the Redux data flow.",
          a: `<p>Redux follows a one-way data flow:</p>
<ol>
<li>A component dispatches an action.</li>
<li>The reducer processes the action and calculates the next state.</li>
<li>The store saves the updated state.</li>
<li>Subscribed components receive the relevant update and re-render.</li>
</ol>
<p>This predictable flow makes application behavior easier to trace and debug.</p>`,
        },
        {
          id: "react-redux-actions-reducers-store",
          q: "What are actions, reducers, and the store in Redux?",
          a: `<ul>
<li><strong>Actions:</strong> Describe what happened, such as <code>userLoggedIn</code>.</li>
<li><strong>Reducers:</strong> Pure functions that calculate the next state from the current state and an action.</li>
<li><strong>Store:</strong> Holds the application's Redux state and provides methods to dispatch actions and subscribe to updates.</li>
</ul>
<p>In Redux Toolkit, <code>createSlice</code> generates action creators and reducers together, reducing boilerplate.</p>`,
        },
        {
          id: "react-redux-vs-context",
          q: "What is the difference between Redux and the React Context API?",
          a: `<p>Context is a built-in React feature for making values available across a component tree. Redux is a dedicated state-management library with a store, reducers, actions, middleware, and development tools.</p>
<p>Context works well for relatively simple shared values. Redux is often better when application state has complex transitions, many consumers, middleware requirements, or extensive debugging needs.</p>
<p>They are not mutually exclusive; an application can use both.</p>`,
        },
        {
          id: "react-redux-toolkit",
          q: "What is Redux Toolkit, and why is it recommended over traditional Redux patterns?",
          a: `<p>Redux Toolkit (RTK) is the official recommended approach for writing Redux logic.</p>
<p>It reduces boilerplate with utilities such as <code>createSlice</code> and <code>configureStore</code>, provides good default middleware, and uses Immer so reducers can express immutable updates with simpler syntax.</p>
<p>It also includes <code>createAsyncThunk</code> for common asynchronous workflows.</p>`,
        },
        {
          id: "react-configurestore-createslice",
          q: "What are configureStore and createSlice?",
          a: `<p><code>configureStore</code> creates a Redux store with sensible defaults, including Redux DevTools integration and useful middleware.</p>
<p><code>createSlice</code> groups a state section, its reducer logic, and generated action creators in one place.</p>
<pre><code>const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;
    }
  }
});</code></pre>
<p>Redux Toolkit uses Immer internally, so this apparent mutation produces an immutable state update.</p>`,
        },
        {
          id: "react-createasyncthunk",
          q: "What is the purpose of createAsyncThunk?",
          a: `<p><code>createAsyncThunk</code> simplifies handling asynchronous operations, such as API requests, by generating lifecycle actions:</p>
<ul>
<li>pending</li>
<li>fulfilled</li>
<li>rejected</li>
</ul>
<p>You can handle these actions in <code>extraReducers</code> to update loading status, store successful results, or record errors. For more advanced server-state needs, RTK Query may be a better fit.</p>`,
        },
        {
          id: "react-rtk-loading-states",
          q: "How do you handle loading, success, and failure states in Redux Toolkit?",
          a: `<p>I usually maintain a <code>status</code> field and an <code>error</code> field in the relevant slice.</p>
<pre><code>const initialState = {
  users: [],
  status: "idle",
  error: null
};</code></pre>
<p>With <code>createAsyncThunk</code>, I set <code>status</code> to <code>"loading"</code> for pending, store the data and set <code>"succeeded"</code> for fulfilled, and save the error and set <code>"failed"</code> for rejected.</p>
<p>The UI reads this state to display a loader, the result, or an error message.</p>`,
        },
        {
          id: "react-reducer-vs-selector",
          q: "What is the difference between a reducer and a selector?",
          a: `<p>A reducer calculates the next state in response to an action.</p>
<p>A selector reads or derives data from the existing state without modifying it.</p>
<p>For example, a reducer might add a product to a cart, while a selector calculates the total cart price from the stored products.</p>`,
        },
        {
          id: "react-reselect",
          q: "What is memoized selection, and how does Reselect help?",
          a: `<p>Memoization means caching a calculation's result and reusing it when its inputs haven't changed.</p>
<p>Reselect lets you create memoized selectors that recalculate derived data only when their input values change. This is helpful for expensive calculations, such as filtering large lists or calculating cart totals.</p>
<p>Memoized selectors can also preserve result references, helping avoid unnecessary re-renders when components subscribe to selected data.</p>`,
        },
        {
          id: "react-rtk-vs-zustand",
          q: "What is the difference between Redux Toolkit and Zustand?",
          a: `<p>Redux Toolkit provides a structured Redux architecture using actions, reducers, middleware, and a centralized store. Zustand offers a smaller API for creating stores and updating state, generally with less boilerplate.</p>
<p>Redux Toolkit is a strong choice for applications needing standardized patterns, extensive debugging, and middleware. Zustand is attractive when you want simpler shared state with minimal setup.</p>
<p>Both support subscriptions and can manage state outside individual components.</p>`,
        },
        {
          id: "react-client-vs-server-state",
          q: "What is the difference between client state and server state?",
          a: `<p>Client state is owned and managed by the application, such as theme preferences, modal visibility, form input, and selected tabs.</p>
<p>Server state originates from a remote source, such as user profiles, product lists, or booking details. It can become stale, needs fetching and synchronization, and may require caching and refetching.</p>
<p>Redux or Zustand can manage client state, while tools such as TanStack Query are purpose-built for server-state management.</p>`,
        },
        {
          id: "react-tanstack-vs-redux",
          q: "When would you use TanStack Query instead of Redux for API data?",
          a: `<p>I would use TanStack Query when the main requirement is fetching, caching, synchronizing, and updating remote API data.</p>
<p>It handles features such as request deduplication, background refetching, cache invalidation, and mutation workflows. Redux is useful for broader application state, especially when state transitions need centralized business logic.</p>
<p>They can work together: Redux or Zustand for client state and TanStack Query for server state.</p>`,
        },
        {
          id: "react-cache-invalidate-refetch",
          q: "What are caching, invalidation, and refetching in server-state management?",
          a: `<ul>
<li><strong>Caching:</strong> Keeping previously fetched data so it can be reused without immediately making another request.</li>
<li><strong>Invalidation:</strong> Marking cached data as potentially outdated after a change.</li>
<li><strong>Refetching:</strong> Requesting fresh data from the server to update the cache.</li>
</ul>
<p>For example, after a user updates a booking, I can invalidate the bookings query so the application fetches updated booking information.</p>`,
        },
        {
          id: "react-choose-state",
          q: "How would you choose a state-management solution for a large React application?",
          a: `<p>I would first categorize the state rather than putting everything into one store.</p>
<ul>
<li><strong>Local state:</strong> <code>useState</code> or <code>useReducer</code>.</li>
<li><strong>Shared, relatively simple values:</strong> Context API.</li>
<li><strong>Complex shared client state:</strong> Redux Toolkit or Zustand.</li>
<li><strong>Server data and caching:</strong> TanStack Query or RTK Query.</li>
</ul>
<p>I would also consider update frequency, rendering performance, team familiarity, debugging requirements, testing, and maintainability. My goal would be to choose the simplest solution that meets the application's actual needs.</p>`,
        },
        {
          id: "react-poor-performance",
          q: "What are the most common causes of poor performance in React applications?",
          a: `<p>Common causes include unnecessary re-renders, expensive calculations during rendering, rendering large lists without virtualization, oversized JavaScript bundles, excessive API requests, and inefficient state management.</p>
<p>I first identify the actual bottleneck using profiling tools instead of applying optimizations blindly.</p>`,
        },
        {
          id: "react-identify-rerenders",
          q: "How do you identify unnecessary re-renders?",
          a: `<p>I use React DevTools Profiler to identify which components render frequently and how much time they take.</p>
<p>I also inspect why components render, check changing props and context values, and use browser performance tools when necessary. A re-render is not automatically a problem; I focus on renders that cause measurable performance issues.</p>`,
        },
        {
          id: "react-memo",
          q: "What is React.memo, and when should you use it?",
          a: `<p><code>React.memo</code> is a higher-order component that can skip re-rendering a function component when its props are unchanged according to a shallow comparison using <code>Object.is</code> for individual props.</p>
<pre><code>const UserCard = React.memo(function UserCard({ user }) {
  return &lt;Text&gt;{user.name}&lt;/Text&gt;;
});</code></pre>
<p>It is useful when a component renders frequently with unchanged props and rendering it is relatively expensive. It does not prevent re-renders caused by the component's own state or consumed context changes.</p>`,
        },
        {
          id: "react-memo-usememo-usecallback",
          q: "What is the difference between React.memo, useMemo, and useCallback?",
          a: `<ul>
<li><code>React.memo</code>: Memoizes a component to skip some re-renders when props remain unchanged.</li>
<li><code>useMemo</code>: Caches the result of a calculation between renders.</li>
<li><code>useCallback</code>: Caches a function reference between renders.</li>
</ul>
<p>I use them when they solve a real performance problem, especially when expensive calculations or memoized child components benefit from stable references.</p>`,
        },
        {
          id: "react-memo-fails",
          q: "Why can using React.memo fail to prevent a child component from re-rendering?",
          a: `<p><code>React.memo</code> may not help when the child receives new object, array, or function references on every parent render.</p>
<p>It also does not block updates caused by the child's own state or consumed context. If the props change according to the comparison, React renders the component again.</p>`,
        },
        {
          id: "react-inline-props",
          q: "How do inline object and function props affect memoization?",
          a: `<p>Inline objects and functions are recreated on every render, so their references change even when their contents or behavior appear identical.</p>
<pre><code>&lt;Child options={{ theme: "dark" }} onPress={() =&gt; save()} /&gt;</code></pre>
<p>A memoized <code>Child</code> may render again because these props are new references. I can move stable values outside the component or use <code>useMemo</code> and <code>useCallback</code> when reference stability is beneficial.</p>`,
        },
        {
          id: "react-memo-cost",
          q: "What is the cost of overusing useMemo and useCallback?",
          a: `<p>Memoization adds complexity, dependency tracking, and memory overhead. It can also make code harder to understand without delivering meaningful performance improvements.</p>
<p>I avoid wrapping every calculation and function automatically. I prefer measuring performance first and memoizing expensive calculations or values that need stable references.</p>`,
        },
        {
          id: "react-optimize-large-list",
          q: "How do you optimize a component that renders thousands of list items?",
          a: `<p>I would start with list virtualization, so only visible items and a small buffer are rendered. I would also use stable keys, keep row components lightweight, avoid unnecessary state updates, and optimize expensive calculations.</p>
<p>In React Native, I would consider <code>FlatList</code> or <code>SectionList</code> and tune options such as <code>initialNumToRender</code>, <code>windowSize</code>, and <code>maxToRenderPerBatch</code> based on the use case.</p>`,
        },
        {
          id: "react-virtualization",
          q: "What is list virtualization, and how does it work?",
          a: `<p>List virtualization renders only the items currently visible on the screen, plus a limited number of nearby items, rather than rendering the entire dataset.</p>
<p>As the user scrolls, items leaving the visible area can be removed or recycled, and new items are rendered as needed. This reduces memory use and rendering work, particularly for large lists.</p>
<p>Examples include <code>react-window</code> in web applications and <code>FlatList</code> in React Native.</p>`,
        },
        {
          id: "react-code-splitting",
          q: "What is code splitting in React?",
          a: `<p>Code splitting divides a JavaScript bundle into smaller chunks that can be loaded when needed rather than downloading all application code immediately.</p>
<p>It can reduce the initial download and improve startup performance. Common approaches include lazy-loading routes, large components, and features that users may never open.</p>`,
        },
        {
          id: "react-lazy-suspense",
          q: "How do React.lazy and Suspense work together?",
          a: `<p><code>React.lazy</code> allows a component to be loaded dynamically, usually through an <code>import()</code>. <code>Suspense</code> displays fallback UI while the lazy component's code is loading.</p>
<pre><code>const Dashboard = React.lazy(() =&gt; import("./Dashboard"));

&lt;Suspense fallback={&lt;p&gt;Loading...&lt;/p&gt;}&gt;
  &lt;Dashboard /&gt;
&lt;/Suspense&gt;</code></pre>
<p>This allows the dashboard code to be loaded only when needed. Suspense also supports other compatible asynchronous rendering features, but it does not automatically handle every data-fetching approach.</p>`,
        },
        {
          id: "react-route-lazy",
          q: "What is route-based lazy loading?",
          a: `<p>Route-based lazy loading loads a page's code when the user navigates to that route instead of including every page in the initial bundle.</p>
<p>For example, an admin dashboard, reports page, and settings page can be loaded separately. This reduces the initial JavaScript download, especially in applications with many routes.</p>`,
        },
        {
          id: "react-tree-shaking",
          q: "What is tree shaking, and how can it reduce bundle size?",
          a: `<p>Tree shaking is a build-time optimization that removes unused code from the final JavaScript bundle when the bundler can safely determine that it is unnecessary.</p>
<p>It works especially well with ES modules and bundlers such as Webpack, Rollup, and Vite. Using suitable imports and avoiding unnecessary dependencies can help reduce bundle size.</p>`,
        },
        {
          id: "react-analyze-bundle",
          q: "How do you analyze a React application's bundle size?",
          a: `<p>I inspect the production build using tools such as Webpack Bundle Analyzer, source-map-explorer, or Vite-compatible bundle visualizers.</p>
<p>These tools help identify large dependencies, duplicated packages, and unexpectedly large chunks. I then consider code splitting, removing unused dependencies, replacing oversized libraries, and checking the production build again to verify the improvement.</p>`,
        },
        {
          id: "react-profiler",
          q: "What is the React Profiler, and how do you use it?",
          a: `<p>The React Profiler, available in React DevTools, records component rendering activity and helps identify expensive or frequent renders.</p>
<p>I reproduce the slow interaction, record it, and inspect which components rendered, their duration, and how often they updated. Then I optimize the actual bottleneck and profile again to confirm the result.</p>`,
        },
        {
          id: "react-optimize-search",
          q: "How would you optimize a search field that filters a large dataset?",
          a: `<p>I would keep the input responsive, avoid unnecessary filtering, and debounce API requests if the search uses a server.</p>
<p>For a large local dataset, I might use <code>useMemo</code> for expensive filtering and <code>useDeferredValue</code> to let the result list update at a lower priority. If thousands of results must be displayed, I would also virtualize the list.</p>`,
        },
        {
          id: "react-debounce-throttle",
          q: "What is the difference between debouncing and throttling?",
          a: `<p>Debouncing waits until events stop occurring for a specified duration before running an operation. It is useful for search API calls after typing.</p>
<p>Throttling limits how often an operation can run during continuous events. It is useful for scroll or resize handlers that should run at a controlled frequency.</p>
<p>For example, a 300 ms debounce runs after typing pauses, while a 300 ms throttle allows execution at most about once per interval during continuous activity.</p>`,
        },
        {
          id: "react-optimize-child-rerender",
          q: "How do you optimize a component that re-renders whenever its parent updates?",
          a: `<p>First, I check whether the child actually has a performance problem. If it does, I may wrap it in <code>React.memo</code> and ensure its props remain stable.</p>
<p>I also move unrelated state closer to the components that need it, avoid unnecessary context subscriptions, and use <code>useMemo</code> or <code>useCallback</code> where they provide a measurable benefit.</p>`,
        },
        {
          id: "react-optimize-table",
          q: "How can you improve the performance of a large table or dashboard?",
          a: `<p>I would prioritize the most expensive areas:</p>
<ul>
<li>Virtualize large tables and long lists.</li>
<li>Paginate or fetch data incrementally instead of loading everything.</li>
<li>Memoize expensive calculations and use stable props where beneficial.</li>
<li>Split large components and isolate frequently changing state.</li>
<li>Reduce duplicate API requests and use appropriate caching.</li>
<li>Profile rendering and JavaScript execution to find bottlenecks.</li>
</ul>
<p>For dashboards, I would also consider how frequently charts refresh and whether every widget needs to update for every data change.</p>`,
        },
        {
          id: "react-optimize-layers",
          q: "What is the difference between optimizing rendering, network requests, and JavaScript execution?",
          a: `<p>These target three different performance bottlenecks.</p>
<ul>
<li><strong>Rendering optimization:</strong> Reduces unnecessary component renders and DOM updates, using techniques such as memoization and virtualization.</li>
<li><strong>Network optimization:</strong> Reduces request count, latency, and transferred data through caching, pagination, compression, and request deduplication.</li>
<li><strong>JavaScript optimization:</strong> Reduces expensive calculations and main-thread work through efficient algorithms, code splitting, and moving suitable work off the main thread.</li>
</ul>
<p>I identify which bottleneck affects the user experience first, then choose the optimization that addresses it rather than assuming every slowdown is caused by React rendering.</p>`,
        },
        {
          id: "react-client-routing",
          q: "What is client-side routing, and why is it useful?",
          a: `<p>Client-side routing allows users to navigate between different views of an application without requesting an entirely new HTML page for every navigation.</p>
<p>JavaScript updates the displayed content based on the URL, making navigation feel faster and smoother. It is commonly used in single-page applications (SPAs).</p>`,
        },
        {
          id: "react-router",
          q: "What is React Router?",
          a: `<p>React Router is a routing library for React that maps URLs to components and manages navigation between views.</p>
<p>It supports nested routes, dynamic parameters, programmatic navigation, layouts, and route-based data loading. It helps organize applications with multiple pages without requiring a full-page reload for every navigation.</p>`,
        },
        {
          id: "react-browser-vs-hash-router",
          q: "What is the difference between BrowserRouter and HashRouter?",
          a: `<ul>
<li><code>BrowserRouter</code>: Uses normal URL paths, such as <code>/users/10</code>. The server must be configured to serve the application for valid client-side routes.</li>
<li><code>HashRouter</code>: Uses the URL fragment, such as <code>/#/users/10</code>. The fragment is handled by the browser and isn't sent to the server as part of the request path.</li>
</ul>
<p>I prefer <code>BrowserRouter</code> for most modern applications, while <code>HashRouter</code> can be useful when server configuration is limited.</p>`,
        },
        {
          id: "react-nested-routes",
          q: "What are nested routes and layout routes?",
          a: `<p>Nested routes allow child routes to appear inside a parent route, making it easier to organize related pages.</p>
<p>Layout routes share common UI, such as a header, sidebar, or navigation menu, across multiple routes.</p>
<pre><code>&lt;Route path="/dashboard" element={&lt;DashboardLayout /&gt;}&gt;
  &lt;Route path="profile" element={&lt;Profile /&gt;} /&gt;
  &lt;Route path="settings" element={&lt;Settings /&gt;} /&gt;
&lt;/Route&gt;</code></pre>
<p>The parent layout typically renders an <code>Outlet</code> where the matched child route appears.</p>`,
        },
        {
          id: "react-params-vs-query",
          q: "What is the difference between route parameters and query parameters?",
          a: `<p>Route parameters identify a resource or specific route, while query parameters usually control filtering, sorting, pagination, or optional settings.</p>
<p>For example:</p>
<ul>
<li><strong>Route parameter:</strong> <code>/users/42</code> — user ID is <code>42</code>.</li>
<li><strong>Query parameter:</strong> <code>/users?page=2&amp;sort=name</code> — requests page 2 sorted by name.</li>
</ul>
<p>In React Router, route parameters can be read using <code>useParams</code>, while query parameters can be read using <code>useSearchParams</code>.</p>`,
        },
        {
          id: "react-navigate",
          q: "How do you navigate programmatically using React Router?",
          a: `<p>I use the <code>useNavigate</code> Hook to navigate after an action, such as a successful login or form submission.</p>
<pre><code>const navigate = useNavigate();

function handleLogin() {
  // Validate login first
  navigate("/dashboard");
}</code></pre>
<p>I can also use <code>navigate(-1)</code> to go back or <code>navigate("/login", { replace: true })</code> to replace the current history entry.</p>`,
        },
        {
          id: "react-protected-routes",
          q: "How do protected routes work?",
          a: `<p>Protected routes restrict access to certain pages based on conditions such as authentication or permissions.</p>
<p>A route checks whether the user is allowed to access the page. If not, it redirects them to a login page or displays an unauthorized screen.</p>
<p><strong>Important:</strong> Frontend route protection improves the user experience, but the backend must independently enforce access control.</p>`,
        },
        {
          id: "react-auth-authz",
          q: "How would you handle authentication and authorization in a React application?",
          a: `<p>Authentication verifies who the user is, while authorization determines what that user is allowed to do.</p>
<p>I would establish an authentication flow, securely manage session credentials, protect frontend routes, and check permissions before showing restricted features. For browser applications, secure, HttpOnly, Secure, and appropriately configured SameSite cookies are often preferable to storing long-lived session tokens in <code>localStorage</code>.</p>
<p>The backend must validate credentials and permissions on every protected request.</p>`,
        },
        {
          id: "react-fetch-api",
          q: "How do you fetch data from an API in React?",
          a: `<p>I can use <code>fetch</code> or Axios inside an effect when the request needs to synchronize with component state, or use a data-fetching library such as TanStack Query.</p>
<pre><code>useEffect(() =&gt; {
  async function loadUsers() {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    setUsers(data);
  }

  loadUsers().catch(console.error);
}, []);</code></pre>
<p>In production, I would also manage loading and error states, cancellation, and stale requests. A data-fetching library can handle much of this complexity.</p>`,
        },
        {
          id: "react-request-states",
          q: "How do you handle loading, success, empty, and error states for an API request?",
          a: `<p>I explicitly manage the possible outcomes instead of displaying a blank screen while waiting for data.</p>
<ul>
<li><strong>Loading:</strong> Show a spinner or skeleton.</li>
<li><strong>Success:</strong> Display the returned data.</li>
<li><strong>Empty:</strong> Show a message when the request succeeds but returns no results.</li>
<li><strong>Error:</strong> Display an appropriate message and, where useful, a retry action.</li>
</ul>
<p>Keeping these states separate makes the interface more predictable and easier to debug.</p>`,
        },
        {
          id: "react-fetch-vs-axios",
          q: "What is the difference between fetch and Axios?",
          a: `<p><code>fetch</code> is a built-in browser API, whereas Axios is an HTTP client library that provides additional conveniences.</p>
<p><code>fetch</code> does not automatically reject when the server returns an HTTP error status such as 404, so you must check <code>response.ok</code>. Axios generally rejects non-2xx responses by default.</p>
<p>Axios also offers features such as interceptors and convenient request and response transformations. I choose based on project requirements rather than assuming one is always better.</p>`,
        },
        {
          id: "react-request-cancellation",
          q: "How do you handle API request cancellation and race conditions during navigation?",
          a: `<p>I cancel requests when the associated component or route no longer needs their results, and prevent outdated responses from overwriting newer data.</p>
<p>With <code>fetch</code>, I use <code>AbortController</code> and pass its signal to the request. When an effect cleans up, I abort the request. Data-fetching libraries can also manage cancellation, caching, and stale results.</p>
<p>This is particularly useful when a user navigates quickly between pages or changes search filters repeatedly.</p>`,
        },
        {
          id: "react-pagination-filter-sort",
          q: "How would you implement pagination, filtering, and sorting for server data?",
          a: `<p>I maintain the current page, page size, filters, and sorting options, then send them as query parameters to the backend.</p>
<p>For example:</p>
<p><code>/api/products?page=2&amp;limit=20&amp;category=shoes&amp;sort=price</code></p>
<p>The server applies the requested operations and returns the matching data along with pagination metadata, such as total items or total pages. I also reset the page when necessary after filters change and avoid displaying outdated responses.</p>`,
        },
        {
          id: "react-error-boundaries",
          q: "What are error boundaries, and what types of errors do they catch?",
          a: `<p>Error boundaries are React components that catch rendering errors in their descendant component tree and display fallback UI instead of allowing the affected part of the UI to crash.</p>
<p>They can catch errors during rendering, constructors, and lifecycle methods in descendant class components. They generally do not catch errors in event handlers, asynchronous callbacks such as timers, or errors thrown inside the boundary itself.</p>
<p>They are useful for isolating failures in sections such as dashboards, widgets, or route content.</p>`,
        },
        {
          id: "react-global-error-handling",
          q: "How would you implement a global error-handling strategy for a React application?",
          a: `<p>I would use several layers because no single mechanism catches every type of error.</p>
<ul>
<li><strong>Error boundaries:</strong> Catch rendering errors and show fallback UI.</li>
<li><strong>API layer or interceptors:</strong> Standardize HTTP error handling, authentication failures, and response processing.</li>
<li><strong>Local UI state:</strong> Handle expected errors such as validation failures and failed form submissions.</li>
<li><strong>Logging and monitoring:</strong> Send useful diagnostic information to a service such as Sentry, without exposing sensitive data.</li>
<li><strong>Backend validation:</strong> Enforce security and business rules independently of the frontend.</li>
</ul>
<p>I would also provide user-friendly messages and retry options where appropriate, while keeping technical details in logs rather than exposing stack traces to users.</p>`,
        },
        {
          id: "react-suspense",
          q: "What is Suspense in React, and how does it work?",
          a: `<p>Suspense lets React display fallback UI while a child component is waiting for a supported asynchronous operation, such as lazy-loaded component code.</p>
<pre><code>&lt;Suspense fallback={&lt;p&gt;Loading...&lt;/p&gt;}&gt;
  &lt;Dashboard /&gt;
&lt;/Suspense&gt;</code></pre>
<p>While the required code is loading, React displays the fallback. Once it becomes available, React can render the component. Suspense also supports compatible data-fetching frameworks and React Server Components.</p>`,
        },
        {
          id: "react-suspense-lazy-vs-data",
          q: "What is the difference between Suspense for lazy-loaded components and Suspense for data fetching?",
          a: `<p>For lazy-loaded components, <code>React.lazy</code> integrates directly with Suspense to show a fallback while the component's JavaScript code loads.</p>
<p>For data fetching, Suspense works only with data sources that support its mechanism, such as compatible frameworks and libraries. A normal <code>fetch()</code> call inside <code>useEffect</code> does not automatically trigger Suspense.</p>`,
        },
        {
          id: "react-fallback-ui",
          q: "What is a fallback UI, and how do you design a useful loading experience?",
          a: `<p>A fallback UI is the temporary content displayed while a Suspense boundary waits for something to become available.</p>
<p>I choose a fallback that matches the expected content, such as a skeleton for a profile card or a small spinner for a button. I also avoid unnecessary layout shifts and use smaller Suspense boundaries when different parts of the page can load independently.</p>`,
        },
        {
          id: "react-error-boundary-suspense",
          q: "What are Error Boundaries, and how can they be combined with Suspense?",
          a: `<p>Error Boundaries catch rendering errors in their descendant tree and display fallback UI. Suspense handles waiting for supported asynchronous work.</p>
<p>They can be combined to handle both loading and failure states.</p>
<pre><code>&lt;ErrorBoundary fallback={&lt;p&gt;Something went wrong.&lt;/p&gt;}&gt;
  &lt;Suspense fallback={&lt;p&gt;Loading...&lt;/p&gt;}&gt;
    &lt;Dashboard /&gt;
  &lt;/Suspense&gt;
&lt;/ErrorBoundary&gt;</code></pre>
<p>Here, Suspense handles the loading state, while the Error Boundary handles errors that reach it. Error Boundaries do not automatically catch every asynchronous or event-handler error.</p>`,
        },
        {
          id: "react-portals",
          q: "What are portals in React, and when would you use createPortal()?",
          a: `<p>A portal lets React render an element into a different DOM location while keeping it part of the same React component tree.</p>
<pre><code>createPortal(
  &lt;div className="modal"&gt;Hello&lt;/div&gt;,
  document.getElementById("modal-root")
);</code></pre>
<p>Portals are useful for modals, tooltips, and dropdowns that need to escape an ancestor's clipping or stacking context. React context still works inside portals, and events follow the React tree.</p>`,
        },
        {
          id: "react-hocs",
          q: "What are higher-order components (HOCs), and how do they work?",
          a: `<p>A higher-order component is a function that accepts a component and returns an enhanced component.</p>
<pre><code>function withLoading(Component) {
  return function Enhanced({ loading, ...props }) {
    if (loading) return &lt;p&gt;Loading...&lt;/p&gt;;
    return &lt;Component {...props} /&gt;;
  };
}</code></pre>
<p>HOCs were commonly used to share logic such as authentication checks, loading behavior, and data subscriptions. Custom Hooks are often a simpler choice for sharing logic in modern function components.</p>`,
        },
        {
          id: "react-render-props",
          q: "What are render props, and what problems do they solve?",
          a: `<p>Render props is a pattern where a component receives a function as a prop and calls it to determine what UI should be rendered.</p>
<pre><code>&lt;DataProvider
  render={data =&gt; &lt;UserList users={data} /&gt;}
/&gt;</code></pre>
<p>This pattern allows components to share behavior while letting consumers control the UI. Custom Hooks often provide a simpler alternative when the shared logic is stateful behavior rather than a reusable component structure.</p>`,
        },
        {
          id: "react-hoc-render-hooks",
          q: "What are the differences between HOCs, render props, and custom Hooks?",
          a: `<p>All three patterns can reuse logic, but they do it differently.</p>
<ul>
<li><strong>HOCs:</strong> Wrap a component and return an enhanced component.</li>
<li><strong>Render props:</strong> Pass a function that controls what UI a component renders.</li>
<li><strong>Custom Hooks:</strong> Share stateful logic directly between function components without adding a wrapper component.</li>
</ul>
<p>In modern React, I generally prefer custom Hooks for reusable logic, while HOCs and render props remain useful for existing libraries and certain component-composition patterns.</p>`,
        },
        {
          id: "react-compound-components",
          q: "What are compound components, and how would you implement them?",
          a: `<p>Compound components are a group of related components designed to work together through a shared parent, often using Context to share state.</p>
<p>For example, a Tabs component might expose <code>Tabs</code>, <code>Tabs.List</code>, <code>Tabs.Trigger</code>, and <code>Tabs.Content</code>.</p>
<pre><code>&lt;Tabs&gt;
  &lt;Tabs.List&gt;
    &lt;Tabs.Trigger value="profile"&gt;Profile&lt;/Tabs.Trigger&gt;
    &lt;Tabs.Trigger value="settings"&gt;Settings&lt;/Tabs.Trigger&gt;
  &lt;/Tabs.List&gt;
  &lt;Tabs.Content value="profile"&gt;Profile details&lt;/Tabs.Content&gt;
&lt;/Tabs&gt;</code></pre>
<p>This pattern creates a flexible API where consumers control the component structure while the parent manages shared behavior.</p>`,
        },
        {
          id: "react-controlled-api",
          q: "What are controlled and uncontrolled component APIs in reusable component design?",
          a: `<p>A controlled component receives its current value through props, and the parent controls updates through callbacks such as <code>onChange</code>.</p>
<p>An uncontrolled component manages its own internal state and may expose an initial value through a prop such as <code>defaultValue</code>.</p>
<p>For reusable components, I choose controlled APIs when the parent needs precise control and uncontrolled APIs when the component should manage its own behavior. Some components support both approaches.</p>`,
        },
        {
          id: "react-ssr",
          q: "What is server-side rendering (SSR)?",
          a: `<p>Server-side rendering means generating a page's HTML on the server and sending it to the browser.</p>
<p>The browser can display the initial HTML before the client-side JavaScript finishes loading, which can improve initial content visibility and help search engines access page content. React can then hydrate the HTML to make it interactive.</p>
<p>Frameworks such as Next.js provide SSR support and handle much of the surrounding infrastructure.</p>`,
        },
        {
          id: "react-ssg",
          q: "What is static site generation (SSG), and how does it differ from SSR?",
          a: `<p>SSG generates HTML ahead of time, usually during the build process. The generated pages can then be served efficiently from a CDN.</p>
<p>SSR generates HTML on the server in response to a request.</p>
<p>SSG is useful for content that changes infrequently, such as documentation or marketing pages. SSR is useful when the initial page needs fresh, request-specific data. Some frameworks also support revalidation to update statically generated pages.</p>`,
        },
        {
          id: "react-hydration",
          q: "What is hydration, and what causes hydration mismatches?",
          a: `<p>Hydration is the process of attaching React's event handling and interactive behavior to HTML that was already rendered on the server.</p>
<p>A hydration mismatch occurs when the initial client render does not match the server-generated HTML. Common causes include rendering different dates or random values, accessing browser-only APIs during initial rendering, and inconsistent data or conditional markup.</p>
<p>I fix these issues by making the initial output consistent on both sides and handling browser-specific behavior after hydration when appropriate.</p>`,
        },
        {
          id: "react-server-components",
          q: "What are React Server Components, and how do they differ from Client Components?",
          a: `<p>React Server Components (RSC) render on the server and can access server-side resources without sending their component implementation to the browser as client JavaScript.</p>
<p>Client Components are used for interactive features that require state, event handlers, or browser APIs.</p>
<p>In frameworks that support RSC, such as Next.js with the App Router, files marked with <code>"use client"</code> establish a client-component boundary. Server Components can reduce client JavaScript, while Client Components handle interactive UI.</p>
<p><strong>Important:</strong> Server Components are different from traditional server-side rendering. SSR generates HTML; RSC defines where components execute and what is sent to the client.</p>`,
        },
        {
          id: "react-vs-next",
          q: "What is the difference between React and a framework such as Next.js?",
          a: `<p>React is a JavaScript library for building user interfaces. It provides components, Hooks, and rendering capabilities, but does not prescribe a complete application architecture.</p>
<p>Next.js is a React framework that adds features such as routing, server-side rendering, static generation, server components, and build optimizations.</p>
<p>I would use React with additional libraries when I need flexibility over the architecture, and a framework such as Next.js when I want integrated routing, rendering strategies, and server-side capabilities.</p>`,
        },
        {
          id: "react-project-structure",
          q: "How would you structure a scalable React project for a large application?",
          a: `<p>I prefer a feature-based structure where related components, hooks, API calls, and business logic are grouped together. Shared components and utilities remain in separate folders.</p>
<pre><code>src/
├── app/          # App setup, routing, providers
├── features/     # Auth, users, products
├── components/   # Shared UI components
├── hooks/        # Shared custom Hooks
├── services/     # API clients
├── utils/        # Helper functions
└── types/        # Shared TypeScript types</code></pre>
<p>This structure improves maintainability, supports team ownership, and makes features easier to test and modify independently.</p>`,
        },
        {
          id: "react-feature-vs-layer",
          q: "What is the difference between feature-based and layer-based folder structures?",
          a: `<p>Feature-based structure groups files by business functionality, such as authentication, payments, or products.</p>
<p>Layer-based structure groups files by technical responsibility, such as components, hooks, services, and reducers.</p>
<p>Feature-based structures often scale better for large applications because related code stays together. Layer-based structures can work well for smaller applications, but developers may need to navigate many folders to modify one feature.</p>`,
        },
        {
          id: "react-business-vs-presentation",
          q: "How do you separate business logic from presentation logic?",
          a: `<p>I keep UI components responsible for displaying data and handling user interactions, while business logic handles rules and application behavior.</p>
<p>For example, a checkout component displays products and a payment button, while a custom Hook or service handles checkout validation and payment operations.</p>
<p>This separation makes the logic easier to test, reuse, and maintain without tying it to a particular UI.</p>`,
        },
        {
          id: "react-container-presentational",
          q: "What is the container-presentational component pattern?",
          a: `<p>This pattern separates components that manage data and behavior from components that primarily display UI.</p>
<ul>
<li><strong>Container component:</strong> Handles data fetching, state, and business logic.</li>
<li><strong>Presentational component:</strong> Receives props and renders the interface.</li>
</ul>
<p>For example, a <code>UserContainer</code> fetches user details and passes them to a reusable <code>UserProfile</code> component. Modern Hooks can reduce the need for separate containers, but the separation of responsibilities remains useful.</p>`,
        },
        {
          id: "react-reusable-components",
          q: "How do you design reusable components without making them overly complex?",
          a: `<p>I start with a clear, focused responsibility and add props only when there is a real use case.</p>
<p>I prefer composition through <code>children</code> and smaller components rather than adding many Boolean props and conditional branches. I also define sensible defaults, accessible behavior, and clear TypeScript types.</p>
<p>A component should be reusable without becoming a framework of its own.</p>`,
        },
        {
          id: "react-solid",
          q: "What are the SOLID principles, and how can they apply to React component design?",
          a: `<p>SOLID is a set of five software design principles:</p>
<ul>
<li><strong>S — Single Responsibility:</strong> A component should have one clear responsibility.</li>
<li><strong>O — Open/Closed:</strong> Extend behavior through composition or configuration without repeatedly modifying stable code.</li>
<li><strong>L — Liskov Substitution:</strong> Substitutable implementations should preserve the expected contract.</li>
<li><strong>I — Interface Segregation:</strong> Prefer small, focused prop interfaces over components with many unrelated props.</li>
<li><strong>D — Dependency Inversion:</strong> High-level logic should depend on abstractions rather than tightly coupling itself to concrete implementations.</li>
</ul>
<p>In React, these principles encourage focused components, clear interfaces, composition, and loosely coupled business logic.</p>`,
        },
        {
          id: "react-dependency-injection",
          q: "What is dependency injection, and how can you apply its principles in React?",
          a: `<p>Dependency injection means providing a component or function with the dependencies it needs rather than making it create or locate those dependencies itself.</p>
<p>For example, a component can receive an API function through props instead of importing a specific API implementation directly.</p>
<pre><code>function UserList({ fetchUsers }) {
  // Use the injected function to load users
}</code></pre>
<p>This makes the component easier to test with mock functions and allows different implementations to be substituted without changing the component.</p>`,
        },
        {
          id: "react-composition-inheritance-architecture",
          q: "What is the difference between composition and inheritance in component architecture?",
          a: `<p>Composition builds complex UI by combining smaller components. Inheritance extends one class or component type from another.</p>
<p>React generally favors composition because it allows flexible reuse without creating deep inheritance hierarchies.</p>
<p>For example, a reusable <code>Card</code> can accept different content through <code>children</code>, making it useful for user profiles, product details, and notifications.</p>`,
        },
        {
          id: "react-design-modal",
          q: "How would you design a reusable modal, dropdown, or date-picker component?",
          a: `<p>I would define a clear API, separate internal behavior from styling, and ensure accessibility.</p>
<p>For a modal, I would support controlled visibility, closing actions, keyboard handling, focus management, and portal rendering when needed. For a dropdown, I would handle keyboard navigation and selection. For a date-picker, I would also consider date formatting, localization, and validation.</p>
<p>I would test edge cases and use established accessibility patterns rather than implementing complex interactions from scratch unnecessarily.</p>`,
        },
        {
          id: "react-component-library",
          q: "How do you design a shared component library for multiple teams?",
          a: `<p>I would establish consistent design tokens, component APIs, accessibility standards, naming conventions, and versioning rules.</p>
<p>The library should include reusable components, TypeScript definitions, documentation, visual examples, and automated tests. I would also use semantic versioning and a clear release process so changes do not unexpectedly break consuming applications.</p>
<p>A shared library should make teams more consistent without preventing product-specific flexibility.</p>`,
        },
        {
          id: "react-circular-dependencies",
          q: "How do you prevent circular dependencies in a large React codebase?",
          a: `<p>Circular dependencies occur when modules depend on each other directly or indirectly, such as A → B → A.</p>
<p>I prevent them by defining clear dependency boundaries, keeping shared utilities in independent modules, and avoiding imports from higher-level features into lower-level shared layers.</p>
<p>Tools such as dependency-cruiser and ESLint import rules can detect dependency cycles during development or CI.</p>`,
        },
        {
          id: "react-env-config",
          q: "How do you manage environment variables and configuration across development, staging, and production?",
          a: `<p>I separate environment-specific configuration from application logic and use different settings for development, staging, and production.</p>
<p>For example, API base URLs can come from environment variables, while shared configuration is centralized in a typed configuration module. I validate required variables at startup and avoid committing secrets to source control.</p>
<p><strong>Important:</strong> Frontend environment variables are generally included in the client bundle, so API keys or credentials that must remain secret belong on the server.</p>`,
        },
        {
          id: "react-feature-flags",
          q: "How would you handle feature flags and gradual feature rollouts?",
          a: `<p>Feature flags allow functionality to be enabled or disabled without deploying a separate code change for every rollout decision.</p>
<p>I would use a configuration service or feature-flag platform to enable a feature for internal users, a small percentage of users, or selected groups before expanding the rollout.</p>
<p>I would monitor errors and performance, provide a rollback mechanism, and remove obsolete flags after the rollout. Sensitive permissions must still be enforced on the backend.</p>`,
        },
        {
          id: "react-accessibility",
          q: "How do you make React components accessible and keyboard-friendly?",
          a: `<p>I use semantic HTML, meaningful labels, accessible names, visible focus indicators, and correct keyboard behavior.</p>
<p>For custom controls such as dialogs and dropdowns, I follow established ARIA patterns and support appropriate keyboard interactions, focus management, and screen-reader announcements.</p>
<p>I also test with keyboard-only navigation and accessibility tools. Native HTML elements are usually preferable to custom controls when they meet the requirement.</p>`,
        },
        {
          id: "react-migrate-legacy",
          q: "How would you migrate a legacy React application to a modern architecture without disrupting development?",
          a: `<p>I would avoid rewriting the entire application at once. Instead, I would assess existing dependencies, identify high-risk areas, and create a gradual migration plan.</p>
<p>I would introduce modern patterns in new features first, establish tests around existing behavior, and migrate old modules incrementally behind stable interfaces. I would also update dependencies in manageable steps, monitor production errors, and keep the team aligned through documentation and code reviews.</p>
<p>This approach reduces risk while allowing normal feature development to continue.</p>`,
        },
        {
          id: "react-test-types",
          q: "What is the difference between unit, integration, and end-to-end testing?",
          a: `<ul>
<li><strong>Unit testing:</strong> Tests a small, isolated piece of code, such as a utility function or component.</li>
<li><strong>Integration testing:</strong> Checks whether multiple parts work together, such as a form interacting with validation and API logic.</li>
<li><strong>End-to-end (E2E) testing:</strong> Tests a complete user flow, such as logging in and completing a purchase in a browser.</li>
</ul>
<p>I use unit tests for individual logic, integration tests for component interactions, and E2E tests for critical user journeys.</p>`,
        },
        {
          id: "react-jest-vs-rtl",
          q: "What is the difference between Jest and React Testing Library?",
          a: `<p>Jest is a JavaScript testing framework that provides test execution, assertions, mocks, and other testing utilities.</p>
<p>React Testing Library (RTL) provides tools for rendering React components and testing them through user-visible behavior, such as finding buttons and clicking them.</p>
<p>They complement each other: Jest runs and supports the tests, while RTL helps test React components. Modern projects can also use alternatives such as Vitest.</p>`,
        },
        {
          id: "react-test-props",
          q: "How do you test a component that receives props?",
          a: `<p>I render the component with different props and verify that it displays the expected output.</p>
<pre><code>render(&lt;Greeting name="Nitin" /&gt;);

expect(
  screen.getByText("Hello, Nitin")
).toBeInTheDocument();</code></pre>
<p>I also test edge cases, such as optional props, different values, and Boolean props, to ensure the component behaves correctly.</p>`,
        },
        {
          id: "react-test-interactions",
          q: "How do you test interactions such as clicks, typing, and form submission?",
          a: `<p>I simulate realistic user interactions and verify the resulting UI or behavior. React Testing Library recommends <code>userEvent</code> for most interactions.</p>
<pre><code>const user = userEvent.setup();

render(&lt;LoginForm /&gt;);

await user.type(
  screen.getByLabelText(/email/i),
  "test@example.com"
);

await user.click(
  screen.getByRole("button", { name: /submit/i })
);</code></pre>
<p>Then I assert that the expected validation message, callback, or success state appears.</p>`,
        },
        {
          id: "react-test-api",
          q: "How do you test components that make API requests?",
          a: `<p>I mock the API dependency so tests do not depend on a real network or backend.</p>
<p>I test loading, successful responses, empty results, failures, and cancellation where relevant. Tools such as Mock Service Worker (MSW) can intercept requests and provide realistic responses.</p>
<p>I focus on what the user sees rather than testing internal implementation details.</p>`,
        },
        {
          id: "react-test-useeffect-hook",
          q: "How do you test a custom Hook that uses useEffect?",
          a: `<p>I use React Testing Library's <code>renderHook</code> utility to execute the Hook within a React test environment.</p>
<p>I verify its initial state, effect behavior when dependencies change, asynchronous updates, and cleanup on unmount. For timers, I use fake timers; for API calls, I mock or intercept requests.</p>
<p>I use <code>act</code> and asynchronous utilities when needed to ensure updates are processed before assertions.</p>`,
        },
        {
          id: "react-snapshot-testing",
          q: "What is snapshot testing, and what are its limitations?",
          a: `<p>Snapshot testing saves a representation of a component's output and compares future test results against it.</p>
<p>It can detect unexpected changes, but large snapshots are difficult to review and may be updated without checking whether the change is correct. A passing snapshot also does not guarantee correct user behavior.</p>
<p>I prefer focused assertions for important functionality and use snapshots selectively.</p>`,
        },
        {
          id: "react-xss",
          q: "How do you prevent cross-site scripting (XSS) in React?",
          a: `<p>React escapes text rendered through JSX by default, which helps prevent common XSS attacks.</p>
<p>I avoid inserting untrusted HTML with <code>dangerouslySetInnerHTML</code>. If HTML must be rendered, I sanitize it with a trusted sanitizer, validate URLs, and use appropriate security headers such as Content Security Policy where suitable.</p>
<p><strong>Important:</strong> React's default escaping does not protect every injection path, particularly unsafe URLs or manually inserted HTML.</p>`,
        },
        {
          id: "react-token-storage",
          q: "Why is storing sensitive authentication tokens in browser storage potentially risky?",
          a: `<p>JavaScript running on the page can read values stored in <code>localStorage</code> and <code>sessionStorage</code>. If an attacker exploits an XSS vulnerability, they may be able to steal authentication tokens from these stores.</p>
<p>For browser applications, secure HttpOnly, Secure, and appropriately configured SameSite cookies can reduce direct token theft through JavaScript. Cookie-based authentication still requires appropriate CSRF protection and secure session handling.</p>
<p>The right approach depends on the application's architecture and threat model.</p>`,
        },
        {
          id: "react-production-release",
          q: "What steps would you take before releasing a React application to production?",
          a: `<p>Before release, I would:</p>
<ol>
<li>Run unit, integration, and critical E2E tests.</li>
<li>Run linting, type checks, and a production build.</li>
<li>Check bundle size, performance, accessibility, and responsive layouts.</li>
<li>Verify API endpoints, environment configuration, and authentication.</li>
<li>Review security risks, secrets, and error handling.</li>
<li>Test important user flows in staging.</li>
<li>Confirm monitoring, error reporting, and rollback procedures.</li>
</ol>
<p>After deployment, I would monitor errors and real-user performance to catch issues that testing may not reveal.</p>`,
        },
        {
          id: "react-infinite-rerender",
          q: "A component keeps re-rendering infinitely. How would you identify and fix the cause?",
          a: `<p>First, I would use React DevTools Profiler and inspect <code>useEffect</code> dependencies and state updates. An infinite loop often occurs when an effect updates state, which changes a dependency and triggers the effect again.</p>
<pre><code>useEffect(() =&gt; {
  setCount(count + 1);
}, [count]); // Infinite update loop</code></pre>
<p>I would fix the logic based on the actual requirement, remove unnecessary effects, or stabilize dependencies where appropriate. I would also check for state updates during rendering, which can cause repeated renders.</p>`,
        },
        {
          id: "react-ui-not-updating",
          q: "An API request returns the correct data, but the UI does not update. How would you debug it?",
          a: `<p>I would check whether the API response reaches the component, whether the state setter is called, and whether the component reads the correct state.</p>
<p>A common mistake is directly mutating state instead of creating a new object or array.</p>
<pre><code>// Incorrect
users.push(newUser);
setUsers(users);

// Correct
setUsers(prev =&gt; [...prev, newUser]);</code></pre>
<p>React relies on state identity to detect many updates. I would also check conditional rendering, stale closures, and whether another request overwrites the correct response.</p>`,
        },
        {
          id: "react-child-rerender-debug",
          q: "A child component re-renders every time its parent renders, even though its displayed data has not changed. How would you investigate and optimize it?",
          a: `<p>First, I would confirm through React DevTools Profiler whether these renders actually affect performance. Then I would inspect the child's props for newly created objects, arrays, and functions.</p>
<p>If the child is expensive to render, I could use <code>React.memo</code> and stabilize relevant props with <code>useMemo</code> or <code>useCallback</code>.</p>
<pre><code>const UserCard = React.memo(function UserCard({ user }) {
  return &lt;p&gt;{user.name}&lt;/p&gt;;
});</code></pre>
<p>I would also check whether the child consumes frequently changing context or updates its own state, since <code>React.memo</code> does not prevent those updates.</p>`,
        },
        {
          id: "react-search-race",
          q: "A search page shows stale results when users type quickly and multiple API requests overlap. How would you prevent this issue?",
          a: `<p>This is a race condition: an older request may finish after a newer request and overwrite its results.</p>
<p>I would cancel outdated requests using <code>AbortController</code> and clean them up when the search query changes. I could also debounce requests to reduce unnecessary API calls.</p>
<pre><code>useEffect(() =&gt; {
  const controller = new AbortController();

  fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
    signal: controller.signal
  })
    .then(res =&gt; {
      if (!res.ok) throw new Error("Search failed");
      return res.json();
    })
    .then(setResults)
    .catch(error =&gt; {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });

  return () =&gt; controller.abort();
}, [query]);</code></pre>
<p>Cancellation helps prevent outdated requests from updating the UI, while debouncing reduces request frequency. For more complex applications, I would consider TanStack Query to manage caching and request lifecycles.</p>`,
        },
        {
          id: "react-slow-navigation",
          q: "Your application becomes slow after navigating between several pages. How would you investigate memory leaks, excessive rendering, and unnecessary network requests?",
          a: `<p>I would reproduce the issue and profile the application before changing code. I would investigate three areas:</p>
<ul>
<li><strong>Memory leaks:</strong> Check for uncleaned timers, event listeners, subscriptions, and requests using browser memory tools and heap snapshots.</li>
<li><strong>Excessive rendering:</strong> Use React DevTools Profiler to identify expensive components, unnecessary context updates, and repeated renders.</li>
<li><strong>Network requests:</strong> Use the browser Network panel to identify duplicate requests, repeated fetching, large responses, and missing caching.</li>
</ul>
<p>Then I would fix effect cleanup, optimize only the expensive components, and introduce appropriate caching or request deduplication. Finally, I would repeat the same navigation sequence and compare memory usage, render times, and network activity to confirm the improvements.</p>`,
        },
        {
          id: "react-build-data-table",
          q: "Build a searchable, sortable, and paginated data table using React.",
          a: `<p><strong>Approach:</strong> Keep the search query, sort configuration, and current page in state. Derive the filtered, sorted, and paginated rows from the original dataset.</p>
<pre><code>import { useMemo, useState } from "react";

function DataTable({ data }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({
    key: "name",
    direction: "asc",
  });
  const [page, setPage] = useState(1);

  const pageSize = 5;

  const filtered = useMemo(() =&gt; {
    const q = query.toLowerCase();

    return data.filter(item =&gt;
      Object.values(item).some(value =&gt;
        String(value).toLowerCase().includes(q)
      )
    );
  }, [data, query]);

  const sorted = useMemo(() =&gt; {
    return [...filtered].sort((a, b) =&gt; {
      const result = String(a[sort.key]).localeCompare(
        String(b[sort.key]),
        undefined,
        { numeric: true }
      );

      return sort.direction === "asc" ? result : -result;
    });
  }, [filtered, sort]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const currentPage = Math.min(page, Math.max(1, totalPages));

  const rows = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function changeSort(key) {
    setSort(previous =&gt; ({
      key,
      direction:
        previous.key === key &amp;&amp; previous.direction === "asc"
          ? "desc"
          : "asc",
    }));
    setPage(1);
  }

  return (
    &lt;div&gt;
      &lt;input
        value={query}
        placeholder="Search..."
        onChange={e =&gt; {
          setQuery(e.target.value);
          setPage(1);
        }}
      /&gt;

      &lt;table&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            {["name", "email", "age"].map(key =&gt; (
              &lt;th key={key}&gt;
                &lt;button onClick={() =&gt; changeSort(key)}&gt;
                  {key} {sort.key === key ? sort.direction : ""}
                &lt;/button&gt;
              &lt;/th&gt;
            ))}
          &lt;/tr&gt;
        &lt;/thead&gt;

        &lt;tbody&gt;
          {rows.map(row =&gt; (
            &lt;tr key={row.id}&gt;
              &lt;td&gt;{row.name}&lt;/td&gt;
              &lt;td&gt;{row.email}&lt;/td&gt;
              &lt;td&gt;{row.age}&lt;/td&gt;
            &lt;/tr&gt;
          ))}
        &lt;/tbody&gt;
      &lt;/table&gt;

      {rows.length === 0 &amp;&amp; &lt;p&gt;No matching records.&lt;/p&gt;}

      &lt;button
        disabled={currentPage &lt;= 1}
        onClick={() =&gt; setPage(p =&gt; p - 1)}
      &gt;
        Previous
      &lt;/button&gt;

      &lt;span&gt;
        {" "}Page {currentPage} of {Math.max(1, totalPages)}{" "}
      &lt;/span&gt;

      &lt;button
        disabled={currentPage &gt;= totalPages}
        onClick={() =&gt; setPage(p =&gt; p + 1)}
      &gt;
        Next
      &lt;/button&gt;
    &lt;/div&gt;
  );
}

export default DataTable;</code></pre>
<p><strong>Interview points:</strong></p>
<ul>
<li>Filter first, sort second, paginate last.</li>
<li>Never mutate the original array when sorting.</li>
<li>Use stable unique IDs as keys.</li>
<li>For large datasets, consider server-side pagination and sorting instead of processing everything in the browser.</li>
</ul>`,
        },
        {
          id: "react-build-modal",
          q: "Build a reusable modal with keyboard accessibility, backdrop dismissal, and Escape-key handling.",
          a: `<p><strong>Approach:</strong> Use a portal, close the modal on Escape or backdrop clicks, and manage focus. A production modal should also trap focus and restore focus when closed.</p>
<pre><code>import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() =&gt; {
    if (!open) return;

    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;

    dialog?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () =&gt; {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    &lt;div
      className="modal-backdrop"
      onMouseDown={event =&gt; {
        if (event.target === event.currentTarget) onClose();
      }}
    &gt;
      &lt;section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      &gt;
        &lt;h2 id="modal-title"&gt;{title}&lt;/h2&gt;

        {children}

        &lt;button onClick={onClose}&gt;Close&lt;/button&gt;
      &lt;/section&gt;
    &lt;/div&gt;,
    document.body
  );
}</code></pre>
<p><strong>Important production improvements:</strong></p>
<ul>
<li>Implement focus trapping so Tab stays inside the open modal.</li>
<li>Ensure <code>onClose</code> has a stable reference if needed to avoid unnecessary effect reruns.</li>
<li>Support nested modals, scroll locking, and screen-reader behavior where required.</li>
<li>Consider native <code>&lt;dialog&gt;</code> or a well-tested accessible dialog library.</li>
</ul>`,
        },
        {
          id: "react-build-multistep-form",
          q: "Build a multi-step form with validation, previous/next navigation, and persistent values.",
          a: `<p><strong>Approach:</strong> Keep all form values in one state object at the parent level. Render the active step conditionally and validate the current step before moving forward.</p>
<pre><code>import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");

  const fields = [
    ["name"],
    ["email"],
    ["password"],
  ];

  function updateField(event) {
    setValues(previous =&gt; ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  }

  function next() {
    const missing = fields[step].some(
      field =&gt; !values[field].trim()
    );

    if (missing) {
      setError("Please complete the required field.");
      return;
    }

    if (
      step === 1 &amp;&amp;
      !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email)
    ) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setStep(current =&gt; Math.min(current + 1, 2));
  }

  function submit(event) {
    event.preventDefault();

    if (!values.password.trim()) {
      setError("Password is required.");
      return;
    }

    setError("");
    // Submit values to your API here.
  }

  return (
    &lt;form onSubmit={submit}&gt;
      {step === 0 &amp;&amp; (
        &lt;label&gt;
          Name
          &lt;input
            name="name"
            value={values.name}
            onChange={updateField}
          /&gt;
        &lt;/label&gt;
      )}

      {step === 1 &amp;&amp; (
        &lt;label&gt;
          Email
          &lt;input
            name="email"
            type="email"
            value={values.email}
            onChange={updateField}
          /&gt;
        &lt;/label&gt;
      )}

      {step === 2 &amp;&amp; (
        &lt;label&gt;
          Password
          &lt;input
            name="password"
            type="password"
            value={values.password}
            onChange={updateField}
          /&gt;
        &lt;/label&gt;
      )}

      {error &amp;&amp; &lt;p role="alert"&gt;{error}&lt;/p&gt;}

      {step &gt; 0 &amp;&amp; (
        &lt;button
          type="button"
          onClick={() =&gt; {
            setError("");
            setStep(current =&gt; current - 1);
          }}
        &gt;
          Previous
        &lt;/button&gt;
      )}

      {step &lt; 2 ? (
        &lt;button type="button" onClick={next}&gt;
          Next
        &lt;/button&gt;
      ) : (
        &lt;button type="submit"&gt;Submit&lt;/button&gt;
      )}
    &lt;/form&gt;
  );
}</code></pre>
<p><strong>Interview points:</strong></p>
<ul>
<li>Store values above the step components so values survive navigation.</li>
<li>Validate each step before proceeding, and validate everything again on submission.</li>
<li>For production, add server-side validation, submission/loading states, accessible error messages, and protection against duplicate submissions.</li>
<li>Never store passwords in browser persistence such as <code>localStorage</code>.</li>
</ul>`,
        },
        {
          id: "react-build-autocomplete",
          q: "Build an autocomplete search with API integration, debouncing, loading states, error handling, and request cancellation.",
          a: `<p><strong>Approach:</strong> Keep the input responsive, wait until the user pauses typing, cancel outdated requests, and handle loading, error, and empty states.</p>
<pre><code>import { useEffect, useState } from "react";

function Autocomplete() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() =&gt; {
    const term = query.trim();

    if (!term) {
      setResults([]);
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () =&gt; {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          \`/api/search?q=\${encodeURIComponent(term)}\`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setResults(data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load results.");
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () =&gt; {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    &lt;div&gt;
      &lt;label htmlFor="search"&gt;Search users&lt;/label&gt;

      &lt;input
        id="search"
        value={query}
        onChange={event =&gt; setQuery(event.target.value)}
        role="combobox"
        aria-expanded={results.length &gt; 0}
        aria-controls="search-results"
        aria-autocomplete="list"
      /&gt;

      {loading &amp;&amp; &lt;p&gt;Searching...&lt;/p&gt;}
      {error &amp;&amp; &lt;p role="alert"&gt;{error}&lt;/p&gt;}

      {!loading &amp;&amp; !error &amp;&amp; query.trim() &amp;&amp;
        results.length === 0 &amp;&amp; &lt;p&gt;No results found.&lt;/p&gt;}

      &lt;ul id="search-results" role="listbox"&gt;
        {results.map(item =&gt; (
          &lt;li key={item.id} role="option"&gt;
            {item.name}
          &lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}</code></pre>
<p><strong>Interview points:</strong></p>
<ul>
<li>Debouncing reduces the number of requests.</li>
<li><code>AbortController</code> cancels outdated requests when the query changes.</li>
<li>Check <code>response.ok</code>; <code>fetch</code> does not reject automatically for HTTP 4xx or 5xx responses.</li>
<li>A production autocomplete also needs keyboard navigation, active-option management, selection behavior, and appropriate ARIA attributes.</li>
</ul>`,
        },
        {
          id: "react-build-dashboard",
          q: "Build a production-style dashboard with authentication, protected routes, reusable components, global state, API caching, error handling, and performance optimization.",
          a: `<p>This is a system-design and implementation assignment, so I would explain the architecture first rather than putting the entire dashboard into one component.</p>
<p><strong>Suggested architecture</strong></p>
<pre><code>src/
├── app/
│   ├── App.jsx
│   ├── router.jsx
│   └── providers.jsx
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── users/
│   └── reports/
├── components/
│   ├── ui/
│   ├── layout/
│   └── feedback/
├── services/
│   └── apiClient.js
└── store/
    └── index.js</code></pre>
<p><strong>Technology choices</strong></p>
<table>
<thead>
<tr><th>Requirement</th><th>Solution</th></tr>
</thead>
<tbody>
<tr><td>Routing</td><td>React Router</td></tr>
<tr><td>Authentication</td><td>Secure session or token-based flow</td></tr>
<tr><td>Global client state</td><td>Redux Toolkit or Zustand</td></tr>
<tr><td>API caching</td><td>TanStack Query or RTK Query</td></tr>
<tr><td>Reusable UI</td><td>Shared buttons, tables, cards, modals</td></tr>
<tr><td>Error handling</td><td>Error Boundaries plus API error handling</td></tr>
<tr><td>Performance</td><td>Lazy routes, memoization when useful, list virtualization</td></tr>
<tr><td>Testing</td><td>React Testing Library and E2E tests</td></tr>
</tbody>
</table>
<p><strong>Example protected route</strong></p>
<pre><code>import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ user, loading }) {
  if (loading) return &lt;p&gt;Checking session...&lt;/p&gt;;

  if (!user) {
    return &lt;Navigate to="/login" replace /&gt;;
  }

  return &lt;Outlet /&gt;;
}</code></pre>
<p>The <code>user</code> and <code>loading</code> values should come from the application's authentication/session logic. Authorization checks should also be enforced by the backend.</p>
<p><strong>Example API caching</strong></p>
<pre><code>import { useQuery } from "@tanstack/react-query";

function DashboardStats() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () =&gt; {
      const response = await fetch("/api/dashboard/stats");

      if (!response.ok) {
        throw new Error("Unable to load dashboard");
      }

      return response.json();
    },
    staleTime: 60_000,
  });

  if (isPending) return &lt;p&gt;Loading dashboard...&lt;/p&gt;;

  if (isError) {
    return (
      &lt;button onClick={() =&gt; refetch()}&gt;
        Retry loading dashboard
      &lt;/button&gt;
    );
  }

  return &lt;StatsCards data={data} /&gt;;
}</code></pre>
<p><strong>What makes it production-ready?</strong></p>
<ul>
<li>Authentication and backend authorization are correctly enforced.</li>
<li>API requests handle loading, errors, retries where appropriate, and caching.</li>
<li>Routes and heavy features are lazy-loaded where beneficial.</li>
<li>Forms and interactive controls are accessible.</li>
<li>Tests cover authentication, error states, and critical workflows.</li>
<li>Monitoring, environment configuration, and deployment rollback are planned.</li>
<li>Performance is measured before and after optimization.</li>
</ul>
<p>The key interview takeaway is that a production dashboard is not just a collection of screens. It is a set of clearly separated responsibilities, predictable state flows, secure API interactions, and measurable performance.</p>`,
        },
      ],
    },
  ],
};
