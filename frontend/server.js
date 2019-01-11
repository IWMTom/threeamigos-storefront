const next = require("next");
const routes = require("./routes");
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = routes.getRequestHandler(app);

const { createServer } = require("http");

const args = process.argv
	.slice(2)
	.map(arg => arg.split("="))
	.reduce((args, [value, key]) => {
		args[value] = key;
		return args;
	}, {});

app.prepare().then(() => {
	createServer(handler).listen(args.port);
});
