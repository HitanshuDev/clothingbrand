// backend/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import upload from "./upload.js";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend.vercel.app",  // Replace with your deployed frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

// Mongoose schema
const itemSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  coverImage: String,
  additionalImages: [String],
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Routes
app.get("/items", async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

app.post("/items", async (req, res) => {
  try {
    await new Item(req.body).save();
    res.status(201).json({ message: "Item successfully added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/enquire", async (req, res) => {
  const { name, type, description } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: "hitanshuthegreat212003@gmail.com", 
    subject: `Enquiry about: ${name}`,
    text: `Type: ${type}\nDescription: ${description}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post("/upload", upload.array("images", 5), (req, res) => {
  try {
    console.log("FILES RECEIVED:", req.files);  // ← log incoming files
    const imageUrls = req.files.map((file) => file.path);
    res.json({ imageUrls });
  } catch (error) {
    console.error("Upload error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req,res) => {
      res.send('<h1>This is backend</h1>');
})

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
