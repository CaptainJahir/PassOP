# PassOP - Password Manager

PassOP is a modern and secure password manager built using Next.js, React, Redux, Express.js, and MongoDB. It allows users to generate strong passwords, store and manage credentials, and submit feedback.

## Features

✅ **Password Generator** - Generate secure passwords with customizable character sets.\
✅ **Credential Storage** - Securely store, edit, and delete saved credentials.\
✅ **Dark Mode Support** - Toggle between light and dark themes.\
✅ **Feedback Form** - Users can submit feedback via a dynamic form.\
✅ **Responsive Design** - Fully responsive UI optimized for various screen sizes.\
✅ **State Management** - Utilizes Redux Toolkit for efficient global state management.\
✅ **Toasts & Notifications** - Uses react-toastify for instant user feedback.\
✅ **Secure API** - RESTful backend powered by Express.js and MongoDB.

## Tech Stack

### **Frontend:**

- Next.js 15.1.6
- React 19.0.0
- Redux Toolkit 2.5.1
- Tailwind CSS 3.4.1
- React Hook Form 7.54.2
- React Toastify 11.0.3

### **Backend:**

- Node.js & Express.js
- MongoDB & Mongoose
- CORS & dotenv

## Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/PassOP.git
cd PassOP
```

### 2️⃣ Install Dependencies

#### Frontend

```sh
cd PassOP
npm install
```

#### Backend

```sh
cd backend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the backend folder and add the following:

```
MONGO_URI=your_mongodb_connection_string
PORT=3001
```

### 4️⃣ Run the Application

#### Start the Backend Server

```sh
cd backend
npm start
```

#### Start the Frontend

```sh
cd frontend
npm run dev
```

## Project Structure

```
PassOP/
 ├── frontend/
 │   ├── app/ (Next.js pages)
 │   ├── components/ (Reusable components)
 │   ├── redux/ (Redux store & slices)
 │   ├── public/ (Static assets)
 │   ├── package.json
 │   └── next.config.mjs
 │
 ├── backend/
 │   ├── models/ (Mongoose models)
 │   ├── index.js (Main server file)
 │   ├── package.json
 │   ├── .env (Environment variables)
```

## Future Enhancements

🚀 Implement user authentication (JWT-based login system).\
🚀 Add password encryption for stored credentials.\
🚀 Improve UI with animations and better accessibility.\
🚀 Implement deployment with Docker & CI/CD pipelines.

✨ **Developed by Captain Jahir** ✨
