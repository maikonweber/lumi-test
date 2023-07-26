import { Controller, Get, Logger } from '@nestjs/common';
import AppService from './app.service';
import { Request } from '@nestjs/common';
import { FutbolUpdadeService } from './redis/FutbolUpdate';
import { FullDashboard } from './dto/fullDashboard.dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name)

  constructor(
    private readonly appService: AppService,
  ) { }

  @Get('/get-current-round') {

  return;
}

@Get('/get-player-score')
getLeagueTeams(@Request() req: any): Promise < string > {
  return ;
}


@Get('/get-team-leagues-statict')
getAllLeaguesAvailable(@Request() req: any): Promise < any > {
  return this.appService.getTeamStatist(req.team_id, req.league_id, req.season);
}


@Get('/get-current-markting')
getCurrentMarktingPayload(@Request() req: any): Promise < any > {
  return this.appService.getCurrentMarktingPayload();
}



}
