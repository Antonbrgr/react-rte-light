export type ToolbarOption =
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

export interface CustomTheme extends Record<string, string> {}

export interface RichTextEditorProps {
  value?: string; // HTML string
  defaultValue?: string;
  onChange?: (value: string) => void;
  toolbarOptions?: ToolbarOption[];
  readOnly?: boolean;
  theme?: 'light' | 'dark' | CustomTheme;
  placeholder?: string;
  className?: string;
}