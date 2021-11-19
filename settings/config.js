
/**
* DISCORD CLIENT AND WEB STUFF GOES HERE!
*/
exports.token = process.env.TOKEN
exports.clientID = process.env.CLIENT_ID
exports.clientSecret = process.env.CLIENT_SECRET
exports.domain = process.env.DOMAIN
exports.mongo_url = process.env.MONGO_URL
exports.port = process.env.PORT
exports.maintenance = process.env.MAINTENANCE

/**
* SUPPORT SERVER SETTINGS
*/
exports.ServerInvite = process.env.SERVER_INV
exports.SupportGuild = process.env.SERVER_ID
exports.JoinLogs = process.env.JOIN_LOGS
exports.AuthLogs = process.env.AUTH_LOGS
exports.BanLogs = process.env.BAN_LOGS
exports.BugLogs = process.env.BUG_LOGS
exports.ErrLogs = process.env.ERR_LOGS

/**
* DEFINE THE USERS AND THEIR ACCESS 
*/

exports.owners = process.env.OWNERS

exports.admins = [
    "391376464064282627",
    "673937399801184306"
]

exports.beta = [
    "391376464064282627",
    "673937399801184306",
    "713632188863610911",
    "324646179134636043"
]

exports.devs = [
    "486659270876856362",
    "713632188863610911",
    "324646179134636043"
]
