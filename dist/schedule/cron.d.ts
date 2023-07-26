import { FutbolUpdadeService } from 'src/redis/FutbolUpdate';
import { RedisService } from 'src/redis/redis';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TasksService {
    private readonly FutbolUpdate;
    private readonly redis;
    private readonly prisma;
    private readonly logger;
    private readonly nameOfRateLimit;
    constructor(FutbolUpdate: FutbolUpdadeService, redis: RedisService, prisma: PrismaService);
    updateRateLimit(): Promise<void>;
    updateTeamStatistics(): Promise<void>;
    async: any;
}
