import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Schedule } from '../interface/schedule';
import { Team } from '../interface/team';
import { Ranking } from '../interface/ranking';
import {SoccerService} from '../service/SoccerService';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  public UsingAsync:boolean = false;
  public MyTeams : Team[];
  public LeagueName:string;
  public MySchedule : Schedule[];
  public Standings : Ranking[];

  constructor(private _titleService:Title, private _soccerService: SoccerService) {
    this._titleService.setTitle('Pertandingan Sepakbola Negara Akoeh');
    this.MyTeams=[];
    this.MySchedule=[];
    this.Standings=[];
    this.getTeams();
    this.LeagueName = "Liga ku";
    this.getSchedule();
    this.ComputeRankings();
   }

  ngOnInit(): void {
  }
  getTeams(){
    if(this.UsingAsync){
      let xx = this._soccerService.getAllTeamsAsync();
        xx.then((Teams:Team[])=>this.MyTeams = Teams);
    }
    else {
      this.MyTeams = this._soccerService.getAllTeams();
    }
  }

  private getSchedule(){
    if(this.UsingAsync){
      let xx = this._soccerService.getScheduleAsync();
        xx.then((Schedules:Schedule[])=> this.MySchedule = Schedules);
    }else{
      this.MySchedule = this._soccerService.getSchedule();
    }
  }
  public ComputeRankings(){
    var curDate: Date = new Date();
    var TeamAt:number;
    this.Standings = [];
    this.MySchedule.forEach(element => {
      if(element.playingDate < curDate && element.HomeScore>=0){
        TeamAt = this.FindTeam(element.HomeTeam);
        if(TeamAt < 0){
          this.Standings.push({
            TeamName:element.AwayTeam,
            GamesPlayed:0,wins:0,Ties:0,GoalsFor:0,GoalsAgaints:0
          })
          TeamAt = this.Standings.length-1;
        }
        this.UpdCurrentRow(element,TeamAt,"A")
      }
    })
  }

  private UpdCurrentRow(element:Schedule,TeamAt:number,HomeAway:string){
    this.Standings[TeamAt].GamesPlayed++;
    if(HomeAway=='H'){
        this.Standings[TeamAt].GoalsFor += element.HomeScore;
        this.Standings[TeamAt].GoalsAgaints += element.AwayScore;
        //win menang
        if(element.HomeScore>element.AwayScore){
          this.Standings[TeamAt].wins++;
        }
    }
    if(HomeAway=='A'){
      this.Standings[TeamAt].GoalsFor += element.AwayScore;
      this.Standings[TeamAt].GoalsFor += element.HomeScore;
      if(element.AwayScore>element.HomeScore){
        this.Standings[TeamAt].wins++;
      }
    }
    if(element.HomeScore==element.AwayScore){
      this.Standings[TeamAt].Ties++;
    }
  }
  
  private FindTeam(TeamName:string):number{
    var FoundAt:number =-1;
    for(var _x=0; _x<this.Standings.length; _x++){
      if(this.Standings[_x].TeamName==TeamName){
        return _x;
      }
    }
    return FoundAt;
  }

}
