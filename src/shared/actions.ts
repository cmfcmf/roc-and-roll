import { createAction, Update as OriginalUpdate } from "@reduxjs/toolkit";
import {
  InitiativeTrackerSyncedState,
  RRID,
  RRInitiativeTrackerEntry,
  RRInitiativeTrackerEntryLayerAction,
  RRInitiativeTrackerEntryToken,
  RRLogEntry,
  RRLogEntryDiceRoll,
  RRLogEntryMessage,
  RRMap,
  RRPlayer,
  RRPrivateChat,
  RRToken,
} from "./state";
import { rrid } from "./util";

interface Update<T extends { id: RRID }> extends OriginalUpdate<T> {
  id: T["id"]; // tighten the type of id to the opaque RRID
}

////////////////////////////////////////////////////////////////////////////////
// Players
////////////////////////////////////////////////////////////////////////////////

export const playerAdd = createAction(
  "player/add",
  (player: Omit<RRPlayer, "id">) => ({
    payload: { id: rrid<RRPlayer>(), ...player },
  })
);

export const playerUpdate = createAction<Update<RRPlayer>>("player/update");

export const playerRemove = createAction<RRPlayer["id"]>("player/remove");

////////////////////////////////////////////////////////////////////////////////
// Tokens
////////////////////////////////////////////////////////////////////////////////

export const tokenAdd = createAction(
  "token/add",
  (token: Omit<RRToken, "id">) => ({
    payload: { id: rrid<RRToken>(), ...token },
  })
);

export const tokenUpdate = createAction<Update<RRToken>>("token/update");

export const tokenRemove = createAction<RRToken["id"]>("token/remove");

////////////////////////////////////////////////////////////////////////////////
// Maps
////////////////////////////////////////////////////////////////////////////////

export const mapAdd = createAction("map/add", (map: Omit<RRMap, "id">) => ({
  payload: { id: rrid<RRMap>(), ...map },
}));

export const mapUpdate = createAction<Update<RRMap>>("map/update");

export const mapRemove = createAction<RRMap["id"]>("map/remove");

////////////////////////////////////////////////////////////////////////////////
// PrivateChats
////////////////////////////////////////////////////////////////////////////////

export const privateChatAdd = createAction(
  "privatechat/add",
  (privatechat: Omit<RRPrivateChat, "id" | "timestamp">) => ({
    payload: {
      id: rrid<RRPrivateChat>(),
      timestamp: Date.now(),
      ...privatechat,
    },
  })
);

export const privateChatUpdate = createAction<
  Update<Omit<RRPrivateChat, "timestamp">>
>("privatechat/update");

export const privateChatRemove = createAction<RRPrivateChat["id"]>(
  "privatechat/remove"
);

////////////////////////////////////////////////////////////////////////////////
// LogEntries
////////////////////////////////////////////////////////////////////////////////

export const logEntryMessageAdd = createAction(
  "logentry/message/add",
  (logEntry: Omit<RRLogEntryMessage, "id" | "type" | "timestamp">) => ({
    payload: {
      id: rrid<RRLogEntryMessage>(),
      type: "message",
      timestamp: Date.now(),
      ...logEntry,
    },
  })
);

export const logEntryDiceRollAdd = createAction(
  "logentry/diceroll/add",
  (logEntry: Omit<RRLogEntryDiceRoll, "id" | "type" | "timestamp">) => ({
    payload: {
      id: rrid<RRLogEntryDiceRoll>(),
      type: "diceRoll",
      timestamp: Date.now(),
      ...logEntry,
    },
  })
);

export const logEntryRemove = createAction<RRLogEntry["id"]>("logentry/remove");

////////////////////////////////////////////////////////////////////////////////
// InitiativeTracker
////////////////////////////////////////////////////////////////////////////////

export const initiativeTrackerSetVisible = createAction<
  InitiativeTrackerSyncedState["visible"]
>("initiativeTracker/visible");

export const initiativeTrackersetCurrentEntry = createAction<
  InitiativeTrackerSyncedState["currentEntryId"]
>("initiativeTracker/currentEntryId");

export const initiativeTrackerEntryTokenAdd = createAction(
  "initiativetracker/entry/token/add",
  (
    initiativetrackerEntry: Omit<RRInitiativeTrackerEntryToken, "id" | "type">
  ) => ({
    payload: {
      id: rrid<RRPlayer>(),
      type: "token",
      ...initiativetrackerEntry,
    },
  })
);

export const initiativeTrackerEntryLayerActionAdd = createAction(
  "initiativetracker/entry/layeraction/add",
  (
    initiativetrackerEntry: Omit<
      RRInitiativeTrackerEntryLayerAction,
      "id" | "type"
    >
  ) => ({
    payload: {
      id: rrid<RRInitiativeTrackerEntry>(),
      type: "layerAction",
      ...initiativetrackerEntry,
    },
  })
);

export const initiativeTrackerEntryTokenUpdate = createAction<
  Update<RRInitiativeTrackerEntryToken>
>("initiativetracker/entry/token/update");

export const initiativeTrackerEntryLayerActionUpdate = createAction<
  Update<RRInitiativeTrackerEntryLayerAction>
>("initiativetracker/entry/layeraction/update");

export const initiativeTrackerEntryRemove = createAction<
  RRInitiativeTrackerEntry["id"]
>("initiativetracker/entry/remove");