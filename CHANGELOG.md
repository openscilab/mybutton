# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
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

[Unreleased]: https://github.com/openscilab/mybutton/compare/v0.6...dev
[0.6]: https://github.com/openscilab/mybutton/compare/v0.5...v0.6
[0.5]: https://github.com/openscilab/mybutton/compare/v0.4...v0.5
[0.4]: https://github.com/openscilab/mybutton/compare/v0.3...v0.4
[0.3]: https://github.com/openscilab/mybutton/compare/v0.2...v0.3
[0.2]: https://github.com/openscilab/mybutton/compare/v0.1...v0.2
[0.1]: https://github.com/openscilab/mybutton/compare/c6df6cc...v0.1
