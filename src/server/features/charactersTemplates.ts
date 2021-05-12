import { createEntityAdapter, createReducer } from "@reduxjs/toolkit";
import {
  characterTemplateAdd,
  characterTemplateRemove,
  characterTemplateUpdate,
} from "../../shared/actions";
import { initialSyncedState, RRCharacter } from "../../shared/state";

export const characterTemplatesAdapter = createEntityAdapter<RRCharacter>();

export const characterTemplatesReducer = createReducer(
  initialSyncedState.characterTemplates,
  (builder) => {
    builder
      .addCase(characterTemplateAdd, characterTemplatesAdapter.addOne)
      .addCase(characterTemplateUpdate, characterTemplatesAdapter.updateOne)
      .addCase(characterTemplateRemove, characterTemplatesAdapter.removeOne);
  }
);