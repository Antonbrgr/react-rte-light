# react-rte-light

A lightweight, production-ready rich text editor component for React, compatible with React 16.8 to 19. Built with [Draft.js](https://draftjs.org/), it provides essential rich text editing features with a focus on simplicity, flexibility, and performance. The package supports ESM and CommonJS builds, is tree-shakable, and includes TypeScript definitions for seamless integration into modern React projects.

## Features

- **Core Editing**: Bold, italic, underline, strike-through, headings (H1, H2), links, blockquotes, ordered/unordered lists, and code blocks.
- **Customizable Toolbar**: Configure the toolbar via props to include only the desired controls.
- **Controlled and Uncontrolled Modes**: Use with `value` and `onChange` for controlled mode or `defaultValue` for uncontrolled mode.
- **Keyboard Shortcuts**: Supports standard shortcuts (e.g., `Ctrl+B` for bold, `Ctrl+I` for italic).
- **Theming**: Built-in light and dark themes, plus custom theming via CSS variables.
- **Accessibility**: Includes ARIA roles and keyboard navigation for better accessibility.
- **Lightweight**: Minimal dependencies (only Draft.js and draft-convert), no reliance on heavy frameworks like Quill.
- **TypeScript Support**: Full type definitions included for type-safe development.
- **Builds**: Supports both ESM and CommonJS, optimized for tree-shaking.

## Installation

Install the package via npm:

```bash
npm install react-rte-light --legacy-peer-deps
```

> **Note**: Use `--legacy-peer-deps` to handle peer dependency conflicts, especially with React 19 and Draft.js.

Import the styles in your application:

```tsx
import 'react-rte-light/dist/index.css';
```

## Usage

### Basic Example

```tsx
import { RichTextEditor } from 'react-rte-light';

function App() {
  return <RichTextEditor placeholder="Start typing..." />;
}
```

### Controlled Mode (React 19 or 17)

Works the same way in React 19 and React 17 due to backward compatibility:

```tsx
import { useState } from 'react';
import { RichTextEditor } from 'react-rte-light';

function ControlledEditor() {
  const [value, setValue] = useState('<p>Initial content</p>');

  return (
    <RichTextEditor
      value={value}
      onChange={setValue}
      placeholder="Type your content..."
    />
  );
}
```

### Uncontrolled Mode

```tsx
import { RichTextEditor } from 'react-rte-light';

function UncontrolledEditor() {
  return (
    <RichTextEditor
      defaultValue="<p>Default content</p>"
      onChange={(value) => console.log('Content:', value)}
    />
  );
}
```

### Customization Examples

- **Custom Toolbar**: Limit the toolbar to specific options.

```tsx
import { RichTextEditor } from 'react-rte-light';

function CustomToolbar() {
  const toolbarOptions = ['bold', 'italic', 'link', 'unordered-list'];
  return <RichTextEditor toolbarOptions={toolbarOptions} />;
}
```

- **Theming**: Use built-in themes or define a custom theme with CSS variables.

```tsx
import { RichTextEditor } from 'react-rte-light';

function ThemedEditor() {
  // Built-in dark theme
  return <RichTextEditor theme="dark" />;
}

function CustomThemedEditor() {
  // Custom theme via CSS variables
  const customTheme = {
    '--editor-bg': '#f0f0f0',
    '--editor-text': '#333',
    '--link-color': 'green',
  };
  return <RichTextEditor theme={customTheme} />;
}
```

- **Read-Only Mode**: Display content without editing capabilities.

```tsx
import { RichTextEditor } from 'react-rte-light';

function ReadOnlyEditor() {
  return (
    <RichTextEditor
      readOnly={true}
      value="<p>This is read-only content.</p>"
    />
  );
}
```

## API

The `RichTextEditor` component accepts the following props:

```tsx
interface RichTextEditorProps {
  value?: string; // HTML string for controlled mode
  defaultValue?: string; // HTML string for uncontrolled mode
  onChange?: (value: string) => void; // Called with updated HTML content
  toolbarOptions?: ToolbarOption[]; // Array of toolbar buttons
  readOnly?: boolean; // Disables editing if true
  theme?: 'light' | 'dark' | CustomTheme; // Theme selection
  placeholder?: string; // Placeholder text
  className?: string; // Additional CSS class for the editor
}

type ToolbarOption =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'header-one'
  | 'header-two'
  | 'blockquote'
  | 'ordered-list'
  | 'unordered-list'
  | 'code-block'
  | 'link';

interface CustomTheme extends Record<string, string> {}
```

### Available Toolbar Options
- `bold`: Bold text (`Ctrl+B`).
- `italic`: Italic text (`Ctrl+I`).
- `underline`: Underline text (`Ctrl+U`).
- `strikethrough`: Strike-through text.
- `header-one`: H1 heading.
- `header-two`: H2 heading.
- `blockquote`: Blockquote.
- `ordered-list`: Numbered list.
- `unordered-list`: Bulleted list.
- `code-block`: Code block.
- `link`: Insert/edit hyperlinks (prompts for URL).

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please include tests for new features and ensure the code follows the existing TypeScript and ESLint standards.

## License
MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgements
- Built with [Draft.js](https://draftjs.org/) for the editing engine.
- Uses [Vite](https://vitejs.dev/) for fast and optimized builds.
- Tested with [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).