import React from "react";
import CountTheResult from "./CountTheResult";

function GoalDifference(game, team) {
    debugger;
    let goalDifference = 0;
    try {
        // if(team.length > 0) {
            team.forEach((game) => {
                if (game.homeTeam.id === team.id) {
                    const scores = CountTheResult(game.goals);
                    goalDifference += scores.homeTeam - scores.awayTeam;
                } else if (game.awayTeam.id === team.id) {
                    const scores = CountTheResult(game.goals);
                    goalDifference += scores.awayTeam - scores.homeTeam;
                }
            });
        // }
    } catch (e) {
        console.log(e);
    }
    return goalDifference;
}
export default GoalDifference;