// src/RichTextEditor.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  ContentState,
} from 'draft-js';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import './styles.css';
import type { ToolbarOption, CustomTheme, RichTextEditorProps } from './types';

const { hasCommandModifier } = KeyBindingUtil;

const allOptions: ToolbarOption[] = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'header-one',
  'header-two',
  'blockquote',
  'ordered-list',
  'unordered-list',
  'code-block',
  'link',
];

const optionConfig: Record<
  ToolbarOption,
  { label: string; style?: string; type: 'inline' | 'block' | 'link' }
> = {
  bold: { label: 'B', style: 'BOLD', type: 'inline' },
  italic: { label: 'I', style: 'ITALIC', type: 'inline' },
  underline: { label: 'U', style: 'UNDERLINE', type: 'inline' },
  strikethrough: { label: 'S', style: 'STRIKETHROUGH', type: 'inline' },
  'header-one': { label: 'H1', style: 'header-one', type: 'block' },
  'header-two': { label: 'H2', style: 'header-two', type: 'block' },
  blockquote: { label: '"', style: 'blockquote', type: 'block' },
  'ordered-list': { label: '1.', style: 'ordered-list-item', type: 'block' },
  'unordered-list': { label: '•', style: 'unordered-list-item', type: 'block' },
  'code-block': { label: '</>', style: 'code-block', type: 'block' },
  link: { label: 'Link', type: 'link' },
};

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  defaultValue,
  onChange,
  toolbarOptions,
  readOnly = false,
  theme = 'light',
  placeholder,
  className = '',
}) => {
  const initialHTML = value !== undefined ? value : defaultValue || '';
  const [editorState, setEditorState] = useState(() => {
    const content = convertFromHTML(initialHTML);
    return EditorState.createWithContent(content as ContentState);
  });

  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (value !== undefined) {
      const currentHTML = convertToHTML(editorState.getCurrentContent());
      if (value !== currentHTML) {
        const content = convertFromHTML(value);
        setEditorState(EditorState.createWithContent(content as ContentState));
      }
    }
  }, [value, editorState]);

  const handleEditorChange = (newState: EditorState) => {
    setEditorState(newState);
    if (onChange) {
      const html = convertToHTML(newState.getCurrentContent());
      onChange(html);
    }
  };

  const usedOptions = toolbarOptions || allOptions;

  const currentInlineStyle = editorState.getCurrentInlineStyle();
  const currentBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(editorState.getSelection().getStartKey())
    .getType();

  const hasLink = (): boolean => {
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) return false;
    const content = editorState.getCurrentContent();
    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    const block = content.getBlockForKey(startKey);
    const entityKey = block.getEntityAt(startOffset);
    return !!entityKey && content.getEntity(entityKey).getType() === 'LINK';
  };

  const isActive = (opt: ToolbarOption): boolean => {
    const conf = optionConfig[opt];
    if (conf.type === 'inline') {
      return currentInlineStyle.has(conf.style!);
    } else if (conf.type === 'block') {
      return currentBlockType === conf.style;
    } else if (conf.type === 'link') {
      return hasLink();
    }
    return false;
  };

  const toggle = (opt: ToolbarOption) => {
    const conf = optionConfig[opt];
    let newState = editorState;
    if (conf.type === 'inline') {
      newState = RichUtils.toggleInlineStyle(editorState, conf.style!);
    } else if (conf.type === 'block') {
      newState = RichUtils.toggleBlockType(editorState, conf.style!);
    } else if (conf.type === 'link') {
      const selection = editorState.getSelection();
      if (selection.isCollapsed()) return;
      const content = editorState.getCurrentContent();
      if (hasLink()) {
        newState = RichUtils.toggleLink(editorState, selection, null);
      } else {
        const url = prompt('Enter a URL');
        if (url) {
          const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url });
          const entityKey = contentWithEntity.getLastCreatedEntityKey();
          newState = RichUtils.toggleLink(editorState, selection, entityKey);
        }
        return;
      }
    }
    setEditorState(newState);
    editorRef.current?.focus();
  };

  const handleKeyCommand = (command: string, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const keyBindingFn = (e: React.KeyboardEvent) => {
    return getDefaultKeyBinding(e);
  };

  const themeClass = typeof theme === 'string' ? `theme-${theme}` : '';
  const themeStyle = typeof theme === 'object' ? theme : undefined;

  return (
    <div
      className={`rich-text-editor ${themeClass} ${className}`}
      style={themeStyle}
    >
      {!readOnly && (
        <div className="toolbar">
          {usedOptions.map((opt) => {
            const conf = optionConfig[opt];
            return (
              <button
                key={opt}
                aria-label={conf.label}
                className={`toolbar-button ${isActive(opt) ? 'active' : ''}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  toggle(opt);
                }}
              >
                {conf.label}
              </button>
            );
          })}
        </div>
      )}
      <div className="editor-container">
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
          placeholder={placeholder}
          readOnly={readOnly}
          customStyleMap={styleMap}
        />
      </div>
    </div>
  );
};