# The Teach-Stack for Building Web Platforms in the AI-Native Era
![tech-stack-wallpaper](https://github.com/MartinXPN/nextjs-firebase-mui-starter/assets/16335716/e327c878-4b78-4b7d-9caf-67b8d34977e8)

This repo is a template described in the blog post 
[Title](URL).

---

Tools like Claude Code and Codex have completely reshaped how software engineering is done.
This new tooling allows for much faster development and iteration, but it's important to keep the code maintainable and scalable to make sure the project can continue evolving over the long term.


When working on a startup, the speed of iteration is key. The requirements change quickly, features are added daily, and code gets modified rapidly.
In those conditions, picking technologies that enable fast iteration, while ensuring your users get the best experience possible is crucial.


During the last four years or so, we have experimented with many modern technologies while building [Profound Academy](https://profound.academy).
So, in this blog post, I'd like to present the whole tech stack that enables building quickly, while having a highly maintainable codebase, scalable infrastructure, and a great user experience. We'll cover everything from Authentication to UI, we'll talk about the backend, hosting, testing, and much more!


## AI Agents, Skills, and MCP servers
AI Agents enable quick iteration and rapid improvement, including bug fixes, addition of new features, and performance improvements.
Yet, it's important to keep the code maintainable for the long run. AI tools make it really easy to overengineer things and add thousands of lines of code to a project.
It's important to resist the urge of solving problems that don't exist yet, and keep things simple (both in terms of the code, the infrastructure, and the user experience).
Even in the Agentic Software Development Era, having a small and simple setup helps. Agents coordinate better, features are added faster, bugs are fixed easier, and the code is maintainable by humans too.

So, we have chosen to take a balanced/neuanced approach of how we use AI Agents when it comes to working on code that's pushed to production.
The setup for AI Agents is pretty simple:
- Keep the `AGENTS.md` or `CLAUDE.md` file as small as possible. It should only contain things that you keep repeating in every conversation with the agent and some project-specific things that the Agents keep getting wrong.
- Large `AGENTS.md` files can actually hurt the performance of an LLM and make it less useful.
- For skills, it's best to only install the skills relevant to the current conversation and then remove them when the conversation is over.
- Less is more when it comes to the number of skills installed, and the size of the `AGENTS.md` file. 
- Here are several skills that can be useful (don't keep them installed all the time as that contaminates the context window):
  - UI/UX skill: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
  - React/NextJS skills: https://github.com/vercel-labs/agent-skills
  - Firebase skills: https://github.com/firebase/agent-skills
  - PostHog skills: https://github.com/posthog/skills

For MCP Servers, the one from PostHog allows for easy access to Error traces and logs, which helps in debugging and fixing issues.
[Context7](https://github.com/upstash/context7) is an MCP server that provides code documentation for LLMs. That way, the Agents can reference the latest docs of libraries and frameworks.
In most cases, the Agents are smart enough to figure things out without the extra help from the MCP server. So, I find myself rarely needing to install/enable the MCP servers.

## Frontend
As the core frontend technology, [React](https://react.dev) stands out as the top pick for many full-stack projects. While there are other options like Vue or Svelte, React shines because of its vast range of libraries. This big ecosystem makes it easier to add new features and change things fast, which is why it's a favorite for many developers.

However, React, as a frontend library, often doesn't get along well with search engines like Google or Bing. These search engines use bots to look through the HTML of a page and understand its content. Yet, pages built with React usually start with an empty HTML body from the server. This means if you want your website to show up in search results on Google, Bing, or other search engines, you need to make sure the first content from the server includes HTML elements filled with the right information about the page.

That's where [Next.js](https://nextjs.org) shines. It's a React framework that provides server-side rendering and static website generation. So, the pages powered with Next.js get rendered on the server first, after which the HTML is sent to the browser, making sure the initial content of the page has all the necessary information about the page. After the page is rendered, only the necessary JavaScript is sent to the client, making sure that the bundle sent to the user's browser is minimal. This improves both the user experience and how well search engine bots understand the page.

The latest standard in NextJS projects is the `app router`, which makes it easy for develoeprs to use features like incremental static regeneration, partial pre-rendering, and many other feaures that improve the user experience and make the app feel faster.
So, I highly recommend [starting the project](https://nextjs.org/docs/app/getting-started/installation) with the `app router`.

React is moving in the server-side direction (becoming somewhat similar to PHP) and the Next.js `app router` provides great developer experience for developing "server-first" React components.
Features like caching, TurboPack, and AI agent-friendly setup in Next.js make it easy to build and iterate quickly.


## UI
When developing web apps, the traditional workflow in companies goes through several stages, which include planning, UI/UX design, implementation, and many iterations of back and forth between designers and developers. Startups require quick iteration, where keeping the development cycle short is crucial.

In our experience, the most efficient way of going about UI/UX was by picking a solid UI framework ([MUI](https://mui.com) in our case) and following a design template instead of asking a designer to create everything in Figma, after which the developers would re-create everything in the React app. We kept a single source of truth - the codebase. This literally saved us months!

MUI has a rich collection of highly customizable components that cover the most common use cases. The great thing is that everything is customizable, but because of the great defaults, in most cases, we would end up using the components with all their default behaviors and appearances.

One bonus of using MUI is that it also provides a [wide collection of icons](https://mui.com/material-ui/material-icons) that can be used as React components. This makes including icons in the app very straightforward.

There are several alternatives to MUI:
- [shadcn/ui](https://ui.shadcn.com) is a modern alternative that is very popular. Although I can't convince myself that copy-pasting the library code (through CLI) into your codebase is a good idea.
- [Ant Design](https://ant.design) is also a great alternative.
- [Charkra UI](https://chakra-ui.com) can also be used as a UI Framework.
- [HeroUI](https://heroui.com/) previously known as NextUI, is also great.

Some people suggest just using [styled components](https://styled-components.com). Some use [Tailwind CSS](https://tailwindcss.com).
Yet, for both styled components and Tailwind CSS, one still writes a lot of CSS. This might not provide the best developer experience compared to using a UI Framework, especially if we aim to avoid designing all the pages on the website.

One can look for inspiration in different Tempalte stores:
- MUI Store is great and contains many stunning UI templates: https://mui.com/store
- Dribble also has some nice templates - https://dribbble.com/tags/react_template

Alternatively, you can just ask the AI Agent to design several prototypes and pick the best one from those.
To improve the UI generated, you can add skills like the UI/UX skill: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.


## Forms
Forms are a big part of full-stack projects. In our experience, [Zod](https://zod.dev) and [React Hook Form](https://react-hook-form.com) work great together and provide all the functionality one might need to create forms. In this combo, Zod provides schema validation (types, min/max bounds, lengths, enums, etc.) while React Hook Form gives a flexible API to interact with the form. With these two libraries, one can nest components that interact with the same form, perform different complex validations, and update the data on the fly. They make working with forms seem too easy.

## Backend, Authentication, and Database
Platforms like [Firebase](https://firebase.google.com) and [Supabase](https://supabase.com) provide backend as a service helping you scale to millions of users without maintaining your own infrastructure. We currently use Firebase for authentication, storage, database (Firestore), and serverless functions to handle custom backend logic.

#### Authentication
One great product that can be used for authentication is [Clerk](https://clerk.com), but we currently use the default Firebase authentication system as it works pretty well. Firebase even has a separate package called [`firebaseui-web`](https://github.com/firebase/firebaseui-web) that helps one set up Firebase authentication without writing any UI code.

For Authentication to work properly, we also deploy the Next.js application to `auth.profound.academy` so that Firebase is able to handle authentication without issues.

#### Database
When developing large projects in a traditional way (separate frontend + separate backend with a database), one usually ends up having many API calls, triggered from the frontend, that modify the database entries. For many projects, 80% of those calls are simple CRUD (Create, Read, Update, Delete) operations. The other 20% involve more complex operations (like updating several entries or reading and aggregating data from several sources). One thing that Firebase does that's really smart is optimize for the 80% making it very easy to manipulate data from the frontend without redundant API endpoints (the other 20% which require more complex logic can be handled with Firebase Functions).
This is achieved with 2 components:
1. **Firestore Rules**: Everything related to access management and permissions is isolated into a single file: `firestore.rules`. This makes sure that API Endpoints don't need to check for user permissions in every function as Firebase does that automatically - it checks if the user is allowed to read the given piece of data or create/update/delete it. This isolation is invaluable when writing code as it helps drastically reduce redundant boilerplate code.
2. **Firestore Client SDK**: Creating, reading, updating, or deleting data is handled through the Firebase SDK. It provides many useful features like listening for realtime updates, incrementing counters, and batching updates together. All of which gets checked against `firestore.rules` automatically!

One caveat of using Firestore is the mental model for storing the data. As Firestore is optimized for read operations (which are usually the majority), it encourages keeping the data denormalized. This can be counterintuitive, especially for people coming from an SQL background. Here is a great talk explaining the details of data modeling in Firestore: [link](https://youtu.be/lW7DWV2jST0).

Overall, Firestore provides great user experience (especially through real-time change listeners) and developer experience making it easy to move fast and adapt the whole application to changing needs.

I would advise starting the project with Firestore's Enterprise database variant in Native mode. That supports many more features that might not be available in the prior (standard) versions of Firestore, like pipeline queries, built-in full-text-search, etc.
This gives the full flexibility of a MongoDB-like database, with an ease-of-use that comes with Firestore.

#### Serverless Functions
We usually like to keep the client code very simple, while isolating the more involved parts into the backend code - inside serverless functions. Keeping the frontend code "dumb", while the backend "smart" has worked pretty well. Firebase provides a service called Functions which can contain any backend code and are triggered in several ways. They can be invoked with a regular HTTP request, get triggered as soon as an entry is created or updated in Firestore, or run periodically as a cron job with Pub/Sub. This way we can have all the functionality we need on the "server" implemented in separate serverless functions.
The best part is that the serverless functions scale up and down really well. So, big spikes in traffic are handled automatically by Google, and you get charged for only the resources used - idle time is free.

---

In general, BaaS technologies like Firebase save a lot of time. In most cases, they just work! I very rarely find myself debugging an issue caused by some irregularity in a database, a failed migration, or something similar.

## AI Features
AI is a big part of the modern web apps, and many applications integrate AI chatbots and Agents into their offering.
We currently use the [AI SDK](https://ai-sdk.dev/) from Vercel to integrate different AI model providers into our application and create our own custom Agents.
The great thing about the AI SDK is that it's easy to integrate different AI models into the application and switch between them when necessary.
The developer experience is much cleaner than any of the model-specific SDKs.


## Tests
Testing is probably one of the most controversial topics, especially for startups that have constantly changing requirements. In the early days, we didn't have tests. Yet, as the product grew, it became almost impossible to make changes to the existing codebase, while being confident that everything would work fine after the changes were pushed to production. So, we started introducing tests for the "backend". More specifically, the service layer of Firebase Functions. The frontend is not tested as we keep it "dumb", while the backend code, which is "smart", is tested against edge cases. Most tests are integration tests. We very rarely do unit tests. As most services touch several other parts, it's more reasonable to perform integration tests to make sure all the parts work fine together - without mocking too much.

To test the backend, we use [jest](https://jestjs.io). One library that helps a lot in automatically generating fake data inside tests is [faker.js](https://fakerjs.dev).

To execute the tests, a separate Firebase project is created - to make sure the production project is intact. Having a separate "test" Firebase project helps in iterating quickly and not worrying about affecting the users. After all the tests are passed, the new version of Firebase Functions can be pushed to production.


## Refactoring
As the project grows, features are added or modified, requirements change, and things get "old", **refactoring** becomes inevitable. The two largest contributors to a confident code modification process are [TypeScript](https://www.typescriptlang.org) and robust Integration tests. TypeScript takes care of the type safety after changes, while the integration tests make sure that the logic hasn't been broken during those changes.

Project refactoring actually happens more often than expected. For instance, we haven't had any 6-month period where we haven't done any major refactoring in the project. As the platform constantly changes, the addition of some technologies requires some major code modifications. Two of our largest refactoring milestones were switching from pure Rect to Next.js and switching from the Next.js `pages router` to the `app router`.


## Hosting
As the whole backend code sits on Firebase (Google Cloud), the frontend code is deployed to [Vercel](https://vercel.com). It provides the most convenient infrastructure to ship Next.js projects. Vercel makes it very straightforward to deploy Next.js applications. It has a GitHub integration, which works really well with branches (without any manual setup):
* As soon as something gets pushed to the `main` branch, Vercel automatically deploys it to production.
* As soon as something gets pushed to some other branch, Vercel automatically creates a "Preview" deployment and generates a separate link for that deployment. After which the link contains the deployed version of that branch.
  So, iterating is very convenient and fast.


## Analytics and Monitoring
Knowing your users and how they use your product is invaluable. It can save weeks or sometimes even months of development time helping prioritize the right things. The right monitoring can help improve the user experience by fixing common bugs and issues.

For general analytics and product monitoring, we use [PostHog](https://posthog.com), including analytics, session replay, exception capture, logs, and production sourcemaps.

Alternatively, you can use [Google Analytics for Firebase](https://firebase.google.com/docs/analytics) (with more setup, but free of charge) or [Sentry](https://sentry.io) (which is a bit more expensive).

All of these help a lot in improving the product and really knowing your users. Although there is nothing like [directly talking to them](https://youtu.be/z1iF1c8w5Lg).


## Emails
Emails are one of the most reliable ways of staying in touch with users, sending updates, and engaging them.
We've recently switched from sending emails with Sendgrid to sending them with [`react-email`](https://github.com/resendlabs/react-email) and [Resend](https://resend.com).
`react-email` makes it very easy to have highly customizable emails - it basically turns writing an email into writing a React component.
Resend, on the other hand, integrates well with `react-email` and has great pricing. The good part about having emails as React components is they get checked in with the rest of the code to the version control, and one is able to keep track of all the changes in one place.


---


## Prerequisites
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

# PostHog (analytics, product monitoring, and sourcemaps)
NEXT_PUBLIC_POSTHOG_KEY=phc_
POSTHOG_API_KEY=phx_
POSTHOG_PROJECT_ID=123456

# Firebase Functions
RESEND_API_KEY=

# Local development
HOST=local
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/firebase-test-key.json
```

</details>


## Running the project
Available scripts include:
* `pnpm dev` Runs the app in the development mode
* `pnpm build` Builds the app for production
* `pnpm start` Starts the app in production mode
* `pnpm emulate` Emulates the whole Firebase stack locally. On first run, it exports emulator data to `./test_data`; on later runs, it imports from that directory.
* `pnpm --dir functions test` Runs the Firebase Functions test suite
* `firebase deploy` Deploys the Firebase project to production (Functions, Firestore, and rules)
* `firebase deploy --only functions` Deploys the Firebase Functions to production
* `lsof -t -i tcp:5000 | xargs kill &&  lsof -t -i tcp:5001 | xargs kill &&  lsof -t -i tcp:9099 | xargs kill &&  lsof -t -i tcp:8080 | xargs kill &&  lsof -t -i tcp:9199 | xargs kill &&  lsof -t -i tcp:8087 | xargs kill # firebase kill all emulators` Kills all firebase emulators and frees up ports

## Project structure
The project is organized as a mono-repo that includes both the front-end (Next.js app) and the backend-end (Firebase serverless functions)
in one repository. Therefore, some things like models (schemas) are shared between those two major components to avoid replication.

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
