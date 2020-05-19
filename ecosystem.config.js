module.exports = {
  apps : [{
    name: "nemv",
    script: "./be/bin/www",
    env: {
      NODE_ENV: "development",
      PORT: 3000
    },
    env_pr: {
      NODE_ENV: "production",
      PORT: 80
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
