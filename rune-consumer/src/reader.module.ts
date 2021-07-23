import fs from "fs";
import { Item, Spell } from "../types";
import path from "path";

const reader = (function module() {
  "use strict";

  interface ReturnOptions {
    runes?: Item[];
    inventory?: Item[];
    spells?: Spell[];
  }

  function validateSpells(spells: any[]): boolean {
    let isValid: boolean = true;
    spells.forEach((spell) => {
      if (!spell.id || !spell.name || !spell.requires) {
        isValid = false;
      }
    });
    return isValid;
  }

  function validateInventory(inventory: any[]): boolean {
    let isValid: boolean = true;
    inventory.forEach((item) => {
      if (!item.id || !item.name || !item.quantity) {
        isValid = false;
      }
    });
    return isValid;
  }

  function validateRunes(runes: any[]): boolean {
    let isValid: boolean = true;
    runes.forEach((rune) => {
      if (!rune.id || !rune.name) {
        isValid = false;
      }
    });
    return isValid;
  }

  return {
    parse(type: string, filepath: string): ReturnOptions {
      const validTypes = ["spell", "inventory", "rune"];
      if (!validTypes.includes(type)) {
        throw new Error("Type must be spell, inventory, or rune.");
      }
      const file: Buffer = fs.readFileSync(filepath);
      const fileAsJson = JSON.parse(file.toString());
      switch (type) {
        case "rune":
          const { runes } = fileAsJson;
          const isValidRunes = validateRunes(runes);
          if (!isValidRunes) {
            throw new Error("Improperly Formatted Runes.");
          } else {
            return { runes };
          }
        case "inventory":
          const { inventory } = fileAsJson;
          const isValidInventory = validateInventory(inventory);
          if (!isValidInventory) {
            throw new Error("Improperly Formatted Inventory.");
          } else {
            return { inventory };
          }
        case "spell":
          const { spells } = fileAsJson;
          const isValidSpells = validateSpells(spells);
          if (!isValidSpells) {
            throw new Error("Improperly Formatted Spells.");
          } else {
            return { spells };
          }
      }
      // for some reason, we need this or else the typescript gets pissed off.
      return { spells: [] };
    } 
  }
})();

export default reader;