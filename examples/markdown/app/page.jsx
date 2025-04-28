'use client';
import { MarkdownEditor } from '@tabnews/ui/markdown';
import { useState } from 'react';

import { mdContent, shouldAddNofollow } from '../md-example.js';

export default function EditorPage() {
  const [value, setValue] = useState(mdContent);

  return (
    <MarkdownEditor
      value={value}
      onChange={setValue}
      isInvalid={!value.length || value.length > 6000}
      initialHeight="80vh"
      shouldAddNofollow={shouldAddNofollow}
    />
  );
}
