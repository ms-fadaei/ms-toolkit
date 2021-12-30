export interface HTMLScriptOptions {
  async?: boolean;
  crossorigin?: string;
  defer?: boolean;
  integrity?: string;
  nomodule?: boolean;
  nonce?: string;
  referrerpolicy?: string;
  type?: string;
  // eslint-disable-next-line no-undef
  onLoad?: EventListenerOrEventListenerObject;
  // eslint-disable-next-line no-undef
  onError?: EventListenerOrEventListenerObject;
  // eslint-disable-next-line no-undef
  onAbort?: EventListenerOrEventListenerObject;
}

export function createScript(src: string, force = false, attrs?: HTMLScriptOptions): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

    const isNew = force || existingScript === null;
    const el = isNew ? createScriptElement(src, attrs) : existingScript;

    if (el.getAttribute('data-status') === 'pending') {
      attachEvents(el, resolve, reject, isNew);
    } else if (el.getAttribute('data-status') === 'load') {
      resolve(el);
    } else {
      reject(new ErrorEvent('Script tag failed to load'));
    }

    if (isNew) {
      document.head.appendChild(el);
    }
  });
}

function createScriptElement(src: string, attrs: HTMLScriptOptions = {}): HTMLScriptElement {
  const el = document.createElement('script');
  el.src = src;

  // add attributes
  attrs.type = attrs.type || 'text/javascript';
  Object.entries(attrs).forEach(([key, value]) => {
    if (/^on/.test(key)) {
      el.addEventListener(key.replace(/^on/, '').toLowerCase(), value);
    } else if (typeof value === 'string') {
      el.setAttribute(key, value);
    } else if (value === true) {
      el.setAttribute(key, '');
    }
  });

  el.setAttribute('data-status', 'pending');
  return el;
}

function attachEvents(
  el: HTMLScriptElement,
  resolve: (value: HTMLScriptElement | PromiseLike<HTMLScriptElement>) => void,
  reject: (reason: unknown) => void,
  setStatus = false,
) {
  const eventOptions = { once: true };
  const events = ['load', 'error', 'abort'];
  const createEventHandler = (name: string) => (e: Event) => {
    if (setStatus) el.setAttribute('data-status', name);

    if (name === 'load') {
      resolve(el);
    } else {
      reject(e);
    }
  };

  events.forEach((name) => el.addEventListener(name, createEventHandler(name), eventOptions));
}
