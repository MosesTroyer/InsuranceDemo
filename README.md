# Insurance Demo

#### Quickstart

With node installed:

```
cd server
npm i
npm run dev
```

This watches the directory and starts the node server.



#### Further Work

Improvements to the project, given additional effort and time:

- Interface for DB
  - Swap out between real / in memory depending on tests or local dev
- No more "any"
  - When user input is validated, it's first brought in just using "any"- give it a type
- Data validation on backend
  - After validating input in the backend, it currently just returns a 400 bad request, but it should include additional user readable errors.


- Unit tests, for both endpoints and front end
- Refactor of package.json and tsconfig.json for sharing of configuration and additional scripts for running tests / running everything