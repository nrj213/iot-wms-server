/**
 * Methods for handling municipality related DB operations
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
         .catch(error => reject(new Exception('Failed to get municipality ID corresponding to area code from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.create = (name) => {
   const query = `INSERT INTO [wmsuser].[municipality]
                              ([name])
                           VALUES
                              ('${name}')`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result['rowsAffected'][0]))
         .catch(error => reject(new Exception('Failed to add municipality information to DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.update = (id, name) => {
   const query = `UPDATE [wmsuser].[municipality]
                     SET [name] = '${name}'
                  WHERE municipality_id = ${id}`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result['rowsAffected'][0]))
         .catch(error => reject(new Exception('Failed to edit municipality information in DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.delete = (id) => {
   const query = `DELETE FROM [wmsuser].[municipality]
                  WHERE municipality_id = ${id}`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result['rowsAffected'][0]))
         .catch(error => reject(new Exception('Failed to delete municipality information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

