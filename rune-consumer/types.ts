
export type Item = {
  id: string;
  name: string;
  quantity?: number;
}

export type Spell = {
  name: string;
  id: string;
  requires: Requirement[];
}

export type Requirement = {
  runeId: string;
  quantity: number;
}