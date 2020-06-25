/**
 * Methods for handling user related DB operations
 */

const db = require('../config/db')
const { MessageCodes } = require('../utils/constants')
const { Exception } = require('../payload/exception')

exports.findUserByUsernameAndPassword = (username, password) => {
    const query = `SELECT 
                         staff.[name]
                        ,currentUserTable.[user_status_id] as statusId
                        ,currentUserTable.[user_role_id] as roleId
                        ,roleTable.[name] as roleName
                        ,staff.[area_id] as areaId
                        ,currentUserTable.[staff_id] as staffId
                        FROM (SELECT 
                                 [user_status_id]
                                ,[user_role_id]
                                ,[staff_id]
                                FROM [wms].[wmsuser].[user] usertable
                                WHERE usertable.[username] = '${username}' AND usertable.[password] = '${password}' AND usertable.[user_status_id] = 1) currentUserTable
                                JOIN [wms].[wmsuser].[user_role] roleTable
                                ON currentUserTable.user_role_id = roleTable.user_role_id
                                JOIN [wms].[wmsuser].[staff_details] staff
                                ON currentUserTable.staff_id = staff.staff_id`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result.recordset))
            .catch(error => reject(new Exception('Failed to get user information from DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.create = (user) => {
    const query = `INSERT INTO [wmsuser].[user]
                                ([username]
                                ,[password]
                                ,[user_status_id]
                                ,[user_role_id]
                                ,[staff_id])
                            VALUES
                                ('${user.username}'
                                ,'${user.password}'
                                ,${user.statusId}
                                ,${user.roleId}
                                ,${user.staffId})`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result))
            .catch(error => reject(new Exception('Failed to add user information to DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.delete = (userId) => {
    const query = `DELETE FROM [wmsuser].[user]
                                WHERE user_id = ${userId}`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result))
            .catch(error => reject(new Exception('Failed to delete user information from DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.update = (user) => {
    const query = `UPDATE [wmsuser].[user]
                            SET [username] = '${user.username}'
                            ,[password] = '${user.password}'
                            ,[user_status_id] = ${user.statusId}
                            ,[user_role_id] = ${user.roleId}
                        WHERE user_id = ${user.userId}`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result))
            .catch(error => reject(new Exception('Failed to update user information in DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}