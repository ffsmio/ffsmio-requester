# @ffsm/requester

A comprehensive utility library for request handling, timeouts, and various helper functions for Node.js and browser applications.

[![npm version](https://badge.fury.io/js/%40ffsm%2Frequester.svg)](https://badge.fury.io/js/%40ffsm%2Frequester)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🚀 **Cross-platform**: Works in both Node.js and browser environments
- ⚡ **Performance optimized**: Uses `requestAnimationFrame` when available for better performance
- 📦 **Dual package support**: Provides both CommonJS and ES Module builds
- 🎯 **TypeScript support**: Full TypeScript definitions included
- 🔧 **Modular imports**: Import only what you need
- 🪶 **Lightweight**: Minimal dependencies and small bundle size

## Installation

```bash
# npm
npm install @ffsm/requester

# yarn
yarn add @ffsm/requester

# pnpm
pnpm add @ffsm/requester
```

## Usage

### Basic Import

```typescript
// Import everything
import { requestTimeout } from '@ffsm/requester';

// Import specific modules
import { requestTimeout } from '@ffsm/requester/request-timeout';

// Import types
import type { RequestTimeout, RequestTimeoutCallback } from '@ffsm/requester';
```

### requestTimeout

A performance-optimized timeout function that uses `requestAnimationFrame` when available (in browsers) and falls back to `setTimeout` in Node.js environments.

```typescript
import { requestTimeout } from '@ffsm/requester';

// Basic usage with delay
const timeout = requestTimeout(() => {
  console.log('Executed after 1 second');
}, 1000);

// Cancel the timeout
timeout.cancel();

// Immediate execution (next animation frame or immediate)
const immediate = requestTimeout(() => {
  console.log('Executed immediately');
}, 0);

// Without delay parameter (defaults to 0)
const defaultTimeout = requestTimeout(() => {
  console.log('Executed on next tick');
});
```

### API Reference

#### `requestTimeout(callback, delay?)`

**Parameters:**
- `callback: RequestTimeoutCallback` - The function to execute after the delay
- `delay?: number` - The delay in milliseconds (optional, defaults to 0)

**Returns:** `RequestTimeout`
- `ids: RequestTimeoutIds` - Object containing timeout IDs
  - `ids.r: number | null` - The requestAnimationFrame ID (browser only)
  - `ids.s: Timeout | null` - The setTimeout ID
- `cancel: () => void` - Function to cancel the timeout

**Example:**
```typescript
const timeout = requestTimeout(() => {
  console.log('Hello World!');
}, 500);

// Access timeout IDs
console.log('RAF ID:', timeout.ids.r);
console.log('Timeout ID:', timeout.ids.s);

// Cancel if needed
if (someCondition) {
  timeout.cancel();
}
```

## Module Exports

The library supports both default and named imports:

```typescript
// Named imports (recommended)
import { requestTimeout } from '@ffsm/requester';

// Specific module imports
import { requestTimeout } from '@ffsm/requester/request-timeout';

// Type-only imports
import type { RequestTimeout, Timeout } from '@ffsm/requester/types';
```

## Browser Support

- Modern browsers with ES2020 support
- Browsers with `requestAnimationFrame` support get performance benefits
- Graceful fallback to `setTimeout` in older environments

## Node.js Support

- Node.js 14+ (ES2020 support required)
- Uses `setTimeout` as `requestAnimationFrame` is not available

## Build Formats

The package provides multiple build formats:

- **CommonJS** (`.js`): For Node.js and older bundlers
- **ES Modules** (`.esm.js`): For modern bundlers and browsers
- **TypeScript Definitions** (`.d.ts`): For TypeScript support

## Development

```bash
# Install dependencies
yarn install

# Build for development (unminified)
yarn build:dev

# Build for production (minified)
yarn build:prod

# Watch mode
yarn watch

# Clean build directory
yarn clean
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 1.0.0
- Initial release
- Added `requestTimeout` function with `requestAnimationFrame` optimization
- Full TypeScript support
- Dual package (CommonJS + ESM) support
- Cross-platform compatibility

---

Made with ❤️ by [FFSM](https://github.com/ffsmio)
