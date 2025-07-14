Notes API Backend
A simple RESTful API for a note-taking application built with Node.js, Express, MongoDB, and JWT authentication.
Features

User registration and authentication
JWT-based authorization
Password hashing with bcrypt
CRUD operations for notes
User-specific notes (users can only see their own notes)
MongoDB integration with Mongoose


Setup Instructions
1. Clone the repository
   git clone <your-repo-url>
   cd notes-app/backend

2. Install dependencies
   npm install

3. Environment Variables
   Create a .env file in the backend directory and add the following:
   PORT=5000
  # MONGO_URI=mongodb://localhost:27017/notes-app


  #if You are using mongodb atlas then paste your link here (example is given below) 
  #do not forget to give name to your db and uncommet this

  # For MongoDB Atlas, use:

  # MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/notes-app?retryWrites=true&w=majority


  JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
  NODE_ENV=development


4. Start MongoDB

mongodb atlas is preffered
Or use MongoDB Atlas for cloud database.


5. Run the application
 to start frontend 
 cd notes-api
 npm  run dev
 click on the link to open localhost:5173 
 to see the front end 

 to start backend 
 cd notes-api
 cd backend
 npm run dev


# Production mode
The server will start on http://localhost:5000
API Endpoints
Authentication
Register User
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Login User
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
Get User Profile
GET /api/auth/me
Authorization: Bearer <jwt_token>
Notes
Get All Notes
GET /api/notes
Authorization: Bearer <jwt_token>
Create Note
POST /api/notes
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the content of my note"
}
Update Note
PUT /api/notes/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Note Title",
  "content": "Updated content"
}
Delete Note
DELETE /api/notes/:id
Authorization: Bearer <jwt_token>
Sample API Usage
1. Register a new user
bashcurl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
2. Login
bashcurl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
3. Create a note (use the token from login response)
bashcurl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Note",
    "content": "This is my first note content"
  }'
4. Get all notes
bashcurl -X GET http://localhost:5000/api/notes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
Project Structure
backend/
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── notesController.js   # Notes CRUD operations
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── User.js              # User model
│   └── Note.js              # Note model
├── routes/
│   ├── auth.js              # Authentication routes
│   └── notes.js             # Notes routes
├── config/
│   └── db.js                # Database configuration
├── .env                     # Environment variables
├── .env.example             # Environment variables example
├── .gitignore              # Git ignore file
├── package.json            # Dependencies and scripts
├── server.js               # Main server file
└── README.md               # This file
Error Handling
The API includes proper error handling for:

Invalid credentials
Missing required fields
Unauthorized access
Resource not found
Database connection errors

Security Features

Password hashing with bcrypt
JWT token authentication
Protected routes
User-specific data access
Input validation

Development
To contribute to this project:

Fork the repository
Create a feature branch
Make your changes
Test thoroughly
Submit a pull request

License
This project is licensed under the MIT License.