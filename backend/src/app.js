const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const dishRoutes = require("./routes/dishRoutes");
const { protect } = require("./middleware/authMiddleware");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/dishes", dishRoutes);

app.get("/", (req, res) => {
    res.send("Cravio API running");
})


app.get("/api/test-protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user
  });
});


module.exports = app;