# Mini Travel Experience Listing Platform

## Project Overview

The Mini Travel Experience Listing Platform is a full-stack web application that enables travelers to discover, share, and manage unique travel experiences from around the world. Users can browse a curated feed of travel listings, create their own experiences with detailed descriptions and images, and connect with other travelers through the platform.

---

## Tech Stack

### Frontend
- **Next.js 16.1.6** with React 19.2.3 - React framework with server-side rendering and optimized performance
- **Bootstrap 5.3.2** - Responsive CSS framework for mobile-first design
- **JavaScript (ES6+)** - Modern JavaScript with async/await

### Backend
- **Node.js** with **Express.js 4.18.2** - Fast and minimal web framework for building REST APIs
- **MongoDB** with **Mongoose 7.6.0** - NoSQL database with object data modeling
- **JWT (jsonwebtoken 9.0.2)** - Secure token-based authentication
- **bcryptjs 2.4.3** - Password hashing and encryption
- **Multer** - Middleware for handling file uploads

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas (cloud-hosted)

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account OR local MongoDB installation

### 1. Clone the Repository
```bash
git clone https://github.com/rasandu17/Mini-Travel-Experience-Listing-Platform.git
cd Mini-Travel-Experience-Listing-Platform
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:
```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/travel-platform
JWT_SECRET=your-secret-key-at-least-32-characters
NODE_ENV=development
```

Start the backend server:
```bash
npm start
```
Backend runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

---

## Features Implemented

✅ **User Authentication**
- User registration with secure password hashing (bcrypt)
- Login with JWT token-based authentication
- Protected routes requiring authentication
- Token stored in localStorage for persistent sessions

✅ **Travel Listing Management**
- Create new travel experience listings with title, location, image URL, description, and price
- View all listings in a responsive grid feed
- View detailed information for individual listings
- Edit existing listings (only by the creator)
- Delete listings (only by the creator)

✅ **Responsive UI/UX**
- Modern, clean design built with Bootstrap 5
- Mobile-first responsive layout
- Split-screen login page with form authentication
- Responsive navigation bar
- Listing cards with hover effects

✅ **Security**
- JWT token authentication
- Password hashing with bcrypt
- Protected API endpoints with authentication middleware
- CORS configuration for secure cross-origin requests

---

## Architecture & Key Decisions

### Why I Chose This Technology Stack

**Next.js** was selected for the frontend because it provides excellent developer experience with built-in optimizations like automatic code splitting, server-side rendering, and seamless deployment to Vercel. The Pages Router offers a simple file-based routing system that's perfect for this application.

**Node.js with Express** powers the backend because JavaScript across the full stack enables code reusability and reduces context switching. Express is lightweight yet powerful for building RESTful APIs, with a vast ecosystem of middleware packages.

**MongoDB** was chosen for its flexible schema design, which allows easy iteration during development. The document-based structure (JSON-like) aligns naturally with JavaScript objects, and MongoDB Atlas provides excellent cloud hosting with a free tier.

**Bootstrap 5** provides production-ready, responsive components out of the box with extensive documentation and no build-time compilation requirements.

### How Authentication Works

The application uses **JWT (JSON Web Token) based authentication**:

1. **Registration:** User submits credentials (name, email, password) → Backend hashes the password using bcrypt → User document created in MongoDB → JWT token generated and returned to client

2. **Login:** User submits email and password → Backend verifies password with bcrypt.compare() → If valid, JWT token is generated with user ID as payload → Token sent to client and stored in localStorage

3. **Protected Routes:** Client includes JWT token in the Authorization header for protected API requests → Backend middleware verifies the token using the JWT secret → Token is decoded to extract user ID → Request proceeds if valid

4. **Token Storage:** Tokens persist in the browser's localStorage and are automatically included in API requests, maintaining user sessions across page refreshes.

### How Travel Listings Are Stored

Travel listings are stored in MongoDB using the following schema:

```javascript
Listing: {
  title: String (required),
  location: String (required),
  imageUrl: String (required),
  description: String (required),
  price: Number (required),
  createdBy: ObjectId (reference to User, required),
  createdAt: Date (auto-generated)
}
```

Each listing is linked to its creator through the `createdBy` field, which stores the user's ObjectId. This creates a relationship between Users and Listings, enabling features like "edit/delete only your own listings."

### One Improvement with More Time

If I had more time, I would implement **cloud-based image storage using AWS S3 or Cloudinary** instead of requiring users to provide image URLs. 

This would include:
- Direct file upload with drag-and-drop interface
- Automatic image optimization (compression, resizing, WebP conversion)
- Multiple image support per listing (image gallery)
- Image preview before submission

This improvement would significantly enhance user experience by lowering the barrier to entry and ensuring consistent image quality across the platform.

---

## Product Thinking: Scaling to 10,000+ Listings

**Question:** If this platform had 10,000 travel listings, what changes would you make to improve performance and user experience?

**Answer:**

With 10,000+ listings, several architectural changes would be critical:

**Pagination & Infinite Scroll:** Currently, the feed loads all listings at once. I would implement cursor-based pagination on the backend (limit 20 listings per request with a "lastId" cursor) combined with infinite scroll on the frontend. This reduces initial load time dramatically—from loading 10,000 records to just 20—while providing a seamless browsing experience.

**Search & Filtering:** Implement full-text search using MongoDB Atlas Search or Elasticsearch to allow users to quickly find specific destinations, price ranges, or keywords. Add filters for location (with autocomplete), price ranges, and tags (adventure, luxury, budget), which dramatically improves discoverability.

**Database Indexing:** Create compound indexes on frequently queried fields like `location`, `price`, and `createdAt`. For example, an index on `{location: 1, price: 1}` would optimize location-based searches with price filtering. Text indexes would accelerate full-text searches on title and description fields.

**Redis Caching:** Implement Redis to cache popular listings, trending destinations, and frequently accessed data with appropriate TTL (Time To Live) policies. Cache the top 100 most-viewed listings with 1-hour TTL and use cache invalidation when listings are updated. This could reduce database queries by 60-80% for common reads.

**CDN & Image Optimization:** Move all images to a CDN (CloudFront/Cloudflare) with automatic WebP conversion and on-demand resizing. Implement lazy loading for images below the fold with blur-up placeholders, reducing bandwidth costs and improving perceived performance.

**API Optimization:** Add rate limiting (e.g., 100 requests per minute per user) to prevent abuse, use HTTP caching headers (ETag, Cache-Control), and implement skeleton screens while data loads. Consider database denormalization by storing frequently accessed user data directly in listing documents to avoid population queries at scale.

The key is progressive enhancement: implement pagination first (highest ROI), then add caching and indexing, followed by search and CDN optimization.

