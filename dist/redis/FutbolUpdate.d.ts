import { RedisService } from "./redis";
import { PrismaService } from "src/prisma/prisma.service";
export declare class FutbolUpdadeService {
    private readonly redis;
    private readonly prisma;
    private readonly BASE_URL;
    private readonly TOKEN;
    private readonly Country;
    constructor(redis: RedisService, prisma: PrismaService);
    getBestPlayerScore(league: number, season: number, current: any): Promise<any>;
    getCurrentRound(league: number, season: number, current: boolean): Promise<string[]>;
    getLeagueTeams(): Promise<string>;
    getStatistAboutTeam(team_id: number, season: number, league_id: number): Promise<void>;
    GetCurrentRound(league: number, season: number, current: boolean): Promise<any>;
    getLeagueCountry(Country: any): Promise<string>;
    getTeamBySeasson(name: any): Promise<any>;
    getTeamRelationLeague(): Promise<void>;
    getAllLeague(): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        cup: import(".prisma/client").typecup;
        country: string;
        code: string;
        flag: string;
    }, unknown> & {})[]>;
    getAllTeam(): Promise<(import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        code: string;
        founded: number;
        national: boolean;
        logo: string;
        venues: import(".prisma/client").Prisma.JsonValue;
    }, unknown> & {})[]>;
}
