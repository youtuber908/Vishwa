// Test the apply function logic
const STORAGE_KEY = 'vishwa.themeMode';

function getSystemTheme(prefersLight) {
  return prefersLight ? 'light' : 'dark';
}

// Simulate the apply function
function apply(themeMode, localStorageGetter, prefersLight) {
  const saved = localStorageGetter();
  let next;
  if (!saved) {
    // No saved value, force dark on first load
    next = 'dark';
  } else {
    const sys = getSystemTheme(prefersLight);
    next = themeMode === 'system' ? sys : themeMode;
  }
  return next;
}

// Test cases
console.log('Test 1: No saved value, themeMode initially dark (from useState), prefersLight=false');
console.log('Expected: dark');
console.log('Result:', apply('dark', () => null, false));

console.log('\nTest 2: No saved value, themeMode initially dark, prefersLight=true');
console.log('Expected: dark (because no saved value)');
console.log('Result:', apply('dark', () => null, true));

console.log('\nTest 3: Saved value is light');
console.log('Expected: light');
console.log('Result:', apply('dark', () => 'light', false));

console.log('\nTest 4: Saved value is system, themeMode is system, prefersLight=false');
console.log('Expected: dark');
console.log('Result:', apply('system', () => 'system', false));

console.log('\nTest 5: Saved value is system, themeMode is system, prefersLight=true');
console.log('Expected: light');
console.log('Result:', apply('system', () => 'system', true));

console.log('\nTest 6: Saved value is system, themeMode is light (user overrode), prefersLight=false');
console.log('Expected: light');
console.log('Result:', apply('light', () => 'system', false));