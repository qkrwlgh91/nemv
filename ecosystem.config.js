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
    pr : {
      user : 'root',
      host : '52.15.107.112',
      key : '~/nemv.pem',
      ref  : 'origin/master',
      repo : 'git@github.com:qkrwlgh91/nemv.git',
      path : '/var/www/nemv',
      'post-deploy' : 'yarn pm2'
    }
  }
};
