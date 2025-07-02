/**
 * @typedef {import('./types.js').NotificationItem} NotificationItem
 * @typedef {import('./types.js').NotificationLabels} NotificationLabels
 * @typedef {import('./types.js').NotificationSelectors} NotificationSelectors
 */

/**
 * Default configuration for the notification components.
 * @type {object}
 * @property {NotificationItem[]} notifications - Array of notification items.
 * @property {NotificationLabels} labels - Default labels for various parts of the notification UI.
 * @property {NotificationSelectors} selectors - Default CSS selectors used for identifying elements.
 */
const DEFAULT_CONFIG = {
  notifications: [],
  setMenuOpen: () => {},
  labels: {
    notifications: 'Notifications',
    empty: 'No notifications available',
    loading: 'Loading...',
  },
  selectors: {
    notificationTrailingAction: 'data-tabnews-ui-notification-action',
  },
};

/**
 * Merges a custom configuration with the default notification configuration.
 *
 * @param {object} [customConfig={}] - The custom configuration object.
 * @returns {object} The merged configuration object.
 */
export function getConfig(customConfig = {}) {
  return {
    ...DEFAULT_CONFIG,
    ...customConfig,
    labels: {
      ...DEFAULT_CONFIG.labels,
      ...customConfig.labels,
    },
    selectors: {
      ...DEFAULT_CONFIG.selectors,
      ...customConfig.selectors,
    },
  };
}
