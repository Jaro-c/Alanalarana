const os = require("node:os");

const numInstances = os.cpus().length - 1;
const basePort = 3150;

const apps = [];

for (let i = 0; i < numInstances; i++) {
	apps.push({
		namespace: "NextJS",
		name: "Alanalarana.com",
		script: `taskset -c ${i} node --run start`,
		autorestart: true,
		watch: false,
		max_memory_restart: "150M",
		cron_restart: "0 1 * * *",
		env: {
			NODE_ENV: "production",
			PORT: basePort + i,
		},
		out_file: `~/.pm2/logs/Alanalarana.com-${i}-out.log`,
		error_file: `~/.pm2/logs/Alanalarana.com-${i}-error.log`,
	});
}

module.exports = { apps };
