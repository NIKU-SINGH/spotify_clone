import {atom} from "recoil"

export const playState = atom({
    key: "playState",
    default: false,
});

export const playingTrackState = atom({
    key: "playingTrackState",
    default: "",
});

export const initialArtistsIdState = atom({
    key:"initialArtistsIdState",
    default:["4YRxDV8wJFPHPTeXepOstw","2oSONSC9zQ4UonDKnLqksx","4fEkbug6kZzzJ8eYX6Kbbp","0tC995Rfn9k2l7nqgCZsV7","246dkjvS1zLTtiykXe5h60"],
});