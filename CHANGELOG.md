# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

## [1.0.0] - 2025-07-19

### Added
- Initial release of @ffsm/requester
- `requestTimeout` function with requestAnimationFrame optimization
- Full TypeScript support with comprehensive type definitions
- Dual package support (CommonJS and ES Modules)
- Cross-platform compatibility (Node.js and Browser)
- JSDoc documentation for all public APIs
- Performance optimizations using requestAnimationFrame in browsers
- Graceful fallback to setTimeout in Node.js environments
- Modular imports support for tree-shaking
- Comprehensive README with usage examples
- MIT license
- Security policy
- Contributing guidelines

### Features
- **requestTimeout**: Performance-optimized timeout function
  - Uses requestAnimationFrame when available for better performance
  - Falls back to setTimeout in environments without requestAnimationFrame
  - Supports cancellation via returned cancel function
  - Handles edge cases (negative delays, etc.)

[Unreleased]: https://github.com/ffsmio/ffsmio-requester/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ffsmio/ffsmio-requester/releases/tag/v1.0.0
