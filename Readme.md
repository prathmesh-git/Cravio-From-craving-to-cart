🍽️ Cravio

Cravio – From craving to cart.
An AI-assisted food discovery and delivery platform that combines traditional ordering with short-form video and smart recommendations.

🚀 Vision

Cravio is a modern food delivery platform designed to reduce decision fatigue.
Instead of endlessly scrolling through menus, users can:

Discover food via curated short-form reels

Ask an AI assistant (Khavo) for personalized suggestions

Order seamlessly through a familiar delivery interface

Cravio blends:

🍔 Traditional food delivery UX

🎥 Reels-based discovery

🤖 AI-powered craving suggestions

📊 Seller analytics dashboard

🧠 Core Concept

Cravio is not just a delivery app.
It is a decision engine for food.

Users can:

Browse restaurants normally

Watch food reels for inspiration

Chat with Khavo AI for personalized recommendations

Add items to cart and proceed to checkout (payment integration intentionally excluded in MVP)

Sellers can:

Manage menus

Upload reels

View analytics on engagement and conversions

🏗️ Tech Stack (Planned)
Frontend

React.js

Bootstrap 5

React Context API

React-Leaflet (OpenStreetMap integration)

Recharts / Chart.js (analytics)

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Cloudinary (media storage)

Maps

OpenStreetMap

Leaflet

Nominatim (address search)

🧩 Architecture Overview
Client (React)
      ↓
REST API (Node + Express)
      ↓
MongoDB Database
      ↓
External Services:
   - Cloudinary (Media)
   - OpenStreetMap (Maps)

📦 Planned Features (MVP)
👤 Customer

User authentication

Browse restaurants

Add to cart

Address selection via map

Checkout (up to payment initiation)

Reels discovery page

Khavo AI suggestions

🧑‍🍳 Seller

Manage restaurant

Add/edit dishes

Upload reels

View analytics dashboard

🎥 Reels

Short-form food videos

Track views & engagement

Conversion tracking (Reel → Order)

📊 Analytics Engine

Cravio tracks:

Reel views

Reel clicks

Orders created

Order source (Reel / Search / Khavo)

Data is aggregated to provide insights for sellers.

🗺️ Location Support

Users can:

Search address

Select location using map pin

Save multiple addresses

Place orders with geolocation data

🔐 Order Lifecycle (MVP Scope)

Order flow includes:

Cart validation

Order creation

Status set to PAYMENT_PENDING

⚠️ Payment gateway integration is intentionally excluded from MVP.

📁 Project Structure (Planned)
cravio/
│
├── client/          # React frontend
├── server/          # Express backend
├── docs/            # Architecture & design notes
└── README.md

🛠️ Status

🟡 Initial repository setup
🟡 Architecture & database design finalized
🔜 Frontend and backend scaffolding

🎯 Future Enhancements

AI-powered recommendation engine

Real-time order updates

Creator monetization model

Advanced seller analytics

Performance optimization for video feed

👨‍💻 Author

Built as a self-initiated full-stack project to explore:

System design

Product architecture

AI integration

Scalable backend development

💬 Tagline

Cravio – Decide what to eat. Faster.