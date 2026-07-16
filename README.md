# Apna Store – AI Powered Modern E-Commerce Platform

**🌐 Live Demo:** https://assignment-74-1.netlify.app/

---

# Overview

Apna Store is a modern AI-powered E-Commerce web application designed to provide a seamless shopping experience across desktop, tablet, and mobile devices.

The platform allows users to browse products, search items, manage their shopping cart, securely place orders, manage delivery addresses, complete online payments, and track orders in real time.

The application also includes **APNA AI**, an intelligent shopping assistant capable of understanding natural language, helping users with orders, deliveries, refunds, payments, profile information, saved addresses, and general shopping queries through an interactive conversational interface.

This project demonstrates practical implementation of frontend development, backend architecture, authentication, payment integration, AI-powered customer support, database management, and modern ecommerce application development.

---

# Features

## 🛍 Shopping Features

- Dynamic product listing
- Category-wise product browsing
- Smart product search
- Product filtering & sorting
- Detailed product information page
- Similar product recommendations
- Add to Cart
- Update Cart Quantity
- Remove from Cart
- Responsive shopping experience
- Infinite scrolling products
- Secure Login & Signup
- Token-based Authentication
- Razorpay Payment Integration
- Delivery Address Management
- Dynamic Order Confirmation
- Order Tracking
- REST API Integration

---

## 🤖 APNA AI Shopping Assistant

The platform includes **APNA AI**, an intelligent shopping assistant built using Google Gemini and FastAPI.

### AI Features

- 💬 Natural language conversations
- 📦 View order details
- 🚚 Track orders
- 👤 View profile information
- 📍 View saved delivery addresses
- 💳 Payment assistance
- 💰 Refund guidance
- 🔄 Return & Replacement support
- 🎟 Coupon & discount assistance
- 📚 Shopping FAQ knowledge base
- 🧠 Context-aware conversations
- 📋 Guided menu-based customer support
- 🔐 Secure access to authenticated customer data
- ⚡ Fast AI responses using custom tool-calling architecture

---

# Tech Stack

## Frontend

- React.js
- Tailwind CSS
- Framer Motion
- React Router DOM
- Axios

## Backend

- FastAPI
- Python
- SQLAlchemy
- Alembic

## AI

- Google Gemini API
- Custom Tool Calling Framework
- Structured FAQ Knowledge Base
- Context-aware AI Assistant

## Database

- MySQL

## Authentication

- JWT Token Authentication

## Payment

- Razorpay

## Deployment

- Frontend → Netlify
- Backend → Render
- Database → Railway MySQL

---

# Project Objective

The objective of this project is to build a scalable AI-powered E-Commerce platform focusing on:

- Clean and modern UI/UX
- Secure authentication
- Online payment integration
- Efficient cart management
- Real-time order tracking
- AI-powered customer support
- Context-aware shopping assistance
- Scalable backend architecture
- Responsive web design

---

# AI Assistant Architecture

```
                   User
                     │
                     ▼
          React Frontend (Chat UI)
                     │
                     ▼
             FastAPI Backend
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   Gemini AI     Tool Calling   MySQL
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
 Profile Tool   Order Tool   FAQ Tool
      ▼              ▼              ▼
 Address Tool  Tracking Tool Payment Tool
```

---

# Project Structure

```bash
Apna_Store/

├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   └── App.jsx
│
├── backend/
│   ├── app/
│   ├── alembic/
│   ├── requirements.txt
│   ├── main.py
│   └── .env
│
└── README.md
```

---

# Authentication

The application uses **JWT Token Authentication** to securely authenticate users.

Protected APIs require authenticated access, ensuring users can only access their own:

- Profile
- Orders
- Delivery Addresses
- Order Tracking Information

---

# Payment Integration

The platform integrates **Razorpay Payment Gateway** for secure online transactions.

Features include:

- Secure payments
- Online order confirmation
- Dynamic order generation
- Payment verification
- Order tracking

---

# AI Shopping Assistant

APNA AI provides intelligent shopping support for authenticated users.

### Supported Queries

- Show my orders
- Track my latest order
- Show my addresses
- View my profile
- Payment issues
- Refund status
- Return policy
- Replace product
- Shipping information
- Coupon information
- Login help
- Account assistance
- Shopping guidance

The assistant securely retrieves user information using authenticated backend tools instead of generating assumptions.

---

# Installation & Setup

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd Apna_Store
```

Install frontend dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

# Future Enhancements

- ❤️ Wishlist
- ⭐ Product Reviews & Ratings
- 🧑‍💼 Admin Dashboard
- 📊 Sales Analytics
- 🎟 Loyalty Rewards
- 📦 Live Shipment Tracking
- 🌍 Multi-language AI Assistant
- 🎤 Voice-enabled Shopping
- 🖼 Image Search
- 🧠 Personalized AI Product Recommendations
- 📱 Push Notifications
- 🤝 Live Chat with Customer Support

---

# Contribution

Contributions are welcome.

1. Fork the repository
2. Clone your fork
3. Create a feature branch

```bash
git checkout -b feature/new-feature
```

4. Commit changes

```bash
git commit -m "Added new feature"
```

5. Push

```bash
git push origin feature/new-feature
```

6. Open a Pull Request

---

# Author

## Saurav Raj

**Software Developer**

Passionate about building scalable web applications, AI-powered systems, and solving real-world problems using modern technologies.

---

# License

This project is developed for educational and demonstration purposes.

Commercial use of this project requires prior authorization from the author.