const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const bodyParser = require("body-parser");
const db = require("./db");

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
	const { token } = req.cookies;

	if (token) {
		const { userId } = jwt.verify(token, process.env.APP_SECRET);
		req.userId = userId;
	}

	next();
});

server.express.use(bodyParser.json());
server.express.use(bodyParser.urlencoded({ extended: true }));
server.express.use(bodyParser.raw());

server.express.post("/api/products/update", (req, res) => {
	console.log(req.body);
	res.send("Thanks!");
});

server.express.post("/api/brands/update", (req, res) => {
	console.log(req.body);
	res.send("Thanks!");
});

server.express.post("/api/categories/update", (req, res) => {
	console.log(req.body);
	res.send("Thanks!");
});

server.start(
	{
		cors: {
			credentials: true,
			origin: true
		}
	},
	details => {
		console.log(
			`Server is now running on port http://localhost:${details.port}`
		);
	}
);
