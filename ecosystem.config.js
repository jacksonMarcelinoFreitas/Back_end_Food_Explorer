module.exports = {
  apps : [{
    name: "food-explorer-api",
    script: './src/server.js',
    instaces: "max",
    watch: '.',
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NOVE_ENV: "production",
    }
  }]
};
