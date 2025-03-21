# 🚀 Tabula Rasa - Strapi Setup Guide

This document provides a comprehensive guide to setting up, managing, and deploying the Strapi CMS for the Tabula Rasa project. Strapi is used as the backend CMS to manage content such as topics and subtopics, which are consumed by the server and client applications.

## 📋 Project Overview

The Tabula Rasa project consists of three main components:

- **strapi/**: The CMS backend for managing content (e.g., topics and subtopics).
- **server/**: A Node.js/Express server that exposes API endpoints (e.g., `/api/knowledge-map`) and integrates with Strapi.
- **client/**: A frontend React application that consumes data from the server and displays it to users.

Strapi manages two primary content types:
- **Topics**: Main categories of knowledge (e.g., "Test Topic").
- **Subtopics**: Subcategories linked to topics (e.g., "Test Subtopic"), with additional fields like notes.

## ⚙️ Prerequisites

Before setting up Strapi, ensure you have the following installed:

- **Node.js**: Version >=18.0.0 <=22.x.x (e.g., v22.13.1)
- **npm**: Version >=6.0.0 (bundled with Node.js)
- **PostgreSQL**: For local development (optional if using Render's PostgreSQL instance)
- **Git**: For version control
- **Render Account**: For deployment
- **Text Editor**: VS Code or similar for editing files

## 🛠️ Setup Instructions

### 1. Clone the Repository

Clone the Tabula Rasa repository to your local machine:

```bash
git clone https://github.com/harshvardhan-91/tabula-rasa.git
cd tabula-rasa/strapi
```

### 2. Install Dependencies

Install the required dependencies for Strapi:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `strapi/` directory (copy from `.env.example` if available):

```
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=hjmzpDKoYxwItPycGJKqRg==,Vkz2nC6Fm1RHDtw8zpkWXw==,aGQpxQMkdEanREVvoTDigg==,JDZHiuWGwcMCyJZ21RDQAw==
API_TOKEN_SALT=MPfO8qvcpTrLBFMYXK+JPQ==
ADMIN_JWT_SECRET=yqGaESf7ATYvhh6+Xzceiw==
TRANSFER_TOKEN_SALT=jodih1gQUSedQDtyCWN8Rw==

# Database
DATABASE_CLIENT=postgres
DATABASE_URL=<your-postgres-connection-string> # e.g., postgres://user:password@host:port/dbname
DATABASE_SSL=false
JWT_SECRET=vBqHFOd/+m7wxyHySnjzWw==
```

- **For Local Development**: 
  - Install PostgreSQL locally (e.g., `brew install postgresql` on macOS or `sudo apt install postgresql` on Ubuntu)
  - Create a database: `createdb strapi`
  - Update `DATABASE_URL` to point to your local PostgreSQL instance (e.g., `postgres://postgres:password@localhost:5432/strapi`)

- **For Render Deployment**: 
  - Replace `<your-postgres-connection-string>` with the connection string provided by Render (see Deployment section below)

### 4. Verify Database Configuration

Ensure `config/database.js` is set up for PostgreSQL:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```

Note: This configuration uses `DATABASE_URL` from the `.env` file, making it compatible with Render's PostgreSQL service.

### 5. Start Strapi Locally

Run Strapi in development mode with auto-reload enabled:

```bash
npm run develop
```

Expected Output:
```
Project information

┌────────────────────┬──────────────────────────────────────────────────┐
│ Time               │ ...                                              │
│ Launched in        │ ...                                              │
│ Environment        │ development                                      │
│ Process PID        │ ...                                              │
│ Version            │ 5.11.2 (node v22.13.1)                           │
│ Edition            │ Community                                        │
│ Database           │ postgres                                         │
│ Database name      │ strapi                                           │
└────────────────────┴──────────────────────────────────────────────────┘

Welcome back!
To access the server ⚡️, go to:
http://localhost:1337
```

Access the admin panel at http://localhost:1337/admin and create an admin user if prompted.

## 📝 Content Management

Strapi provides a user-friendly admin panel to manage content types like topics and subtopics.

### 1. Access the Admin Panel
- Open http://localhost:1337/admin (or https://your-render-url/admin after deployment)
- Log in with your admin credentials

### 2. Manage Topics
- **Content Type**: Topic (defined in `src/api/topic/content-types/topic/schema.json`)
- **Fields**:
  - `name`: String (e.g., "Test Topic")
  - `subtopics`: Relation (one-to-many with Subtopics)
- **Actions**:
  - Go to Content Manager > Topics
  - Click Create new entry
  - Add a topic (e.g., Name: "Test Topic")
  - Save and publish

### 3. Manage Subtopics
- **Content Type**: Subtopic (defined in `src/api/subtopic/content-types/subtopic/schema.json`)
- **Fields**:
  - `name`: String (e.g., "Test Subtopic")
  - `topic`: Relation (many-to-one with Topic)
  - `notes`: Text (optional, for user notes)
- **Actions**:
  - Go to Content Manager > Subtopics
  - Click Create new entry
  - Add a subtopic (e.g., Name: "Test Subtopic", Topic: "Test Topic", Notes: "This is a test note")
  - Save and publish

### 4. Verify Content

Run the following script (`query.js`) to verify content in the database:

```javascript
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  try {
    await client.connect();
    // List tables
    const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables in database:', tables.rows);

    // Query topics
    const topics = await client.query('SELECT * FROM strapi_topics');
    console.log('Topics:', topics.rows);
  } catch (err) {
    console.error('Error executing query:', err);
  } finally {
    await client.end();
  }
})();
```

Install the pg package if needed:
```bash
npm install pg
```

Run:
```bash
node query.js
```

Expected Output:
```
Tables in database: [{ table_name: "strapi_topics" }, { table_name: "strapi_subtopics" }, ...]
Topics: [{ id: 1, name: "Test Topic", ... }, ...]
```

## ⚙️ API Endpoints

Strapi automatically generates REST API endpoints for your content types. Use these to fetch data in the server and client applications.

- **GET /api/topics**: Fetch all topics.
  - Example: `http://localhost:1337/api/topics?populate=subtopics`
  - Response:
    ```json
    {
      "data": [
        {
          "id": 1,
          "attributes": {
            "name": "Test Topic",
            "subtopics": {
              "data": [
                {
                  "id": 1,
                  "attributes": {
                    "name": "Test Subtopic",
                    "notes": "This is a test note"
                  }
                }
              ]
            }
          }
        }
      ],
      "meta": {}
    }
    ```

- **GET /api/subtopics/:id**: Fetch a specific subtopic by ID.
  - Example: `http://localhost:1337/api/subtopics/1?populate=*`
  - Response:
    ```json
    {
      "data": {
        "id": 1,
        "attributes": {
          "name": "Test Subtopic",
          "notes": "This is a test note",
          "topic": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "Test Topic"
              }
            }
          }
        }
      },
      "meta": {}
    }
    ```

- **PUT /api/subtopics/:id**: Update a subtopic (e.g., to save notes).
  - Example: `PUT http://localhost:1337/api/subtopics/1`
  - Request Body:
    ```json
    {
      "data": {
        "notes": "Updated note"
      }
    }
    ```
  - Response:
    ```json
    {
      "data": {
        "id": 1,
        "attributes": {
          "name": "Test Subtopic",
          "notes": "Updated note",
          "topic": {
            "data": {
              "id": 1,
              "attributes": {
                "name": "Test Topic"
              }
            }
          }
        }
      },
      "meta": {}
    }
    ```

## 🚀 Deployment on Render

### 1. Set Up PostgreSQL on Render
- In the Render dashboard, create a new PostgreSQL instance:
  - Go to New > PostgreSQL
  - Name the instance (e.g., tabula-rasa-db)
  - Note the connection string (e.g., postgres://user:password@host:port/dbname)

### 2. Configure Environment Variables on Render
- In the Render dashboard, go to your Strapi service (tabula-rasa-sub9)
- Update the environment variables:
  ```
  HOST=0.0.0.0
  PORT=1337
  APP_KEYS=hjmzpDKoYxwItPycGJKqRg==,Vkz2nC6Fm1RHDtw8zpkWXw==,aGQpxQMkdEanREVvoTDigg==,JDZHiuWGwcMCyJZ21RDQAw==
  API_TOKEN_SALT=MPfO8qvcpTrLBFMYXK+JPQ==
  ADMIN_JWT_SECRET=yqGaESf7ATYvhh6+Xzceiw==
  TRANSFER_TOKEN_SALT=jodih1gQUSedQDtyCWN8Rw==
  DATABASE_CLIENT=postgres
  DATABASE_URL=<your-postgres-connection-string>
  DATABASE_SSL=false
  JWT_SECRET=vBqHFOd/+m7wxyHySnjzWw==
  ```

### 3. Deploy Strapi
- Push your changes to GitHub:
  ```bash
  git add .
  git commit -m "Configure Strapi for PostgreSQL on Render"
  git push
  ```
- Redeploy the strapi service on Render
- Monitor the logs for:
  ```
  [2025-03-18T...Z] info Database connected successfully
  [2025-03-18T...Z] info Initializing Strapi models
  ```

### 4. Verify Deployment
- Access the admin panel at https://tabula-rasa-sub9.onrender.com/admin
- Add a new topic (e.g., "Render Topic") and verify it persists after redeployment
- Test the API endpoints (e.g., https://tabula-rasa-sub9.onrender.com/api/topics?populate=subtopics)

## 🔍 Troubleshooting

### 1. Database Connection Issues
- **Symptom**: Strapi logs show `Error: Cannot connect to database.`
- **Solution**:
  - Verify `DATABASE_URL` in `.env` or Render environment variables
  - Ensure the PostgreSQL instance is running on Render
  - Check network access (Render's PostgreSQL should be accessible from your Strapi service)

### 2. No Tables Created
- **Symptom**: `node query.js` shows `Tables in database: []`
- **Solution**:
  - Ensure Strapi started successfully and initialized the schema
  - Add a topic via the admin panel to trigger schema creation
  - Verify the database connection in `config/database.js`

### 3. API Endpoints Not Working
- **Symptom**: `GET /api/topics` returns an error or empty data
- **Solution**:
  - Ensure content exists in the admin panel (publish topics/subtopics)
  - Use `populate` to fetch related data (e.g., `?populate=subtopics`)
  - Check Strapi logs for errors

### 4. Deployment Fails on Render
- **Symptom**: Render deployment logs show errors (e.g., dependency issues)
- **Solution**:
  - Ensure `package.json` includes all dependencies (e.g., `pg` for PostgreSQL)
  - Check for Node.js version compatibility (>=18.0.0 <=22.x.x)

## 📚 Learn More

- [Strapi Documentation](https://docs.strapi.io) - Official Docs
- [Strapi CLI](https://docs.strapi.io/dev-docs/cli) - CLI Reference
- [Deployment Guide](https://docs.strapi.io/dev-docs/deployment) - Strapi Deployment
- [Render Deployment](https://render.com/docs) - Render Docs
- [PostgreSQL Setup](https://render.com/docs/databases) - Render PostgreSQL
- Community: [Strapi Discord](https://discord.strapi.io) | [Forum](https://forum.strapi.io/)

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi) for feedback and contributions.

## ✨ Strapi Commands

### `develop`

Start your Strapi application with autoReload enabled:

```bash
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled:

```bash
npm run start
# or
yarn start
```

### `build`

Build your admin panel:

```bash
npm run build
# or
yarn build
```

### `deploy`

Deploy your Strapi application:

```bash
yarn strapi deploy
```

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>