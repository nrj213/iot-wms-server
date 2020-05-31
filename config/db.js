/**
 * Database configuration and connection
 */

const sql = require('mssql')

const config = {
    user: 'wmsuser',
    password: 'wmsuser',
    server: 'localhost',
    database: 'wms',
    options: {
        encrypt: false,
        enableArithAbort: true
    }
}

exports.executeQuery = function (query) {
//    console.log(query)

    return sql.connect(config).then(pool => {
        return pool.request().query(query);
    })
}