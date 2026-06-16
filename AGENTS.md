## General Guidelines
- Keep things simple. Do not overengineer things.
- Write short, clear, simple, and elegant code.
- Make small, focused changes.
- For large changes, check the documentation first for simpler solutions and alternatives.
- Avoid redundant error handling as much as possible. We should have as few `try-catch` blocks as possible.
- Keep the file sizes small. 400+ lines is too large and should probably be broken down into smaller files.
- Use type imports where possible.


## React Guidelines
- Define prop types right in the functional component's definition (no separate prop types).
- Use the latest React hooks like `useEffectEvent`, if necessary.
- Don't create redundant hooks. Use context instead.
- Use `useAsyncEffect` instead of `useEffect` for async tasks.
- Rely on MUI as much as possible. Avoid writing a lot of CSS.


## Firebase Functions
- Firebase functions can only deploy the code that is in the `functions` directory. So, shared code should be in the `functions/shared` directory.
- The environment variables are defined in the `.env` file.
- Do not modify the `firbeaseMock`. If you can't run the tests, it's probably because of misconfigured environment variables.


## Project structure
The project includes both the front-end (Next.js app) and the backend-end (Firebase serverless functions) in one repository.

```markdown
project
├── firebase        (includes Firebase-specific files like Storage and Firestore rules and Firestore indexes)
├── functions       (firebase serverless functions)
│   ├── emails      (react-email templates)
│   ├── generators  (generators for models to speed up testing)
│   ├── models      (all the models for both the front-end and the backend)
│   ├── services    (the main functionality of each endpoint)
│   ├── shared      (shared code between the whole app, including Firebase Functions and the Next.js app)
│   ├── test        (includes tests for the serverless functions)
│   └── index.ts    (all the Firebase functions endpoints)
├── public          (static assets, etc.)
└── src             (the main Next.js app source code)
    ├── app         (Next.js app router)
    ├── auth        (Everything related to authentication)
    ├── components  (React components)
    ├── hooks       (React hooks. Note that we don't create hooks for all the services (like useUser). We only have global hooks like `useAsyncEffect` or `useStickyState`.)
    ├── server      (Next.js layer that works on the server side)
    └── services    (includes client-side logic for reading/writing to firestore, connecting to firebase functions, uploading files, etc.)
```

You can add directories to the project structure as you see fit.
For example, you can create a `src/tools` directory to define tools with the AI SDK, or `src/agents` to define AI agents.
