const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const userRoute = require("./routes/userRoute");

const app = express();

const path = require("path");

app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, "/frontend/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
// );

app.use("/ecommerce/products", productRoute);
app.use("/ecommerce/orders", orderRoute);
app.use("/ecommerce/users", userRoute);

mongoose.connect(
  "mongodb+srv://123:123@cluster0.q8gll.mongodb.net/ecommerce?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));
