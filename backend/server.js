const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(bodyParser.json());

app.use("/", express.static(__dirname));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

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
