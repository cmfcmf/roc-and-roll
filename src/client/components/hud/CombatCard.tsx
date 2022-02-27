import React, { useContext } from "react";
import { useCompendium } from "../compendium/Compendium";
import { useMyActiveCharacter } from "../../myself";
import { TextEntry } from "../quickReference/QuickReference";
import { CompendiumTextEntry } from "../../../shared/compendium-types/text-entry";
import {
  getMonsterSpeedAsString,
  MonsterSpellcasting,
} from "../quickReference/QuickReferenceMonster";
import { Button } from "../ui/Button";
import { QuickReferenceContext } from "../quickReference/QuickReferenceWrapper";

export function CombatCardHUD() {
  const character = useMyActiveCharacter("name");
  const { sources: compendiumSources } = useCompendium();

  const matchingMonsters = character
    ? compendiumSources.flatMap((source) =>
        source.data.monster?.filter(
          (monster) => monster.name === character.name
        )
      )
    : [];
  const monster = matchingMonsters[0];

  const showAction = (
    action: {
      name: string;
      entries: CompendiumTextEntry[];
    },
    key: React.Key
  ) => {
    return (
      <div key={key}>
        <p className="font-bold">{action.name}</p>
        {action.entries.map((entry, index) => {
          return (
            <TextEntry
              key={"textEntry" + index.toString()}
              entry={entry}
              rollName={`${monster!.name} ${action.name} `}
            />
          );
        })}
      </div>
    );
  };

  const { setOpen, setSearchString } = useContext(QuickReferenceContext);

  return monster ? (
    <div className="w-72 text-xs max-h-72 overflow-y-auto hud-panel p-2 rounded pointer-events-auto">
      {monster.speed && (
        <p>
          <Button
            className="float-right"
            onClick={() => {
              setOpen(true);
              setSearchString(monster.name);
            }}
          >
            Open Full
          </Button>
          <b>Speed: </b>
          {getMonsterSpeedAsString(monster)}
        </p>
      )}
      {(monster.legendary?.length ?? 0) > 0 && (
        <>
          <h2 className="text-xl">Legendary Actions</h2>
          {monster.legendary?.map((action, index) => {
            return showAction(action, index);
          })}
        </>
      )}
      {(monster.action?.length ?? 0) > 0 && (
        <>
          {(monster.legendary?.length ?? 0) > 0 && (
            <h2 className="text-xl">Actions</h2>
          )}
          {monster.action?.map((action, index) => {
            return showAction(action, index);
          })}
        </>
      )}

      {monster.spellcasting && (
        <>
          <h2 className="text-xl">Spellcasting</h2>
          <MonsterSpellcasting short monster={monster} />
        </>
      )}
    </div>
  ) : (
    <></>
  );
}