import { Item } from "../types";
import { v4 } from "uuid";

class Inventory {
  constructor() {
  };

  inventoryContents: Item[] = [];

  // adds a new item to the inventory.
  add(item: Item): Item {
    this.inventoryContents.push(item);
    return item;
  }

  // gets an item from the inventory.
  get(itemId: string): Item[] | null {
    const matches: Item[] = this.inventoryContents.filter((item: Item) => item.id === itemId);
    if (matches.length === 0) {
      return null;
    } else {
      return matches;
    }
  }

  show(): void {
    console.log(this.inventoryContents);
  }

  // takes an item out of inventory.
  remove(itemId: string): Item[] {
    const inventoryWithoutItem: Item[] = this.inventoryContents.filter((item: Item) => item.id !== itemId);
    this.inventoryContents = inventoryWithoutItem;
    return inventoryWithoutItem;
  }
  
}

const id = v4();
const inventory = new Inventory();
inventory.add({
  id,
  name: "Fire Rune"
});
const item = inventory.get(id);
inventory.remove(id)
inventory.show();
console.log(item);