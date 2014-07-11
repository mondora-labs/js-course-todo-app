var crypto		= require("crypto");
var fs			= require("fs");
var http		= require("http");
var _			= require("lodash");
var static		= require("node-static");
var WebSocket	= require("faye-websocket");

// Listen for upgrade requests
var httpServer = http.createServer();

// Set up static file server
var file = new static.Server("./public/");
httpServer.on("request", function (req, res) {
	// Set up handler for the add-todo route
	if (req.url === "/add-todo") {
		var data = "";
		req.on("data", function (chunk) {
			data += chunk;
		});
		req.on("end", function () {
			var list = JSON.parse(fs.readFileSync("./public/list.json", "utf8"));
			list.push(data);
			fs.writeFileSync("./public/list.json", JSON.stringify(list), "utf8");
			res.end();
		});
	} else {
		// Serve the static file
		req.on("end", function () {
			file.serve(req, res);
		}).resume();
	}
});

// Set up WebSocket server to reload the browser
var ws = {
	sockets: {},
	broadcast: function (sender, message) {
		_.forEach(this.sockets, function (socket, key) {
			if (key === sender) {
				return;
			}
			socket.send(msg);
		});
	}
};
httpServer.on("upgrade", function (req, sock, body) {
	var key = crypto.randomBytes(16).toString("hex");
	if (WebSocket.isWebSocket(req)) {
		ws.sockets[key] = new WebSocket(req, sock, body);
		ws.sockets[key].on("message", function (event) {
			ws.broadcast(key, event.data);
		});
		ws.sockets[key].on("close", function () {
			delete ws.sockets[key];
		});
	}
});


httpServer.listen(8080, "0.0.0.0");
