/**
 * @ui-platform/core
 * Framework-agnostic Web Components. Use attributes, slots, and custom events.
 * Load design tokens (e.g. @ui-platform/tokens/css) in your app for theming.
 */
import './components/button/button.js';

export { UiButton } from './components/button/index.js';
export { trapFocus, isEventInside } from './utils/index.js';
