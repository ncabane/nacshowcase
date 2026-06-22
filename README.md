# SpriteCloud Test Automation Assignment

Playwright + TypeScript solution for the SpriteCloud TA challenge: **UI tests** on [Sauce Demo](https://www.saucedemo.com) and **API tests** on [DummyJSON](https://dummyjson.com).

## Quick start

### Prerequisites

- Node.js 20+ (LTS recommended)
- Yarn (`npm install -g yarn` or `corepack enable`)

### Install and run

```bash
git clone https://github.com/ncabane/spritecloud-ta.git
cd spritecloud-ta
yarn install
yarn playwright install
yarn test
```

### Useful commands

| Goal | Command |
|------|---------|
| Run all tests | `yarn test` |
| UI tests only | `yarn test:ui` |
| API tests only | `yarn test:api` |
| Headed browser | `yarn test:headed` |
| Debug mode | `yarn test:debug` |
| Open HTML report | `yarn report` |

After a run, reports are written to:

- **HTML:** `playwright-report/index.html`
- **JUnit:** `test-results/junit.xml`

In CI, both are uploaded as GitHub Actions artifacts.

---

## Test coverage

### UI — Sauce Demo

| Test | File | Description |
|------|------|-------------|
| Full checkout | `tests/ui-automation/tests/checkout.spec.ts` | Adds two items, completes checkout, validates subtotal/tax/total |
| Sort Z→A | `tests/ui-automation/tests/sort-items-za.spec.ts` | Sorts inventory by name descending and validates order |
| Failed login | `tests/ui-automation/tests/failed-login.spec.ts` | Uses invalid credentials and asserts error message |

### API — DummyJSON

| Test | File | Description |
|------|------|-------------|
| Login | `tests/api-automation/tests/auth.login.spec.ts` | Successful login with token validation |
| Get product | `tests/api-automation/tests/products.get.spec.ts` | GET `/products/1` and validate payload |
| Create cart | `tests/api-automation/tests/carts.create.spec.ts` | POST `/carts/add` with 3 products for logged-in user |
| Delete cart | `tests/api-automation/tests/carts.delete.spec.ts` | DELETE `/carts/{id}` and validate `isDeleted` |
| Negative #1 | `tests/api-automation/tests/negative.spec.ts` | Invalid login credentials → `400` |
| Negative #2 | `tests/api-automation/tests/negative.spec.ts` | Non-existent product → `404` |

---

## Project structure

```
spritecloud-ta/
├── .github/workflows/ci.yml
├── config/urls.ts              # Base URLs and test credentials
├── playwright.config.ts
├── tests/
│   ├── ui-automation/
│   │   ├── fixtures.ts
│   │   ├── page-objects/
│   │   └── tests/
│   └── api-automation/
│       ├── clients/dummyJsonApi.ts
│       ├── fixtures.ts
│       └── tests/
└── README.md
```

---

## Assumptions

1. **Sauce Demo credentials:** `standard_user` / `secret_sauce` are used for happy-path UI flows (public demo credentials).
2. **Sauce Demo tax:** Tax is calculated as **8%** of the item subtotal, matching the checkout summary behaviour on the demo site.
3. **DummyJSON credentials:** `emilys` / `emilyspass` from the DummyJSON docs are used for API login and cart creation.
4. **Cart DELETE:** The assignment DELETE scenario uses `DELETE /carts/{id}` against cart `id: 1` from the DummyJSON seed dataset. POST `/carts/add` is simulated and not persisted, so DELETE is validated on an existing cart rather than a newly created one.
5. **Negative scenarios:** Invalid login (`POST /auth/login`) and missing product (`GET /products/999999`) target **two different endpoints** as required.
6. **Browser scope:** Chromium only for fast, stable smoke-style execution. Cross-browser coverage would be added in a broader regression suite.
7. **No record-and-play:** All tests are hand-written using the Page Object Model and a small API client.

---

## AI usage disclosure

AI (**Cursor**, with models such as Claude) was used as a **peer assistant** during this assignment:

- Bootstrapping the project structure by recycling patterns from a prior Playwright assignment
- Drafting the GitHub Actions workflow and Playwright reporter configuration
- Refining type definitions for DummyJSON responses
- README structure and wording

All test scenarios, locators, assertions, and architectural choices were reviewed and adjusted manually. Spec flows and business validations reflect the assignment requirements.

---

## CI

GitHub Actions runs on every push/PR to `main` or `master`:

1. Install dependencies
2. Install Playwright Chromium
3. Run `yarn test`
4. Upload HTML and JUnit reports as artifacts

---

## Tooling choice

**Playwright + TypeScript** — stable, fast, strong typing, and supports both UI and API testing in one repo with a single `yarn test` entry point. No record-and-play tools were used.
