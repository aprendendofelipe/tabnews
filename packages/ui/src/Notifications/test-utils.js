import { render } from '@testing-library/react';
import { vi } from 'vitest';

import { NotificationsProvider } from './Provider.jsx';
import { ThemeProvider } from '../ThemeProvider/index.js';

let notificationCount = 0;

export function resetNotificationCount() {
  notificationCount = 0;
}

export function createMockNotification(overrides = {}) {
  notificationCount++;
  return {
    id: `notification-${notificationCount}`,
    title: `Notification ${notificationCount}`,
    body: `Body for notification ${notificationCount}`,
    ...overrides,
  };
}

export function createNotificationList(count = 3, overrides = {}) {
  return Array.from({ length: count }, () => createMockNotification(overrides));
}

export function createMockAction(overrides = {}) {
  return {
    label: 'Mock Action',
    icon: null,
    onClick: vi.fn(),
    ...overrides,
  };
}

export function renderWithContext(ui, providerProps = {}) {
  return render(
    <ThemeProvider>
      <NotificationsProvider {...providerProps}>{ui}</NotificationsProvider>
    </ThemeProvider>,
  );
}
