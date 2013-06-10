var fs  = require('fs');
var env = JSON.parse(fs.readFileSync('../environment.json', 'utf-8'));

module.exports = {
    dbHost: env['DOTCLOUD_DATA_MONGODB_HOST'],
    dbPort: parseInt(env['DOTCLOUD_DATA_MONGODB_PORT']),
    dbUser: env['DOTCLOUD_DATA_MONGODB_LOGIN'],
    dbPass: env['DOTCLOUD_DATA_MONGODB_PASSWORD']
}