# Changelog

## [0.6.0](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.5.3...ui-v0.6.0) (2025-05-22)


### Features

* **Markdown/KaTeX:** load KaTeX fonts on demand from jsDelivr ([0f50293](https://github.com/aprendendofelipe/tabnews/commit/0f50293237d742ba8fc84b115578b92ae5f16ec6))
* **PrimerRoot:** add support for headChildren and additional HTML props ([52baa5f](https://github.com/aprendendofelipe/tabnews/commit/52baa5ffb0b6342d8ca0f37d84846d3f22da3a66))
* **ui/_document:** add `configureDocument` function to manage document properties ([7d4e518](https://github.com/aprendendofelipe/tabnews/commit/7d4e5181444774c3988ef2349d6b9ae5652d9360))


### Bug Fixes

* **vite.config:** set preserveModulesRoot to 'src' for better module resolution ([8f549d5](https://github.com/aprendendofelipe/tabnews/commit/8f549d508ae9be6c530d7c400d5c92cc070b8ed5))

## [0.5.3](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.5.2...ui-v0.5.3) (2025-04-29)


### Bug Fixes

* **MarkdownEditor:** Revert "refactor(MarkdownEditor): apply background-color via .bytemd container" ([4741de4](https://github.com/aprendendofelipe/tabnews/commit/4741de4a6f1d76765906c79cf7acb85cd27d610d))

## [0.5.2](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.5.1...ui-v0.5.2) (2025-04-29)


### Bug Fixes

* **MarkdownEditor:** add padding to prevent border overlap by child elements ([62890d8](https://github.com/aprendendofelipe/tabnews/commit/62890d85ddb7e1f41392d6a4f6db5b28f2df2022))
* **MarkdownEditor:** avoid Safari clipping resize handle ([9414460](https://github.com/aprendendofelipe/tabnews/commit/9414460b2537ce3bb99465bbfa99f8a7bd20cb04))

## [0.5.1](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.5.0...ui-v0.5.1) (2025-04-28)


### Bug Fixes

* **MarkdownEditor:** align border focus color with Primer variables ([8203af1](https://github.com/aprendendofelipe/tabnews/commit/8203af16970b4f0ccfe27b96eadece4386df5208))

## [0.5.0](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.4.1...ui-v0.5.0) (2025-04-28)


### Features

* **Markdown:** add `MarkdownEditor/Viewer` component ([279218d](https://github.com/aprendendofelipe/tabnews/commit/279218de3cee983d5f10ee8687ca4edbc92703d1))
* **Markdown:** align component styles with `@primer/react` ([d1229b7](https://github.com/aprendendofelipe/tabnews/commit/d1229b77936ccf5d6be536aa4e2b30fe4b8d0069))
* **ui:** create GoToTopButton component ([c935b7e](https://github.com/aprendendofelipe/tabnews/commit/c935b7ec581a18ce01046b2440c1dccaee7c2bb8))
* **ui:** forward ref on FormField ([0614e1c](https://github.com/aprendendofelipe/tabnews/commit/0614e1c6f816c75377457ca60465eb98e0ee4d9c))


### Bug Fixes

* lock react peer dependency to 18.x ([509721b](https://github.com/aprendendofelipe/tabnews/commit/509721b5847c68d07ff43dd2a2d0fccf71caab4b))

## [0.4.1](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.4.0...ui-v0.4.1) (2025-04-21)


### Bug Fixes

* **FormField:** add color prop for ignore suggestion button ([0fd3012](https://github.com/aprendendofelipe/tabnews/commit/0fd3012cd4f7a1b1a364189d8702717424b909a1))

## [0.4.0](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.3.3...ui-v0.4.0) (2025-04-16)


### Features

* **app router:** add `use client` directive ([11b6bf3](https://github.com/aprendendofelipe/tabnews/commit/11b6bf394165bcf10bba727b9900f683b38e5151))
* **AutoThemeProvider:** add `noFlash` prop to control NoFlashGlobalStyle rendering ([526f4b5](https://github.com/aprendendofelipe/tabnews/commit/526f4b582860efea30ff1038d85e809deef97228))
* **AutoThemeProvider:** add ColorModeCookieSync for managing color mode in cookies ([03f2db9](https://github.com/aprendendofelipe/tabnews/commit/03f2db9bf2469237c7d79260034845bf4a50de37))
* **color mode:** use `light`/`dark` instead of `day`/`night` ([01a7676](https://github.com/aprendendofelipe/tabnews/commit/01a7676c291bd8e7ac5a1c183c2288f75dfe5e4a))
* **CSS modules:** update to the new `@primer/react` approach ([a645a6c](https://github.com/aprendendofelipe/tabnews/commit/a645a6c6ffdc17862bdabd8e653c88626575981d))
* **PrimerRoot:** add server component with color mode management ([fd69b5c](https://github.com/aprendendofelipe/tabnews/commit/fd69b5c9439df452afee2b92d0dbc29d2b6e2948))
* **SCRegistry:** add StyledComponentsRegistry for server-side rendering with styled-components ([f059981](https://github.com/aprendendofelipe/tabnews/commit/f0599813bfed8ffd60bfbcd51512d9668393c99a))

## [0.3.3](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.3.2...ui-v0.3.3) (2025-01-10)


### Bug Fixes

* **FormField:** always add `FormControl.Label` ([ed43cb3](https://github.com/aprendendofelipe/tabnews/commit/ed43cb385404fa613ea2d4943df036fd8d5fff23))
* **FormField:** use `FormControl.Validation` only with `TextInput` ([9393709](https://github.com/aprendendofelipe/tabnews/commit/9393709ffa49f72fca77d594e833ffed7c0e5475))

## [0.3.2](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.3.1...ui-v0.3.2) (2024-12-18)


### Bug Fixes

* **FormField:** ensure the Select component is fully clickable ([6c6fc53](https://github.com/aprendendofelipe/tabnews/commit/6c6fc53192909d8905a0acece309a125486f05fa))

## [0.3.1](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.3.0...ui-v0.3.1) (2024-11-07)


### Bug Fixes

* update import paths to include file extensions ([566a28f](https://github.com/aprendendofelipe/tabnews/commit/566a28f1cc9a760c521c86752a79564ac56533de))

## [0.3.0](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.2.0...ui-v0.3.0) (2024-11-07)


### Features

* **FormField:** add hidden prop to conditionally render field ([db312db](https://github.com/aprendendofelipe/tabnews/commit/db312db5b8a12a0aa5f950a432569335bd87918e))
* **ui:** add suggestion component enhancements with tooltip and ignore button ([de910c1](https://github.com/aprendendofelipe/tabnews/commit/de910c1f44d5f901bca1af51ca3b5cc69685f8eb))
* **ui:** enhance FormField with password visibility toggle and caps lock warning ([e0aa04b](https://github.com/aprendendofelipe/tabnews/commit/e0aa04b26ccd4503db7eec5ab8b15962d3be1553))

## [0.2.0](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.1.0...ui-v0.2.0) (2024-11-04)


### Features

* **ui:** add `FormField` component ([92c3ae3](https://github.com/aprendendofelipe/tabnews/commit/92c3ae380463bd47eb5da6fba4e61002423218b0))
* **ui:** add ESM exports to package.json ([45074a1](https://github.com/aprendendofelipe/tabnews/commit/45074a1d75ede3c3eecff57a50338e79fc69220c))
* **ui:** add Suggestion component to FormField ([c0336df](https://github.com/aprendendofelipe/tabnews/commit/c0336df71191302075347810c8abc81c6bba6ce4))

## [0.1.0](https://github.com/aprendendofelipe/tabnews/compare/ui-v0.0.3...ui-v0.1.0) (2024-10-03)


### ⚠ BREAKING CHANGES

* **ui:** re-export the original `@primer/react` via `@tabnews/ui/primer`

### Code Refactoring

* **ui:** re-export the original `@primer/react` via `@tabnews/ui/primer` ([45d0b57](https://github.com/aprendendofelipe/tabnews/commit/45d0b57e5da176490e35478b35478c39914d7507))
