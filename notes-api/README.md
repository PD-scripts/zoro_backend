# 📝 Notes API Backend

A robust RESTful API for a note-taking application built with modern technologies including Node.js, Express, MongoDB, and JWT authentication.

## ✨ Features
 <img width="414" height="557" alt="image" src="https://github.com/user-attachments/assets/79d8daf9-93b6-442a-b05c-02dcdf376db1" /> <img width="405" height="557" alt="image" src="https://github.com/user-attachments/assets/81d486bd-5135-454d-a83d-d966d8b91e7a" /> <img width="823" height="614" alt="image" src="https://github.com/user-attachments/assets/e4d8f25a-5484-40c5-a854-820dff1b7a12" />





- 🔐 **User Authentication** - Secure registration and login system
- 🎫 **JWT Authorization** - Token-based authentication
- 🔒 **Password Security** - BCrypt hashing for password protection
- 📋 **CRUD Operations** - Complete note management (Create, Read, Update, Delete)
- 👤 **User Isolation** - Users can only access their own notes
- 🗄️ **MongoDB Integration** - Seamless database operations with Mongoose

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd notes-app/backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the backend directory:

```env
PORT=5000

# Local MongoDB (uncomment if using local instance)
# MONGO_URI=mongodb://localhost:27017/notes-app

# MongoDB Atlas (recommended - replace with your connection string)
# MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/notes-app?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
NODE_ENV=development
```

**⚠️ Important Database Configuration:**
- **For Local MongoDB**: Uncomment the local MongoDB URI line and comment out the Atlas URI
- **For MongoDB Atlas**: Uncomment the Atlas URI line and replace it with your own connection string from MongoDB Atlas
- **Replace the database URL with your own**: Make sure to update the connection string with your actual database credentials and cluster information

### 4. Database Setup
- **Recommended**: Use [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud database
- **Alternative**: Install and run MongoDB locally

### 5. Start the Application

#### Frontend
```bash
cd notes-api
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the frontend.

#### Backend
```bash
cd notes-api/backend
npm run dev
```
The server will start on [http://localhost:5000](http://localhost:5000)

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### 🔐 Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

### 📋 Notes Endpoints

#### Get All Notes
```http
GET /api/notes
Authorization: Bearer <jwt_token>
```

#### Create Note
```http
POST /api/notes
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "My First Note",
  "content": "This is the content of my note"
}
```

#### Update Note
```http
PUT /api/notes/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Note Title",
  "content": "Updated content"
}
```

#### Delete Note
```http
DELETE /api/notes/:id
Authorization: Bearer <jwt_token>
```

## 🔧 Example Usage

### 1. Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create a Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Note",
    "content": "This is my first note content"
  }'
```

### 4. Get All Notes
```bash
curl -X GET http://localhost:5000/api/notes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🌐 Frontend Integration

The frontend uses JavaScript fetch API to communicate with the backend. Here's how to make requests:

### Register User (Frontend)
```javascript
fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Login User (Frontend)
```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: '123456'
  })
})
.then(response => response.json())
.then(data => {
  console.log(data);
  // Store the token for future requests
  localStorage.setItem('token', data.token);
});
```

### Create Note (Frontend)
```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:5000/api/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'My First Note',
    content: 'This is my first note content'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Get All Notes (Frontend)
```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:5000/api/notes', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

## 📁 Project Structure

```
backend/
├── 📁 controllers/
│   ├── authController.js    # Authentication logic
│   └── notesController.js   # Notes CRUD operations
├── 📁 middleware/
│   └── auth.js              # JWT authentication middleware
├── 📁 models/
│   ├── User.js              # User model schema
│   └── Note.js              # Note model schema
├── 📁 routes/
│   ├── auth.js              # Authentication routes
│   └── notes.js             # Notes routes
├── 📁 config/
│   └── db.js                # Database configuration
├── .env                     # Environment variables
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
├── server.js               # Main server file
└── README.md               # Project documentation
```

## 🛡️ Security Features

- **🔐 Password Hashing**: BCrypt encryption for user passwords
- **🎫 JWT Authentication**: Secure token-based authentication
- **🔒 Protected Routes**: Authorization middleware for secure endpoints
- **👤 User Isolation**: Data access restricted to authenticated users
- **✅ Input Validation**: Request validation and sanitization

## ⚠️ Error Handling

The API provides comprehensive error handling for:

- ❌ Invalid credentials
- 📝 Missing required fields
- 🚫 Unauthorized access attempts
- 🔍 Resource not found errors
- 💾 Database connection issues

## 🤝 Contributing

We welcome contributions! To get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes
4. **Test** thoroughly
5. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
6. **Push** to the branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

## 📋 Requirements

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)

## 🔧 Scripts

```bash
# Development mode
npm run dev

# Production mode
npm start

# Run tests
npm test
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Happy coding! 🚀**
