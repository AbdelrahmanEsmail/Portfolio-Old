// Tiny cross-component event contracts (no shared React context needed).

export const PALETTE_OPEN_EVENT = 'portfolio:palette-open';
export const TOAST_EVENT = 'portfolio:toast';

/** Open the ⌘K command palette from anywhere. */
export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(PALETTE_OPEN_EVENT));
}

/** Show a short status message in the global toaster. */
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}

/** Copy text to the clipboard; resolves to false when the browser refuses. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
