/**
 * Methods for handling staff related DB operations
 */

const db = require('../config/db')
const { MessageCodes } = require('../utils/constants')
const { Exception } = require('../payload/exception')

exports.findStaffById = (staffId) => {
    const query = `SELECT [staff_id] as staffId
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

exports.findAllStaff = () => {
    const query = `SELECT staffdetails.[staff_id]
                        ,staffdetails.[name]
                        ,[address]
                        ,[mobile_no]
                        ,[date_of_joining]
                        ,[date_of_leaving]
                        ,userdetails.[username]
                        ,userdetails.[password]
                        ,statusinfo.[name] as status
                        ,roleinfo.[name] as role
                    FROM [wms].[wmsuser].[staff_details] staffdetails
                    JOIN [wms].[wmsuser].[user] userdetails
                    ON staffdetails.staff_id = userdetails.staff_id
                    JOIN [wms].[wmsuser].[user_status] statusinfo
                    ON userdetails.user_status_id = statusinfo.user_status_id
                    JOIN [wms].[wmsuser].[user_role] roleinfo
                    ON userdetails.user_role_id = roleinfo.user_role_id`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result.recordset))
            .catch(error => reject(new Exception('Failed to get staff details from DB', MessageCodes.DB_QUERY_FAILED)))
    })
}