const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const employeeRoutes = require("./src/routes/client.routes");

app.use("/api/v1/simple-fast-backup", employeeRoutes);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: "projetoIntegrador",
		cookie: { maxAge: 60000 },
		resave: false,
		saveUninitialized: false,
	})
);

app.listen(port, () => {
	console.clear();
	console.log(`Server is listening on port ${port}`);
});
