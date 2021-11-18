import { Injectable } from "@angular/core";
import { SEASON_SCHEDULE, TEAMS } from "./scheduleData";


@Injectable(
    {providedIn:'root'}
)
export class SoccerService {

    getScheduleAsync(){
        return Promise.resolve(SEASON_SCHEDULE)
    }
    getSchedule(){
        return SEASON_SCHEDULE;
    }

    getAllTeamsAsync(){
        return Promise.resolve(TEAMS)
    }
    getAllTeams(){
        return TEAMS;
    }
}