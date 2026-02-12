import charactersData from "../../generated/characters.json";
import type { Character } from "./types";

const characters: Character[] = charactersData as Character[];

export function getAllCharacters(): Character[] {
  return characters;
}

export function getCharacterById(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}
