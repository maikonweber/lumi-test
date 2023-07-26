"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const ioredis_1 = require("ioredis");
const common_1 = require("@nestjs/common");
let RedisService = exports.RedisService = class RedisService extends ioredis_1.default {
    constructor() {
        super();
        super.on('error', (err) => {
            console.log('Error on Redis');
        });
        super.on('connect', () => {
            console.log('Redis Connected!');
        });
    }
    async addNode(id, name) {
        await super.hset('nodes', id, name);
    }
    async addEdge(nodeId, connectedNodeId) {
        await super.sadd(`edges:${nodeId}`, connectedNodeId);
    }
    async getNodeName(id) {
        return await super.hget('nodes', id);
    }
    async getConnectedNodes(nodeId) {
        return await super.smembers(`edges:${nodeId}`);
    }
    async getAllNodes() {
        return await super.hgetall('nodes');
    }
    async deleteNode(id) {
        return await super.hdel('nodes', id);
    }
    async deleteEdge(nodeId, connectedNodeId) {
        return await super.srem(`edges:${nodeId}`, connectedNodeId);
    }
    async getNodeCount() {
        return await super.hlen('nodes');
    }
    async getEdgeCount(nodeId) {
        return await super.scard(`edges:${nodeId}`);
    }
    async getAllEdges() {
        const nodeIds = await this.getAllNodeIds();
        const edges = {};
        for (const nodeId of nodeIds) {
            edges[nodeId] = await this.getConnectedNodes(nodeId);
        }
        return edges;
    }
    async getAllNodeIds() {
        return await super.hkeys('nodes');
    }
    async isConnected(nodeId, connectedNodeId) {
        const connectedNodes = await this.getConnectedNodes(nodeId);
        return connectedNodes.includes(connectedNodeId);
    }
    async setKeyValue(key, value) {
        await super.set(key, value);
    }
    async getKey(key) {
        return await super.get(key);
    }
    async deleteKey(key) {
        return await super.del(key);
    }
    async hashSet(key, field, value) {
        return await super.hset(key, field, value);
    }
    async hashGet(key, field) {
        return await super.hget(key, field);
    }
    async hashGetAll(key) {
        return await super.hgetall(key);
    }
    async hashDelete(key, field) {
        return await super.hdel(key, field);
    }
    async setAdd(key, member) {
        return await super.sadd(key, member);
    }
    async setMembers(key) {
        return await super.smembers(key);
    }
    async setRemove(key, member) {
        return await super.srem(key, member);
    }
    async keyExists(key) {
        return await super.exists(key);
    }
    async expireKey(key, seconds) {
        return await super.expire(key, seconds);
    }
    async ttlKey(key) {
        return await super.ttl(key);
    }
    async subtractValueFromKey(key, valueToSubtract) {
        const currentValue = await this.getKey(key);
        if (currentValue === null) {
            return null;
        }
        const parsedValue = parseInt(currentValue);
        const result = parsedValue - valueToSubtract;
        await this.setKeyValue(key, result.toString());
        return result;
    }
};
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.js.map