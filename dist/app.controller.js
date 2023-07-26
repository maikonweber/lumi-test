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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const common_2 = require("@nestjs/common");
const fullDashboard_dto_1 = require("./dto/fullDashboard.dto");
let AppController = exports.AppController = AppController_1 = class AppController {
    constructor(appService) {
        this.appService = appService;
        this.logger = new common_1.Logger(AppController_1.name);
    }
    async getCurrentRound(req) {
        this.logger.log('Get Current Round');
        let league = 71;
        let season = 2023;
        return await this.appService.getCurrentRound(league, season, true);
    }
    getLeagueTeams(req) {
        return this.appService.getBestPlayerScore(71, 2023, true);
    }
    getAllLeaguesAvailable(req) {
        return this.appService.getTeamStatist(req.team_id, req.league_id, req.season);
    }
    getCurrentMarktingPayload(req) {
        return this.appService.getCurrentMarktingPayload();
    }
};
__decorate([
    (0, common_1.Get)('/get-current-round'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fullDashboard_dto_1.FullDashboard]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCurrentRound", null);
__decorate([
    (0, common_1.Get)('/get-player-score'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getLeagueTeams", null);
__decorate([
    (0, common_1.Get)('/get-team-leagues-statict'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllLeaguesAvailable", null);
__decorate([
    (0, common_1.Get)('/get-current-markting'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCurrentMarktingPayload", null);
exports.AppController = AppController = AppController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.default])
], AppController);
//# sourceMappingURL=app.controller.js.map