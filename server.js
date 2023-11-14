const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("views", __dirname + "\\product-comparator\\src\\pages\\");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(bodyParser.json());
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,};
app.use(cors(corsOptions));
app.use(express.static("product-comparator"));
app.use("/result", require("./routes/result"));
app.use("/home", require("./routes/home"));
const PORT = 5000;
app.use(cors());
app.listen(PORT, console.log("Success"));
