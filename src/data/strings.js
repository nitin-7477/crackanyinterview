export const strings = {
  id: "strings",
  title: "Strings",
  heading: "10-day string practice",
  tagline: "From length and slice to subsequences",
  lede: "A 10-day JavaScript string practice, easy checks first and the harder algorithms last. Each question has a short solution you can paste into the console.",
  tip: "Try the function before you open the answer. Then change the sample input and run it again.",
  practice: {
    title: "Note",
    body: "These prompts follow the usual string exercise list, from basic edits to hard matching problems. Repeated titles are covered once.",
  },
  takeaways: [
    "Strings are immutable. Reverse, swap, and sort by copying the characters into an array.",
    "slice is the method to prefer. substring treats negative indexes differently, and substr counts a length.",
    "Most counting problems are one pass and a map. Most generation problems are recursion with a take-or-skip choice.",
  ],
  sections: [
  {
    "title": "Day 1 · Read and build strings",
    "level": "basic",
    "questions": [
      {
        "id": "str-length",
        "q": "How do you get the length of a string?",
        "a": "<pre><code>const s = \"GeeksforGeeks\";\nconsole.log(s.length);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>13</code></p>\n<p>length is a property, not a method. It counts UTF-16 code units, so one emoji can count as 2.</p>"
      },
      {
        "id": "str-access",
        "q": "How do you access a character in a string?",
        "a": "<pre><code>const s = \"Geeks\";\nconsole.log(s[0], s.at(-1), s.charAt(1));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>G s e</code></p>\n<p>Strings are indexed from 0. at(-1) reads from the end. charAt returns an empty string when the index is out of range, while [index] returns undefined.</p>"
      },
      {
        "id": "str-quotes",
        "q": "What is the difference between single quotes, double quotes, and backticks?",
        "a": "<pre><code>const name = \"Aman\";\nconsole.log('Hello ' + name);\nconsole.log(\"Hello \" + name);\nconsole.log(`Hello ${name}`);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Hello Aman<br>Hello Aman<br>Hello Aman</code></p>\n<p>Single and double quotes are ordinary strings. Backticks are template literals, so you can embed expressions with ${}.</p>"
      },
      {
        "id": "str-char-to-string",
        "q": "How do you turn a character code into a string?",
        "a": "<pre><code>console.log(String.fromCharCode(65));\nconsole.log(String.fromCodePoint(128512));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>A<br>😀</code></p>\n<p>fromCharCode builds a string from UTF-16 codes. fromCodePoint is the one to use for characters outside the basic set, such as emoji.</p>"
      },
      {
        "id": "str-concat",
        "q": "How do you concatenate strings?",
        "a": "<pre><code>const a = \"Hello\";\nconst b = \"World\";\nconsole.log(a.concat(\" \", b));\nconsole.log(`${a} ${b}`);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Hello World<br>Hello World</code></p>\n<p>concat returns a new string. Template literals are usually easier to read when you are joining a few pieces.</p>"
      },
      {
        "id": "str-ends",
        "q": "How do you get the first and last character?",
        "a": "<pre><code>const s = \"Geeks\";\nconsole.log(s[0], s.at(-1));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>G s</code></p>\n<p>The first character is index 0. The last character is index length - 1, which at(-1) expresses directly.</p>"
      },
      {
        "id": "str-first-three",
        "q": "How do you keep only the first N characters?",
        "a": "<pre><code>const s = \"GeeksforGeeks\";\nconsole.log(s.slice(0, 3));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Gee</code></p>\n<p>slice(0, n) returns the first n characters and does not change the original string.</p>"
      },
      {
        "id": "str-last-n",
        "q": "How do you get the last character, or the last N characters?",
        "a": "<pre><code>const s = \"GeeksforGeeks\";\nconsole.log(s.at(-1));\nconsole.log(s.slice(-4));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>s<br>eeks</code></p>\n<p>A negative slice index counts back from the end, so slice(-4) is the last four characters.</p>"
      },
      {
        "id": "str-first-word",
        "q": "How do you get the first word of a string?",
        "a": "<pre><code>const s = \"JavaScript string practice\";\nconsole.log(s.split(\" \")[0]);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>JavaScript</code></p>\n<p>split breaks the string on spaces. The first array item is the first word. Trim first if the string may start with spaces.</p>"
      },
      {
        "id": "str-iterate",
        "q": "How do you iterate over each character?",
        "a": "<pre><code>const s = \"Geeks\";\nconst chars = [];\nfor (const ch of s) chars.push(ch);\nconsole.log(chars.join(\",\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>G,e,e,k,s</code></p>\n<p>for...of walks the string one character at a time. Use it instead of a classic index loop when you only need each character.</p>"
      },
      {
        "id": "str-index-of",
        "q": "How do you find the index of a character?",
        "a": "<pre><code>const s = \"Geeks\";\nconsole.log(s.indexOf(\"e\"));\nconsole.log(s.indexOf(\"z\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>1<br>-1</code></p>\n<p>indexOf returns the first matching index, or -1 when the character is not there.</p>"
      },
      {
        "id": "str-add-chars",
        "q": "How do you add characters to a string?",
        "a": "<pre><code>let s = \"Geek\";\ns = s + \"s\";\nconsole.log(s.padEnd(8, \"!\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Geeks!!!</code></p>\n<p>Strings cannot be changed in place. Adding characters always creates a new string, whether you use +, concat, or padEnd.</p>"
      },
      {
        "id": "str-insert",
        "q": "How do you insert a string at a specific index?",
        "a": "<pre><code>const s = \"GeeksGeeks\";\nconst i = 5;\nconsole.log(s.slice(0, i) + \"for\" + s.slice(i));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>GeeksforGeeks</code></p>\n<p>Split the string at the index, place the new text in the middle, and join the three parts.</p>"
      },
      {
        "id": "str-affix",
        "q": "How do you add a prefix and a suffix?",
        "a": "<pre><code>const s = \"Geeks\";\nconsole.log(\"Hello \" + s + \"!\");</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Hello Geeks!</code></p>\n<p>A prefix is text added at the start and a suffix is text added at the end. Both produce a new string.</p>"
      },
      {
        "id": "str-pad",
        "q": "How do you pad a string to a specific length?",
        "a": "<pre><code>console.log(\"7\".padStart(3, \"0\"));\nconsole.log(\"Hi\".padEnd(5, \".\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>007<br>Hi...</code></p>\n<p>padStart adds characters on the left until the string reaches the given length. padEnd adds them on the right.</p>"
      },
      {
        "id": "str-generate",
        "q": "How do you generate a string of a specific length?",
        "a": "<pre><code>console.log(\"*\".repeat(5));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>*****</code></p>\n<p>repeat copies the string n times. It throws if n is negative or not a whole number.</p>"
      },
      {
        "id": "str-format",
        "q": "How do you format values into a string?",
        "a": "<pre><code>const name = \"Aman\";\nconst score = 18;\nconsole.log(`${name} scored ${score}/20`);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Aman scored 18/20</code></p>\n<p>Template literals interpolate values and keep the formatting in one place. You can also use concatenation when the pieces are simple.</p>"
      },
      {
        "id": "str-nth",
        "q": "How do you find the nth occurrence of a character?",
        "a": "<pre><code>function nthIndex(s, ch, n) {\n  let from = 0;\n  for (let seen = 0; seen &lt; n; seen += 1) {\n    const found = s.indexOf(ch, from);\n    if (found === -1) return -1;\n    if (seen === n - 1) return found;\n    from = found + 1;\n  }\n}\nconsole.log(nthIndex(\"GeeksforGeeks\", \"e\", 3));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>9</code></p>\n<p>Call indexOf again from just after the previous match. Return -1 when the character does not occur n times.</p>"
      }
    ]
  },
  {
    "title": "Day 2 · Edit, clean, and sort",
    "level": "basic",
    "questions": [
      {
        "id": "str-reverse",
        "q": "How do you reverse a string?",
        "a": "<pre><code>const s = \"Geeks\";\nconsole.log([...s].reverse().join(\"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>skeeG</code></p>\n<p>A string has no reverse method. Spread it into an array, reverse that array, then join it back.</p>"
      },
      {
        "id": "str-reverse-in-place",
        "q": "How do you reverse a string with two pointers?",
        "a": "<pre><code>function reverseInPlace(s) {\n  const chars = [...s];\n  let left = 0;\n  let right = chars.length - 1;\n  while (left &lt; right) {\n    [chars[left], chars[right]] = [chars[right], chars[left]];\n    left += 1;\n    right -= 1;\n  }\n  return chars.join(\"\");\n}\nconsole.log(reverseInPlace(\"Geeks\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>skeeG</code></p>\n<p>JavaScript strings are immutable, so the swap happens on a character array. The result is still a new string.</p>"
      },
      {
        "id": "str-remove-char",
        "q": "How do you remove a character from a string?",
        "a": "<pre><code>const s = \"Geeks\";\nconsole.log(s.replaceAll(\"e\", \"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Gks</code></p>\n<p>replaceAll removes every copy of that character. replace with a string only removes the first one.</p>"
      },
      {
        "id": "str-delete-first",
        "q": "How do you delete the first character?",
        "a": "<pre><code>console.log(\"Geeks\".slice(1));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>eeks</code></p>\n<p>slice(1) drops index 0 and keeps the rest.</p>"
      },
      {
        "id": "str-remove-last",
        "q": "How do you remove the last character?",
        "a": "<pre><code>console.log(\"Geeks\".slice(0, -1));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Geek</code></p>\n<p>slice(0, -1) stops one character before the end.</p>"
      },
      {
        "id": "str-remove-text",
        "q": "How do you remove a piece of text from a string?",
        "a": "<pre><code>console.log(\"Learn JavaScript today\".replace(\"JavaScript \", \"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Learn today</code></p>\n<p>replace removes the first exact match. Use replaceAll, or a global regular expression, when every copy should go.</p>"
      },
      {
        "id": "str-strip",
        "q": "How do you strip whitespace from the ends of a string?",
        "a": "<pre><code>console.log(\"  Geeks  \".trim());</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Geeks</code></p>\n<p>trim removes spaces, tabs, and line breaks from both ends. trimStart and trimEnd affect only one side.</p>"
      },
      {
        "id": "str-line-breaks",
        "q": "How do you remove all line breaks?",
        "a": "<pre><code>const s = \"Hello\\nGeeks\\r\\n\";\nconsole.log(JSON.stringify(s.replace(/\\r?\\n/g, \"\")));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>\"HelloGeeks\"</code></p>\n<p>The pattern matches both \\n and \\r\\n. The g flag removes every break, not just the first.</p>"
      },
      {
        "id": "str-spaces",
        "q": "How do you replace multiple spaces with a single space?",
        "a": "<pre><code>console.log(\"too    many   spaces\".replace(/\\s+/g, \" \").trim());</code></pre>\n<p><strong>Output</strong></p>\n<p><code>too many spaces</code></p>\n<p>\\s+ matches one or more whitespace characters. Replacing that run with one space collapses the gaps.</p>"
      },
      {
        "id": "str-slash",
        "q": "How do you replace every forward slash?",
        "a": "<pre><code>console.log(\"a/b/c\".replaceAll(\"/\", \"-\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>a-b-c</code></p>\n<p>replaceAll replaces every slash. A global regular expression, /\\//g, does the same job.</p>"
      },
      {
        "id": "str-replace-many",
        "q": "How do you replace multiple different characters?",
        "a": "<pre><code>const map = { a: \"@\", e: \"3\", s: \"$\" };\nconsole.log(\"geeks\".replace(/[aes]/g, (ch) =&gt; map[ch]));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>g33k$</code></p>\n<p>A character class matches any of the characters, and the replacer function decides what each one becomes.</p>"
      },
      {
        "id": "str-sort-string",
        "q": "How do you sort the characters of a string?",
        "a": "<pre><code>console.log([\"G\", ...\"eeks\"].sort().join(\"\"));\nconsole.log(\"dcba\".split(\"\").sort().join(\"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Geeks<br>abcd</code></p>\n<p>Sort the character array, then join it. Default sort is by UTF-16 code unit, so uppercase letters come before lowercase.</p>"
      },
      {
        "id": "str-alpha-sort",
        "q": "How do you sort a string alphabetically, ignoring case?",
        "a": "<pre><code>console.log(\"bAcD\".split(\"\").sort((a, b) =&gt; a.localeCompare(b, \"en\", { sensitivity: \"base\" })).join(\"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>AbcD</code></p>\n<p>localeCompare with base sensitivity compares letters without caring about case.</p>"
      },
      {
        "id": "str-capitalize",
        "q": "How do you capitalize the first letter?",
        "a": "<pre><code>const s = \"geeks\";\nconsole.log(s.charAt(0).toUpperCase() + s.slice(1));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Geeks</code></p>\n<p>Uppercase only the first character, then append the untouched remainder.</p>"
      },
      {
        "id": "str-non-numeric",
        "q": "How do you strip everything that is not a digit?",
        "a": "<pre><code>console.log(\"Order 42 for $7\".replace(/\\D/g, \"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>427</code></p>\n<p>\\D means not a digit. The g flag deletes every non-digit.</p>"
      },
      {
        "id": "str-swap",
        "q": "How do you swap two characters in a string?",
        "a": "<pre><code>function swap(s, i, j) {\n  const chars = [...s];\n  [chars[i], chars[j]] = [chars[j], chars[i]];\n  return chars.join(\"\");\n}\nconsole.log(swap(\"Geeks\", 0, 4));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>seekG</code></p>\n<p>Copy the characters into an array, swap the two indexes, and join. The original string stays the same.</p>"
      },
      {
        "id": "str-sort-array",
        "q": "How do you sort an array of strings?",
        "a": "<pre><code>console.log([\"banana\", \"Apple\", \"cherry\"].sort((a, b) =&gt; a.localeCompare(b)).join(\", \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Apple, banana, cherry</code></p>\n<p>localeCompare sorts words in dictionary order. A plain sort can put uppercase words before lowercase ones.</p>"
      },
      {
        "id": "str-textarea",
        "q": "How do you modify the text stored in a string the way you would edit a textarea?",
        "a": "<pre><code>let value = \"hello geeks\";\nvalue = value.replace(\"hello\", \"Hello\");\nconsole.log(value);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Hello geeks</code></p>\n<p>A textarea's value is just a string. Read it, build a new string, and write that new string back.</p>"
      }
    ]
  },
  {
    "title": "Day 3 · Checks and counts",
    "level": "basic",
    "questions": [
      {
        "id": "str-only-alpha",
        "q": "How do you check that a string has only letters?",
        "a": "<pre><code>console.log(/^[A-Za-z]+$/.test(\"Geeks\"));\nconsole.log(/^[A-Za-z]+$/.test(\"Gee1\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>^ and $ anchor the match to the whole string, so a single non-letter makes the test fail.</p>"
      },
      {
        "id": "str-count-alpha",
        "q": "How do you count the letters in a string?",
        "a": "<pre><code>const s = \"Hi 2 Geeks\";\nconsole.log((s.match(/[A-Za-z]/g) || []).length);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>7</code></p>\n<p>match with the g flag returns every letter. If there are none, match returns null, so fall back to an empty array.</p>"
      },
      {
        "id": "str-vowels",
        "q": "How do you count the vowels in a string?",
        "a": "<pre><code>const s = \"Geeks\";\nconsole.log((s.match(/[aeiou]/gi) || []).length);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>2</code></p>\n<p>The i flag counts both uppercase and lowercase vowels. This check treats only a, e, i, o, and u as vowels.</p>"
      },
      {
        "id": "str-vowel-or-consonant",
        "q": "How do you tell whether a letter is a vowel or a consonant?",
        "a": "<pre><code>function kind(ch) {\n  if (!/^[A-Za-z]$/.test(ch)) return \"not a letter\";\n  return /[aeiou]/i.test(ch) ? \"vowel\" : \"consonant\";\n}\nconsole.log(kind(\"A\"), kind(\"G\"), kind(\"4\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>vowel consonant not a letter</code></p>\n<p>First reject anything that is not a letter. Then test the five vowels. Every other letter is a consonant.</p>"
      },
      {
        "id": "str-has-digit",
        "q": "How do you check whether a string contains a digit?",
        "a": "<pre><code>console.log(/\\d/.test(\"room 4\"));\nconsole.log(/\\d/.test(\"room\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>\\d matches any digit from 0 to 9. test returns true as soon as it finds one.</p>"
      },
      {
        "id": "str-char-digit",
        "q": "How do you check whether a character is a digit?",
        "a": "<pre><code>console.log(/^\\d$/.test(\"7\"));\nconsole.log(/^\\d$/.test(\"a\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>The anchors make sure the whole character is a single digit, not a longer string that merely contains one.</p>"
      },
      {
        "id": "str-words",
        "q": "How do you count the words in a string?",
        "a": "<pre><code>function wordCount(s) {\n  const words = s.trim().split(/\\s+/).filter(Boolean);\n  return words.length;\n}\nconsole.log(wordCount(\"  JavaScript   string practice  \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>3</code></p>\n<p>Trim the ends, split on whitespace, and drop empty pieces so extra spaces are not counted as words.</p>"
      },
      {
        "id": "str-occurrences",
        "q": "How do you count how many times a word or substring occurs?",
        "a": "<pre><code>function countOf(s, part) {\n  return s.split(part).length - 1;\n}\nconsole.log(countOf(\"geeks for geeks\", \"geeks\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>2</code></p>\n<p>split cuts the string at every match. There is always one more piece than there are matches.</p>"
      },
      {
        "id": "str-char-count",
        "q": "How do you count one character, and then every character?",
        "a": "<pre><code>function counts(s) {\n  const map = {};\n  for (const ch of s.toLowerCase()) map[ch] = (map[ch] || 0) + 1;\n  return map;\n}\nconsole.log(JSON.stringify(counts(\"Geeks\")));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>{\"g\":1,\"e\":2,\"k\":1,\"s\":1}</code></p>\n<p>Walk the string once and add 1 for each character. Lowercasing first makes G and g the same letter.</p>"
      },
      {
        "id": "str-letters-only-count",
        "q": "How do you count each letter and ignore spaces and digits?",
        "a": "<pre><code>function letterCounts(s) {\n  const map = {};\n  for (const ch of s.toLowerCase()) {\n    if (ch &lt; \"a\" || ch &gt; \"z\") continue;\n    map[ch] = (map[ch] || 0) + 1;\n  }\n  return map;\n}\nconsole.log(JSON.stringify(letterCounts(\"A1 b a\")));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>{\"a\":2,\"b\":1}</code></p>\n<p>Skip anything outside a to z. The remaining letters are counted in one pass.</p>"
      },
      {
        "id": "str-equal",
        "q": "How do you check that two strings are exactly equal?",
        "a": "<pre><code>console.log(\"Geeks\" === \"Geeks\");\nconsole.log(\"Geeks\" === \"geeks\");</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>=== compares the characters and the case. It does not convert types.</p>"
      },
      {
        "id": "str-compare",
        "q": "How do you compare two strings in dictionary order?",
        "a": "<pre><code>console.log(\"apple\".localeCompare(\"banana\"));\nconsole.log(\"mango\".localeCompare(\"apple\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>-1<br>1</code></p>\n<p>localeCompare returns a negative number when the first string comes first, zero when they are equal, and a positive number otherwise.</p>"
      },
      {
        "id": "str-compare-ci",
        "q": "How do you compare two strings without caring about case?",
        "a": "<pre><code>function sameText(a, b) {\n  return a.toLowerCase() === b.toLowerCase();\n}\nconsole.log(sameText(\"Geeks\", \"geeks\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true</code></p>\n<p>Lowercase both sides, then use ===. localeCompare with sensitivity base is the alternative when accents matter.</p>"
      },
      {
        "id": "str-starts",
        "q": "How do you check whether a string starts with another string?",
        "a": "<pre><code>console.log(\"JavaScript\".startsWith(\"Java\"));\nconsole.log(\"JavaScript\".startsWith(\"Script\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>startsWith checks the beginning. endsWith checks the end. Both are case-sensitive.</p>"
      },
      {
        "id": "str-substring-check",
        "q": "How do you check whether a string contains a substring?",
        "a": "<pre><code>console.log(\"GeeksforGeeks\".includes(\"for\"));\nconsole.log(\"GeeksforGeeks\".indexOf(\"for\") !== -1);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>true</code></p>\n<p>includes is the direct check. indexOf is useful when you also need the position.</p>"
      },
      {
        "id": "str-repeated",
        "q": "How do you check whether any character is repeated?",
        "a": "<pre><code>function hasRepeat(s) {\n  return new Set(s).size !== [...s].length;\n}\nconsole.log(hasRepeat(\"Geeks\"));\nconsole.log(hasRepeat(\"Geek\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>true</code></p>\n<p>A Set keeps each character once. If its size is smaller than the string, something was repeated.</p>"
      },
      {
        "id": "str-unique",
        "q": "How do you find the unique characters in a string?",
        "a": "<pre><code>console.log([...new Set(\"Geeks\")].join(\"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Geks</code></p>\n<p>A Set preserves the first-seen order, so the joined result is the string with later duplicates removed.</p>"
      },
      {
        "id": "str-whitespace",
        "q": "How do you check whether a string contains whitespace?",
        "a": "<pre><code>console.log(/\\s/.test(\"hello world\"));\nconsole.log(/\\s/.test(\"hello\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>\\s matches a space, tab, or line break.</p>"
      },
      {
        "id": "str-start-pattern",
        "q": "How do you check that a string starts with a pattern?",
        "a": "<pre><code>console.log(/^JS/.test(\"JS practice\"));\nconsole.log(\"JS practice\".startsWith(\"JS\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>true</code></p>\n<p>A regular expression anchored with ^, or startsWith, both check only the beginning.</p>"
      }
    ]
  },
  {
    "title": "Day 4 · Convert, split, and find",
    "level": "basic",
    "questions": [
      {
        "id": "str-num-to-str",
        "q": "How do you convert a number to a string?",
        "a": "<pre><code>console.log(String(42));\nconsole.log((42).toString());</code></pre>\n<p><strong>Output</strong></p>\n<p><code>42<br>42</code></p>\n<p>String(value) works for any value. toString is called on the number itself.</p>"
      },
      {
        "id": "str-float-to-str",
        "q": "How do you convert a float to a string?",
        "a": "<pre><code>console.log(String(3.14));\nconsole.log((3.1 + 0.2).toFixed(1));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>3.14<br>3.3</code></p>\n<p>String keeps the normal number text. toFixed is useful when you want a fixed number of decimal places.</p>"
      },
      {
        "id": "str-str-to-bool",
        "q": "How do you convert a string to a boolean?",
        "a": "<pre><code>console.log(Boolean(\"Geeks\"));\nconsole.log(Boolean(\"\"));\nconsole.log(\"true\" === \"true\");</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false<br>true</code></p>\n<p>Any non-empty string is truthy, including the text false. If you mean the words true and false, compare the text instead of using Boolean().</p>"
      },
      {
        "id": "str-to-array",
        "q": "How do you convert a string to an array of characters?",
        "a": "<pre><code>console.log([\"G\", ...\"eeks\"].join(\"|\"));\nconsole.log(\"Geeks\".split(\"\").join(\"|\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>G|e|e|k|s<br>G|e|e|k|s</code></p>\n<p>split with an empty separator and the spread operator both produce one array item per character.</p>"
      },
      {
        "id": "str-csv",
        "q": "How do you convert a comma-separated string to an array?",
        "a": "<pre><code>console.log(\"html, css, js\".split(\",\").map((part) =&gt; part.trim()).join(\" | \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>html | css | js</code></p>\n<p>split on the comma, then trim each part so a space after a comma does not stick to the word.</p>"
      },
      {
        "id": "str-split-words",
        "q": "How do you split a string into words?",
        "a": "<pre><code>console.log(\"JavaScript string practice\".split(/\\s+/).join(\" | \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>JavaScript | string | practice</code></p>\n<p>Splitting on whitespace keeps each word and ignores repeated spaces.</p>"
      },
      {
        "id": "str-multiline",
        "q": "How do you convert a multiline string to an array?",
        "a": "<pre><code>const s = \"one\\ntwo\\r\\nthree\";\nconsole.log(s.split(/\\r?\\n/).join(\" | \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>one | two | three</code></p>\n<p>The pattern accepts both Unix and Windows line endings.</p>"
      },
      {
        "id": "str-bytes",
        "q": "How do you convert a byte array to a string, and back?",
        "a": "<pre><code>const bytes = new TextEncoder().encode(\"Geeks\");\nconsole.log([...bytes].join(\",\"));\nconsole.log(new TextDecoder().decode(bytes));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>71,101,101,107,115<br>Geeks</code></p>\n<p>TextEncoder writes UTF-8 bytes. TextDecoder turns those bytes back into text.</p>"
      },
      {
        "id": "str-slice-substring",
        "q": "What is the difference between slice and substring?",
        "a": "<pre><code>const s = \"Geeks\";\nconsole.log(s.slice(1, 4), s.substring(1, 4));\nconsole.log(s.slice(-2), s.substring(-2));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>eek eek<br>ks Geeks</code></p>\n<p>With positive indexes they match. slice accepts a negative index. substring treats a negative index as 0 and also swaps the indexes if the end comes first.</p>"
      },
      {
        "id": "str-substr-substring",
        "q": "What is the difference between substr and substring?",
        "a": "<pre><code>const s = \"Geeks\";\nconsole.log(s.substr(1, 3));\nconsole.log(s.substring(1, 3));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>eek<br>ee</code></p>\n<p>substr(start, length) takes a length. substring(start, end) takes an end index and does not include that index. Prefer slice in new code.</p>"
      },
      {
        "id": "str-small-large",
        "q": "How do you find the smallest and largest word?",
        "a": "<pre><code>function ends(s) {\n  const words = s.split(/\\s+/);\n  const sorted = [...words].sort((a, b) =&gt; a.length - b.length);\n  return [sorted[0], sorted.at(-1)].join(\", \");\n}\nconsole.log(ends(\"a longer tiny word\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>a, longer</code></p>\n<p>Sort a copy by length. The first item is the shortest word and the last item is the longest.</p>"
      },
      {
        "id": "str-first-sub",
        "q": "How do you find the first occurrence of a substring?",
        "a": "<pre><code>console.log(\"GeeksforGeeks\".indexOf(\"for\"));\nconsole.log(\"GeeksforGeeks\".indexOf(\"zzz\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>5<br>-1</code></p>\n<p>indexOf scans from the left and returns the starting index, or -1.</p>"
      },
      {
        "id": "str-last-sub",
        "q": "How do you find the last occurrence of a substring?",
        "a": "<pre><code>console.log(\"GeeksforGeeks\".lastIndexOf(\"Geeks\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>8</code></p>\n<p>lastIndexOf scans from the right and returns the start of the final match.</p>"
      },
      {
        "id": "str-roman",
        "q": "How do you convert a positive integer to Roman numerals?",
        "a": "<pre><code>function toRoman(num) {\n  const pairs = [[1000,\"M\"],[900,\"CM\"],[500,\"D\"],[400,\"CD\"],[100,\"C\"],[90,\"XC\"],[50,\"L\"],[40,\"XL\"],[10,\"X\"],[9,\"IX\"],[5,\"V\"],[4,\"IV\"],[1,\"I\"]];\n  let out = \"\";\n  for (const [value, glyph] of pairs) {\n    while (num &gt;= value) {\n      out += glyph;\n      num -= value;\n    }\n  }\n  return out;\n}\nconsole.log(toRoman(1994));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>MCMXCIV</code></p>\n<p>Greedily take the largest Roman value that still fits, including the subtractive pairs such as CM and IV.</p>"
      }
    ]
  },
  {
    "title": "Day 5 · Clean, case, and palindromes",
    "level": "intermediate",
    "questions": [
      {
        "id": "str-extract-number",
        "q": "How do you extract the numbers from a string?",
        "a": "<pre><code>console.log(\"Order 42 and room 7\".match(/\\d+/g).join(\", \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>42, 7</code></p>\n<p>\\d+ matches each run of digits. The result is an array of the number texts, which you can turn into real numbers with Number.</p>"
      },
      {
        "id": "str-palindrome",
        "q": "How do you check whether a string is a palindrome?",
        "a": "<pre><code>function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, \"\");\n  return clean === [...clean].reverse().join(\"\");\n}\nconsole.log(isPalindrome(\"A man, a plan, a canal: Panama\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true</code></p>\n<p>Ignore case and punctuation, then compare the string with its reverse.</p>"
      },
      {
        "id": "str-title-case",
        "q": "How do you convert a string to title case?",
        "a": "<pre><code>const s = \"javascript string practice\";\nconsole.log(s.replace(/\\b\\w/g, (ch) =&gt; ch.toUpperCase()));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Javascript String Practice</code></p>\n<p>\\b\\w matches the first character of each word. Uppercase only that character.</p>"
      },
      {
        "id": "str-sentences",
        "q": "How do you capitalize the first letter of each sentence?",
        "a": "<pre><code>const s = \"hello there. practice strings.\";\nconsole.log(s.replace(/(^|\\.\\s+)(\\w)/g, (_, lead, ch) =&gt; lead + ch.toUpperCase()));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Hello there. Practice strings.</code></p>\n<p>The pattern finds a letter at the start of the text or after a period and a space.</p>"
      },
      {
        "id": "str-ellipsis",
        "q": "How do you truncate a string and add an ellipsis?",
        "a": "<pre><code>function truncate(s, max) {\n  if (s.length &lt;= max) return s;\n  return s.slice(0, max - 3) + \"...\";\n}\nconsole.log(truncate(\"JavaScript practice\", 13));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>JavaScript...</code></p>\n<p>Keep the budget for the three dots inside the maximum length. Leave short strings unchanged.</p>"
      },
      {
        "id": "str-toggle",
        "q": "How do you toggle the case of each character?",
        "a": "<pre><code>const s = \"Geeks\";\nconsole.log([...s].map((ch) =&gt; ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()).join(\"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>gEEKS</code></p>\n<p>If a character is already uppercase, lowercase it. Otherwise uppercase it. Non-letters stay the same because both conversions return the same character.</p>"
      },
      {
        "id": "str-punctuation",
        "q": "How do you remove punctuation from a string?",
        "a": "<pre><code>console.log(\"Hello, Geeks!\".replace(/[^\\w\\s]|_/g, \"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Hello Geeks</code></p>\n<p>Keep letters, digits, and whitespace. Everything else, including underscores, is punctuation here.</p>"
      },
      {
        "id": "str-non-alnum",
        "q": "How do you remove non-alphanumeric characters?",
        "a": "<pre><code>console.log(\"Hi, Geeks! 2\".replace(/[^A-Za-z0-9]/g, \"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>HiGeeks2</code></p>\n<p>The negated class deletes every character that is not a letter or a digit, including spaces.</p>"
      },
      {
        "id": "str-non-ascii",
        "q": "How do you remove non-ASCII characters?",
        "a": "<pre><code>console.log(\"Cafe\\u0301 Geeks\".replace(/[^\\x00-\\x7F]/g, \"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Cafe Geeks</code></p>\n<p>ASCII characters are the code points from 0 to 127. The pattern deletes anything outside that range.</p>"
      },
      {
        "id": "str-dots",
        "q": "How do you replace the dots in a string?",
        "a": "<pre><code>console.log(\"192.168.0.1\".replaceAll(\".\", \"-\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>192-168-0-1</code></p>\n<p>In a string replace, a dot is just a dot. In a regular expression, a bare dot matches any character, so write \\\\. when you use one.</p>"
      },
      {
        "id": "str-replace-strings",
        "q": "How do you replace several different words?",
        "a": "<pre><code>const words = { JS: \"JavaScript\", css: \"CSS\" };\nlet s = \"Learn JS and css\";\nfor (const [from, to] of Object.entries(words)) s = s.replaceAll(from, to);\nconsole.log(s);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Learn JavaScript and CSS</code></p>\n<p>Walk the dictionary and replace one word at a time. Replace longer keys first if one key could contain another.</p>"
      },
      {
        "id": "str-remove-all-char",
        "q": "How do you remove every occurrence of one character?",
        "a": "<pre><code>console.log(\"Geeks\".replaceAll(\"e\", \"\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Gks</code></p>\n<p>replaceAll is the direct tool. Splitting on the character and joining with an empty string is another way to drop it.</p>"
      },
      {
        "id": "str-consecutive",
        "q": "How do you remove consecutive duplicate characters?",
        "a": "<pre><code>function squeeze(s) {\n  let out = \"\";\n  for (const ch of s) if (ch !== out.at(-1)) out += ch;\n  return out;\n}\nconsole.log(squeeze(\"ggeeeksss\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>geks</code></p>\n<p>Append a character only when it is different from the last character already kept.</p>"
      },
      {
        "id": "str-urlify",
        "q": "How do you replace spaces with %20?",
        "a": "<pre><code>console.log(\"Mr John Smith\".trim().replaceAll(\" \", \"%20\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>Mr%20John%20Smith</code></p>\n<p>This is the URLify step: trim the ends, then encode each remaining space. encodeURIComponent encodes more than spaces.</p>"
      },
      {
        "id": "str-inner-quotes",
        "q": "How do you put quotes inside a string?",
        "a": "<pre><code>console.log('He said \"practice\".');\nconsole.log(\"It's a string.\");\nconsole.log(`Both \"quotes\" and it's are fine`);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>He said \"practice\".<br>It's a string.<br>Both \"quotes\" and it's are fine</code></p>\n<p>Use the other quote style around the string, or escape the same quote with a backslash. Backticks avoid the clash.</p>"
      },
      {
        "id": "str-recursive-palindrome",
        "q": "How do you check a palindrome recursively?",
        "a": "<pre><code>function isPal(s, left = 0, right = s.length - 1) {\n  if (left &gt;= right) return true;\n  if (s[left] !== s[right]) return false;\n  return isPal(s, left + 1, right - 1);\n}\nconsole.log(isPal(\"level\"));\nconsole.log(isPal(\"geeks\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>Compare the outer characters. If they match, check the inside of the string. The base case is a string of length 0 or 1.</p>"
      }
    ]
  },
  {
    "title": "Day 6 · Patterns, words, and lookup",
    "level": "intermediate",
    "questions": [
      {
        "id": "str-regexp",
        "q": "What does a JavaScript regular expression do on a string?",
        "a": "<pre><code>const s = \"Geeks 42\";\nconsole.log(/\\d+/.exec(s)[0]);\nconsole.log(s.match(/[A-Z]/)[0]);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>42<br>G</code></p>\n<p>A regular expression describes a pattern. test asks whether it matches, match and exec return what matched.</p>"
      },
      {
        "id": "str-input-regexp",
        "q": "How do you turn user text into a regular expression safely?",
        "a": "<pre><code>function toRegExp(text) {\n  const escaped = text.replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&amp;\");\n  return new RegExp(escaped, \"i\");\n}\nconsole.log(toRegExp(\"Geeks.for\").test(\"geeks.for\"));\nconsole.log(toRegExp(\"Geeks.for\").test(\"geeksXfor\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>Escape the special characters first. Otherwise a dot in the user's text matches any character.</p>"
      },
      {
        "id": "str-anagram",
        "q": "How do you check whether two strings are anagrams?",
        "a": "<pre><code>function sorted(s) {\n  return [...s.toLowerCase()].sort().join(\"\");\n}\nconsole.log(sorted(\"listen\") === sorted(\"silent\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true</code></p>\n<p>Anagrams use the same letters the same number of times. Sorting both strings makes that easy to compare.</p>"
      },
      {
        "id": "str-permutation",
        "q": "How do you check whether two strings are permutations of each other?",
        "a": "<pre><code>function counts(s) {\n  const map = {};\n  for (const ch of s) map[ch] = (map[ch] || 0) + 1;\n  return JSON.stringify(map);\n}\nconsole.log(counts(\"abc\") === counts(\"cba\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>false</code></p>\n<p>A permutation has the same characters with the same frequencies. Counting is enough, and it keeps the original case.</p>"
      },
      {
        "id": "str-isomorphic",
        "q": "How do you check whether two strings are isomorphic?",
        "a": "<pre><code>function isomorphic(a, b) {\n  if (a.length !== b.length) return false;\n  const ab = new Map();\n  const ba = new Map();\n  for (let i = 0; i &lt; a.length; i += 1) {\n    if (ab.has(a[i]) &amp;&amp; ab.get(a[i]) !== b[i]) return false;\n    if (ba.has(b[i]) &amp;&amp; ba.get(b[i]) !== a[i]) return false;\n    ab.set(a[i], b[i]);\n    ba.set(b[i], a[i]);\n  }\n  return true;\n}\nconsole.log(isomorphic(\"egg\", \"add\"));\nconsole.log(isomorphic(\"foo\", \"bar\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>Each character in the first string must always map to the same character in the second, and that mapping must stay one-to-one.</p>"
      },
      {
        "id": "str-pangram",
        "q": "How do you check whether a string is a pangram?",
        "a": "<pre><code>function isPangram(s) {\n  const letters = new Set(s.toLowerCase().match(/[a-z]/g));\n  return letters.size === 26;\n}\nconsole.log(isPangram(\"The quick brown fox jumps over the lazy dog\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true</code></p>\n<p>A pangram uses every letter at least once. Collect the letters in a Set and see whether all 26 are present.</p>"
      },
      {
        "id": "str-repeating-substring",
        "q": "How do you check whether a string is made by repeating a substring?",
        "a": "<pre><code>function repeated(s) {\n  return (s + s).indexOf(s, 1) !== s.length;\n}\nconsole.log(repeated(\"abab\"));\nconsole.log(repeated(\"aba\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>If s is several copies of a block, s appears again inside s + s before the final position.</p>"
      },
      {
        "id": "str-equal-frequency",
        "q": "How do you check whether every character has the same frequency?",
        "a": "<pre><code>function equalFrequency(s) {\n  const map = {};\n  for (const ch of s) map[ch] = (map[ch] || 0) + 1;\n  return new Set(Object.values(map)).size === 1;\n}\nconsole.log(equalFrequency(\"aabbcc\"));\nconsole.log(equalFrequency(\"aabbc\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>Count each character. If the set of those counts has one value, every character occurred the same number of times.</p>"
      },
      {
        "id": "str-frequent-word",
        "q": "How do you find the most frequent word?",
        "a": "<pre><code>function mostFrequent(s) {\n  const map = {};\n  for (const word of s.toLowerCase().split(/\\s+/)) map[word] = (map[word] || 0) + 1;\n  return Object.entries(map).sort((a, b) =&gt; b[1] - a[1])[0][0];\n}\nconsole.log(mostFrequent(\"js js css js html\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>js</code></p>\n<p>Count the words, then sort the entries by count. The first entry is the winner. Break ties explicitly if the problem requires it.</p>"
      },
      {
        "id": "str-second-word",
        "q": "How do you find the second most repeated word?",
        "a": "<pre><code>function secondWord(s) {\n  const map = {};\n  for (const word of s.toLowerCase().split(/\\s+/)) map[word] = (map[word] || 0) + 1;\n  const ranked = Object.entries(map).sort((a, b) =&gt; b[1] - a[1]);\n  return ranked[1] ? ranked[1][0] : \"\";\n}\nconsole.log(secondWord(\"js js css css css html\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>js</code></p>\n<p>Use the same counts as the most-frequent-word problem and take the second entry after sorting.</p>"
      },
      {
        "id": "str-emails",
        "q": "How do you extract email addresses from a string?",
        "a": "<pre><code>const s = \"Write to a@test.com or b@test.com today\";\nconsole.log(s.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}/gi).join(\", \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>a@test.com, b@test.com</code></p>\n<p>The pattern looks for local-part @ domain . ending. Real email rules are larger than this, so treat it as a practical extractor, not a full validator.</p>"
      },
      {
        "id": "str-urls",
        "q": "How do you extract URLs from a string?",
        "a": "<pre><code>const s = \"See https://example.com and http://test.dev/docs\";\nconsole.log(s.match(/https?:\\/\\/[^\\s]+/g).join(\", \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>https://example.com, http://test.dev/docs</code></p>\n<p>Match http or https, then take the non-space characters that follow.</p>"
      },
      {
        "id": "str-json",
        "q": "How do you validate a JSON string?",
        "a": "<pre><code>function isJson(text) {\n  try {\n    JSON.parse(text);\n    return true;\n  } catch {\n    return false;\n  }\n}\nconsole.log(isJson('{\"name\":\"Aman\"}'));\nconsole.log(isJson(\"{name:Aman}\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>JSON.parse throws on invalid JSON. A try/catch turns that throw into a yes or no.</p>"
      },
      {
        "id": "str-date",
        "q": "How do you convert a string to a Date?",
        "a": "<pre><code>const date = new Date(\"2026-09-24T00:00:00Z\");\nconsole.log(Number.isNaN(date.getTime()) ? \"invalid\" : date.toISOString().slice(0, 10));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>2026-09-24</code></p>\n<p>new Date parses the text. Check getTime() for NaN before you trust the result, because an invalid date does not throw.</p>"
      },
      {
        "id": "str-object-string",
        "q": "How do you convert an object to a string?",
        "a": "<pre><code>console.log(JSON.stringify({ name: \"Aman\", score: 18 }));\nconsole.log(String({ name: \"Aman\" }));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>{\"name\":\"Aman\",\"score\":18}<br>[object Object]</code></p>\n<p>JSON.stringify keeps the data. String(object) only produces [object Object], so it is not a useful conversion.</p>"
      },
      {
        "id": "str-hash",
        "q": "How do you hash a string to a number?",
        "a": "<pre><code>function hash(s) {\n  let value = 0;\n  for (const ch of s) value = (value * 33 + ch.codePointAt(0)) &gt;&gt;&gt; 0;\n  return value;\n}\nconsole.log(hash(\"Geeks\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>87943663</code></p>\n<p>This is a small string hash, not a security hash. Multiply the running total, add the character code, and keep the value unsigned.</p>"
      },
      {
        "id": "str-base64",
        "q": "How do you encode a string as Base64?",
        "a": "<pre><code>console.log(btoa(\"Geeks\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>R2Vla3M=</code></p>\n<p>btoa encodes a binary string as Base64. For Unicode text, encode it to bytes first. Image files need a FileReader or a byte buffer, not the image tag text.</p>"
      },
      {
        "id": "str-char-options",
        "q": "How do you match a character against several allowed options?",
        "a": "<pre><code>console.log(/^[aeiou]$/i.test(\"E\"));\nconsole.log([\"a\", \"e\", \"i\", \"o\", \"u\"].includes(\"g\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>A character class or an includes check both answer whether the character is one of the allowed options.</p>"
      }
    ]
  },
  {
    "title": "Day 7 · Binary strings and frequency",
    "level": "intermediate",
    "questions": [
      {
        "id": "str-to-binary",
        "q": "How do you convert a string's character codes to binary?",
        "a": "<pre><code>console.log([... \"AB\"].map((ch) =&gt; ch.codePointAt(0).toString(2)).join(\" \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>1000001 1000010</code></p>\n<p>Each character has a numeric code. toString(2) prints that code in binary.</p>"
      },
      {
        "id": "str-add-binary",
        "q": "How do you add two binary strings?",
        "a": "<pre><code>function addBinary(a, b) {\n  return (BigInt(\"0b\" + a) + BigInt(\"0b\" + b)).toString(2);\n}\nconsole.log(addBinary(\"11\", \"1\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>100</code></p>\n<p>Prefix 0b so BigInt reads the text as binary, add the values, and convert the sum back to base 2.</p>"
      },
      {
        "id": "str-add-many-binary",
        "q": "How do you add more than two binary strings?",
        "a": "<pre><code>function addAll(list) {\n  return list.reduce((sum, bits) =&gt; sum + BigInt(\"0b\" + bits), 0n).toString(2);\n}\nconsole.log(addAll([\"1\", \"11\", \"10\"]));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>110</code></p>\n<p>Start from 0n and fold BigInt addition across the list.</p>"
      },
      {
        "id": "str-next-binary",
        "q": "How do you find the binary representation of the next number?",
        "a": "<pre><code>function nextBinary(bits) {\n  return (BigInt(\"0b\" + bits) + 1n).toString(2);\n}\nconsole.log(nextBinary(\"11\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>100</code></p>\n<p>Interpret the string as a binary integer, add one, and print it in binary again.</p>"
      },
      {
        "id": "str-order-pattern",
        "q": "How do you check whether characters stay in a required order?",
        "a": "<pre><code>function follows(s, order) {\n  let look = 0;\n  for (const ch of s) {\n    if (ch === order[look]) look += 1;\n    if (look === order.length) return true;\n  }\n  return look === order.length;\n}\nconsole.log(follows(\"abcde\", \"ace\"));\nconsole.log(follows(\"abcde\", \"aec\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>Walk the string once and advance through the pattern only when the next required character appears. The pattern may skip other characters, but it cannot go backwards.</p>"
      },
      {
        "id": "str-kth-unique",
        "q": "How do you find the kth non-repeating character?",
        "a": "<pre><code>function kthUnique(s, k) {\n  const map = {};\n  for (const ch of s) map[ch] = (map[ch] || 0) + 1;\n  const once = [...s].filter((ch) =&gt; map[ch] === 1);\n  return once[k - 1] || \"\";\n}\nconsole.log(kthUnique(\"geeksforgeeks\", 3));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>r</code></p>\n<p>Count every character, keep the ones that occurred once, and preserve their original order. The kth item of that list is the answer.</p>"
      },
      {
        "id": "str-mask",
        "q": "How do you mask every character except the last few?",
        "a": "<pre><code>function mask(s, keep = 4) {\n  if (s.length &lt;= keep) return s;\n  return \"*\".repeat(s.length - keep) + s.slice(-keep);\n}\nconsole.log(mask(\"1234567890\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>******7890</code></p>\n<p>Repeat the mask for the hidden prefix, then append the unmasked tail.</p>"
      },
      {
        "id": "str-with-digit",
        "q": "How do you keep only the words that contain a digit?",
        "a": "<pre><code>const words = [\"room\", \"a1\", \"js\", \"v8\"];\nconsole.log(words.filter((word) =&gt; /\\d/.test(word)).join(\", \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>a1, v8</code></p>\n<p>Test each word for a digit and keep the matches.</p>"
      },
      {
        "id": "str-alpha-frequency",
        "q": "How do you print letter frequency in alphabetical order?",
        "a": "<pre><code>function frequency(s) {\n  const map = {};\n  for (const ch of s.toLowerCase()) {\n    if (ch &lt; \"a\" || ch &gt; \"z\") continue;\n    map[ch] = (map[ch] || 0) + 1;\n  }\n  return Object.keys(map).sort().map((ch) =&gt; ch + map[ch]).join(\" \");\n}\nconsole.log(frequency(\"Geeks\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>e2 g1 k1 s1</code></p>\n<p>Count the letters, sort the keys, and print each letter with its count.</p>"
      },
      {
        "id": "str-equal-pairs",
        "q": "How do you count pairs of equal characters?",
        "a": "<pre><code>function pairs(s) {\n  const map = {};\n  let total = 0;\n  for (const ch of s) {\n    total += map[ch] || 0;\n    map[ch] = (map[ch] || 0) + 1;\n  }\n  return total;\n}\nconsole.log(pairs(\"aabb\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>2</code></p>\n<p>Each new character pairs with every earlier copy of itself. Adding the current count before you increment it counts those pairs.</p>"
      },
      {
        "id": "str-alternate-flips",
        "q": "How many flips make a binary string alternate?",
        "a": "<pre><code>function flips(s) {\n  let start0 = 0;\n  let start1 = 0;\n  for (let i = 0; i &lt; s.length; i += 1) {\n    if (s[i] !== String(i % 2)) start0 += 1;\n    if (s[i] !== String((i + 1) % 2)) start1 += 1;\n  }\n  return Math.min(start0, start1);\n}\nconsole.log(flips(\"000101\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>1</code></p>\n<p>There are two target patterns, starting with 0 or starting with 1. Count the mismatches for each and keep the smaller count.</p>"
      },
      {
        "id": "str-one-flip",
        "q": "Can one flip make all bits in a binary string the same?",
        "a": "<pre><code>function oneFlip(s) {\n  const zeros = [...s].filter((ch) =&gt; ch === \"0\").length;\n  const ones = s.length - zeros;\n  return zeros &lt;= 1 || ones &lt;= 1;\n}\nconsole.log(oneFlip(\"11101\"));\nconsole.log(oneFlip(\"11001\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>The string is already uniform, or one flip away, when at least one of the two bit counts is 0 or 1.</p>"
      },
      {
        "id": "str-min-uniform",
        "q": "What is the minimum number of flips that makes every bit the same?",
        "a": "<pre><code>function minUniform(s) {\n  const zeros = [...s].filter((ch) =&gt; ch === \"0\").length;\n  return Math.min(zeros, s.length - zeros);\n}\nconsole.log(minUniform(\"1100\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>2</code></p>\n<p>Flip all the zeros, or flip all the ones. The cheaper of those two choices is the answer.</p>"
      },
      {
        "id": "str-reversible",
        "q": "How do you check whether a string is perfectly reversible?",
        "a": "<pre><code>function isReversible(s) {\n  return s === [...s].reverse().join(\"\");\n}\nconsole.log(isReversible(\"aba\"));\nconsole.log(isReversible(\"abab\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>A perfectly reversible string reads the same forwards and backwards. Compare it with the joined reverse of its characters.</p>"
      }
    ]
  },
  {
    "title": "Day 8 · Generate, permute, and decode",
    "level": "advanced",
    "questions": [
      {
        "id": "str-permutations",
        "q": "How do you print all permutations of a string?",
        "a": "<pre><code>function permutations(s) {\n  if (s.length &lt;= 1) return [s];\n  const out = [];\n  for (let i = 0; i &lt; s.length; i += 1) {\n    const rest = s.slice(0, i) + s.slice(i + 1);\n    for (const tail of permutations(rest)) out.push(s[i] + tail);\n  }\n  return out;\n}\nconsole.log(permutations(\"abc\").join(\", \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>abc, acb, bac, bca, cab, cba</code></p>\n<p>Choose each character as the first character, then permute what remains. Duplicate characters produce duplicate permutations unless you skip repeated choices.</p>"
      },
      {
        "id": "str-place-spaces",
        "q": "How do you generate every way to place spaces in a string?",
        "a": "<pre><code>function withSpaces(s) {\n  const out = [];\n  function walk(index, built) {\n    if (index === s.length) {\n      out.push(built);\n      return;\n    }\n    const next = built ? built + \" \" + s[index] : s[index];\n    walk(index + 1, built + s[index]);\n    if (built) walk(index + 1, next);\n  }\n  walk(0, \"\");\n  return out;\n}\nconsole.log(withSpaces(\"ABC\").join(\" | \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>ABC | AB C | A BC | A B C</code></p>\n<p>At each later character, either glue it to the current block or start a new block with a space.</p>"
      },
      {
        "id": "str-pattern-binary",
        "q": "How do you generate binary strings from a pattern of 0, 1, and ?",
        "a": "<pre><code>function expand(pattern) {\n  const out = [];\n  function walk(i, built) {\n    if (i === pattern.length) {\n      out.push(built);\n      return;\n    }\n    if (pattern[i] === \"?\") {\n      walk(i + 1, built + \"0\");\n      walk(i + 1, built + \"1\");\n    } else walk(i + 1, built + pattern[i]);\n  }\n  walk(0, \"\");\n  return out;\n}\nconsole.log(expand(\"1?0\").join(\", \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>100, 110</code></p>\n<p>Copy fixed bits as they are. Whenever you see ?, branch into both 0 and 1.</p>"
      },
      {
        "id": "str-lex-next",
        "q": "How do you find the next string in dictionary order?",
        "a": "<pre><code>function nextPermutation(s) {\n  const chars = [...s];\n  let i = chars.length - 2;\n  while (i &gt;= 0 &amp;&amp; chars[i] &gt;= chars[i + 1]) i -= 1;\n  if (i &lt; 0) return \"no successor\";\n  let j = chars.length - 1;\n  while (chars[j] &lt;= chars[i]) j -= 1;\n  [chars[i], chars[j]] = [chars[j], chars[i]];\n  return chars.slice(0, i + 1).concat(chars.slice(i + 1).reverse()).join(\"\");\n}\nconsole.log(nextPermutation(\"acb\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>bac</code></p>\n<p>Find the rightmost character that is smaller than the character after it, swap it with the next larger character on its right, and reverse the suffix.</p>"
      },
      {
        "id": "str-reverse-consonants",
        "q": "How do you reverse only the consonants?",
        "a": "<pre><code>function reverseConsonants(s) {\n  const chars = [...s];\n  const isConsonant = (ch) =&gt; /[A-Za-z]/.test(ch) &amp;&amp; !/[aeiou]/i.test(ch);\n  let left = 0;\n  let right = chars.length - 1;\n  while (left &lt; right) {\n    while (left &lt; right &amp;&amp; !isConsonant(chars[left])) left += 1;\n    while (left &lt; right &amp;&amp; !isConsonant(chars[right])) right -= 1;\n    [chars[left], chars[right]] = [chars[right], chars[left]];\n    left += 1;\n    right -= 1;\n  }\n  return chars.join(\"\");\n}\nconsole.log(reverseConsonants(\"geeks\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>seekg</code></p>\n<p>Move two pointers toward the middle, but swap only when both land on consonants. Vowels and other characters stay where they are.</p>"
      },
      {
        "id": "str-rotation-palindrome",
        "q": "How do you check whether any rotation of a string is a palindrome?",
        "a": "<pre><code>function rotationIsPalindrome(s) {\n  const doubled = s + s;\n  const reversed = [...s].reverse().join(\"\");\n  return doubled.includes(reversed);\n}\nconsole.log(rotationIsPalindrome(\"aab\"));\nconsole.log(rotationIsPalindrome(\"abc\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>Some rotation is a palindrome when the reverse of the string appears inside s + s.</p>"
      },
      {
        "id": "str-front-palindrome",
        "q": "How many characters must you add in front to make a palindrome?",
        "a": "<pre><code>function extraFront(s) {\n  const reversed = [...s].reverse().join(\"\");\n  const combined = s + \"#\" + reversed;\n  const pi = [0];\n  for (let i = 1; i &lt; combined.length; i += 1) {\n    let len = pi[i - 1];\n    while (len &gt; 0 &amp;&amp; combined[i] !== combined[len]) len = pi[len - 1];\n    pi[i] = combined[i] === combined[len] ? len + 1 : 0;\n  }\n  return s.length - pi.at(-1);\n}\nconsole.log(extraFront(\"AACECAAAA\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>2</code></p>\n<p>The prefix table of s + # + reverse(s) tells you the longest prefix that is already a palindromic suffix. Add the missing front characters.</p>"
      },
      {
        "id": "str-decode-repeat",
        "q": "How do you decode a string like 3[a2[c]]?",
        "a": "<pre><code>function decode(s) {\n  const stack = [];\n  let current = \"\";\n  let count = 0;\n  for (const ch of s) {\n    if (ch &gt;= \"0\" &amp;&amp; ch &lt;= \"9\") count = count * 10 + Number(ch);\n    else if (ch === \"[\") {\n      stack.push([current, count]);\n      current = \"\";\n      count = 0;\n    } else if (ch === \"]\") {\n      const [prev, times] = stack.pop();\n      current = prev + current.repeat(times);\n    } else current += ch;\n  }\n  return current;\n}\nconsole.log(decode(\"3[a]2[bc]\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>aaabcbc</code></p>\n<p>Push the text and the repeat count when you see [. When you see ], repeat the current text and attach it to the previous text.</p>"
      },
      {
        "id": "str-decode-ways",
        "q": "How many ways can a digit string be decoded if a is 1 and z is 26?",
        "a": "<pre><code>function ways(s) {\n  const dp = [1, s[0] === \"0\" ? 0 : 1];\n  for (let i = 2; i &lt;= s.length; i += 1) {\n    let total = 0;\n    if (s[i - 1] !== \"0\") total += dp[i - 1];\n    const pair = Number(s.slice(i - 2, i));\n    if (pair &gt;= 10 &amp;&amp; pair &lt;= 26) total += dp[i - 2];\n    dp[i] = total;\n  }\n  return dp[s.length];\n}\nconsole.log(ways(\"226\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>3</code></p>\n<p>A digit can stand alone, and a pair can stand together when it is from 10 to 26. Add those two choices at each position.</p>"
      },
      {
        "id": "str-subsequences",
        "q": "How do you print every subsequence of a string?",
        "a": "<pre><code>function subsequences(s) {\n  const out = [];\n  function walk(i, built) {\n    if (i === s.length) {\n      out.push(built);\n      return;\n    }\n    walk(i + 1, built + s[i]);\n    walk(i + 1, built);\n  }\n  walk(0, \"\");\n  return out;\n}\nconsole.log(subsequences(\"abc\").join(\", \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>abc, ab, ac, a, bc, b, c, </code></p>\n<p>For each character, either take it or skip it. A string of length n has 2^n subsequences, including the empty one.</p>"
      }
    ]
  },
  {
    "title": "Day 9 · Matching and structure",
    "level": "advanced",
    "questions": [
      {
        "id": "str-valid-ip",
        "q": "How do you check a valid IPv4 address?",
        "a": "<pre><code>function validIp(s) {\n  const parts = s.split(\".\");\n  if (parts.length !== 4) return false;\n  return parts.every((part) =&gt; /^(0|[1-9]\\d{0,2})$/.test(part) &amp;&amp; Number(part) &lt;= 255);\n}\nconsole.log(validIp(\"192.168.0.1\"));\nconsole.log(validIp(\"192.168.00.1\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true<br>false</code></p>\n<p>There must be four parts. Each part is a number from 0 to 255, and leading zeros are rejected.</p>"
      },
      {
        "id": "str-mirror",
        "q": "How do you mirror characters from an alphabet position?",
        "a": "<pre><code>function mirror(s, index) {\n  const alphabet = \"abcdefghijklmnopqrstuvwxyz\";\n  const chars = [...s];\n  const from = alphabet.indexOf(chars[index]);\n  if (from !== -1) chars[index] = alphabet[25 - from];\n  return chars.join(\"\");\n}\nconsole.log(mirror(\"geeks\", 0));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>teeks</code></p>\n<p>a mirrors to z, b mirrors to y, and so on. Replace the chosen character with alphabet[25 - position].</p>"
      },
      {
        "id": "str-dictionary-pattern",
        "q": "How do you find dictionary words that match a pattern?",
        "a": "<pre><code>function signature(word) {\n  const map = new Map();\n  let next = 0;\n  return [...word].map((ch) =&gt; {\n    if (!map.has(ch)) map.set(ch, next++);\n    return map.get(ch);\n  }).join(\".\");\n}\nfunction matches(words, pattern) {\n  const target = signature(pattern);\n  return words.filter((word) =&gt; signature(word) === target);\n}\nconsole.log(matches([\"abc\", \"deq\", \"mee\", \"akk\"], \"abb\").join(\", \"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>mee, akk</code></p>\n<p>Give each new character the next number. Words with the same number pattern match, so abb matches mee and akk.</p>"
      },
      {
        "id": "str-four-parts",
        "q": "How do you check whether a string can be split into four distinct parts?",
        "a": "<pre><code>function fourDistinct(s) {\n  if (s.length &lt; 4) return false;\n  const seen = new Set();\n  for (let a = 1; a &lt; s.length; a += 1) {\n    for (let b = a + 1; b &lt; s.length; b += 1) {\n      for (let c = b + 1; c &lt; s.length; c += 1) {\n        const parts = [s.slice(0, a), s.slice(a, b), s.slice(b, c), s.slice(c)];\n        if (new Set(parts).size === 4) seen.add(parts.join(\"|\"));\n      }\n    }\n  }\n  return seen.size &gt; 0;\n}\nconsole.log(fourDistinct(\"aaab\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>false</code></p>\n<p>Try every place to cut the string into four non-empty pieces. The split works when those four pieces are all different.</p>"
      },
      {
        "id": "str-distinct-subseq",
        "q": "How many distinct subsequences does a string have?",
        "a": "<pre><code>function distinctSubsequences(s) {\n  const last = new Map();\n  let total = 1;\n  for (const ch of s) {\n    const next = total * 2 - (last.get(ch) || 0);\n    last.set(ch, total);\n    total = next;\n  }\n  return total;\n}\nconsole.log(distinctSubsequences(\"gfg\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>7</code></p>\n<p>Every subsequence can be extended by the new character. Subtract the subsequences already counted for this same character so duplicates are not added twice. The result includes the empty subsequence.</p>"
      },
      {
        "id": "str-subseq-count",
        "q": "How many times does one string occur as a subsequence of another?",
        "a": "<pre><code>function countSubseq(text, part) {\n  const dp = Array.from({ length: part.length + 1 }, () =&gt; 0);\n  dp[0] = 1;\n  for (const ch of text) {\n    for (let j = part.length; j &gt;= 1; j -= 1) {\n      if (ch === part[j - 1]) dp[j] += dp[j - 1];\n    }\n  }\n  return dp[part.length];\n}\nconsole.log(countSubseq(\"geeksforgeeks\", \"gks\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>4</code></p>\n<p>dp[j] is the number of ways to form the first j characters of the pattern. When the current character matches, add the ways to form the pattern up to the previous character.</p>"
      },
      {
        "id": "str-consecutive-ones",
        "q": "How many binary strings of length n contain two consecutive 1s?",
        "a": "<pre><code>function withConsecutiveOnes(n) {\n  let endingZero = 1;\n  let endingOne = 1;\n  for (let length = 2; length &lt;= n; length += 1) {\n    const nextZero = endingZero + endingOne;\n    const nextOne = endingZero;\n    endingZero = nextZero;\n    endingOne = nextOne;\n  }\n  const without = endingZero + endingOne;\n  return 2 ** n - without;\n}\nconsole.log(withConsecutiveOnes(3));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>3</code></p>\n<p>Count the strings that do not have 11, which is a Fibonacci-style count, and subtract them from every possible binary string.</p>"
      },
      {
        "id": "str-anagram-moves",
        "q": "What is the minimum number of changes that makes two strings anagrams?",
        "a": "<pre><code>function minChanges(a, b) {\n  if (a.length !== b.length) return -1;\n  const count = {};\n  for (const ch of a) count[ch] = (count[ch] || 0) + 1;\n  for (const ch of b) count[ch] = (count[ch] || 0) - 1;\n  const extra = Object.values(count).filter((n) =&gt; n &gt; 0).reduce((sum, n) =&gt; sum + n, 0);\n  return extra;\n}\nconsole.log(minChanges(\"tea\", \"toe\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>1</code></p>\n<p>Characters that are extra in the first string must be changed. Their total is the number of replacements needed.</p>"
      },
      {
        "id": "str-binary-iteration",
        "q": "How do you find a character in a binary string that grows by iteration?",
        "a": "<pre><code>function ithChar(start, index) {\n  let s = start;\n  while (s.length &lt;= index) {\n    s += [...s].map((ch) =&gt; (ch === \"0\" ? \"1\" : \"0\")).reverse().join(\"\");\n  }\n  return s[index];\n}\nconsole.log(ithChar(\"0\", 2));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>0</code></p>\n<p>Each step appends the inverted, reversed copy of the current string. Grow it until it is long enough, then read the index.</p>"
      },
      {
        "id": "str-keyboard-path",
        "q": "How do you count the moves to type a word on a single keyboard row?",
        "a": "<pre><code>function moves(word) {\n  const row = \"abcdefghijklmnopqrstuvwxyz\";\n  let total = 0;\n  let at = 0;\n  for (const ch of word) {\n    const next = row.indexOf(ch);\n    total += Math.abs(next - at);\n    at = next;\n  }\n  return total;\n}\nconsole.log(moves(\"ace\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>4</code></p>\n<p>Treat the alphabet as a line of keys. Each letter costs the distance from the previous key. This is the simple form of the on-screen typing problem.</p>"
      }
    ]
  },
  {
    "title": "Day 10 · Hard string algorithms",
    "level": "advanced",
    "questions": [
      {
        "id": "str-lcs",
        "q": "How do you find the length of the longest common subsequence?",
        "a": "<pre><code>function lcs(a, b) {\n  const dp = Array.from({ length: a.length + 1 }, () =&gt; Array(b.length + 1).fill(0));\n  for (let i = 1; i &lt;= a.length; i += 1) {\n    for (let j = 1; j &lt;= b.length; j += 1) {\n      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);\n    }\n  }\n  return dp[a.length][b.length];\n}\nconsole.log(lcs(\"abcde\", \"ace\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>3</code></p>\n<p>If the current characters match, extend the diagonal answer. If they do not, take the better answer from the cell above or to the left.</p>"
      },
      {
        "id": "str-word-search",
        "q": "How do you search for a word in a grid of characters?",
        "a": "<pre><code>function exists(board, word) {\n  const rows = board.length;\n  const cols = board[0].length;\n  function walk(r, c, i) {\n    if (i === word.length) return true;\n    if (r &lt; 0 || c &lt; 0 || r &gt;= rows || c &gt;= cols || board[r][c] !== word[i]) return false;\n    const saved = board[r][c];\n    board[r][c] = \"#\";\n    const found = walk(r + 1, c, i + 1) || walk(r - 1, c, i + 1) || walk(r, c + 1, i + 1) || walk(r, c - 1, i + 1);\n    board[r][c] = saved;\n    return found;\n  }\n  for (let r = 0; r &lt; rows; r += 1) {\n    for (let c = 0; c &lt; cols; c += 1) if (walk(r, c, 0)) return true;\n  }\n  return false;\n}\nconsole.log(exists([[\"A\",\"B\"],[\"C\",\"D\"]], \"ABD\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true</code></p>\n<p>Start at every cell and move up, down, left, or right. Mark a cell while it is in the current path so it is not reused.</p>"
      },
      {
        "id": "str-divide-large",
        "q": "How do you divide a large number given as a string?",
        "a": "<pre><code>function divide(number, divisor) {\n  let remainder = 0;\n  let out = \"\";\n  for (const digit of number) {\n    remainder = remainder * 10 + Number(digit);\n    out += Math.floor(remainder / divisor);\n    remainder %= divisor;\n  }\n  return out.replace(/^0+(?=\\d)/, \"\");\n}\nconsole.log(divide(\"126\", 3));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>42</code></p>\n<p>Do school division one digit at a time. Carry the remainder into the next digit. Strip leading zeros at the end.</p>"
      },
      {
        "id": "str-balanced",
        "q": "How do you find the longest balanced parentheses subsequence?",
        "a": "<pre><code>function longestBalanced(s) {\n  let open = 0;\n  let pairs = 0;\n  for (const ch of s) {\n    if (ch === \"(\") open += 1;\n    else if (ch === \")\" &amp;&amp; open &gt; 0) {\n      open -= 1;\n      pairs += 1;\n    }\n  }\n  return pairs * 2;\n}\nconsole.log(longestBalanced(\"())(()\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>4</code></p>\n<p>You do not need a contiguous substring. Count how many closing parentheses can match an earlier opening one, then double that count because each pair contributes two characters.</p>"
      },
      {
        "id": "str-edit-basics",
        "q": "How do you compare slice, substring, and a manual loop when taking part of a string?",
        "a": "<pre><code>const s = \"GeeksforGeeks\";\nlet manual = \"\";\nfor (let i = 5; i &lt; 8; i += 1) manual += s[i];\nconsole.log(s.slice(5, 8) === manual);</code></pre>\n<p><strong>Output</strong></p>\n<p><code>true</code></p>\n<p>slice is the normal tool. A loop that appends characters from start to end builds the same piece and shows what slice is doing.</p>"
      },
      {
        "id": "str-run-length",
        "q": "How do you compress a string by counting repeated runs?",
        "a": "<pre><code>function compress(s) {\n  let out = \"\";\n  let count = 1;\n  for (let i = 1; i &lt;= s.length; i += 1) {\n    if (s[i] === s[i - 1]) count += 1;\n    else {\n      out += s[i - 1] + (count &gt; 1 ? count : \"\");\n      count = 1;\n    }\n  }\n  return out;\n}\nconsole.log(compress(\"aaabbc\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>a3b2c</code></p>\n<p>Count a run until the character changes, then write the character and, when needed, the count.</p>"
      },
      {
        "id": "str-longest-prefix",
        "q": "How do you find the longest common prefix of several strings?",
        "a": "<pre><code>function prefix(list) {\n  let shared = list[0];\n  for (const word of list.slice(1)) {\n    while (!word.startsWith(shared)) shared = shared.slice(0, -1);\n  }\n  return shared;\n}\nconsole.log(prefix([\"flower\", \"flow\", \"flight\"]));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>fl</code></p>\n<p>Start with the first word and shorten it until every other word begins with it.</p>"
      },
      {
        "id": "str-min-window",
        "q": "How do you find the smallest substring that covers another string's characters?",
        "a": "<pre><code>function minWindow(s, need) {\n  const required = {};\n  for (const ch of need) required[ch] = (required[ch] || 0) + 1;\n  let missing = need.length;\n  let best = \"\";\n  let left = 0;\n  for (let right = 0; right &lt; s.length; right += 1) {\n    if (required[s[right]] &gt; 0) missing -= 1;\n    required[s[right]] = (required[s[right]] || 0) - 1;\n    while (missing === 0) {\n      const candidate = s.slice(left, right + 1);\n      if (!best || candidate.length &lt; best.length) best = candidate;\n      required[s[left]] += 1;\n      if (required[s[left]] &gt; 0) missing += 1;\n      left += 1;\n    }\n  }\n  return best;\n}\nconsole.log(minWindow(\"ADOBECODEBANC\", \"ABC\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>BANC</code></p>\n<p>Grow the right side until every required character is inside the window, then move the left side forward while the window is still valid.</p>"
      },
      {
        "id": "str-group-anagrams",
        "q": "How do you group words that are anagrams?",
        "a": "<pre><code>function group(words) {\n  const map = new Map();\n  for (const word of words) {\n    const key = [...word].sort().join(\"\");\n    map.set(key, [...(map.get(key) || []), word]);\n  }\n  return [...map.values()].map((list) =&gt; list.join(\" \")).join(\" | \");\n}\nconsole.log(group([\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>eat tea ate | tan nat | bat</code></p>\n<p>The sorted characters are the same for every anagram. Use that sorted text as the map key.</p>"
      },
      {
        "id": "str-longest-unique",
        "q": "How do you find the longest substring without a repeated character?",
        "a": "<pre><code>function longestUnique(s) {\n  const last = new Map();\n  let start = 0;\n  let best = 0;\n  for (let i = 0; i &lt; s.length; i += 1) {\n    if (last.has(s[i]) &amp;&amp; last.get(s[i]) &gt;= start) start = last.get(s[i]) + 1;\n    last.set(s[i], i);\n    best = Math.max(best, i - start + 1);\n  }\n  return best;\n}\nconsole.log(longestUnique(\"abcabcbb\"));</code></pre>\n<p><strong>Output</strong></p>\n<p><code>3</code></p>\n<p>Remember the last index of each character. When it appears again inside the current window, move the start to just after the old copy.</p>"
      }
    ]
  }
],
};
