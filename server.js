var crypto		= require("crypto");
var fs			= require("fs");
var http		= require("http");
var _			= require("lodash");
var static		= require("node-static");
var WebSocket	= require("faye-websocket");

// Set up static file server
var file = new static.Server("./public/");
http.createServer(function (req, res) {
	req.on("end", function () {
		file.serve(req, res);
	}).resume();
}).listen(8080, "0.0.0.0");

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

// Listen for upgrade requests
http.createServer().on("upgrade", function (req, sock, body) {
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
}).listen(8000, "0.0.0.0");
