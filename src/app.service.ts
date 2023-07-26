import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RedisService } from "./redis/redis";
import { FutbolUpdadeService } from './redis/FutbolUpdate';

@Injectable()
export default class AppService {
  getLeagueTeams(): Promise<string> {
    throw new Error('Method not implemented.');
  }

  private readonly logger = new Logger(AppService.name)
  constructor(
    private readonly prisma: PrismaService,
  ) {

  }


}

