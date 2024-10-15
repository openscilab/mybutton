# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Support `X`
- Support `WatsApp`
- Support multi parameters
- Handle url encoding
### Changed
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

[Unreleased]: https://github.com/openscilab/mybutton/compare/v0.2...dev
[0.2]: https://github.com/openscilab/mybutton/compare/v0.1...v0.2
[0.1]: https://github.com/openscilab/mybutton/compare/c6df6cc...v0.1
