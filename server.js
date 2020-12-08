const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");

dotenv.config();
const app = express();
const secret = process.env.SECRET;

app.use(cors());

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const employeeRoutes = require("./src/routes/client.routes");

app.use("/api/v1/simple-fast-backup", employeeRoutes);

app.listen(port, () => {
	console.clear();
	console.log(`Server is listening on port ${port}`);
});
