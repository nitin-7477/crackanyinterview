export const reactNative = {
  id: "react-native",
  title: "React Native",
  heading: "Same React, native views",
  tagline: "Components, navigation, native bridge, and performance",
  lede: "Twenty-five questions a day. The next day opens after every question for the day is marked as read.",
  tip: "React Native is not a WebView wrapper. It uses React, but it draws native iOS and Android views. There is no HTML and no CSS file.",
  practice: {
    title: "Note",
    body: "Read the 25 questions for the day and mark each one complete. The next day opens only after all of them are read.",
  },
  takeaways: [
    "React Native uses React, but it renders native views, not HTML.",
    "All text must be inside a Text component. Styling is StyleSheet plus Flexbox.",
    "Use FlatList for long lists. ScrollView renders every child at once.",
    "The New Architecture (JSI, Fabric, TurboModules) avoids the old JSON bridge.",
  ],
  sections: [
    {
      title: "React Native",
      level: "basic",
      questions: [
        {
          id: "rn-what-used",
          q: "What is React Native, and why is it used?",
          a: `<p>React Native is an open-source framework developed by Meta for building Android and iOS applications using JavaScript or TypeScript and React.</p>
<p>It allows developers to share much of their code across platforms while rendering native UI components. It reduces duplicated development effort compared with maintaining completely separate Android and iOS applications.</p>`,
        },
        {
          id: "rn-vs-react",
          q: "What is the difference between React.js and React Native?",
          a: `<p>React.js is used to build web interfaces, while React Native is used to build mobile applications.</p>
<p>React.js renders HTML elements into the browser DOM, whereas React Native renders native UI components such as <code>View</code>, <code>Text</code>, and <code>TextInput</code>.</p>
<p>Both use components, props, state, and Hooks, so React knowledge transfers well to React Native.</p>`,
        },
        {
          id: "rn-render-without-html",
          q: "How does React Native render UI without using HTML and CSS?",
          a: `<p>React Native uses its own components and styling system rather than HTML elements and browser CSS.</p>
<p>For example, <code>View</code> acts as a container, <code>Text</code> displays text, and <code>StyleSheet</code> defines styles using JavaScript objects. React Native translates these into native UI elements and layout instructions for Android and iOS.</p>`,
        },
        {
          id: "rn-framework-or-library",
          q: "Is React Native a framework or a library?",
          a: `<p>React Native is commonly described as a framework for building native mobile applications because it provides the core application UI and runtime integration.</p>
<p>It is built on React, which is a UI library. React Native applications can also use additional libraries and tools, such as Expo, React Navigation, and Redux Toolkit.</p>`,
        },
        {
          id: "rn-advantages",
          q: "What are the major advantages and disadvantages of React Native?",
          a: `<p><strong>Advantages:</strong></p>
<ul>
<li>Shared code across Android and iOS.</li>
<li>Faster development through React components and Fast Refresh.</li>
<li>Access to native device capabilities through native modules.</li>
<li>Large ecosystem and community.</li>
</ul>
<p><strong>Disadvantages:</strong></p>
<ul>
<li>Some features require native Android or iOS knowledge.</li>
<li>Native dependencies can introduce build and compatibility issues.</li>
<li>Performance-sensitive features may need native optimization.</li>
<li>Platform-specific UI differences sometimes require separate implementations.</li>
</ul>`,
        },
        {
          id: "rn-vs-native",
          q: "What is the difference between React Native and native Android/iOS development?",
          a: `<p>Native Android development typically uses Kotlin or Java, while native iOS development commonly uses Swift or Objective-C.</p>
<p>React Native uses JavaScript or TypeScript and React to build applications for both platforms with substantial code sharing.</p>
<p>Native development offers direct access to platform APIs and control, while React Native can reduce development time when the application has significant shared functionality.</p>`,
        },
        {
          id: "rn-vs-flutter",
          q: "What is the difference between React Native and Flutter?",
          a: `<p>React Native uses JavaScript or TypeScript with React and generally renders native platform UI components.</p>
<p>Flutter uses Dart and its own rendering engine to draw most of its UI through Flutter's widget system.</p>
<p>React Native is attractive to teams with React and JavaScript experience. Flutter offers greater consistency in how its widgets are rendered across platforms. Both can build high-quality cross-platform applications.</p>`,
        },
        {
          id: "rn-expo-vs-cli",
          q: "What is Expo, and how does it differ from React Native CLI?",
          a: `<p>Expo is a framework and toolchain built around React Native that simplifies development, native configuration, builds, and deployment.</p>
<p>The React Native Community CLI provides a more direct starting point for projects where developers manage native Android and iOS projects themselves.</p>
<p>Expo also supports native customization through prebuild and development builds, so it is not limited to applications that use only Expo Go.</p>`,
        },
        {
          id: "rn-expo-go",
          q: "What is Expo Go, and what are its limitations?",
          a: `<p>Expo Go is a prebuilt mobile application that lets developers run supported Expo projects on a device without creating a custom native build for every change.</p>
<p>Its main limitation is that it includes a predefined set of native modules. A third-party library that requires a custom native module not included in Expo Go generally requires a development build instead.</p>
<p>Expo Go is useful for quick prototyping and learning, while development builds are better suited to projects with custom native dependencies.</p>`,
        },
        {
          id: "rn-dev-build",
          q: "What is a development build in Expo?",
          a: `<p>A development build is a custom version of your application containing <code>expo-dev-client</code> and the native modules required by your project.</p>
<p>Unlike Expo Go, it can include custom native code and libraries. It provides a development environment for testing the application on a simulator or physical device before creating production builds.</p>`,
        },
        {
          id: "rn-managed-vs-prebuild",
          q: "What is the difference between Expo managed workflows and prebuild/native-project workflows?",
          a: `<p>In the traditional managed workflow, developers mainly work with JavaScript or TypeScript and Expo configuration without directly maintaining native project files.</p>
<p>With Expo prebuild, the <code>android</code> and <code>ios</code> directories are generated from app configuration and native project templates. Developers can then customize native code when necessary.</p>
<p>The distinction is about how native projects are managed: Expo can still provide build and deployment tooling even when native directories are present.</p>`,
        },
        {
          id: "rn-package-json",
          q: "What is the role of package.json in a React Native project?",
          a: `<p><code>package.json</code> defines project metadata, dependencies, development dependencies, and scripts.</p>
<p>For example, it lists packages such as React Native, navigation libraries, and Firebase, and provides commands to start Metro, run tests, or launch platform builds.</p>
<p>It also defines version requirements and package scripts used by developers and CI pipelines.</p>`,
        },
        {
          id: "rn-app-config",
          q: "What is the purpose of app.json or app.config.js in Expo?",
          a: `<p>These files define Expo application configuration, such as the app name, package identifiers, app icon, splash screen, permissions, plugins, and platform-specific settings.</p>
<p><code>app.json</code> uses static JSON configuration, while <code>app.config.js</code> or <code>app.config.ts</code> can generate configuration dynamically using JavaScript or TypeScript.</p>
<p>Expo uses this configuration during development, prebuild, and application builds.</p>`,
        },
        {
          id: "rn-metro",
          q: "What is Metro, and what does it do?",
          a: `<p>Metro is the JavaScript bundler used by React Native.</p>
<p>It resolves module imports, transforms source files through the configured transformer, and builds the JavaScript bundle that the application loads. During development, Metro also serves code to the application and supports Fast Refresh.</p>`,
        },
        {
          id: "rn-metro-vs-babel",
          q: "What is the difference between Metro and Babel?",
          a: `<p>Metro is the bundler: it resolves dependencies and combines the required modules into a JavaScript bundle.</p>
<p>Babel is a JavaScript compiler and transformer: it transforms source syntax and applies configured plugins.</p>
<p>In a typical React Native project, Metro uses Babel to transform JavaScript and JSX or TypeScript-related source syntax before bundling it. TypeScript type checking is a separate step.</p>`,
        },
        {
          id: "rn-run-android",
          q: "What happens when you execute npx react-native run-android?",
          a: `<p>The command starts the Android development workflow for a React Native Community CLI project.</p>
<p>Typically, it builds the Android application using Gradle, installs the APK on a connected device or running emulator, and launches the app. Metro is also started if needed so the application can load the JavaScript bundle during development.</p>
<p>The exact behavior can depend on the React Native version and project scripts.</p>`,
        },
        {
          id: "rn-expo-start",
          q: "What happens when you execute npx expo start?",
          a: `<p>The command starts the Expo development server and Metro bundler.</p>
<p>It displays connection options, such as a QR code for opening the project in Expo Go or a development build. When the application connects, Metro serves the JavaScript bundle, and Fast Refresh helps reflect code changes during development.</p>
<p>This command does not, by itself, create a production APK or IPA.</p>`,
        },
        {
          id: "rn-android-ios-dirs",
          q: "What are the purposes of the android and ios directories?",
          a: `<p>These directories contain the native platform projects.</p>
<ul>
<li><code>android/</code>: Contains Android-specific Gradle configuration, Kotlin or Java code, manifests, resources, and native integrations.</li>
<li><code>ios/</code>: Contains the Xcode project, Swift or Objective-C code, Info.plist, app resources, and native dependency configuration.</li>
</ul>
<p>They are needed when customizing native behavior, configuring platform capabilities, or integrating native modules. Expo prebuild can generate these directories from configuration.</p>`,
        },
        {
          id: "rn-js-vs-native-dep",
          q: "What is the difference between a JavaScript dependency and a native dependency?",
          a: `<p>A JavaScript dependency contains code that runs in the React Native JavaScript runtime, such as a utility library or state-management package.</p>
<p>A native dependency includes Android or iOS code, such as a library that accesses Bluetooth, the camera, or a platform-specific SDK.</p>
<p>Native dependencies may require Gradle or CocoaPods configuration and a new native build before their functionality becomes available in the application.</p>`,
        },
        {
          id: "rn-component-journey",
          q: "Explain the complete journey from writing a React Native component to displaying it on a physical device.",
          a: `<p>When I write a React Native component, the journey is broadly as follows:</p>
<ol>
<li><strong>Write code:</strong> I define components using JSX, props, state, and styles.</li>
<li><strong>Transform code:</strong> Babel transforms supported JavaScript and JSX syntax.</li>
<li><strong>Bundle modules:</strong> Metro resolves imports and creates the JavaScript bundle.</li>
<li><strong>Load the app:</strong> The native Android or iOS application starts the JavaScript runtime and loads the bundle.</li>
<li><strong>Execute React:</strong> React evaluates components and determines the UI based on their state and props.</li>
<li><strong>Render native UI:</strong> React Native's rendering system, including Fabric in modern architectures, coordinates the creation and updates of native views.</li>
<li><strong>Display on screen:</strong> Android or iOS lays out and draws the native views on the device.</li>
</ol>
<p>When state changes, React recalculates the affected UI, and React Native applies the necessary updates to the native interface.</p>`,
        },
        {
          id: "rn-props-vs-state",
          q: "What is the difference between props and state in React Native?",
          a: `<p>Props are values passed from a parent component to a child, while state is data managed inside a component.</p>
<p>For example, I might pass a user's name through props to a profile component, while using state to manage whether a modal is open. Props are read-only from the child's perspective, whereas state can be updated using a setter such as <code>setState</code> or <code>useState</code>.</p>`,
        },
        {
          id: "rn-rerender",
          q: "What causes a React Native component to re-render?",
          a: `<p>A component commonly re-renders when its state changes, its parent re-renders, or a context value it consumes changes.</p>
<p>Updates from subscribed external stores can also trigger re-renders. React then calculates the updated UI and applies necessary native UI changes. A re-render does not necessarily mean the native views will all be recreated.</p>`,
        },
        {
          id: "rn-rules-of-hooks",
          q: "What are the Rules of Hooks?",
          a: `<p>There are two main rules:</p>
<ul>
<li>Call Hooks only at the top level of function components or custom Hooks, not inside loops, conditions, or nested functions.</li>
<li>Call Hooks only from React function components or custom Hooks, not ordinary JavaScript functions.</li>
</ul>
<p>These rules ensure React can associate Hook state with the correct Hook call across renders.</p>`,
        },
        {
          id: "rn-hooks-mobile",
          q: "Explain useState, useEffect, useRef, and useReducer with mobile examples.",
          a: `<ul>
<li><strong>useState:</strong> Manages UI state, such as whether a bottom sheet is visible.</li>
<li><strong>useEffect:</strong> Synchronizes with external systems, such as subscribing to an app-state event or fetching data.</li>
<li><strong>useRef:</strong> Stores a value without triggering a re-render, such as a timer ID or a reference to a <code>TextInput</code>.</li>
<li><strong>useReducer:</strong> Manages complex related state, such as a booking flow with loading, success, and failure actions.</li>
</ul>
<p>I choose the Hook based on the type of state or behavior I need to manage.</p>`,
        },
        {
          id: "rn-useeffect-vs-uselayouteffect",
          q: "What is the difference between useEffect and useLayoutEffect?",
          a: `<p><code>useEffect</code> generally runs after the UI has been committed and the browser or rendering environment has had an opportunity to paint.</p>
<p><code>useLayoutEffect</code> runs after React commits the UI but before the browser paints, making it useful for measurements or immediate layout adjustments. In React Native, layout-related work often uses <code>onLayout</code>; <code>useLayoutEffect</code> is useful when a committed UI measurement must be acted on immediately.</p>`,
        },
        {
          id: "rn-stale-closure",
          q: "What is a stale closure, and how can it cause bugs in event handlers?",
          a: `<p>A stale closure occurs when a function uses state or props captured from an older render.</p>
<p>For example, a timer callback might continue reading an old counter value even after the counter changes. I fix this by using functional state updates, correct effect dependencies, or a ref when the latest value must be accessed without triggering a re-render.</p>`,
        },
        {
          id: "rn-memo-hooks",
          q: "What is the difference between useMemo, useCallback, and React.memo?",
          a: `<ul>
<li><strong>useMemo:</strong> Caches the result of a calculation.</li>
<li><strong>useCallback:</strong> Caches a function reference.</li>
<li><strong>React.memo:</strong> Can skip re-rendering a component when its props have not changed.</li>
</ul>
<p>In React Native, these can help optimize expensive list items or callbacks passed to memoized children. I use them when profiling shows a benefit rather than applying them everywhere.</p>`,
        },
        {
          id: "rn-prop-drilling",
          q: "What is prop drilling, and how can you avoid it?",
          a: `<p>Prop drilling means passing data through multiple intermediate components that do not need that data themselves.</p>
<p>I can avoid it using Context for broadly shared values, Redux or Zustand for complex shared state, or component composition. For example, a theme can be provided through Context instead of passing a theme prop through every screen component.</p>`,
        },
        {
          id: "rn-context",
          q: "What is the Context API, and when would you use it in a mobile application?",
          a: `<p>The Context API allows components to access shared values without passing props through every intermediate component.</p>
<p>In a React Native application, I might use it for theme preferences, authentication information, or language settings. For complex state or frequently changing data used by many screens, a dedicated store may provide better control over subscriptions and updates.</p>`,
        },
        {
          id: "rn-controlled-inputs",
          q: "What is the difference between controlled and uncontrolled inputs in React Native?",
          a: `<p>A controlled input gets its value from React state, while an uncontrolled input maintains its current value internally and can be accessed through a ref when needed.</p>
<pre><code>const [name, setName] = useState("");

&lt;TextInput
  value={name}
  onChangeText={setName}
  placeholder="Enter your name"
/&gt;</code></pre>
<p>Controlled inputs are useful for validation, conditional UI, and form submission because React maintains the current value.</p>`,
        },
        {
          id: "rn-events",
          q: "How does React Native handle events such as onPress, onChangeText, and onScroll?",
          a: `<p>React Native components expose event props that receive callbacks when users interact with the native UI.</p>
<ul>
<li><strong>onPress:</strong> Handles a press on a component such as <code>Pressable</code>.</li>
<li><strong>onChangeText:</strong> Receives the updated text from a <code>TextInput</code>.</li>
<li><strong>onScroll:</strong> Receives scroll-event information from a scrollable component.</li>
</ul>
<p>React Native connects native interactions to JavaScript callbacks through its rendering and event infrastructure. Heavy synchronous work inside these callbacks can delay responsiveness.</p>`,
        },
        {
          id: "rn-pressables",
          q: "What is the difference between TouchableOpacity, Pressable, and TouchableWithoutFeedback?",
          a: `<ul>
<li><strong>TouchableOpacity:</strong> A traditional touchable component that reduces opacity when pressed.</li>
<li><strong>Pressable:</strong> A flexible component with press-state handling and callbacks for press-in, press-out, long press, and other interactions.</li>
<li><strong>TouchableWithoutFeedback:</strong> Handles touch interactions without providing visual feedback of its own.</li>
</ul>
<p>I generally prefer <code>Pressable</code> for new implementations because it offers flexible interaction and styling. I use visual feedback and accessibility labels appropriately for interactive controls.</p>`,
        },
        {
          id: "rn-lists-difference",
          q: "What is the difference between ScrollView, FlatList, and SectionList?",
          a: `<ul>
<li><strong>ScrollView:</strong> Renders its children together, making it suitable for short content.</li>
<li><strong>FlatList:</strong> Renders list items lazily as needed, making it suitable for long or dynamic lists.</li>
<li><strong>SectionList:</strong> Provides similar list behavior with grouped sections and section headers.</li>
</ul>
<p>For a feed with many posts, I would generally choose <code>FlatList</code>; for grouped contacts, I might choose <code>SectionList</code>.</p>`,
        },
        {
          id: "rn-stable-keys",
          q: "Why should you use stable keys when rendering lists?",
          a: `<p>Stable keys help React identify which list items correspond to previous items during reconciliation.</p>
<p>They allow React to preserve the correct component instances and state when items are inserted, removed, or reordered. I prefer a unique ID from the data rather than an array index when the list can change.</p>`,
        },
        {
          id: "rn-reconciliation",
          q: "How does React reconciliation work in React Native?",
          a: `<p>Reconciliation is the process React uses to compare the previous UI description with the new one and determine what needs to change.</p>
<p>React considers element types, positions, and keys to decide which components can be updated and which need to be replaced. React Native then applies the necessary changes to native views rather than updating a browser DOM.</p>`,
        },
        {
          id: "rn-strict-mode",
          q: "What is the purpose of StrictMode during development?",
          a: `<p><code>StrictMode</code> helps identify potential bugs, such as impure rendering, missing effect cleanup, and deprecated API usage.</p>
<p>In development, React may render components and run effect setup and cleanup an extra time to reveal problems. This extra checking is development-only and does not happen in the same way in production.</p>`,
        },
        {
          id: "rn-batching",
          q: "What is batching, and how can state updates affect rendering?",
          a: `<p>Batching means React groups multiple state updates so it can process them in fewer renders.</p>
<p>For example, updating a loading flag and response data together may be processed in one render instead of separate renders. This reduces unnecessary UI work, though state updates still need to follow immutable update patterns.</p>`,
        },
        {
          id: "rn-async-event-loop",
          q: "How do Promises, async/await, and the JavaScript event loop affect mobile application behavior?",
          a: `<p>Promises and <code>async/await</code> let me handle asynchronous operations, such as API calls, without blocking JavaScript while waiting for a response.</p>
<p>The JavaScript event loop processes queued work, including promise callbacks. However, heavy synchronous calculations can still block JavaScript execution and delay event handling, animations, or updates that depend on JavaScript.</p>
<p>For expensive work, I optimize the algorithm, break up suitable tasks, or move appropriate computation to native or background execution.</p>`,
        },
        {
          id: "rn-api-race",
          q: "How do you handle asynchronous API requests and prevent race conditions in React Native?",
          a: `<p>I manage loading, success, and error states and cancel outdated requests when possible. With <code>fetch</code>, I can use <code>AbortController</code> in an effect cleanup.</p>
<p>For example, if a user changes a search query quickly, I cancel the previous request or ignore its result so an older response cannot overwrite newer results. For complex data fetching, TanStack Query can help manage caching and request lifecycles.</p>`,
        },
        {
          id: "rn-js-render-native",
          q: "How would you explain the difference between JavaScript execution, React rendering, and native UI updates?",
          a: `<p>These are three distinct stages:</p>
<ol>
<li><strong>JavaScript execution:</strong> Event handlers, calculations, API callbacks, and other JavaScript code run.</li>
<li><strong>React rendering:</strong> React evaluates components and calculates the UI required for the current props and state.</li>
<li><strong>Native UI updates:</strong> React Native's rendering system coordinates the necessary changes to Android or iOS views, which are then laid out and drawn.</li>
</ol>
<p>Keeping these stages separate helps debug performance issues. For example, a slow screen may be caused by heavy JavaScript work, expensive React rendering, or costly native layout and drawing—not necessarily by the same problem.</p>`,
        },
        {
          id: "rn-common-components",
          q: "What are the most commonly used React Native core components?",
          a: `<p>React Native provides built-in components that we use to build mobile interfaces. Unlike React.js, these components render native mobile UI instead of HTML elements.</p>
<ul>
<li><code>View</code> — container for layouts.</li>
<li><code>Text</code> — displays text.</li>
<li><code>Image</code> — displays images.</li>
<li><code>TextInput</code> — accepts user input.</li>
<li><code>Pressable</code> — handles touch interactions.</li>
<li><code>ScrollView</code> — scrollable content.</li>
<li><code>FlatList</code> — efficiently renders long lists.</li>
<li><code>SectionList</code> — renders grouped lists.</li>
<li><code>Modal</code> — displays content in an overlay.</li>
<li><code>ActivityIndicator</code> — shows a loading indicator.</li>
</ul>
<pre><code>import { View, Text, Pressable } from 'react-native';

function App() {
  return (
    &lt;View&gt;
      &lt;Text&gt;Welcome to React Native&lt;/Text&gt;
      &lt;Pressable onPress={() =&gt; console.log('Pressed')}&gt;
        &lt;Text&gt;Click Me&lt;/Text&gt;
      &lt;/Pressable&gt;
    &lt;/View&gt;
  );
}</code></pre>`,
        },
        {
          id: "rn-view-text-safearea",
          q: "What is the difference between View, Text, and SafeAreaView?",
          a: `<ul>
<li><code>View</code> acts as a container, similar to a div on the web. It supports layouts, styling, and nesting.</li>
<li><code>Text</code> displays text and supports text-specific styling and nesting.</li>
<li><code>SafeAreaView</code> is intended to keep content away from unsafe screen areas, such as notches and rounded corners. For modern React Native apps, <code>react-native-safe-area-context</code> is generally preferred because it offers more control.</li>
</ul>
<pre><code>import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  return (
    &lt;SafeAreaView style={{ flex: 1 }}&gt;
      &lt;View&gt;
        &lt;Text&gt;Hello World&lt;/Text&gt;
      &lt;/View&gt;
    &lt;/SafeAreaView&gt;
  );
}</code></pre>
<p><strong>Interview tip:</strong> <code>View</code> is for layout, <code>Text</code> is for text, and safe-area handling protects content from overlapping system UI.</p>`,
        },
        {
          id: "rn-flexbox-web",
          q: "How does Flexbox work in React Native, and how does it differ from web CSS?",
          a: `<p>Flexbox is a layout system that arranges components along a main axis and a cross axis. It helps create flexible layouts that adapt to different screen sizes.</p>
<p>Important properties include <code>flexDirection</code>, <code>justifyContent</code>, <code>alignItems</code>, <code>flexWrap</code>, and <code>gap</code>.</p>
<pre><code>&lt;View
  style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
&gt;
  &lt;Text&gt;Left&lt;/Text&gt;
  &lt;Text&gt;Right&lt;/Text&gt;
&lt;/View&gt;</code></pre>
<p>Differences from web CSS:</p>
<ul>
<li>React Native uses <code>column</code> as the default <code>flexDirection</code>; web Flexbox defaults to <code>row</code>.</li>
<li>React Native's <code>alignContent</code> and other Flexbox properties follow its own layout implementation, powered by Yoga.</li>
<li>React Native styles are JavaScript objects, so properties use camelCase, such as <code>justifyContent</code>.</li>
<li>Values such as padding and margin are generally numbers representing density-independent pixels (dp), rather than CSS strings like <code>"16px"</code>.</li>
</ul>`,
        },
        {
          id: "rn-flex-grow",
          q: "What are flex, flexGrow, flexShrink, and flexBasis?",
          a: `<p>These properties control how a component occupies space inside a flex container.</p>
<ul>
<li><strong>flex</strong> — shorthand for flexible sizing; in React Native, a positive value commonly makes a component grow to fill available space.</li>
<li><strong>flexGrow</strong> — determines how a component shares extra space.</li>
<li><strong>flexShrink</strong> — determines how a component shrinks when space is insufficient.</li>
<li><strong>flexBasis</strong> — sets the initial main-axis size before growing or shrinking.</li>
</ul>
<pre><code>&lt;View style={{ flex: 1, flexDirection: 'column' }}&gt;
  &lt;View style={{ flex: 1, backgroundColor: 'red' }} /&gt;
  &lt;View style={{ flex: 2, backgroundColor: 'blue' }} /&gt;
&lt;/View&gt;</code></pre>
<p>Here, the first child takes roughly one-third of the available height, and the second takes roughly two-thirds, assuming there are no other sizing constraints.</p>
<p><strong>Interview tip:</strong> <code>flex: 1</code> is commonly used to make a screen or container occupy all available space.</p>`,
        },
        {
          id: "rn-flex-column",
          q: "Why does React Native generally use flexDirection: 'column' by default?",
          a: `<p>Mobile interfaces are usually organized vertically: headers at the top, content in the middle, and navigation or actions near the bottom.</p>
<p>Therefore, React Native defaults to a column layout, which makes vertically stacked interfaces natural to build.</p>
<pre><code>&lt;View style={{ flexDirection: 'column' }}&gt;
  &lt;Text&gt;Header&lt;/Text&gt;
  &lt;Text&gt;Content&lt;/Text&gt;
  &lt;Text&gt;Footer&lt;/Text&gt;
&lt;/View&gt;</code></pre>
<p>On the web, Flexbox defaults to <code>row</code>, which is more suitable for horizontally arranged layouts in many web designs.</p>`,
        },
        {
          id: "rn-spacing",
          q: "What is the difference between padding, margin, gap, and position?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Property</th>
        <th>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><code>padding</code></th>
        <td>Space inside a component, between its content and border.</td>
      </tr>
      <tr>
        <th><code>margin</code></th>
        <td>Space outside a component, separating it from neighboring components.</td>
      </tr>
      <tr>
        <th><code>gap</code></th>
        <td>Space between children in a flex or grid layout.</td>
      </tr>
      <tr>
        <th><code>position</code></th>
        <td>Controls how a component is positioned, such as relative or absolute.</td>
      </tr>
    </tbody>
  </table>
</div>
<pre><code>&lt;View style={{ padding: 16, margin: 10, gap: 8 }}&gt;
  &lt;Text&gt;First item&lt;/Text&gt;
  &lt;Text&gt;Second item&lt;/Text&gt;
&lt;/View&gt;</code></pre>
<p>Here, padding adds internal space, margin adds external space, and gap separates the two text elements.</p>
<p><strong>Interview tip:</strong> Prefer <code>gap</code> for consistent spacing between children when the supported React Native version allows it.</p>`,
        },
        {
          id: "rn-positioning",
          q: "How do absolute and relative positioning work in React Native?",
          a: `<ul>
<li><code>position: 'relative'</code> keeps a component in the normal layout flow. You can offset it using properties such as <code>top</code>, <code>left</code>, <code>right</code>, or <code>bottom</code>.</li>
<li><code>position: 'absolute'</code> removes a component from the normal layout flow and positions it relative to its containing block.</li>
</ul>
<pre><code>&lt;View style={{ height: 200, position: 'relative' }}&gt;
  &lt;Text&gt;Main content&lt;/Text&gt;

  &lt;View
    style={{
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'red',
      padding: 8,
    }}
  &gt;
    &lt;Text&gt;Badge&lt;/Text&gt;
  &lt;/View&gt;
&lt;/View&gt;</code></pre>
<p>Here, the badge appears in the top-right corner of the container without taking up normal layout space.</p>
<p><strong>Real-world use cases:</strong> notification badges, image overlays, floating buttons, and loading overlays.</p>`,
        },
        {
          id: "rn-stylesheet-inline",
          q: "What is the difference between StyleSheet.create() and inline styles?",
          a: `<p>Both are valid ways to define styles in React Native.</p>
<p>Using <code>StyleSheet.create()</code>:</p>
<pre><code>import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

function App() {
  return (
    &lt;View style={styles.container}&gt;
      &lt;Text style={styles.title}&gt;Hello&lt;/Text&gt;
    &lt;/View&gt;
  );
}</code></pre>
<p>Using inline styles:</p>
<pre><code>&lt;View style={{ padding: 16, backgroundColor: 'white' }}&gt;
  &lt;Text style={{ fontSize: 20 }}&gt;Hello&lt;/Text&gt;
&lt;/View&gt;</code></pre>
<p><code>StyleSheet.create()</code> keeps styles organized, encourages reuse, and makes maintenance easier. Inline styles are useful for small or dynamic styles.</p>
<p><strong>Important:</strong> <code>StyleSheet.create()</code> does not automatically make a component faster or prevent re-renders. Use appropriate memoization only when profiling shows it is needed.</p>`,
        },
        {
          id: "rn-responsive",
          q: "How do you make a UI responsive across different screen sizes and pixel densities?",
          a: `<p>I use flexible layouts instead of relying on fixed widths and heights wherever possible.</p>
<p>Common techniques include:</p>
<ul>
<li>Flexbox for distributing available space.</li>
<li><code>Dimensions</code> or <code>useWindowDimensions()</code> for screen-size information.</li>
<li><code>minWidth</code>, <code>maxWidth</code>, and percentage-based dimensions where appropriate.</li>
<li>Scrollable containers for content that might not fit.</li>
<li>Safe-area handling and testing on different devices.</li>
<li>Font scaling and accessibility testing.</li>
</ul>
<pre><code>import { useWindowDimensions, View, Text } from 'react-native';

function ResponsiveCard() {
  const { width } = useWindowDimensions();

  return (
    &lt;View
      style={{
        width: Math.min(width - 32, 500),
        alignSelf: 'center',
        padding: 16,
      }}
    &gt;
      &lt;Text&gt;Responsive content&lt;/Text&gt;
    &lt;/View&gt;
  );
}</code></pre>
<p><code>useWindowDimensions()</code> updates when the window dimensions or font scale changes, making it preferable to reading the dimensions only once for responsive components.</p>`,
        },
        {
          id: "rn-pixel-ratio",
          q: "What are density-independent pixels, and what are PixelRatio and device dimensions used for?",
          a: `<p>Density-independent pixels (dp) are logical layout units that help UI elements appear at a reasonably consistent physical size across devices with different pixel densities.</p>
<p>React Native generally uses dp for layout dimensions rather than raw physical pixels.</p>
<ul>
<li><code>PixelRatio</code> helps convert between logical dimensions and physical pixels and can help inspect display density.</li>
<li><code>Dimensions</code> provides screen and window measurements.</li>
<li><code>useWindowDimensions()</code> provides reactive window dimensions and font scale.</li>
</ul>
<pre><code>import { PixelRatio, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const density = PixelRatio.get();

console.log('Window width:', width);
console.log('Window height:', height);
console.log('Pixel density:', density);</code></pre>
<p>For example, a 100 dp-wide element on a device with a pixel ratio of 3 corresponds to approximately 300 physical pixels.</p>
<p><strong>Interview tip:</strong> Use dp for normal UI layouts; use <code>PixelRatio</code> when working with physical-pixel measurements or image resolution requirements.</p>`,
        },
        {
          id: "rn-notches",
          q: "How do you handle notches, status bars, safe areas, and home indicators?",
          a: `<p>I use safe-area insets to prevent important content from overlapping the status bar, camera notch, rounded corners, or home indicator.</p>
<p>The <code>react-native-safe-area-context</code> library is commonly used for this.</p>
<pre><code>import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  return (
    &lt;SafeAreaView style={{ flex: 1 }}&gt;
      {/* Screen content */}
    &lt;/SafeAreaView&gt;
  );
}</code></pre>
<p>For more control, <code>useSafeAreaInsets()</code> lets you apply insets selectively.</p>
<pre><code>import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Screen() {
  const insets = useSafeAreaInsets();

  return (
    &lt;View style={{ flex: 1, paddingTop: insets.top }}&gt;
      &lt;Text&gt;Screen content&lt;/Text&gt;
    &lt;/View&gt;
  );
}</code></pre>
<p>I also configure the status bar appearance appropriately for Android and iOS and test edge-to-edge layouts on both platforms.</p>`,
        },
        {
          id: "rn-keyboard-avoid",
          q: "What is the difference between KeyboardAvoidingView, keyboard listeners, and automatically resizing the window?",
          a: `<p>These solve related but different keyboard problems.</p>
<ul>
<li><code>KeyboardAvoidingView</code> adjusts its layout or position to help keep content visible when the keyboard opens.</li>
<li>Keyboard listeners such as <code>keyboardDidShow</code> and <code>keyboardDidHide</code> let you react to keyboard visibility, for example by moving a floating button.</li>
<li>Automatic window resizing is platform behavior or configuration that changes the available window area when the keyboard appears. On Android, this can depend on the window's soft-input mode, such as <code>adjustResize</code>.</li>
</ul>
<p>Example:</p>
<pre><code>import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';

function LoginScreen() {
  return (
    &lt;KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    &gt;
      &lt;TextInput placeholder="Enter email" /&gt;
    &lt;/KeyboardAvoidingView&gt;
  );
}</code></pre>
<p><strong>Interview tip:</strong> I choose the approach based on the screen layout and platform, then test forms with the keyboard open, especially when inputs are near the bottom.</p>`,
        },
        {
          id: "rn-dismiss-keyboard",
          q: "How do you dismiss the keyboard when a user taps outside a text input?",
          a: `<p>React Native provides <code>Keyboard.dismiss()</code> to dismiss the active keyboard.</p>
<p>A simple approach is to wrap the screen with a touch handler, but the implementation must not interfere with buttons, scrolling, or text input focus.</p>
<pre><code>import {
  Keyboard,
  Pressable,
  TextInput,
  View,
} from 'react-native';

function Form() {
  return (
    &lt;Pressable
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
    &gt;
      &lt;View style={{ padding: 16 }}&gt;
        &lt;TextInput placeholder="Enter your name" /&gt;
      &lt;/View&gt;
    &lt;/Pressable&gt;
  );
}</code></pre>
<p>For more complex forms, I usually use a carefully designed touch wrapper or a scroll container with suitable keyboard-tap settings. This avoids accidental keyboard dismissal when the user interacts with form controls.</p>`,
        },
        {
          id: "rn-images",
          q: "What is the difference between Image, ImageBackground, and remote image loading?",
          a: `<ul>
<li><code>Image</code> displays an image from a local asset or remote URL.</li>
<li><code>ImageBackground</code> displays an image behind other components, such as text or buttons.</li>
<li>Remote image loading means fetching an image from a URL, which requires suitable dimensions and handling of loading or error states.</li>
</ul>
<p>Local image example:</p>
<pre><code>&lt;Image
  source={require('./assets/profile.png')}
  style={{ width: 100, height: 100 }}
/&gt;</code></pre>
<p>Remote image example:</p>
<pre><code>&lt;Image
  source={{ uri: 'https://example.com/photo.jpg' }}
  style={{ width: 200, height: 150 }}
  resizeMode="cover"
/&gt;</code></pre>
<p>Background image example:</p>
<pre><code>&lt;ImageBackground
  source={require('./assets/banner.png')}
  style={{ height: 200, justifyContent: 'center', padding: 16 }}
&gt;
  &lt;Text style={{ color: 'white' }}&gt;Welcome&lt;/Text&gt;
&lt;/ImageBackground&gt;</code></pre>
<p>For production apps, I also consider placeholders, failed requests, caching, image optimization, and accessibility labels.</p>`,
        },
        {
          id: "rn-refresh-infinite",
          q: "How do you implement pull-to-refresh and infinite scrolling?",
          a: `<p>They are two different list interactions.</p>
<ul>
<li><strong>Pull-to-refresh:</strong> The user pulls down to fetch fresh data from the beginning.</li>
<li><strong>Infinite scrolling:</strong> The app fetches the next page when the user approaches the end of the current list.</li>
</ul>
<p>In <code>FlatList</code>, pull-to-refresh uses <code>refreshing</code> and <code>onRefresh</code>. Infinite scrolling commonly uses <code>onEndReached</code>.</p>
<pre><code>&lt;FlatList
  data={items}
  renderItem={({ item }) =&gt; &lt;Text&gt;{item.title}&lt;/Text&gt;}
  keyExtractor={(item) =&gt; item.id}
  refreshing={refreshing}
  onRefresh={refreshData}
  onEndReached={loadNextPage}
  onEndReachedThreshold={0.5}
/&gt;</code></pre>
<p>For production, I track loading and pagination state separately, prevent duplicate requests, handle errors, and stop fetching when there are no more pages.</p>`,
        },
        {
          id: "rn-refresh-control",
          q: "How do you use RefreshControl with FlatList?",
          a: `<p><code>RefreshControl</code> provides a customizable pull-to-refresh indicator. It is often supplied through the <code>refreshControl</code> prop of <code>FlatList</code>.</p>
<pre><code>import { useState } from 'react';
import { FlatList, RefreshControl, Text } from 'react-native';

function ItemsScreen({ items, fetchItems }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () =&gt; {
    setRefreshing(true);

    try {
      await fetchItems();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    &lt;FlatList
      data={items}
      keyExtractor={(item) =&gt; item.id}
      renderItem={({ item }) =&gt; &lt;Text&gt;{item.title}&lt;/Text&gt;}
      refreshControl={
        &lt;RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        /&gt;
      }
    /&gt;
  );
}</code></pre>
<p>The <code>refreshing</code> prop is controlled, so I always reset it after the request finishes, including when the request fails.</p>
<p><strong>Note:</strong> <code>FlatList</code> also supports the simpler <code>refreshing</code> and <code>onRefresh</code> props directly.</p>`,
        },
        {
          id: "rn-modal-sheet",
          q: "What is the difference between Modal, a navigation screen, and a bottom sheet?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Modal</th>
        <th>Navigation screen</th>
        <th>Bottom sheet</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Purpose</th>
        <td>Temporary overlay</td>
        <td>Full screen or route in navigation flow</td>
        <td>Contextual content from the bottom</td>
      </tr>
      <tr>
        <th>Typical use</th>
        <td>Confirmation dialog, quick form</td>
        <td>Profile, details, settings</td>
        <td>Filters, action menu, selectable options</td>
      </tr>
      <tr>
        <th>Navigation history</th>
        <td>Usually managed separately</td>
        <td>Managed by the navigator</td>
        <td>Depends on its implementation</td>
      </tr>
      <tr>
        <th>Interaction</th>
        <td>Often blocks background interaction</td>
        <td>Usually replaces or stacks screens</td>
        <td>Often supports drag and snap points</td>
      </tr>
    </tbody>
  </table>
</div>
<p>A <code>Modal</code> is built into React Native. Navigation screens are typically managed using a navigation library, and bottom sheets often use a dedicated library or custom implementation.</p>
<p><strong>Interview tip:</strong> I choose based on the user experience, navigation requirements, and whether the content should behave like a temporary overlay or a full destination.</p>`,
        },
        {
          id: "rn-platform-select",
          q: "What is the purpose of Platform.OS, Platform.select(), and platform-specific file extensions?",
          a: `<p>These allow me to handle Android and iOS differences cleanly.</p>
<p><code>Platform.OS</code> identifies the current platform.</p>
<pre><code>import { Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';</code></pre>
<p><code>Platform.select()</code> chooses a value based on the platform.</p>
<pre><code>const styles = {
  elevation: Platform.select({
    android: 4,
    ios: 0,
    default: 0,
  }),
};</code></pre>
<p>Platform-specific files allow the bundler to select the correct implementation.</p>
<pre><code>Button.ios.tsx
Button.android.tsx
Button.tsx</code></pre>
<p>When importing <code>./Button</code>, React Native resolves the platform-specific file when available, with the generic file acting as a fallback.</p>
<p>I use platform-specific code only when necessary, keeping shared business logic common across platforms.</p>`,
        },
        {
          id: "rn-platform-differences",
          q: "How do you handle Android and iOS differences in fonts, shadows, elevation, and touch behavior?",
          a: `<p>I use shared styles for common UI and platform-specific styles where behavior or appearance differs.</p>
<ul>
<li><strong>Fonts:</strong> Font rendering, available font weights, and line heights can differ. I test typography on actual devices.</li>
<li><strong>Shadows:</strong> iOS supports properties such as <code>shadowColor</code>, <code>shadowOffset</code>, <code>shadowOpacity</code>, and <code>shadowRadius</code>. Android commonly uses <code>elevation</code> for native shadows.</li>
<li><strong>Touch behavior:</strong> <code>Pressable</code> provides a consistent starting point, but ripple feedback, hit areas, and interaction details may need platform-specific adjustments.</li>
<li><strong>Status bar and system UI:</strong> These need platform-aware configuration and testing.</li>
</ul>
<pre><code>import { Platform } from 'react-native';

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: 12,
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),
};</code></pre>
<p><strong>Interview tip:</strong> I test both platforms rather than assuming the same style values will produce identical results.</p>`,
        },
        {
          id: "rn-a11y",
          q: "How do you make React Native interfaces accessible to screen readers and users with motor or visual impairments?",
          a: `<p>I build accessibility into components from the beginning, not just at the end of development.</p>
<p>Key practices include:</p>
<ul>
<li>Use <code>accessibilityLabel</code> to describe controls clearly.</li>
<li>Use <code>accessibilityRole</code> to identify buttons, links, and other interactive elements.</li>
<li>Use <code>accessibilityHint</code> when an action needs additional explanation.</li>
<li>Ensure touch targets are large enough and adequately spaced.</li>
<li>Maintain readable contrast and support font scaling.</li>
<li>Provide visible focus and pressed states where appropriate.</li>
<li>Avoid communicating important information through color alone.</li>
<li>Test with VoiceOver on iOS and TalkBack on Android.</li>
</ul>
<pre><code>import { Pressable, Text } from 'react-native';

&lt;Pressable
  accessibilityRole="button"
  accessibilityLabel="Save profile"
  accessibilityHint="Saves your profile changes"
  onPress={saveProfile}
&gt;
  &lt;Text&gt;Save&lt;/Text&gt;
&lt;/Pressable&gt;</code></pre>
<p><strong>Interview-ready answer:</strong> “I use React Native accessibility props, readable contrast, scalable text, sufficiently large touch targets, and platform screen readers like VoiceOver and TalkBack. I also test real interactions to ensure the interface is usable without relying only on sight or precise touch.”</p>`,
        },
        {
          id: "rn-react-navigation",
          q: "What is React Navigation, and how does it work?",
          a: `<p>React Navigation is a popular library used to manage navigation between screens in React Native applications. It maintains a navigation state containing the current route and navigation history, allowing users to move between screens.</p>
<p>It provides navigators such as Stack, Bottom Tabs, and Drawer.</p>
<pre><code>import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    &lt;NavigationContainer&gt;
      &lt;Stack.Navigator&gt;
        &lt;Stack.Screen name="Home" component={HomeScreen} /&gt;
        &lt;Stack.Screen name="Profile" component={ProfileScreen} /&gt;
      &lt;/Stack.Navigator&gt;
    &lt;/NavigationContainer&gt;
  );
}</code></pre>
<p>When the user navigates from Home to Profile, React Navigation updates the navigation state and displays the appropriate screen.</p>
<p><strong>Interview tip:</strong> <code>NavigationContainer</code> manages the navigation tree, while navigators manage routes and their transitions.</p>`,
        },
        {
          id: "rn-navigator-types",
          q: "What is the difference between Stack, Tab, and Drawer navigators?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Navigator</th>
        <th>How it works</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Stack Navigator</th>
        <td>Screens are pushed onto or removed from a navigation stack. Commonly used for flows such as Home → Product Details → Checkout.</td>
      </tr>
      <tr>
        <th>Tab Navigator</th>
        <td>Provides tabs for switching between major sections, such as Home, Search, and Profile.</td>
      </tr>
      <tr>
        <th>Drawer Navigator</th>
        <td>Provides a side menu that opens to reveal navigation options, such as Settings, Help, and Logout.</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>Interview tip:</strong> An app can combine all three. For example, a Tab Navigator can contain a Stack Navigator for navigating from a product list to product details.</p>`,
        },
        {
          id: "rn-nav-methods",
          q: "What is the difference between navigate, push, replace, goBack, and reset?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><code>navigate('Profile')</code></th>
        <td>Navigate to a route; behavior depends on the navigator and existing route state.</td>
      </tr>
      <tr>
        <th><code>push('Profile')</code></th>
        <td>Push a new instance of a screen onto a stack.</td>
      </tr>
      <tr>
        <th><code>replace('Profile')</code></th>
        <td>Replace the current stack screen with another screen.</td>
      </tr>
      <tr>
        <th><code>goBack()</code></th>
        <td>Return to the previous navigation entry when possible.</td>
      </tr>
      <tr>
        <th><code>reset(...)</code></th>
        <td>Replace the navigation state with a new route history.</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Example:</p>
<pre><code>navigation.navigate('Profile');
navigation.push('Profile');
navigation.replace('Home');
navigation.goBack();</code></pre>
<p>A reset example:</p>
<pre><code>navigation.reset({
  index: 0,
  routes: [{ name: 'Home' }],
});</code></pre>
<p>This leaves Home as the only route in the reset navigation state.</p>
<p><strong>Real-world use case:</strong> After successful login, you may reset the navigation state so pressing Back does not return the user to the login screen.</p>
<p><strong>Important:</strong> <code>navigate</code> and <code>push</code> are not interchangeable. If you need another instance of the same screen, <code>push</code> is the clearer choice.</p>`,
        },
        {
          id: "rn-nested-navigators",
          q: "What are nested navigators, and how do you pass navigation actions between them?",
          a: `<p>Nested navigators occur when one navigator is placed inside another. For example, a Tab Navigator may contain a Stack Navigator for each tab.</p>
<pre><code>NavigationContainer
└── BottomTabNavigator
    ├── HomeTab
    │   └── HomeStack
    │       ├── Home
    │       └── ProductDetails
    └── ProfileTab
        └── ProfileStack
            ├── Profile
            └── EditProfile</code></pre>
<p>If a screen needs to navigate to a route inside a parent or nested navigator, you can target the nested route by name.</p>
<pre><code>navigation.navigate('ProfileTab', {
  screen: 'EditProfile',
  params: { userId: '123' },
});</code></pre>
<p>This assumes the parent route is named <code>ProfileTab</code> and its nested screen is named <code>EditProfile</code>.</p>
<p><strong>Interview tip:</strong> A screen's navigation object normally targets its own navigator and can access parent navigators when needed. Keep route names clear to avoid confusion between nested routes with similar names.</p>`,
        },
        {
          id: "rn-pass-params",
          q: "How do you pass parameters between screens?",
          a: `<p>Pass parameters as the second argument to <code>navigate</code> or <code>push</code>, and read them from <code>route.params</code>.</p>
<pre><code>// HomeScreen.js
navigation.navigate('Details', {
  productId: '101',
  productName: 'Helmet',
});</code></pre>
<p>Read them in the destination:</p>
<pre><code>function DetailsScreen({ route }) {
  const { productId, productName } = route.params;

  return (
    &lt;Text&gt;
      {productName} - {productId}
    &lt;/Text&gt;
  );
}</code></pre>
<p>You can also define route parameter types in TypeScript to catch invalid route names or parameter shapes during development.</p>
<p><strong>Best practice:</strong> Pass identifiers and small navigation-specific values. Fetch full records from your data layer when appropriate rather than passing large objects between screens.</p>`,
        },
        {
          id: "rn-params-vs-global",
          q: "How do you distinguish route parameters from global application state?",
          a: `<p>Route parameters describe the specific navigation destination. Global state stores data that multiple parts of the application need to access or update.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Route parameters</th>
        <th>Global state</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Selected product ID</td>
        <td>Logged-in user</td>
      </tr>
      <tr>
        <td>Booking ID for a details screen</td>
        <td>Shared cart</td>
      </tr>
      <tr>
        <td>Search query for a results screen</td>
        <td>App-wide preferences</td>
      </tr>
      <tr>
        <td>Selected item or filter for a route</td>
        <td>Shared booking data used by multiple screens</td>
      </tr>
    </tbody>
  </table>
</div>
<p>For example, <code>bookingId</code> can be passed through navigation, while booking details are fetched and stored in an appropriate data layer.</p>
<p>Global state may be managed with Redux Toolkit, Zustand, or Context. Server data may be better handled by a library such as TanStack Query.</p>
<p><strong>Interview tip:</strong> Don't put everything in Redux. Keep navigation-specific information in route params, local UI state in components, and genuinely shared state in the appropriate store.</p>`,
        },
        {
          id: "rn-protected-nav",
          q: "How do you implement authentication-based protected navigation?",
          a: `<p>The usual approach is to maintain an authentication state and render the appropriate navigator depending on whether the user is authenticated.</p>
<pre><code>function RootNavigator({ isLoggedIn }) {
  return (
    &lt;NavigationContainer&gt;
      &lt;Stack.Navigator&gt;
        {isLoggedIn ? (
          &lt;Stack.Screen
            name="Home"
            component={HomeScreen}
          /&gt;
        ) : (
          &lt;Stack.Screen
            name="Login"
            component={LoginScreen}
          /&gt;
        )}
      &lt;/Stack.Navigator&gt;
    &lt;/NavigationContainer&gt;
  );
}</code></pre>
<p>When authentication changes, React renders the appropriate route tree.</p>
<p>In production, I would:</p>
<ul>
<li>Restore the authentication session securely at startup.</li>
<li>Show a loading screen while checking the session.</li>
<li>Handle expired tokens and logout.</li>
<li>Avoid manually navigating to protected screens when the route tree already controls access.</li>
<li>Enforce authorization on the backend too.</li>
</ul>
<p><strong>Important:</strong> Hiding a screen in the client is not a security boundary. Backend APIs must validate permissions independently.</p>`,
        },
        {
          id: "rn-deep-link",
          q: "What is deep linking, and how do you configure it in React Native?",
          a: `<p>Deep linking allows a URL to open a particular screen in a mobile application.</p>
<p>For example:</p>
<pre><code>myapp://products/101</code></pre>
<p>This could open the product details screen for product 101.</p>
<p>React Navigation supports linking configuration:</p>
<pre><code>const linking = {
  prefixes: ['myapp://', 'https://example.com'],
  config: {
    screens: {
      Home: '',
      ProductDetails: 'products/:productId',
    },
  },
};

&lt;NavigationContainer linking={linking}&gt;
  {/* Navigators */}
&lt;/NavigationContainer&gt;</code></pre>
<p>You also need the appropriate platform configuration, such as URL schemes in iOS and intent filters in Android. For web URLs, associated-domain verification may be needed.</p>
<p><strong>Interview tip:</strong> Test cold starts, warm starts, nested routes, invalid links, and links received before authentication is restored.</p>`,
        },
        {
          id: "rn-universal-links",
          q: "What is the difference between deep links and Universal Links or Android App Links?",
          a: `<p>A deep link is the general concept of opening a specific destination in an app. A custom URL scheme and a verified HTTPS link can both serve as deep links.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Example</th>
        <th>Main characteristic</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Custom scheme</th>
        <td><code>myapp://products/101</code></td>
        <td>Uses an app-specific scheme.</td>
      </tr>
      <tr>
        <th>iOS Universal Link</th>
        <td><code>https://example.com/products/101</code></td>
        <td>Uses verified domain association to open the iOS app.</td>
      </tr>
      <tr>
        <th>Android App Link</th>
        <td><code>https://example.com/products/101</code></td>
        <td>Uses verified domain association to open the Android app.</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Universal Links and Android App Links offer a trusted HTTPS-based connection between a website and an app. When the app is unavailable, the website can provide a fallback experience.</p>
<p><strong>Interview tip:</strong> Custom schemes are useful for app-to-app navigation, while verified HTTPS links are usually preferable for links shared through email, messages, and websites.</p>`,
        },
        {
          id: "rn-notification-open",
          q: "How do you handle a notification that opens a specific screen when the app is closed?",
          a: `<p>I handle the notification's navigation data and account for the app's startup lifecycle.</p>
<p>A typical flow is:</p>
<ol>
<li>Receive a notification containing data such as <code>type</code> and <code>bookingId</code>.</li>
<li>When the user taps it, read the notification's initial-launch information.</li>
<li>Restore authentication and initialize navigation.</li>
<li>Navigate to the intended screen once the navigation container is ready.</li>
<li>Fetch the relevant data and handle invalid or expired destinations.</li>
</ol>
<p>For example, the notification might contain:</p>
<pre><code>{
  type: 'booking',
  bookingId: 'BK101'
}</code></pre>
<p>Then the app can navigate to:</p>
<pre><code>navigation.navigate('BookingDetails', {
  bookingId: 'BK101',
});</code></pre>
<p>Libraries such as Firebase Cloud Messaging or Notifee can provide notification interaction APIs, depending on the app setup.</p>
<p><strong>Important:</strong> Handle both the initial notification that launches the app and notification taps received while the app is already running. Avoid navigating before the navigation container is ready.</p>`,
        },
        {
          id: "rn-app-lifecycle",
          q: "What is the difference between foreground, background, and killed application states?",
          a: `<ul>
<li><strong>Foreground:</strong> The app is active and visible to the user.</li>
<li><strong>Background:</strong> The app is not currently visible, but the operating system may keep its process alive.</li>
<li><strong>Killed/terminated:</strong> The app process has ended, either because the user closed it or the operating system terminated it.</li>
</ul>
<p>These states affect notification handling, timers, network activity, and state restoration.</p>
<p>For example, an app may receive a notification while in the background and navigate when the user taps it. If the app was terminated, it must initialize again and process the initial notification.</p>
<p><strong>Interview tip:</strong> Background does not guarantee that JavaScript continues running. The operating system controls background execution, and the exact behavior differs between Android and iOS.</p>`,
        },
        {
          id: "rn-app-state",
          q: "What is AppState, and when would you use it?",
          a: `<p><code>AppState</code> is a React Native API that reports whether the app is active, inactive, or in the background.</p>
<p>Common use cases include pausing video playback, refreshing data when the user returns, and tracking app foreground/background transitions.</p>
<pre><code>import { AppState } from 'react-native';
import { useEffect } from 'react';

function useAppStateLogger() {
  useEffect(() =&gt; {
    const subscription = AppState.addEventListener(
      'change',
      (nextState) =&gt; {
        console.log('App state:', nextState);
      }
    );

    return () =&gt; subscription.remove();
  }, []);
}</code></pre>
<p>On Android, <code>AppState</code> can also report the <code>focus</code> and <code>blur</code> events, which are distinct from the overall app state.</p>
<p><strong>Important:</strong> <code>AppState</code> reports lifecycle changes; it does not guarantee that a background task will continue running.</p>`,
        },
        {
          id: "rn-hardware-back",
          q: "How do you handle Android's hardware Back button?",
          a: `<p>React Navigation handles Android Back behavior for its supported navigators by default. If the app has custom behavior, use React Native's <code>BackHandler</code>.</p>
<pre><code>import { BackHandler } from 'react-native';
import { useEffect } from 'react';

function Screen() {
  useEffect(() =&gt; {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () =&gt; {
        // Return true only when custom code handles Back.
        // Return false to allow the default behavior.
        return false;
      }
    );

    return () =&gt; subscription.remove();
  }, []);

  return null;
}</code></pre>
<p>In this example, returning <code>false</code> lets the default navigation behavior proceed. Returning <code>true</code> consumes the event.</p>
<p><strong>Best practice:</strong> Don't override Back globally without a strong reason. Use custom handling for cases such as unsaved forms, open drawers, or confirmation dialogs, and remove listeners when the screen unmounts.</p>`,
        },
        {
          id: "rn-restore-navigation",
          q: "How do you preserve or restore navigation state after an application restarts?",
          a: `<p>React Navigation can serialize its navigation state and restore it later. This can preserve the user's previous route history after a restart.</p>
<p>A typical implementation is:</p>
<ol>
<li>Load the previously saved navigation state.</li>
<li>Pass it to <code>NavigationContainer</code> through <code>initialState</code>.</li>
<li>Listen for state changes and save the latest state.</li>
<li>Validate or discard the saved state when the app version or authentication status changes.</li>
</ol>
<pre><code>&lt;NavigationContainer
  initialState={initialNavigationState}
  onStateChange={(state) =&gt; {
    saveNavigationState(state);
  }}
&gt;
  {/* Navigators */}
&lt;/NavigationContainer&gt;</code></pre>
<p>This is a conceptual example; loading and saving need to be implemented using suitable persistent storage.</p>
<p><strong>Important:</strong> Don't restore a protected screen before authentication has been checked. Navigation-state persistence is also different from persisting business data such as a booking or cart.</p>`,
        },
        {
          id: "rn-debug-back",
          q: "How would you debug a navigation flow where pressing Back takes the user to the wrong screen?",
          a: `<p>I would inspect the navigation history and identify which action added, replaced, or reset the route.</p>
<p>For example, suppose the booking flow is:</p>
<p>Payment → Location → Slot → Confirmation</p>
<p>If Back from Location unexpectedly returns to Payment after the user selected a new address, I would check whether the code is using <code>navigate</code>, <code>push</code>, <code>replace</code>, or <code>reset</code> correctly.</p>
<p>My debugging process would be:</p>
<ol>
<li>Reproduce the exact sequence of screens.</li>
<li>Log navigation state changes or inspect them with React Navigation's development tools.</li>
<li>Check for duplicate route instances or incorrect nested navigator targets.</li>
<li>Review every navigation action, especially <code>replace</code>, <code>goBack</code>, and <code>reset</code>.</li>
<li>Confirm that Android hardware Back and any custom Back handlers behave consistently.</li>
<li>Test the complete flow again, including reopening the app if state persistence is involved.</li>
</ol>
<p>For example, if the address-selection screen should replace the current location screen rather than add another copy:</p>
<pre><code>navigation.replace('SelectLocation', {
  addressId: 'ADDR101',
});</code></pre>
<p><strong>Interview-ready answer:</strong> “I debug Back-navigation issues by inspecting the navigation state and tracing the actions that modify the stack. I then fix the incorrect navigation action or nested route target instead of adding more Back handlers as a workaround.”</p>`,
        },
        {
          id: "rn-choose-state",
          q: "When should you use local component state, Context, Redux Toolkit, or Zustand?",
          a: `<p>I choose a state-management solution based on how widely the data is shared, how complex the updates are, and how much infrastructure the app needs.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Solution</th>
        <th>Best use case</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Local state (<code>useState</code>)</th>
        <td>Data used by one component</td>
        <td>Input value, modal visibility</td>
      </tr>
      <tr>
        <th>Context API</th>
        <td>Shared values needed across a component tree</td>
        <td>Theme, language, authenticated user context</td>
      </tr>
      <tr>
        <th>Redux Toolkit</th>
        <td>Complex shared state with predictable updates and debugging needs</td>
        <td>Booking flow, cart, multi-feature app state</td>
      </tr>
      <tr>
        <th>Zustand</th>
        <td>Shared state with a lightweight API and minimal boilerplate</td>
        <td>Selected vehicle, simple global filters</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Example of local state:</p>
<pre><code>const [isVisible, setIsVisible] = useState(false);</code></pre>
<p>Example of Context:</p>
<pre><code>const ThemeContext = createContext();</code></pre>
<p><strong>Interview tip:</strong> I don't put every state variable into Redux. Local UI state stays local, shared client state goes into an appropriate store, and server data may be better managed with TanStack Query.</p>`,
        },
        {
          id: "rn-redux-flow",
          q: "How does Redux data flow work in a React Native application?",
          a: `<p>Redux follows a predictable, unidirectional data flow. A component dispatches an action, a reducer calculates the next state, and subscribed components receive the updated state.</p>
<pre><code>Component
User taps a button

Dispatch action
dispatch(addItem())

Reducer updates state
Creates the next state

Store updates → UI re-renders
Components read state using selectors</code></pre>
<p>Example:</p>
<pre><code>const count = useSelector((state) =&gt; state.counter.value);
const dispatch = useDispatch();

&lt;Button
  title="Increment"
  onPress={() =&gt; dispatch(increment())}
/&gt;</code></pre>
<p>Redux Toolkit uses Immer internally, allowing reducer code to look like it mutates state while safely producing an immutable update.</p>`,
        },
        {
          id: "rn-rtk-apis",
          q: "What are Redux Toolkit's configureStore, createSlice, and createAsyncThunk?",
          a: `<p>These are three important Redux Toolkit APIs.</p>
<ul>
<li><code>configureStore</code> creates the Redux store and configures useful defaults, including middleware and development checks.</li>
<li><code>createSlice</code> defines a state section, its reducers, and automatically generated action creators.</li>
<li><code>createAsyncThunk</code> handles asynchronous operations such as API requests and generates pending, fulfilled, and rejected actions.</li>
</ul>
<p>Example:</p>
<pre><code>import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) =&gt; {
    const response = await fetch(
      \`https://example.com/users/\${userId}\`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =&gt; {
    builder
      .addCase(fetchUser.pending, (state) =&gt; {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) =&gt; {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) =&gt; {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});</code></pre>
<p><strong>Interview tip:</strong> <code>createAsyncThunk</code> manages the lifecycle of an async operation, but it does not automatically provide the full caching and invalidation features of a server-state library.</p>`,
        },
        {
          id: "rn-request-states",
          q: "How do you handle loading, success, empty, and error states for API requests?",
          a: `<p>I handle each API request with four possible UI states so the user always understands what is happening.</p>
<ul>
<li><strong>Loading:</strong> Show a spinner or skeleton.</li>
<li><strong>Success:</strong> Display the fetched data.</li>
<li><strong>Empty:</strong> Show a message when the request succeeds but returns no records.</li>
<li><strong>Error:</strong> Show an understandable error message and provide a retry option.</li>
</ul>
<pre><code>if (isLoading) {
  return &lt;ActivityIndicator /&gt;;
}

if (error) {
  return (
    &lt;Button title="Retry" onPress={refetch} /&gt;
  );
}

if (!data?.length) {
  return &lt;Text&gt;No items found.&lt;/Text&gt;;
}

return &lt;FlatList data={data} renderItem={renderItem} /&gt;;</code></pre>
<p>This is a simplified example; the variables and retry function depend on the API library being used.</p>
<p><strong>Important:</strong> An empty result is not an API error. Also, distinguish an initial loading state from a background refresh so existing data doesn't disappear unnecessarily.</p>`,
        },
        {
          id: "rn-client-server-state",
          q: "What is the difference between client state and server state?",
          a: `<p>Client state belongs to the app's interface or local interactions. Server state originates from a backend and can change independently of the current device.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Client state</th>
        <th>Server state</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Modal open or closed</td>
        <td>User profile fetched from an API</td>
      </tr>
      <tr>
        <td>Selected tab</td>
        <td>Booking details</td>
      </tr>
      <tr>
        <td>Form input before submission</td>
        <td>Product catalogue</td>
      </tr>
      <tr>
        <td>Temporary UI filters</td>
        <td>Order history</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Client state is commonly managed with <code>useState</code>, Context, Redux Toolkit, or Zustand. Server state can be managed with TanStack Query or, depending on the architecture, Redux Toolkit.</p>
<p><strong>Interview tip:</strong> Server state needs additional handling for caching, stale data, refetching, request errors, and synchronization with the backend.</p>`,
        },
        {
          id: "rn-tanstack-query",
          q: "What is TanStack Query, and why might you use it instead of managing every request in Redux?",
          a: `<p>TanStack Query is a library for managing asynchronous server state. It handles fetching, caching, request deduplication, retries, refetching, and mutations.</p>
<p>Without a server-state library, I may need to write Redux reducers for loading, success, errors, cache updates, and request deduplication for every API feature.</p>
<p>With TanStack Query:</p>
<pre><code>import { useQuery } from '@tanstack/react-query';

function UserScreen({ userId }) {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () =&gt; {
      const response = await fetch(
        \`https://example.com/users/\${userId}\`
      );

      if (!response.ok) {
        throw new Error('Failed to load user');
      }

      return response.json();
    },
  });

  if (isPending) return &lt;ActivityIndicator /&gt;;
  if (isError) {
    return &lt;Button title="Retry" onPress={refetch} /&gt;;
  }

  return &lt;Text&gt;{data.name}&lt;/Text&gt;;
}</code></pre>
<p><strong>When I choose it:</strong> For API-driven screens such as feeds, profiles, product lists, and booking details, TanStack Query can significantly reduce boilerplate.</p>
<p>Redux Toolkit remains useful for shared client state, and both libraries can be used together.</p>`,
        },
        {
          id: "rn-cache-refetch",
          q: "How do caching, invalidation, retries, and background refetching work?",
          a: `<p>These features help keep server data efficient and reasonably fresh.</p>
<ul>
<li><strong>Caching:</strong> Stores fetched results under a query key so they can be reused.</li>
<li><strong>Invalidation:</strong> Marks cached data as stale, allowing it to be refreshed when appropriate.</li>
<li><strong>Retries:</strong> Repeats failed requests according to configured retry rules.</li>
<li><strong>Background refetching:</strong> Refreshes stale data while the user may continue viewing existing results.</li>
</ul>
<p>Example:</p>
<pre><code>const queryClient = useQueryClient();

const { data } = useQuery({
  queryKey: ['bookings'],
  queryFn: fetchBookings,
  staleTime: 30_000,
});

await queryClient.invalidateQueries({
  queryKey: ['bookings'],
});</code></pre>
<p>Here, the query is considered fresh for 30 seconds. Invalidating the bookings query marks it stale and can trigger a refetch if the query is active.</p>
<p><strong>Interview tip:</strong> A cache does not mean data is permanently fresh. Configure freshness, retention, retries, and invalidation based on the data's importance and update frequency.</p>`,
        },
        {
          id: "rn-infinite-query",
          q: "How do you implement pagination and infinite scrolling with an API?",
          a: `<p>Pagination loads a large dataset in smaller batches instead of downloading everything at once.</p>
<p>Two common approaches are:</p>
<ul>
<li><strong>Page-based:</strong> Request page 1, page 2, and so on.</li>
<li><strong>Cursor-based:</strong> Request the next batch using a cursor returned by the backend.</li>
</ul>
<p>With TanStack Query, <code>useInfiniteQuery</code> is designed for this use case:</p>
<pre><code>const query = useInfiniteQuery({
  queryKey: ['posts'],
  initialPageParam: 1,
  queryFn: ({ pageParam }) =&gt; fetchPosts(pageParam),
  getNextPageParam: (lastPage) =&gt;
    lastPage.nextPage ?? undefined,
});</code></pre>
<p>Then connect it to <code>FlatList</code>:</p>
<pre><code>&lt;FlatList
  data={query.data?.pages.flatMap((page) =&gt; page.items) ?? []}
  renderItem={renderPost}
  keyExtractor={(item) =&gt; item.id}
  onEndReached={() =&gt; {
    if (query.hasNextPage &amp;&amp; !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }}
  onEndReachedThreshold={0.5}
/&gt;</code></pre>
<p><strong>Production considerations:</strong> Prevent duplicate page requests, handle failed pages, stop when no next page exists, and use stable item keys.</p>`,
        },
        {
          id: "rn-dedupe-requests",
          q: "How do you prevent duplicate API requests when a screen re-renders or regains focus?",
          a: `<p>I first identify why the duplicate requests occur. A re-render alone should not automatically cause an API request unless the request is triggered by render-time code, an effect, or another changing dependency.</p>
<p>My usual solutions are:</p>
<ol>
<li>Keep API calls out of the component's render body.</li>
<li>Use correct <code>useEffect</code> dependencies.</li>
<li>Use TanStack Query or another caching layer to deduplicate requests.</li>
<li>Avoid triggering the same fetch from multiple focus and mount handlers.</li>
<li>Guard pagination requests with loading and next-page checks.</li>
</ol>
<p>For example, TanStack Query reuses an existing query for the same key and can deduplicate concurrent requests.</p>
<pre><code>useQuery({
  queryKey: ['booking', bookingId],
  queryFn: () =&gt; fetchBooking(bookingId),
});</code></pre>
<p><strong>Important:</strong> A query key must include all variables that change the requested data. Otherwise, unrelated requests may incorrectly share cached results.</p>`,
        },
        {
          id: "rn-abort-request",
          q: "How do you cancel requests when a user navigates away from a screen?",
          a: `<p>I use <code>AbortController</code> when the underlying request supports cancellation. This can prevent unnecessary network work and stale responses.</p>
<pre><code>useEffect(() =&gt; {
  const controller = new AbortController();

  async function loadData() {
    try {
      const response = await fetch(url, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error);
      }
    }
  }

  loadData();

  return () =&gt; controller.abort();
}, [url]);</code></pre>
<p>The cleanup runs when the effect is replaced or the component unmounts.</p>
<p><strong>Important:</strong> A screen may remain mounted when another screen is pushed on top of it. If the request should be cancelled specifically when the screen loses focus, use navigation focus effects or another explicit cancellation policy.</p>
<p>With TanStack Query, I can also use the supplied <code>signal</code> in the query function so cancellation works with the query lifecycle.</p>`,
        },
        {
          id: "rn-offline-first",
          q: "How would you implement an offline-first mobile application?",
          a: `<p>An offline-first app lets users read useful data and, where appropriate, make changes even without an internet connection.</p>
<p>My approach would be:</p>
<ol>
<li>Store important data locally in SQLite or another suitable persistent store.</li>
<li>Display cached data immediately when opening a screen.</li>
<li>Save offline changes as pending operations in a local queue.</li>
<li>Detect connectivity changes and attempt synchronization.</li>
<li>Track operation status, retry transient failures, and handle conflicts.</li>
<li>Show users whether changes are pending, synchronized, or failed.</li>
</ol>
<p>For example, in a booking application, a user could save a draft while offline and submit it when connectivity returns.</p>
<p><strong>Important:</strong> Connectivity detection does not guarantee the backend is reachable. For operations such as booking or payment, the backend must validate the operation and prevent duplicates.</p>`,
        },
        {
          id: "rn-optimistic-update",
          q: "What is optimistic updating, and how do you roll it back if a request fails?",
          a: `<p>Optimistic updating means updating the UI before the server confirms the operation, making the app feel more responsive.</p>
<p>For example, when a user likes a post, I can immediately show the liked state while sending the API request in the background.</p>
<p>With TanStack Query:</p>
<pre><code>const mutation = useMutation({
  mutationFn: likePost,
  onMutate: async (postId) =&gt; {
    await queryClient.cancelQueries({
      queryKey: ['posts'],
    });

    const previousPosts = queryClient.getQueryData(['posts']);

    queryClient.setQueryData(['posts'], (posts) =&gt;
      updatePostLike(posts, postId, true)
    );

    return { previousPosts };
  },
  onError: (_error, _postId, context) =&gt; {
    queryClient.setQueryData(
      ['posts'],
      context.previousPosts
    );
  },
  onSettled: () =&gt; {
    queryClient.invalidateQueries({
      queryKey: ['posts'],
    });
  },
});</code></pre>
<p>Here, <code>updatePostLike</code> represents an application-specific immutable update helper.</p>
<p>The previous cache is saved before the optimistic update, restored if the request fails, and refreshed after the mutation settles.</p>
<p><strong>Interview tip:</strong> Consider concurrent mutations before rolling back an entire cache snapshot; otherwise, one failed operation could undo another successful operation.</p>`,
        },
        {
          id: "rn-storage-compare",
          q: "What is the difference between AsyncStorage, SecureStore, and SQLite?",
          a: `<p>These three tools solve different storage problems in React Native.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>AsyncStorage</th>
        <th>SecureStore</th>
        <th>SQLite</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Purpose</th>
        <td>Simple persistent key-value storage</td>
        <td>Sensitive small values</td>
        <td>Structured relational data</td>
      </tr>
      <tr>
        <th>Typical use</th>
        <td>Preferences, simple cached values</td>
        <td>Tokens, credentials</td>
        <td>Offline records, transactions, searchable data</td>
      </tr>
      <tr>
        <th>Data model</th>
        <td>Key-value</td>
        <td>Key-value</td>
        <td>Tables and SQL queries</td>
      </tr>
      <tr>
        <th>Best for</th>
        <td>Non-sensitive app settings</td>
        <td>Secrets that need protected storage</td>
        <td>Larger structured datasets</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Examples:</p>
<ul>
<li><strong>AsyncStorage:</strong> Theme preference or onboarding completion.</li>
<li><strong>SecureStore:</strong> Authentication tokens or small credentials.</li>
<li><strong>SQLite:</strong> Offline booking records, transaction history, or an operation queue.</li>
</ul>
<p>Example with AsyncStorage:</p>
<pre><code>import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('theme', 'dark');

const theme = await AsyncStorage.getItem('theme');</code></pre>
<p>Example with Expo SecureStore:</p>
<pre><code>import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('authToken', token);

const token = await SecureStore.getItemAsync('authToken');</code></pre>
<p><strong>Interview tip:</strong> AsyncStorage is not encrypted secure storage. SecureStore is intended for small sensitive values, while SQLite is appropriate for structured local data. For an Expo application, these are common choices depending on the data requirements.</p>`,
        },
        {
          id: "rn-redux-persist",
          q: "How do you persist Redux state across application restarts?",
          a: `<p>Redux state normally lives in memory, so it resets when the app process restarts. To preserve selected state, I can use <code>redux-persist</code> with an appropriate storage engine.</p>
<p>Typical flow:</p>
<ol>
<li>Configure a Redux persistence layer.</li>
<li>Choose which reducers or fields should be persisted.</li>
<li>Rehydrate the stored state during startup.</li>
<li>Delay dependent screens until rehydration is complete.</li>
</ol>
<p>Example:</p>
<pre><code>import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['preferences'],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);</code></pre>
<p>Here, <code>rootReducer</code> represents the application's combined reducer.</p>
<p><strong>Important:</strong> Persist only the state that needs to survive restarts. Avoid persisting sensitive tokens in ordinary AsyncStorage, and consider whether cached server data should instead be managed by a server-state library.</p>`,
        },
        {
          id: "rn-sync-queue",
          q: "How would you synchronize local changes with a backend after connectivity is restored?",
          a: `<p>I would implement a sync queue that stores offline operations locally and processes them when the app can communicate with the backend.</p>
<p>A typical flow looks like this:</p>
<pre><code>User makes a change offline
Save the change locally

Pending sync queue
Store operation, ID, timestamp and status

Connectivity returns
Process queued operations safely

Backend confirms success
Mark synced and reconcile local data</code></pre>
<p>My implementation would include:</p>
<ul>
<li>A persistent queue so operations survive app restarts.</li>
<li>Connectivity checks plus retry logic with backoff.</li>
<li>Idempotency keys to prevent duplicate submissions.</li>
<li>Conflict resolution when local and server data differ.</li>
<li>Clear pending, syncing, synced, and failed statuses.</li>
<li>Authentication and permission checks on the backend.</li>
</ul>
<p>For example, if a user submits a booking offline, I would queue the booking request and submit it when connectivity returns. I would not show the booking as confirmed until the backend confirms it.</p>
<p><strong>Interview tip:</strong> Network connectivity is only a signal to attempt synchronization. Reliable sync requires backend acknowledgment, duplicate protection, retry handling, and a strategy for resolving conflicts.</p>`,
        },
        {
          id: "rn-architecture",
          q: "Explain the overall React Native architecture and how JavaScript communicates with native platform code.",
          a: `<p>React Native lets us build mobile applications using JavaScript or TypeScript and React while rendering actual native platform UI components.</p>
<p>Its architecture includes:</p>
<ul>
<li><strong>JavaScript/React layer:</strong> Runs application logic, components, hooks, and event handlers.</li>
<li><strong>React renderer:</strong> Converts the React component tree into a representation that can be rendered on the native platform.</li>
<li><strong>Layout engine (Yoga):</strong> Calculates component positions and dimensions.</li>
<li><strong>Native platform layer:</strong> Creates and updates Android Views or iOS UIViews and handles platform functionality.</li>
<li><strong>JavaScript engine:</strong> Executes JavaScript code, commonly using Hermes.</li>
</ul>
<p>In the New Architecture, JSI enables JavaScript and C++ to interact more directly, Fabric handles rendering, and TurboModules provide native module integration.</p>`,
        },
        {
          id: "rn-legacy-bridge",
          q: "What is the React Native Bridge, and how did the legacy architecture use it?",
          a: `<p>The React Native Bridge was the communication mechanism used by the legacy architecture to exchange messages between JavaScript and native code.</p>
<p>For example, when JavaScript requested native functionality, it typically serialized the call and its arguments into messages that were queued and processed on the native side.</p>
<pre><code>JavaScript
    ↓
Legacy Bridge
    ↓
Native Android / iOS code
    ↓
Result or callback back to JavaScript</code></pre>
<p>The Bridge enabled JavaScript to use native capabilities, such as device APIs, without implementing the entire application separately in Kotlin, Java, Swift, or Objective-C.</p>
<p><strong>Interview tip:</strong> The legacy Bridge was asynchronous and message-based. The New Architecture replaces this communication model with JSI-based integration, including TurboModules and Fabric.</p>`,
        },
        {
          id: "rn-bridge-limits",
          q: "What were the limitations of the asynchronous Bridge?",
          a: `<p>The legacy Bridge had several limitations:</p>
<ul>
<li><strong>Serialization overhead:</strong> Data had to be converted into a transferable format.</li>
<li><strong>Communication overhead:</strong> Many messages between JavaScript and native code could add overhead.</li>
<li><strong>Asynchronous communication:</strong> JavaScript generally couldn't make ordinary synchronous calls through the Bridge.</li>
<li><strong>Large data transfers:</strong> Passing large amounts of data could be expensive.</li>
<li><strong>Debugging complexity:</strong> Understanding timing and interactions across JavaScript and native code could be difficult.</li>
</ul>
<p>For example, sending a very large amount of map-marker data repeatedly across the Bridge could contribute to performance issues.</p>
<p>However, the Bridge was not inherently slow in every scenario. Poor rendering, expensive JavaScript, excessive native work, or network requests could also cause performance problems.</p>`,
        },
        {
          id: "rn-jsi",
          q: "What is JSI (JavaScript Interface), and why was it introduced?",
          a: `<p>JSI stands for JavaScript Interface. It is a C++ interface that allows JavaScript engines and native C++ code to interact with JavaScript values and functions.</p>
<p>It was introduced as a foundation for more direct JavaScript-to-native integration, reducing dependence on the legacy serialized message-based Bridge.</p>
<p>JSI enables capabilities such as:</p>
<ul>
<li>Calling C++ functionality from JavaScript through compatible bindings.</li>
<li>Accessing and working with JavaScript values and functions from native C++ code.</li>
<li>Supporting TurboModules and Fabric.</li>
<li>Enabling synchronous native interactions where the API and execution context permit them.</li>
</ul>
<p><strong>Important:</strong> JSI is not itself the rendering engine or a replacement JavaScript engine. Hermes is a JavaScript engine; JSI provides an interface through which the engine and native C++ functionality can interact.</p>`,
        },
        {
          id: "rn-jsi-vs-bridge",
          q: "How does JSI differ from the legacy Bridge?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Legacy Bridge</th>
        <th>JSI-based architecture</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Asynchronous, message-based communication</td>
        <td>Direct interaction through a C++ interface</td>
      </tr>
      <tr>
        <td>Typically serializes arguments and results</td>
        <td>Can work with JavaScript values without legacy Bridge serialization</td>
      </tr>
      <tr>
        <td>Native module calls generally cross an asynchronous queue</td>
        <td>Supports synchronous or asynchronous interactions, depending on the API</td>
      </tr>
      <tr>
        <td>Communication can incur queuing and serialization overhead</td>
        <td>Can reduce communication overhead</td>
      </tr>
      <tr>
        <td>Used by the legacy architecture</td>
        <td>Foundation for New Architecture features</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Example: A legacy native module might receive a serialized request through the Bridge. A JSI-based integration can expose native functionality through bindings that interact more directly with the JavaScript runtime.</p>
<p>This does not mean all New Architecture operations are synchronous or automatically faster. Threading, API design, native work, and rendering costs still matter.</p>`,
        },
        {
          id: "rn-turbomodules",
          q: "What are TurboModules, and how do they improve native module integration?",
          a: `<p>TurboModules are the New Architecture's system for connecting JavaScript to native platform functionality.</p>
<p>They improve native module integration through:</p>
<ul>
<li><strong>Lazy loading:</strong> Modules can be loaded when needed instead of initializing every module at startup.</li>
<li><strong>JSI-based integration:</strong> They avoid relying on the legacy Bridge for module communication.</li>
<li><strong>Type safety:</strong> Typed JavaScript specifications can be used to generate native interfaces.</li>
<li><strong>Better integration:</strong> They work with the New Architecture's native module system.</li>
</ul>
<p>For example, a custom TurboModule could expose battery information or device-specific functionality to JavaScript.</p>
<p><strong>Interview tip:</strong> TurboModules are for native functionality; Fabric is for rendering native UI components.</p>`,
        },
        {
          id: "rn-fabric",
          q: "What is Fabric, and how does it change React Native's rendering architecture?",
          a: `<p>Fabric is React Native's New Architecture renderer. It connects React's rendering process with the native UI system.</p>
<p>Its responsibilities include:</p>
<ul>
<li>Creating and updating the React Native Shadow Tree.</li>
<li>Coordinating layout and rendering work.</li>
<li>Supporting tighter integration with React's concurrent rendering capabilities.</li>
<li>Mounting the resulting UI updates into native views.</li>
</ul>
<p>In the legacy architecture, rendering relied more heavily on the Bridge to communicate updates to native UI. Fabric uses a C++-based renderer and JSI-based integration.</p>
<p>Example: When a component's state changes, React renders the updated component tree, Fabric processes the required changes, layout is calculated, and the native UI is updated.</p>`,
        },
        {
          id: "rn-codegen",
          q: "What is Codegen, and why is it important for TurboModules and Fabric?",
          a: `<p>Codegen is a build-time tool that generates native code from typed JavaScript or TypeScript specifications.</p>
<p>It is used to generate interfaces for:</p>
<ul>
<li>TurboModules, which expose native functionality.</li>
<li>Fabric native components, which expose native UI components.</li>
</ul>
<p>For example, a module specification defines the methods and types JavaScript expects. Codegen generates the corresponding native interfaces so implementations on Android and iOS can conform to that contract.</p>
<p><strong>Why is it useful?</strong> It reduces repetitive integration work, improves type consistency between JavaScript and native code, and catches certain interface mismatches earlier.</p>
<p><strong>Interview tip:</strong> Codegen generates the integration code; it does not automatically implement your native business logic.</p>`,
        },
        {
          id: "rn-legacy-vs-new",
          q: "What is the difference between the legacy architecture and the New Architecture?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Legacy architecture</th>
        <th>New Architecture</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Communication</th>
        <td>Asynchronous Bridge</td>
        <td>JSI-based integration</td>
      </tr>
      <tr>
        <th>Native modules</th>
        <td>Legacy native modules</td>
        <td>TurboModules</td>
      </tr>
      <tr>
        <th>UI renderer</th>
        <td>Legacy renderer</td>
        <td>Fabric</td>
      </tr>
      <tr>
        <th>Native interfaces</th>
        <td>Primarily legacy module/component interfaces</td>
        <td>Codegen-supported typed interfaces</td>
      </tr>
      <tr>
        <th>React integration</th>
        <td>More limited integration with concurrent features</td>
        <td>Better integration with modern React rendering capabilities</td>
      </tr>
    </tbody>
  </table>
</div>
<p>The New Architecture is designed to reduce communication overhead, improve native module integration, and support more flexible rendering.</p>
<p><strong>Important:</strong> Migrating to the New Architecture does not automatically fix performance issues. Expensive JavaScript, unnecessary re-renders, slow native operations, and poor list rendering can still cause problems.</p>`,
        },
        {
          id: "rn-hermes-engine",
          q: "What is Hermes, and why is it commonly used as the JavaScript engine in React Native?",
          a: `<p>Hermes is an open-source JavaScript engine optimized for React Native applications.</p>
<p>It executes JavaScript and is designed with mobile application requirements in mind.</p>
<p>Its benefits include:</p>
<ul>
<li>Support for precompiled bytecode.</li>
<li>Potentially faster application startup.</li>
<li>Efficient memory usage in many mobile workloads.</li>
<li>Integration with React Native debugging and profiling tools.</li>
</ul>
<p>Hermes is commonly the default JavaScript engine in modern React Native projects.</p>
<p><strong>Interview tip:</strong> Hermes executes JavaScript; React handles component rendering, while Fabric and the native platform handle UI rendering and mounting.</p>`,
        },
        {
          id: "rn-hermes-vs-jsc",
          q: "How does Hermes differ from JavaScriptCore?",
          a: `<p>Hermes and JavaScriptCore (JSC) are both JavaScript engines, but they have different implementations and optimization strategies.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Hermes</th>
        <th>JavaScriptCore</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Designed with React Native and mobile workloads in mind</td>
        <td>General-purpose JavaScript engine used in several environments</td>
      </tr>
      <tr>
        <td>Supports Hermes bytecode</td>
        <td>Uses its own execution and compilation strategies</td>
      </tr>
      <tr>
        <td>Commonly integrated as the default engine in modern React Native</td>
        <td>Can be used in React Native configurations that select JSC</td>
      </tr>
      <tr>
        <td>Provides Hermes-specific debugging and profiling support</td>
        <td>Uses JSC-specific tooling and diagnostics</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Neither engine is guaranteed to be faster for every workload. Startup time, memory use, application behavior, and build configuration all influence performance.</p>`,
        },
        {
          id: "rn-hermes-bytecode",
          q: "What is Hermes bytecode, and how does it affect application startup?",
          a: `<p>Hermes bytecode is a compiled representation of JavaScript that the Hermes engine can execute.</p>
<p>Instead of parsing and compiling all application JavaScript from source at runtime, a release build can package precompiled Hermes bytecode.</p>
<p>Typical flow:</p>
<pre><code>JavaScript / TypeScript
          ↓
     Metro bundler
          ↓
    Hermes compiler
          ↓
     Hermes bytecode
          ↓
     Hermes runtime</code></pre>
<p>This can reduce startup work and improve startup performance.</p>
<p><strong>Important:</strong> TypeScript and JSX are transformed before execution. Bytecode does not eliminate every startup cost; native initialization, module loading, asset loading, and initial rendering also affect launch time.</p>`,
        },
        {
          id: "rn-threads",
          q: "What are the UI thread, JavaScript thread, and background native threads?",
          a: `<p>These threads have different responsibilities.</p>
<ul>
<li><strong>UI thread:</strong> Handles native UI interactions, view updates, and drawing coordination. Android and iOS have their own platform-specific rules for UI work.</li>
<li><strong>JavaScript thread:</strong> Executes application JavaScript, including most React component logic and event handlers.</li>
<li><strong>Background native threads:</strong> Handle suitable work such as networking, image processing, database operations, or other native tasks, depending on the library and implementation.</li>
</ul>
<p>For example, when a user taps a button, the native platform detects the touch, React Native delivers the event to JavaScript, the handler runs, and React processes any resulting state updates. The native UI is updated through the rendering pipeline.</p>
<p><strong>Interview tip:</strong> Do not assume all native work happens on one background thread. Threading depends on the native API, library, and React Native architecture.</p>`,
        },
        {
          id: "rn-js-blocked",
          q: "What happens when the JavaScript thread is blocked for several hundred milliseconds?",
          a: `<p>The application can become noticeably unresponsive because JavaScript work cannot be processed while the thread is blocked.</p>
<p>Possible effects include:</p>
<ul>
<li>Delayed touch handlers and navigation actions.</li>
<li>Frozen JavaScript-driven animations.</li>
<li>Delayed state updates and rendering work.</li>
<li>Delayed processing of network responses and other events.</li>
</ul>
<p>For example:</p>
<pre><code>const startTime = Date.now();

while (Date.now() - startTime &lt; 500) {
  // Blocks the JavaScript thread.
}</code></pre>
<p>This is intentionally bad code. During the loop, JavaScript cannot process other work.</p>
<p>To fix real problems, I profile the application, optimize expensive calculations, avoid unnecessary renders, virtualize long lists, and move suitable CPU-intensive work off the JavaScript thread.</p>
<p><strong>Important:</strong> Native-driven animations may continue even while JavaScript is blocked, depending on how they are implemented.</p>`,
        },
        {
          id: "rn-render-stages",
          q: "How do React rendering, Fabric's Shadow Tree, layout calculation, and native view mounting relate to one another?",
          a: `<p>These are stages of the UI rendering process.</p>
<pre><code>React render
Calculates the next component output

Fabric Shadow Tree
Represents the native UI structure

Layout calculation
Yoga calculates sizes and positions

Commit and mount
Applies required changes to native views</code></pre>
<p>This is a simplified conceptual sequence. Fabric may perform work across different phases and threads, and not every React render results in native view updates.</p>
<p><strong>Interview tip:</strong> React determines what the UI should look like; Yoga calculates layout; Fabric coordinates the renderer and the native UI update process.</p>`,
        },
        {
          id: "rn-yoga",
          q: "What is Yoga, and how does it calculate layouts in React Native?",
          a: `<p>Yoga is a cross-platform layout engine used by React Native to calculate the size and position of UI elements.</p>
<p>It implements Flexbox-inspired layout behavior, allowing the same layout rules to work across Android and iOS.</p>
<p>For example:</p>
<pre><code>&lt;View
  style={{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
&gt;
  &lt;Text&gt;Left&lt;/Text&gt;
  &lt;Text&gt;Right&lt;/Text&gt;
&lt;/View&gt;</code></pre>
<p>Yoga calculates how the two children should be positioned within the available container space.</p>
<p>It considers properties such as dimensions, padding, margins, flex growth, shrinking, alignment, and constraints.</p>
<p><strong>Important:</strong> Yoga calculates layout; it does not draw pixels on the screen. Native platform rendering handles the visual output.</p>`,
        },
        {
          id: "rn-module-vs-component",
          q: "What are native modules and native components, and how are they different?",
          a: `<p>Native modules expose platform functionality or non-UI services to JavaScript.</p>
<p>Examples:</p>
<ul>
<li>Camera access.</li>
<li>Device information.</li>
<li>Native storage APIs.</li>
<li>Custom platform-specific services.</li>
</ul>
<p>Native components expose native UI elements that can be rendered as part of a React Native component tree.</p>
<p>Examples:</p>
<ul>
<li>A custom native map view.</li>
<li>A platform-specific video player.</li>
<li>A native chart component.</li>
</ul>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Native module</th>
        <th>Native component</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Exposes functionality or operations</td>
        <td>Exposes a UI element</td>
      </tr>
      <tr>
        <td>Called through an API</td>
        <td>Rendered in the component tree</td>
      </tr>
      <tr>
        <td>Example: device information module</td>
        <td>Example: custom native map view</td>
      </tr>
    </tbody>
  </table>
</div>
<p>In the New Architecture, TurboModules handle native module integration, while Fabric handles native component rendering.</p>`,
        },
        {
          id: "rn-expose-module",
          q: "How does a native module expose platform functionality to JavaScript?",
          a: `<p>A native module defines an interface that JavaScript can call and implements that interface in the platform's native code.</p>
<p>For a New Architecture module, the usual process is:</p>
<ol>
<li>Define a typed module specification.</li>
<li>Run Codegen to generate native interfaces.</li>
<li>Implement the generated interface in Kotlin/Java for Android and/or Swift/Objective-C++ for iOS, as appropriate.</li>
<li>Register the module according to the module system.</li>
<li>Call the exposed methods from JavaScript or TypeScript.</li>
</ol>
<p>Conceptual JavaScript usage:</p>
<pre><code>import { NativeModules } from 'react-native';

const { DeviceInfo } = NativeModules;

const deviceName = await DeviceInfo.getDeviceName();</code></pre>
<p>This example illustrates the familiar legacy-style access pattern; New Architecture modules are commonly accessed through their generated TurboModule specification and the appropriate module registry API.</p>
<p><strong>Interview tip:</strong> A native module requires both a JavaScript-facing interface and a native implementation. Codegen helps connect them, but it does not replace the implementation.</p>`,
        },
        {
          id: "rn-native-call",
          q: "What happens internally when JavaScript calls a native API such as geolocation or camera access?",
          a: `<p>Consider a React Native screen requesting the user's location.</p>
<ol>
<li>JavaScript calls a geolocation library.</li>
<li>The library checks its configuration and invokes the appropriate native integration.</li>
<li>The native implementation checks or requests the required operating-system permission.</li>
<li>Android or iOS performs the location operation through its native APIs.</li>
<li>The result or error is returned to JavaScript through the library's callback or Promise interface.</li>
<li>JavaScript updates state, React renders the resulting UI, and the native view is updated if necessary.</li>
</ol>
<p>The exact internal path depends on the library and whether it uses the legacy module system or New Architecture integration.</p>
<p>For camera access, the process is similar, but the native implementation may also manage camera sessions, image capture, and resource cleanup.</p>
<p><strong>Important:</strong> JSI does not bypass operating-system permissions. The app must still follow platform permission requirements and handle denial, cancellation, and errors.</p>`,
        },
        {
          id: "rn-release-debug",
          q: "How would you debug a React Native application that works in development but crashes or freezes in a release build?",
          a: `<p>I would first identify whether the issue is a startup crash, a JavaScript exception, a native crash, or a performance freeze. Then I would reproduce it using a release build and gather the relevant logs.</p>
<p>My debugging checklist:</p>
<ol>
<li><strong>Reproduce the release issue:</strong> Test a release build on a physical device, not only the development server.</li>
<li><strong>Inspect crash reports:</strong> Use Android Logcat and Play Console crash reports for Android, and Xcode device logs or crash reports for iOS.</li>
<li><strong>Check JavaScript errors:</strong> Look for minification-related assumptions, missing production configuration, unhandled Promise rejections, and incorrect environment variables.</li>
<li><strong>Check native dependencies:</strong> Review Gradle, CocoaPods, native module compatibility, permissions, and initialization order.</li>
<li><strong>Inspect Hermes and architecture compatibility:</strong> Verify that native modules and build configuration work with the selected engine and architecture.</li>
<li><strong>Check assets and configuration:</strong> Confirm that required assets, API endpoints, signing settings, and environment variables are included correctly.</li>
<li><strong>Profile freezes:</strong> Look for blocked JavaScript work, expensive rendering, memory pressure, and slow native operations.</li>
<li><strong>Validate the fix:</strong> Rebuild the release version and test the original steps on affected devices.</li>
</ol>
<p><strong>Interview-ready answer:</strong> “I reproduce the issue in a release build, collect platform crash logs, and determine whether it comes from JavaScript, native code, configuration, or performance. Then I isolate the failing dependency or operation, fix it, and validate the fix on a real device. I don't rely only on development-mode behavior because release builds differ in bundling, debugging, and optimization.”</p>`,
        },
        {
          id: "rn-architecture-revision",
          q: "Quick revision: architecture concepts to remember",
          a: `<ul>
<li><strong>JSI:</strong> Interface between the JavaScript engine and native C++ functionality.</li>
<li><strong>TurboModules:</strong> New Architecture integration for native functionality.</li>
<li><strong>Fabric:</strong> New Architecture renderer for native UI.</li>
<li><strong>Codegen:</strong> Generates native interfaces from typed specifications.</li>
<li><strong>Hermes:</strong> JavaScript engine.</li>
<li><strong>Yoga:</strong> Layout calculation engine.</li>
<li><strong>Shadow Tree:</strong> Internal representation of the UI used by the renderer.</li>
<li><strong>UI thread:</strong> Coordinates native UI work.</li>
<li><strong>JavaScript thread:</strong> Executes application JavaScript and most React component logic.</li>
</ul>
<p>The most important distinction to remember for interviews is that JSI, Hermes, Fabric, TurboModules, and Yoga solve different problems. They work together, but none of them is a substitute for the others.</p>`,
        },
        {
          id: "rn-android-vs-rn",
          q: "What is the difference between Android native development and React Native development?",
          a: `<p>Native Android development uses Android-specific technologies such as Kotlin or Java to build an application directly for Android.</p>
<p>React Native development uses JavaScript or TypeScript and React to build mobile interfaces that render using native platform UI components.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Native Android</th>
        <th>React Native</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Primarily Kotlin or Java</td>
        <td>Primarily JavaScript or TypeScript</td>
      </tr>
      <tr>
        <td>Android-specific UI and APIs</td>
        <td>Shared React components and JavaScript logic</td>
      </tr>
      <tr>
        <td>Android-specific implementation</td>
        <td>Can share much of the code with iOS</td>
      </tr>
      <tr>
        <td>Direct access to Android APIs</td>
        <td>Native APIs accessed through libraries or native modules</td>
      </tr>
      <tr>
        <td>Android-only codebase in typical projects</td>
        <td>Shared cross-platform codebase</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Example: In a React Native app, I can create a booking screen with React components. If I need a custom Android SDK that has no suitable React Native library, I may need to integrate it using Kotlin or Java.</p>`,
        },
        {
          id: "rn-java-kotlin-sdk",
          q: "What are Java, Kotlin, the Android SDK, and the Android NDK?",
          a: `<ul>
<li><strong>Java:</strong> A programming language historically used extensively for Android applications.</li>
<li><strong>Kotlin:</strong> A modern language officially supported for Android development, with features such as null safety and concise syntax.</li>
<li><strong>Android SDK:</strong> Provides the APIs, build tools, platform tools, and libraries needed to develop Android applications.</li>
<li><strong>Android NDK:</strong> Allows developers to implement parts of an application using native C or C++ code.</li>
</ul>
<p>In React Native, Java or Kotlin may be used for Android-specific modules, application initialization, and native integrations. The NDK is relevant when a dependency contains native C/C++ code or requires native compilation.</p>
<p><strong>Interview tip:</strong> The Android SDK supports normal Android app development; the NDK is specifically for native C/C++ development.</p>`,
        },
        {
          id: "rn-activity-lifecycle",
          q: "What is the Android Activity lifecycle?",
          a: `<p>The Activity lifecycle describes the states an Android Activity moves through as it is created, becomes visible, interacts with the user, moves to the background, and is eventually destroyed.</p>
<p>The lifecycle is important in React Native because the Android Activity hosts the React Native application and participates in events such as foreground/background transitions.</p>
<p>A simplified lifecycle:</p>
<pre><code>onCreate()
    ↓
onStart()
    ↓
onResume()
    ↓
 Activity running
    ↓
onPause()
    ↓
onStop()
    ↓
onDestroy()</code></pre>
<p>The exact sequence depends on what happens to the Activity. For example, an Activity can pause and resume without being destroyed.</p>
<p><strong>Real-world example:</strong> When a permission dialog, another Activity, or certain system UI interactions appear, the current Activity may receive lifecycle callbacks.</p>`,
        },
        {
          id: "rn-lifecycle-callbacks",
          q: "What are onCreate(), onStart(), onResume(), onPause(), onStop(), and onDestroy()?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><code>onCreate()</code></th>
        <td>Initializes the Activity and its initial state.</td>
      </tr>
      <tr>
        <th><code>onStart()</code></th>
        <td>The Activity becomes visible.</td>
      </tr>
      <tr>
        <th><code>onResume()</code></th>
        <td>The Activity enters the foreground interactive state.</td>
      </tr>
      <tr>
        <th><code>onPause()</code></th>
        <td>The Activity loses its fully interactive state.</td>
      </tr>
      <tr>
        <th><code>onStop()</code></th>
        <td>The Activity is no longer visible.</td>
      </tr>
      <tr>
        <th><code>onDestroy()</code></th>
        <td>The Activity is being destroyed.</td>
      </tr>
    </tbody>
  </table>
</div>
<p>In React Native, Android-specific initialization and lifecycle integration may be handled in the native application code, while JavaScript can observe app lifecycle changes through <code>AppState</code>.</p>
<p><strong>Important:</strong> <code>onDestroy()</code> is not guaranteed to run when Android kills an app process. Critical state should be persisted when appropriate rather than relying on destruction callbacks.</p>`,
        },
        {
          id: "rn-activity-fragment",
          q: "What is the difference between an Activity and a Fragment?",
          a: `<p>An Activity is an Android application component that provides a window and a lifecycle for a user-facing interaction.</p>
<p>A Fragment is a reusable portion of UI and behavior hosted inside an Activity or another supported fragment container.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Activity</th>
        <th>Fragment</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Represents a major Android component</td>
        <td>Represents a reusable part of a UI</td>
      </tr>
      <tr>
        <td>Has its own lifecycle</td>
        <td>Has a lifecycle associated with its host</td>
      </tr>
      <tr>
        <td>Can own the app window</td>
        <td>Usually renders inside its host's UI</td>
      </tr>
      <tr>
        <td>Declared as an application component in the manifest when applicable</td>
        <td>Typically managed by a FragmentManager</td>
      </tr>
    </tbody>
  </table>
</div>
<p>React Native applications commonly use an Android Activity to host the React Native view hierarchy. Some libraries and specialized applications may also use Fragments.</p>`,
        },
        {
          id: "rn-main-activity",
          q: "What is the Android MainActivity in a React Native application?",
          a: `<p><code>MainActivity</code> is typically the Android entry Activity that launches and hosts the React Native application.</p>
<p>It commonly extends a React Native base Activity and configures the main component name, along with certain Android-specific behavior.</p>
<p>A simplified example:</p>
<pre><code>class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String = "MyApp"
}</code></pre>
<p>The component name must match the registered React Native application component.</p>
<p>Depending on the React Native version and project template, <code>MainActivity</code> may also configure splash screens, edge-to-edge behavior, or other native integrations.</p>
<p><strong>Interview tip:</strong> <code>MainActivity</code> is Android-side application entry code, not the same thing as a React Native JavaScript screen.</p>`,
        },
        {
          id: "rn-main-application",
          q: "What is MainApplication, and what does it configure?",
          a: `<p><code>MainApplication</code> is typically the Android Application subclass in a React Native project. It runs at the application-process level and configures application-wide initialization.</p>
<p>Depending on the React Native version and template, it may configure:</p>
<ul>
<li>React Native's host and runtime.</li>
<li>The package or module setup.</li>
<li>The selected JavaScript engine.</li>
<li>New Architecture settings.</li>
<li>Application-wide native initialization.</li>
</ul>
<p>A simplified Kotlin example:</p>
<pre><code>class MainApplication : Application(),
    ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getJSMainModuleName() = "index"
        }
}</code></pre>
<p>This is an illustrative legacy-host-style example; modern templates and React Native versions may use different host and factory APIs.</p>
<p><strong>Interview tip:</strong> <code>MainApplication</code> handles app-wide setup, while <code>MainActivity</code> hosts the primary user interface.</p>`,
        },
        {
          id: "rn-android-manifest",
          q: "What is an Android Manifest file, and what does AndroidManifest.xml control?",
          a: `<p><code>AndroidManifest.xml</code> describes important information about an Android application to the operating system and build tools.</p>
<p>It can declare:</p>
<ul>
<li>Activities and other application components.</li>
<li>Required permissions.</li>
<li>Deep-link intent filters.</li>
<li>App metadata and certain platform configurations.</li>
<li>Hardware or software features the app requires.</li>
</ul>
<p>Example:</p>
<pre><code>&lt;uses-permission
    android:name="android.permission.CAMERA" /&gt;

&lt;application&gt;
    &lt;activity
        android:name=".MainActivity"
        android:exported="true"&gt;
        &lt;intent-filter&gt;
            &lt;action android:name="android.intent.action.MAIN" /&gt;
            &lt;category android:name="android.intent.category.LAUNCHER" /&gt;
        &lt;/intent-filter&gt;
    &lt;/activity&gt;
&lt;/application&gt;</code></pre>
<p>This is a simplified example. Real applications may use manifest merging, and components with intent filters need appropriate export settings based on their purpose and Android version.</p>`,
        },
        {
          id: "rn-sdk-levels",
          q: "What is the difference between compile SDK, target SDK, and minimum SDK?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Setting</th>
        <th>Meaning</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><code>compileSdk</code></th>
        <td>Android API version used to compile the application.</td>
      </tr>
      <tr>
        <th><code>targetSdk</code></th>
        <td>Android API level the application declares it is designed and tested for; this influences platform compatibility behavior.</td>
      </tr>
      <tr>
        <th><code>minSdk</code></th>
        <td>Lowest Android API level the application supports.</td>
      </tr>
    </tbody>
  </table>
</div>
<p>For example, an app might compile against a recent SDK while supporting devices running an older Android version.</p>
<p><strong>Interview tip:</strong> Increasing <code>compileSdk</code> does not automatically mean the app can only run on that Android version. The minimum supported version is controlled by <code>minSdk</code>, subject to dependency requirements.</p>`,
        },
        {
          id: "rn-gradle-tools",
          q: "What are Gradle, the Gradle wrapper, and the Android Gradle Plugin?",
          a: `<ul>
<li><strong>Gradle:</strong> The build automation system that runs tasks such as compiling code, resolving dependencies, and packaging the app.</li>
<li><strong>Gradle wrapper:</strong> Project scripts and configuration that select and download the required Gradle version, helping developers use a consistent build environment.</li>
<li><strong>Android Gradle Plugin (AGP):</strong> Adds Android-specific build tasks, such as building APKs and AABs, processing resources, and configuring Android variants.</li>
</ul>
<p>In a React Native Android project, these tools work together to build the JavaScript bundle and native Android application.</p>
<p><strong>Important:</strong> Gradle and AGP versions must be compatible. An incompatible combination can cause build failures even when the JavaScript code is correct.</p>`,
        },
        {
          id: "rn-gradle-files",
          q: "What is the difference between build.gradle and settings.gradle?",
          a: `<p><code>settings.gradle</code> configures the Gradle build structure, including which projects or modules belong to the build and how plugins may be resolved.</p>
<p><code>build.gradle</code> configures the build behavior for a project or module, including dependencies, plugins, SDK versions, and build types.</p>
<p>For example:</p>
<pre><code>android/
├── settings.gradle
├── build.gradle
└── app/
    └── build.gradle</code></pre>
<ul>
<li><code>android/settings.gradle</code>: Project and module configuration.</li>
<li><code>android/build.gradle</code>: Root-level build configuration.</li>
<li><code>android/app/build.gradle</code>: Application-specific build configuration.</li>
</ul>
<p>Modern Gradle projects may use Kotlin DSL files such as <code>settings.gradle.kts</code> and <code>build.gradle.kts</code> instead.</p>
<p><strong>Interview tip:</strong> Before changing a Gradle file, identify whether the issue belongs to project-level configuration, app-level configuration, or dependency resolution.</p>`,
        },
        {
          id: "rn-gradle-variants",
          q: "What are Gradle dependencies, repositories, and build variants?",
          a: `<ul>
<li><strong>Dependencies:</strong> Libraries or plugins the application requires.</li>
<li><strong>Repositories:</strong> Locations where Gradle searches for those dependencies, such as Google Maven and Maven Central.</li>
<li><strong>Build variants:</strong> Specific combinations of build types and product flavors.</li>
</ul>
<p>Example dependency:</p>
<pre><code>dependencies {
    implementation("com.example:library:1.0.0")
}</code></pre>
<p>A build type might be <code>debug</code> or <code>release</code>, while product flavors could represent development, staging, and production.</p>
<p>Combining these can create variants such as <code>stagingDebug</code> and <code>productionRelease</code>.</p>
<p><strong>React Native example:</strong> A staging variant might use a test API endpoint, while production uses the live endpoint. The exact configuration depends on the project's flavor setup.</p>`,
        },
        {
          id: "rn-debug-release-builds",
          q: "What is the difference between debug and release builds in Android?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Debug build</th>
        <th>Release build</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Used during development</td>
        <td>Used for distribution</td>
      </tr>
      <tr>
        <td>Usually debuggable</td>
        <td>Normally not debuggable</td>
      </tr>
      <tr>
        <td>May connect to the Metro development server</td>
        <td>Usually includes a bundled JavaScript application</td>
      </tr>
      <tr>
        <td>Often has extra debugging support</td>
        <td>Can enable optimization and shrinking</td>
      </tr>
      <tr>
        <td>Commonly uses debug signing</td>
        <td>Must use suitable release signing for distribution</td>
      </tr>
    </tbody>
  </table>
</div>
<p>A React Native release build typically packages the JavaScript bundle and required assets into the application.</p>
<p><strong>Interview tip:</strong> If an app works in debug but fails in release, check production environment variables, native configuration, signing, minification, bundled assets, and release-only native crashes.</p>`,
        },
        {
          id: "rn-r8",
          q: "What is R8, and how do code shrinking, obfuscation, and resource shrinking work?",
          a: `<p>R8 is Android's code optimization tool, used to optimize and shrink Java/Kotlin bytecode and perform obfuscation when configured.</p>
<ul>
<li><strong>Code shrinking:</strong> Removes code determined to be unused.</li>
<li><strong>Obfuscation:</strong> Renames classes, methods, and fields to make the code harder to understand.</li>
<li><strong>Optimization:</strong> Simplifies or transforms code while preserving intended behavior.</li>
<li><strong>Resource shrinking:</strong> Removes unused Android resources when the appropriate build configuration enables it.</li>
</ul>
<p>These optimizations can reduce application size, but they can also expose issues with libraries that rely on reflection or dynamically referenced classes.</p>
<p><strong>React Native note:</strong> R8 primarily concerns Android native bytecode. JavaScript bundling and minification are separate parts of the React Native build process.</p>`,
        },
        {
          id: "rn-apk-aab",
          q: "What are APK and AAB files, and how do they differ?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>APK — Android Package</th>
        <th>AAB — Android App Bundle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>An installable Android application package. It can be installed directly on a device or emulator using ADB.</td>
        <td>A publishing format that contains the resources and code needed to generate device-appropriate APKs. Google Play uses it to deliver optimized APKs.</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>Interview tip:</strong> APKs are directly installable; an AAB is generally uploaded to Google Play, which generates the appropriate APKs for users' devices.</p>`,
        },
        {
          id: "rn-android-permissions",
          q: "What is the difference between Android permissions declared in the manifest and permissions requested at runtime?",
          a: `<p>Some permissions are declared in <code>AndroidManifest.xml</code>, while dangerous permissions generally also require a runtime request on supported Android versions.</p>
<p>For example, camera access commonly requires both:</p>
<ol>
<li>Declaring <code>android.permission.CAMERA</code> in the manifest.</li>
<li>Requesting permission from the user at runtime before accessing the camera.</li>
</ol>
<pre><code>&lt;uses-permission
    android:name="android.permission.CAMERA" /&gt;</code></pre>
<p>In React Native, a permissions library or native module can handle the runtime request.</p>
<p><strong>Important:</strong> Declaring a permission does not mean the user has granted it. The app must handle denial, permanent denial, and permission revocation appropriately.</p>`,
        },
        {
          id: "rn-intents",
          q: "What are Android intents, intent filters, and deep-link configuration?",
          a: `<p>An Intent is a message used to request an action from another Android component or application.</p>
<p>An intent filter declares the types of intents a component can handle.</p>
<p>Deep links use these mechanisms to open a specific screen when a matching URL is received.</p>
<p>Example:</p>
<pre><code>&lt;intent-filter&gt;
    &lt;action android:name="android.intent.action.VIEW" /&gt;

    &lt;category android:name="android.intent.category.DEFAULT" /&gt;
    &lt;category android:name="android.intent.category.BROWSABLE" /&gt;

    &lt;data
        android:scheme="https"
        android:host="example.com"
        android:pathPrefix="/products" /&gt;
&lt;/intent-filter&gt;</code></pre>
<p>React Navigation can then map a matching URL to a screen and extract route parameters.</p>
<p><strong>Interview tip:</strong> A custom URL scheme and a verified HTTPS Android App Link are different configurations. Verified App Links also require the appropriate website association.</p>`,
        },
        {
          id: "rn-logcat",
          q: "What is Logcat, and how would you diagnose a native Android crash?",
          a: `<p>Logcat is Android's logging system. It displays logs from the operating system, native application code, and other processes.</p>
<p>I use it to identify crashes, exceptions, permission problems, and native dependency failures.</p>
<p>For example:</p>
<pre><code>adb logcat</code></pre>
<p>To filter logs by severity:</p>
<pre><code>adb logcat *:E</code></pre>
<p>To clear existing logs before reproducing an issue:</p>
<pre><code>adb logcat -c</code></pre>
<p>My debugging process:</p>
<ol>
<li>Clear or capture the logs.</li>
<li>Reproduce the crash.</li>
<li>Search for <code>FATAL EXCEPTION</code>, <code>AndroidRuntime</code>, or native crash indicators such as <code>SIGSEGV</code>.</li>
<li>Inspect the stack trace to identify the failing class or library.</li>
<li>Fix the root cause and reproduce the same steps in a new build.</li>
</ol>
<p><strong>Important:</strong> A native crash may terminate the application without producing a normal JavaScript error. For release crashes, symbolication may be necessary to interpret native stack traces.</p>`,
        },
        {
          id: "rn-adb",
          q: "How do you use ADB to install an APK, inspect connected devices, collect logs, and debug an application?",
          a: `<p>ADB stands for Android Debug Bridge. It is a command-line tool for communicating with Android devices and emulators.</p>
<p>Common commands:</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Task</th>
        <th>Command</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>List connected devices</th>
        <td><code>adb devices</code></td>
      </tr>
      <tr>
        <th>Install an APK</th>
        <td><code>adb install app-debug.apk</code></td>
      </tr>
      <tr>
        <th>Reinstall an APK and retain app data when compatible</th>
        <td><code>adb install -r app-debug.apk</code></td>
      </tr>
      <tr>
        <th>Launch a shell on the device</th>
        <td><code>adb shell</code></td>
      </tr>
      <tr>
        <th>View error logs</th>
        <td><code>adb logcat *:E</code></td>
      </tr>
      <tr>
        <th>Clear logs</th>
        <td><code>adb logcat -c</code></td>
      </tr>
      <tr>
        <th>Uninstall an app</th>
        <td><code>adb uninstall com.example.app</code></td>
      </tr>
    </tbody>
  </table>
</div>
<p>To launch an app from the command line:</p>
<pre><code>adb shell monkey -p com.example.app 1</code></pre>
<p>Replace the package name and APK path with those for your application.</p>
<p>For React Native debugging, I also use ADB to inspect installation issues, verify permissions, and reproduce problems on a physical device or emulator.</p>
<p><strong>Interview tip:</strong> When multiple devices are connected, use <code>adb -s &lt;device-id&gt;</code> to target a particular device.</p>`,
        },
        {
          id: "rn-android-build-failure",
          q: "How would you troubleshoot a React Native Android build failure caused by Gradle, CMake, the NDK, or a missing native dependency?",
          a: `<p>I first identify the exact failure stage instead of immediately deleting caches or changing dependency versions.</p>
<p>My troubleshooting process:</p>
<ol>
<li><strong>Read the first meaningful error.</strong> The final Gradle failure may be only a consequence of an earlier issue.</li>
<li><strong>Check the build environment.</strong> Verify the required Java version, Gradle wrapper, Android Gradle Plugin, SDK, NDK, and CMake versions.</li>
<li><strong>Verify dependencies.</strong> Check that <code>node_modules</code> is installed and that required React Native Gradle plugin files exist.</li>
<li><strong>Inspect native dependency configuration.</strong> Review autolinking, <code>settings.gradle</code>, <code>build.gradle</code>, and native module compatibility.</li>
<li><strong>Check CMake and NDK errors.</strong> Look for missing headers, incorrect paths, ABI issues, and incompatible native libraries.</li>
<li><strong>Clean and rebuild selectively.</strong> Remove generated build artifacts when appropriate, then rebuild.</li>
<li><strong>Reproduce on a clean checkout or CI environment.</strong> This helps identify undeclared local dependencies and environment-specific failures.</li>
</ol>
<p>Useful commands:</p>
<pre><code># Install JavaScript dependencies
npm install

# Run a clean Android build
cd android
./gradlew clean
./gradlew assembleDebug --stacktrace</code></pre>
<p>If a missing Gradle plugin error mentions <code>node_modules/@react-native/gradle-plugin</code>, I would first verify dependency installation and the configured plugin path rather than randomly changing Gradle versions.</p>
<p>If CMake reports a missing header or native target, I would inspect the affected dependency and its supported React Native/NDK configuration before changing compiler flags.</p>
<p><strong>Interview-ready answer:</strong> “I trace the build failure to its root cause, verify the compatible toolchain versions, inspect native dependency configuration, and reproduce the build after making a targeted fix. I avoid upgrading or downgrading multiple dependencies at once because that makes the cause harder to identify.”</p>`,
        },
        {
          id: "rn-android-revision",
          q: "Quick revision — Android concepts",
          a: `<ul>
<li><strong>MainActivity:</strong> Hosts the React Native UI.</li>
<li><strong>MainApplication:</strong> Performs application-level native initialization.</li>
<li><strong>AndroidManifest.xml:</strong> Declares Android components, permissions, and intent filters.</li>
<li><strong>compileSdk, targetSdk, minSdk:</strong> Control compilation API, platform compatibility behavior, and minimum supported Android version.</li>
<li><strong>Gradle and AGP:</strong> Build automation and Android-specific build integration.</li>
<li><strong>APK vs AAB:</strong> Directly installable package vs publishing bundle.</li>
<li><strong>R8:</strong> Optimizes and shrinks Android native bytecode.</li>
<li><strong>ADB and Logcat:</strong> Essential tools for device interaction and native debugging.</li>
<li><strong>CMake and NDK:</strong> Relevant to native C/C++ dependencies.</li>
</ul>`,
        },
        {
          id: "rn-ios-vs-rn",
          q: "What is the difference between native iOS development and React Native development?",
          a: `<p>Native iOS development uses Swift or Objective-C to build applications directly for Apple's platforms.</p>
<p>React Native development uses JavaScript or TypeScript and React to build mobile interfaces that render through native platform components.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Native iOS</th>
        <th>React Native</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Primarily Swift or Objective-C</td>
        <td>Primarily JavaScript or TypeScript</td>
      </tr>
      <tr>
        <td>Uses UIKit or SwiftUI for UI</td>
        <td>Uses React Native components</td>
      </tr>
      <tr>
        <td>iOS-specific implementation</td>
        <td>Shares much of the code with Android</td>
      </tr>
      <tr>
        <td>Direct access to Apple's APIs</td>
        <td>Native APIs accessed through libraries or native modules</td>
      </tr>
      <tr>
        <td>Native iOS codebase</td>
        <td>Shared cross-platform codebase plus native integration</td>
      </tr>
    </tbody>
  </table>
</div>
<p>For example, I can implement a booking screen in React Native and use a native iOS SDK if a required feature is not supported by an existing React Native library.</p>
<p><strong>Interview tip:</strong> React Native reduces duplicated UI and business logic, but native iOS knowledge is still essential for platform integrations, permissions, debugging, and releases.</p>`,
        },
        {
          id: "rn-swift-uikit",
          q: "What are Swift, Objective-C, UIKit, and SwiftUI?",
          a: `<ul>
<li><strong>Swift:</strong> Apple's modern programming language for iOS and other Apple-platform development.</li>
<li><strong>Objective-C:</strong> An older but still widely used Apple-platform language, especially in existing libraries and native integrations.</li>
<li><strong>UIKit:</strong> Apple's established framework for building iOS interfaces using views, view controllers, and related UI components.</li>
<li><strong>SwiftUI:</strong> Apple's declarative UI framework for building interfaces using Swift.</li>
</ul>
<p>React Native itself has native iOS integration code, and native libraries may use Swift, Objective-C, or Objective-C++.</p>
<p><strong>Interview tip:</strong> Swift and Objective-C are programming languages; UIKit and SwiftUI are UI frameworks.</p>`,
        },
        {
          id: "rn-ios-lifecycle",
          q: "What is the iOS application lifecycle, and what role do app and scene delegates play?",
          a: `<p>The iOS application lifecycle describes how an app transitions between launching, becoming active, moving into the background, and eventually being terminated.</p>
<ul>
<li><strong>AppDelegate:</strong> Handles application-level events and setup.</li>
<li><strong>SceneDelegate:</strong> In scene-based applications, handles lifecycle and UI-window management for an individual scene.</li>
</ul>
<p>The exact setup depends on the project's iOS version and lifecycle configuration. Modern React Native templates may centralize lifecycle and React Native initialization differently.</p>
<p>In a React Native app, these native lifecycle events coexist with JavaScript's <code>AppState</code> API, which reports states such as active, inactive, and background.</p>
<p><strong>Interview tip:</strong> <code>AppState</code> is the JavaScript-facing lifecycle API; <code>AppDelegate</code> and <code>SceneDelegate</code> are native iOS lifecycle mechanisms.</p>`,
        },
        {
          id: "rn-ios-background",
          q: "What is the difference between an iOS app entering the background and being suspended?",
          a: `<ul>
<li><strong>Background:</strong> The app is no longer the active foreground app, but it may still execute some work that iOS permits.</li>
<li><strong>Suspended:</strong> The app remains in memory but generally does not execute code.</li>
<li><strong>Terminated:</strong> The app process has ended and must start again when launched.</li>
</ul>
<p>iOS controls background execution and may suspend or terminate an app to manage resources.</p>
<p>For example, when a user switches away from a React Native app, JavaScript timers should not be assumed to keep running reliably.</p>
<p><strong>Interview tip:</strong> Background does not guarantee continued execution. Use supported background execution mechanisms when a feature genuinely requires background work.</p>`,
        },
        {
          id: "rn-app-delegate",
          q: "What is the purpose of AppDelegate in a React Native iOS application?",
          a: `<p><code>AppDelegate</code> is the native entry point responsible for application-level initialization and lifecycle integration.</p>
<p>Depending on the React Native version and project template, it may:</p>
<ul>
<li>Initialize React Native and its application factory or delegate.</li>
<li>Configure the main React Native component.</li>
<li>Process certain launch events.</li>
<li>Integrate native SDKs and notification handling.</li>
<li>Configure application-wide behavior.</li>
</ul>
<p>The exact code varies between React Native versions and legacy versus New Architecture templates.</p>
<p><strong>Interview tip:</strong> When integrating a native SDK, I check its documentation to determine whether setup belongs in <code>AppDelegate</code>, a dedicated native module, or another lifecycle location.</p>`,
        },
        {
          id: "rn-info-plist",
          q: "What is the role of Info.plist?",
          a: `<p><code>Info.plist</code> contains configuration metadata used by iOS and the application.</p>
<p>Common entries include:</p>
<ul>
<li>Bundle-related configuration and display name.</li>
<li>Privacy permission descriptions.</li>
<li>URL schemes.</li>
<li>Supported orientations.</li>
<li>Certain app capabilities and launch-related settings.</li>
</ul>
<p>For example:</p>
<pre><code>&lt;key&gt;NSCameraUsageDescription&lt;/key&gt;
&lt;string&gt;Camera access is needed to capture photos.&lt;/string&gt;

&lt;key&gt;NSLocationWhenInUseUsageDescription&lt;/key&gt;
&lt;string&gt;Location is used to find nearby services.&lt;/string&gt;</code></pre>
<p>When an app requests protected resources, iOS uses the relevant privacy description to explain why the permission is needed.</p>
<p><strong>Important:</strong> Adding a privacy string does not itself grant permission. The app must request authorization through the appropriate API.</p>`,
        },
        {
          id: "rn-xcode",
          q: "What are Xcode, an Xcode project, and an Xcode workspace?",
          a: `<ul>
<li><strong>Xcode:</strong> Apple's IDE for building, testing, debugging, archiving, and distributing Apple-platform applications.</li>
<li><strong>Xcode project (<code>.xcodeproj</code>):</strong> Contains project settings, targets, build configurations, and file references.</li>
<li><strong>Xcode workspace (<code>.xcworkspace</code>):</strong> Can group multiple projects and dependencies into one workspace.</li>
</ul>
<p>React Native projects using CocoaPods commonly open the workspace because it includes the app project and the Pods project.</p>
<p><strong>Interview tip:</strong> For a CocoaPods-based React Native iOS app, open the <code>.xcworkspace</code> in Xcode rather than only the <code>.xcodeproj</code>.</p>`,
        },
        {
          id: "rn-cocoapods",
          q: "What is CocoaPods, and why does React Native use it?",
          a: `<p>CocoaPods is a dependency manager for native Apple-platform projects.</p>
<p>React Native uses CocoaPods to integrate native dependencies required by React Native itself and third-party libraries.</p>
<p>For example, a React Native library that wraps a native iOS SDK may declare a pod dependency that CocoaPods resolves and integrates into the app's build.</p>
<p>Common commands:</p>
<pre><code>cd ios
pod install</code></pre>
<p>To update the dependency integration based on the current Podfile and lockfile, <code>pod install</code> is usually the appropriate command.</p>
<p><strong>Interview tip:</strong> Installing a JavaScript package with npm or Yarn does not necessarily complete its native iOS integration; CocoaPods may also be required.</p>`,
        },
        {
          id: "rn-podfile",
          q: "What are Podfile, Podfile.lock, and .xcworkspace?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>File</th>
        <th>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><code>Podfile</code></th>
        <td>Declares native dependencies and CocoaPods configuration.</td>
      </tr>
      <tr>
        <th><code>Podfile.lock</code></th>
        <td>Records the resolved pod versions for reproducible installs.</td>
      </tr>
      <tr>
        <th><code>.xcworkspace</code></th>
        <td>Workspace containing the app project and the integrated Pods project.</td>
      </tr>
    </tbody>
  </table>
</div>
<p>For a React Native app, the Podfile often includes React Native's pod configuration and autolinking setup.</p>
<p><strong>Important:</strong> Commit <code>Podfile.lock</code> for an application so team members and CI can use consistent resolved pod versions. Do not manually edit the lockfile to fix a dependency problem.</p>`,
        },
        {
          id: "rn-pod-install",
          q: "What happens when you execute pod install?",
          a: `<p>When I run <code>pod install</code>, CocoaPods generally:</p>
<ol>
<li>Reads the Podfile.</li>
<li>Resolves dependencies and compatible versions.</li>
<li>Downloads dependencies when needed.</li>
<li>Generates or updates the Pods project and supporting integration files.</li>
<li>Updates <code>Podfile.lock</code> when the resolved dependency graph changes.</li>
<li>Integrates the dependencies into the Xcode workspace.</li>
</ol>
<p>In React Native, the command may also run pod scripts that discover and configure native modules.</p>
<p><strong>Interview tip:</strong> <code>pod install</code> aims to honor the existing lockfile. <code>pod update</code> is intended to update selected or broader dependency versions and can introduce version changes.</p>`,
        },
        {
          id: "rn-static-dynamic",
          q: "What is the difference between a framework, a static library, and a dynamic framework?",
          a: `<p>These are ways to package and distribute native code.</p>
<ul>
<li><strong>Static library:</strong> Its compiled code is linked into the application binary during the build.</li>
<li><strong>Framework:</strong> An Apple-platform bundle that can package code, headers, resources, and related metadata.</li>
<li><strong>Dynamic framework:</strong> A framework whose compiled code is loaded dynamically at runtime.</li>
</ul>
<p>A framework can be static or dynamic, so these terms are not mutually exclusive.</p>
<p>In React Native projects, native SDKs and Pods can use different linking models depending on their configuration.</p>
<p><strong>Interview tip:</strong> Static linking incorporates code into the final binary, while dynamic linking loads a separate shared binary at runtime. Both have implications for app size, dependency integration, and runtime loading.</p>`,
        },
        {
          id: "rn-xcframework",
          q: "What is an XCFramework, and why might a native SDK distribute one?",
          a: `<p>An XCFramework is Apple's bundle format for distributing a compiled framework or library across multiple Apple platforms and architectures.</p>
<p>It can contain separate binaries for platforms such as iOS devices and the iOS Simulator, allowing Xcode to select the appropriate binary for the build target.</p>
<p>For example, a payment SDK might distribute:</p>
<pre><code>PaymentSDK.xcframework/
├── ios-arm64/
├── ios-arm64_x86_64-simulator/
└── Info.plist</code></pre>
<p>This is an illustrative structure; the actual slices depend on the SDK.</p>
<p><strong>Interview tip:</strong> XCFrameworks help avoid the problems of manually combining device and simulator binaries. If Xcode reports that no XCFramework slice is available, check the SDK version, supported platforms, and target architecture.</p>`,
        },
        {
          id: "rn-ios-signing",
          q: "What are provisioning profiles, signing certificates, and bundle identifiers?",
          a: `<p>These are key parts of Apple's app identity and code-signing system.</p>
<ul>
<li><strong>Bundle identifier:</strong> Uniquely identifies the app, for example <code>com.company.motorep</code>.</li>
<li><strong>Signing certificate:</strong> Identifies the developer or distribution identity used to sign the app.</li>
<li><strong>Provisioning profile:</strong> Connects an app identifier with permitted signing identities and distribution or device authorization settings.</li>
</ul>
<p>All three work together, depending on the signing and distribution method.</p>
<p><strong>Interview tip:</strong> A bundle identifier mismatch, expired certificate, or incompatible provisioning profile can prevent an app from building, installing, or being distributed.</p>`,
        },
        {
          id: "rn-ios-distribution",
          q: "What is the difference between development signing, ad hoc distribution, TestFlight, and App Store distribution?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>Typical purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Development signing</th>
        <td>Debugging and running the app during development on authorized devices.</td>
      </tr>
      <tr>
        <th>Ad hoc distribution</th>
        <td>Sharing signed builds with registered devices outside the App Store.</td>
      </tr>
      <tr>
        <th>TestFlight</th>
        <td>Distributing beta builds to internal or external testers through Apple's service.</td>
      </tr>
      <tr>
        <th>App Store distribution</th>
        <td>Publishing the app to users through the App Store after Apple's required processing and review.</td>
      </tr>
    </tbody>
  </table>
</div>
<p>TestFlight builds are uploaded through App Store Connect and are generally signed using the appropriate distribution configuration.</p>
<p><strong>Interview tip:</strong> Successfully archiving an app in Xcode does not guarantee that the build is ready for distribution. Signing, entitlements, upload validation, and App Store Connect requirements must also be satisfied.</p>`,
        },
        {
          id: "rn-entitlements",
          q: "What are entitlements, and how do capabilities such as Push Notifications and Sign in with Apple use them?",
          a: `<p>Entitlements are signed permissions or declarations that authorize an app to use certain Apple-platform capabilities.</p>
<p>Examples include:</p>
<ul>
<li>Push Notifications.</li>
<li>Associated Domains.</li>
<li>Sign in with Apple.</li>
<li>Keychain sharing.</li>
<li>Certain background execution capabilities.</li>
</ul>
<p>When enabling a capability, Xcode may update the app's entitlements file and coordinate with the developer account and provisioning profile.</p>
<p>For example, push notifications require the appropriate push entitlement and provisioning configuration, along with APNs setup.</p>
<p><strong>Important:</strong> Enabling a capability in Xcode is only one part of the configuration. The relevant backend, provider credentials, and runtime integration must also be set up.</p>`,
        },
        {
          id: "rn-ios-privacy",
          q: "How do you configure privacy permission strings for location, camera, microphone, and photo-library access?",
          a: `<p>I add the appropriate usage-description keys to <code>Info.plist</code> and request permission through the relevant native API or React Native library.</p>
<p>Common keys include:</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Example usage-description key</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Location while in use</th>
        <td><code>NSLocationWhenInUseUsageDescription</code></td>
      </tr>
      <tr>
        <th>Location always and when in use</th>
        <td><code>NSLocationAlwaysAndWhenInUseUsageDescription</code></td>
      </tr>
      <tr>
        <th>Camera</th>
        <td><code>NSCameraUsageDescription</code></td>
      </tr>
      <tr>
        <th>Microphone</th>
        <td><code>NSMicrophoneUsageDescription</code></td>
      </tr>
      <tr>
        <th>Photo library read access</th>
        <td><code>NSPhotoLibraryUsageDescription</code></td>
      </tr>
      <tr>
        <th>Photo library write access</th>
        <td><code>NSPhotoLibraryAddUsageDescription</code></td>
      </tr>
    </tbody>
  </table>
</div>
<p>The exact keys required depend on the APIs being used and the access requested.</p>
<p>Example:</p>
<pre><code>&lt;key&gt;NSCameraUsageDescription&lt;/key&gt;
&lt;string&gt;Camera access lets you upload a profile photo.&lt;/string&gt;</code></pre>
<p><strong>Interview tip:</strong> Explain the real user-facing reason for each permission. Request only the access the feature needs, and handle denial gracefully.</p>`,
        },
        {
          id: "rn-apns",
          q: "What are APNs device tokens, and how does iOS push-notification delivery work?",
          a: `<p>APNs stands for Apple Push Notification service. It is Apple's service for delivering push notifications to Apple devices.</p>
<p>A typical push-notification flow is:</p>
<ol>
<li>The app requests notification authorization when appropriate.</li>
<li>The app registers with APNs and receives a device token.</li>
<li>The app sends the token to its backend, usually associated with the relevant user or installation.</li>
<li>The backend sends a notification request to APNs using its authentication credentials.</li>
<li>APNs attempts to deliver the notification to the device.</li>
<li>The app handles notification interactions, foreground presentation, or navigation when the user taps the notification.</li>
</ol>
<pre><code>React Native app
       ↓
  APNs registration
       ↓
 Device token → App backend
                    ↓
              APNs request
                    ↓
                iOS device</code></pre>
<p>When using Firebase Cloud Messaging, FCM can provide an additional layer for managing and sending notifications while using APNs for delivery to iOS devices.</p>
<p><strong>Important:</strong> A device token is not the same as an FCM registration token. The exact token-handling flow depends on the notification provider and SDK.</p>`,
        },
        {
          id: "rn-ios-crashes",
          q: "How do you diagnose iOS crashes using Xcode logs, crash reports, and symbolication?",
          a: `<p>I reproduce the crash, collect the logs, and determine whether the failure originates from JavaScript, native iOS code, or a dependency.</p>
<p>My approach:</p>
<ol>
<li><strong>Reproduce the issue:</strong> Run the app on a simulator or physical device.</li>
<li><strong>Inspect Xcode logs:</strong> Look for exceptions, failed assertions, permission problems, and native stack traces.</li>
<li><strong>Check crash reports:</strong> Review reports from Xcode, device logs, or App Store Connect where available.</li>
<li><strong>Symbolicate the crash:</strong> Use the matching debug symbols, especially the correct dSYM, to translate memory addresses into meaningful function and method names.</li>
<li><strong>Inspect native dependencies:</strong> Check CocoaPods integration, initialization code, SDK compatibility, and recent changes.</li>
<li><strong>Reproduce the fix:</strong> Build and test the corrected release configuration.</li>
</ol>
<p><strong>Interview tip:</strong> A JavaScript exception and a native crash are different failure types. Native crashes may terminate the process before JavaScript can handle the error.</p>`,
        },
        {
          id: "rn-cocoapods-failure",
          q: "How would you troubleshoot a CocoaPods failure or an Xcode compilation error caused by a native dependency?",
          a: `<p>I start with the first meaningful error in the build log and identify which dependency or build phase is failing.</p>
<p>My debugging process:</p>
<ol>
<li>Check the React Native version and the dependency's compatibility.</li>
<li>Verify the Xcode version, CocoaPods version, deployment target, and required compiler settings.</li>
<li>Inspect the Podfile and the dependency's installation instructions.</li>
<li>Run <code>pod install</code> and check whether the required pods and generated project files are present.</li>
<li>Read the actual compiler error to distinguish missing headers, incompatible APIs, unsupported architectures, and compiler-standard issues.</li>
<li>Apply the smallest supported fix and rebuild.</li>
</ol>
<p>Useful commands:</p>
<pre><code>cd ios

pod install

# If generated build artifacts need cleaning:
rm -rf build

# Then reopen the workspace and build in Xcode.</code></pre>
<p>If the problem is a missing XCFramework slice, I verify that the vendor SDK supports the platform and architecture. If it is a C++ compilation issue, I check the dependency's documented compiler requirements rather than blindly changing the global compiler standard.</p>
<p><strong>Interview tip:</strong> Avoid deleting <code>Podfile.lock</code> or reinstalling every dependency as the first step. That can change resolved versions and introduce additional problems.</p>`,
        },
        {
          id: "rn-ios-launch-crash",
          q: "What would you check if an iOS application builds successfully but crashes immediately after launch?",
          a: `<p>A successful build confirms that compilation and linking completed; it does not guarantee that the app will initialize successfully at runtime.</p>
<p>I would check the following:</p>
<ul>
<li><strong>Native crash logs:</strong> Look for exceptions, failed assertions, and crashes in <code>AppDelegate</code> or SDK initialization.</li>
<li><strong>JavaScript startup:</strong> Check for startup exceptions, missing bundled assets, and incorrect production configuration.</li>
<li><strong>Native dependencies:</strong> Verify that required SDKs and native modules are compatible with the current React Native and Xcode versions.</li>
<li><strong>Signing and entitlements:</strong> Confirm the installed build has the expected configuration and capabilities.</li>
<li><strong>Permissions and initialization:</strong> Check whether a native SDK is accessing a protected resource or initializing incorrectly.</li>
<li><strong>Release-only differences:</strong> Verify environment variables, bundled JavaScript, Hermes configuration, and build settings.</li>
<li><strong>Recent changes:</strong> Compare the last known working build with the failing build to isolate the cause.</li>
</ul>
<p>I would first reproduce the crash on a physical device, collect the crash report, identify the failing native or JavaScript operation, and then verify the fix in the same release configuration.</p>
<p><strong>Interview-ready answer:</strong> “I don't assume that a successful archive means the app is healthy. I inspect launch-time logs, isolate the failing initialization step, verify native dependency and release configuration, and retest the fix on a real device.”</p>`,
        },
        {
          id: "rn-perf-causes",
          q: "What are the most common causes of poor performance in React Native?",
          a: `<p>Common causes include:</p>
<ul>
<li>Expensive JavaScript calculations blocking event processing.</li>
<li>Unnecessary component re-renders.</li>
<li>Rendering thousands of list items without virtualization.</li>
<li>Loading large, unoptimized images.</li>
<li>Excessive API requests and repeated data transformations.</li>
<li>Complex layouts, shadows, and native rendering work.</li>
<li>Memory leaks and excessive memory usage.</li>
<li>Too much JavaScript or native work during app startup.</li>
</ul>
<p>For example, if a feed renders hundreds of complex cards at once, scrolling may become slow because of rendering work, image decoding, or expensive JavaScript.</p>
<p><strong>Interview tip:</strong> I profile first, identify the bottleneck, and then optimize the specific problem instead of applying every performance technique everywhere.</p>`,
        },
        {
          id: "rn-thread-areas",
          q: "What is the difference between JavaScript-thread performance, UI-thread performance, and native rendering performance?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Area</th>
        <th>Responsibility</th>
        <th>Common symptom</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>JavaScript thread</th>
        <td>Executes JS logic, event handlers, and much of React's work</td>
        <td>Delayed interactions, slow JS-driven animations</td>
      </tr>
      <tr>
        <th>UI thread</th>
        <td>Processes native UI interactions and coordinates UI work</td>
        <td>Delayed touches or blocked native UI work</td>
      </tr>
      <tr>
        <th>Native rendering</th>
        <td>Layout, drawing, image rendering, and other platform rendering work</td>
        <td>Dropped frames, stuttering during scrolling</td>
      </tr>
    </tbody>
  </table>
</div>
<p>These areas interact, but they are not identical. React Native's exact threading behavior depends on the architecture, rendering operation, and library.</p>
<p>Example: If a large synchronous JavaScript loop blocks the JS thread, a native-driven animation may continue while a JavaScript-driven interaction becomes unresponsive.</p>`,
        },
        {
          id: "rn-find-bottleneck",
          q: "How do you identify whether a performance issue is caused by JavaScript, layout, rendering, or native code?",
          a: `<p>I reproduce the problem and profile the app using the appropriate tools.</p>
<ul>
<li><strong>JavaScript:</strong> Use React Profiler and Hermes profiling tools to find expensive functions and repeated renders.</li>
<li><strong>Layout/rendering:</strong> Inspect frame drops, complex view hierarchies, image work, and platform rendering traces.</li>
<li><strong>Native code:</strong> Use Android Studio Profiler, Android system tracing, Xcode Instruments, and crash or performance logs.</li>
<li><strong>Network:</strong> Inspect request frequency, response times, payload size, and repeated calls.</li>
</ul>
<p>I also compare a release build against development behavior because development tooling and checks can distort performance measurements.</p>
<p><strong>Interview tip:</strong> Don't assume every dropped frame is caused by JavaScript. The JS thread can be idle while native rendering is still expensive.</p>`,
        },
        {
          id: "rn-react-profiler",
          q: "How do you use React DevTools and the React Profiler to identify unnecessary renders?",
          a: `<p>React DevTools lets me inspect components, their props, state, and component hierarchy. The Profiler records commits and shows which components rendered and how much time React spent rendering them.</p>
<p>My process is:</p>
<ol>
<li>Reproduce the slow interaction.</li>
<li>Record a profiling session.</li>
<li>Find components that render frequently or take significant render time.</li>
<li>Inspect why they rendered: changed state, props, context, or parent updates.</li>
<li>Apply a targeted fix and profile again.</li>
</ol>
<p>For example, if every row in a large list re-renders when one item changes, I would inspect prop stability and consider <code>React.memo</code> for expensive row components.</p>
<p><strong>Important:</strong> A component render is not automatically a performance problem. Focus on expensive or unnecessary work, not simply the number of renders.</p>`,
        },
        {
          id: "rn-dev-release-perf",
          q: "What is the difference between development performance and release-build performance?",
          a: `<p>Development builds often include debugging support, development warnings, extra checks, and other instrumentation. These can make the app slower than a release build.</p>
<p>Release builds typically use optimized application bundles and production configuration.</p>
<p>However, release builds may also reveal problems that are hidden during development, such as incorrect environment variables, missing assets, or release-only native configuration issues.</p>
<p><strong>Interview tip:</strong> I use development tools to diagnose issues, but validate performance targets using representative release builds on real devices.</p>`,
        },
        {
          id: "rn-memo-component",
          q: "How does React.memo help optimize React Native components?",
          a: `<p><code>React.memo</code> can skip re-rendering a function component when its props are unchanged according to a shallow comparison.</p>
<pre><code>const ProductCard = React.memo(function ProductCard({ item }) {
  return &lt;Text&gt;{item.name}&lt;/Text&gt;;
});</code></pre>
<p>If the parent re-renders but passes the same <code>item</code> reference, React can skip rendering <code>ProductCard</code>, assuming no relevant context or internal state change requires an update.</p>
<p>It is useful for expensive components rendered frequently, such as feed cards or list items.</p>
<p><strong>Important:</strong> <code>React.memo</code> does not prevent re-renders caused by the component's own state or consumed context changing. It also won't help much if props receive new object or function references on every render.</p>`,
        },
        {
          id: "rn-memo-hooks-when",
          q: "When should you use useMemo and useCallback, and when can they make performance worse?",
          a: `<ul>
<li><code>useMemo</code> caches the result of a calculation between renders while its dependencies remain unchanged.</li>
<li><code>useCallback</code> caches a function reference between renders while its dependencies remain unchanged.</li>
</ul>
<pre><code>const filteredItems = useMemo(
  () =&gt; items.filter((item) =&gt; item.active),
  [items]
);

const handlePress = useCallback((id) =&gt; {
  selectItem(id);
}, [selectItem]);</code></pre>
<p>They are useful when calculations are expensive or stable references help memoized children avoid unnecessary renders.</p>
<p>They can make performance worse when used everywhere because they add comparison and maintenance overhead, and the cached value may provide no measurable benefit.</p>
<p><strong>Interview tip:</strong> Memoization is an optimization, not a correctness requirement. Measure before adding it, and ensure dependencies are correct to avoid stale values.</p>`,
        },
        {
          id: "rn-unstable-props",
          q: "How do unstable object references and inline callbacks affect memoized list items?",
          a: `<p>JavaScript creates a new object or function reference whenever an object literal or function expression is evaluated again.</p>
<p>For example:</p>
<pre><code>&lt;ProductCard
  item={{ id: 1, name: 'Helmet' }}
  onPress={() =&gt; selectItem(1)}
/&gt;</code></pre>
<p>Even if the values are identical, both props receive new references on each parent render. A <code>React.memo</code> component may therefore render again.</p>
<p>A better approach is to pass stable data references and use stable callbacks when profiling shows they are beneficial.</p>
<pre><code>const handlePress = useCallback(() =&gt; {
  selectItem(item.id);
}, [item.id, selectItem]);

&lt;ProductCard item={item} onPress={handlePress} /&gt;</code></pre>
<p><strong>Interview tip:</strong> Stable references help memoization, but avoid adding <code>useMemo</code> and <code>useCallback</code> to every component without a measurable reason.</p>`,
        },
        {
          id: "rn-flatlist-thousands",
          q: "How do you optimize FlatList for thousands of records?",
          a: `<p><code>FlatList</code> virtualizes list items, so it doesn't render every record simultaneously. I optimize the list and its row components together.</p>
<p>My approach includes:</p>
<ul>
<li>Use stable, unique keys.</li>
<li>Keep <code>renderItem</code> and item props stable when useful.</li>
<li>Memoize expensive row components.</li>
<li>Provide <code>getItemLayout</code> for fixed-size rows.</li>
<li>Tune rendering batch and window settings based on testing.</li>
<li>Optimize images and avoid expensive calculations inside rows.</li>
<li>Use pagination if fetching the complete dataset is unnecessary.</li>
</ul>
<pre><code>&lt;FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) =&gt; item.id}
  initialNumToRender={10}
  windowSize={7}
/&gt;</code></pre>
<p>These values are starting points, not universal recommendations. The correct settings depend on item complexity, device performance, and scrolling behavior.</p>`,
        },
        {
          id: "rn-flatlist-window",
          q: "What are initialNumToRender, maxToRenderPerBatch, windowSize, updateCellsBatchingPeriod, and removeClippedSubviews?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Property</th>
        <th>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><code>initialNumToRender</code></th>
        <td>Number of items rendered initially.</td>
      </tr>
      <tr>
        <th><code>maxToRenderPerBatch</code></th>
        <td>Maximum number of items rendered in a batch.</td>
      </tr>
      <tr>
        <th><code>windowSize</code></th>
        <td>Approximate number of viewport heights kept in the rendering window.</td>
      </tr>
      <tr>
        <th><code>updateCellsBatchingPeriod</code></th>
        <td>Time interval, in milliseconds, between scheduled cell-rendering batches.</td>
      </tr>
      <tr>
        <th><code>removeClippedSubviews</code></th>
        <td>Detaches offscreen views from their native backing hierarchy in supported circumstances.</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Trade-offs matter:</p>
<ul>
<li>Larger batches can reduce blank areas during fast scrolling but consume more JS time.</li>
<li>Larger windows can improve scrolling continuity but increase memory usage.</li>
<li>Smaller initial batches can improve startup but may leave blank space while scrolling.</li>
<li><code>removeClippedSubviews</code> can improve performance in some cases but may cause visual issues with certain layouts or animations.</li>
</ul>
<p><strong>Interview tip:</strong> Tune these settings using real-device profiling rather than copying fixed values from another project.</p>`,
        },
        {
          id: "rn-flashlist",
          q: "What is the difference between FlatList and FlashList, and when would you choose each?",
          a: `<p><code>FlatList</code> is the built-in virtualized list component provided by React Native. <code>FlashList</code> is a list library designed to improve list rendering and recycling behavior.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>FlatList</th>
        <th>FlashList</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Built into React Native</td>
        <td>Requires an additional dependency</td>
      </tr>
      <tr>
        <td>Familiar API and broad ecosystem support</td>
        <td>Designed around efficient cell recycling</td>
      </tr>
      <tr>
        <td>Often sufficient for normal lists</td>
        <td>Worth evaluating for complex, large lists</td>
      </tr>
      <tr>
        <td>Performance depends on configuration and item complexity</td>
        <td>Performance depends on configuration, version, and workload</td>
      </tr>
    </tbody>
  </table>
</div>
<p>I start with <code>FlatList</code> for most use cases. If profiling reveals significant list-rendering problems, I evaluate <code>FlashList</code> against the same dataset and devices.</p>
<p><strong>Important:</strong> Neither component automatically fixes expensive row rendering, oversized images, or excessive state updates.</p>`,
        },
        {
          id: "rn-virtualization",
          q: "What is list virtualization, and how does it reduce memory and rendering costs?",
          a: `<p>List virtualization means rendering only the items needed around the visible viewport rather than mounting every item in the dataset.</p>
<p>For example, a list containing 5,000 records may have only a subset of its rows mounted at a given time.</p>
<p>Benefits include:</p>
<ul>
<li>Lower memory usage.</li>
<li>Less initial rendering work.</li>
<li>Fewer mounted native views.</li>
<li>More manageable scrolling performance.</li>
</ul>
<p><code>FlatList</code> implements virtualization and progressively renders items around the viewport.</p>
<p><strong>Important:</strong> Virtualization does not mean the entire dataset is automatically fetched in pages. Data fetching and UI virtualization are separate concerns.</p>`,
        },
        {
          id: "rn-get-item-layout",
          q: "What is getItemLayout, and when can it improve list performance?",
          a: `<p><code>getItemLayout</code> tells <code>FlatList</code> the dimensions and offsets of items when their layout is known in advance.</p>
<p>This can avoid measuring each item dynamically and improve operations such as scrolling to a particular index.</p>
<pre><code>const ITEM_HEIGHT = 72;

&lt;FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) =&gt; item.id}
  getItemLayout={(_, index) =&gt; ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/&gt;</code></pre>
<p>This example assumes every item is exactly 72 dp high and there are no additional separators to account for.</p>
<p><strong>Interview tip:</strong> Don't use fixed layout calculations for rows with variable heights unless you can calculate their actual dimensions correctly.</p>`,
        },
        {
          id: "rn-one-item-rerender",
          q: "How do you prevent unnecessary re-renders in a list when only one item changes?",
          a: `<p>I keep item state and props as localized as possible and make sure unchanged items retain their references.</p>
<p>For example, instead of recreating every item object when one item changes, I update only the matching item.</p>
<pre><code>setItems((previous) =&gt;
  previous.map((item) =&gt;
    item.id === changedId
      ? { ...item, selected: true }
      : item
  )
);</code></pre>
<p>Then I can use a memoized row component:</p>
<pre><code>const ListItem = React.memo(function ListItem({ item }) {
  return &lt;Text&gt;{item.name}&lt;/Text&gt;;
});</code></pre>
<p>Unchanged items retain their object references, allowing memoized rows to skip rendering when their other relevant props are also stable.</p>
<p><strong>Important:</strong> If a <code>FlatList</code> depends on external state, such as selection stored outside its data array, make that dependency explicit through the appropriate props or <code>extraData</code>.</p>`,
        },
        {
          id: "rn-image-memory",
          q: "How do you optimize image loading, resizing, caching, and memory consumption?",
          a: `<p>Images can consume significant memory, particularly when the source resolution is much larger than the displayed size.</p>
<p>I focus on:</p>
<ul>
<li>Requesting appropriately sized images from the server.</li>
<li>Using compressed formats appropriate to the content.</li>
<li>Avoiding unnecessary image decoding and resizing.</li>
<li>Using caching where supported by the image-loading library.</li>
<li>Showing placeholders while images load.</li>
<li>Releasing unused references and avoiding huge image collections in memory.</li>
<li>Testing scrolling with many images on lower-memory devices.</li>
</ul>
<p>For production apps, libraries such as Expo Image or other suitable image-loading solutions can provide caching and additional image features.</p>
<p><strong>Interview tip:</strong> Reducing the dimensions and file size of the source image often matters more than adding memoization around the component displaying it.</p>`,
        },
        {
          id: "rn-memory-leak-causes",
          q: "What causes memory leaks in React Native, and how do you investigate them?",
          a: `<p>A memory leak occurs when memory remains retained even though the application no longer needs it.</p>
<p>Common causes include:</p>
<ul>
<li>Event listeners that are never removed.</li>
<li>Timers that continue running after a screen unmounts.</li>
<li>Subscriptions that remain active.</li>
<li>Retained references to large objects.</li>
<li>Native resources that are not released properly.</li>
</ul>
<p>I reproduce the issue, navigate through the relevant screens repeatedly, and monitor memory with Android Studio Profiler or Xcode Instruments. I then inspect retained objects, subscriptions, and native allocations.</p>
<p><strong>Important:</strong> A memory leak is not always caused by JavaScript. Native modules, images, and other native resources can also retain memory.</p>`,
        },
        {
          id: "rn-cleanup-refs",
          q: "How can event listeners, timers, subscriptions, and stale references cause memory-related problems?",
          a: `<p>Listeners, timers, and subscriptions can keep callbacks alive after a component is no longer visible. Those callbacks may retain references to component-related data or trigger unnecessary work.</p>
<p>For example:</p>
<pre><code>useEffect(() =&gt; {
  const timer = setInterval(() =&gt; {
    refreshData();
  }, 5000);

  return () =&gt; clearInterval(timer);
}, [refreshData]);</code></pre>
<p>The cleanup clears the timer when the effect is replaced or the component unmounts.</p>
<p>Similarly, event listeners should be removed and subscriptions should be unsubscribed when no longer needed.</p>
<p>A stale closure is a related but different problem: a callback may use an outdated value because it captured an earlier render's state. It can cause incorrect behavior without necessarily causing a memory leak.</p>`,
        },
        {
          id: "rn-leak-vs-high-memory",
          q: "What is the difference between a memory leak and high memory usage?",
          a: `<ul>
<li><strong>Memory leak:</strong> Memory that should be released remains retained, often causing usage to grow over time.</li>
<li><strong>High memory usage:</strong> The app currently uses a large amount of memory, which may be legitimate for its workload.</li>
</ul>
<p>For example, a screen displaying several large images may have high memory usage even if the images are released correctly when no longer needed.</p>
<p>To distinguish them, I observe memory over time, repeat the same user journey, and inspect whether memory consistently grows or remains retained after leaving the screen.</p>
<p><strong>Interview tip:</strong> A single high memory reading does not prove a leak. Look for a pattern and inspect retained objects or allocations.</p>`,
        },
        {
          id: "rn-slow-startup",
          q: "How do you detect and fix slow application startup?",
          a: `<p>I measure the time from launch to a useful, interactive screen, then profile the work happening during that interval.</p>
<p>Typical causes include:</p>
<ul>
<li>Large JavaScript bundles.</li>
<li>Too many modules initialized eagerly.</li>
<li>Expensive application initialization.</li>
<li>Blocking synchronous JavaScript.</li>
<li>Large assets or images.</li>
<li>Slow API calls required before the first screen appears.</li>
<li>Heavy native SDK initialization.</li>
</ul>
<p>Possible improvements include lazy loading, reducing unnecessary startup dependencies, optimizing assets, and showing a useful initial UI while nonessential data loads.</p>
<p><strong>Important:</strong> Separate cold-start time from warm-start time, and measure on representative release builds. Avoid delaying the first useful screen for API data that can load afterward.</p>`,
        },
        {
          id: "rn-startup-techniques",
          q: "How do Hermes, inline requires, lazy loading, and bundle-size reduction affect startup performance?",
          a: `<ul>
<li><strong>Hermes:</strong> Supports precompiled bytecode, which can reduce some JavaScript startup work.</li>
<li><strong>Inline requires:</strong> Can defer loading certain modules until they are first needed, when configured appropriately.</li>
<li><strong>Lazy loading:</strong> Delays loading nonessential code or features until needed.</li>
<li><strong>Bundle-size reduction:</strong> Removes unused code and unnecessary dependencies, reducing the amount of code and assets the app must process.</li>
</ul>
<p>For example, a large settings or reporting feature may not need to initialize when the user first opens the Home screen.</p>
<p><strong>Interview tip:</strong> These optimizations are complementary, but they are not guaranteed to improve every app. Measure startup before and after each significant change.</p>`,
        },
        {
          id: "rn-animation-opt",
          q: "How do you optimize animations using native-driven animations or Reanimated worklets?",
          a: `<p>I choose an animation approach that avoids unnecessary work on the JavaScript thread.</p>
<ul>
<li><strong>Native-driven animations:</strong> Suitable for supported animation properties when the animation can be executed by the native animation system.</li>
<li><strong>Reanimated worklets:</strong> Allow supported animation and interaction logic to run on the UI runtime, reducing dependence on JavaScript-thread execution for frame-by-frame updates.</li>
</ul>
<p>Example using the built-in Animated API:</p>
<pre><code>Animated.timing(opacity, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,
}).start();</code></pre>
<p>The native driver supports only certain properties, such as opacity and transforms; it does not support every layout property.</p>
<p>For complex gestures, shared values, and coordinated animations, Reanimated may be a better fit.</p>`,
        },
        {
          id: "rn-js-vs-ui-animation",
          q: "What is the difference between JavaScript-driven animation and UI-thread animations?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>JavaScript-driven animation</th>
        <th>UI-thread animation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Animation updates depend on JavaScript processing</td>
        <td>Animation updates can proceed independently of ordinary JS-thread work</td>
      </tr>
      <tr>
        <td>Can stutter when JavaScript is busy</td>
        <td>Often remains smooth during JS-thread congestion</td>
      </tr>
      <tr>
        <td>Useful for logic that needs frequent JS updates</td>
        <td>Useful for smooth gestures and continuous visual movement</td>
      </tr>
    </tbody>
  </table>
</div>
<p>If a JavaScript-driven animation calculates every frame and the JS thread becomes blocked, the animation can stutter.</p>
<p>Native-driven animations and Reanimated worklets can keep suitable animations running more smoothly because the animation work is executed outside the ordinary JS event-processing path.</p>
<p><strong>Important:</strong> UI-thread animations still compete with native UI work and rendering. They are not immune to every source of frame drops.</p>`,
        },
        {
          id: "rn-layout-cost",
          q: "How can excessive layout calculations, deeply nested views, and unnecessary shadows affect performance?",
          a: `<p>Complex view hierarchies can increase layout and rendering work. Frequent layout changes can also trigger additional calculations.</p>
<p>Large shadows, clipping, transparency, and overlapping elements may increase rendering costs, depending on the platform and implementation.</p>
<p>I optimize by:</p>
<ul>
<li>Simplifying deeply nested view hierarchies where practical.</li>
<li>Avoiding unnecessary layout changes during animations.</li>
<li>Reducing expensive visual effects when profiling shows a problem.</li>
<li>Avoiding repeated measurement and state updates caused by layout callbacks.</li>
<li>Testing on lower-end devices.</li>
</ul>
<p><strong>Interview tip:</strong> Don't flatten every view or remove all shadows automatically. Optimize the structures and effects that profiling identifies as expensive.</p>`,
        },
        {
          id: "rn-network-traffic",
          q: "How do you reduce unnecessary network traffic, repeated API calls, and expensive data transformations?",
          a: `<p>I reduce network work by caching appropriate responses, deduplicating concurrent requests, paginating large datasets, and avoiding unnecessary refetching.</p>
<p>For example, TanStack Query can reuse cached results and coordinate requests that use the same query key.</p>
<p>For expensive transformations, I avoid recalculating derived data unnecessarily and consider memoization when profiling shows that the computation is costly.</p>
<p>I also inspect:</p>
<ul>
<li>Repeated requests triggered by effects or screen focus.</li>
<li>Large response payloads.</li>
<li>Missing pagination.</li>
<li>Inefficient JSON transformations.</li>
<li>Retry loops and poorly configured refetch behavior.</li>
<li>Requests that continue after they are no longer needed.</li>
</ul>
<p><strong>Important:</strong> Caching must respect freshness requirements, and server-side changes may require invalidation or refetching.</p>`,
        },
        {
          id: "rn-perf-budget",
          q: "How would you establish a performance budget and measure frame drops, startup time, memory usage, and responsiveness in production?",
          a: `<p>I define measurable targets for important user journeys, establish a baseline, and monitor performance across representative devices.</p>
<p>A performance budget might track:</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Metric</th>
        <th>What I measure</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Startup time</th>
        <td>Time until the first useful screen is ready</td>
      </tr>
      <tr>
        <th>Frame performance</th>
        <td>Dropped frames and slow frames during scrolling or animation</td>
      </tr>
      <tr>
        <th>Memory usage</th>
        <td>Memory consumption and growth over repeated journeys</td>
      </tr>
      <tr>
        <th>Responsiveness</th>
        <td>Time from user interaction to visible feedback</td>
      </tr>
      <tr>
        <th>Network performance</th>
        <td>API latency, failure rates, and payload sizes</td>
      </tr>
      <tr>
        <th>Crash-free sessions</th>
        <td>Stability across real-world usage</td>
      </tr>
    </tbody>
  </table>
</div>
<p>I use Android Studio Profiler, Xcode Instruments, React profiling tools, and production telemetry where available.</p>
<p>I would set targets based on the app's requirements and actual device measurements rather than using one universal threshold for every screen.</p>
<p>For example, I would benchmark a long medical-community feed, a booking flow, and the app's cold startup separately because their performance bottlenecks differ.</p>
<p><strong>Interview-ready answer:</strong> “I establish a baseline, define measurable performance budgets for key journeys, profile release builds, and monitor real-world performance. After an optimization, I compare the same metrics under comparable conditions to confirm that it actually improved the user experience.”</p>`,
        },
        {
          id: "rn-perf-revision",
          q: "Quick revision — Performance optimization",
          a: `<p>Focus on these distinctions before moving to the next set:</p>
<ol>
<li>JavaScript-thread bottlenecks vs native rendering bottlenecks.</li>
<li><code>React.memo</code> vs <code>useMemo</code> vs <code>useCallback</code>.</li>
<li><code>FlatList</code> virtualization and rendering-window tuning.</li>
<li>Stable object references and list-item rendering.</li>
<li>Image optimization and memory profiling.</li>
<li>Memory leaks vs legitimate high memory usage.</li>
<li>Startup optimization and Hermes bytecode.</li>
<li>Native-driven animations vs Reanimated worklets.</li>
<li>Network caching, deduplication, and cancellation.</li>
</ol>`,
        },
        {
          id: "rn-large-app-arch",
          q: "How would you design the architecture of a large React Native application used by millions of users?",
          a: `<p>I would use a feature-based architecture with clear boundaries between UI, business logic, data access, and native integrations.</p>
<p>My main principles would be:</p>
<ul>
<li><strong>Feature modules:</strong> Separate major business areas, such as authentication, profiles, bookings, and notifications.</li>
<li><strong>Reusable design system:</strong> Centralize shared UI components, typography, colors, and spacing.</li>
<li><strong>State management:</strong> Use local state for UI interactions, Redux Toolkit or Zustand for shared client state, and TanStack Query for server state where appropriate.</li>
<li><strong>API layer:</strong> Centralize networking, authentication headers, error handling, and request cancellation.</li>
<li><strong>Observability:</strong> Integrate crash reporting, analytics, performance monitoring, and structured logging.</li>
<li><strong>Testing and delivery:</strong> Automate linting, tests, native builds, and release pipelines.</li>
</ul>
<p>Example structure:</p>
<pre><code>src/
├── app/
│   ├── navigation/
│   ├── providers/
│   └── config/
├── features/
│   ├── auth/
│   ├── profile/
│   ├── bookings/
│   └── notifications/
├── shared/
│   ├── ui/
│   ├── hooks/
│   ├── utils/
│   └── types/
├── services/
│   ├── api/
│   ├── analytics/
│   └── storage/
└── assets/</code></pre>
<p>For a large team, I would enforce dependency rules between modules and introduce more complex patterns only where the domain and testing requirements justify them.</p>
<p><strong>Interview tip:</strong> Millions of users do not automatically require microservices or dozens of packages. Good boundaries, observability, reliability, and disciplined performance testing matter more than architectural complexity.</p>`,
        },
        {
          id: "rn-structure-styles",
          q: "What is the difference between feature-based, layer-based, and domain-driven project structures?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Structure</th>
        <th>How it organizes code</th>
        <th>Best suited for</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Feature-based</th>
        <td>Groups code by functionality</td>
        <td>Most medium-to-large applications</td>
      </tr>
      <tr>
        <th>Layer-based</th>
        <td>Groups code by technical responsibility</td>
        <td>Smaller apps or simple architectures</td>
      </tr>
      <tr>
        <th>Domain-driven</th>
        <td>Organizes around business domains and their rules</td>
        <td>Complex applications with distinct business areas</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Feature-based example:</p>
<pre><code>features/
├── bookings/
├── profile/
└── payments/</code></pre>
<p>Each feature contains its own screens, components, hooks, and related logic.</p>
<p>Layer-based example:</p>
<pre><code>src/
├── screens/
├── components/
├── hooks/
├── services/
└── stores/</code></pre>
<p>Domain-driven example: A booking domain owns booking rules, status transitions, and related operations instead of scattering them across unrelated screens and services.</p>
<p>In practice, I often combine feature-based organization with domain-driven principles: features own their workflows, while shared technical infrastructure lives in separate modules.</p>`,
        },
        {
          id: "rn-organize-feature",
          q: "How would you organize screens, components, hooks, services, API clients, state stores, and types?",
          a: `<p>I would organize them primarily by feature, keeping shared infrastructure separate.</p>
<pre><code>features/
└── bookings/
    ├── screens/
    │   └── BookingDetailsScreen.tsx
    ├── components/
    │   └── BookingCard.tsx
    ├── hooks/
    │   └── useBooking.ts
    ├── services/
    │   └── bookingApi.ts
    ├── store/
    │   └── bookingSlice.ts
    ├── types/
    │   └── booking.types.ts
    └── utils/
        └── bookingHelpers.ts

shared/
├── api/
├── ui/
├── hooks/
├── storage/
└── types/</code></pre>
<p>I keep screen components focused on presenting data and handling user interactions. API calls belong in an appropriate data-access layer, reusable UI belongs in shared components, and business rules should not be duplicated across screens.</p>
<p><strong>Interview tip:</strong> Avoid putting all business logic into a single global services folder or all components into one enormous folder. Organize code so developers can understand and modify one feature without navigating the entire application.</p>`,
        },
        {
          id: "rn-separation-of-concerns",
          q: "What is separation of concerns, and how does it improve maintainability?",
          a: `<p>Separation of concerns means assigning different responsibilities to distinct parts of the application.</p>
<p>For example:</p>
<ul>
<li>A screen handles UI composition and user interactions.</li>
<li>A hook coordinates UI-facing behavior.</li>
<li>A use case implements a business operation.</li>
<li>A repository manages access to data.</li>
<li>An API client handles HTTP communication.</li>
</ul>
<p>Suppose a booking screen calculates the final price, sends the request, validates every field, and handles navigation in one large component. Changing the pricing rules could affect several unrelated concerns.</p>
<p>Separating these responsibilities makes the code easier to test, reuse, debug, and maintain.</p>
<p><strong>Interview tip:</strong> Separation of concerns does not mean creating a separate file for every small function. The goal is to isolate responsibilities that change for different reasons.</p>`,
        },
        {
          id: "rn-ui-logic-data",
          q: "What is the difference between a UI component, a business-logic module, and a data-access layer?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Layer</th>
        <th>Responsibility</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>UI component</th>
        <td>Displays data and responds to interactions</td>
        <td><code>BookingCard</code></td>
      </tr>
      <tr>
        <th>Business logic</th>
        <td>Enforces rules and coordinates operations</td>
        <td>Calculate booking eligibility</td>
      </tr>
      <tr>
        <th>Data-access layer</th>
        <td>Retrieves and persists data</td>
        <td><code>BookingRepository</code> or <code>bookingApi</code></td>
      </tr>
    </tbody>
  </table>
</div>
<p>For example, a booking screen might call a <code>createBooking</code> use case. The use case validates business rules and calls a repository, which sends the request to the backend.</p>
<p>This prevents the UI from becoming tightly coupled to HTTP details or business rules.</p>`,
        },
        {
          id: "rn-clean-architecture",
          q: "How would you implement clean architecture principles in React Native?",
          a: `<p>Clean Architecture separates business rules from implementation details and makes dependencies point toward the core business logic.</p>
<p>A simplified structure is:</p>
<pre><code>Presentation
    ↓
Application / Use Cases
    ↓
Domain
    ↑
Infrastructure implements interfaces</code></pre>
<p>The domain contains core business rules. Use cases coordinate operations. Infrastructure provides concrete implementations such as HTTP APIs, SQLite, or secure storage.</p>
<p>For example, the <code>CreateBooking</code> use case should not need to know whether booking data comes from a REST API, a mock repository, or a local implementation.</p>
<p><strong>Interview tip:</strong> Clean Architecture is a set of dependency principles, not a requirement to create four folders for every feature. Use the level of abstraction justified by the application's complexity.</p>`,
        },
        {
          id: "rn-clean-parts",
          q: "What are entities, use cases, repositories, and data sources in a Clean Architecture design?",
          a: `<p>These concepts have different responsibilities.</p>
<ul>
<li><strong>Entities:</strong> Represent core business concepts and rules, such as a Booking or Payment.</li>
<li><strong>Use cases:</strong> Represent actions the application performs, such as creating a booking or cancelling an order.</li>
<li><strong>Repositories:</strong> Define how the application accesses data without depending on a specific storage technology.</li>
<li><strong>Data sources:</strong> Implement the actual interactions with a backend API, database, or local storage.</li>
</ul>
<p>Example:</p>
<pre><code>CreateBookingUseCase
        ↓
BookingRepository interface
        ↓
BookingRepository implementation
        ↓
REST API / Local database</code></pre>
<p>A Booking entity might define valid booking statuses, while <code>CreateBookingUseCase</code> coordinates the operation.</p>
<p><strong>Interview tip:</strong> Entities contain business concepts, use cases coordinate business operations, repositories abstract data access, and data sources communicate with external systems.</p>`,
        },
        {
          id: "rn-dependency-inversion",
          q: "What is dependency inversion, and how can it help you replace an API service or database without rewriting the UI?",
          a: `<p>Dependency inversion means high-level business logic should depend on abstractions rather than concrete infrastructure implementations.</p>
<p>For example, a booking use case depends on a <code>BookingRepository</code> interface rather than directly importing an HTTP client.</p>
<pre><code>interface BookingRepository {
  getBooking(id: string): Promise&lt;Booking&gt;;
}

class GetBooking {
  constructor(private repository: BookingRepository) {}

  execute(id: string) {
    return this.repository.getBooking(id);
  }
}</code></pre>
<p>One implementation can use a REST API, another can use a mock repository for tests, and another could read from local storage.</p>
<p>The UI does not need to change as long as the interface and behavior remain consistent.</p>
<p><strong>Interview tip:</strong> Dependency inversion is the principle; dependency injection is one way to supply the concrete implementation.</p>`,
        },
        {
          id: "rn-repository-pattern",
          q: "What is the repository pattern, and when is it useful in a mobile application?",
          a: `<p>The repository pattern provides a consistent interface for retrieving and modifying application data while hiding the details of the underlying data source.</p>
<p>For example:</p>
<pre><code>interface BookingRepository {
  getBooking(id: string): Promise&lt;Booking&gt;;
  createBooking(input: CreateBookingInput): Promise&lt;Booking&gt;;
}</code></pre>
<p>The implementation might use an HTTP API, SQLite, or a combination of remote and local data.</p>
<p>It is useful when:</p>
<ul>
<li>The application supports offline data.</li>
<li>Several features access the same domain data.</li>
<li>Tests need mock implementations.</li>
<li>The data source may change.</li>
<li>Business logic should remain independent of networking details.</li>
</ul>
<p><strong>Important:</strong> A repository is not automatically necessary for every API call. In simpler applications, a well-organized API service may be sufficient.</p>`,
        },
        {
          id: "rn-dependency-injection",
          q: "What is dependency injection, and how would you apply it to React Native services?",
          a: `<p>Dependency injection means providing a component or service with the dependencies it needs instead of having it construct them internally.</p>
<p>For example:</p>
<pre><code>const repository = new ApiBookingRepository(apiClient);
const getBooking = new GetBooking(repository);</code></pre>
<p>The <code>GetBooking</code> use case receives its repository through the constructor.</p>
<p>In React Native, dependencies can be provided through:</p>
<ul>
<li>Constructor parameters.</li>
<li>A composition root or application setup module.</li>
<li>React Context for appropriate app-wide dependencies.</li>
<li>A dependency injection library when complexity justifies it.</li>
</ul>
<p>For testing, I can inject a mock repository instead of making real network requests.</p>
<p><strong>Interview tip:</strong> You don't need a DI framework for every project. Constructor injection and a clear application setup module are often enough.</p>`,
        },
        {
          id: "rn-design-system",
          q: "How would you design a reusable design system with typography, spacing, colors, themes, and component variants?",
          a: `<p>I would create centralized design tokens and build reusable components on top of them.</p>
<pre><code>export const colors = {
  primary: '#290849',
  background: '#FFFFFF',
  text: '#202020',
  error: '#B42318',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};</code></pre>
<p>Then reusable components such as <code>Button</code>, <code>Text</code>, <code>Input</code>, and <code>Card</code> would consume those tokens rather than repeating arbitrary values.</p>
<p>I would also define:</p>
<ul>
<li>Typography scales and font weights.</li>
<li>Light and dark themes.</li>
<li>Component variants such as primary, secondary, and destructive.</li>
<li>Consistent touch targets and accessibility behavior.</li>
<li>Design documentation and visual regression tests.</li>
</ul>
<p><strong>Interview tip:</strong> A design system is more than a collection of components. It includes design tokens, component rules, accessibility standards, and consistent usage patterns.</p>`,
        },
        {
          id: "rn-feature-modularization",
          q: "How would you implement feature-based modularization for a large team?",
          a: `<p>I would give each feature clear ownership of its screens, business logic, data access, and tests.</p>
<p>For example:</p>
<pre><code>features/
├── authentication/
├── bookings/
├── payments/
└── profile/</code></pre>
<p>I would define rules such as:</p>
<ul>
<li>Features should not import another feature's internal files directly.</li>
<li>Shared functionality belongs in an explicit shared module.</li>
<li>Each feature exposes a small public API.</li>
<li>Common linting, testing, and naming standards apply across teams.</li>
<li>Dependencies between features should be intentional.</li>
</ul>
<p>For a very large application, some features could become separate packages within a monorepo, but I would introduce that only when ownership, build boundaries, or team scale justify it.</p>
<p><strong>Interview tip:</strong> Modularization works when boundaries are enforced. Merely creating separate folders does not prevent tight coupling.</p>`,
        },
        {
          id: "rn-monolith-modular",
          q: "What are the trade-offs between a monolithic React Native application and a modular architecture?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Monolithic structure</th>
        <th>Modular architecture</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Simpler initial setup</td>
        <td>More upfront design</td>
      </tr>
      <tr>
        <td>Easy to start for small teams</td>
        <td>Better ownership for larger teams</td>
      </tr>
      <tr>
        <td>Can become tightly coupled as it grows</td>
        <td>Can isolate changes and dependencies</td>
      </tr>
      <tr>
        <td>Fewer abstractions</td>
        <td>Requires clear module boundaries</td>
      </tr>
      <tr>
        <td>Often simpler builds initially</td>
        <td>Package boundaries can add build and tooling complexity</td>
      </tr>
    </tbody>
  </table>
</div>
<p>I would begin with a well-structured application and introduce stronger module boundaries as the product and team grow.</p>
<p>A monolithic repository can still have excellent architecture. Conversely, a modular application can be difficult to maintain if modules are overly coupled.</p>
<p><strong>Interview tip:</strong> The goal is not maximum modularity; it is the right amount of modularity for the team's needs.</p>`,
        },
        {
          id: "rn-plugin-services",
          q: "How would you design a plugin-like architecture for analytics, payments, authentication, and notifications?",
          a: `<p>I would define interfaces for cross-cutting capabilities and provide concrete implementations behind them.</p>
<p>For example:</p>
<pre><code>interface AnalyticsService {
  track(event: string, properties?: object): void;
}

interface PaymentService {
  pay(amount: number): Promise&lt;PaymentResult&gt;;
}

interface NotificationService {
  requestPermission(): Promise&lt;boolean&gt;;
}</code></pre>
<p>Then I could provide implementations using tools such as Firebase Analytics, Mixpanel, Razorpay, or a push-notification provider without making every screen depend directly on those SDKs.</p>
<p>A simple structure:</p>
<pre><code>services/
├── analytics/
│   ├── AnalyticsService.ts
│   ├── FirebaseAnalytics.ts
│   └── MixpanelAnalytics.ts
├── payments/
│   ├── PaymentService.ts
│   └── RazorpayPayment.ts
└── notifications/</code></pre>
<p>The application setup chooses which implementations to register.</p>
<p><strong>Interview tip:</strong> This pattern reduces vendor coupling and makes testing easier. However, payments and authentication still need provider-specific security, lifecycle, and error-handling requirements.</p>`,
        },
        {
          id: "rn-js-or-native",
          q: "How would you decide whether functionality belongs in JavaScript or a native Android/iOS module?",
          a: `<p>I would first check whether an existing React Native library already supports the requirement reliably.</p>
<p>I would use JavaScript or TypeScript when the functionality involves:</p>
<ul>
<li>Business rules and application workflows.</li>
<li>API integration and data transformations.</li>
<li>UI composition and most application state.</li>
<li>Cross-platform logic that can be shared.</li>
</ul>
<p>I would consider native modules when functionality requires:</p>
<ul>
<li>An Android or iOS SDK without a suitable React Native wrapper.</li>
<li>Platform-specific APIs that are unavailable through JavaScript libraries.</li>
<li>Specialized native integrations or performance-sensitive native processing.</li>
<li>Custom operating-system behavior.</li>
</ul>
<p><strong>Interview tip:</strong> Don't move code to native solely because it seems faster. Measure the bottleneck and consider the cost of maintaining two platform implementations.</p>`,
        },
        {
          id: "rn-custom-native-module",
          q: "How would you design a custom native module that supports both Android and iOS?",
          a: `<p>I would define a consistent JavaScript-facing API and implement it separately on Android and iOS.</p>
<p>For example, a device-information module could expose:</p>
<pre><code>interface DeviceInfoModule {
  getDeviceName(): Promise&lt;string&gt;;
}</code></pre>
<p>My implementation process would be:</p>
<ol>
<li>Define the API and expected errors.</li>
<li>Create the typed module specification.</li>
<li>Implement the native functionality in Kotlin/Java and Swift/Objective-C++ as appropriate.</li>
<li>Use Codegen and TurboModules when working with the New Architecture.</li>
<li>Configure module discovery and native dependencies.</li>
<li>Add unit tests and test both platforms on real devices.</li>
</ol>
<p>The JavaScript interface should behave consistently even when the underlying native implementations differ.</p>
<p><strong>Interview tip:</strong> Define platform-independent behavior first. Don't expose unnecessary native implementation details to the JavaScript layer.</p>`,
        },
        {
          id: "rn-turbo-vs-fabric",
          q: "What is the difference between a TurboModule and a Fabric native component?",
          a: `<p>Both belong to React Native's New Architecture, but they serve different purposes.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>TurboModule</th>
        <th>Fabric native component</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Exposes native functionality</td>
        <td>Exposes native UI</td>
      </tr>
      <tr>
        <td>Called through an API</td>
        <td>Rendered within the React component tree</td>
      </tr>
      <tr>
        <td>Example: device information or a native SDK wrapper</td>
        <td>Example: custom native map or video view</td>
      </tr>
      <tr>
        <td>Uses typed module specifications and Codegen</td>
        <td>Uses typed component specifications and Codegen</td>
      </tr>
    </tbody>
  </table>
</div>
<p>A TurboModule might return device information to JavaScript. A Fabric component might render a custom native map with properties, events, and native UI behavior.</p>
<p><strong>Interview tip:</strong> Think of TurboModules as native services and Fabric components as native visual elements.</p>`,
        },
        {
          id: "rn-env-secrets",
          q: "How would you manage environment-specific configuration, secrets, feature flags, and build-time settings?",
          a: `<p>I separate configuration according to its purpose.</p>
<ul>
<li><strong>Environment configuration:</strong> API base URLs and environment names for development, staging, and production.</li>
<li><strong>Secrets:</strong> Private credentials kept on a trusted backend or in appropriate secure infrastructure.</li>
<li><strong>Feature flags:</strong> Runtime controls for enabling or disabling features.</li>
<li><strong>Build-time settings:</strong> Bundle identifiers, app display names, signing settings, and native build configuration.</li>
</ul>
<p>Example:</p>
<pre><code>config/
├── development.ts
├── staging.ts
└── production.ts</code></pre>
<p>I would validate required configuration during startup or build time, avoid logging sensitive values, and use CI/CD to supply the correct environment settings.</p>
<p><strong>Important:</strong> Values embedded in a mobile application can generally be extracted. API keys or configuration shipped with the app must not be treated as confidential server secrets.</p>`,
        },
        {
          id: "rn-migrate-architecture",
          q: "How would you safely migrate a legacy React Native application to the New Architecture or a newer SDK version?",
          a: `<p>I would use a controlled, incremental migration rather than upgrading every dependency and changing architecture settings simultaneously.</p>
<p>My approach:</p>
<ol>
<li>Establish a baseline with passing tests and a working release build.</li>
<li>Review React Native upgrade notes and the compatibility of all native dependencies.</li>
<li>Upgrade the React Native version and required tooling in a controlled sequence.</li>
<li>Migrate or replace incompatible native modules.</li>
<li>Enable the New Architecture when the target version and dependencies support the intended configuration.</li>
<li>Test authentication, navigation, notifications, payments, deep links, and other native integrations.</li>
<li>Compare crash rates, performance, and build reliability against the baseline.</li>
<li>Release progressively where the distribution process permits and monitor production telemetry.</li>
</ol>
<p>For iOS, I would verify CocoaPods and Xcode compatibility. For Android, I would verify Gradle, AGP, JDK, SDK, NDK, and CMake requirements.</p>
<p><strong>Interview tip:</strong> A successful local build is not sufficient. The migration must also pass release-build testing on both platforms and preserve important production workflows.</p>`,
        },
        {
          id: "rn-testable-layers",
          q: "How would you design architecture boundaries so that navigation, state management, networking, and business logic can be tested independently?",
          a: `<p>I would ensure each layer has a clear responsibility and that business logic does not directly depend on UI frameworks or network implementation details.</p>
<p>For example:</p>
<pre><code>Screen
  ↓
Hook / View Model
  ↓
Use Case
  ↓
Repository Interface
  ↓
API or Local Storage Implementation</code></pre>
<p>I would test each layer separately:</p>
<ul>
<li><strong>UI tests:</strong> Verify rendering, interactions, and accessibility.</li>
<li><strong>Hook tests:</strong> Verify UI-facing state and behavior.</li>
<li><strong>Use-case tests:</strong> Test business rules without React Native or network dependencies.</li>
<li><strong>Repository tests:</strong> Verify API mapping, persistence, and error handling.</li>
<li><strong>Navigation tests:</strong> Verify route transitions and protected flows.</li>
<li><strong>Integration tests:</strong> Verify that the layers work together.</li>
</ul>
<p>I would inject dependencies where needed and use mock repositories or test API clients to avoid making real network calls in unit tests.</p>
<p><strong>Interview-ready answer:</strong> “I isolate business logic from UI and infrastructure, use repository interfaces for data access, and inject dependencies so each layer can be tested independently. This makes the application easier to maintain and safer to change as the product grows.”</p>`,
        },
        {
          id: "rn-arch-revision",
          q: "Quick revision — Architecture principles",
          a: `<p>Make sure you can explain these distinctions in your own words:</p>
<ol>
<li>Feature-based architecture vs layer-based architecture.</li>
<li>Separation of concerns vs Clean Architecture.</li>
<li>Dependency inversion vs dependency injection.</li>
<li>Repository pattern vs API service.</li>
<li>UI components vs business logic vs data access.</li>
<li>Modularization and public module interfaces.</li>
<li>Design systems and shared component libraries.</li>
<li>JavaScript modules vs native modules.</li>
<li>TurboModules vs Fabric components.</li>
<li>Incremental migration and independent testing.</li>
</ol>`,
        },
        {
          id: "rn-http-fetch-axios",
          q: "How does HTTP networking work in React Native, and what is the role of fetch or Axios?",
          a: `<p>React Native sends HTTP requests from JavaScript to a backend API over the network. The server processes the request and returns an HTTP response containing a status code, headers, and usually a response body.</p>
<ul>
<li><code>fetch</code> is the built-in API for making HTTP requests.</li>
<li>Axios is a third-party HTTP client that adds conveniences such as interceptors, automatic JSON handling, and request/response configuration.</li>
<li>Both support methods such as GET, POST, PUT, PATCH, and DELETE.</li>
</ul>
<p>Example using Axios:</p>
<pre><code>import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getProfile = async () =&gt; {
  const response = await api.get('/profile');
  return response.data;
};</code></pre>
<p><strong>Important interview point:</strong> HTTP errors such as 401 or 500 are not automatically thrown by <code>fetch</code>; you need to check <code>response.ok</code>. Axios rejects its promise by default for non-2xx status codes.</p>
<p>Also, network calls are asynchronous, so loading, success, error, timeout, and cancellation states should be handled appropriately.</p>`,
        },
        {
          id: "rn-token-refresh",
          q: "How would you implement token-based authentication and refresh expired access tokens?",
          a: `<p>Token-based authentication commonly uses two tokens:</p>
<ul>
<li><strong>Access token:</strong> Short-lived token sent with API requests.</li>
<li><strong>Refresh token:</strong> Longer-lived credential used to obtain a new access token.</li>
</ul>
<p>Typical flow:</p>
<pre><code>User logs in → Server returns tokens
Send access token with API request
Access token expires → API returns 401
Refresh token → Obtain new access token
Retry original request</code></pre>
<p>In a React Native app, I would:</p>
<ol>
<li>Attach the access token through an Axios request interceptor.</li>
<li>Store sensitive refresh credentials in Keychain/Keystore-backed secure storage.</li>
<li>Use a response interceptor to handle 401 responses.</li>
<li>Refresh the access token and retry the failed request once.</li>
<li>Log the user out if refreshing fails or the refresh token is revoked.</li>
</ol>
<p>Example of attaching the token:</p>
<pre><code>api.interceptors.request.use(async config =&gt; {
  const token = await getAccessToken();

  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }

  return config;
});</code></pre>
<p>Here, <code>getAccessToken()</code> represents your token-storage abstraction. Avoid placing refresh tokens in ordinary, unencrypted storage.</p>
<p><strong>Important:</strong> Do not refresh indefinitely or retry a refresh request through the same refresh interceptor without safeguards. That can create an infinite loop.</p>`,
        },
        {
          id: "rn-single-flight-refresh",
          q: "How do you handle simultaneous API requests when the authentication token expires?",
          a: `<p>Suppose five API requests receive 401 responses at almost the same time. If every request independently refreshes the token, the server may receive five refresh requests. With refresh-token rotation, some of those requests may invalidate one another.</p>
<p>The solution is a single-flight refresh mechanism: only one refresh request runs at a time, and all failed requests wait for its result.</p>
<pre><code>let refreshPromise: Promise&lt;string&gt; | null = null;

async function getFreshToken(): Promise&lt;string&gt; {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken()
      .finally(() =&gt; {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}</code></pre>
<p>Each failed request waits for <code>getFreshToken()</code>, updates its authorization header, and retries once.</p>
<p>Production safeguards:</p>
<ul>
<li>Exclude the refresh endpoint from normal refresh handling.</li>
<li>Mark retried requests so they cannot loop.</li>
<li>Queue requests while refresh is in progress.</li>
<li>If refresh fails, clear the session and redirect to login.</li>
<li>Avoid replaying non-idempotent requests blindly if the server may already have processed them.</li>
</ul>
<p><strong>Interview takeaway:</strong> One refresh request, multiple waiting requests, one controlled retry per request.</p>`,
        },
        {
          id: "rn-local-storage-tools",
          q: "What is the difference between AsyncStorage, SecureStore, Keychain, Keystore, and SQLite?",
          a: `<p>These tools serve different purposes. The key distinction is how data is stored, how it is protected, and how it is queried.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Technology</th>
        <th>Main purpose</th>
        <th>Security / capability</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>AsyncStorage</th>
        <td>Small persistent key-value data</td>
        <td>Not encrypted by default</td>
      </tr>
      <tr>
        <th>Expo SecureStore</th>
        <td>Store small secrets securely</td>
        <td>Uses platform secure-storage facilities</td>
      </tr>
      <tr>
        <th>iOS Keychain</th>
        <td>Store credentials and secrets</td>
        <td>Protected credential storage managed by iOS</td>
      </tr>
      <tr>
        <th>Android Keystore</th>
        <td>Protect cryptographic keys</td>
        <td>Keys can be non-exportable; hardware protection depends on the device</td>
      </tr>
      <tr>
        <th>SQLite</th>
        <td>Structured relational data</td>
        <td>Supports queries and transactions; encryption requires additional measures</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Examples:</p>
<ul>
<li><strong>AsyncStorage:</strong> onboarding completed, non-sensitive preferences.</li>
<li><strong>SecureStore/Keychain:</strong> refresh tokens, credentials, sensitive small values.</li>
<li><strong>Keystore:</strong> cryptographic keys used to encrypt or sign data.</li>
<li><strong>SQLite:</strong> cached feeds, bookings, drafts, and structured offline data.</li>
</ul>
<p>Example with Expo SecureStore:</p>
<pre><code>import * as SecureStore from 'expo-secure-store';

await SecureStore.setItemAsync('refreshToken', token);

const refreshToken =
  await SecureStore.getItemAsync('refreshToken');</code></pre>
<p><strong>Important distinction:</strong> Keychain and Keystore are not interchangeable. Keychain stores credentials and other protected items on iOS; Android Keystore primarily manages cryptographic keys. An Android app can use encrypted storage with a key protected by Keystore.</p>
<p>SQLite is not automatically secure merely because it is a database. If sensitive data is stored there, assess encryption, access controls, backups, and data-retention requirements.</p>`,
        },
        {
          id: "rn-never-plaintext",
          q: "What information should never be stored in plain-text local storage?",
          a: `<p>Never store sensitive credentials or secrets in unencrypted storage such as ordinary AsyncStorage.</p>
<p>Examples include:</p>
<ul>
<li>Passwords and refresh tokens.</li>
<li>Private API keys, client secrets, and signing keys.</li>
<li>Payment credentials or card security codes.</li>
<li>Highly sensitive personal or medical information.</li>
<li>Session cookies or other credentials that grant account access.</li>
</ul>
<p>Use secure storage for small secrets and appropriate encrypted storage for sensitive records.</p>
<p>For example, in a medical app, a cached feed may be acceptable in a local database after a privacy assessment, but patient records require stronger protection and careful retention controls.</p>
<p><strong>Interview point:</strong> A value is not safe merely because it is stored on a user's device. Apps can be inspected, devices can be compromised, and backups or logs can expose data.</p>
<p>Also, a public API key embedded in a mobile app cannot be treated as a confidential secret. Restrict it by platform, application identifier, and permitted APIs where supported.</p>`,
        },
        {
          id: "rn-offline-caching",
          q: "How would you design offline caching for a mobile application?",
          a: `<p>I would use a local persistence layer as the source of data for the offline experience, while synchronizing it with the backend when connectivity is available.</p>
<p>A typical architecture:</p>
<pre><code>Screen / UI
Repository
Local database
Remote API</code></pre>
<p>Repository reads cached data and coordinates synchronization with the server.</p>
<p>My implementation would include:</p>
<ol>
<li>Cache API responses in SQLite or another suitable persistent database.</li>
<li>Render cached content immediately when possible.</li>
<li>Fetch fresh data when appropriate.</li>
<li>Store pending user actions in a durable outbox.</li>
<li>Synchronize queued actions when the network is usable.</li>
<li>Resolve conflicts using server versions, timestamps, or domain-specific rules.</li>
<li>Define cache expiration, deletion, and sensitive-data policies.</li>
</ol>
<p>For example, a booking app could show previously loaded bookings offline and allow a user to draft a new service request. The app should clearly distinguish a locally saved draft from a booking confirmed by the server.</p>
<p><strong>Important:</strong> Do not tell users that an operation succeeded on the server when it has only been saved locally.</p>`,
        },
        {
          id: "rn-cache-strategies",
          q: "What is the difference between cache-first, network-first, and stale-while-revalidate?",
          a: `<p>These are caching strategies that determine whether the app prefers local data or fresh server data.</p>
<p><strong>Cache-first</strong></p>
<p>Read the cache first. Request the network only when cached data is missing or invalid, depending on the implementation.</p>
<p>Best for: relatively stable reference data, such as service categories.</p>
<p><strong>Network-first</strong></p>
<p>Try the server first. If the request fails, fall back to a valid cached response.</p>
<p>Best for: information where freshness matters, such as available appointment slots.</p>
<p><strong>Stale-while-revalidate</strong></p>
<p>Show cached data immediately, then fetch fresh data in the background and update the UI.</p>
<p>Best for: feeds, product listings, and community content.</p>
<p>Example: When opening a community feed, I would show the last cached feed immediately and refresh it in the background. If the network fails, the user can still read previously loaded content.</p>
<p>The strategy should be selected per data type, not applied universally. Availability, payment status, and other critical data may require server confirmation before an action is accepted.</p>`,
        },
        {
          id: "rn-offline-outbox",
          q: "How would you queue offline user actions and synchronize them when connectivity returns?",
          a: `<p>I would use a durable offline outbox instead of keeping pending actions only in memory.</p>
<p>Each queued operation could contain:</p>
<pre><code>type PendingAction = {
  id: string;
  type: 'CREATE_BOOKING' | 'UPDATE_PROFILE';
  payload: Record&lt;string, unknown&gt;;
  createdAt: number;
  retryCount: number;
  status: 'pending' | 'syncing' | 'failed';
};</code></pre>
<p>The workflow:</p>
<ol>
<li>Save the action and update the local UI.</li>
<li>Mark it as pending synchronization.</li>
<li>When connectivity is available, read pending actions from the database.</li>
<li>Send them to the API in the correct order when ordering matters.</li>
<li>Mark successful operations as synced.</li>
<li>Retry temporary failures with exponential backoff.</li>
<li>Show permanent failures and provide a recovery option.</li>
</ol>
<p>For operations such as creating a booking, use a unique idempotency key if the backend supports it. That prevents duplicate bookings when a request succeeds on the server but the app never receives the response.</p>
<p>Connectivity detection can be implemented with <code>@react-native-community/netinfo</code>, but the app should still handle request timeouts and server failures.</p>
<p><strong>Important:</strong> A queued action is not automatically successful. For example, a booking should be displayed as Pending confirmation until the server confirms it.</p>`,
        },
        {
          id: "rn-sync-conflicts",
          q: "How do you resolve conflicts when local and server data have both changed?",
          a: `<p>A conflict occurs when the same record is modified locally and remotely before synchronization completes.</p>
<p>Common strategies include:</p>
<ul>
<li><strong>Last-write-wins:</strong> The version with the latest accepted timestamp wins. Simple, but can discard meaningful changes.</li>
<li><strong>Server-wins:</strong> The server's version replaces the local version.</li>
<li><strong>Client-wins:</strong> The local version overrides the server's version. Use cautiously.</li>
<li><strong>Field-level merge:</strong> Combine non-conflicting changes.</li>
<li><strong>Manual resolution:</strong> Ask the user to choose when changes cannot safely be merged.</li>
</ul>
<p>For robust synchronization, records can include metadata such as:</p>
<pre><code>type SyncRecord = {
  id: string;
  version: number;
  updatedAt: string;
  syncStatus: 'synced' | 'pending' | 'conflict';
};</code></pre>
<p>The client sends the version it originally read. The server can reject an outdated update with a conflict response, such as 409 Conflict, so the client can fetch the latest version and reconcile the changes.</p>
<p><strong>Interview example:</strong> If a user edits a profile offline while the same profile is changed on another device, I would compare versions and merge non-conflicting fields. For critical information, I would avoid silently overwriting changes.</p>
<p>The server should ultimately enforce conflict rules because client clocks can be incorrect and client-side logic cannot guarantee consistency across devices.</p>`,
        },
        {
          id: "rn-netinfo",
          q: "How do you detect network connectivity changes, and why doesn't connectivity status guarantee that an API is reachable?",
          a: `<p>In React Native, I commonly use <code>@react-native-community/netinfo</code> to observe connectivity changes.</p>
<pre><code>import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export function useNetworkStatus() {
  const [isConnected, setIsConnected] =
    useState&lt;boolean | null&gt;(null);

  useEffect(() =&gt; {
    const unsubscribe = NetInfo.addEventListener(state =&gt; {
      setIsConnected(state.isConnected);
    });

    return unsubscribe;
  }, []);

  return isConnected;
}</code></pre>
<p>This tells us whether the device appears connected to a network. However, it does not guarantee that the backend is reachable.</p>
<p>For example:</p>
<ul>
<li>Wi-Fi is connected, but the internet is unavailable.</li>
<li>The internet works, but the API server is down.</li>
<li>DNS resolution fails.</li>
<li>A VPN, firewall, or proxy blocks the request.</li>
<li>The server responds too slowly and the request times out.</li>
</ul>
<p>NetInfo also exposes <code>isInternetReachable</code>, which can provide additional information when available, but it is still not proof that a specific API endpoint is working.</p>
<p><strong>Best practice:</strong> Use connectivity status to improve the user experience, but treat the actual API response as authoritative. Handle timeouts, retries, and offline states independently.</p>`,
        },
        {
          id: "rn-secure-session",
          q: "How do you securely handle authentication tokens, sensitive data, and user sessions?",
          a: `<p>I would implement security at multiple layers rather than relying on a single storage mechanism.</p>
<ol>
<li><strong>Token storage:</strong> Store refresh tokens in platform-backed secure storage. Keep access tokens in memory where practical, or use an appropriate protected storage strategy if persistence is required.</li>
<li><strong>HTTPS:</strong> Send authentication credentials only over properly validated HTTPS connections.</li>
<li><strong>Token lifetime:</strong> Use short-lived access tokens and refresh-token rotation where supported by the backend.</li>
<li><strong>Session management:</strong> Handle expiration, revocation, and refresh failure consistently.</li>
<li><strong>Authorization:</strong> Validate user permissions on the backend. Hiding a screen is not authorization.</li>
<li><strong>Sensitive data:</strong> Minimize local copies, protect cached records, and clear them according to the app's data-retention policy.</li>
<li><strong>App lifecycle:</strong> Consider re-authentication or additional protection when returning from the background for sensitive operations.</li>
</ol>
<p>Example:</p>
<pre><code>async function getAuthenticatedData() {
  const token = await getAccessToken();

  const response = await fetch(
    'https://api.example.com/profile',
    {
      headers: {
        Authorization: \`Bearer \${token}\`,
      },
    },
  );

  if (response.status === 401) {
    // Attempt controlled token refresh,
    // or end the session if refresh fails.
  }

  return response;
}</code></pre>
<p>This is only the request portion; the complete implementation must also handle network errors, non-2xx responses, and refresh concurrency.</p>
<p><strong>Interview takeaway:</strong> Secure storage protects credentials at rest; TLS protects data in transit; backend authorization controls access; session management handles the entire token lifecycle.</p>`,
        },
        {
          id: "rn-tls-pinning",
          q: "What are certificate pinning and TLS, and what are their limitations?",
          a: `<p>TLS (Transport Layer Security) encrypts communication between the app and the server. It also helps authenticate the server using certificates and certificate-chain validation.</p>
<p>Certificate pinning adds another verification step: the app checks that the server's certificate or public key matches a value it trusts, rather than relying exclusively on the device's normal certificate trust store.</p>
<p>The distinction:</p>
<ul>
<li>TLS is a fundamental transport-security mechanism.</li>
<li>Pinning is an additional restriction on which server identity the app accepts.</li>
</ul>
<p>For example, pinning may help defend against certain man-in-the-middle attacks when a device has an untrusted or malicious certificate authority installed.</p>
<p>However, pinning has limitations:</p>
<ul>
<li>Incorrectly managed pins can prevent legitimate connections after certificate rotation.</li>
<li>A backup pin and a reliable rotation strategy are important.</li>
<li>Implementation differs across networking libraries and native platforms.</li>
<li>Pinning does not protect against a compromised device, a modified app, or every form of runtime instrumentation.</li>
<li>Pinning does not replace backend authorization or secure token storage.</li>
</ul>
<p><strong>Interview answer:</strong> I would keep TLS certificate validation enabled in all environments, never disable it to fix certificate errors, and introduce pinning only when the threat model justifies its maintenance cost.</p>`,
        },
        {
          id: "rn-redact-logs",
          q: "How do you prevent sensitive information from appearing in logs, crash reports, or analytics events?",
          a: `<p>I would establish a centralized logging and analytics policy that explicitly excludes secrets and sensitive personal data.</p>
<p>Never log:</p>
<ul>
<li>Access tokens, refresh tokens, or authorization headers.</li>
<li>Passwords, OTPs, or session cookies.</li>
<li>Payment credentials.</li>
<li>Full medical records or unnecessary personal identifiers.</li>
<li>Sensitive request or response bodies.</li>
</ul>
<p>Instead of logging an entire request:</p>
<pre><code>// Avoid
console.log('API request:', config);</code></pre>
<p>Log safe diagnostic metadata:</p>
<pre><code>logger.info('API request failed', {
  endpoint: '/profile',
  statusCode: 500,
  requestId,
});</code></pre>
<p>Additional precautions:</p>
<ul>
<li>Redact sensitive fields in logging and network interceptors.</li>
<li>Review Crashlytics breadcrumbs and attached metadata.</li>
<li>Send only necessary, appropriately anonymized analytics properties.</li>
<li>Use consistent production logging levels.</li>
<li>Avoid exposing secrets in error messages or screenshots.</li>
<li>Apply access controls and retention limits to monitoring dashboards.</li>
</ul>
<p>For example, when tracking a booking event in Mixpanel, record the event name and non-sensitive properties needed for analysis—not a user's authentication token or full personal details.</p>
<p><strong>Important:</strong> Removing <code>console.log</code> statements alone is not enough. Errors, HTTP interceptors, crash reports, and analytics events can also leak information.</p>`,
        },
        {
          id: "rn-secure-deeplinks",
          q: "How would you protect deep links and navigation routes that perform sensitive operations?",
          a: `<p>Deep links allow an external URL to open a particular screen in the app. They are useful, but an incoming link must not be treated as proof that a user is authorized to perform an operation.</p>
<p>I would implement the following safeguards:</p>
<ol>
<li>Use Universal Links on iOS and verified Android App Links where appropriate.</li>
<li>Validate the URL, route, parameters, and expected data types.</li>
<li>Require authentication before accessing protected screens.</li>
<li>Verify authorization and resource ownership on the backend.</li>
<li>Treat sensitive link parameters as untrusted input.</li>
<li>Avoid putting access tokens, passwords, or confidential information in URLs.</li>
<li>Require confirmation or fresh authentication for sensitive operations when appropriate.</li>
</ol>
<p>Example:</p>
<pre><code>async function openBooking(bookingId: string) {
  if (!/^[a-zA-Z0-9_-]+$/.test(bookingId)) {
    throw new Error('Invalid booking ID');
  }

  // The API must still verify that the
  // authenticated user can access this booking.
  return api.get(\`/bookings/\${bookingId}\`);
}</code></pre>
<p>In a real app, the validation rule should match the actual booking ID format.</p>
<p>For payment, account deletion, or other high-impact actions, opening a deep link should generally take the user to a confirmation or authentication screen rather than immediately performing the action.</p>
<p><strong>Key point:</strong> Navigation guards improve the UI experience, but backend authorization is the actual security boundary.</p>`,
        },
        {
          id: "rn-secure-logout",
          q: "How would you implement secure logout, including token invalidation, local-data cleanup, and navigation reset?",
          a: `<p>Secure logout must clear the local session and, when supported, invalidate the server-side session or refresh token.</p>
<p>I would follow this sequence:</p>
<ol>
<li>Immediately transition the UI to a signed-out state and block authenticated actions.</li>
<li>Attempt to revoke the refresh token or server session.</li>
<li>Clear access and refresh tokens from memory and secure storage.</li>
<li>Clear user-specific caches, persisted state, and sensitive local data according to the retention policy.</li>
<li>Reset navigation so protected screens cannot be reached through the previous navigation history.</li>
<li>Clear authenticated network state and pending user-specific operations as appropriate.</li>
</ol>
<p>Example:</p>
<pre><code>async function logout() {
  const refreshToken = await getRefreshToken();

  // Immediately remove authenticated UI access.
  authStore.getState().clearSession();

  try {
    if (refreshToken) {
      await revokeSession(refreshToken);
    }
  } catch (error) {
    // Log only safe diagnostic information.
    // Local logout must still proceed.
  } finally {
    await clearSecureTokens();
    await clearUserCache();
    navigationRef.resetRoot({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }
}</code></pre>
<p>The functions shown are application-specific abstractions, not built-in React Native APIs. The session should also be invalidated server-side where possible; deleting local tokens alone does not invalidate a stolen token.</p>
<p>For offline logout, I would clear local credentials immediately and handle server revocation according to the backend's supported mechanism. I would not retain a usable refresh token merely because the device is offline.</p>
<p>Important edge cases:</p>
<ul>
<li>Prevent requests from an old session from updating the new session's UI.</li>
<li>Clear account-specific Redux/Zustand persisted state.</li>
<li>Handle logout from multiple devices if supported.</li>
<li>Ensure one user's cached data cannot appear after another user logs in.</li>
<li>Define what happens to unsynchronized drafts or queued operations before deleting them.</li>
</ul>`,
        },
        {
          id: "rn-networking-revision",
          q: "Quick revision: what to remember in an interview",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Topic</th>
        <th>Main point</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>HTTP clients</th>
        <td>Axios provides interceptors and convenient error handling; <code>fetch</code> is built in.</td>
      </tr>
      <tr>
        <th>Token refresh</th>
        <td>One shared refresh operation; retry failed requests only once.</td>
      </tr>
      <tr>
        <th>Local storage</th>
        <td>AsyncStorage is not secure storage; Keychain/Keystore protect credentials or cryptographic keys.</td>
      </tr>
      <tr>
        <th>Offline mode</th>
        <td>Use a persistent cache and durable outbox; distinguish pending from confirmed actions.</td>
      </tr>
      <tr>
        <th>Conflict resolution</th>
        <td>Use versions and explicit merge rules; let the server enforce consistency.</td>
      </tr>
      <tr>
        <th>Connectivity</th>
        <td>Network status is a hint; actual requests determine API reachability.</td>
      </tr>
      <tr>
        <th>TLS and pinning</th>
        <td>TLS is essential; pinning adds operational complexity.</td>
      </tr>
      <tr>
        <th>Logging</th>
        <td>Redact secrets centrally across logs, crashes, and analytics.</td>
      </tr>
      <tr>
        <th>Deep links</th>
        <td>Validate inputs and authorize sensitive operations on the server.</td>
      </tr>
    </tbody>
  </table>
</div>`,
        },
        {
          id: "rn-test-types",
          q: "What is the difference between unit, integration, component, and end-to-end testing?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Testing type</th>
        <th>What it tests</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Unit</th>
        <td>A small, isolated function or module</td>
        <td>Testing a price calculation function</td>
      </tr>
      <tr>
        <th>Component</th>
        <td>A UI component's rendering and behavior</td>
        <td>Tapping a button updates the screen</td>
      </tr>
      <tr>
        <th>Integration</th>
        <td>Multiple modules working together</td>
        <td>A screen, Redux store, and API service working together</td>
      </tr>
      <tr>
        <th>End-to-end (E2E)</th>
        <td>A complete user journey in a running app</td>
        <td>Login → select vehicle → book service → payment</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Example from a bike servicing app:</p>
<ul>
<li><strong>Unit test:</strong> Verify that a booking total includes the correct service charges.</li>
<li><strong>Component test:</strong> Verify that selecting a service highlights the selected option.</li>
<li><strong>Integration test:</strong> Verify that selecting a vehicle updates the booking state.</li>
<li><strong>E2E test:</strong> Complete a booking flow on an Android emulator or iOS simulator.</li>
</ul>
<p>I would use unit and component tests frequently because they are fast, integration tests for important boundaries, and E2E tests for critical user journeys.</p>
<p><strong>Interview takeaway:</strong> Unit tests verify logic, component tests verify UI behavior, integration tests verify collaboration, and E2E tests verify the complete flow.</p>`,
        },
        {
          id: "rn-jest-rntl",
          q: "How do you test React Native components using Jest and React Native Testing Library?",
          a: `<p>Jest runs tests and provides assertions, mocks, and test utilities. React Native Testing Library (RNTL) lets us render components and interact with them in a way similar to how users do.</p>
<p>Example:</p>
<pre><code>import { render, screen, fireEvent } from
  '@testing-library/react-native';

import LoginButton from './LoginButton';

test('calls onLogin when pressed', () =&gt; {
  const onLogin = jest.fn();

  render(&lt;LoginButton onLogin={onLogin} /&gt;);

  fireEvent.press(
    screen.getByRole('button', { name: 'Login' })
  );

  expect(onLogin).toHaveBeenCalledTimes(1);
});</code></pre>
<p>This test verifies the user's interaction rather than the component's internal implementation.</p>
<p>For async behavior, I would use <code>findBy...</code> queries or <code>waitFor</code> when an element or state change appears asynchronously.</p>
<p>Best practices:</p>
<ul>
<li>Prefer accessible queries such as role and label.</li>
<li>Test loading, success, empty, and error states.</li>
<li>Mock external dependencies only where needed.</li>
<li>Avoid testing implementation details that may change during refactoring.</li>
</ul>`,
        },
        {
          id: "rn-mock-deps",
          q: "How do you mock network requests, native modules, and device APIs during tests?",
          a: `<p>Mocking replaces an external dependency with a predictable implementation so tests do not rely on a real server, GPS, camera, or native runtime.</p>
<p><strong>Mock a network request</strong></p>
<pre><code>global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  status: 200,
  json: async () =&gt; ({ name: 'Nitin' }),
} as Response);</code></pre>
<p><strong>Mock a native module</strong></p>
<p>For a native dependency, I would use the library's recommended Jest mock or create a manual mock in the test setup.</p>
<p>For example, a camera module can return a predictable permission status instead of opening the device camera.</p>
<p><strong>Mock a device API</strong></p>
<p>For location, I can mock the geolocation response with fixed coordinates and test how the app handles permission denial, success, and failure.</p>
<p><strong>Important:</strong> A mock does not prove the real native implementation works. I would also validate native integrations in simulator/emulator tests and on physical devices where hardware behavior matters.</p>
<p>For larger test suites, a tool such as Mock Service Worker can simulate HTTP responses at the network boundary where its React Native setup is supported.</p>`,
        },
        {
          id: "rn-test-hooks-redux",
          q: "How would you test custom Hooks, Redux slices, asynchronous actions, and API services?",
          a: `<p>I would test each layer independently and then add integration tests where they interact.</p>
<p><strong>Custom Hooks:</strong> Use <code>renderHook</code> from React Native Testing Library or its supported hook-testing utilities. Test initial state, actions, and async updates.</p>
<p><strong>Redux slices:</strong> Test reducers as pure functions.</p>
<pre><code>const initialState = { count: 0 };

const nextState = counterReducer(
  initialState,
  increment()
);

expect(nextState.count).toBe(1);</code></pre>
<p><strong>Async actions:</strong> For a <code>createAsyncThunk</code> action, mock the API service and verify fulfilled, rejected, and loading-state behavior.</p>
<p><strong>API services:</strong> Mock the HTTP client and test request paths, parameters, response mapping, and error handling.</p>
<p>Example test cases:</p>
<ul>
<li>API returns data → state becomes fulfilled.</li>
<li>API rejects → state stores a safe error message.</li>
<li>Request is pending → loading indicator appears.</li>
<li>A request is cancelled → cancellation is handled without an unexpected error.</li>
<li>An older request finishes late → stale results do not overwrite newer data.</li>
</ul>
<p><strong>Interview point:</strong> Test business logic without rendering the whole app, and test user-visible outcomes at the component or integration level.</p>`,
        },
        {
          id: "rn-snapshot-vs-behavior",
          q: "What is the difference between snapshot testing and behavior-driven component testing?",
          a: `<p>Snapshot testing compares a rendered output against a previously saved representation. It can detect unexpected structural changes, but it does not explain whether the component behaves correctly.</p>
<p>Behavior-driven component testing verifies what users can observe and do.</p>
<p>Example:</p>
<pre><code>render(&lt;ServiceCard title="Bike Repair" /&gt;);

expect(
  screen.getByText('Bike Repair')
).toBeTruthy();</code></pre>
<p>For an interactive component, I would also test that pressing it triggers the expected action or changes the visible state.</p>
<p>Snapshots can be useful for stable, small presentational components, but large snapshots can become noisy and may be updated without carefully reviewing the change.</p>
<p><strong>My preference:</strong> Prioritize meaningful behavior tests. Use snapshots selectively as a supporting tool rather than treating snapshot coverage as proof of correctness.</p>`,
        },
        {
          id: "rn-test-navigation",
          q: "How do you test navigation flows and deep-link behavior?",
          a: `<p>I would test navigation at two levels:</p>
<ul>
<li><strong>Navigation integration tests:</strong> Verify that pressing a button navigates to the correct screen, passes the right parameters, and handles Back behavior correctly.</li>
<li><strong>E2E tests:</strong> Launch the actual app, open a deep link, and verify the resulting screen and user journey.</li>
</ul>
<p>Example using a navigation mock:</p>
<pre><code>const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () =&gt; ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () =&gt; ({
    navigate: mockNavigate,
  }),
}));</code></pre>
<p>Then verify that pressing the relevant button calls <code>mockNavigate</code> with the expected route and parameters.</p>
<p>For deep links, I would test:</p>
<ol>
<li>Valid links while the app is closed.</li>
<li>Valid links while the app is already open.</li>
<li>Invalid or malformed parameters.</li>
<li>Links to protected screens when logged out.</li>
<li>Expired authentication and unauthorized resource access.</li>
<li>Back navigation after a deep link opens.</li>
</ol>
<p>For example, opening a booking link should show that booking only after the app validates the link and the backend confirms that the authenticated user can access it.</p>
<p><strong>Important:</strong> A mocked navigation test cannot verify the complete operating-system deep-link configuration. Use device-level tests to validate Android App Links, iOS Universal Links, and app launch behavior.</p>`,
        },
        {
          id: "rn-detox-maestro",
          q: "What are Detox and Maestro, and when would you use end-to-end testing tools?",
          a: `<p>Both are tools for automating user journeys in a running mobile app.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Detox</th>
        <th>Maestro</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>A mobile E2E testing framework commonly used with React Native. Tests can interact with app elements, wait for UI synchronization, and run on simulators or emulators.</td>
        <td>A mobile UI automation framework that uses readable flow definitions to describe interactions such as tapping, typing, and asserting visible content.</td>
      </tr>
    </tbody>
  </table>
</div>
<p>I would use E2E tests for high-value flows such as:</p>
<ul>
<li>Login and logout.</li>
<li>Booking and payment.</li>
<li>Push-notification navigation.</li>
<li>Critical deep links.</li>
<li>App startup and permissions.</li>
</ul>
<p>Example Maestro flow:</p>
<pre><code>appId: com.example.motorep
---
- launchApp
- tapOn: "Book a Service"
- assertVisible: "Select Vehicle"</code></pre>
<p>The exact element labels and configuration depend on the app.</p>
<p><strong>Trade-off:</strong> E2E tests catch real integration issues but are slower and more sensitive to environment and UI changes than unit tests. I would keep the E2E suite focused on critical user journeys and use unit/component tests for detailed logic coverage.</p>`,
        },
        {
          id: "rn-device-matrix",
          q: "How do you test applications across different Android and iOS versions, screen sizes, and device configurations?",
          a: `<p>I would create a risk-based device matrix instead of testing every possible combination.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Test area</th>
        <th>What I would cover</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Operating systems</th>
        <td>Supported Android and iOS versions</td>
      </tr>
      <tr>
        <th>Screen sizes</th>
        <td>Small phones, standard phones, tablets</td>
      </tr>
      <tr>
        <th>Device configuration</th>
        <td>Different densities, safe areas, and aspect ratios</td>
      </tr>
      <tr>
        <th>Permissions</th>
        <td>Granted, denied, and restricted</td>
      </tr>
      <tr>
        <th>Network</th>
        <td>Online, offline, slow, and intermittent</td>
      </tr>
      <tr>
        <th>Lifecycle</th>
        <td>Foreground, background, resume, and process termination</td>
      </tr>
      <tr>
        <th>Hardware</th>
        <td>Camera, location, notifications, and biometric authentication when applicable</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Tools I would use include Android emulators, iOS simulators, physical devices, and cloud device farms where available.</p>
<p>For CI, I would run a smaller smoke-test matrix on every important change and broader device coverage on release candidates or scheduled builds.</p>
<p><strong>Important:</strong> Simulators are excellent for automated testing, but they cannot fully reproduce physical hardware, OEM-specific behavior, push-notification conditions, battery constraints, or every native integration. Critical features should also be tested on real devices.</p>`,
        },
        {
          id: "rn-crash-types",
          q: "What is the difference between a JavaScript exception, a native crash, an ANR, and an iOS watchdog termination?",
          a: `<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Issue</th>
        <th>Meaning</th>
        <th>Typical investigation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>JavaScript exception</th>
        <td>An error thrown by JavaScript or TypeScript at runtime</td>
        <td>Stack trace, source maps, error boundary</td>
      </tr>
      <tr>
        <th>Native crash</th>
        <td>Native code crashes, for example due to an invalid memory access</td>
        <td>Native crash report and symbols</td>
      </tr>
      <tr>
        <th>ANR</th>
        <td>Android detects that the app is not responding to an important system interaction</td>
        <td>Main-thread traces, blocking operations</td>
      </tr>
      <tr>
        <th>iOS watchdog termination</th>
        <td>iOS terminates an app that fails a system responsiveness or lifecycle requirement</td>
        <td>Termination reason, main-thread and lifecycle traces</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Examples:</p>
<ul>
<li><strong>JavaScript exception:</strong> Accessing a property on undefined.</li>
<li><strong>Native crash:</strong> A native module dereferences an invalid pointer.</li>
<li><strong>ANR:</strong> Heavy synchronous work blocks Android's main thread.</li>
<li><strong>Watchdog termination:</strong> The app takes too long to complete a critical launch or lifecycle operation.</li>
</ul>
<p>A JavaScript exception does not necessarily crash the whole app. Depending on where it occurs and how it is handled, the app may continue running or display an error screen.</p>
<p><strong>Interview takeaway:</strong> First classify the failure. A JavaScript stack trace, native crash report, ANR trace, and watchdog termination require different debugging approaches.</p>`,
        },
        {
          id: "rn-crashlytics-sentry",
          q: "How do you use Crashlytics, Sentry, and analytics to investigate production issues?",
          a: `<p>These tools provide different but complementary views.</p>
<ul>
<li><strong>Firebase Crashlytics:</strong> Tracks crashes, crash-free users/sessions, and non-fatal errors.</li>
<li><strong>Sentry:</strong> Provides error monitoring, stack traces, breadcrumbs, and performance tracing when configured.</li>
<li><strong>Analytics platforms:</strong> Reveal user journeys, event sequences, and behavioral patterns around a problem.</li>
</ul>
<p>My investigation process would be:</p>
<ol>
<li>Identify the affected app version, OS version, device model, and error frequency.</li>
<li>Check the stack trace and relevant breadcrumbs.</li>
<li>Determine whether the issue is limited to a specific screen, API response, or device configuration.</li>
<li>Reproduce the issue with the same conditions.</li>
<li>Fix the root cause and add a regression test.</li>
<li>Release the fix gradually and compare crash and error rates.</li>
</ol>
<p>For example, if a medical app starts crashing after a release, I would compare crash-free sessions by app version and inspect the first affected release. If the issue appears only on one OS version, I would investigate platform-specific code and native dependencies.</p>
<p><strong>Security point:</strong> Do not attach access tokens, medical records, or unnecessary personal information to crash reports or analytics events.</p>`,
        },
        {
          id: "rn-source-maps",
          q: "How do source maps and native debug symbols help diagnose production crashes?",
          a: `<p>React Native production code is often transformed and minified, making stack traces difficult to read.</p>
<p>JavaScript source maps map generated JavaScript positions back to the original source files and line numbers. They help turn an error in a minified bundle into something like <code>BookingScreen.tsx:42</code>.</p>
<p>Native debug symbols help translate native stack addresses into meaningful function names and locations. On iOS, this commonly involves dSYM files; on Android, native C/C++ crash reports may require unstripped libraries or corresponding symbol files.</p>
<p>For JavaScript crashes, I would:</p>
<ul>
<li>Generate the source map for the exact released bundle.</li>
<li>Upload it to the relevant monitoring platform.</li>
<li>Ensure the source map matches the bundle and release identifier.</li>
<li>Verify that the crash can be symbolicated.</li>
</ul>
<p>For native crashes, I would preserve the symbols associated with the exact binary.</p>
<p><strong>Critical point:</strong> Source maps and symbols must match the build that crashed. A source map from a later release may produce incorrect or misleading stack traces. I would also restrict access to source maps because they can expose original source code.</p>`,
        },
        {
          id: "rn-js-vs-native-error",
          q: "How do you distinguish a JavaScript bundle error from a native dependency or linking error?",
          a: `<p>I would identify the stage at which the failure occurs and inspect the corresponding logs.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Symptom</th>
        <th>Likely area to investigate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Metro reports a missing module</th>
        <td>JavaScript imports or dependency installation</td>
      </tr>
      <tr>
        <th>App builds but shows a JS error at runtime</th>
        <td>Bundle code, runtime assumptions, or incompatible JS package</td>
      </tr>
      <tr>
        <th>Android build fails during Gradle/CMake tasks</th>
        <td>Gradle configuration, native dependencies, NDK, or C++ compilation</td>
      </tr>
      <tr>
        <th>iOS build fails during pod installation or linking</th>
        <td>CocoaPods, framework linkage, deployment target, or native configuration</td>
      </tr>
      <tr>
        <th>App crashes immediately on launch</th>
        <td>Native initialization, missing configuration, incompatible library, or early JS startup failure</td>
      </tr>
    </tbody>
  </table>
</div>
<p>My debugging sequence:</p>
<ol>
<li>Reproduce the failure and capture the full error.</li>
<li>Identify whether it happens during dependency installation, compilation, linking, startup, or normal execution.</li>
<li>Check the relevant logs: Metro, Gradle, Xcode, or device logs.</li>
<li>Confirm the installed package versions and native configuration.</li>
<li>Compare the working and failing builds.</li>
<li>Fix the root cause rather than deleting lockfiles or changing multiple versions blindly.</li>
</ol>
<p>For example, <code>No XCFramework found</code> points toward a native dependency or packaging issue, while <code>Unable to resolve module</code> usually points toward JavaScript dependency resolution.</p>
<p><strong>Interview point:</strong> A JavaScript bundle error and a native linking error occur at different stages. The error's timing and build logs are the first clues.</p>`,
        },
        {
          id: "rn-cicd-pipeline",
          q: "How would you set up a CI/CD pipeline for React Native using Bitbucket Pipelines or GitHub Actions?",
          a: `<p>I would automate the checks that protect code quality first, then automate platform builds and releases.</p>
<p>A typical pipeline:</p>
<pre><code>Developer opens a pull request

Install dependencies from lockfiles

Lint + TypeScript checks + unit tests

Build Android / iOS artifacts

Smoke tests and artifact validation

Manual approval for production release

Publish and monitor rollout</code></pre>
<p>For GitHub Actions, I would use workflow files under <code>.github/workflows/</code>. For Bitbucket, I would configure <code>bitbucket-pipelines.yml</code>.</p>
<p>A good setup includes:</p>
<ul>
<li>Reproducible dependency installation.</li>
<li>Linting, type checking, and tests on pull requests.</li>
<li>Android builds on a suitable Linux runner.</li>
<li>iOS builds on macOS runners with Xcode installed.</li>
<li>Secure signing credentials and deployment tokens.</li>
<li>Artifact storage and clear build identifiers.</li>
<li>Separate development, staging, and production release workflows.</li>
</ul>
<p><strong>Important:</strong> A successful CI build does not guarantee that the app works on real devices. Combine automated builds with tests, release validation, and production monitoring.</p>`,
        },
        {
          id: "rn-ci-checks",
          q: "How do you automate linting, type checking, tests, Android builds, and iOS builds in CI?",
          a: `<p>I would define independent pipeline steps so failures are easy to diagnose and expensive builds run only when appropriate.</p>
<p>Example GitHub Actions workflow for JavaScript checks:</p>
<pre><code>name: React Native Checks

on:
  pull_request:
  push:
    branches: [main]

jobs:
  checks:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npx eslint .
      - run: npx tsc --noEmit
      - run: npm test -- --runInBand</code></pre>
<p>This is an illustrative workflow; the Node version, commands, and test configuration must match the repository. Pin third-party actions to trusted versions or immutable commit SHAs according to the team's security policy.</p>
<p>For Android, I would add a Linux job with the required JDK and Android SDK, then run the Gradle release or staging task.</p>
<p>For iOS, I would add a macOS job with the required Xcode version, install CocoaPods dependencies, and archive the app using the appropriate signing configuration.</p>
<p>Additional practices:</p>
<ul>
<li>Cache dependencies carefully without hiding lockfile changes.</li>
<li>Upload build artifacts even when useful diagnostics are needed after a failure.</li>
<li>Keep secrets out of logs and repository files.</li>
<li>Run release builds only after required checks pass.</li>
<li>Use separate signing and deployment permissions for protected branches.</li>
</ul>`,
        },
        {
          id: "rn-fastlane-eas",
          q: "What are Fastlane and Expo Application Services (EAS), and how can they help automate releases?",
          a: `<p>Fastlane automates mobile release tasks such as building, signing, uploading to app stores, managing screenshots, and distributing builds through configured workflows.</p>
<p>Expo Application Services (EAS) provides cloud build, submission, update, and related services for Expo and compatible React Native projects.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Tool</th>
        <th>Useful for</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Fastlane</th>
        <td>Customizable Android/iOS build and release automation</td>
      </tr>
      <tr>
        <th>EAS Build</th>
        <td>Managed cloud builds for configured Expo/React Native projects</td>
      </tr>
      <tr>
        <th>EAS Submit</th>
        <td>Automating submission of builds to supported app stores</td>
      </tr>
      <tr>
        <th>EAS Update</th>
        <td>Delivering compatible JavaScript and asset updates over the air</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Example Fastlane commands:</p>
<pre><code>bundle exec fastlane android beta
bundle exec fastlane ios beta</code></pre>
<p>The <code>android beta</code> and <code>ios beta</code> lanes must be defined in the project's Fastlane configuration.</p>
<p>Since React Native CLI projects can also use Fastlane, the choice depends on the existing architecture and release workflow. Expo projects may benefit from EAS, particularly when using Expo's update and build tooling.</p>
<p><strong>Interview point:</strong> These tools automate repetitive release work; they do not remove the need for signing configuration, store policies, testing, or safe rollout procedures.</p>`,
        },
        {
          id: "rn-ota-vs-store",
          q: "What is the difference between an OTA JavaScript update and a native application-store release?",
          a: `<p>An OTA (Over-the-Air) update delivers compatible JavaScript code and assets to an already-installed app without requiring a new store download.</p>
<p>A native store release delivers a new application binary through the Google Play Store or Apple App Store.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>OTA update</th>
        <th>Native store release</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Updates compatible JS and assets</td>
        <td>Updates the installed app binary</td>
      </tr>
      <tr>
        <td>Can deliver fixes quickly</td>
        <td>Required for native code or configuration changes</td>
      </tr>
      <tr>
        <td>Usually does not require store review for each update, subject to applicable rules</td>
        <td>Subject to store distribution and review requirements</td>
      </tr>
      <tr>
        <td>Must remain compatible with the installed native runtime</td>
        <td>Can include updated native dependencies and capabilities</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Example: If I fix a validation bug in a React Native screen, an OTA update may be appropriate. If I add a native SDK, change permissions, or introduce a new native module, I generally need a new native build.</p>
<p><strong>Important:</strong> OTA updates are not a way to bypass app-store policies. The update must comply with the relevant platform rules and the app's update-system requirements.</p>`,
        },
        {
          id: "rn-ota-limits",
          q: "What limitations and compatibility rules apply to OTA updates?",
          a: `<p>An OTA update can change only what the installed native app can support.</p>
<p>Key limitations:</p>
<ul>
<li><strong>Native compatibility:</strong> New JavaScript must work with the installed native modules and APIs.</li>
<li><strong>Runtime compatibility:</strong> The update must target the correct runtime or binary compatibility group.</li>
<li><strong>Store policies:</strong> Updates must follow applicable Apple and Google policies.</li>
<li><strong>Delivery and recovery:</strong> A failed update should not leave the app unusable.</li>
<li><strong>Testing:</strong> An update needs appropriate testing before being delivered to production.</li>
<li><strong>Security:</strong> Updates must be delivered through a trusted, integrity-protected mechanism.</li>
</ul>
<p>With Expo Updates/EAS Update, I would manage runtime versions so an update built for one native runtime is not accidentally delivered to an incompatible binary.</p>
<p>For example, adding a new native module requires a new native build. After that build is installed, compatible OTA updates can be delivered to that runtime.</p>
<p><strong>Interview takeaway:</strong> OTA updates can accelerate JavaScript fixes, but they cannot install new native capabilities into an already-installed binary.</p>`,
        },
        {
          id: "rn-versioning-signing",
          q: "How do you manage app version numbers, Android version codes, iOS build numbers, signing credentials, and release tracks?",
          a: `<p>I would separate the version users see from the internal build identifiers used by the platforms.</p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Setting</th>
        <th>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>App version</th>
        <td>User-facing release version, such as 1.2.0</td>
      </tr>
      <tr>
        <th>Android versionCode</th>
        <td>Integer used to distinguish Android releases; each uploaded release must use an acceptable new code</td>
      </tr>
      <tr>
        <th>iOS CFBundleShortVersionString</th>
        <td>User-facing version</td>
      </tr>
      <tr>
        <th>iOS CFBundleVersion</th>
        <td>Build identifier for the uploaded binary</td>
      </tr>
      <tr>
        <th>Signing credentials</th>
        <td>Establish app identity and authorize distribution</td>
      </tr>
      <tr>
        <th>Release track</th>
        <td>Determines who receives a build, such as internal testing, beta, or production</td>
      </tr>
    </tbody>
  </table>
</div>
<p>Example:</p>
<ul>
<li>App version: 1.2.0</li>
<li>Android version code: 15</li>
<li>iOS build number: 15</li>
</ul>
<p>These values are examples; the correct values depend on the project's release history.</p>
<p>I would keep signing credentials in a secure CI secret store or the approved signing service, never commit private signing material to the repository, and restrict who can access production credentials.</p>
<p>For Android, I would use the appropriate Play testing tracks before production. For iOS, I would use TestFlight before releasing through the App Store.</p>
<p><strong>Important:</strong> Uploading a build successfully does not mean it is live for all users. Track status, review status, rollout percentage, and store processing all matter.</p>`,
        },
        {
          id: "rn-ci-vs-local",
          q: "How would you investigate a build that works locally but fails in CI?",
          a: `<p>I would compare the environments systematically rather than making random configuration changes.</p>
<p>My debugging checklist:</p>
<ol>
<li><strong>Dependency versions:</strong> Check the lockfile, Node version, package manager, and native dependencies.</li>
<li><strong>Toolchain versions:</strong> Compare JDK, Gradle, Android SDK/NDK, Xcode, and CocoaPods versions.</li>
<li><strong>Environment variables:</strong> Verify required configuration exists in CI without printing secret values.</li>
<li><strong>File paths and case sensitivity:</strong> A file import may work on a case-insensitive local filesystem but fail on Linux.</li>
<li><strong>Signing and permissions:</strong> Check credentials, certificates, provisioning profiles, and filesystem access.</li>
<li><strong>Network and cache:</strong> Determine whether dependency downloads or stale caches are causing the failure.</li>
<li><strong>Build command:</strong> Run the exact CI command locally or in a matching container/runner when possible.</li>
<li><strong>Logs:</strong> Identify the first meaningful failure, not just the final generic build-failed message.</li>
</ol>
<p>For example, if a React Native Android build cannot find <code>@react-native/gradle-plugin</code>, I would check whether dependencies were installed correctly, the lockfile is consistent, and the CI working directory is correct.</p>
<p>I would fix one root cause at a time and keep the final setup reproducible.</p>
<p><strong>Interview point:</strong> “Works on my machine” usually means the environments differ. Compare versions, configuration, paths, dependencies, and build commands.</p>`,
        },
        {
          id: "rn-safe-release",
          q: "How would you plan a safe production release with staged rollout, crash monitoring, rollback strategy, and release validation?",
          a: `<p>I would treat a release as a controlled process rather than just uploading a build.</p>
<ol>
<li><strong>Pre-release validation.</strong> Run linting, type checks, unit/integration tests, release builds, and smoke tests. Validate login, critical user journeys, permissions, and payment flows where applicable.</li>
<li><strong>Limited rollout.</strong> Distribute to internal testers or a beta group first. For production, use staged or percentage-based rollout where the store supports it.</li>
<li><strong>Monitor production.</strong> Track crash-free sessions, ANRs, API failures, startup performance, authentication issues, and critical business events.</li>
<li><strong>Stop or recover.</strong> Pause or halt the rollout when thresholds are breached. Prepare a corrective native release or a compatible OTA fix when appropriate.</li>
<li><strong>Validate and expand.</strong> Confirm the fix or release is stable, then expand rollout gradually and document the outcome.</li>
</ol>
<p><strong>What does rollback mean?</strong></p>
<p>For a native release, I would halt or pause the rollout if supported, and publish a corrected build when necessary. A previous version is not always immediately available for every user to reinstall.</p>
<p>For an OTA update, rollback may be possible through the update system's supported recovery mechanism or by publishing a compatible corrective update. I would not assume every OTA system supports arbitrary rollback to an older bundle.</p>
<p>I would define monitoring thresholds before release—for example, a meaningful increase in crash rate compared with the previous stable version—and assign someone responsibility for watching them.</p>
<p><strong>Interview-ready answer:</strong> I validate before release, roll out to a limited audience, monitor crash and business metrics, stop the rollout if problems appear, and use the safest compatible recovery path. A release is complete only after production validation.</p>`,
        },
        {
          id: "rn-testing-revision",
          q: "Final revision: the most important concepts",
          a: `<p>Before an interview, make sure you can explain these without memorizing the full answers:</p>
<ul>
<li>Testing pyramid: unit, component, integration, and E2E.</li>
<li>Jest and React Native Testing Library for automated tests.</li>
<li>Detox or Maestro for critical end-to-end flows.</li>
<li>Crash classification: JavaScript exception vs native crash vs ANR vs watchdog.</li>
<li>Source maps and native symbols for production diagnostics.</li>
<li>CI pipeline stages and why Android and iOS need different runners.</li>
<li>Fastlane vs EAS and their roles in release automation.</li>
<li>OTA compatibility with the installed native runtime.</li>
<li>Versioning, signing, TestFlight, Play testing tracks, and production rollout.</li>
<li>Monitoring, rollout pauses, and recovery after a bad release.</li>
</ul>`,
        },
        {
          id: "rn-unresponsive-list",
          q: "Your app becomes unresponsive when a screen opens with thousands of records. How would you diagnose and fix it?",
          a: `<p>First, I would determine whether the freeze comes from rendering too many rows, expensive JavaScript processing, large API responses, or image decoding.</p>
<p><strong>Diagnosis</strong></p>
<ul>
<li>Use React Native DevTools/Profiler to identify expensive renders.</li>
<li>Check JS-thread and UI-thread performance.</li>
<li>Measure API response size, JSON parsing time, and memory usage.</li>
<li>Reproduce in a release build on a representative device.</li>
</ul>
<p><strong>Fixes</strong></p>
<ol>
<li>Replace ScrollView with FlatList or consider FlashList for large collections.</li>
<li>Use server-side pagination instead of downloading every record.</li>
<li>Keep row components lightweight and memoize them where profiling justifies it.</li>
<li>Provide <code>keyExtractor</code>, stable callbacks, and <code>getItemLayout</code> when row heights are fixed.</li>
<li>Defer expensive calculations and avoid processing the entire dataset during the initial render.</li>
</ol>
<pre><code>&lt;FlatList
  data={records}
  keyExtractor={item =&gt; item.id}
  renderItem={renderItem}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={7}
/&gt;</code></pre>
<p>These values are starting points, not universal optimal settings. I would tune them using real-device profiling.</p>
<p><strong>Interview takeaway:</strong> Virtualize the list, reduce the amount of data, and measure JS and UI performance before optimizing individual components.</p>`,
        },
        {
          id: "rn-flatlist-ios-stutter",
          q: "A FlatList scrolls smoothly on Android but stutters on iOS. What would you investigate?",
          a: `<p>I would investigate the iOS-specific rendering and layout path rather than assuming the list itself is faulty.</p>
<ul>
<li>Profile the JS and UI threads on iOS.</li>
<li>Check expensive row layouts, shadows, transparency, image resizing, and nested scrolling.</li>
<li>Look for repeated state updates or expensive calculations during scrolling.</li>
<li>Verify that item heights and keys are stable.</li>
<li>Test on physical iPhones, not only the simulator.</li>
<li>Compare debug and release builds.</li>
</ul>
<p>For fixed-height rows, <code>getItemLayout</code> can reduce layout measurement work:</p>
<pre><code>const ROW_HEIGHT = 72;

&lt;FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={item =&gt; item.id}
  getItemLayout={(_, index) =&gt; ({
    length: ROW_HEIGHT,
    offset: ROW_HEIGHT * index,
    index,
  })}
/&gt;</code></pre>
<p>This is correct only when each row actually has that height, including relevant separators and layout constraints.</p>
<p>If images are responsible, I would use appropriately sized assets, caching, and avoid repeatedly decoding unnecessarily large images.</p>
<p><strong>Key point:</strong> Compare profiles and rendering behavior across platforms. Do not blindly increase FlatList batch sizes; that can increase work per frame and make stuttering worse.</p>`,
        },
        {
          id: "rn-release-only-crash",
          q: "Your app crashes only in release mode. What is your troubleshooting sequence?",
          a: `<p>I would reproduce the release failure first, then isolate whether it is JavaScript, native code, configuration, or build optimization.</p>
<ol>
<li>Reproduce using a release build on a real device.</li>
<li>Collect Android Logcat or iOS device crash logs.</li>
<li>Check Crashlytics/Sentry reports and symbolicate the stack trace.</li>
<li>Verify environment variables, API URLs, permissions, signing, and native configuration.</li>
<li>Check release-only optimizations such as Android R8/minification and ProGuard rules.</li>
<li>Verify native dependencies, initialization order, and New Architecture compatibility.</li>
<li>Compare the failing release with the last working build.</li>
<li>Make one targeted change at a time and test the final release configuration.</li>
</ol>
<p>For example, a release-only crash may occur because a native dependency relies on a class that gets removed or renamed by minification. Another possibility is that a production environment variable is missing.</p>
<p><strong>Important:</strong> Disabling minification permanently is not a complete fix. It may help isolate the cause, but I would correct the underlying configuration and retest the optimized release.</p>`,
        },
        {
          id: "rn-json-js-thread",
          q: "An app freezes when processing a large JSON response. How would you determine whether the JS thread is blocked and move expensive work off the critical path?",
          a: `<p>I would measure the time spent receiving, parsing, transforming, and rendering the response separately.</p>
<p><strong>Diagnosis</strong></p>
<ul>
<li>Add timing around API completion, parsing, data transformation, and rendering.</li>
<li>Use the React Native DevTools performance tools and Hermes profiling where available.</li>
<li>Observe whether taps and animations become unresponsive during processing.</li>
<li>Check whether large synchronous loops or <code>JSON.parse</code> block the JavaScript thread.</li>
</ul>
<pre><code>const startedAt = performance.now();

const response = await fetch(url);
const rawData = await response.text();

const parseStartedAt = performance.now();
const data = JSON.parse(rawData);

console.log('Download:', parseStartedAt - startedAt);
console.log('Parse:', performance.now() - parseStartedAt);</code></pre>
<p>In production, use a safe instrumentation system rather than logging every request.</p>
<p><strong>Solutions</strong></p>
<ol>
<li>Request less data through server-side filtering and pagination.</li>
<li>Avoid unnecessary transformations and repeated copying.</li>
<li>Defer noncritical work until after the initial screen becomes responsive.</li>
<li>Use native code or a suitable background execution mechanism for genuinely expensive computation.</li>
<li>Consider incremental processing when the data format and architecture support it.</li>
</ol>
<p>Moving work into a Promise does not automatically move CPU-intensive JavaScript off the JS thread. A synchronous loop still blocks it.</p>
<p><strong>Interview point:</strong> First establish whether network latency, parsing, transformation, or rendering is responsible. Optimize the actual bottleneck.</p>`,
        },
        {
          id: "rn-memory-leak-nav",
          q: "Memory usage grows after navigating repeatedly between screens. How would you locate and fix the leak?",
          a: `<p>I would check whether memory returns to a stable baseline after leaving screens and repeating the same navigation sequence.</p>
<p>Potential causes include:</p>
<ul>
<li>Event listeners that are never removed.</li>
<li>Timers or intervals that continue after unmounting.</li>
<li>WebSocket subscriptions that remain active.</li>
<li>Large image or data references retained in memory.</li>
<li>Navigation screens kept mounted unnecessarily.</li>
<li>Closures or global stores holding obsolete objects.</li>
</ul>
<p>Example of correct listener cleanup:</p>
<pre><code>useEffect(() =&gt; {
  const unsubscribe = subscribeToMessages(message =&gt; {
    handleMessage(message);
  });

  return () =&gt; {
    unsubscribe();
  };
}, []);</code></pre>
<p>I would take memory snapshots before and after repeated navigation, inspect retained objects and allocation patterns, and verify that cleanup occurs when expected.</p>
<p><strong>Important distinction:</strong> High memory usage is not always a memory leak. A cache may intentionally retain data. The issue is whether memory grows without bounds or objects remain reachable when they should be released.</p>
<p>After fixing the leak, I would repeat the same navigation test and compare memory behavior in a release build.</p>`,
        },
        {
          id: "rn-offline-sync-design",
          q: "Your app must support poor connectivity, offline actions, and eventual synchronization. Design the data flow and conflict-resolution strategy.",
          a: `<p>I would use a local-first architecture with a persistent database, repository layer, and durable synchronization queue.</p>
<pre><code>UI → Domain / use cases
Repository
Local database
Sync outbox

Sync worker → Backend API</code></pre>
<p><strong>Data flow</strong></p>
<ol>
<li>Read cached data immediately.</li>
<li>Persist local changes and mark them as pending.</li>
<li>Queue mutations in a durable outbox.</li>
<li>Synchronize when the network is usable.</li>
<li>Retry transient failures with exponential backoff.</li>
<li>Reconcile the server response with the local database.</li>
</ol>
<p>Each mutation should have a unique operation ID or idempotency key so retrying it does not duplicate a booking or payment.</p>
<p><strong>Conflict resolution</strong></p>
<ul>
<li>Use record versions or ETags to detect stale updates.</li>
<li>Merge independent field changes where safe.</li>
<li>Apply explicit domain rules to conflicting changes.</li>
<li>Ask the user to resolve important conflicts when automatic merging is unsafe.</li>
<li>Treat the server as authoritative for sensitive operations and final business state.</li>
</ul>
<p>For example, an offline booking can be saved as a pending request, but it must not be shown as confirmed until the server accepts it.</p>
<p>I would also define queue ordering, permanent-failure handling, account-switch cleanup, and retention rules for sensitive local data.</p>`,
        },
        {
          id: "rn-chat-design",
          q: "Design a real-time chat application with pagination, optimistic sending, delivery status, push notifications, and offline support.",
          a: `<p>I would separate the chat UI, message repository, persistent message store, real-time transport, and push-notification handling.</p>
<p><strong>Core architecture</strong></p>
<ul>
<li>React Native UI for conversations and message lists.</li>
<li>Backend API for history, pagination, and message creation.</li>
<li>WebSocket connection for real-time events.</li>
<li>Local database for cached messages and pending outgoing messages.</li>
<li>Push notifications for messages received while the app is not actively connected.</li>
</ul>
<p><strong>Message lifecycle</strong></p>
<pre><code>User sends message

Save locally with temporary ID

Show immediately as pending

Send through API / WebSocket

Server acknowledges with message ID

Update delivery status and synchronize</code></pre>
<p><strong>Important implementation details</strong></p>
<ul>
<li>Use cursor-based pagination for older messages.</li>
<li>Deduplicate messages by server ID or client-generated idempotency ID.</li>
<li>Maintain statuses such as pending, sent, delivered, read, and failed.</li>
<li>Reconnect WebSockets with backoff and resynchronize after reconnecting.</li>
<li>Persist unsent messages so they survive app restarts.</li>
<li>Use push notifications when real-time delivery is unavailable; do not assume push is guaranteed or instantaneous.</li>
<li>Handle multiple devices and out-of-order events.</li>
</ul>
<p>For a virtualized message list, I would use stable keys and carefully manage inverted-list behavior and pagination.</p>
<p><strong>Security:</strong> Enforce conversation membership and message authorization on the backend. Push payloads should not expose sensitive message content unnecessarily.</p>`,
        },
        {
          id: "rn-ecommerce-design",
          q: "Design a scalable e-commerce application with authentication, product search, cart, checkout, payments, and order tracking.",
          a: `<p>I would organize the app into feature modules while keeping shared API, authentication, design-system, and observability code separate.</p>
<p><strong>Feature modules</strong></p>
<ul>
<li>Authentication and user profile.</li>
<li>Product catalog and search.</li>
<li>Cart and pricing.</li>
<li>Checkout and payment.</li>
<li>Orders and tracking.</li>
<li>Notifications and saved addresses.</li>
</ul>
<p><strong>State strategy</strong></p>
<ul>
<li>Local component state for transient UI.</li>
<li>Redux Toolkit or Zustand for cross-screen client state.</li>
<li>TanStack Query or an equivalent server-state layer for product and order fetching, caching, and invalidation.</li>
<li>Secure storage for session credentials.</li>
</ul>
<p><strong>Critical checkout flow</strong></p>
<ol>
<li>Validate the cart and address.</li>
<li>Ask the server to calculate authoritative prices, taxes, discounts, and availability.</li>
<li>Create an order or checkout session.</li>
<li>Initiate payment through a trusted payment SDK or provider flow.</li>
<li>Verify payment status through the backend, ideally using provider-signed webhooks.</li>
<li>Display a confirmed order only after authoritative confirmation.</li>
<li>Track status through polling, push notifications, or a real-time channel where appropriate.</li>
</ol>
<p>Never trust the amount calculated solely by the client, and never treat a client-side payment callback alone as definitive proof of payment.</p>
<p>For performance, use pagination, image caching, search debouncing, appropriate cache invalidation, and resilient handling of network failures.</p>
<p>For scale, the mobile client should use stable API contracts and pagination. Server-side scalability is handled through backend services, databases, caching, and queueing—not by React Native architecture alone.</p>`,
        },
        {
          id: "rn-notification-system",
          q: "Design a mobile notification system that handles foreground, background, terminated-app launches, deep links, and duplicate events.",
          a: `<p>I would distinguish notification delivery, display, and navigation because these are separate concerns.</p>
<p><strong>Architecture</strong></p>
<ul>
<li>A push provider such as Firebase Cloud Messaging and APNs.</li>
<li>A notification service abstraction in the app.</li>
<li>A centralized notification router.</li>
<li>Deep-link validation and authentication guards.</li>
<li>Backend support for notification preferences, targeting, and event identifiers.</li>
</ul>
<p><strong>Lifecycle handling</strong></p>
<ul>
<li><strong>Foreground:</strong> Decide whether to show an in-app banner or a system notification, avoiding duplicate display.</li>
<li><strong>Background:</strong> The OS or push SDK handles delivery according to platform rules and payload type.</li>
<li><strong>Terminated:</strong> On launch, inspect the notification that opened the app and process its destination after initialization.</li>
<li><strong>Unauthenticated:</strong> Store a validated pending destination, complete login, and then route the user if authorization still permits it.</li>
</ul>
<p>For duplicate events, track a stable notification or event ID and make the handler idempotent. Avoid navigating twice when both a notification listener and an initial-notification API report the same event.</p>
<p>I would test foreground receipt, background taps, cold starts, denied permissions, expired sessions, malformed links, and notification delivery delays on real devices.</p>
<p><strong>Important:</strong> Push delivery is not guaranteed, and background execution is constrained by iOS and Android. Critical business state should be fetched from the backend when the app opens.</p>`,
        },
        {
          id: "rn-auth-biometric-design",
          q: "Design an authentication flow with token refresh, biometric unlock, secure storage, session expiration, and logout across multiple devices.",
          a: `<p>I would separate authentication, token management, biometric protection, and navigation guards.</p>
<p><strong>Login and session flow</strong></p>
<ol>
<li>Authenticate with the backend.</li>
<li>Receive access and refresh tokens.</li>
<li>Store credentials using a secure-storage abstraction backed by platform facilities.</li>
<li>Keep access tokens in memory where practical.</li>
<li>Attach access tokens to API requests.</li>
<li>Refresh expired tokens through a single-flight refresh mechanism.</li>
<li>End the local session when refresh fails or the server revokes it.</li>
</ol>
<p><strong>Biometric unlock</strong></p>
<p>Biometrics should unlock access to a locally protected session or credential—not replace backend authorization. Depending on the security requirements, I would use Keychain/Keystore-backed mechanisms and an appropriate biometric authentication library.</p>
<p><strong>Multi-device logout</strong></p>
<p>If a user logs out from one device, that action should revoke the relevant server session. If the product offers “log out all devices,” the backend must invalidate all associated sessions or refresh-token families.</p>
<p>The app should also handle revocation events when a device reconnects, since an offline device cannot instantly learn about a server-side logout.</p>
<p><strong>Security edge cases</strong></p>
<ul>
<li>Token rotation and simultaneous refreshes.</li>
<li>Biometric enrollment changes.</li>
<li>Device lock and app-background policies.</li>
<li>Expired or revoked sessions.</li>
<li>Clearing account-specific local data.</li>
<li>Preventing old requests from updating a new user's session.</li>
</ul>
<p><strong>Interview takeaway:</strong> Secure storage, biometrics, token refresh, and server-side session revocation solve different problems; they must work together.</p>`,
        },
        {
          id: "rn-infinite-list",
          q: "Build a reusable, high-performance infinite-scrolling list with pagination, pull-to-refresh, empty states, and retry handling.",
          a: `<p>I would make the list reusable by accepting data, a fetch function, a renderer, and configurable loading/error states. Pagination state should be handled by a hook or server-state library.</p>
<p>Example hook using cursor-based pagination:</p>
<pre><code>import { useCallback, useEffect, useState } from 'react';

type Page&lt;T&gt; = {
  items: T[];
  nextCursor: string | null;
};

function usePaginatedList&lt;T&gt;(
  fetchPage: (cursor: string | null) =&gt; Promise&lt;Page&lt;T&gt;&gt;
) {
  const [items, setItems] = useState&lt;T[]&gt;([]);
  const [cursor, setCursor] = useState&lt;string | null&gt;(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState&lt;string | null&gt;(null);

  const load = useCallback(async (reset = false) =&gt; {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const page = await fetchPage(reset ? null : cursor);

      setItems(previous =&gt;
        reset ? page.items : [...previous, ...page.items]
      );
      setCursor(page.nextCursor);
      setHasMore(page.nextCursor !== null);
    } catch {
      setError('Unable to load data.');
    } finally {
      setLoading(false);
    }
  }, [cursor, fetchPage, loading]);

  useEffect(() =&gt; {
    void load(true);
  }, []);

  return {
    items,
    loading,
    error,
    hasMore,
    loadMore: () =&gt; hasMore &amp;&amp; !loading &amp;&amp; void load(),
    refresh: () =&gt; void load(true),
  };
}</code></pre>
<p>This is a teaching example, not a complete production hook. In particular, I would use a ref or query-library request state to guard concurrent requests reliably, handle stale responses, and stabilize dependencies. The initial-fetch effect also needs careful treatment if the component remounts or development Strict Mode repeats effects.</p>
<p><strong>List implementation</strong></p>
<pre><code>&lt;FlatList
  data={items}
  keyExtractor={item =&gt; item.id}
  renderItem={renderItem}
  onEndReached={loadMore}
  onEndReachedThreshold={0.4}
  refreshing={loading &amp;&amp; items.length &gt; 0}
  onRefresh={refresh}
/&gt;</code></pre>
<p>I would also include:</p>
<ul>
<li>Initial loading, empty, and retry states.</li>
<li>Duplicate-item protection.</li>
<li>Cursor and request-race handling.</li>
<li>Stable item keys and memoized row components where beneficial.</li>
<li>Separate refresh and pagination loading states.</li>
<li>Appropriate virtualization settings.</li>
</ul>
<p><strong>Important:</strong> A production implementation should not rely on one loading boolean for every operation. Refresh, initial load, and load-more requests have different UI and concurrency requirements.</p>`,
        },
        {
          id: "rn-debounced-search",
          q: "Build a debounced autocomplete search component that cancels obsolete requests and prevents stale responses from overwriting newer results.",
          a: `<p>I would combine debounce, request cancellation, and a request-identity check. Debounce reduces unnecessary requests; cancellation reduces wasted work; request identity protects against out-of-order responses.</p>
<pre><code>import { useEffect, useRef, useState } from 'react';

function useAutocomplete(searchApi: (query: string, signal: AbortSignal) =&gt;
  Promise&lt;string[]&gt;) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState&lt;string[]&gt;([]);
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);

  useEffect(() =&gt; {
    const normalized = query.trim();

    if (normalized.length &lt; 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const id = ++requestId.current;

    const timer = setTimeout(async () =&gt; {
      setLoading(true);

      try {
        const data = await searchApi(normalized, controller.signal);

        if (id === requestId.current) {
          setResults(data);
        }
      } catch (error) {
        if (!controller.signal.aborted &amp;&amp; id === requestId.current) {
          setResults([]);
        }
      } finally {
        if (id === requestId.current) {
          setLoading(false);
        }
      }
    }, 300);

    return () =&gt; {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, searchApi]);

  return { query, setQuery, results, loading };
}</code></pre>
<p>This assumes <code>searchApi</code> is stable, for example through <code>useCallback</code> or a module-level service. Otherwise, changing its identity can repeatedly restart the effect.</p>
<p>I would also handle visible error states, clear stale results when appropriate, and test requests resolving in the opposite order from which they were started.</p>
<p><strong>Interview takeaway:</strong> Debouncing alone does not prevent stale responses. Combine cancellation with a request-identity or equivalent stale-result guard.</p>`,
        },
        {
          id: "rn-booking-flow",
          q: "Build a multi-step booking flow with validation, navigation-state management, persisted progress, payment, and recovery from failed requests.",
          a: `<p>I would model the booking as a stateful workflow rather than a collection of unrelated screens.</p>
<p><strong>Example steps</strong></p>
<pre><code>Service → Vehicle → Location → Time Slot → Review → Payment → Confirmation</code></pre>
<p><strong>Architecture</strong></p>
<ul>
<li>A booking feature module owns its screens, validation, types, and domain logic.</li>
<li>Redux Toolkit or a dedicated state store holds the cross-screen draft.</li>
<li>A repository manages API calls and draft persistence.</li>
<li>Navigation handles screen transitions, not the authoritative booking status.</li>
<li>The backend validates and confirms final bookings.</li>
</ul>
<p><strong>State model</strong></p>
<pre><code>type BookingDraft = {
  serviceId?: string;
  vehicleId?: string;
  locationId?: string;
  slotId?: string;
  status:
    | 'draft'
    | 'submitting'
    | 'payment_pending'
    | 'confirmed'
    | 'failed';
};</code></pre>
<p>I would validate each step before allowing progression and persist the draft so the user can recover after app termination.</p>
<p><strong>Payment and recovery</strong></p>
<ol>
<li>Create or retrieve a server-side booking/checkout session.</li>
<li>Initiate payment through the payment provider.</li>
<li>Handle cancellation, timeout, and uncertain outcomes.</li>
<li>Verify payment and booking status through the backend.</li>
<li>Resume by fetching the authoritative status if the app restarts.</li>
<li>Use idempotency keys to prevent duplicate bookings or charges.</li>
</ol>
<p>Navigation Back behavior should be designed explicitly. For example, editing a location should not unexpectedly return the user to a payment screen that is no longer valid.</p>
<p><strong>Important:</strong> A timeout does not prove a payment failed. If the payment request may have succeeded, query the backend before retrying.</p>`,
        },
        {
          id: "rn-native-camera-location",
          q: "Build a reusable native-backed camera or location module, explaining the JS API, Android/iOS implementation, permissions, and testing.",
          a: `<p>I would first decide whether an existing maintained library already meets the requirement. A custom native module is justified when we need unsupported functionality, specialized performance, or control over platform behavior.</p>
<p><strong>Architecture</strong></p>
<pre><code>TypeScript API used by React Native screens
Typed native module interface / Codegen
Android: Kotlin / Android APIs
iOS: Swift / Apple APIs</code></pre>
<p>For example, a location module might expose:</p>
<pre><code>interface LocationModule {
  requestPermission(): Promise&lt;boolean&gt;;
  getCurrentLocation(): Promise&lt;{
    latitude: number;
    longitude: number;
  }&gt;;
}</code></pre>
<p>The native implementations would:</p>
<ul>
<li>Request platform permissions.</li>
<li>Check whether the relevant service is available.</li>
<li>Return coordinates or a structured error.</li>
<li>Handle permission denial and cancellation.</li>
<li>Release native resources when no longer needed.</li>
</ul>
<p><strong>Android:</strong> Implement using Kotlin and Android location APIs, with the appropriate manifest declarations and runtime permission handling.</p>
<p><strong>iOS:</strong> Implement using Swift and Core Location, including the relevant Info.plist usage descriptions and authorization handling.</p>
<p><strong>Testing:</strong> Unit-test JavaScript consumers, mock native methods, test permission states, and validate the actual native implementation on physical devices.</p>
<p>For a UI component such as a camera preview, I would evaluate a Fabric native component rather than treating it as an ordinary method-only native module.</p>
<p><strong>Interview point:</strong> A TurboModule exposes native functionality through an API; a Fabric native component integrates a native UI view into React Native's rendering system.</p>`,
        },
        {
          id: "rn-android-only-lib",
          q: "A third-party library supports a feature only on Android. How would you evaluate alternatives and implement consistent cross-platform behavior?",
          a: `<p>I would separate the product requirement from the existing library's implementation.</p>
<p>My process:</p>
<ol>
<li>Confirm whether iOS truly lacks the feature or just lacks a ready-made library.</li>
<li>Search for maintained alternatives with suitable licenses, security, and platform support.</li>
<li>Check whether native iOS APIs can provide equivalent behavior.</li>
<li>Compare implementation cost, maintenance, performance, and testing needs.</li>
<li>Define a common TypeScript interface.</li>
<li>Implement platform-specific adapters behind that interface.</li>
<li>Provide an explicit fallback if exact parity is impossible.</li>
</ol>
<p>Example:</p>
<pre><code>interface DocumentScanner {
  scan(): Promise&lt;{
    uri: string;
    pages: number;
  }&gt;;
}</code></pre>
<p>The app could use an Android implementation backed by the existing library and an iOS implementation backed by an appropriate native framework.</p>
<p>If the feature cannot be implemented equivalently, I would communicate the platform difference in the UI rather than silently returning fake results.</p>
<p><strong>Important:</strong> Platform-specific implementations should preserve consistent error handling, permissions, and data contracts, even when the underlying APIs differ.</p>`,
        },
        {
          id: "rn-new-arch-app",
          q: "Design a React Native application using the New Architecture, modular code, typed API contracts, centralized observability, and reusable native integrations.",
          a: `<p>I would combine feature-based modularization with clear boundaries between presentation, domain logic, and infrastructure.</p>
<p><strong>Suggested project structure</strong></p>
<pre><code>src/
  app/
    navigation/
    providers/
    bootstrap/
  features/
    auth/
    feed/
    bookings/
    profile/
  shared/
    ui/
    hooks/
    api/
    storage/
    analytics/
    logging/
    native/
  domain/
    entities/
    useCases/
  types/</code></pre>
<p>Each feature owns its screens, hooks, state, and business-specific types. Shared modules expose stable public interfaces instead of allowing unrestricted cross-feature imports.</p>
<p><strong>New Architecture</strong></p>
<ul>
<li>Hermes executes JavaScript in supported configurations.</li>
<li>JSI enables more direct JavaScript/native interoperability.</li>
<li>TurboModules provide typed native-module integration.</li>
<li>Fabric provides the modern native UI rendering architecture.</li>
<li>Codegen generates supporting code for defined native interfaces.</li>
</ul>
<p><strong>Typed API contracts</strong></p>
<p>Use TypeScript types or schemas to validate API boundaries. TypeScript alone does not validate untrusted JSON at runtime, so I would use runtime validation where the data risk justifies it.</p>
<p><strong>Centralized observability</strong></p>
<p>A shared layer would standardize error reporting, safe logging, performance measurements, analytics events, and correlation IDs. It would redact sensitive information and avoid coupling features directly to a specific monitoring vendor.</p>
<p><strong>Testing and governance</strong></p>
<ul>
<li>Unit tests for domain logic.</li>
<li>Integration tests for repositories and state.</li>
<li>Component tests for user-visible behavior.</li>
<li>E2E tests for critical workflows.</li>
<li>Documented module ownership and dependency rules.</li>
</ul>
<p><strong>Interview takeaway:</strong> A scalable architecture is not just a folder structure. It requires controlled dependencies, clear interfaces, consistent observability, and testable boundaries.</p>`,
        },
        {
          id: "rn-startup-sdks",
          q: "Startup time increases after adding analytics, advertisements, and multiple native SDKs. How would you isolate the cause and optimize startup?",
          a: `<p>I would establish a startup baseline and add instrumentation around the major initialization stages.</p>
<p><strong>Diagnosis</strong></p>
<ol>
<li>Measure cold-start time in release builds on representative devices.</li>
<li>Compare startup before and after the SDK changes.</li>
<li>Use native profiling tools and React Native performance tools to inspect initialization and thread activity.</li>
<li>Temporarily disable individual SDK initializations to identify their contribution.</li>
<li>Inspect synchronous work, dependency initialization, and network requests that delay the first screen.</li>
</ol>
<p><strong>Optimization</strong></p>
<ul>
<li>Initialize only SDKs required for the first screen.</li>
<li>Defer noncritical analytics configuration and ad initialization until after initial rendering.</li>
<li>Avoid blocking startup on optional network requests.</li>
<li>Remove unused SDKs and duplicated initialization.</li>
<li>Reduce expensive module imports and unnecessary startup work.</li>
<li>Follow each SDK's initialization and consent requirements.</li>
</ul>
<p>I would measure both time to first meaningful render and time until the app becomes interactive. The first screen appearing quickly does not necessarily mean the app is responsive.</p>
<p><strong>Important:</strong> Do not defer required security, consent, or platform initialization simply to improve a benchmark. Optimize startup while preserving the app's required behavior.</p>`,
        },
        {
          id: "rn-migrate-legacy",
          q: "How would you migrate an older React Native app to a current version when it has many native dependencies and cannot afford extended downtime?",
          a: `<p>I would plan an incremental, evidence-driven migration with a working baseline and a clear recovery strategy.</p>
<p><strong>Migration plan</strong></p>
<ol>
<li><strong>Inventory:</strong> Record the React Native version, native dependencies, custom modules, build tools, and New Architecture compatibility.</li>
<li><strong>Establish a baseline:</strong> Capture build results, startup performance, crash rates, and critical user journeys.</li>
<li><strong>Upgrade incrementally:</strong> Follow the official upgrade guidance and resolve breaking changes in manageable steps.</li>
<li><strong>Validate native integrations:</strong> Check Android Gradle/NDK and iOS Xcode/CocoaPods compatibility, signing, permissions, and third-party SDKs.</li>
<li><strong>Test on both platforms:</strong> Run unit, integration, E2E, and release-build tests on representative devices.</li>
<li><strong>Release gradually:</strong> Use internal testing, staged rollout, crash monitoring, and a prepared recovery plan.</li>
</ol>
<p>I would avoid changing the React Native version, navigation library, state management, and every native dependency in one large change unless there is a compelling reason.</p>
<p>The New Architecture migration should be evaluated against the exact target version and library compatibility. I would not assume every old dependency is compatible just because the application compiles.</p>
<p>For an app that cannot tolerate extended downtime, I would continue serving the stable production binary while preparing and validating the new release separately.</p>
<p><strong>Interview point:</strong> Reduce migration risk through small changes, compatibility checks, automated validation, and controlled rollout—not by assuming a successful local build is sufficient.</p>`,
        },
        {
          id: "rn-prioritize-prod",
          q: "Your app has millions of downloads, intermittent crashes, slow screen transitions, and inconsistent API performance. How would you prioritize investigation?",
          a: `<p>I would prioritize by user impact, severity, frequency, and business risk rather than trying to fix every issue simultaneously.</p>
<p><strong>Step 1: Establish the metrics</strong></p>
<div class="compare">
  <table>
    <thead>
      <tr>
        <th>Area</th>
        <th>Metrics</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Stability</th>
        <td>Crash-free users/sessions, ANR rate, watchdog terminations</td>
      </tr>
      <tr>
        <th>Startup</th>
        <td>Cold-start and warm-start latency</td>
      </tr>
      <tr>
        <th>Navigation</th>
        <td>Screen-transition latency, JS/UI responsiveness</td>
      </tr>
      <tr>
        <th>API</th>
        <td>Latency percentiles, error rate, timeout rate</td>
      </tr>
      <tr>
        <th>Business</th>
        <td>Login success, booking completion, payment success</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>Step 2: Segment the data</strong></p>
<p>Compare by:</p>
<ul>
<li>App version and release cohort.</li>
<li>Android/iOS version and device model.</li>
<li>Network conditions and API endpoint.</li>
<li>Screen, navigation path, and user journey.</li>
</ul>
<p>This helps distinguish a regression introduced by a new release from an older device-specific issue or a backend bottleneck.</p>
<p><strong>Step 3: Prioritize</strong></p>
<p>I would typically address widespread crashes, ANRs, or payment/authentication failures before lower-impact visual performance issues. However, a slow API that blocks most users from completing a core journey can be equally urgent.</p>
<p><strong>Step 4: Fix and validate</strong></p>
<ul>
<li>Reproduce the issue.</li>
<li>Use symbolicated crash reports and performance traces.</li>
<li>Add a regression test.</li>
<li>Release a targeted fix.</li>
<li>Compare metrics against the pre-fix baseline.</li>
<li>Expand rollout only after the results are acceptable.</li>
</ul>
<p><strong>Important:</strong> Aggregate averages can hide severe problems. I would examine percentiles, affected-user counts, and release-specific trends rather than relying only on average API latency or total crash counts.</p>`,
        },
        {
          id: "rn-e2e-architecture",
          q: "End-to-end architecture interview: Design a production-ready React Native application from scratch.",
          a: `<p>I would start by identifying the product requirements, security constraints, supported platforms, expected traffic, offline requirements, and critical user journeys. Then I would design the app around independently testable feature modules and reliable backend contracts.</p>
<p><strong>1. Architecture</strong></p>
<p>Use a feature-based structure with domain and infrastructure boundaries:</p>
<ul>
<li><strong>Presentation:</strong> screens, reusable components, hooks.</li>
<li><strong>Domain:</strong> business rules, entities, and use cases.</li>
<li><strong>Data:</strong> repositories, API clients, local persistence.</li>
<li><strong>Shared infrastructure:</strong> authentication, navigation, logging, analytics, and native integrations.</li>
</ul>
<p>Keep dependencies explicit and avoid unnecessary abstractions that make simple features harder to build.</p>
<p><strong>2. State management</strong></p>
<p>Choose state management based on the type of data:</p>
<ul>
<li>Local React state for transient UI.</li>
<li>Redux Toolkit or Zustand for cross-screen client state.</li>
<li>TanStack Query or an equivalent solution for server state, caching, and refetching.</li>
<li>SQLite or another suitable local database for persistent structured/offline data.</li>
<li>Secure storage for credentials and small secrets.</li>
</ul>
<p><strong>3. Navigation</strong></p>
<p>Use nested navigators where appropriate, typed route parameters, protected routes, and a centralized deep-link handler. Reset navigation after logout and test Back behavior across complex flows.</p>
<p><strong>4. API integration</strong></p>
<p>Build a centralized API layer with:</p>
<ul>
<li>Typed request and response contracts.</li>
<li>Timeouts and controlled retries.</li>
<li>Token refresh with concurrency protection.</li>
<li>Cancellation and stale-response handling.</li>
<li>Standard error mapping and request correlation.</li>
<li>Runtime validation for important untrusted payloads.</li>
</ul>
<p><strong>5. Offline support</strong></p>
<p>Use a local cache and durable outbox. Define synchronization, idempotency, conflict resolution, and clear pending-versus-confirmed UI states.</p>
<p>Not every feature needs to work offline; define the offline contract per feature.</p>
<p><strong>6. Native integrations</strong></p>
<p>Prefer maintained libraries when appropriate. For custom capabilities, define typed interfaces and implement Android and iOS adapters. Use TurboModules for native APIs and Fabric components for native UI where needed.</p>
<p><strong>7. Performance</strong></p>
<p>Measure startup, JS/UI thread utilization, rendering, memory, and network latency. Use virtualized lists, image optimization, caching, lazy loading, and background processing based on profiling evidence.</p>
<p><strong>8. Security</strong></p>
<ul>
<li>HTTPS with normal certificate validation.</li>
<li>Secure token storage and session revocation.</li>
<li>Server-side authorization.</li>
<li>Safe deep-link handling.</li>
<li>Sensitive-data minimization and cache protection.</li>
<li>Redaction of secrets from logs, crash reports, and analytics.</li>
<li>Appropriate permissions, privacy disclosures, and data-retention policies.</li>
</ul>
<p><strong>9. Testing</strong></p>
<p>Use unit tests for business logic, component tests for user-visible behavior, integration tests for module boundaries, and E2E tests for critical user journeys. Test real native integrations on supported devices.</p>
<p><strong>10. CI/CD and releases</strong></p>
<p>Automate linting, type checks, tests, Android builds, iOS builds, signing, and artifact storage. Use Fastlane or EAS where appropriate. Keep secrets out of source control and release through internal testing and staged rollout.</p>
<p><strong>11. Monitoring and operations</strong></p>
<p>Centralize crash reporting, performance monitoring, safe analytics, and API observability. Define release-health thresholds, incident ownership, and recovery procedures before production deployment.</p>
<p><strong>12. Final architectural principle</strong></p>
<p>I would optimize for correctness, observability, maintainability, and measured performance before adding complexity. The architecture should make critical workflows easy to test, failures easy to diagnose, and releases safe to roll out or recover from.</p>`,
        },
      ],
    },
    {
      title: "Foundations",
      level: "basic",
      questions: [
        {
          id: "rn-what",
          q: "What is React Native, and how is it different from React for the web?",
          a: `<p>React Native uses the same component and hook model, but it renders <strong>native</strong> views (UIView, Android Views), not the DOM. There is no HTML or CSS file.</p>
<p>You import primitives from <code>react-native</code>: <code>View</code>, <code>Text</code>, <code>Image</code>, <code>ScrollView</code>, <code>TextInput</code>, <code>Pressable</code>. Styling is JavaScript objects through <code>StyleSheet</code>, mostly Flexbox. You cannot use <code>&lt;div&gt;</code> or <code>&lt;span&gt;</code>.</p>`,
        },
        {
          id: "rn-core-components",
          q: "Which core components should you know cold?",
          a: `<ul>
<li><code>View</code> — the box. Maps to a native view.</li>
<li><code>Text</code> — all text must be inside Text. It does not inherit font styles the way the web does unless you pass them down.</li>
<li><code>Image</code> / <code>ImageBackground</code> — local <code>require</code> or remote URI. Always set size for remote images.</li>
<li><code>ScrollView</code> vs <code>FlatList</code> — scroll a small page vs virtualize a long list.</li>
<li><code>TextInput</code>, <code>Pressable</code>, <code>Modal</code>, <code>SafeAreaView</code> / <code>SafeAreaProvider</code>.</li>
</ul>`,
        },
        {
          id: "rn-style",
          q: "How does styling work? Flexbox differences from the web?",
          a: `<p><code>StyleSheet.create</code> is the usual pattern. Styles are objects, not cascading CSS. You can pass arrays: <code>style={[styles.base, disabled && styles.muted]}</code>.</p>
<p>Default Flexbox is <code>flexDirection: 'column'</code> (web default is row). <code>flex: 1</code> fills leftover space on the parent’s main axis. There is no grid, no media-query CSS, and limited inheritance — wrap a custom <code>AppText</code> if you want a default font.</p>`,
        },
        {
          id: "rn-platform",
          q: "How do you write platform-specific code?",
          a: `<p><code>Platform.OS</code> is <code>'ios'</code> or <code>'android'</code> (also <code>'web'</code> if you use RN Web). <code>Platform.select({ ios: ..., android: ... })</code> is clean for small differences.</p>
<p>For larger splits, use file suffixes: <code>Button.ios.js</code> and <code>Button.android.js</code>. The bundler picks the right file. Do not fork the whole app unless the UX is truly different.</p>`,
        },
        {
          id: "rn-expo-bare",
          q: "Expo vs React Native CLI / bare workflow?",
          a: `<p><strong>Expo</strong> gives you a managed toolchain, OTA updates, a large SDK (camera, notifications, secure store), and Expo Go for fast iteration. Config plugins and CNG (continuous native generation) let you add native code without abandoning Expo.</p>
<p><strong>Bare / CLI</strong> means you own <code>ios/</code> and <code>android/</code> fully. Use it when you need custom native modules Expo cannot express, or a company already has a heavy native shell. Many teams start Expo and only eject pieces they must.</p>`,
        },
        {
          id: "rn-touch",
          q: "How does touch handling differ from the web?",
          a: `<p>There is no hover and no right-click. Use <code>Pressable</code> (preferred) or <code>TouchableOpacity</code>. Handle <code>onPress</code>, <code>onLongPress</code>, and pressed styles. Nested scroll + press needs care: the parent ScrollView can steal the gesture.</p>
<p>For complex gestures (pinch, swipe-to-dismiss), use <code>react-native-gesture-handler</code> plus Reanimated, not JS <code>onMove</code> hacks.</p>`,
        },
      ],
    },
    {
      title: "App structure and native APIs",
      level: "intermediate",
      questions: [
        {
          id: "rn-lists",
          q: "Why is FlatList preferred over mapping items inside ScrollView?",
          a: `<p><code>ScrollView</code> renders every child at once. A thousand rows will jank and use a lot of memory. <code>FlatList</code> (and <code>SectionList</code>) virtualizes: it mounts items near the viewport and recycles them.</p>
<p>Know the props interviewers expect: <code>keyExtractor</code>, <code>renderItem</code>, <code>ItemSeparatorComponent</code>, <code>ListEmptyComponent</code>, <code>onEndReached</code>, <code>refreshing</code> / <code>onRefresh</code>, <code>getItemLayout</code> when row height is fixed, and <code>windowSize</code> / <code>initialNumToRender</code> for tuning.</p>
<p>Wrap <code>renderItem</code> content in <code>React.memo</code> and keep extraData correct if items depend on outside state.</p>`,
        },
        {
          id: "rn-navigation",
          q: "How does React Navigation work?",
          a: `<p>Most apps use React Navigation: a native stack for screens, tabs for top-level sections, and drawers when needed. Each navigator has a stack of routes and params.</p>
<pre><code>navigation.navigate("Details", { id });
route.params.id</code></pre>
<p>Pass the minimum in params (an id, not a huge object). Share data through context or a store. Handle deep links with linking config. For auth, swap navigator trees (logged-out stack vs app tabs) instead of hiding buttons only.</p>`,
        },
        {
          id: "rn-safe-area",
          q: "What are Safe Area, keyboard, and notches about?",
          a: `<p>Notches, status bars, and home indicators overlap content if you draw edge-to-edge. Use <code>react-native-safe-area-context</code>. For inputs, wrap forms in <code>KeyboardAvoidingView</code> (behavior differs on iOS vs Android) or a keyboard-aware scroll view.</p>
<p>Test on a notched iPhone and a gesture-nav Android device, not only the simulator default.</p>`,
        },
        {
          id: "rn-storage",
          q: "How do you persist data on device?",
          a: `<ul>
<li><code>AsyncStorage</code> — unencrypted key-value strings. Fine for flags and cache, not tokens if you can avoid it.</li>
<li>Expo SecureStore / Keychain / Keystore — secrets.</li>
<li>SQLite, WatermelonDB, or MMKV — larger or faster local data.</li>
</ul>
<p>Remember: AsyncStorage is async. Do not block the first render on it without a hydration strategy. Never store JWTs in plain AsyncStorage on a security-sensitive app without discussing threat model.</p>`,
        },
        {
          id: "rn-images-perf",
          q: "How do you handle images and lists without dropping frames?",
          a: `<p>Size images (do not load a 4000px photo into a 64px avatar). Cache remote images (Expo Image, Fast Image). Avoid anonymous functions that recreate heavy props every render inside <code>renderItem</code>.</p>
<p>Use <code>removeClippedSubviews</code> carefully, prefer <code>FlashList</code> for very long lists, and keep JS thread work off the critical path. Measure with the Perf Monitor and why-did-you-render, not guesswork.</p>`,
        },
        {
          id: "rn-permissions",
          q: "How do permissions and device APIs work?",
          a: `<p>Camera, location, notifications, and photos are native permissions. You declare them in <code>Info.plist</code> / AndroidManifest (or app.json in Expo), then request at runtime with a library (expo-image-picker, expo-location, permissions-android).</p>
<p>Ask only when the user needs the feature, explain why, and handle denied / blocked states with a path to Settings.</p>`,
        },
        {
          id: "rn-debugging",
          q: "How do you debug a React Native app?",
          a: `<p>Metro bundler + Flipper or React Native DevTools, Chrome/Hermes debugger, LogBox, and native logs (Xcode, Logcat). Red box is a JS exception. Yellow box is a warning.</p>
<p>For native crashes, you need symbolicated stack traces (Sentry, Crashlytics). For UI bugs, inspect the element tree and verify you did not put text outside <code>Text</code> — that is a classic crash.</p>`,
        },
      ],
    },
    {
      title: "Architecture and advanced native",
      level: "advanced",
      questions: [
        {
          id: "rn-bridge",
          q: "Explain the old bridge vs the New Architecture (JSI, Fabric, TurboModules).",
          a: `<p>The <strong>legacy bridge</strong> serialized JSON messages between JS and native on an async queue. That is why busy JS could stall native updates, and why passing large payloads was expensive.</p>
<p><strong>JSI</strong> lets JS hold references to C++ host objects and call them directly. <strong>TurboModules</strong> load native modules lazily through JSI. <strong>Fabric</strong> is the new renderer: a synchronous, concurrent-friendly shadow tree that can be driven from JS and C++.</p>
<p>Interview answer: New Architecture reduces serialization, enables better lists and layout, and is required for many modern libraries. Hermes is the default JS engine on both platforms in current RN.</p>`,
        },
        {
          id: "rn-js-threads",
          q: "What threads does React Native run on, and why do animations jank?",
          a: `<p>Typically: JS thread (React, business logic), UI / main thread (native views), and a shadow/layout thread. If JS is busy (heavy <code>setState</code>, JSON parse, re-render of a huge tree), <code>useNativeDriver: false</code> animations and gesture work hitch.</p>
<p>Reanimated 2+ runs worklets on the UI thread so animations stay smooth even when JS is busy. That is the expected advanced answer.</p>`,
        },
        {
          id: "rn-native-modules",
          q: "When do you write a native module?",
          a: `<p>When a capability does not exist in JS or the Expo SDK: a vendor SDK, background audio policy, Bluetooth edge cases, a custom camera pipeline. You implement native code (Swift/Kotlin) and expose it through the TurboModule spec or an Expo module.</p>
<p>Keep the surface small. Push as much logic as possible to JS so you do not maintain two platforms for every feature.</p>`,
        },
        {
          id: "rn-hermes",
          q: "What is Hermes and why does it matter?",
          a: `<p>Hermes is a React Native JS engine optimized for mobile: faster startup via bytecode, lower memory, and better stack traces than older JSC setups. It is the default. Some debugging and Intl differences existed historically; mention you verify Hermes-specific bugs before blaming React.</p>`,
        },
        {
          id: "rn-ota",
          q: "How do over-the-air updates work, and what can they not do?",
          a: `<p>Services like EAS Update / CodePush ship a new JS bundle (and assets) without a store review. Users get JS-only fixes quickly.</p>
<p>OTA <strong>cannot</strong> change native code: new permissions, new native modules, Hermes upgrades, or SDK bumps. Those need a binary release. Always version-gate updates so an old native app does not download an incompatible bundle.</p>`,
        },
        {
          id: "rn-security",
          q: "What security topics come up in RN interviews?",
          a: `<ul>
<li>Do not put secrets in the JS bundle — it can be extracted.</li>
<li>Use HTTPS, certificate pinning when the threat model needs it.</li>
<li>Store tokens in the OS secure storage, not AsyncStorage.</li>
<li>Jailbreak/root detection is a signal, not a guarantee.</li>
<li>Deep links can be spoofed; authenticate the user before acting on a link.</li>
</ul>`,
        },
        {
          id: "rn-testing",
          q: "How do you test React Native apps?",
          a: `<p>Jest + React Native Testing Library for components (prefer querying by text and accessibility labels). Detox or Maestro for e2e on simulators/devices. TypeScript for contract safety.</p>
<p>Mock native modules you do not own. Write accessibility labels that both VoiceOver and tests can use. CI should run unit tests on every PR and a smaller e2e smoke suite on main.</p>`,
        },
        {
          id: "rn-upgrade",
          q: "What is hard about upgrading React Native?",
          a: `<p>Native projects accumulate patches. Upgrades touch Gradle, CocoaPods, Autolinking, Flipper/DevTools, New Architecture flags, and third-party modules that lag behind.</p>
<p>Use the official upgrade helper, Expo’s versioned workflow when you can, and upgrade one major at a time with a native smoke test on both platforms. Mention this honestly — it shows production experience.</p>`,
        },
      ],
    },
  ],
};
