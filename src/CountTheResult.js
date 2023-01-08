import React from "react";

function CountTheResult(goals) {
    console.log("countTheResult");
    debugger;
    let homeTeamScore = 0;
    let awayTeamScore = 0;
    try {
        if (goals.length > 0) {
             goals.forEach((goal) => {
                console.log("forEach");
                if (goal.home === true) {
                    homeTeamScore++;
                } else if (goal.home === false) {
                    awayTeamScore++;
                } else {
                    console.log("0 : 0");
                }

            });
        }
    } catch (e) {
        console.log(e);
    }
    return {homeTeam: homeTeamScore, awayTeam: awayTeamScore};
}
export default CountTheResult;
