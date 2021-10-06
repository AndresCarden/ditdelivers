const promise = require('bluebird');
const options = {

    promiseLib: promise, 
    query:(e)=>{}
}
const pgp = require ('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue){
    return stringValue;
});
const databaseConfig = {
       'host':'ec2-3-209-65-193.compute-1.amazonaws.com',
        'port':5432,
        'database':'dag92oqc9qakug',
        'user':'amfbynsjlhhdqd',
        'password':'cb5c2ab934110d9d6544db572e9823bc7db506faac3801777bee3b8875c25a57'
};
const db = pgp(databaseConfig);
module.exports = db;
