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
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const redis_1 = require("./redis/redis");
const FutbolUpdate_1 = require("./redis/FutbolUpdate");
let AppService = AppService_1 = class AppService {
    getLeagueTeams() {
        throw new Error('Method not implemented.');
    }
    constructor(prisma, redis, futbol) {
        this.prisma = prisma;
        this.redis = redis;
        this.futbol = futbol;
        this.logger = new common_1.Logger(AppService_1.name);
    }
    async getCurrentRound(league, season, current) {
        const caching_prevent = await this.redis.smembers(`${league}-${season}-prevent`);
        const caching_next = await this.redis.smembers(`${league}-${season}-next`);
        if (caching_prevent.length < 1) {
            const current = await this.futbol.getCurrentRound(league, season, true);
            return current;
        }
        return [caching_prevent, caching_next];
    }
    async getBestPlayerScore(league, season, current) {
        const caching = await this.redis.get(`cache-best-score`);
        if (!caching) {
            return this.futbol.getBestPlayerScore(league, season, current);
        }
        return caching;
    }
    async getTeamStatist(team, season, league) {
        const caching = await this.redis.get(`${team}-${season}-${league}-statistic`);
        if (!caching) {
            const lastTeamStatict = await this.prisma.statistics_team.findFirst({
                where: {
                    league_team_id: team
                },
                orderBy: {}
            });
            if (!lastTeamStatict) {
                return this.futbol.getStatistAboutTeam(team, season, league);
            }
        }
    }
    async getCurrentMarktingPayload() {
        const type = '';
        const local = '';
        const caching = await this.redis.get(`${type}-${local}`);
        return caching;
    }
};
AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_1.RedisService,
        FutbolUpdate_1.FutbolUpdadeService])
], AppService);
exports.default = AppService;
//# sourceMappingURL=app.service.js.map