/**
 * Methods for handling bin related DB operations
 */

const db = require('../config/db')
const { MessageCodes } = require('../utils/constants')
const { Exception } = require('../payload/exception')

exports.findAll = () => {
   const query = `SELECT 
                      binarea.[bin_id] as id
                     ,binarea.[municipality_id] as [municipalityId]
                     ,mun.[name] as [municipality]
                     ,binarea.[area_id] as [areaId]
                     ,binarea.[name] as [area]
                     ,binarea.[latitude]
                     ,binarea.[longitude]
                     ,binarea.[staff_name] as [staffName]
                     ,binarea.[staff_mobile_no] as [staffMobileNo]
                     ,binstatus.[waste_level] as [level]
                     ,binstatus.[created] as [lastUpdated]
                     FROM (SELECT 
                              bin.*
                              ,area.[name]
                              ,area.[municipality_id]
                              FROM [wms].[wmsuser].bin bin
                              JOIN [wms].[wmsuser].area area 
                              ON bin.area_id = area.area_id) binarea
                        JOIN [wms].[wmsuser].municipality mun 
                        ON binarea.municipality_id = mun.municipality_id
                        JOIN (SELECT status.*
                                 FROM [wms].[wmsuser].[bin_status] status
                                 JOIN 
                                    (SELECT [bin_id]
                                    ,MAX([created]) as [createdlatest]
                                    FROM [wms].[wmsuser].[bin_status] GROUP BY bin_id) statuslatest
                                 ON statuslatest.bin_id = status.bin_id AND statuslatest.createdlatest = status.created) binstatus
                           ON binstatus.bin_id = binarea.bin_id
                     ORDER BY binarea.bin_id`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get bin information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.findByMunicipality = (municipalityId) => {
   const query = `SELECT 
                      binarea.[bin_id] as id
                     ,binarea.[municipality_id] as [municipalityId]
                     ,mun.[name] as [municipality]
                     ,binarea.[area_id] as [areaId]
                     ,binarea.[name] as [area]
                     ,binarea.[latitude]
                     ,binarea.[longitude]
                     ,binarea.[staff_name] as [staffName]
                     ,binarea.[staff_mobile_no] as [staffMobileNo]
                     ,binstatus.[waste_level] as [level]
                     ,binstatus.[created] as [lastUpdated]
                     FROM (SELECT 
                              bin.*
                              ,area.[name]
                              ,area.[municipality_id]
                              FROM [wms].[wmsuser].bin bin
                              JOIN [wms].[wmsuser].area area 
                              ON bin.area_id = area.area_id) binarea
                        JOIN [wms].[wmsuser].municipality mun 
                        ON binarea.municipality_id = mun.municipality_id
                        JOIN (SELECT status.*
                                 FROM [wms].[wmsuser].[bin_status] status
                                 JOIN 
                                    (SELECT [bin_id]
                                    ,MAX([created]) as [createdlatest]
                                    FROM [wms].[wmsuser].[bin_status] GROUP BY bin_id) statuslatest
                                 ON statuslatest.bin_id = status.bin_id AND statuslatest.createdlatest = status.created) binstatus
                           ON binstatus.bin_id = binarea.bin_id
                     WHERE binarea.municipality_id = ${municipalityId}
                     ORDER BY binarea.bin_id`

   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get municipal bin information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

exports.findByMunicipalityAndArea = (municipalityId, areaId) => {
   const query = `SELECT 
                      binarea.[bin_id] as id
                     ,binarea.[municipality_id] as [municipalityId]
                     ,mun.[name] as [municipality]
                     ,binarea.[area_id] as [areaId]
                     ,binarea.[name] as [area]
                     ,binarea.[latitude]
                     ,binarea.[longitude]
                     ,binarea.[staff_name] as [staffName]
                     ,binarea.[staff_mobile_no] as [staffMobileNo]
                     ,binstatus.[waste_level] as [level]
                     ,binstatus.[created] as [lastUpdated]
                     FROM (SELECT 
                              bin.*
                              ,area.[name]
                              ,area.[municipality_id]
                              FROM [wms].[wmsuser].bin bin
                              JOIN [wms].[wmsuser].area area 
                              ON bin.area_id = area.area_id) binarea
                        JOIN [wms].[wmsuser].municipality mun 
                        ON binarea.municipality_id = mun.municipality_id
                        JOIN (SELECT status.*
                                 FROM [wms].[wmsuser].[bin_status] status
                                 JOIN 
                                    (SELECT [bin_id]
                                    ,MAX([created]) as [createdlatest]
                                    FROM [wms].[wmsuser].[bin_status] GROUP BY bin_id) statuslatest
                                 ON statuslatest.bin_id = status.bin_id AND statuslatest.createdlatest = status.created) binstatus
                           ON binstatus.bin_id = binarea.bin_id
                     WHERE binarea.municipality_id = ${municipalityId} AND binarea.area_id = ${areaId}
                     ORDER BY binarea.bin_id`
                     
   return new Promise((resolve, reject) => {
      db.executeQuery(query)
         .then(result => resolve(result.recordset))
         .catch(error => reject(new Exception('Failed to get area bin information from DB', MessageCodes.DB_QUERY_FAILED, error)))
   })
}

