const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./database/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);//eventroutes

app.get("/", (req, res) => {
    res.send("Campus Event Management System Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

console.log("PORT =", PORT);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});