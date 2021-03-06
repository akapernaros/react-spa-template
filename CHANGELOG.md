# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.8.4] - 2020-12-06
### Added
- Hide & Show content feature to List component.
 
### Changed
- Refactored: ExpandableBody is not exposed anymore, only used internally
 
## [0.8.3] - 2020-12-04
### Changed
- Upgraded to React17
- Updated i18n (react)

## [0.8.2] - 2020-12-04
### Changed
- Fixed crappy modal
- Adjusted colors of the modal.

## [0.8.1] - 2020-12-01
### Added
- Translations for new message handling
- Added "appearance" property to modal
- Documentation to the fresh
- README documentation
### Changed
- Hiding direct access to services
- Moved kitchensink (there is no "pages" but App.js).
### Removed
- Cleaned up obsolete "console.log" entries.

## [0.8.0] - 2020-11-28
### Added
- EventBus for sending messages and firing events
- ErrorBoundary
- ErrorDialog
- ErrorSection in Kitchensink
### Changed
- Repaired Modal section in Kitchensink
- Every button fires events
- Refactored services

## [0.7.2] - 2020-11-08
### Added
- Support for modal dialogs
- Added Modal demonstration in kitchen sink in the button section 

### Changed
- Replaced all alerts by the new modal-dialog 

### Removed
- Some log outputs.


## [0.7.0] - 2020-11-02
### Added
- First integration of Axios
- Example loading Data using Axios
- Simple configuration serivce
- Initializing services and nested WrappedComponents

### Changed
- Fixed type proplems of children in ExpandableSection
- Root app has three content parts: Waiting for init, init success => main page, init error => error message

## [0.6.5] - 2020-11-01
### Added
- Kitchen sink page and sub components
- List element for displaying content (instead of table)
- List example
- Added appearance 'light' and 'dark'

### Changed
- Moved Apps content to kitchen sink page
- Moved translations into an own section (app.<page>.<component>)
- Fixed default button appearance

### Removed
- Log outputs in expandable section

## [0.6.1] - 2020-10-26
### Added
- Example for two-way data binding

### Changed
- Fixed some layout issues on ExpandableSection

## [0.6.0] - 2020-10-25
### Added
- Bootstrap icons (react-bootstrap-icons)
- Tooltip for button
- Expandable Section 

### Changed
- Bootstrap button to html button
- button fullWidth flag from string to boolean

##Removed

## [0.5.0] - 2020-10-20
### Added 
- Added to github
- Integration of the i18next framework and react-i18next for i18n
- Integration of bootstrap and react-bootstrap
- Page for Proof-of-Concepts (Kitchen-Sink)
- Proof of concept: Header changing language
- Proof of concept: react-bootstrap (navbar, button) and certain html-elements (dropdowns) are encapsulated in components
- Proof of concept: i18n in HTML (<Trans>) and components (HOC).

### Changed
### Removed



