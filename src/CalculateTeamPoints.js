import React from "react";
import CountTheResult from "./CountTheResult";

function CountThePoints(team) {
    debugger;
console.log("countThePoints");
    let points = 0;
    try {
        if(team.length > 0) {
            team.forEach((game) => {
                console.log("forEach");
                if (game.homeTeam.id === team.id) {
                    const scores = CountTheResult(game.goals);
                    if (scores.homeTeam > scores.awayTeam) {
                        points += 3;
                    } else if (scores.homeTeam === scores.awayTeam) {
                        points += 1;
                    }
                } else if (game.awayTeam.id === team.id) {
                    const scores = CountTheResult(game.goals);
                    if (scores.homeTeam < scores.awayTeam) {
                        points += 3;
                    } else if (scores.homeTeam === scores.awayTeam) {
                        points += 1;
                    }
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
    return points;

}
export default CountThePoints;