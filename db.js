const mysql = require('mysql')


const pool = mysql.createConnection({
    host: 'nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: 'ZoutTemBLIA0HPXUKGXP',
    database: 'conqtvms_dev'
 });

module.exports = pool;