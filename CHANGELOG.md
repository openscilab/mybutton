# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
## [0.7] - 2026-05-18
### Added
- `ShareModeTooltip` component for share mode guidance
- `isCustomShare` flag to share modal state for custom share flow handling
- Standard naming utility and `standardNaming` lookup map for consistent service name resolution
- Multi-select service selection using `Checkbox` instead of `Radio`
### Changed
- Major dependency upgrades: React 18.3, TypeScript 5.5, Redux Toolkit 2, Swiper 11, RSuite 5.70, react-scripts 5, web-vitals 4, and more
- Migrated from `node-sass` to `sass`
- Migrated Swiper to v11 module-based imports and CSS
- Migrated web-vitals to v4 API (`onCLS`/`onINP` replacing `getCLS`/`getFID`)
- Replaced `Buffer`-based Base64 encoding with browser-native `TextEncoder`/`btoa`
- Migrated craco `devServer` to `setupMiddlewares` for webpack-dev-server v5
- Updated Tailwind config to use `content` API and `class` darkMode strategy
- CI workflows updated to Node.js 20 and `ubuntu-latest`
- Standardized HTML: removed trailing `/` from void tags, removed invalid meta tags, moved `<script>` tags into proper `<head>`/`<body>` sections
- Simplified URL validation logic in `ShareModal` and `GetButton`
- Replaced manual Whisper tooltip with `ShareModeTooltip` in `ShareModal` and `GetButton`
- Switched syntax highlighter from highlight.js to Prism with `oneLight` theme in `GetButton`
- Updated code snippet generation to one-line-per-service format
- Hide sharing mode controls in `ShareModal` when opened via custom share route
- Share page now resolves service names through standard naming before redirecting
- Fixed `redux-persist` blacklist key from `openShareModal` to `shareModal`
### Removed
- Deprecated and unused packages (`ansi-html`, `axios`, `body-parser`, `elliptic`, `lodash`, `node-forge`, etc.)
- `resolutions` overrides in `package.json` by resolving vulnerabilities at source
- `craco-less` plugin dependency (replaced with inline webpack less-loader config)
- `ts-jest`, `xml-js`, and `glob` dev dependencies
## [0.6] - 2025-03-10
### Added
- `Custom Share` button
- Add `ServiceName` enum
### Changed
- Update dependencies mentioned in the depandabot alerts
- Update `ShareModal` display settings to handle `Custom Share` button action
- Update naming conventions
- GitHub action versions updated
## [0.5] - 2025-01-15
### Added
- Support `Reddit`
- Support `Trello`
- Support `Pinterest`
- Support `Blogger`
- Support `LinkedIn`
- Support `Facebook`
- Load `Share to` modal by link (Custom Share)
### Changed
- 404 page moved to `public` folder
## [0.4] - 2024-12-24
### Added
- Support `Hacker News`
- Support `Yahoo Mail`
- Custom 404 page
- Support URL-safe encoding using `Base64URL` format
### Changed
- `README.md` updated
## [0.3] - 2024-10-30
### Added
- Google Tag Manager installed
- Support `X`
- Support `WhatsApp`
- Support multi parameters
- Handle url encoding
### Changed
- `README.md` description updated
- Move all services data to `services.data` file
- Improve loading-cover animation
- Move `build` & `version_check` steps to `github runners`
- `AUTHORS.md` updated
## [0.2] - 2024-09-16
### Added
-   MyButton Logo
-   Support query param for routing
-   Handle active page by Redux
### Changed
-   Update Redux structure to use `createSlice` instead of `createReducer`
-   Navigation structure removed
-   Redirect all paths to `/`
-   Update loading icon in `LodingCover.tsx`
-   Automatically update the share button code by switching between direct & indirect mode

## [0.1] - 2024-07-24
### Added
-   `Email` support
-   `Gmail` support
-   `Telegram` support
-   Choose direct or indirect sharing mode

[Unreleased]: https://github.com/openscilab/mybutton/compare/v0.7...dev
[0.7]: https://github.com/openscilab/mybutton/compare/v0.6...v0.7
[0.6]: https://github.com/openscilab/mybutton/compare/v0.5...v0.6
[0.5]: https://github.com/openscilab/mybutton/compare/v0.4...v0.5
[0.4]: https://github.com/openscilab/mybutton/compare/v0.3...v0.4
[0.3]: https://github.com/openscilab/mybutton/compare/v0.2...v0.3
[0.2]: https://github.com/openscilab/mybutton/compare/v0.1...v0.2
[0.1]: https://github.com/openscilab/mybutton/compare/c6df6cc...v0.1
