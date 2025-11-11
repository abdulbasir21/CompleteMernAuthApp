import express from "express";
import cors from "cors";
import 'dotenv/config';
import mongodb from "./config/mongodb.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

mongodb();

const allowedOrigins = [
  'https://complete-mern-auth-app.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running....");
});

// API endpoints
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
