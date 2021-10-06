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
       'host':'ec2-44-197-94-126.compute-1.amazonaws.com',
        'port':5432,
        'database':'d6mouefp90j7v8',
        'user':'qivtkqbpmhfuqc',
        'password':'38ae3d33329e6f7cd1bfd4a0f1da2e8438d6de7d54431377ff81284e5d145099'
};
const db = pgp(databaseConfig);
module.exports = db;
