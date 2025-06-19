# Masin Project REST API

## Tech Stack

- **Node.js** (Express.js) – REST API server
- **MongoDB** (via Mongoose) – Database
- **Joi** – Input validation
- **JWT** – Authentication
- **bcryptjs** – Password hashing
- **CORS, Morgan, Cookie-Parser** – Middleware
- **Nodemon** – Server autostart

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone <repo-url>
   cd masinproject
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment**
   - By default, the app uses `config.json` for MongoDB connection and JWT secret.
   - To override, set the `MONGODB_URI` environment variable.

4. **Start MongoDB**
   - Ensure MongoDB is running locally on `mongodb://localhost:27017/masinproject` (or update the connection string in `config.json`).

5. **Run the server**
   ```sh
   npm start
   ```
   - The server will run on [http://localhost:5000](http://localhost:5000).

## API Endpoints

- **POST /api/login** – User login
- **POST /api/register** – User registration
- (Other endpoints may exist for user management, see `routes/` and `controllers/`)

## API Testing

You can use tools like **Postman** or **curl** to test the API.

### Example: Register

```sh
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "password": "Password123!",
    "role": "User"
  }'
```

### Example: Login

```sh
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'
```

## Design Decisions & Assumptions

- **Authentication**: JWT-based, with roles (Admin, User, Legal, PM, Sales).
- **Validation**: All registration and login data is validated using Joi.
- **Password Security**: Passwords are hashed with bcryptjs before storage.
- **Error Handling**: Centralized error handler for consistent API responses.
- **Views**: Jade is set up but not used for API responses (API is JSON-based).
- **CORS**: Enabled for cross-origin requests.
- **Environment**: Assumes local MongoDB for development; can be configured for production.

## Additional Resources

- In the `db` folder, you will find the database and a Postman collection folder containing documentation and example requests for every API endpoint. 