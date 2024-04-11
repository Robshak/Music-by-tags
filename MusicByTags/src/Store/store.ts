import { configureStore } from "@reduxjs/toolkit";
import { saveState } from "./storage";
import volumeManagerSlice, { VOLUME_MANAGER_PERSISTENT_STATE } from "./volumeManage.slice";
import ActiveManagerSlice, { ACTIVE_MANAGER_PERSISTENT_STATE } from "./activeManager.slice";
import tagListSlice, { TAGLIST_PERSISTENT_STATE } from "./tagList.slice";
import playerManagerSlice, { PLAYER_PERSISTENT_STATE } from "./playerManager.slice";
import currentMouseFocusSlice from "./currentMouseFocus.slice";
import tagListOnTrackSlice, { TAGLISTONTRACK_MANAGER_PERSISTENT_STATE } from "./tagListOnTrack..slice";
import openTagsNowStateSlice from "./openTagNow.slice";

export const store = configureStore({
    reducer: {
        volumeManager: volumeManagerSlice,
        activeManager: ActiveManagerSlice,
        tagList: tagListSlice,
        player: playerManagerSlice,
        currentFocus: currentMouseFocusSlice,
        taglistOnTrack: tagListOnTrackSlice,
        openTagsNow: openTagsNowStateSlice
    }
});

store.subscribe(() => {
    saveState(VOLUME_MANAGER_PERSISTENT_STATE, { ...store.getState().volumeManager });
    saveState(ACTIVE_MANAGER_PERSISTENT_STATE, { ...store.getState().activeManager });
    saveState(TAGLIST_PERSISTENT_STATE, { ...store.getState().tagList });
    saveState(PLAYER_PERSISTENT_STATE, { ...store.getState().player });
    saveState(TAGLISTONTRACK_MANAGER_PERSISTENT_STATE, { ...store.getState().taglistOnTrack });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;