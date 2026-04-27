module.exports = {
  apps: [
    {
      name: "rotiserie-backend-v2",
      script: "./dist/server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 5002,
        HOST: "0.0.0.0",
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      max_memory_restart: "500M",
      restart_delay: 3000,
      max_restarts: 5,
      min_uptime: "10s",
      kill_timeout: 5000,
      listen_timeout: 10000,
    },
  ],
};
