# Sota Sports Talk

A full-stack sports blog where Minnesota fans can share posts and discuss the Vikings, Wild, Timberwolves, and Twins.

**Live site:** https://sotasportstalk.onrender.com/
*(Hosted on Render's free tier, so the first load after a quiet period can take up to a minute.)*

Originally built as the final project for CSCI 4131 (Internet Programming) at the University of Minnesota, Fall 2025.

## Features

- User registration and login with bcrypt password hashing and session-based authentication
- Full CRUD for posts and comments, limited to each item's author or an admin
- Admin accounts that can moderate any post or comment
- Team categories, each with its own page and color accent
- Recent and All feeds, plus comment counts on each post
- Responsive layout that works on desktop and mobile

## Tech Stack

- **Backend:** Node.js, Express 5, express-session, bcrypt
- **Frontend:** Pug templates, CSS, vanilla JavaScript
- **Database:** MySQL 8 (hosted on Aiven) via mysql2
- **Hosting:** Render

## Project Structure

```
server.js           Express app: routes, sessions, auth
data.js             MySQL connection pool and queries
schema.sql          Table definitions (Posts, Comments, Users)
templates/          Pug views (static.pug is the shared layout)
  mixins/           Reusable components (post card)
resources/
  css/main.css      Site styles
  js/               Client-side scripts for forms and deletes
  images/           Favicon and GIFs
design-backup/      Original pre-redesign templates and CSS
```

## Running Locally

**Requirements:** Node.js 22.9 or newer, and a MySQL 8 database (local or hosted, e.g. Aiven's free tier).

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create your environment file and fill in your database details:
   ```sh
   cp .env.example .env
   ```
   | Variable | Description |
   |---|---|
   | `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL connection details |
   | `DB_CA_PATH` | Path to the database's CA certificate, if it requires SSL (Aiven does). Leave blank for a local database. |
   | `SESSION_SECRET` | Long random string for signing session cookies (`openssl rand -hex 32`) |
3. Create the tables:
   ```sh
   mysql -h <host> -P <port> -u <user> -p <database> < schema.sql
   ```
4. Start the server and open http://localhost:4131:
   ```sh
   npm start
   ```

## Deploying to Render

1. Create a **Web Service** from this repo with build command `npm install`, start command `npm start`, and the **Free** instance type.
2. Add the variables from `.env` under **Environment**, plus `NODE_VERSION=22`.
3. If your database needs a CA certificate, upload it as a **Secret File** named `ca.pem` and set `DB_CA_PATH=/etc/secrets/ca.pem`.

Sessions are stored in memory, so users are logged out whenever the service restarts or wakes from sleep.
