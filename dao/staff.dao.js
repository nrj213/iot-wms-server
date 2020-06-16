/**
 * Methods for handling staff related DB operations
 */

const db = require('../config/db')
const { MessageCodes } = require('../utils/constants')
const { Exception } = require('../payload/exception')

exports.findStaffById = (staffId) => {
    const query = `SELECT TOP 1000 [staff_id]
                                    ,staff.[name]
                                    ,[address]
                                    ,[mobile_no] as mobileNo
                                    ,staff.[area_id] as areaId
                                    ,area.[name] as areaName
                                    ,[date_of_joining] as dateOfJoining
                                    ,[date_of_leaving] as dateOfLeaving
                                FROM [wms].[wmsuser].[staff_details] staff
                                JOIN [wms].[wmsuser].[area] area
                                ON staff.area_id = area.area_id
                                WHERE staff.staff_id = ${staffId}`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result.recordset))
            .catch(error => reject(new Exception('Failed to get staff information from DB', MessageCodes.DB_QUERY_FAILED)))
    })
}