import {atom} from "recoil"

export const playState = atom({
    key: "playState",
    default: false,
});

export const playingTrackState = atom({
    key: "playingTrackState",
    default: "",
});

export const initialArtistsState = atom({
    key:"initialPlaylistState",
    default:"4YRxDV8wJFPHPTeXepOstw",
});