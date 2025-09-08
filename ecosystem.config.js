module.exports = {
  apps: [
    {
      name: "frontend",                        // Nombre del proceso en PM2
      script: "node_modules/next/dist/bin/next",
      args: "start",                   // Puerto donde corre Next.js
      cwd: "./",                // Ruta de tu proyecto
      env: {
        NODE_ENV: "production",
        PORT: 3001                
      },
    },
  ],
};