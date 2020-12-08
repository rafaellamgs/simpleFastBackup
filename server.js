const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const employeeRoutes = require("./src/routes/client.routes");

app.use("/api/v1/simple-fast-backup", employeeRoutes);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
