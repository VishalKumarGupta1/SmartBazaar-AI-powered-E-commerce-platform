# 🛒 YoursMart – Full-Stack E-Commerce Platform (MERN)

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![License](https://img.shields.io/badge/License-MIT-success)

📌 Designed and developed a full-stack MERN e-commerce application with JWT authentication, OTP-based email verification, and secure password reset functionality.

📌 Implemented product search, filtering, sorting, cart, checkout flow, and PayPal payment gateway, along with Redux Toolkit for state management.

📌 Built an admin dashboard with CRUD operations for users, products, orders, inventory, and integrated Cloudinary & Multer for image uploads; deployed on Render.


---

## 🌐 Live Demo

🔗 **Website:** https://yoursmart.onrender.com/  
📂 **GitHub Repo:** https://github.com/VishalKumarGupta1/YoursMart_E-commerce-platform

---

## 📸 Screenshots

> 📌 Upload screenshots inside a `/screenshots` folder and update paths below.

### 🏠 Home Page
![Home Page](screenshots/home.png)

### 🛍️ Product Listing
![Products](screenshots/products.png)

### 🛒 Cart & Checkout
![Cart](screenshots/cart.png)

### 💳 PayPal Payment
![Payment](screenshots/payment.png)

### 👤 User Profile & Orders
![Profile](screenshots/profile.png)

### 🧑‍💼 Admin Dashboard
![Admin Dashboard](screenshots/admin.png)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Material UI (MUI)
- Redux Toolkit (state management)
- React Router DOM
- React Toastify (notifications)
- Responsive Design

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt.js
- Multer
- Cloudinary
- Cron Jobs

### Payment Gateway
- PayPal

---

## 🔐 Authentication & Security

- JWT & **cookie-based authentication**
- **Email OTP verification** during signup (expires in 15 minutes)
- Forgot password with **email reset link**
- Password hashing using **bcrypt**
- Protected routes with middleware
- Auto-deletion of unverified users using **cron jobs**

---

## 🛒 User Features

- User registration & login
- Email OTP verification
- Product search by name
- Filter by **category** & **brand**
- Sort by **price** and **name**
- Add to cart & checkout flow
- Pay securely via **PayPal**
- Save **multiple delivery addresses**
- View complete order history
- Track real-time order status
- Product ratings & reviews
- Submit star-based ratings & experience
- Low-stock alerts (when stock < 10)
- Toast notifications
- Fully responsive UI

---

## 🧑‍💼 Admin Features

- Secure admin dashboard
- CRUD operations for:
  - Products
  - Users
  - Orders
  - Inventory stock
- Update order status
- Assign admin roles
- Image upload using **Multer + Cloudinary**
- Role-based access control

---

## 🧱 Backend Architecture

- Modular & scalable codebase
- RESTful APIs
- Middleware-based authentication
- Centralized error handling
- Secure JWT token management
- Cloud-based image storage
- Automated cleanup via cron jobs

---

## ☁️ Deployment

- Deployed on **Render**
- Cloudinary for image storage
- Environment variables for security

---

## ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/VishalKumarGupta1/YoursMart_E-commerce-platform

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

Environment Variables

Create a .env file in backend folder:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

## 🚀 Future Enhancements

- Wishlist feature  
- Coupon and discount system  
- Email notifications for order updates  
- Razorpay / Stripe payment integration  
- Sales analytics dashboard  

---

## 👨‍💻 Author

**Vishal Kumar Gupta**  
GitHub: [VishalKumarGupta1](https://github.com/VishalKumarGupta1)

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub — it really helps!
