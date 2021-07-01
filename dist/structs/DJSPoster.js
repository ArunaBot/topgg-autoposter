"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DJSPoster = void 0;
const BasePoster_1 = require("./BasePoster");
/**
 * Auto-Poster For Discord.JS
 */
class DJSPoster extends BasePoster_1.BasePoster {
    /**
     * Create a new poster
     * @param token Top.gg API Token
     * @param client Your Discord.JS Client
     * @param options Options
     */
    constructor(token, client, options) {
        if (!token)
            throw new Error('Missing Top.gg Token');
        if (!client)
            throw new Error('Missing client');
        const Discord = require('discord.js');
        if (!(client instanceof Discord.Client))
            throw new Error('Not a discord.js client.');
        super(token, options);
        this.client = client;
        this._binder({
            clientReady: () => this.clientReady(),
            waitForReady: (fn) => this.waitForReady(fn),
            getStats: () => this.getStats()
        });
    }
    clientReady() {
        return this.client.ws.status === 0;
    }
    waitForReady(fn) {
        this.client.once('ready', () => {
            fn();
        });
    }
    async getStats() {
        return {
            serverCount: this.client.guilds.size,
            shardId: this.client.shard.id || null,
            shardCount: this.client.shard.count || 1
        };
    }
}
exports.DJSPoster = DJSPoster;
