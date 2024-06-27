const localtunnel = require("localtunnel");

const createTunnel = async (port) => {
	const tunnel = await localtunnel({ port });

	console.log(
		`\nThis chat is publicly accessible through the following URL:\nGlobally: ${tunnel.url} \nLocally: http://localhost:${port}/`
	);

	process.on("exit", () => {
		tunnel.close();
	});

    // handle ctr+c terminations
	process.on("SIGINT", () => {
		tunnel.close();
		process.exit();
	});

    // handle graceful terminations
	process.on("SIGTERM", () => {
		tunnel.close();
		process.exit();
	});
};

module.exports = createTunnel
