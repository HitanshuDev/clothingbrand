import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://clothingbrand-so97.vercel.app",
  "https://clothingbrand-so97.vercel.app/", // safe to include both with and without trailing slash
  "https://clothingbrand-so97-*.vercel.app" // preview deployments (optional wildcard)
];

const corsOptions = {
  origin: function (origin, callback) {
    const allowed = allowedOrigins.find(o => origin?.startsWith(o));
    if (!origin || allowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions)); // Enable CORS

app.use(express.json());

const itemSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  coverImage: { type: String, default: "" },
  additionalImages: { type: [String], default: [] },
}, { timestamps: true }); // 👈 Add this


const Item = mongoose.model("Item", itemSchema);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Routes
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  try {
    console.log("Received item:", req.body); // 👈 print body
    await new Item(req.body).save();
    res.status(201).json({ message: "Item successfully added" });
  } catch (error) {
    console.error("❌ Error while saving item:", error); // 👈 print error
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

// Optional root route
app.get("/", (req, res) => {
  res.send("<h1>This is backend</h1>");
});

// app.options("*", cors());


const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Backend running on port ${PORT}`)
);
