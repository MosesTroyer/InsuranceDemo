# Insurance Demo

#### Quickstart

With node installed:

```
cd server
npm i
npm run dev
```

This watches the directory and starts the node server.

In another window:

```
cd client
npm i
npm start
```

#### Further Work

Improvements to the project, given additional effort and time:

- Interface for DB
  - Swap out between real / in memory depending on tests or local dev
- No more "any"
  - When user input is validated, it's first brought in just using "any"- give it a type
- Data validation on backend
  - After validating input in the backend, it currently just returns a 400 bad request, but it should include additional user readable errors.
- Date Picker instead of text field
  - Really just a more mature handling of the date of birth in general
- Sharing models between front and back end for data types
- Refactor of package.json and tsconfig.json for sharing of configuration and additional scripts for running tests / running everything
- Front End Unit Tests
