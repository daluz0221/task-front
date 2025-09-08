module.exports = {
  apps: [
    {
      name: "frontend",                        // Nombre del proceso en PM2
      script: "node_modules/next/dist/bin/next",
      args: ["start", "-p", "3000"],                   // Puerto donde corre Next.js
      cwd: "/var/www/frontend",                // Ruta de tu proyecto
      env: {
        NODE_ENV: "production",                // Entorno
      },
    },
  ],
};