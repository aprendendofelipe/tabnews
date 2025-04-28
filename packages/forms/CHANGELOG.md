# Changelog

## [0.3.2](https://github.com/aprendendofelipe/tabnews/compare/forms-v0.3.1...forms-v0.3.2) (2025-04-28)


### Bug Fixes

* lock react peer dependency to 18.x ([509721b](https://github.com/aprendendofelipe/tabnews/commit/509721b5847c68d07ff43dd2a2d0fccf71caab4b))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @tabnews/helpers bumped from ^0.2.1 to ^0.3.0
    * @tabnews/hooks bumped from ^0.1.4 to ^0.1.5

## [0.3.1](https://github.com/aprendendofelipe/tabnews/compare/forms-v0.3.0...forms-v0.3.1) (2025-04-22)


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @tabnews/helpers bumped from ^0.2.0 to ^0.2.1
    * @tabnews/hooks bumped from ^0.1.3 to ^0.1.4

## [0.3.0](https://github.com/aprendendofelipe/tabnews/compare/forms-v0.2.5...forms-v0.3.0) (2025-04-16)


### Features

* **app router:** add `use client` directive ([11b6bf3](https://github.com/aprendendofelipe/tabnews/commit/11b6bf394165bcf10bba727b9900f683b38e5151))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @tabnews/helpers bumped from ^0.1.2 to ^0.2.0
    * @tabnews/hooks bumped from ^0.1.2 to ^0.1.3

## [0.2.5](https://github.com/aprendendofelipe/tabnews/compare/forms-v0.2.4...forms-v0.2.5) (2024-12-19)


### Bug Fixes

* **card fields:** correctly set `isValid` state for `month` and `year` ([107887b](https://github.com/aprendendofelipe/tabnews/commit/107887b959b76893a568cbaa3df64e46188b04fb))
* **docs validation:** add empty document number check and update error messages ([48f1903](https://github.com/aprendendofelipe/tabnews/commit/48f19031ff2fed772a7e2592dff5cd24cc22c26d))
* **email confirmation:** handle empty confirmation field and improve validation logic ([b123bb0](https://github.com/aprendendofelipe/tabnews/commit/b123bb0c96f246ee9e18bbcf772d202a03cb509e))

## [0.2.4](https://github.com/aprendendofelipe/tabnews/compare/forms-v0.2.3...forms-v0.2.4) (2024-12-18)


### Bug Fixes

* **cvv field:** change input type from password to text ([72c440a](https://github.com/aprendendofelipe/tabnews/commit/72c440a66758ac29aa2a3c9cfb5774ea9f4dad9b))
* **document field:** fix PASSPORT validation ([8c71cb4](https://github.com/aprendendofelipe/tabnews/commit/8c71cb441055792334f7f76d56aaa89bffb25a87))
* **email field:** add max length validation ([de3d007](https://github.com/aprendendofelipe/tabnews/commit/de3d0079f197da180606a9e9624c0bade7fdf04d))
* **full name field:** add maximum length check and trim preparation ([241549b](https://github.com/aprendendofelipe/tabnews/commit/241549b1ad5c0d4478e1a855c6609ca29dd5682b))
* **phone field:** improves validations ([8036037](https://github.com/aprendendofelipe/tabnews/commit/803603742cdb40e5c4368ce3a05b077f7679ceb9))

## [0.2.3](https://github.com/aprendendofelipe/tabnews/compare/forms-v0.2.2...forms-v0.2.3) (2024-11-22)


### Features

* **cep field:** return address from onValidChange ([fb8992c](https://github.com/aprendendofelipe/tabnews/commit/fb8992cbbad922a456ddbc9c0dc5d8f390604216))
* **useForm:** add onChange, onBlur, and onStateChange handlers ([077f067](https://github.com/aprendendofelipe/tabnews/commit/077f067242d729f84f87fcf74d73f07d36cdcc67))

## [0.2.2](https://github.com/aprendendofelipe/tabnews/compare/forms-v0.2.1...forms-v0.2.2) (2024-11-11)


### Bug Fixes

* **card-cvv:** update format and validation to support 4-digit CVV ([3e75c01](https://github.com/aprendendofelipe/tabnews/commit/3e75c01511c35442cd117083be5526b7d150ba8c))
* **card-fields:** update card number length validation and formatting ([4295f68](https://github.com/aprendendofelipe/tabnews/commit/4295f68a858effd8e9a3e6b81d78902e2820c317))
* **password-fields:** add autocomplete attributes for password inputs ([cafe630](https://github.com/aprendendofelipe/tabnews/commit/cafe630c33f5bf1a5d0a7bf200dba7c2bf1f2689))
* **password-fields:** remove name properties from password field definitions ([5accd2c](https://github.com/aprendendofelipe/tabnews/commit/5accd2cf64e7255a1487d7752f487f2836da23fa))

## [0.2.1](https://github.com/aprendendofelipe/tabnews/compare/forms-v0.2.0...forms-v0.2.1) (2024-11-07)


### Bug Fixes

* update import paths to include file extensions ([566a28f](https://github.com/aprendendofelipe/tabnews/commit/566a28f1cc9a760c521c86752a79564ac56533de))
* **useForm:** update form handling for missing configuration ([1f3ce99](https://github.com/aprendendofelipe/tabnews/commit/1f3ce99382f6bd8c0217861521faf35d855e7980))
* **validation-br:** import from @tabnews/forms ([200169d](https://github.com/aprendendofelipe/tabnews/commit/200169dd05b2567a5aa7b622b0f405e421aded05))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @tabnews/helpers bumped from ^0.1.1 to ^0.1.2
    * @tabnews/hooks bumped from ^0.1.1 to ^0.1.2

## [0.2.0](https://github.com/aprendendofelipe/tabnews/compare/forms-v0.1.1...forms-v0.2.0) (2024-11-07)


### Features

* **forms:** add address fields with validation and autocomplete support ([3476503](https://github.com/aprendendofelipe/tabnews/commit/34765034e480f3c0aba8e85d4ab9479f3bc2fec2))
* **forms:** add autoComplete attribute to phone field and enhance tests ([ff49a50](https://github.com/aprendendofelipe/tabnews/commit/ff49a50127d2b52a1b80a2e842e254c0d746ae03))
* **forms:** add card fields with validation ([bfa51a9](https://github.com/aprendendofelipe/tabnews/commit/bfa51a9a8eeb0f98fc9f922319d9117600005f79))
* **forms:** add full name and username fields with validation ([0394901](https://github.com/aprendendofelipe/tabnews/commit/0394901ad75241edc933be2dab9153d2e60c7f5c))
* **forms:** add password fields with validation and confirmation logic ([2fab432](https://github.com/aprendendofelipe/tabnews/commit/2fab432e165885e508b3bdfc0a663ab38a09bb32))
* **forms:** enhance email field confirmation ([a7c193c](https://github.com/aprendendofelipe/tabnews/commit/a7c193cb7bbcf02557bc2735841a662c639e30d8))
* **forms:** implement CPF/CNPJ document handling with validation ([7ddd9dd](https://github.com/aprendendofelipe/tabnews/commit/7ddd9dd703c22c4c049e2325632e35b598d04cb6))
* **useForm:** add submitDisabled and submitHidden options ([39a955a](https://github.com/aprendendofelipe/tabnews/commit/39a955ae87d3eabe80aa376b92d3d90fddeed9d6))
* **useForm:** add tests for checkbox ([64cc390](https://github.com/aprendendofelipe/tabnews/commit/64cc390163e06af510a1d11c1fbc8ccb6c330bc8))

## [0.1.1](https://github.com/aprendendofelipe/tabnews/compare/forms-v0.1.0...forms-v0.1.1) (2024-11-04)


### Bug Fixes

* **monorepo:** resolve structure issues in form and helper packages ([d04f85c](https://github.com/aprendendofelipe/tabnews/commit/d04f85cd5f0ef326def898d277d1135f3ffd9594))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @tabnews/helpers bumped from ^0.1.0 to ^0.1.1
    * @tabnews/hooks bumped from ^0.1.0 to ^0.1.1

## 0.1.0 (2024-11-04)


### Features

* **forms:** add CEP field with validation and API integration ([9bf2e80](https://github.com/aprendendofelipe/tabnews/commit/9bf2e80aeb890ca364af3eaccfd1dc8a05a00461))
* **forms:** add email field with validation and suggestion functionality ([321d4d1](https://github.com/aprendendofelipe/tabnews/commit/321d4d1de3352f84b62b786a454e88db922a3774))
* **forms:** add forms package with useForm hook ([7b83d76](https://github.com/aprendendofelipe/tabnews/commit/7b83d766dd90f50b91243a305c54dcc557ea3a32))
* **forms:** add phone field with formatting and validation ([30d032b](https://github.com/aprendendofelipe/tabnews/commit/30d032b38fe6cb362cd13d36020b83ff9741ce12))
* **forms:** add state field with validation and Brazilian states as options ([e9fdc86](https://github.com/aprendendofelipe/tabnews/commit/e9fdc864ca6f335c7f32dd79a39cf5c941515c8b))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @tabnews/helpers bumped from ^0.0.0 to ^0.1.0
    * @tabnews/hooks bumped from ^0.0.0 to ^0.1.0
