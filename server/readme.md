# Tabula Rasa Backend Server

## Overview
This directory contains the backend server for the **Tabula Rasa** project, a medical knowledge mapping application designed to help users study and organize medical topics. The backend is built using **Express.js** and connects to a **MongoDB** database for user authentication and a **Strapi** CMS for content management (e.g., topics and subtopics). It serves as the API layer between the React frontend (`client` folder) and the Strapi CMS (`strapi` folder).

## Features
- **User Authentication**: Handles user registration, login, and JWT-based authentication.
- **Knowledge Map API**: Fetches topics and subtopics from Strapi and serves them to the frontend.
- **Notes Management**: Allows users to save notes for subtopics via Strapi.

## Prerequisites
Before running the backend server, ensure you have the following installed:
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **MongoDB** (Either a local instance or a cloud instance like MongoDB Atlas)
- **Strapi CMS** (Running in the `strapi` folder)

## API Endpoints

### Authentication
- **POST /api/auth/signup**: Register a new user.
  - Body: `{ "username": "string", "email": "string", "password": "string" }`
- **POST /api/auth/login**: Log in a user and return a JWT token.
  - Body: `{ "email": "string", "password": "string" }`

### Knowledge Map
- **GET /api/knowledge-map**: Fetch all topics and their subtopics from Strapi.
- **GET /api/subtopic-content/:id**: Fetch details of a specific subtopic by ID.
- **PUT /api/subtopic-content/:id**: Update the notes for a specific subtopic.
  - Body: `{ "notes": "string" }`