# The Ultimate Tech Stack for Building a Full-Stack MVP and Iterating Quickly

This repo is a template described the in blog post 
[The Ultimate Tech Stack for Building a Full-Stack MVP and Iterating Quickly](https://dev.to/martinxpn/the-ultimate-tech-stack-for-building-a-full-stack-mvp-and-iterating-quickly-1gd6-temp-slug-5348001?preview=31a392f065401ab7f41f06b466b87548defe1bc7765bfb5aa5d0712d417372bf4be5e4d338070d0613a707e0d24bfd472c1a614c81100bb30fc9a98a).

## Development

### Prerequisites
To run the project, you'll need `.env` or `env.local` file with corresponding environment variables.
When running tests or deploying firebase functions, you'll need to place the `.env` file in the `functions/` directory.
Below are presented the environment variables required to successfully run the project:

<details>
<summary>.env or .env.local for local development</summary>

```markdown
PRIVATE_FIREBASE_CLIENT_EMAIL=xxxx@yyyy.iam.gserviceaccount.com
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_RECAPTCHA_KEY=

# https://github.com/vercel/vercel/issues/749#issuecomment-707515089
PRIVATE_FIREBASE_PRIVATE_KEY_ID=
PRIVATE_FIREBASE_PRIVATE_KEY='"-----BEGIN PRIVATE KEY-----\n.....==\n-----END PRIVATE KEY-----\n"'

# Secrets used to sign cookies (2 random strings of your choice)
COOKIE_SECRET_CURRENT=
COOKIE_SECRET_PREVIOUS=
NEXT_PUBLIC_COOKIE_SECURE=false # set to true in HTTPS environment

# Secrets used to sign cookies.
COOKIE_SECRET_CURRENT=
COOKIE_SECRET_PREVIOUS=
NEXT_PUBLIC_COOKIE_SECURE=false # set to true in HTTPS environment

# Firebase Functions
RESEND_API_KEY=

# Sentry (error reporting and monitoring)
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SENTRY_ORG=
NEXT_PUBLIC_SENTRY_PROJECT=

# Local development
HOST=local
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/firebase-test-key.json
```

</details>


### Running the project
Available scripts include:
* `yarn dev` Runs the app in the development mode
* `yarn build` Builds the app for production
* `yarn start` Starts the app in production mode
* `yarn emulate` Emulates the whole Firebase stack locally
* `firebase deploy` Deploys the Firebase project to production (Functions, Firestore, and rules)
* `firebase deploy --only hosting` Deploys the Rect app in the `build` folder to production
* `yarn update:models` Updates the models in the Next.js app from `functions/models`
* ` lsof -t -i tcp:5000 | xargs kill &&  lsof -t -i tcp:5001 | xargs kill &&  lsof -t -i tcp:9099 | xargs kill &&  lsof -t -i tcp:8080 | xargs kill &&  lsof -t -i tcp:9199 | xargs kill &&  lsof -t -i tcp:8087 | xargs kill # firebase kill all emulators` Kills all firebase emulators and frees up ports

### Project structure
The project is organized as a mono-repo that includes both the front-end (React app) and the backend-end (Firebase serverless functions)
in one repository. Therefore, some things like models (schemas) are shared between those two major components to avoid replication.

```markdown
project
|
|-> firebase (includes Firebase-specific files like Storage and Firestore rules and Firestore indexes)
|-> functions (firebase serverless functions)
    |-> emails (react-email templates)
    |-> generators (generators for models to speed up testing)
    |-> models (all the models for both the front-end and the backend)
    |-> services (the main functionality of each endpoint)
    |-> test (includes tests for the serverless functions)
    |-> index.ts (all the Firebase functions endpoints)
|
|-> public (static assets, etc)
|-> src (the main Next.js app source code)
    |-> app (Next.js app router)
    |-> server (Next.js layer that works on the server side)
    |-> components (React components)
    |-> ...
    |-> ...
    |-> services (includes logic for reading and writing to firestore, connecting to firebase functions, uploading files, etc)
```
