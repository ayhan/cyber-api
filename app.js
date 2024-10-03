const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const vulnerabilityRoutes = require("./routes/vulnerabilityRoutes");

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/", vulnerabilityRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
