/**
 * Methods for handling status related DB operations
 */

const db = require('../config/db')
const { MessageCodes } = require('../utils/constants')
const { Exception } = require('../payload/exception')

exports.findAll = () => {
   const query = `SELECT [user_status_id] as id
                        ,[name]
                     FROM [wms].[wmsuser].[user_status]`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get role information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}