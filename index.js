const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const vulnerabilityRoutes = require("./routes/vulnerabilityRoutes");

var corsOptions = {
  origin: ["http://localhost:3000", "https://cyber-web-two.vercel.app"],
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/", vulnerabilityRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
