# Changelog

## 0.2.0

### Minor Changes

- feat: 토글 및 토스트 컴포넌트 크기 변형 지원 추가

  - 토글 컴포넌트 크기 변형 (sm, lg) 스타일 적용
  - 토스트 컴포넌트 크기 변형 (sm, md, lg) 지원
  - HTML 데모 파일 클래스명 최신화 (dewp- 접두사 적용)
  - TypeScript 인터페이스에 크기 옵션 추가
  - CSS 클래스명 일관성 개선

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup
- SCSS architecture with basic, components, and common folders
- Comprehensive component library (buttons, badges, dropdowns, forms, modals, notices, pagination, tables, tabs, toasts, toggles, empty states)
- Spacing system with sequential naming (spacing-1 to spacing-20)
- Radius system with sequential naming (radius-1 to radius-10)
- Color system with semantic colors and status variants
- Typography system with consistent font scales
- Layout utilities and responsive grid system
- Form components with comprehensive styling
- Utility classes for common styling needs
- Rollup build configuration for JavaScript and SCSS
- TypeScript support with type definitions
- Development and build scripts

### Changed

- Refactored SCSS structure for better modularity
- Consolidated variables into specialized files (\_colors.scss, \_spacing.scss, \_radius.scss)
- Removed redundant imports from component files
- Updated component styles to use new spacing and radius systems

### Fixed

- Resolved undefined variable errors in component files
- Fixed spacing and radius variable references
- Corrected color variable usage throughout components
- Fixed form component styling issues

## [0.1.0] - 2024-12-19

### Added

- Initial release of DesignBase WordPress Library
- Core SCSS architecture and component system
- Basic JavaScript utilities and TypeScript support
- Comprehensive documentation and examples

## Versioning

This project uses semantic versioning:

- **MAJOR** version for incompatible API changes
- **MINOR** version for added functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

## Release Process

1. **Development**: Work on features in feature branches
2. **Testing**: Ensure all tests pass and examples work correctly
3. **Version Update**: Use npm scripts to update version
   - `npm run version:patch` - Bug fixes and minor updates
   - `npm run version:minor` - New features, backwards compatible
   - `npm run version:major` - Breaking changes
4. **Release**: `npm run release` - Build, version update, and push to git
5. **Documentation**: Update CHANGELOG.md with release notes

## Contributing

When contributing to this project, please:

1. Follow the existing code style and conventions
2. Add appropriate tests for new functionality
3. Update documentation as needed
4. Follow the commit message format: `type(scope): description`
5. Update the CHANGELOG.md with your changes
