import { PrismaService } from './prisma/prisma.service';
import { RedisService } from "./redis/redis";
import { FutbolUpdadeService } from './redis/FutbolUpdate';
export default class AppService {
    private readonly prisma;
    private readonly redis;
    private readonly futbol;
    getLeagueTeams(): Promise<string>;
    private readonly logger;
    constructor(prisma: PrismaService, redis: RedisService, futbol: FutbolUpdadeService);
    getCurrentRound(league: number, season: number, current: boolean): Promise<any>;
    getBestPlayerScore(league: number, season: number, current: boolean): Promise<any>;
    getTeamStatist(team: number, season: number, league: number): Promise<any>;
    getCurrentMarktingPayload(): Promise<any>;
}
