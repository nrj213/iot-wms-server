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

exports.create = (name, municipality_id) => {
   const query = `INSERT INTO [wmsuser].[area]
                              ([name]
                              ,[municipality_id])
                           VALUES
                              ('${name}'
                              ,${municipality_id})`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result['rowsAffected'][0]))
         .catch(error => reject(new Exception('Failed to add area information to DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.update = (id, name) => {
   const query = `UPDATE [wmsuser].[area]
                     SET [name] = '${name}'
                  WHERE area_id = ${id}`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result['rowsAffected'][0]))
         .catch(error => reject(new Exception('Failed to edit area information in DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.delete = (id) => {
   const query = `DELETE FROM [wmsuser].[area]
                  WHERE area_id = ${id}`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result['rowsAffected'][0]))
         .catch(error => reject(new Exception('Failed to delete area information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}


