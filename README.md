```markdown
# react-rte-light

A production-ready, lightweight rich text editor for React, built with Draft.js. Supports React 16.8 to 19, tree-shakable, with ESM and CommonJS builds.

## Features
- Core editing: bold, italic, underline, strike-through, headings (H1, H2), links, blockquotes, ordered/unordered lists, code blocks.
- Customizable toolbar via props.
- Controlled and uncontrolled modes.
- Keyboard shortcuts (e.g., Ctrl+B for bold) and mouse interactions.
- Theming with CSS variables (light/dark or custom).
- Accessibility: ARIA roles, keyboard navigation.
- Minimal dependencies: Only Draft.js and draft-convert.
```
## Installation
```bash
npm install react-rte-light
```

Import the styles in your app:
```ts
import 'react-rte-light/dist/index.css';
```

## Usage
```tsx
import { RichTextEditor } from 'react-rte-light';

function App() {
  return <RichTextEditor placeholder="Start typing..." />;
}
```

### Controlled Mode (React 19 or 17 example)
```tsx
import { useState } from 'react';
import { RichTextEditor } from 'react-rte-light';

function ControlledEditor() {
  const [value, setValue] = useState('<p>Initial content</p>');
  return <RichTextEditor value={value} onChange={setValue} />;
}
```
This works identically in React 19 and React 17 due to compatibility.

### Uncontrolled Mode
```tsx
import { RichTextEditor } from 'react-rte-light';

function UncontrolledEditor() {
  return (
    <RichTextEditor
      defaultValue="<p>Default content</p>"
      onChange={(val) => console.log(val)}
    />
  );
}
```

### Customization Examples
- Toolbar: `<RichTextEditor toolbarOptions={['bold', 'italic', 'link']} />`
- Theme: `<RichTextEditor theme="dark" />`
- Custom Theme: `<RichTextEditor theme={{ '--editor-bg': '#f0f0f0', '--link-color': 'green' }} />`
- Read-only: `<RichTextEditor readOnly={true} value="<p>Read only content</p>" />`

For full API, see the exported `RichTextEditorProps` interface.
```