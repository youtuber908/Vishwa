// Simulate ThemeProvider behavior
const STORAGE_KEY = 'vishwa.themeMode';

// Mock localStorage
let localStorageStore = {};
const mockLocalStorage = {
  getItem: (key) => localStorageStore[key] || null,
  setItem: (key, value) => { localStorageStore[key] = value; },
  removeItem: (key) => { delete localStorageStore[key]; },
  clear: () => { localStorageStore = {}; }
};
// Mock window.localStorage
global.window = global.window || {};
global.window.localStorage = mockLocalStorage;

// Mock matchMedia (assume prefers-color-scheme: light is false for simplicity)
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

// Mock getSystemTheme (we'll control prefersLight via env)
function getSystemTheme() {
  // For test, assume prefers-color-scheme: light is false (dark preference)
  // We can override via process.env.PREFERS_LIGHT
  const prefersLight = process.env.PREFERS_LIGHT === 'true';
  return prefersLight ? 'light' : 'dark';
}

// State variables (mirroring React useState)
let themeMode = 'dark'; // initial state from useState
let resolvedTheme = 'dark';

// Simulate the empty deps useEffect (runs once on mount)
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

// Simulate the second useEffect (runs after mount and whenever themeMode changes)
// We'll define apply and run it once (simulating mount)
// In real React, this useEffect runs after the initial render and after any themeMode change.
// Since we haven't changed themeMode yet, we just run it once.
const apply = () => {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  let next;
  if (!saved) {
    // No saved value, force dark on first load
    next = 'dark';
  } else {
    // Force dark theme, ignore system preference and saved value for first load
    // Check if this is truly first load by seeing if we have ever set a value
    const hasEverBeenSet = window.localStorage.getItem(STORAGE_KEY) !== null;
    if (!hasEverBeenSet) {
      next = 'dark';
    } else {
      const sys = getSystemTheme();
      next = themeMode === 'system' ? sys : themeMode;
    }
  }
  resolvedTheme = next;
  document.documentElement.setAttribute('data-theme', next);
};

// Run apply (as useEffect would on mount)
apply();

console.log('Initial render:');
console.log('  themeMode:', themeMode);
console.log('  resolvedTheme:', resolvedTheme);
console.log('  data-theme attribute:', docElement.getAttribute('data-theme'));
console.log('  localStorage.getItem(STORAGE_KEY):', window.localStorage.getItem(STORAGE_KEY));

// Simulate a re-render where themeMode might change? Not unless setThemeMode called.
// We'll also test what happens if we later call setThemeMode (simulating user toggle)
function setThemeMode(mode) {
  themeMode = mode;
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {}
  // This would trigger the useEffect again because themeMode changed
  apply();
}

// Test: after a user selects light
console.log('\n--- After user selects light ---');
setThemeMode('light');
console.log('  themeMode:', themeMode);
console.log('  resolvedTheme:', resolvedTheme);
console.log('  data-theme attribute:', docElement.getAttribute('data-theme'));
console.log('  localStorage.getItem(STORAGE_KEY):', window.localStorage.getItem(STORAGE_KEY));

// Test: reload (new session) with localStorage now set to 'light'
console.log('\n--- Simulate page reload with existing localStorage ---');
// Reset state as if new mount, but keep localStorage
themeMode = 'dark'; // reset to initial useState
resolvedTheme = 'dark';
// Run empty deps effect again
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
// Run apply
apply();
console.log('  themeMode:', themeMode);
console.log('  resolvedTheme:', resolvedTheme);
console.log('  data-theme attribute:', docElement.getAttribute('data-theme'));
console.log('  localStorage.getItem(STORAGE_KEY):', window.localStorage.getItem(STORAGE_KEY));