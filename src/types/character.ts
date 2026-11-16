export type CharacterClass =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Ranger'
  | 'Cleric'
  | 'Paladin'
  | 'Bard'
  | 'Necromancer';

export interface CharacterStats {
  health: number;
  mana: number;
  strength: number;
}

export type JawShape = 'chiseled' | 'oval' | 'angular' | 'rounded';
export type HairStyle =
  | 'swept'
  | 'spiky'
  | 'waves'
  | 'bob'
  | 'braids'
  | 'mohawk'
  | 'longParted'
  | 'undercut';
export type EyeStyle = 'sharp' | 'wide' | 'determined' | 'mystic';
export type EyebrowStyle = 'fierce' | 'arched' | 'calm' | 'smirk';
export type MouthStyle = 'smirk' | 'stoic' | 'grin' | 'serene';
export type FacialMark = 'none' | 'scar' | 'rune' | 'warpaint' | 'freckles';
export type FacialHair = 'none' | 'stubble' | 'goatee' | 'beard';
export type HeadgearStyle =
  | 'none'
  | 'classHelm'
  | 'hood'
  | 'circlet'
  | 'featheredCap';

export interface PortraitTraits {
  variantNumber: number;
  seed: number;
  jawShape: JawShape;
  earType: 'human' | 'elf';
  skinTone: string;
  skinShadow: string;
  hairStyle: HairStyle;
  hairColor: string;
  hairHighlight: string;
  eyeStyle: EyeStyle;
  eyeColor: string;
  eyebrowStyle: EyebrowStyle;
  mouthStyle: MouthStyle;
  facialMark: FacialMark;
  facialHair: FacialHair;
  headgear: HeadgearStyle;
  armorVariant: 0 | 1 | 2;
  accentColor: string;
  backdropAngle: number;
}

export interface Character {
  id: string;
  name: string;
  characterClass: CharacterClass;
  rollNumber: number;
  stats: CharacterStats;
  portrait: PortraitTraits | null;
  backstory: string | null;
}
