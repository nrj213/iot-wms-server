/**
 * Methods for handling collection record related DB operations
 */

const db = require('../config/db')
const { MessageCodes } = require('../utils/constants')
const { Exception } = require('../payload/exception')

exports.findAllByBinId = (binId) => {
   const query = `SELECT [staff].[staff_id] as staffId, 
                         [staff].[name] as staffName, 
                         [record].[created] as created 
                     FROM [wms].[wmsuser].[collection_records] record
                     JOIN [wms].[wmsuser].[staff_details] staff
                     ON [record].[staff_id] = [staff].[staff_id] 
                     WHERE [record].[bin_id] = ${binId} 
                     ORDER BY [record].[created] DESC`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get collection record information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

