# 📝 Notes API Backend

A robust RESTful API for a note-taking application built with modern technologies including Node.js, Express, MongoDB, and JWT authentication.

## ✨ Features

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

# MongoDB Atlas Connection String
# Replace with your actual connection string from MongoDB Atlas
# Make sure to:
# 1. Replace <username> and <password> with your database user credentials
# 2. Replace YOUR_DATABASE_NAME with your chosen database name
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/YOUR_DATABASE_NAME?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
NODE_ENV=development
```

### 4. Database Setup
Follow the **MongoDB Atlas Setup** section below to configure your cloud database.

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

## 🗄️ MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)

### Step 2: Database Access
1. Go to **Database Access** in the left sidebar
2. Click **Add New Database User**
3. Create a username and password
4. Set database user privileges to **Read and write to any database**

### Step 3: Network Access
1. Go to **Network Access** in the left sidebar
2. Click **Add IP Address**
3. Choose **Allow Access from Anywhere** (0.0.0.0/0) for development
4. For production, add your specific IP addresses

### Step 4: Get Connection String
1. Go to **Clusters** and click **Connect**
2. Choose **Connect your application**
3. Copy the connection string
4. Replace `<password>` with your database user password
5. **Important**: Add your database name after the `/` in the URL

**Example Connection String:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/YOUR_DATABASE_NAME?retryWrites=true&w=majority
```

### Step 5: Configure Environment Variables
Update your `.env` file with your Atlas connection string:

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
