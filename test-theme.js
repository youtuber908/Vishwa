// Mock DOM for testing ThemeProvider logic
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => { store[key] = value; },
    removeItem: key => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

const matchMediaMock = (query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: (_) => {},
    removeListener: (_) => {},
    addEventListener: (_) => {},
    removeEventListener: (_) => {},
    dispatchEvent: (_) => {}
  };
};

window.matchMedia = matchMediaMock;

// Mock document.documentElement
const docElement = {
  _attributes: {},
  setAttribute(name, value) {
    this._attributes[name] = value;
  },
  getAttribute(name) {
    return this._attributes[name] || null;
  }
};

Object.defineProperty(document, 'documentElement', {
  get: () => docElement
});

// Now copy the relevant logic from ThemeProvider.tsx
const STORAGE_KEY = 'vishwa.themeMode';

function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

let themeMode = 'dark'; // initial state from useState
let resolvedTheme = 'dark';

// Simulate the empty deps effect: read localStorage
(() => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'system' || saved === 'light' || saved === 'dark') {
      themeMode = saved;
    } else {
      themeMode = 'dark';
      try {
        window.localStorage.setItem(STORAGE_KEY, 'dark');
      } catch {}
    }
  } catch {}
})();

// Simulate the second useEffect's apply function
const apply = () => {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  let next;
  if (!saved) {
    // No saved value, force dark on first load
    next = 'dark';
  } else {
    const sys = getSystemTheme();
    next = themeMode === 'system' ? sys : themeMode;
  }
  resolvedTheme = next;
  docElement.setAttribute('data-theme', next);
};

apply();

console.log('themeMode:', themeMode);
console.log('resolvedTheme:', resolvedTheme);
console.log('data-theme attribute:', docElement.getAttribute('data-theme'));