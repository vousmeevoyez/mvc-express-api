# Node.js Express REST API

![project image](https://raw.githubusercontent.com/vousmeevoyez/mvc-express-api/main/assets/react-hook.png)

## Overview
A simple REST API using Node.js, Express, ES6 modules (`.mjs`), and Swagger for documentation.
- [Backend project](https://github.com/vousmeevoyez/mvc-express-api)
- [Frontend project](https://github.com/vousmeevoyez/mvc-express-api)



## Features
- CRUD operations
- Swagger UI for API documentation
- ES6 modules (`.mjs`)

## Prerequisites
- Node.js (14+)
- npm

## Installation

```bash
git clone 
npm install
```

## Running the Server

```bash
npm run server
```

Server runs at `http://localhost:3000`.

## Project Structure

```
.
├── src
│   ├── controllers
│   │   └── exampleController.mjs
│   ├── routes
│   │   └── index.mjs
│   │   └── exampleRoutes.mjs
│   ├── models
│   │   └── exampleModel.mjs
│   ├── app.mjs
├── package.json
└── README.md
```

## API Documentation

Access Swagger UI at `http://localhost:3000/api-docs`.

## Scripts

- **Dev mode (nodemon):** `npm run server`

## License
MIT

## Author
Kelvin D

## Contributing

1. Fork the repo.
2. Create your branch (`git checkout -b feature/fooBar`).
3. Commit changes (`git commit -am 'Add some fooBar'`).
4. Push to branch (`git push origin feature/fooBar`).
5. Create a Pull Request.
