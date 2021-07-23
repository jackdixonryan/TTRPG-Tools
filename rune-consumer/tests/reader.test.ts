// get some test JSON
import path from "path";
import reader from "../src/reader.module";
const paths = {
  runes: {
    valid: path.join(__dirname, "./json/valid.rune.json"),
    invalid: path.join(__dirname, "./json/invalid.rune.json")
  },
  inventory: {
    valid: path.join(__dirname, "./json/valid.inventory.json"),
    invalid: path.join(__dirname, "./json/invalid.inventory.json")
  },
  spells: {
    valid: path.join(__dirname, "./json/valid.spell.json"),
    invalid: path.join(__dirname, "./json/invalid.spell.json")
  }
}

describe("The reader", () => {
  let filepath = paths.runes.valid;
  test("It parses Rune JSON appropriately.", () => {
    const call = reader.parse("rune", filepath);
    expect(call).toHaveProperty("runes");
    const { runes } = call;
    expect(Array.isArray(runes)).toBe(true);
    runes.forEach((rune) => {
      expect(rune).toHaveProperty("id");
      expect(rune).toHaveProperty("name");
      const { id, name } = rune;
      expect(typeof id).toBe("string");
      expect(typeof name).toBe("string");
    });
  });

  test("It throws an error when Runes lack name or unique ID.", () => {
    let filepath = paths.runes.invalid;
    expect(() => {
      reader.parse('rune', filepath)
    }).toThrow("Improperly Formatted Runes.");
  });

  test("It parses spell JSON appropriately.", () => {
    let filepath = paths.spells.valid;
    const call = reader.parse("spell", filepath);
    expect(call).toHaveProperty("spells");
    const { spells } = call;
    expect(Array.isArray(spells)).toBe(true);
    spells.forEach((spell) => {
      expect(spell).toHaveProperty("id");
      expect(spell).toHaveProperty("name");
      expect(spell).toHaveProperty("requires");
      const { id, name, requires } = spell;
      expect(typeof id).toBe("string");
      expect(typeof name).toBe("string");
      expect(Array.isArray(requires)).toBe(true);
      requires.forEach((requirement) => {
        expect(requirement).toHaveProperty('runeId');
        expect(typeof requirement.runeId).toBe('string')
        expect(requirement).toHaveProperty("quantity");
        expect(typeof requirement.quantity).toBe("number");
        expect(requirement.quantity).not.toBe(0);
      });
    });
  });

  test("It throws an error when spell JSON is missing required fields.", () => {
    let filepath = paths.spells.invalid;
    expect(() => {
      reader.parse('spell', filepath)
    }).toThrow("Improperly Formatted Spells.");
  });

  test("It parses inventory JSON appropriately.", () => {
    let filepath = paths.inventory.valid;
    const call = reader.parse("inventory", filepath);
    expect(call).toHaveProperty("inventory");
    const { inventory } = call;
    expect(Array.isArray(inventory)).toBe(true);
    inventory.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("quantity");
      const { name, id, quantity } = item;
      expect(typeof name).toBe("string");
      expect(typeof id).toBe("string");
      expect(typeof quantity).toBe("number");
      expect(quantity).not.toBe(0);
    })
  });

  test("It throws an error when inventory JSON is inappropriately formatted.", () => {
    let filepath = paths.inventory.invalid;
    expect(() => {
      reader.parse('inventory', filepath);
    }).toThrow("Improperly Formatted Inventory.");
  });
});