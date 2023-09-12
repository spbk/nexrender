const { send }  = require('micro')
const { fetch } = require('../helpers/database')
const { getRenderingStatus } = require('@nexrender/types/job')

module.exports = async (req, res) => {
    if (req.params.uid) {
        send(res, 200, getRenderingStatus(await fetch(req.params.uid)))
    } else {
        send(res, 200, await fetch().map(getRenderingStatus))
    }
}
