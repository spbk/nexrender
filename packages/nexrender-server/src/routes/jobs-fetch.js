const { send }  = require('micro')
const { fetch } = require('../helpers/database')

module.exports = async (req, res) => {
    if (req.params.uid) {
        send(res, 200, await fetch(req.params.uid))
    } else {
        send(res, 200, await fetch())
    }
}
