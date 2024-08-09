# Restaurant Review API

This project is a RESTful API built using Node.js and Express, with MongoDB as the database and docker. The API allows users to register, log in, add restaurants, rate them, retrieve restaurants within a specific range, and update or delete restaurant details. The entire application is containerized using Docker.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Restaurant Endpoints](#restaurant-endpoints)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ayarvind/restaurant-backend.git
   cd restaurant-backend
    ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Set up environment variables:**
   copy the .env.example file to .env and set the values for the environment variables.

4. **Start the server:**

   ```bash
    npm start
    ```

5. ** Using Docker:**
   Run the following command to start the server using docker
   ```bash
   docker-compose up --build
   ```
    The server will be running on http://localhost:3000

## Usage

The API can be accessed using the base URL: http://localhost:3000

## API Endpoints
1. ### User Endpoints
   - **POST /api/register**: Register a new user
   - **POST /api/login**: Login a user
   - **GET  /api/restaurant**: Get all restaurants with in some radius of a location
   - **GET /api/restaurant/range**: Get all restaurants with in some range
    - **POST /api/restaurant**: Add a new restaurant
    - **PUT /api/restaurant/:id**: Update a restaurant
    - **DELETE /api/restaurant/:id**: Delete a restaurant
    - **POST /api/restaurant/rate**: Rate a restaurant








    
   

