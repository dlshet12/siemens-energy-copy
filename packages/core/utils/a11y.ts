/**
 * Accessibility utilities — focus, ARIA, keyboard.
 * Used by overlay components and for consistent focus management.
 */

/**
 * Trap focus within a root element (e.g. modal).
 * Returns a cleanup function that restores previous focus.
 */
export function trapFocus(root: HTMLElement): () => void {
  const focusableSelector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(root.querySelectorAll<HTMLElement>(focusableSelector));
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const previousActive = document.activeElement as HTMLElement | null;

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    if (focusable.length === 0) {
      e.preventDefault();
      return;
    }
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }

  root.addEventListener('keydown', handleKeyDown);
  first?.focus();

  return () => {
    root.removeEventListener('keydown', handleKeyDown);
    previousActive?.focus();
  };
}

/**
 * Return whether the event target is inside the given element.
 */
export function isEventInside(target: EventTarget | null, element: HTMLElement): boolean {
  return target instanceof Node && element.contains(target);
}
