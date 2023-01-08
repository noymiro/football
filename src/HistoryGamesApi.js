import React from "react";
import axios from "axios";

const api = "https://app.seker.live/fm1"

async function HistoryGamesApi(idLeague, idTeam) {
    const response = await axios.get(api + "/history/" + idLeague + "/" + idTeam);
    return response.data;

}

export default HistoryGamesApi;