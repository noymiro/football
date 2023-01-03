import React from "react";
import axios from "axios";

const api = "https://app.seker.live/fm1";
const minuteOfHalf = 45;

class StatisticsPage extends React.Component {
    state = {
        data: [],
        firstHalfGoals: [],
        secondHalfGoals: [],
        mapOfRounds: new Map(),
        roundOfTheMostGoals: 0,
        roundOfTheLeastGoals: 0,

    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getUrlOfLeague(1)

    }

    getUrlOfLeague = async (leagueId) => {
        console.log(leagueId + " getUrlOfLeague");
        const url = api + "/history/" + leagueId;
        console.log(url);
        const response = await axios.get(url);
        this.setState({
            // ...this.state,
            data: response.data,
        })
        if(this.state.data.length > 0) {
            this.sortGoals()
        }

    }

    sortGoals = () => {
        debugger;
        console.log(" sortGoals: " + this.state.data.length);
        const arrayOfGames = this.state.data;
        const firstHalfGoals = [];
        const secondHalfGoals = [];
        const mapGoalsPerRound = new Map;
        let round = 1;
        let counter = 0;
        if (arrayOfGames.length > 0) {
            arrayOfGames.map((game) => {
                try {
                    game.goals.map((goal) => {
                            if (goal.length > 0) {
                                if (goal.round !== round) {
                                    mapGoalsPerRound.set(round, counter);
                                    counter = 0;
                                    round++;
                                }
                                if (goal.minute < minuteOfHalf) {
                                    firstHalfGoals.push(goal);
                                } else {
                                    secondHalfGoals.push(goal);
                                }
                                counter++;
                            }
                        }
                    )


                } catch (e) {
                    console.log(e);
                }
            });
        }
        this.setState({
            ...this.state,
            firstHalfGoals: firstHalfGoals,
            secondHalfGoals: secondHalfGoals,
            mapOfRound: mapGoalsPerRound,
        })

    }

    render() {
        return (
            <div>
                <h1>Statistics</h1>
                <h2>Goals in the first half {this.state.firstHalfGoals.length}</h2>
                <h2>Goals in the second half {this.state.secondHalfGoals.length}</h2>
            </div>


        );


    }


}

export default StatisticsPage;

// sortGoals() {
//     const data = this.state.data;
//     const firstHalfGoals = [];
//     const secondHalfGoals = [];
//     const mapGoalOfRound = new Map;
//     data.map((game) => {
//         const numOfRound = game.round
//         game.goals.map((goal) => {
//             if (goal.minute <= minuteOfHalf) {
//                 firstHalfGoals.push(goal);
//
//             }
//             else {
//                 secondHalfGoals.push(goal);
//             }
//         })
//         mapGoalOfRound.set(numOfRound, game.goals.length);
//     })
//     this.setState({
//         ...this.state,
//         firstHalfGoals: firstHalfGoals,
//         secondHalfGoals: secondHalfGoals,
//         arrayOfRounds: mapGoalOfRound,
//     })
// }

// data.map((game) => {
//     game.round.map((round) => {
//         const numRound = game.round;
//         if (mapGoalOfRound.has(numRound)) {
//             mapGoalOfRound.set(numRound, mapGoalOfRound.get(numRound) + 1);
//         } else {
//             mapGoalOfRound.set(numRound, 1);
//         }
//         game.goals.map((goal) => {
//             if (goal.minute <= minuteOfHalf) {
//                 firstHalfGoals.push(goal);
//             } else {
//                 secondHalfGoals.push(goal);
//             }
//         })
//     })
// })
