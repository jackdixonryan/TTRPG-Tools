// get some test JSON
import reader from "../reader.module";
const paths = {
  runes: {
    valid: "./json/valid.rune.json",
    invalid: "./json/invalid.rune.json"
  },
  inventory: {
    valid: "./json/valid.inventory.json",
    invalid: "./json/invalid.inventory.json"
  },
  spells: {
    valid: "./json/valid.spell.json",
    invalid: "./json/invalid.spell.json"
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
    const call = reader.parse("rune", filepath);
    expect(call).toThrowError("Improperly formatted runes.");
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
    const call = reader.parse("spell", filepath);
    expect(call).toThrowError("One or more spells was improperly formatted.");
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
    const call = reader.parse("inventory", filepath);
    expect(call).toThrowError("Inventory not properly formatted.");
  });
});