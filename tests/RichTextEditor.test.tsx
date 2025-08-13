import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RichTextEditor } from '../src';

describe('RichTextEditor', () => {
  it('renders the editor', () => {
    render(<RichTextEditor />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls onChange when content changes', async () => {
    const onChange = vi.fn();
    render(<RichTextEditor onChange={onChange} />);
    const editor = screen.getByRole('textbox');
    await userEvent.type(editor, 'Hello');
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(expect.stringContaining('Hello'));
  });

  it('toggles bold via toolbar', () => {
    render(<RichTextEditor />);
    const boldButton = screen.getByLabelText('B');
    fireEvent.mouseDown(boldButton);
    expect(boldButton).toHaveClass('active');
  });
});