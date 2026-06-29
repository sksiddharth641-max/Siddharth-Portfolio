require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

console.log("🚀 server.js started");
console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("🚀 SID VISUALS Backend is Running!");
});

// Connect Database
connectDB();

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});