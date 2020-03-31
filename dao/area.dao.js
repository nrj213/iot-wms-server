/**
 * Methods for handling bin related DB operations
 */

const db = require('../config/db')
const { MessageCodes } = require('../utils/constants')
const { Exception } = require('../payload/exception')

exports.findAll = () => {
   const query = `SELECT 
                     [area_id] as [id]
                     ,[name]
                  FROM [wms].[wmsuser].[area]
                  ORDER BY [municipality_id]`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get area information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.findByMunicipality = (municipalityId) => {
   const query = `SELECT 
                     [area_id] as [id]
                     ,[name]
                  FROM [wms].[wmsuser].[area] area
                  WHERE area.[municipality_id] = ${municipalityId}
                  ORDER BY [municipality_id]`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get area information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

