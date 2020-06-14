/**
 * Methods for handling user related DB operations
 */

const db = require('../config/db')
const { MessageCodes } = require('../utils/constants')
const { Exception } = require('../payload/exception')

exports.findUserByUsernameAndPassword = (username, password) => {
    const query = `SELECT 
                         currentUserTable.[name]
                        ,currentUserTable.[user_status_id] as statusId
                        ,currentUserTable.[user_role_id] as roleId
                        ,roleTable.[name] as roleName
                        ,currentUserTable.[area_id] as areaId
                        ,currentUserTable.[staff_id] as staffId
                        FROM (SELECT 
                                 [name]
                                ,[user_status_id]
                                ,[user_role_id]
                                ,[area_id]
                                ,[staff_id]
                                FROM [wms].[wmsuser].[user] usertable
                                WHERE usertable.[username] = '${username}' AND usertable.[password] = '${password}' AND usertable.[user_status_id] = 1) currentUserTable
                                JOIN [wms].[wmsuser].[user_role] roleTable
                                ON currentUserTable.user_role_id = roleTable.user_role_id`

    return new Promise((resolve, reject) => {
        db.executeQuery(query)
            .then(result => resolve(result.recordset))
            .catch(error => reject(new Exception('Failed to get user information from DB', MessageCodes.DB_QUERY_FAILED)))
    })
}