import React from "react";
import axios from "axios";
import TeamPlayers from "./TeamPlayers";
import HistoryGames from "./HistoryGames";
import LeagueTable from "./LeagueTable"
class topScoreOfTeam extends React.Component {
    state = {
        teamTopScore:[],
    }
    constructor(props) {
        super(props);
    }
    selectedTeam = async (idTeam) => {
        for (let i =0; i <idTeam.length; //אורך השחקנים בקבוצה //
             i++) {
            await this.howMuchGoals(idTeam, i.ID);// ה איי די של השחקן
        }
    };
    howMuchGoals(idTeam , idPlayer){
        let goals=0;
        for (let i = 0; i <idTeam ; i++) { // מספר המשחקים שהקבוצה עשתה
// אם השחקן כבש
            goals++
        }
       return goals
    }
    render() {
        return (

        )
    }
}

export default topScoreOfTeam;
}
