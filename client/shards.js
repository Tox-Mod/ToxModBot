require("module-alias/register");

/**
 * IMPORT THE CONSTANT REQUIREMENTS
 */
const { ShardingManager } = require('discord.js');
const token = require('@Settings/config.js').token;

/**
 * INITIALIZE THE SHARDING CLIENT
 */
const manager = new ShardingManager("./client/index.js", { 
   token, 
   totalShards: 'auto',
   autoSpawn: true
});

/**
 * SPAWN THE SHARDING MANAGER
 */

module.exports.init = async (token) => {

    //client.userBaseDirectory = __dirname;

     //await client.login(config.token);

     manager.spawn();

    return manager;

}

manager.on("shardCreate", shard => console.log(`Shard: ${shard.id} is Online and Active!!`));

module.exports = {
  manager,
  ShardingManager
}
