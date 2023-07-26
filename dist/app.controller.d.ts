import AppService from './app.service';
import { FullDashboard } from './dto/fullDashboard.dto';
export declare class AppController {
    private readonly appService;
    private readonly logger;
    constructor(appService: AppService);
    getCurrentRound(req: FullDashboard): Promise<any>;
    getLeagueTeams(req: any): Promise<string>;
    getAllLeaguesAvailable(req: any): Promise<any>;
    getCurrentMarktingPayload(req: any): Promise<any>;
}
