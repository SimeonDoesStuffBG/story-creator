const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
  optionsSuccessStatus: 200,
};
const MAX_REQUEST_SIZE = "25mb";
const PORT = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(express.json({ limit: MAX_REQUEST_SIZE }));
app.use(express.urlencoded({ extended: false, limit: MAX_REQUEST_SIZE }));
app.use(cors(corsOptions));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/characters", require("./routes/characterRoutes"));
app.use("/api/stories", require("./routes/storyRoutes"));
app.use("/api/plotpoints", require("./routes/plotpointRoutes"));
app.use("/api/relations", require("./routes/relationRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
