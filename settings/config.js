
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
exports.ServerInvite = 'https://discord.gg/gCtBJVQw4Q'
exports.SupportGuild = '896849194290130985' // Toxic FX Server
exports.JoinLogs = '896857901711376414'
exports.AuthLogs = '896857529735327754'
exports.BanLogs = '896857622731440179'
exports.BugLogs = '896857759595773992'
exports.ErrLogs = '896857811504480266'

/**
* DEFINE THE USERS AND THEIR ACCESS 
*/
exports.owners = [
    "510065483693817867",
    "486659270876856362", // Toxic Dev
    "324646179134636043", // Connor
    "713632188863610911", // Maxim
    "391376464064282627", // Cpt Calcium
    "673937399801184306" // Greed
]

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
    "486659270876856362", // Toxic
    "713632188863610911", // Maxim
    "324646179134636043" // Connor
]
