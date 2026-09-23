export const react = {
  id: "react",
  title: "React",
  heading: "UI as a function of state",
  tagline: "Components, hooks, rendering, and performance",
  lede: "After JavaScript, walk through how React thinks: props down, state up, render, then commit.",
  tip: "React is a library, not a language. You still write JavaScript. JSX looks like HTML, but it compiles to function calls.",
  practice: {
    title: "Note",
    body: "In your head, map this UI to state: a counter button, a name input, and a list of todos. Ask: what is props, what is state, and who owns the data?",
  },
  takeaways: [
    "React describes UI as a function of state. You do not update the DOM by hand.",
    "Props come from the parent and are read-only. State is owned by the component.",
    "useEffect is for synchronizing with the outside world. Always clean up subscriptions.",
    "Keys must be stable ids. Wrong keys remount components and lose state.",
  ],
  sections: [
    {
      title: "Foundations",
      level: "basic",
      questions: [
        {
          id: "react-what",
          q: "What is React, and why do we use it?",
          a: `<p>React is a library for building UIs from components. You describe what the UI should look like for a given state. React updates the DOM for you when that state changes.</p>
<p>The win is composition, a predictable render model, and a large ecosystem. It is not a full framework by itself — routing, data fetching, and styling are chosen separately (or come from Next.js / Remix).</p>`,
        },
        {
          id: "react-jsx",
          q: "What is JSX?",
          a: `<p>JSX is syntax that looks like HTML inside JavaScript. Tools compile it to <code>React.createElement</code> (or the automatic JSX runtime). It is not HTML: use <code>className</code>, <code>htmlFor</code>, camelCase events like <code>onClick</code>, and wrap multiple nodes in a fragment <code>&lt;&gt;...&lt;/&gt;</code>.</p>
<p>Expressions go in curly braces. You cannot put <code>if</code> statements directly inside JSX; use ternaries, <code>&amp;&amp;</code>, or compute values above the return.</p>`,
        },
        {
          id: "react-props-state",
          q: "What is the difference between props and state?",
          a: `<p><strong>Props</strong> are inputs passed from a parent. The child should treat them as read-only. <strong>State</strong> is data owned by the component. Changing state schedules a re-render.</p>
<p>If two siblings need the same data, lift state to the closest shared parent and pass it down. If many distant trees need it, consider context.</p>`,
        },
        {
          id: "react-functional",
          q: "Functional vs class components?",
          a: `<p>Modern React is function components plus hooks. Classes still work, but new features (concurrent rendering, most libraries) assume hooks.</p>
<p>Say this in an interview: you can explain class lifecycle methods (<code>componentDidMount</code>, <code>didUpdate</code>, <code>willUnmount</code>) and map them to <code>useEffect</code>, but you write functions day to day.</p>`,
        },
        {
          id: "react-usestate",
          q: "How does useState work, and what mistakes do people make?",
          a: `<p><code>useState(initial)</code> returns the current value and a setter. React keeps that state for the component instance across renders. The setter replaces the value (or uses an updater function).</p>
<pre><code>setCount((n) => n + 1); // safe when next value depends on previous</code></pre>
<p>State updates are asynchronous from your point of view — reading <code>count</code> on the next line still shows the old value. Objects and arrays must be copied, not mutated, or React may skip the render.</p>`,
        },
        {
          id: "react-lists-keys",
          q: "Why do lists need keys?",
          a: `<p>Keys tell React which item is which between renders so it can reuse DOM and state. Use a stable id from your data. Never use a random key. Index keys are acceptable only for static lists that never reorder, insert, or filter.</p>
<p>Wrong keys cause inputs to keep the wrong text, animations to jump, and extra remounts.</p>`,
        },
        {
          id: "react-controlled",
          q: "Controlled vs uncontrolled components?",
          a: `<p>A <strong>controlled</strong> input gets its value from React state and updates through <code>onChange</code>. An <strong>uncontrolled</strong> input keeps its value in the DOM; you read it with a ref, often on submit.</p>
<p>Controlled is the default for forms you validate live. Uncontrolled is fine for simple or large forms, or file inputs.</p>`,
        },
      ],
    },
    {
      title: "Hooks and data flow",
      level: "intermediate",
      questions: [
        {
          id: "react-useeffect",
          q: "Explain useEffect and its dependency array.",
          a: `<p><code>useEffect</code> runs after paint for synchronization: fetching, subscriptions, timers, talking to non-React APIs. The function you return is cleanup, and it runs before the next effect and on unmount.</p>
<ul>
<li>No array: run after every render (rarely what you want).</li>
<li><code>[]</code>: run once after mount (plus cleanup on unmount).</li>
<li><code>[id]</code>: re-run when <code>id</code> changes.</li>
</ul>
<p>Include every value from the component that the effect reads. Missing deps cause stale closures. If that makes the effect fire too often, the design is usually wrong — split effects or store the latest value in a ref.</p>`,
        },
        {
          id: "react-stale",
          q: "What is a stale closure in React?",
          a: `<p>A callback “remembers” the state from the render that created it. If you start a timeout or subscribe once, and that callback reads <code>count</code>, it may still see the first <code>count</code>.</p>
<p>Fixes: put the changing value in the effect deps, use a functional state update, or keep the latest value in <code>useRef</code> and read <code>ref.current</code> inside the callback.</p>`,
        },
        {
          id: "react-context",
          q: "When should you use Context vs props vs a store?",
          a: `<p>Props for local, explicit data. Context for values many nested children need without drilling: theme, locale, current user, a DI-style service.</p>
<p>Context is not a cache and not automatically fast. Every consumer re-renders when the provider value changes. Split contexts, memoize the value, or use a store (Zustand, Redux, Jotai) when updates are frequent or the tree is large.</p>`,
        },
        {
          id: "react-memo",
          q: "What do React.memo, useMemo, and useCallback actually do?",
          a: `<p><code>React.memo</code> skips re-rendering a child if its props are shallow-equal. <code>useMemo</code> caches an expensive calculation. <code>useCallback</code> caches a function identity so memoized children do not see a new prop every render.</p>
<p>Do not wrap everything. Measure first. These tools help when a cheap parent re-renders a heavy child, or when a value is a dependency of an effect you do not want to retrigger.</p>`,
        },
        {
          id: "react-ref",
          q: "What is useRef for?",
          a: `<p>A ref holds a mutable value that survives renders without causing a render when it changes. Common uses: DOM nodes, timer ids, previous values, and “latest callback” boxes.</p>
<p><code>ref.current = node</code> is assigned by React for <code>ref={ref}</code>. Do not use refs to avoid learning state. If the UI should update, it is state.</p>`,
        },
        {
          id: "react-usereducer",
          q: "When is useReducer better than useState?",
          a: `<p>Use it when next state depends on previous state in several ways, when updates are related (form wizard, complex local UI), or when you want a single dispatch API to pass down.</p>
<p>It does not magically stop re-renders. It organizes transitions. For app-wide state, a real store is usually clearer.</p>`,
        },
        {
          id: "react-custom-hooks",
          q: "What is a custom hook, and what are the Rules of Hooks?",
          a: `<p>A custom hook is a function whose name starts with <code>use</code> that calls other hooks. It lets you reuse stateful logic, not UI.</p>
<p>Rules: only call hooks at the top level of a React function, never in loops or conditions, and only from components or other hooks. React relies on call order to match state to hooks.</p>`,
        },
        {
          id: "react-router",
          q: "How does client-side routing work in React?",
          a: `<p>The browser URL changes without a full reload (History API). A router reads the path and renders matching components. In React Router that is <code>BrowserRouter</code>, <code>Routes</code>, <code>Route</code>, <code>Link</code>, and loaders/actions in data-router mode.</p>
<p>Mention nested routes, outlet layouts, and that auth redirects belong in loaders or route guards — not only in random <code>useEffect</code>s.</p>`,
        },
      ],
    },
    {
      title: "Rendering model and advanced React",
      level: "advanced",
      questions: [
        {
          id: "react-virtual-dom",
          q: "What is the virtual DOM and reconciliation?",
          a: `<p>The virtual DOM is a tree of React elements in memory. On an update, React compares the new tree to the previous one (reconciliation) and applies the smallest DOM operations it can.</p>
<p>It is not “always faster than DOM.” It is a predictable programming model. Keys, component types, and state location decide whether React reuses a node or remounts it and loses state.</p>`,
        },
        {
          id: "react-fiber",
          q: "What is Fiber and concurrent rendering?",
          a: `<p>Fiber is React’s reconciliation engine. Work is split into units that can be paused, reused, or thrown away. Concurrent features (transitions, Suspense) let React keep the UI responsive: urgent updates (typing) can interrupt less urgent ones (filtering a huge list).</p>
<p><code>startTransition</code> marks an update as non-urgent. <code>useDeferredValue</code> keeps showing the previous value while a heavy child catches up.</p>`,
        },
        {
          id: "react-batching",
          q: "How does state batching work?",
          a: `<p>React 18 batches state updates in event handlers, timeouts, promises, and native events. Multiple <code>setState</code> calls in one tick become one render. Use the functional updater when each update depends on the previous value, because they may be applied together.</p>
<p><code>flushSync</code> forces a DOM update immediately. Almost never needed.</p>`,
        },
        {
          id: "react-suspense",
          q: "What are Suspense, lazy, and error boundaries?",
          a: `<p><code>React.lazy</code> plus <code>Suspense</code> code-splits a component and shows a fallback while the chunk loads. Suspense also coordinates async UI (data frameworks, React 19 resource reading).</p>
<p>Error boundaries are class components (or special packages) that catch render errors in the tree below them and show fallback UI. They do not catch errors in event handlers or async code — those need try/catch.</p>`,
        },
        {
          id: "react-performance",
          q: "How do you diagnose and fix React performance issues?",
          a: `<ol>
<li>Reproduce with React Profiler: what committed, why, how long.</li>
<li>Fix accidental remounts (unstable keys, inline component definitions).</li>
<li>Stop passing new object/function identities into memoized children if that child is expensive.</li>
<li>Virtualize long lists. Split code. Defer non-urgent updates.</li>
<li>Move expensive work out of render, or into workers if it is pure compute.</li>
</ol>
<p>Premature memo is noise. Wrong architecture (one giant context, one giant state object) is the usual root cause.</p>`,
        },
        {
          id: "react-strict-mode",
          q: "Why does useEffect run twice in development?",
          a: `<p>React Strict Mode remounts components in development to surface unsafe effects: missing cleanup, subscriptions that stack, fetches that are not cancelled. Production mounts once.</p>
<p>The correct fix is a proper cleanup, not an <code>isMounted</code> ref hack or disabling Strict Mode.</p>`,
        },
        {
          id: "react-rsc",
          q: "What are Server Components at a high level?",
          a: `<p>In frameworks like Next.js App Router, Server Components render on the server and send a serialized UI payload. They can read databases and secrets directly. They do not use state, effects, or browser APIs.</p>
<p>Client Components are the familiar interactive pieces, marked with <code>"use client"</code>. The interview point: reduce JS shipped to the browser, keep interactivity at the edges, and never pass non-serializable values from server to client.</p>`,
        },
      ],
    },
  ],
};
