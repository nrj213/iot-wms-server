/**
 * Methods for handling staff related DB operations
 */

const db = require('../config/db')
const { MessageCodes } = require('../utils/constants')
const { Exception } = require('../payload/exception')

exports.findStaffById = (staffId) => {
    const query = `SELECT staff.[staff_id] as staffId
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
                    JOIN [wms].[wmsuser].[user] userinfo
					ON staff.staff_id = userinfo.staff_id
					WHERE staff.staff_id = ${staffId} AND userinfo.user_status_id = 1`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result.recordset))
            .catch(error => reject(new Exception('Failed to get staff information from DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.findAllStaffByAreaId = (areaId) => {
    const query = `SELECT staffdetails.[staff_id] as staffId
                        ,staffdetails.[name]
                        ,[address]
                        ,[mobile_no] as mobileNo
                        ,staffdetails.[area_id] as areaId
                        ,areainfo.[name] as areaName
                        ,[date_of_joining] as dateOfJoining
                        ,[date_of_leaving] as dateOfLeaving
                        ,userdetails.[user_id] as userId
                        ,userdetails.[username]
                        ,userdetails.[password]
                        ,userdetails.[user_status_id] as statusId
                        ,statusinfo.[name] as status
                        ,userdetails.[user_role_id] as roleId
                        ,roleinfo.[name] as role
                    FROM [wms].[wmsuser].[staff_details] staffdetails
                    JOIN [wms].[wmsuser].[area] areainfo
                    ON staffdetails.area_id = areainfo.area_id
                    JOIN [wms].[wmsuser].[user] userdetails
                    ON staffdetails.staff_id = userdetails.staff_id
                    JOIN [wms].[wmsuser].[user_status] statusinfo
                    ON userdetails.user_status_id = statusinfo.user_status_id
                    JOIN [wms].[wmsuser].[user_role] roleinfo
                    ON userdetails.user_role_id = roleinfo.user_role_id
                    WHERE staffdetails.area_id = ${areaId}`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result.recordset))
            .catch(error => reject(new Exception('Failed to get staff details from DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.create = (user) => {
    const query = `INSERT INTO [wmsuser].[staff_details]
                                ([name]
                                ,[address]
                                ,[mobile_no]
                                ,[area_id]
                                ,[date_of_joining]
                                ,[date_of_leaving])
                            OUTPUT inserted.staff_id as staffId
                            VALUES
                                ('${user.name}'
                                ,'${user.address}'
                                ,'${user.mobileNo}'
                                ,${user.areaId}
                                ,'${user.dateOfJoining}'
                                ,${user.dateOfLeaving ? "'" + user.dateOfLeaving + "'" : null})`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result))
            .catch(error => reject(new Exception('Failed to add staff information to DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.delete = (staffId) => {
    const query = `DELETE FROM [wmsuser].[staff_details]
                                WHERE staff_id = ${staffId}`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result))
            .catch(error => reject(new Exception('Failed to delete staff details from DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.update = (user) => {
    const query = `UPDATE [wmsuser].[staff_details]
                            SET [name] = '${user.name}'
                            ,[address] = '${user.address}'
                            ,[mobile_no] = '${user.mobileNo}'
                            ,[area_id] = ${user.areaId}
                            ,[date_of_joining] = '${user.dateOfJoining}'
                            ,[date_of_leaving] = ${user.dateOfLeaving ? "'" + user.dateOfLeaving + "'" : null}
                        WHERE staff_id = ${user.staffId}`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result))
            .catch(error => reject(new Exception('Failed to update staff information in DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}