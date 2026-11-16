import { CHARACTER_CLASSES, FIRST_NAMES, SURNAMES } from '../data/characterPools';
import type { Character, CharacterClass, CharacterStats } from '../types/character';

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const CLASS_STAT_RANGES: Record<
  CharacterClass,
  { health: [number, number]; mana: [number, number]; strength: [number, number] }
> = {
  Warrior: { health: [105, 145], mana: [20, 45], strength: [15, 22] },
  Paladin: { health: [100, 138], mana: [45, 75], strength: [14, 20] },
  Mage: { health: [65, 95], mana: [95, 140], strength: [6, 12] },
  Necromancer: { health: [70, 100], mana: [90, 135], strength: [7, 13] },
  Cleric: { health: [80, 115], mana: [80, 120], strength: [9, 15] },
  Rogue: { health: [75, 110], mana: [45, 80], strength: [12, 18] },
  Ranger: { health: [85, 120], mana: [50, 85], strength: [12, 18] },
  Bard: { health: [75, 108], mana: [65, 105], strength: [9, 15] },
};

export function generateCharacterStats(characterClass: CharacterClass): CharacterStats {
  const ranges = CLASS_STAT_RANGES[characterClass];
  return {
    health: randomInt(ranges.health[0], ranges.health[1]),
    mana: randomInt(ranges.mana[0], ranges.mana[1]),
    strength: randomInt(ranges.strength[0], ranges.strength[1]),
  };
}

export class CharacterGenerator {
  private usedNames = new Set<string>();
  private rollCount = 0;

  public get maxUniqueNames(): number {
    return FIRST_NAMES.length * SURNAMES.length;
  }

  public get generatedCount(): number {
    return this.rollCount;
  }

  public generateUniqueName(): string {
    if (this.usedNames.size >= this.maxUniqueNames) {
      this.usedNames.clear();
    }

    let candidate = '';
    do {
      candidate = `${pickRandom(FIRST_NAMES)} ${pickRandom(SURNAMES)}`;
    } while (this.usedNames.has(candidate));

    this.usedNames.add(candidate);
    return candidate;
  }

  public generateClass(): CharacterClass {
    return pickRandom(CHARACTER_CLASSES);
  }

  public createCharacter(): Character {
    this.rollCount += 1;
    const name = this.generateUniqueName();
    const characterClass = this.generateClass();

    return {
      id: `char-${this.rollCount}-${Date.now()}`,
      name,
      characterClass,
      rollNumber: this.rollCount,
      stats: generateCharacterStats(characterClass),
      portrait: null,
      backstory: null,
    };
  }

  public resetHistory(): void {
    this.usedNames.clear();
    this.rollCount = 0;
  }
}
