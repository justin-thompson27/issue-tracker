# Issue Tracker

A role-based issue tracker for software teams. Users log in, and their role controls what they can change on an issue, like classification and priority.

**Live API:** https://issue-tracker-796332310847.us-central1.run.app 

**Example:** [/issues?page=2&limit=2](https://issue-tracker-796332310847.us-central1.run.app/issues?page=2&limit=2)

## Features

- REST API with GET, POST, PATCH, and DELETE endpoints
- User verification with BetterAuth
- Input validation with Zod schemas
- Connection to MongoDB with Express
- Pagination with the ability to limit, filter, and skip
- Automated testing for the REST API
- Error handling middleware for HTTP status codes
- Sign and sign out capabilities using a verified email
- Permissions for actions are role and ownership based

## Tech stack
TypeScript, Node.js, Express, MongoDB, Zod, BetterAuth, deployed on Google Cloud Run

## Run locally
1. `git clone https://github.com/justin-thompson27/issue-tracker.git`
2. `npm install`
3. Create a `.env` file with `MONGODB_URI` and `BETTER_AUTH_SECRET`.
4. `npm run dev`
5. `npm test` to run the tests


## Roadmap
- Add a PUT endpoint
- Improve frontend state management
- Add more search and sorting options
