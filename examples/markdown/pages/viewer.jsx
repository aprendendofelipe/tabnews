import { MarkdownViewer } from '@tabnews/ui/markdown';

import { mdContent, shouldAddNofollow } from '../md-example.js';

export default function ViewerPage() {
  return <MarkdownViewer value={mdContent} shouldAddNofollow={shouldAddNofollow} />;
}
