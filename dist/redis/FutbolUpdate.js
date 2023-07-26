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
exports.FutbolUpdadeService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("./redis");
const prisma_service_1 = require("../prisma/prisma.service");
const axios_1 = require("axios");
let FutbolUpdadeService = exports.FutbolUpdadeService = class FutbolUpdadeService {
    constructor(redis, prisma) {
        this.redis = redis;
        this.prisma = prisma;
        this.BASE_URL = 'https://v3.football.api-sports.io/';
        this.TOKEN = 'db90e4fb0c6f9d6db2c53bd53232d502';
        this.Country = 'Brazil';
    }
    async getBestPlayerScore(league, season, current) {
        const response = await axios_1.default.get(`${this.BASE_URL}/players`, {
            headers: {
                'x-apisports-key': this.TOKEN
            }, params: {
                league: league,
                season: season,
            }
        });
        let key_player = 'best-score-player';
        for (let players of response.data.response) {
            console.log(players);
            await this.redis.sadd(key_player, players);
        }
        return this.redis.smembers(key_player);
    }
    async getCurrentRound(league, season, current) {
        const response = await axios_1.default.get(`${this.BASE_URL}/fixtures`, {
            headers: {
                'x-apisports-key': this.TOKEN
            }, params: {
                league: league,
                season: season,
            }
        });
        let key_prevent = `${league}-${season}-prevent`;
        let key_next = `${league}-${season}-next`;
        let now = new Date().valueOf();
        for (let rounds of response.data.response) {
            let timestamp = rounds['fixture']['timestamp'];
            console.log(timestamp < now);
            if (timestamp < now) {
                await this.redis.sadd(key_next, JSON.stringify(rounds));
            }
            else {
                await this.redis.sadd(key_prevent, JSON.stringify(rounds));
            }
        }
        ;
        return this.redis.smembers(key_next);
    }
    async getLeagueTeams() {
        throw new Error('Method not implemented.');
    }
    async getStatistAboutTeam(team_id, season, league_id) {
        const response = await axios_1.default.get(`${this.BASE_URL}/statistic`, {
            headers: {
                'x-apisports-key': this.TOKEN
            }, params: {
                league: league_id,
                season: season,
                team: team_id
            }
        });
        await this.redis.subtractValueFromKey(`${'rate-limit'}`, 1);
        return response.data.response;
    }
    async GetCurrentRound(league, season, current) {
        const response = await axios_1.default.get(`${this.BASE_URL}/fixtures/rounds`, {
            headers: {
                'x-apisports-key': this.TOKEN
            }, params: {
                league: league,
                season: season,
                current: true
            }
        });
        response.data.response.forEach(async (element) => {
            await this.redis.sadd(`${league}}-${season}-current`, element);
        });
        await this.redis.subtractValueFromKey(`${'rate-limit'}`, 1);
    }
    async getLeagueCountry(Country) {
        try {
            const response = await axios_1.default.get(`${this.BASE_URL}/leagues`, {
                headers: {
                    'x-apisports-key': this.TOKEN
                }, params: {
                    country: Country || this.Country
                }
            });
            response.data.response.forEach(async (leagues) => {
                const { id, name, type, logo } = leagues.league;
                console.log(leagues);
                const flag = logo;
                const country = leagues.country.name;
                const code = leagues.country.code;
                const cup = type === "Cup" ? "Cup" : "Champion";
                await this.prisma.leagues.create({
                    data: {
                        id,
                        name,
                        cup,
                        flag,
                        country,
                        code
                    }
                });
            });
            await this.redis.subtractValueFromKey(`${'rate-limit'}`, 1);
            return response.data.data;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getTeamBySeasson(name) {
        const response = await axios_1.default.get(`${this.BASE_URL}/teams`, {
            headers: {
                'x-apisports-key': this.TOKEN
            }, params: {
                country: 'Brazil'
            }
        });
        response.data.response.forEach(async (element) => {
            let { team, venue } = element;
            let venues = venue;
            const { id, name, code = '', founded, national, logo } = team;
            try {
                await this.prisma.team.create({
                    data: {
                        id, name, code, founded, national, logo, venues
                    }
                });
            }
            catch (er) {
                console.log(er);
            }
        });
        await this.redis.subtractValueFromKey(`${'rate-limit'}`, 1);
        return response.data.response;
    }
    async getTeamRelationLeague() {
    }
    async getAllLeague() {
        try {
            const league = await this.prisma.leagues.findMany();
            return league;
        }
        catch (er) {
            console.log(er);
        }
    }
    async getAllTeam() {
        try {
            const team = await this.prisma.team.findMany();
            return team;
        }
        catch (er) {
            console.log(er);
        }
    }
};
exports.FutbolUpdadeService = FutbolUpdadeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_1.RedisService,
        prisma_service_1.PrismaService])
], FutbolUpdadeService);
//# sourceMappingURL=FutbolUpdate.js.map