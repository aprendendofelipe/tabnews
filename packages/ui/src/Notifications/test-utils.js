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
