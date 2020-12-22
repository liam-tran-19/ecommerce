const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

const app = express();

const path = require("path");

app.use(bodyParser.json());

// app.use("/", express.static(__dirname));
// app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "frontend/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  });
}

// ** MIDDLEWARE ** //
const whitelist = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://git.heroku.com/sheltered-beyond-15920.git",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/ecommerce/products", productRoute);
app.use("/ecommerce/orders", orderRoute);
app.use("/ecommerce/users", userRoute);

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/ecommerce-reactjs",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
