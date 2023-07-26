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
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const FutbolUpdate_1 = require("../redis/FutbolUpdate");
const console_1 = require("console");
const redis_1 = require("../redis/redis");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = exports.TasksService = TasksService_1 = class TasksService {
    constructor(FutbolUpdate, redis, prisma) {
        this.FutbolUpdate = FutbolUpdate;
        this.redis = redis;
        this.prisma = prisma;
        this.logger = new common_1.Logger(TasksService_1.name);
        this.nameOfRateLimit = "futbolRateLimit";
    }
    async updateRateLimit() {
        this.logger.verbose("Update Rate Limit Information");
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const currentMinutes = currentDate.getMinutes();
        const currentSeconds = currentDate.getSeconds();
        let remainingSeconds = 0;
        if (currentHour === 0 && currentMinutes < 59) {
            remainingSeconds = (59 - currentMinutes - 1) * 60 + (60 - currentSeconds);
        }
        try {
            await this.redis.set(`${this.nameOfRateLimit}`, 100);
            await this.redis.expireKey(`${this.nameOfRateLimit}`, remainingSeconds);
            this.logger.log("Rate Limit Update SucessFully");
        }
        catch {
            this.logger.log("Erro Updating rate limit", console_1.error);
        }
    }
    async updateTeamStatistics() {
        this.logger.verbose("Update each team statisct run every thusday");
        const teams_in_season = await this.prisma.league_teams.findMany();
        this.logger.log(teams_in_season);
        for (const league in teams_in_season) {
            const teams_static = await this.FutbolUpdate.getStatistAboutTeam(71, 2023, 71);
            return;
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('1 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "updateRateLimit", null);
__decorate([
    (0, schedule_1.Cron)('0 0 * * 3,0'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "updateTeamStatistics", null);
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [FutbolUpdate_1.FutbolUpdadeService,
        redis_1.RedisService,
        prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=cron.js.map