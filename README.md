# UI Automation – Playwright (Demo Web Shop)

This project contains **UI automation tests only**.
The tests are written using **Playwright with TypeScript** and cover an end-to-end order placement flow on:
https://demowebshop.tricentis.com

---

## Tech Stack
- Playwright
- TypeScript
- Node.js
- Playwright HTML Reporter

---

## Project Structure
pages/                  # Page Object Model classes  
tests/                  # UI test specifications  
data/                   # External test data (JSON)  
playwright.config.ts    # Playwright configuration  
.env.example            # Environment variables example  
README.md               # Project documentation  

---

## Test Scenario
The automated UI test validates the following end-to-end flow:

- User registration with a random email
- Login with the newly registered user
- Add multiple products to the shopping cart
- Validate price calculation (unit price × quantity = subtotal)
- Complete checkout process
- Verify successful order placement message

---

## Test Data Generation
For user registration, a **random Gmail address** is generated dynamically at runtime to ensure test independence and avoid conflicts with existing users.

The random email is created using Gmail’s `+alias` feature combined with a random number, for example:
xxxxx+12345@gmail.com

This approach ensures:
- Each test run uses a unique email address
- No dependency on pre-existing user accounts
- Tests remain repeatable and reliable

---

## Environment Variables
Sensitive or configurable data is managed using environment variables.

Create a `.env` file in the project root (do not commit it to GitHub).

Required variables:
BASE_URL=https://demowebshop.tricentis.com  
DEFAULT_PASSWORD=xxxxx

---

## Setup

Install project dependencies:
npm install

Install Playwright browsers:
npx playwright install

---

## Running UI Tests

Run all UI tests:
npx playwright test

Run the specific order flow test:
npx playwright test order-flow.spec.ts

---

## Test Reports
Playwright generates an HTML report after test execution.

To open the latest report:
npx playwright show-report

---

## Notes
- Page Object Model (POM) design pattern is used
- Test data is externalized using JSON files
- No credentials or secrets are hardcoded in the project
- Tests are fully executable and reproducible