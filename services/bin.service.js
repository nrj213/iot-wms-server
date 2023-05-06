/**
 * Service methods for handling bin related actions
 */

const binDao = require('../dao/bin.dao')
const { Response } = require('../payload/response')
const { Exception } = require('../payload/exception')
const { MessageCodes } = require('../utils/constants')
const cron = require('node-cron')
const axios = require('axios')

exports.getAllBins = () => {
    return new Promise((resolve, reject) => {
        binDao.findAll()
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}

exports.getAllBinsByMunicipality = (municipalityId) => {
    return new Promise((resolve, reject) => {
        binDao.findByMunicipality(municipalityId)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}

exports.getAllBinsByMunicipalityAndArea = (municipalityId, areaId) => {
    return new Promise((resolve, reject) => {
        binDao.findByMunicipalityAndArea(municipalityId, areaId)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}

exports.markCollection = (binId, staffId) => {
    return new Promise((resolve, reject) => {
        binDao.markCollection(binId, staffId)
            .then(response => resolve(new Response(response)))
            .catch(err => reject(err))
    })
}

exports.create = (bin) => {
    return new Promise((resolve, reject) => {
        binDao.create(bin)
            .then(response => {
                if (response['recordset']) {
                    let binId = response['recordset'][0]['binId']
                    let level = 0
                    binDao.addStatus(binId, level)
                        .then(result => resolve(new Response(result['rowsAffected'][0])))
                        .catch(error => reject(new Exception('Failed to add bin information to DB', MessageCodes.DB_QUERY_FAILED, error)))
                } else {
                    reject(new Exception('Failed to add bin information to DB', MessageCodes.DB_QUERY_FAILED))
                }
            })
            .catch(error => reject(new Exception('Failed to add bin information to DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.delete = (binId) => {
    return new Promise((resolve, reject) => {
        binDao.deleteStatusRecords(binId)
            .then(response => {
                if (response['rowsAffected'][0]) {
                    binDao.deleteCollectionRecords(binId)
                        .then(response => {
                            binDao.delete(binId)
                                .then(result => resolve(new Response(result['rowsAffected'][0])))
                                .catch(error => reject(new Exception('Failed to delete bin information from DB', MessageCodes.DB_QUERY_FAILED, error)))
                        })
                        .catch(error => reject(new Exception('Failed to delete bin collection information from DB', MessageCodes.DB_QUERY_FAILED, error)))
                } else {
                    reject(new Exception('Failed to delete bin status information from DB', MessageCodes.DB_QUERY_FAILED))
                }
            })
            .catch(error => reject(new Exception('Failed to delete bin status information from DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.update = (bin) => {
    return new Promise((resolve, reject) => {
        binDao.update(bin)
            .then(response => resolve(new Response(response['rowsAffected'][0])))
            .catch(error => reject(new Exception('Failed to update bin information in DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.modifyLevel = (bin) => {
    return new Promise((resolve, reject) => {
        binDao.addStatus(bin.id, bin.level)
            .then(result => resolve(new Response(result['rowsAffected'][0])))
            .catch(error => reject(new Exception('Failed to add bin level information to DB', MessageCodes.DB_QUERY_FAILED, error)))
    })
}

exports.initiateJob = () => {
    console.log("Bin level update job started")

    const iotServerUrl = 'https://api.thingspeak.com/channels/2129412/fields/1/last.txt?api_key=1VRTIYG45WM90X32'
    const binId = 21
    //  ┌────────────── second (optional)
    //  │ ┌──────────── minute
    //  │ │ ┌────────── hour
    //  │ │ │ ┌──────── day of month
    //  │ │ │ │ ┌────── month
    //  │ │ │ │ │ ┌──── day of week
    //  │ │ │ │ │ │
    //  │ │ │ │ │ │
    //  * * * * * *
    cron.schedule('29,59 * * * * *', () => {
        axios.get(iotServerUrl).then(res => {
            if (res.data) {
                console.log(`Recieved level ${res.data} for bin ID ${binId}`)
                let level = res.data >= 0 ? res.data : 0;

                binDao.addStatus(binId, level)
                    .then(result => {
                        if (result['rowsAffected'][0]) {
                            console.log(`Successfully updated level to ${level} for bin ID ${binId}`)
                        }
                    })
                    .catch(error => console.log('Failed to add bin level information to DB', MessageCodes.DB_QUERY_FAILED, error))
            }
        });
    });
}