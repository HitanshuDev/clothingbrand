# 👕 Clothing Items Manager (Internship Assignment)

This is a full-stack MERN (MongoDB, Express, React, Node.js) application built as an internship assignment. The app allows users to:

- Add new clothing/sports gear items
- Upload and display item images via Cloudinary
- View item details in a modal with an image carousel
- Send email enquiries for listed items

---

## 🚀 Live Links

- **Frontend** (Vercel): https://vercel.com/hitanshudevs-projects/clothingbrand-so97/FWikHtUc7G1h8eznkxHXHY9S21wV
- **Backend** (Render): https://clothingbrand-kmc0.onrender.com/

---

## 🧩 Features

### 📝 Add Items
- Fill out item details: name, type, description
- Upload multiple images (1 cover + additional)
- Images are uploaded to Cloudinary
- Items are stored in MongoDB

### 📦 View Items
- All items are shown with their cover images
- Clicking on any item opens a **modal** with:
  - All item images in a **carousel**
  - Item name, type, description
  - A button to **send an enquiry email**

### 📧 Enquire Button
- Sends an email to a **static admin email** using Nodemailer
- Uses Gmail App Password for secure authentication

---

## 🛠 Tech Stack

| Technology       | Purpose                             |
|------------------|-------------------------------------|
| React + Tailwind | Frontend UI                         |
| Axios            | HTTP requests                       |
| Node.js + Express| Backend server                      |
| MongoDB + Mongoose | Database                         |
| Multer + Cloudinary | Image upload & hosting         |
| Nodemailer       | Sending enquiry emails              |

---

🧪 Local Development
Run Backend
    cd backend
    npm install
    node index.js

Run Frontend
    cd frontend
    npm install
    npm start

