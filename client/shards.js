/**
 * REQUIRE THE MODULE MANAGER
 */
require('module-alias/regsiter');

/**
 * IMPORT THE CONSTANT REQUIREMENTS
 */
const { ShardingManager } = require('discord.js');
const token = require('@Settings/config.js').token;

/**
 * INITIALIZE THE SHARDING CLIENT
 */
const manager = new ShardingManager("@Client/index.js", { token, totalShards: 'auto' });

/**
 * SPAWN THE SHARDING MANAGER
 */
manager.spawn();
manager.on("shardCreate", shard => console.log(`Shard: ${shard.id} is Online and Active!!`));