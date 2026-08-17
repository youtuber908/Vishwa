// Verification script for theme attribute
const STORAGE_KEY = 'vishwa.themeMode';

// Mock localStorage (empty to simulate first load)
let localStorageStore = {};
const mockLocalStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, value) => { localStorageStore[key] = value; },
  removeItem: (key) => { delete localStorageStore[key]; },
  clear: () => { localStorageStore = {}; }
};
global.window = global.window || {};
global.window.localStorage = mockLocalStorage;

// Mock matchMedia: assume prefers-color-scheme: light is false (dark preference)
global.window.matchMedia = global.window.matchMedia || function(query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {}
  };
};

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
global.document = global.document || {};
global.document.documentElement = docElement;

// Mock getSystemTheme (based on mocked matchMedia)
function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// State variables
let themeMode = 'dark'; // initial state from useState
let resolvedTheme = 'dark';

// Simulate empty deps useEffect (runs once on mount)
(() => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'system' || saved === 'light' || saved === 'dark') {
      themeMode = saved;
    } else {
      themeMode = 'dark';
      // We intentionally do NOT save the default dark
    }
  } catch {}
})();

// Simulate second useEffect's apply function
const apply = () => {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  let next;
  if (!saved) {
    // No saved value, force dark on first load
    next = 'dark';
  } else {
    // If there is a saved value, respect it (including system)
    const sys = getSystemTheme();
    next = themeMode === 'system' ? sys : themeMode;
  }
  resolvedTheme = next;
  document.documentElement.setAttribute('data-theme', next);
};

// Run apply (as useEffect would on mount)
apply();

// Log immediately after mount
const initialAttr = docElement.getAttribute('data-theme');
console.log(`INITIAL: ${initialAttr}`);

// Wait 2 seconds then log again
setTimeout(() => {
  const laterAttr = docElement.getAttribute('data-theme');
  console.log(`AFTER 2s: ${laterAttr}`);
}, 2000);