/**
 * Methods for handling bin related DB operations
 */

const db = require('../config/db')
const { MessageCodes } = require('../utils/constants')
const { Exception } = require('../payload/exception')

exports.findAll = () => {
   const query = `SELECT 
                     binareastaff.[bin_id] as id
                     ,binareastaff.[municipality_id] as [municipalityId]
                     ,mun.[name] as [municipality]
                     ,binareastaff.[area_id] as [areaId]
                     ,binareastaff.[name] as [area]
                     ,binareastaff.[latitude]
                     ,binareastaff.[longitude]
                     ,binareastaff.[staffId]
                     ,binareastaff.[staffName]
                     ,binareastaff.[staffMobileNo]
                     ,binstatus.[waste_level] as [level]
                     ,binstatus.[created] as [lastUpdated]
                     FROM (SELECT 
                              bin.*
                              ,area.[name]
                              ,area.[municipality_id]
                              ,staff.[staff_id] as staffId
                              ,staff.[name] as staffName
                              ,staff.[mobile_no] as staffMobileNo
                              FROM [wms].[wmsuser].bin bin
                              JOIN [wms].[wmsuser].area area 
                              ON bin.area_id = area.area_id
                        JOIN [wms].[wmsuser].staff_details staff
                        ON bin.staff_id = staff.staff_id) binareastaff
                        JOIN [wms].[wmsuser].municipality mun 
                        ON binareastaff.municipality_id = mun.municipality_id
                        JOIN (SELECT status.*
                                 FROM [wms].[wmsuser].[bin_status] status
                                 JOIN 
                                    (SELECT [bin_id]
                                    ,MAX([created]) as [createdlatest]
                                    FROM [wms].[wmsuser].[bin_status] GROUP BY bin_id) statuslatest
                                 ON statuslatest.bin_id = status.bin_id AND statuslatest.createdlatest = status.created) binstatus
                           ON binstatus.bin_id = binareastaff.bin_id
                     ORDER BY binareastaff.bin_id`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get bin information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.findByMunicipality = (municipalityId) => {
   const query = `SELECT 
                     binareastaff.[bin_id] as id
                     ,binareastaff.[municipality_id] as [municipalityId]
                     ,mun.[name] as [municipality]
                     ,binareastaff.[area_id] as [areaId]
                     ,binareastaff.[name] as [area]
                     ,binareastaff.[latitude]
                     ,binareastaff.[longitude]
                     ,binareastaff.[staffId]
                     ,binareastaff.[staffName]
                     ,binareastaff.[staffMobileNo]
                     ,binstatus.[waste_level] as [level]
                     ,binstatus.[created] as [lastUpdated]
                     FROM (SELECT 
                              bin.*
                              ,area.[name]
                              ,area.[municipality_id]
                              ,staff.[staff_id] as staffId
                              ,staff.[name] as staffName
                              ,staff.[mobile_no] as staffMobileNo
                              FROM [wms].[wmsuser].bin bin
                              JOIN [wms].[wmsuser].area area 
                              ON bin.area_id = area.area_id
                        JOIN [wms].[wmsuser].staff_details staff
                        ON bin.staff_id = staff.staff_id) binareastaff
                        JOIN [wms].[wmsuser].municipality mun 
                        ON binareastaff.municipality_id = mun.municipality_id
                        JOIN (SELECT status.*
                                 FROM [wms].[wmsuser].[bin_status] status
                                 JOIN 
                                    (SELECT [bin_id]
                                    ,MAX([created]) as [createdlatest]
                                    FROM [wms].[wmsuser].[bin_status] GROUP BY bin_id) statuslatest
                                 ON statuslatest.bin_id = status.bin_id AND statuslatest.createdlatest = status.created) binstatus
                           ON binstatus.bin_id = binareastaff.bin_id
                     WHERE binareastaff.municipality_id = ${municipalityId}
                     ORDER BY binareastaff.bin_id`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get municipal bin information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.findByMunicipalityAndArea = (municipalityId, areaId) => {
   const query = `SELECT 
                     binareastaff.[bin_id] as id
                     ,binareastaff.[municipality_id] as [municipalityId]
                     ,mun.[name] as [municipality]
                     ,binareastaff.[area_id] as [areaId]
                     ,binareastaff.[name] as [area]
                     ,binareastaff.[latitude]
                     ,binareastaff.[longitude]
                     ,binareastaff.[staffId]
                     ,binareastaff.[staffName]
                     ,binareastaff.[staffMobileNo]
                     ,binstatus.[waste_level] as [level]
                     ,binstatus.[created] as [lastUpdated]
                     FROM (SELECT 
                              bin.*
                              ,area.[name]
                              ,area.[municipality_id]
                              ,staff.[staff_id] as staffId
                              ,staff.[name] as staffName
                              ,staff.[mobile_no] as staffMobileNo
                              FROM [wms].[wmsuser].bin bin
                              JOIN [wms].[wmsuser].area area 
                              ON bin.area_id = area.area_id
                        JOIN [wms].[wmsuser].staff_details staff
                        ON bin.staff_id = staff.staff_id) binareastaff
                        JOIN [wms].[wmsuser].municipality mun 
                        ON binareastaff.municipality_id = mun.municipality_id
                        JOIN (SELECT status.*
                                 FROM [wms].[wmsuser].[bin_status] status
                                 JOIN 
                                    (SELECT [bin_id]
                                    ,MAX([created]) as [createdlatest]
                                    FROM [wms].[wmsuser].[bin_status] GROUP BY bin_id) statuslatest
                                 ON statuslatest.bin_id = status.bin_id AND statuslatest.createdlatest = status.created) binstatus
                           ON binstatus.bin_id = binareastaff.bin_id
                     WHERE binareastaff.municipality_id = ${municipalityId} AND binareastaff.area_id = ${areaId}
                     ORDER BY binareastaff.bin_id`
                     
   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get area bin information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.markCollection = (binId, staffId) => {
   const query = `INSERT INTO [wmsuser].[bin_status]
                              ([bin_id],[waste_level])
                        VALUES
                              (${binId}, 0)`
   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => {
            if(result['rowsAffected'][0] > 0) {
               const query = `INSERT INTO [wmsuser].[collection_records]
                                          ([bin_id], [staff_id])
                                    VALUES
                                          (${binId}, ${staffId})`
                  db.executeQuery(query)
                     .then(result => resolve(result['rowsAffected'][0]))
                     .catch(error => reject(new Exception('Failed to add collection information to DB', MessageCodes.DB_QUERY_FAILED, error)))
            } else {
               reject(new Exception('Failed to add collection information to DB', MessageCodes.DB_QUERY_FAILED))
            }
         })
         .catch(error => reject(new Exception('Failed to add collection information to DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.create = (bin) => {
   const query = `INSERT INTO [wmsuser].[bin]
                                 ([area_id]
                                 ,[latitude]
                                 ,[longitude]
                                 ,[staff_id])
                              OUTPUT inserted.bin_id as binId
                              VALUES
                                 (${bin.areaId}
                                 ,${bin.latitude}
                                 ,${bin.longitude}
                                 ,${bin.staffId})`

   return new Promise((resolve, reject) => {
       db.executeQuery(query)
           .then(result => resolve(result))
           .catch(error => reject(new Exception('Failed to add bin information to DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.addStatus = (binId, level) => {
   const query = `INSERT INTO [wmsuser].[bin_status]
                              ([bin_id]
                              ,[waste_level])
                           VALUES
                              (${binId}
                              ,${level})`

   return new Promise((resolve, reject) => {
       db.executeQuery(query)
           .then(result => resolve(result))
           .catch(error => reject(new Exception('Failed to add bin level status to DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.delete = (binId) => {
   const query = `DELETE FROM [wmsuser].[bin]
                               WHERE bin_id = ${binId}`

   return new Promise((resolve, reject) => {
       db.executeQuery(query)
           .then(result => resolve(result))
           .catch(error => reject(new Exception('Failed to delete bin information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.deleteStatusRecords = (binId) => {
   const query = `DELETE FROM [wmsuser].[bin_status]
                               WHERE bin_id = ${binId}`

   return new Promise((resolve, reject) => {
       db.executeQuery(query)
           .then(result => resolve(result))
           .catch(error => reject(new Exception('Failed to delete bin status information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.deleteCollectionRecords = (binId) => {
   const query = `DELETE FROM [wmsuser].[collection_records]
                               WHERE bin_id = ${binId}`

   return new Promise((resolve, reject) => {
       db.executeQuery(query)
           .then(result => resolve(result))
           .catch(error => reject(new Exception('Failed to delete bin collection information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.update = (bin) => {
   const query = `UPDATE [wmsuser].[bin]
                           SET [area_id] = '${bin.areaId}'
                           ,[latitude] = '${bin.latitude}'
                           ,[longitude] = ${bin.longitude}
                           ,[staff_id] = ${bin.staffId}
                       WHERE bin_id = ${bin.id}`

   return new Promise((resolve, reject) => {
       db.executeQuery(query)
           .then(result => resolve(result))
           .catch(error => reject(new Exception('Failed to update bin information in DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}