export const clickOn = (selector: string) => (document?.querySelector(selector) as any)?.click?.();

export const selectOn = (selector: string) => (document?.querySelector(selector) as any)?.select?.();

export const focusOn = (selector: string) => (document?.querySelector(selector) as any)?.focus?.();

export const elementOf = (selector: string) => document?.querySelector(selector);
