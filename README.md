
# Angular Project with JSON Server for Mock Data

This project demonstrates how to integrate **JSON Server** into an Angular project to mock backend APIs for development and testing purposes.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Setup JSON Server](#setup-json-server)
4. [Running the Project](#running-the-project)
5. [API Endpoints](#api-endpoints)
6. [Customizing the Mock Data](#customizing-the-mock-data)
7. [Troubleshooting](#troubleshooting)
8. [Useful Commands](#useful-commands)
9. [License](#license)

## Introduction

This project is an Angular-based application using **JSON Server** to mock backend services. JSON Server provides an easy way to simulate a REST API by serving data from a `db.json` file.

The purpose of this setup is to enable rapid prototyping, development, and testing without the need for a fully functional backend.

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (>= 12.x)
- **Angular CLI** (>= 12.x)
- **JSON Server** (installed globally or locally)

## Setup JSON Server

1. **Install JSON Server:**

   You can install JSON Server globally or locally in the project.

   - Globally (recommended):

     ```bash
     npm install -g json-server
     ```

   - Locally (as a dev dependency):

     ```bash
     npm install json-server --save-dev
     ```

2. **Create a Mock Data File:**

   In the root of your Angular project, create a `db.json` file. This file will serve as your mock database. Here's an example of what it might look like:

   ```json
   {
     "users": [
       { "id": 1, "name": "John Doe", "email": "john@example.com" },
       { "id": 2, "name": "Jane Doe", "email": "jane@example.com" }
     ],
     "products": [
       { "id": 1, "name": "Product A", "price": 100 },
       { "id": 2, "name": "Product B", "price": 150 }
     ]
   }
   ```

3. **Modify Angular Environment Configuration (Optional):**

   If you plan to use the mock server alongside your Angular app, you can configure the environment to point to the mock server. For example, in `src/environments/environment.ts`:

   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000' // Mock API URL
   };
   ```

## Running the Project

1. **Start the JSON Server:**

   Run the following command to start the JSON Server:

   ```bash
   json-server --watch db.json
   ```

   This will start the mock server at `http://localhost:3000`. By default, it will watch for changes to the `db.json` file.

2. **Run the Angular Application:**

   In a separate terminal window, run the Angular app using:

   ```bash
   ng serve
   ```

   Your Angular app should now be running on `http://localhost:4200`.

   API calls from the Angular app will hit the mock server at `http://localhost:3000` if configured properly.
   
3. **Run the Angular Application and JSON Server concurrently:**

   install concurrently package:
   ```bash
   npm install concurrently --save-dev
   ```

   add a new script in package.json to run scripts together:
   ```bash
   "start": "ng serve",
   "json-server:watch":"json-server --watch ./src/data/db.json --port 3004",
   "start:all": "concurrently \"npm run start\" \"npm run json-server:watch\""
   ```

## API Endpoints

The JSON Server will automatically create CRUD routes for each entity in the `db.json` file.

For example, if you have `users` and `products` in your `db.json`, the following endpoints will be available:

- **GET** `/users`
- **POST** `/users`
- **PUT** `/users/:id`
- **DELETE** `/users/:id`
- **GET** `/products`
- **POST** `/products`
- **PUT** `/products/:id`
- **DELETE** `/products/:id`

You can access these endpoints using your Angular app by making HTTP requests.

## Customizing the Mock Data

You can customize the mock data in the `db.json` file at any time. JSON Server automatically watches for changes and updates the mock API in real time.

For example, to add a new entity like `orders`, just update the `db.json` file:

```json
{
  "users": [...],
  "products": [...],
  "orders": [
    { "id": 1, "userId": 1, "productId": 1, "quantity": 2 }
  ]
}
```

## Troubleshooting

- **CORS Issues**: If you run into CORS issues when making HTTP requests, you may need to configure CORS headers or use a proxy. This can be configured in `angular.json` under `"serve"` using the `proxyConfig` option.
- **Port Conflicts**: If you experience a port conflict, you can specify a different port for JSON Server using `--port`:

  ```bash
  json-server --watch db.json --port 4000
  ```

- **Resource Not Found**: Ensure that the endpoint you're accessing exists in the `db.json` file and that the mock server is running.

## Useful Commands

- **Start Angular app**: 

  ```bash
  ng serve
  ```

- **Start JSON Server**: 

  ```bash
  json-server --watch db.json
  ```

- **Change JSON Server Port**: 

  ```bash
  json-server --watch db.json --port 4000
  ```

## License

This project is licensed under the MIT License.
