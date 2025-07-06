import axios from "axios";
const BASE = "https://aoe4world.com/api/v0";

export async function getPlayer(profileId: string) {
    const { data } = await axios.get(`${BASE}/players/${profileId}`);
    return data;
}

export async function getLeaderboard(leaderboard = "rm_solo", time?: string) {
    const url = new URL(`${BASE}/leaderboards/${leaderboard}`);
    if (time) url.searchParams.set("time", time);
    const { data } = await axios.get(url.toString());
    return data;
}

export async function getGames(profileId: string, lb = "rm_solo") {
    const { data } = await axios.get(
        `${BASE}/players/${profileId}/games?leaderboard=${lb}&page=1`
    );
    return data;
}
