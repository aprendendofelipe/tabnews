import { MarkdownViewer } from '@barso/ui/markdown';

import { mdContent, shouldAddNofollow } from '../md-example';

export default function ViewerPage() {
  return <MarkdownViewer value={mdContent} shouldAddNofollow={shouldAddNofollow} />;
}
