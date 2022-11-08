module.exports = {
    apps : [{
        script: 'src/main.js',
        watch: '.',
    }],

    deploy : {
        production : {
            user : 'SSH_USERNAME',
            host : 'SSH_HOSTMACHINE',
            ref  : 'origin/master',
            repo : 'GIT_REPOSITORY',
            path : 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy' : 'npm install && pm2 reload ecosystem.config.cjs --env production',
            'pre-setup': ''
        }
    }
};