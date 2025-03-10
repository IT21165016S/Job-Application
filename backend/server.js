const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

const cvRoutes = require("./routes/cvRoutes");

require("dotenv").config();



const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//app.use("/uploads", express.static("uploads"));

//app.use("/api/upload", require("./routes/upload"));
//app.use("/api/applications", require("./routes/applications"));
//app.use("/api/auth", require("./routes/auth"));

app.use("/api/cv", cvRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
