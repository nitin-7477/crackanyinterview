export const reactNative = {
  id: "react-native",
  title: "React Native",
  heading: "Same React, native views",
  tagline: "Components, navigation, native bridge, and performance",
  lede: "Last: take React knowledge onto iOS and Android. Interviewers want to know what is different from the web.",
  tip: "React Native is not a WebView wrapper. It uses React, but it draws native iOS and Android views. There is no HTML and no CSS file.",
  practice: {
    title: "Note",
    body: "Rewrite a simple web card as React Native: replace div with View, p/span with Text, img with Image, and CSS with a StyleSheet. Remember: all text must live inside Text.",
  },
  takeaways: [
    "React Native uses React, but it renders native views, not HTML.",
    "All text must be inside a Text component. Styling is StyleSheet plus Flexbox.",
    "Use FlatList for long lists. ScrollView renders every child at once.",
    "The New Architecture (JSI, Fabric, TurboModules) avoids the old JSON bridge.",
  ],
  sections: [
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
