# MyButton Release Instructions

#### Last Update: 2024-07-14

1. Create the `release` branch under `dev`
2. Update all version tags
    1. `SECURITY.md`
    2. `package.json`
    3. `otherfiles/version_check.py`
    4. `src/App/Config/constants.ts`
3. Update `CHANGELOG.md`
    1. Add a new header under `Unreleased` section (Example: `## [0.1] - 2022-08-17`)
    2. Add a new compare link to the end of the file (Example: `[0.2]: https://github.com/openscilab/mybutton/compare/v0.1...v0.2`)
    3. Update `dev` compare link (Example: `[Unreleased]: https://github.com/openscilab/mybutton/compare/v0.2...dev`)
4. Update `.github/ISSUE_TEMPLATE/bug_report.yml`
   1. Add new version tag to `MyButton version` dropbox options
5. Create a PR from `release` to `dev`
    1. Title: `Version x.x` (Example: `Version 0.1`)
    2. Tag all related issues
    3. Labels: `release`
    4. Set milestone
    5. Wait for all CI pass
    6. Need review (**2** reviewers)
    7. Squash and merge
    8. Delete `release` branch
6. Merge `dev` branch into `main`
    1. `git checkout main`
    2. `git merge dev`
    3. `git push origin main`
    4. Wait for all CI pass
7. Create a new release
    1. Target branch: `main`
    2. Tag: `vx.x` (Example: `v0.1`)
    3. Title: `Version x.x` (Example: `Version 0.1`)
    4. Copy changelogs
    5. Tag all related issues
8. Bump!!
9. Close this version issues
10. Close milestone
