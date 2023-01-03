import React from "react";
import axios from "axios";
import TeamPlayers from "./TeamPlayers";
import HistoryGames from "./HistoryGames";
import LeagueTable from "./LeagueTable"
class topScore extends React.Component {
    state = {
        topPlayerScore:[],
    }
    constructor(props) {
        super(props);
    }
    selectLeague = async (leagueId) => {
        for (let i =0; i <leagueId.length; //אורך הקבוצות בליגה //
              i++) {
            await this.topScoreOfTeam(leagueId, i);
        }
    };
    render() {
        return (

        )
    }
}

export default topScore;
}
