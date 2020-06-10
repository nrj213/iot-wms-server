/**
 * Methods for handling bin related DB operations
 */

const db = require('../config/db')
const { MessageCodes } = require('../utils/constants')
const { Exception } = require('../payload/exception')

exports.findAll = () => {
   const query = `SELECT 
                     [municipality_id] as [id]
                     ,[name]
                  FROM [wms].[wmsuser].[municipality]
                  ORDER BY [municipality_id]`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get municipality information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.findMunicipalityIdIdByAreaId = (areaId) => {
   const query = `SELECT 
                     [municipality_id] as municipalityId
                  FROM [wms].[wmsuser].[area]
                  WHERE [area_id] = ${areaId}`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get municipality ID corresponding to area code from DB', MessageCodes.DB_QUERY_FAILED)))
   })
}

