// Test verification of theme attribute after render
const { JSDOM } = require('jsdom');
const React = require('react');
const ReactDOM = require('react-dom/client');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => { store[key] = value; },
    removeItem: key => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

// Set up jsdom
const dom = new JSDOM('<!DOCTYPE html><html lang="en"><head></head><body><div id="root"></div></body></html>', {
  url: 'http://localhost:5173/'
});
global.window = dom.window;
global.document = window.document;

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  configurable: true
});

// Mock matchMedia
window.matchMedia = window.matchMedia || function(query) {
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

// Import the ThemeProvider component from the source code
// We need to transpile TSX? We'll just require the file directly? Might need to use ts-node.
// Instead, we can copy the relevant logic into this test? Simpler: we can require the file using ts-node if installed.
// Let's check if ts-node is available. We'll try to require the file and see.

let ThemeProvider;
try {
  ThemeProvider = require('./src/theme/ThemeProvider').ThemeProvider;
} catch (e) {
  console.error('Failed to require ThemeProvider directly:', e.message);
  // Fallback: we'll eval the file after transpiling? Too complex.
  process.exit(1);
}

// Render
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(ThemeProvider, null, React.createElement('div', null)));

// Force flush of synchronous effects? useEffect runs after render flushSync? In React 18, useEffect runs after paint.
// We'll wait a tick.
setTimeout(() => {
  const attr = document.documentElement.getAttribute('data-theme');
  console.log(`data-theme attribute: "${attr}"`);
  // Also check after a bit more time to ensure no change
  setTimeout(() => {
    const attr2 = document.documentElement.getAttribute('data-theme');
    console.log(`data-theme attribute after 200ms: "${attr2}"`);
    process.exit(0);
  }, 200);
}, 100);