module.exports = {
	apps: [
		{
			namespace: "NextJS",
			name: "Alanalarana.com",
			script: "node_modules/next/dist/bin/next",
			args: "start",
			exec_mode: "cluster",
			instances: "max",
			autorestart: true,
			watch: false,
			max_memory_restart: "150M",
			cron_restart: "0 1 * * *",
			env: {
				NODE_ENV: "production",
				PORT: 3150,
			},
		},
	],
};
