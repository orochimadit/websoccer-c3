export interface Schedule{
    id          :number,
    playingDate :Date,
    HomeTeam    :string,
    AwayTeam    :string,
    HomeScore   :number,
    AwayScore   :number,
    RefName     :string,
    notes?      :string
}